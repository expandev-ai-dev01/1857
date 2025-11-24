import { useQuery } from '@tanstack/react-query';
import { animalService } from '../../services/animalService';
import type { AnimalFilters } from '../../types';

export const useAnimalList = (filters: AnimalFilters) => {
  return useQuery({
    queryKey: ['animals', filters],
    queryFn: () => animalService.listPublic(filters),
  });
};
