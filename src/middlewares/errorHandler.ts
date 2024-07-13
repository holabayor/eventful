import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error('HTTP Error', {
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode,
    isOperational: err.isOperational,
  });
  const isDevelopment = process.env.NODE_ENV === 'development';

  const response = {
    success: false,
    status: 'error',
    message: err.isOperational ? err.message : 'Something went wrong!',
    ...(isDevelopment && { stack: err.stack }),
  };

  res.status(err.isOperational ? err.statusCode : 500).json(response);
};

export default errorHandler;
