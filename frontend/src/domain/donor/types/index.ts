import { z } from 'zod';
import { donorRequestSchema } from '../validations/donorSchema';

export type DonorRequest = {
  id: number;
  idAccount: number;
  idUser: number;
  justification: string;
  status: 'Pendente' | 'Aprovado' | 'Rejeitado';
  requestDate: string;
  reviewerId?: number;
  reviewDate?: string;
  reviewNotes?: string;
};

export type DonorRequestFormData = z.infer<typeof donorRequestSchema>;
