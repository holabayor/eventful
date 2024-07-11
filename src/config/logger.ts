import { createLogger, format, transports } from 'winston';

const { combine, timestamp, errors, splat, printf, colorize, simple } = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    printf((info) => `${info.level}:  [${info.timestamp}] "${info.message}"`)
  ),
  transports: [
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
  exceptionHandlers: [new transports.File({ filename: 'logs/exceptions.log' })],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(colorize(), simple()),
    })
  );
}

export default logger;
