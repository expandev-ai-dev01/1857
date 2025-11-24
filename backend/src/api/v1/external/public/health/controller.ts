import { Request, Response, NextFunction } from 'express';
import { successResponse } from '@/utils/response';

/**
 * @api {get} /api/v1/external/public/health Health Check
 * @apiName GetHealth
 * @apiGroup System
 * @apiVersion 1.0.0
 *
 * @apiDescription Checks if the API is running correctly
 */
export const getHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(
      successResponse({
        status: 'healthy',
        service: 'flora-backend',
        version: '1.0.0',
        uptime: process.uptime(),
      })
    );
  } catch (error) {
    next(error);
  }
};
