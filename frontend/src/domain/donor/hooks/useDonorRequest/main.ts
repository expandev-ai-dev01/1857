import { useMutation } from '@tanstack/react-query';
import { donorService } from '../../services/donorService';
import type { DonorRequestFormData } from '../../types';

export const useDonorRequest = () => {
  return useMutation({
    mutationFn: (data: DonorRequestFormData) => donorService.createRequest(data),
  });
};
