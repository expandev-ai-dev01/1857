import { dbRequest, ExpectedReturn } from '@/utils/database';
import { AnimalCreateRequest, AnimalListFilters, AnimalUpdateRequest } from './animalTypes';

export async function animalCreate(params: AnimalCreateRequest) {
  // Validate age
  if (params.ageYears === 0 && params.ageMonths === 0) {
    throw new Error('Age must be greater than zero');
  }

  const dbParams = {
    ...params,
    temperament: params.temperament ? JSON.stringify(params.temperament) : null,
    healthStatus: params.healthStatus ? JSON.stringify(params.healthStatus) : null,
    photosJson: JSON.stringify(params.photos),
  };

  // Remove array fields that are now stringified
  delete (dbParams as any).photos;

  return await dbRequest('[functional].[spAnimalCreate]', dbParams, ExpectedReturn.Single);
}

export async function animalUpdate(params: AnimalUpdateRequest) {
  const dbParams = {
    ...params,
    temperament: params.temperament ? JSON.stringify(params.temperament) : null,
    healthStatus: params.healthStatus ? JSON.stringify(params.healthStatus) : null,
    photosJson: JSON.stringify(params.photos),
  };

  delete (dbParams as any).photos;

  return await dbRequest('[functional].[spAnimalUpdate]', dbParams, ExpectedReturn.Single);
}

export async function animalDelete(params: {
  idAccount: number;
  idUser: number;
  idAnimal: number;
}) {
  return await dbRequest('[functional].[spAnimalDelete]', params, ExpectedReturn.Single);
}

export async function animalGet(params: { idAccount: number; idAnimal: number }) {
  const result = await dbRequest(
    '[functional].[spAnimalGet]',
    params,
    ExpectedReturn.Multi,
    undefined,
    ['details', 'photos']
  );

  if (!result.details || result.details.length === 0) {
    return null;
  }

  const animal = result.details[0];
  const photos = result.photos.map((p: any) => p.url);

  return {
    ...animal,
    temperament: animal.temperament ? JSON.parse(animal.temperament) : [],
    healthStatus: animal.healthStatus ? JSON.parse(animal.healthStatus) : [],
    photos,
  };
}

export async function animalList(params: AnimalListFilters) {
  const result = await dbRequest('[functional].[spAnimalList]', params, ExpectedReturn.Multi);
  // spAnimalList returns data in first set, total count is in the rows
  const data = result[0];
  const total = data.length > 0 ? data[0].total : 0;

  return {
    data,
    total,
    page: params.page || 1,
    pageSize: params.pageSize || 20,
  };
}

export async function animalListByDonor(params: { idAccount: number; idUser: number }) {
  return await dbRequest('[functional].[spAnimalListByDonor]', params, ExpectedReturn.Multi).then(
    (r) => r[0]
  );
}
