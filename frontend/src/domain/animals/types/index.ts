import { z } from 'zod';
import { animalSchema, animalFilterSchema } from '../validations/animalSchema';

export type Animal = {
  id: number;
  idAccount: number;
  name: string;
  species: 'Cachorro' | 'Gato';
  breed?: string;
  ageYears: number;
  ageMonths: number;
  size: 'Pequeno' | 'Médio' | 'Grande';
  gender: 'Macho' | 'Fêmea';
  description: string;
  temperament?: string[];
  healthStatus: string[];
  locationCity: string;
  locationState: string;
  contactInfo: string;
  photos: string[];
  status: 'Disponível' | 'Em processo de adoção' | 'Adotado' | 'Inativo';
  createdAt: string;
  updatedAt: string;
};

export type AnimalFormData = z.infer<typeof animalSchema>;
export type AnimalFilters = z.infer<typeof animalFilterSchema>;

export interface AnimalListResponse {
  data: Animal[];
  page: number;
  pageSize: number;
  total: number;
}
