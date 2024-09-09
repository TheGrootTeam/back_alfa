import { offersList } from '../lib/offersUtils';
import Offer from '../models/Offer';
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
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;
  const skip = (page - 1) * limit;

  const req = {
    query: {
      position: params.searchTerm,
      location: params.location,
      typeJob: params.typeJob,
      internJob: params.internJob,
      status: params.status === 'true' ? true : params.status === 'false' ? false : undefined,
      companyOwner: params.companyOwner,
      sort: params.sort || '-publicationDate',
      skip: skip.toString(),
      limit: limit.toString()
    }
  } as unknown as Request;

  const offers = await offersList(req);
  console.log('Offers fetched:', offers);

  // Build filter object
  const filter: { [key: string]: any } = {
    position: params.searchTerm ? new RegExp(params.searchTerm, 'i') : undefined,
    location: params.location || undefined,
    typeJob: params.typeJob || undefined,
    internJob: params.internJob || undefined,
    status: params.status === 'true' ? true : params.status === 'false' ? false : undefined,
    companyOwner: params.companyOwner || undefined
  };

  // Remove undefined fields
  Object.keys(filter).forEach((key) => filter[key] === undefined && delete filter[key]);

  const totalResults = await Offer.countDocuments(filter);

  return {
    offers,
    totalResults
  };
}
