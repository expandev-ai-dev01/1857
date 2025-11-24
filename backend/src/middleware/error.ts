import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '@/utils/logger';
import { errorResponse } from '@/utils/response';

export class AppError extends Error {
  public statusCode: number;
  public code: string;

  constructor(message: string, statusCode: number = 500, code: string = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Unhandled Error', error);

  if (error instanceof ZodError) {
    return res
      .status(400)
      .json(errorResponse('Validation Error', 'VALIDATION_ERROR', error.errors));
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json(errorResponse(error.message, error.code));
  }

  return res.status(500).json(errorResponse('Internal Server Error', 'INTERNAL_SERVER_ERROR'));
};
