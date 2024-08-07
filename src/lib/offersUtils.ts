import { Request } from 'express';
import { IOffersFilter } from '../interfaces/IOffer';
import Offer from '../models/Offer';

export function offersList(req: Request) {
  // types of filtering
  const filterById = req.query.id as string;
  const filterByPosition = req.query.position as string;
  const filterByPublicationDate = req.query.publicationData as string;
  const filterByDescription = req.query.description as string;
  const filterByCompanyOwner = req.query.companyOwner as string;
  const filterByStatus = req.query.status as string;

  // pagination
  const skip = req.query.skip as string | undefined;
  const limit = req.query.limit as string | undefined;

  // sort
  const sort = req.query.sort as string | undefined;

  // we create a filter object to introduce the filters that are passed to us for the query.
  const filter: IOffersFilter = {};

  if (filterById) {
    filter.id = filterById;
  }
  if (filterByPosition) {
    filter.position = new RegExp(filterByPosition, 'i');
  }
  if (filterByPublicationDate) {
    filter.publicationDate = filterByPublicationDate;
  }
  if (filterByDescription) {
    filter.description = new RegExp(filterByDescription, 'i');
  }
  if (filterByCompanyOwner) {
    filter.companyOwner = { $in: filterByCompanyOwner };
  }
  if (filterByStatus) {
    filter.status = filterByStatus;
  }

  const offers = Offer.listing(filter, skip, limit, sort);

  return offers;
}
