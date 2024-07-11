import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
