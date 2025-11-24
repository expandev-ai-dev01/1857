import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import * as animalService from '@/services/animal/animalRules';
import { paginationSchema, zString, zId } from '@/utils/zodValidation';

const listSchema = paginationSchema.extend({
  species: zString.optional(),
  size: zString.optional(),
  gender: zString.optional(),
  locationCity: zString.optional(),
  locationState: zString.optional(),
  ageGroup: z.enum(['Filhote', 'Jovem', 'Adulto', 'Idoso']).optional(),
});

export async function listHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const validated = await listSchema.parseAsync(req.query);

    // Public access assumes a default account or context.
    // For this implementation, we'll assume account ID 1 for the platform.
    const idAccount = 1;

    const result = await animalService.animalList({
      idAccount,
      ...validated,
    });
    res.json(
      successResponse(result.data, {
        page: result.page,
        pageSize: result.pageSize,
        total: result.total,
      })
    );
  } catch (err) {
    next(err);
  }
}

export async function getHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const idAnimal = parseInt(req.params.id);
    const idAccount = 1; // Default platform account

    const result = await animalService.animalGet({ idAccount, idAnimal });

    if (!result) {
      return res.status(404).json(errorResponse('Animal not found or not available', 'NOT_FOUND'));
    }

    res.json(successResponse(result));
  } catch (err) {
    next(err);
  }
}
