import Offer from '../models/Offer';

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
  const {
    searchTerm,
    location,
    typeJob,
    internJob,
    status,
    companyOwner,
    sort = '-publicationDate',
    page = '1',
    limit = '10'
  } = params;

  const filter: any = {};

  if (searchTerm) {
    filter.$or = [{ position: new RegExp(searchTerm, 'i') }, { description: new RegExp(searchTerm, 'i') }];
  }
  if (location) {
    filter.location = new RegExp(location, 'i');
  }
  if (typeJob) {
    filter.typeJob = typeJob;
  }
  if (internJob) {
    filter.internJob = internJob;
  }
  if (status) {
    filter.status = status === 'true'; // Convert to boolean
  }

  const skip = (Number(page) - 1) * Number(limit);
  const limitNumber = Number(limit);

  console.log('Filter:', filter);
  console.log('Pagination - skip:', skip, 'limit:', limitNumber);
  console.log('Sort:', sort);

  const query = Offer.find(filter).skip(skip).limit(limitNumber).sort(sort);

  const offers = await query.populate('companyOwner', { name: 1 }).exec();

  if (companyOwner) {
    const companyOwnerFilter = new RegExp(companyOwner, 'i');
    return offers.filter((offer: any) => {
      if (typeof offer.companyOwner !== 'object' || !('name' in offer.companyOwner)) {
        return false;
      }
      return companyOwnerFilter.test(offer.companyOwner.name);
    });
  }

  return offers;
}
