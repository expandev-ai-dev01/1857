import { useMutation, useQueryClient } from '@tanstack/react-query';
import { animalService } from '../../services/animalService';
import type { AnimalFormData } from '../../types';

export const useAnimalMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: AnimalFormData) => animalService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-animals'] });
      queryClient.invalidateQueries({ queryKey: ['animals'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: AnimalFormData }) =>
      animalService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-animals'] });
      queryClient.invalidateQueries({ queryKey: ['animals'] });
      queryClient.invalidateQueries({ queryKey: ['animal'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => animalService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-animals'] });
      queryClient.invalidateQueries({ queryKey: ['animals'] });
    },
  });

  return { createMutation, updateMutation, deleteMutation };
};
