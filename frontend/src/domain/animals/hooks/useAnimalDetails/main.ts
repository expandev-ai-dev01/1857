import { useQuery } from '@tanstack/react-query';
import { animalService } from '../../services/animalService';

export const useAnimalDetails = (id: number) => {
  return useQuery({
    queryKey: ['animal', id],
    queryFn: () => animalService.getPublic(id),
    enabled: !!id,
  });
};
