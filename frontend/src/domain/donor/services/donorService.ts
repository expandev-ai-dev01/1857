import { authenticatedClient } from '@/core/lib/api';
import type { DonorRequest, DonorRequestFormData } from '../types';

export const donorService = {
  async createRequest(data: DonorRequestFormData): Promise<DonorRequest> {
    const { data: response } = await authenticatedClient.post('/donor-request', data);
    return response.data;
  },
};
