import mongoose from 'mongoose';

/**
 * Connects to MONGODB_URI when set. Otherwise boots an in-memory MongoDB for
 * a zero-setup local dev experience — data does not persist across restarts.
 */
/**
 * @returns {Promise<{ isEphemeral: boolean }>} isEphemeral is true when running against
 * the in-memory fallback, so callers can decide whether auto-seeding makes sense.
 */
export const connectDatabase = async () => {
  const configuredUri = process.env.MONGODB_URI;

  if (configuredUri) {
    await mongoose.connect(configuredUri);
    console.log('Connected to MongoDB.');
    return { isEphemeral: false };
  }

  const { MongoMemoryServer } = await import('mongodb-memory-server');
  const memoryServer = await MongoMemoryServer.create();
  await mongoose.connect(memoryServer.getUri());
  console.warn(
    'MONGODB_URI is not set — using an in-memory MongoDB for this session. ' +
      'Data will NOT persist after the server stops. Set MONGODB_URI in backend/.env for persistent storage.',
  );

  // Windows' nodemon restarts are a hard kill it can't intercept, so this mostly helps
  // POSIX dev/CI environments — but it's what lets a graceful Ctrl+C (SIGINT) or a
  // container/orchestrator stop (SIGTERM) free the port and the mongod child promptly
  // instead of leaving them to the OS's own cleanup timing.
  const shutdown = async () => {
    await mongoose.disconnect();
    await memoryServer.stop();
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  return { isEphemeral: true };
};
