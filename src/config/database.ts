import mongoose from 'mongoose';
import logger from './logger';

/**
 * Get the MongoDB connection URI based on the current environment.
 *
 * @returns {string} The MongoDB connection URI.
 */
const getMongoUri = (): string => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return process.env.PRODUCTION_MONGODB_URI || '';
    case 'staging':
      return process.env.STAGING_MONGODB_URI || '';
    default:
      return process.env.MONGODB_URI || '';
  }
};

/**
 * Connect to MongoDB using the connection URI retrieved based on the environment.
 *
 * @returns {Promise<void>} A promise that resolves when the connection is successfully established.
 * @throws Will terminate the process if the connection URI is not found or if the connection fails.
 */
const connectDB = async (): Promise<void> => {
  const mongodbUri = getMongoUri();

  if (!mongodbUri) {
    console.error('MongoDB URI not found in environment variables');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongodbUri);

    logger.info('Connected to MongoDB database');
  } catch (error) {
    logger.error('❌Failed to connect to MongoDB');
    process.exit(1);
  }
};

// Export connected MongoDB connection and instance
export { connectDB };
