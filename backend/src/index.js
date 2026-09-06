import 'dotenv/config';
import cluster from 'node:cluster';
import http from 'node:http';
import os from 'node:os';
import app from './app.js';
import { connectDatabase } from './config/db.js';
import Product from './models/Product.js';
import { initSocket } from './realtime/socket.js';
import { seedDatabase } from './seed/seed.js';

const port = process.env.PORT || 5000;

// Clustering only makes sense against a real, shared MongoDB — the zero-config dev
// fallback (no MONGODB_URI) spins up its own private in-memory database per process,
// so multiple workers would each silently see different data. WEB_CONCURRENCY lets an
// operator cap worker count (e.g. in a resource-limited container); it defaults to one
// worker per CPU core, matching how many cores would otherwise sit idle behind a single
// Node process's one-thread-per-process event loop.
//
// `npm run dev` (nodemon) never clusters, regardless of MONGODB_URI: nodemon restarts
// this process on every file save, and on Windows there's no reliable way for it to
// guarantee every forked worker from the old run has fully exited (and released the
// port) before the new run's workers try to bind it — a restart can permanently wedge
// the dev server on EADDRINUSE. `npm_lifecycle_event` is set by npm to the script name
// being run, so this needs no extra config and works the same on every OS.
const isDevScript = process.env.npm_lifecycle_event === 'dev';
const usePersistentDb = Boolean(process.env.MONGODB_URI);
const workerCount = usePersistentDb && !isDevScript ? Number(process.env.WEB_CONCURRENCY) || os.cpus().length : 1;
const isClustered = workerCount > 1;

const startWorker = async () => {
  const { isEphemeral } = await connectDatabase();

  // The in-memory dev database starts empty every run, so seed it automatically —
  // this is skipped entirely once a real MONGODB_URI is configured. Ephemeral mode
  // always resolves to a single worker (see workerCount above), so there's no
  // multi-process race on this check.
  if (isEphemeral && (await Product.countDocuments()) === 0) {
    console.log('Auto-seeding the in-memory dev database...');
    await seedDatabase();
  }

  // Socket.IO needs the raw HTTP server (not the Express app) so it can hijack the
  // upgrade handshake for WebSocket connections alongside normal HTTP traffic. Only
  // clustered mode needs the Redis adapter — a lone process has nothing to broadcast
  // across, and requiring Redis here too would break the zero-config dev fallback for
  // anyone who hasn't set one up locally.
  const httpServer = http.createServer(app);
  await initSocket(httpServer, { useRedisAdapter: isClustered });

  // In a forked worker, Node's cluster module transparently shares this port across
  // every worker (the primary process load-balances incoming connections between
  // them) — no extra wiring needed beyond calling listen() as usual here.
  httpServer.listen(port, () =>
    console.log(
      `BiteX API listening on http://localhost:${port}${cluster.isWorker ? ` (worker ${cluster.worker.id})` : ''}`,
    ),
  );
};

const startPrimary = () => {
  console.log(`Starting BiteX API cluster: ${workerCount} workers (one per CPU core).`);
  for (let i = 0; i < workerCount; i += 1) cluster.fork();

  // A worker that dies (an uncaught exception, an OOM kill) takes its share of
  // capacity down with it — replace it so a crash degrades throughput instead of
  // permanently shrinking the cluster until the next full restart. Suppressed during
  // a deliberate shutdown so Ctrl+C doesn't turn into an infinite respawn loop against
  // workers that are exiting on purpose.
  //
  // A transient crash (an occasional unhandled rejection) should always be replaced,
  // but a *persistent* one — every worker dying on startup because the port is stuck
  // in EADDRINUSE (e.g. orphaned workers from a previous run that never released it;
  // Windows in particular can leave these behind when a process is force-killed
  // instead of shut down via SIGINT/SIGTERM) — would otherwise respawn forever,
  // burning CPU in a tight loop while never actually serving a single request, with
  // nothing in the logs to say so beyond an ever-scrolling wall of the same error.
  // Tracking recent exit timestamps tells the difference: more than workerCount exits
  // inside one 10-second window is not "a worker crashed," it's "workers cannot start
  // at all," so give up loudly instead of spinning forever.
  const CRASH_LOOP_WINDOW_MS = 10_000;
  const recentExits = [];
  let shuttingDown = false;
  cluster.on('exit', (worker, code, signal) => {
    if (shuttingDown) return;
    console.error(`Worker ${worker.process.pid} exited (code ${code}, signal ${signal}). Restarting it.`);

    const now = Date.now();
    recentExits.push(now);
    while (recentExits.length > 0 && now - recentExits[0] > CRASH_LOOP_WINDOW_MS) recentExits.shift();

    if (recentExits.length > workerCount) {
      shuttingDown = true;
      console.error(
        `${recentExits.length} workers exited within ${CRASH_LOOP_WINDOW_MS / 1000}s — that's not an` +
          ' isolated crash, every worker is failing to start. Giving up instead of respawning forever.' +
          ' If this is EADDRINUSE, check for leftover node processes from a previous run still holding' +
          ` port ${port} (force-killing this process on Windows can orphan its workers instead of` +
          ' letting them exit with it) and stop them before retrying.',
      );
      Object.values(cluster.workers).forEach((survivor) => survivor.kill());
      process.exit(1);
    }

    cluster.fork();
  });

  // Without this, a Ctrl+C (or an orchestrator's SIGTERM) only ever reaches the
  // primary — the forked workers are separate OS processes that don't inherit a
  // signal sent to their parent, so they'd keep the port bound after the primary
  // exits. Explicitly killing every worker here is what makes the *next* start
  // (e.g. nodemon's restart, or a redeploy) able to bind the port cleanly.
  const shutdown = (signal) => {
    shuttingDown = true;
    console.log(`${signal} received, shutting down ${Object.keys(cluster.workers).length} workers...`);
    Object.values(cluster.workers).forEach((worker) => worker.kill(signal));
    process.exit(0);
  };
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
};

if (isClustered && cluster.isPrimary) {
  startPrimary();
} else {
  startWorker().catch((error) => {
    console.error('Failed to start the server:', error);
    process.exit(1);
  });
}
