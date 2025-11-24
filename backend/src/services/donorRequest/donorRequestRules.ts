import { dbRequest, ExpectedReturn } from '@/utils/database';
import { DonorRequestCreateRequest, DonorRequestUpdateRequest } from './donorRequestTypes';

export async function donorRequestCreate(params: DonorRequestCreateRequest) {
  return await dbRequest('[functional].[spDonorRequestCreate]', params, ExpectedReturn.Single);
}

export async function donorRequestUpdate(params: DonorRequestUpdateRequest) {
  return await dbRequest('[functional].[spDonorRequestUpdate]', params, ExpectedReturn.Single);
}

export async function donorRequestList(params: { idAccount: number; status?: string }) {
  return await dbRequest('[functional].[spDonorRequestList]', params, ExpectedReturn.Multi).then(
    (r) => r[0]
  );
}
