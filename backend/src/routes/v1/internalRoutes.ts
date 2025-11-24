import { Router } from 'express';
import { authMiddleware } from '@/middleware/auth';

const router = Router();

// Apply authentication to all internal routes
router.use(authMiddleware);

// Feature routes will be added here
// Example: router.use('/animals', animalRoutes);

export default router;
