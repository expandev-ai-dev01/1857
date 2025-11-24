import { Router } from 'express';
import * as healthController from '@/api/v1/external/public/health/controller';
import * as animalController from '@/api/v1/external/public/animal/controller';

const router = Router();

// Public routes
router.get('/public/health', healthController.getHandler);

// Public Animal Catalog
router.get('/public/animal', animalController.listHandler);
router.get('/public/animal/:id', animalController.getHandler);

export default router;
