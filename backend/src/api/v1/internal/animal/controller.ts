import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { CrudController } from '@/middleware/crud';
import { successResponse, errorResponse } from '@/utils/response';
import * as animalService from '@/services/animal/animalRules';
import { zString, zId, paginationSchema } from '@/utils/zodValidation';

const securable = 'ANIMAL';

const createSchema = z.object({
  name: zString.min(2).max(50),
  species: z.enum(['Cachorro', 'Gato']),
  breed: zString.max(50).optional(),
  ageYears: z.number().int().min(0).max(30).default(0),
  ageMonths: z.number().int().min(0).max(11).default(0),
  size: z.enum(['Pequeno', 'Médio', 'Grande']),
  gender: z.enum(['Macho', 'Fêmea']),
  description: zString.min(50).max(1000),
  temperament: z.array(zString).optional(),
  healthStatus: z.array(zString),
  locationCity: zString.min(3).max(100),
  locationState: zString.length(2),
  contactInfo: zString,
  photos: z.array(zString.url()).min(1).max(5),
});

const updateSchema = createSchema.extend({
  status: z.enum(['Disponível', 'Em processo de adoção', 'Adotado', 'Inativo']),
});

const idSchema = z.object({ id: zId });

export async function createHandler(req: Request, res: Response, next: NextFunction) {
  const operation = new CrudController([{ securable, permission: 'CREATE' }]);
  const [validated, error] = await operation.create(req, createSchema);

  if (error) return next(error);

  try {
    const result = await animalService.animalCreate({
      ...validated.credential,
      ...validated.params,
    });
    res.json(successResponse(result));
  } catch (err) {
    next(err);
  }
}

export async function updateHandler(req: Request, res: Response, next: NextFunction) {
  const operation = new CrudController([{ securable, permission: 'UPDATE' }]);
  const [validated, error] = await operation.update(req, updateSchema);

  if (error) return next(error);

  try {
    const result = await animalService.animalUpdate({
      ...validated.credential,
      ...validated.params,
      idAnimal: parseInt(req.params.id),
    });
    res.json(successResponse(result));
  } catch (err) {
    next(err);
  }
}

export async function deleteHandler(req: Request, res: Response, next: NextFunction) {
  const operation = new CrudController([{ securable, permission: 'DELETE' }]);
  const [validated, error] = await operation.delete(req, idSchema);

  if (error) return next(error);

  try {
    await animalService.animalDelete({
      ...validated.credential,
      idAnimal: validated.params.id,
    });
    res.json(successResponse({ deleted: true }));
  } catch (err) {
    next(err);
  }
}

export async function listMyAnimalsHandler(req: Request, res: Response, next: NextFunction) {
  const operation = new CrudController([{ securable, permission: 'READ' }]);
  // Dummy validation to get credentials
  const [validated, error] = await operation.read(req, z.object({}));

  if (error) return next(error);

  try {
    const result = await animalService.animalListByDonor(validated.credential);
    res.json(successResponse(result));
  } catch (err) {
    next(err);
  }
}
