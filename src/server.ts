import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import app from './app';
import logger from './config/logger';
import { connectDB } from './config/database';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const startServer = () => {
  server.listen(PORT, async () => {
    await connectDB();
    logger.info(`Server running on port ${PORT}`);
  });
};

server.on('error', (error) => {
  logger.error('❌ Server error:', error.message);
  process.exit(1);
});

startServer();
