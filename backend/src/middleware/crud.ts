import { Request, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import { AppError } from './error';

export interface CrudSecurity {
  securable: string;
  permission: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';
}

export class CrudController {
  private security: CrudSecurity[];

  constructor(security: CrudSecurity[]) {
    this.security = security;
  }

  private async validateSecurity(req: Request, permission: string): Promise<void> {
    // In a real implementation, this would check req.user.roles against the securable/permission
    // For now, we assume if the user is authenticated (req.user exists), they have access
    // unless specific role checks are needed (handled in service layer or specific middleware)
    if (!req.user) {
      throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');
    }
  }

  public async create(req: Request, schema: AnyZodObject): Promise<[any, any]> {
    try {
      await this.validateSecurity(req, 'CREATE');
      const validated = await schema.parseAsync(req.body);
      return [
        {
          credential: {
            idUser: req.user?.id,
            idAccount: req.user?.idAccount,
          },
          params: validated,
        },
        null,
      ];
    } catch (error) {
      return [null, error];
    }
  }

  public async read(req: Request, schema: AnyZodObject): Promise<[any, any]> {
    try {
      await this.validateSecurity(req, 'READ');
      const validated = await schema.parseAsync({ ...req.params, ...req.query });
      return [
        {
          credential: {
            idUser: req.user?.id,
            idAccount: req.user?.idAccount,
          },
          params: validated,
        },
        null,
      ];
    } catch (error) {
      return [null, error];
    }
  }

  public async update(req: Request, schema: AnyZodObject): Promise<[any, any]> {
    try {
      await this.validateSecurity(req, 'UPDATE');
      const validated = await schema.parseAsync({ ...req.params, ...req.body });
      return [
        {
          credential: {
            idUser: req.user?.id,
            idAccount: req.user?.idAccount,
          },
          params: validated,
        },
        null,
      ];
    } catch (error) {
      return [null, error];
    }
  }

  public async delete(req: Request, schema: AnyZodObject): Promise<[any, any]> {
    try {
      await this.validateSecurity(req, 'DELETE');
      const validated = await schema.parseAsync(req.params);
      return [
        {
          credential: {
            idUser: req.user?.id,
            idAccount: req.user?.idAccount,
          },
          params: validated,
        },
        null,
      ];
    } catch (error) {
      return [null, error];
    }
  }
}
