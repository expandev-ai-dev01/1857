export interface DonorRequestCreateRequest {
  idAccount: number;
  idUser: number;
  justification: string;
}

export interface DonorRequestUpdateRequest {
  idAccount: number;
  idDonorRequest: number;
  reviewerId: number;
  status: 'Aprovado' | 'Rejeitado';
  reviewNotes?: string;
}
