//const mongoose = require('mongoose');
import mongoose, { Query, Schema } from 'mongoose';
import { IOffer, IOfferModel, IOffersFilter } from '../interfaces/IOffer';

const OfferSchema = new mongoose.Schema({
  position: { type: String, required: true, index: true },
  publicationDate: { type: Date, required: true, index: true },
  description: { type: String, required: true, index: true },
  companyOwner: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
    index: true
  },
  status: { type: Boolean, required: true, index: true }, //open or close
  numberVacancies: { type: Number, required: true },
  listApplicants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Applicant',
      required: false,
      default: []
    }
  ],
  numberApplicants: { type: Number, required: false },
  location: { type: String, required: true, index: true },
  typeJob: { type: String, required: true, index: true }, // presencial, teletrabajo, híbrido
  internJob: { type: String, required: true, index: true } // renumerado, no renumerado, ONG 

});

OfferSchema.statics.listing = function (
  filter: IOffersFilter,
  skip?: string,
  limit?: string,
  sort?: string
): Query<IOffer[], IOffer> {
  const query = this.find(filter);
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);

  return query;
};

//Method for obtaining a specific offert for her id
OfferSchema.statics.findById = function (id: string): Query<IOffer | null, IOffer> {
  return this.findOne({ _id: id });
};

const Offer = mongoose.model<IOffer, IOfferModel>('Offer', OfferSchema);

//module.exports = InternshipPosition;
export default Offer;
