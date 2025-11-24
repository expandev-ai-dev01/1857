import { z } from 'zod';

export const animalSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Nome deve ter no mínimo 2 caracteres')
      .max(50, 'Nome deve ter no máximo 50 caracteres'),
    species: z.enum(['Cachorro', 'Gato'], { message: 'Selecione uma espécie válida' }),
    breed: z.string().max(50, 'Raça deve ter no máximo 50 caracteres').optional(),
    ageYears: z.coerce.number().min(0).max(30),
    ageMonths: z.coerce.number().min(0).max(11),
    size: z.enum(['Pequeno', 'Médio', 'Grande'], { message: 'Selecione um porte válido' }),
    gender: z.enum(['Macho', 'Fêmea'], { message: 'Selecione um sexo válido' }),
    description: z
      .string()
      .min(50, 'Descrição deve ter no mínimo 50 caracteres')
      .max(1000, 'Descrição deve ter no máximo 1000 caracteres'),
    temperament: z.array(z.string()).optional(),
    healthStatus: z.array(z.string()).min(1, 'Selecione pelo menos um status de saúde'),
    locationCity: z
      .string()
      .min(3, 'Cidade deve ter no mínimo 3 caracteres')
      .max(100, 'Cidade deve ter no máximo 100 caracteres'),
    locationState: z.string().length(2, 'Estado deve ter 2 letras (UF)'),
    contactInfo: z.string().min(5, 'Informação de contato inválida'),
    photos: z
      .array(z.string().url('URL da foto inválida'))
      .min(1, 'Adicione pelo menos uma foto')
      .max(5, 'Máximo de 5 fotos'),
    status: z.enum(['Disponível', 'Em processo de adoção', 'Adotado', 'Inativo']).optional(),
  })
  .refine((data) => data.ageYears > 0 || data.ageMonths > 0, {
    message: 'A idade do animal deve ser maior que zero',
    path: ['ageMonths'],
  });

export const animalFilterSchema = z.object({
  species: z.enum(['Cachorro', 'Gato']).optional(),
  size: z.enum(['Pequeno', 'Médio', 'Grande']).optional(),
  gender: z.enum(['Macho', 'Fêmea']).optional(),
  locationCity: z.string().optional(),
  locationState: z.string().optional(),
  ageGroup: z.enum(['Filhote', 'Jovem', 'Adulto', 'Idoso']).optional(),
  page: z.number().optional(),
  pageSize: z.number().optional(),
});
