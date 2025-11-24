import { Router } from 'express';
import { authMiddleware } from '@/middleware/auth';
import { validateBody } from '@/middleware/validation';
import * as animalController from '@/api/v1/internal/animal/controller';
import * as donorController from '@/api/v1/internal/donor-request/controller';

const router = Router();

// Apply authentication to all internal routes
router.use(authMiddleware);

// Animal Management (Donor)
router.get('/animal', animalController.listMyAnimalsHandler);
router.post('/animal', animalController.createHandler);
router.put('/animal/:id', animalController.updateHandler);
router.delete('/animal/:id', animalController.deleteHandler);

// Donor Requests
router.post('/donor-request', donorController.createHandler);
router.get('/donor-request', donorController.listHandler); // Admin only in real scenario
router.put('/donor-request/:id', donorController.updateHandler); // Admin only

export default router;
