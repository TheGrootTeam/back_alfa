import { Request, Response, NextFunction } from 'express';
import { offersList } from '../lib/offersUtils';
import createError from 'http-errors';
import { CustomRequest } from '../interfaces/IauthJWT';
import Offer from '../models/Offer';

export default class OffersController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const offers = await offersList(req);
      res.status(200).json({ offers: offers });
    } catch (error) {
      next(error);
    }
  }
  async delete(req: CustomRequest, _res: Response, next: NextFunction) {
    const offerId = req.body.offerId;
    const company = req.apiUserId;

    // get the offer
    const offer = await Offer.findById(offerId);

    // verify if offer exist
    if (!offer) {
      next(createError(404, 'Offer not found'));
      return;
    }
    //

    // verify user is offer owner
    const offerOwner = offer?.companyOwner._id.toString();
    if (offerOwner !== company) {
      next(createError(401, "You aren't the owner of the offer"));
      return;
    }

    console.log(offerId, company, offer);
    next(createError(401, 'Invalid delete'));
  }
}
