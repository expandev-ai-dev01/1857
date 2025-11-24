export interface AnimalEntity {
  idAnimal: number;
  idAccount: number;
  idUser: number;
  name: string;
  species: string;
  breed?: string;
  ageYears: number;
  ageMonths: number;
  size: string;
  gender: string;
  description: string;
  temperament?: string; // JSON string from DB
  healthStatus?: string; // JSON string from DB
  locationCity: string;
  locationState: string;
  contactInfo: string;
  status: string;
  dateCreated: Date;
  dateModified: Date;
  deleted: boolean;
}

export interface AnimalPhotoEntity {
  url: string;
  isMain: boolean;
}

export interface AnimalCreateRequest {
  idAccount: number;
  idUser: number;
  name: string;
  species: string;
  breed?: string;
  ageYears: number;
  ageMonths: number;
  size: string;
  gender: string;
  description: string;
  temperament?: string[];
  healthStatus?: string[];
  locationCity: string;
  locationState: string;
  contactInfo: string;
  photos: string[];
}

export interface AnimalUpdateRequest extends AnimalCreateRequest {
  idAnimal: number;
  status: string;
}

export interface AnimalListFilters {
  idAccount: number;
  species?: string;
  size?: string;
  gender?: string;
  locationCity?: string;
  locationState?: string;
  ageGroup?: string;
  page?: number;
  pageSize?: number;
}
