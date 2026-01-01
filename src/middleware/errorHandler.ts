import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../types';
import { logger } from '../utils/logger';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`Error: ${err.message}`, {
    path: req.path,
    method: req.method,
    stack: err.stack,
  });

  const status = err.response?.status || err.status || 500;
  const message = err.response?.data?.message || err.message || 'Internal Server Error';

  const errorResponse: ApiError = {
    message,
    status,
    timestamp: new Date().toISOString(),
    path: req.path,
  };

  res.status(status).json(errorResponse);
};
