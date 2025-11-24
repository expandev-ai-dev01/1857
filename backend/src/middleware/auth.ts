import { Request, Response, NextFunction } from 'express';
import { AppError } from './error';

/**
 * Placeholder Authentication Middleware
 *
 * NOTE: Authentication implementation is explicitly out of scope for the base structure.
 * This middleware currently passes through requests or mocks a user for development.
 *
 * In a real implementation, this would verify JWT tokens.
 */
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // TODO: Implement actual JWT verification here

    // Mock user for development context if needed
    // req.user = {
    //   id: 1,
    //   idAccount: 1,
    //   email: 'dev@flora.com',
    //   roles: ['admin']
    // };

    next();
  } catch (error) {
    next(new AppError('Unauthorized', 401, 'UNAUTHORIZED'));
  }
};
