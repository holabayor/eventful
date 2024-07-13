import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger';
import { redactSensitiveInfo } from '../utils/redact';

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sanitzedBody = redactSensitiveInfo(req.body);
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  logger.info(`HTTP Request: ${req.method} ${req.url}`, {
    body: sanitzedBody,
    query: req.query,
    params: req.params,
    ip: Array.isArray(ip) ? ip[0] : ip,
  });
  next();
};

import morgan from 'morgan';

const stream = {
  write: (message: string) => logger.http(message.trim()),
};

export const httpLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream }
);

// export httpLogger;
