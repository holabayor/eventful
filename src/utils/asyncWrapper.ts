import { NextFunction, Request, RequestHandler, Response } from 'express';

/**
 * An async wrapper for handling async functions in express routes
 *
 * @param fn - async controller function
 * @returns a function that handles async functions
 */
export const asyncWrapper = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
