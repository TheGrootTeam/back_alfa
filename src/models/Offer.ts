//const mongoose = require('mongoose');
import mongoose, { Schema } from 'mongoose';

const OfferSchema = new mongoose.Schema({
  position: { type: String, required: true, index: true },
  publicationDate: { type: Date, required: true, index: true },
  description: { type: String, required: true, index: true },
  companyOwner: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: false,
    index: true
  },
  status: { type: Boolean, required: true, index: true }, //open or close
  numberVacancies: { type: Number, required: true },
  listApplicants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Applicant',
      required: false
    }
  ],
  numberApplicants: { type: Number, required: false }
});

const Offer = mongoose.model('Offer', OfferSchema);

//module.exports = InternshipPosition;
export default Offer;
