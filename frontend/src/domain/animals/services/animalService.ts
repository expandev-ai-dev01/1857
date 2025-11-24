import { publicClient, authenticatedClient } from '@/core/lib/api';
import type { Animal, AnimalFormData, AnimalFilters, AnimalListResponse } from '../types';

export const animalService = {
  // Public endpoints
  async listPublic(filters: AnimalFilters): Promise<AnimalListResponse> {
    const { data } = await publicClient.get('/animal', { params: filters });
    return data.data;
  },

  async getPublic(id: number): Promise<Animal> {
    const { data } = await publicClient.get(`/animal/${id}`);
    return data.data;
  },

  // Internal endpoints (Donor)
  async listMyAnimals(): Promise<Animal[]> {
    const { data } = await authenticatedClient.get('/animal');
    return data.data;
  },

  async create(animal: AnimalFormData): Promise<Animal> {
    const { data } = await authenticatedClient.post('/animal', animal);
    return data.data;
  },

  async update(id: number, animal: AnimalFormData): Promise<Animal> {
    const { data } = await authenticatedClient.put(`/animal/${id}`, animal);
    return data.data;
  },

  async delete(id: number): Promise<void> {
    await authenticatedClient.delete(`/animal/${id}`);
  },
};
