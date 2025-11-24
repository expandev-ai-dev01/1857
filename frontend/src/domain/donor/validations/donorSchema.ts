import { z } from 'zod';

export const donorRequestSchema = z.object({
  justification: z
    .string()
    .min(100, 'A justificativa deve ter no mínimo 100 caracteres')
    .max(2000, 'A justificativa deve ter no máximo 2000 caracteres'),
});
