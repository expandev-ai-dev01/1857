import { useQuery } from '@tanstack/react-query';
import { animalService } from '../../services/animalService';

export const useMyAnimals = () => {
  return useQuery({
    queryKey: ['my-animals'],
    queryFn: animalService.listMyAnimals,
  });
};
