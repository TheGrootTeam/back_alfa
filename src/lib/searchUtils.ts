import { offersList } from '../lib/offersUtils';
import { Request } from 'express';

interface SearchParams {
  searchTerm?: string;
  location?: string;
  typeJob?: string;
  internJob?: string;
  status?: string;
  companyOwner?: string;
  sort?: string;
  page?: string;
  limit?: string;
}

export async function searchOffers(params: SearchParams) {
  // Simulate a Request object by crafting only the necessary fields
  const req = {
    query: {
      position: params.searchTerm,
      location: params.location,
      typeJob: params.typeJob,
      internJob: params.internJob,
      status: params.status,
      companyOwner: params.companyOwner,
      sort: params.sort || '-publicationDate',
      skip: String((Number(params.page || '1') - 1) * Number(params.limit || '10')),
      limit: params.limit || '10'
    }
  } as unknown as Request; // Casting to Request type

  // Use the existing offersList function to get the filtered results
  const offers = await offersList(req);

  return offers;
}
