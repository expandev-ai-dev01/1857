import { Router } from 'express';
import * as healthController from '@/api/v1/external/public/health/controller';

const router = Router();

// Public routes
router.get('/public/health', healthController.getHandler);

export default router;
