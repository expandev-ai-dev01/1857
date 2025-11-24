import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { CrudController } from '@/middleware/crud';
import { successResponse } from '@/utils/response';
import * as donorService from '@/services/donorRequest/donorRequestRules';
import { zString, zId } from '@/utils/zodValidation';

const securable = 'DONOR_REQUEST';

const createSchema = z.object({
  justification: zString.min(100).max(2000),
});

const updateSchema = z.object({
  status: z.enum(['Aprovado', 'Rejeitado']),
  reviewNotes: zString.optional(),
});

export async function createHandler(req: Request, res: Response, next: NextFunction) {
  const operation = new CrudController([{ securable, permission: 'CREATE' }]);
  const [validated, error] = await operation.create(req, createSchema);

  if (error) return next(error);

  try {
    const result = await donorService.donorRequestCreate({
      ...validated.credential,
      ...validated.params,
    });
    res.json(successResponse(result));
  } catch (err) {
    next(err);
  }
}

export async function updateHandler(req: Request, res: Response, next: NextFunction) {
  // Only admins should access this
  const operation = new CrudController([{ securable, permission: 'UPDATE' }]);
  const [validated, error] = await operation.update(req, updateSchema);

  if (error) return next(error);

  try {
    const result = await donorService.donorRequestUpdate({
      idAccount: validated.credential.idAccount,
      idDonorRequest: parseInt(req.params.id),
      reviewerId: validated.credential.idUser,
      ...validated.params,
    });
    res.json(successResponse(result));
  } catch (err) {
    next(err);
  }
}

export async function listHandler(req: Request, res: Response, next: NextFunction) {
  const operation = new CrudController([{ securable, permission: 'READ' }]);
  const [validated, error] = await operation.read(req, z.object({ status: zString.optional() }));

  if (error) return next(error);

  try {
    const result = await donorService.donorRequestList({
      idAccount: validated.credential.idAccount,
      status: validated.params.status,
    });
    res.json(successResponse(result));
  } catch (err) {
    next(err);
  }
}
