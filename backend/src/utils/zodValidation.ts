import { z } from 'zod';

// Common Zod patterns
export const zString = z.string().trim();
export const zName = zString.min(1).max(100);
export const zDescription = zString.max(500).optional();
export const zEmail = zString.email().toLowerCase();
export const zId = z.coerce.number().int().positive();
export const zDate = z.coerce.date();
export const zBoolean = z.boolean();

// Pagination schema
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().optional(),
});
