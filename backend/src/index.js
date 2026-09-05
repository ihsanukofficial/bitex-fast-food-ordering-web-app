import 'dotenv/config';
import http from 'node:http';
import app from './app.js';
import { connectDatabase } from './config/db.js';
import Product from './models/Product.js';
import { initSocket } from './realtime/socket.js';
import { seedDatabase } from './seed/seed.js';

const port = process.env.PORT || 5000;

const start = async () => {
  const { isEphemeral } = await connectDatabase();

  // The in-memory dev database starts empty every run, so seed it automatically —
  // this is skipped entirely once a real MONGODB_URI is configured.
  if (isEphemeral && (await Product.countDocuments()) === 0) {
    console.log('Auto-seeding the in-memory dev database...');
    await seedDatabase();
  }

  // Socket.IO needs the raw HTTP server (not the Express app) so it can hijack the
  // upgrade handshake for WebSocket connections alongside normal HTTP traffic.
  const httpServer = http.createServer(app);
  initSocket(httpServer);

  httpServer.listen(port, () => console.log(`BiteX API listening on http://localhost:${port}`));
};

start().catch((error) => {
  console.error('Failed to start the server:', error);
  process.exit(1);
});
