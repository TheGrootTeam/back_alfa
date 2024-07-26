//internshipPosition

//const mongoose = require('mongoose');
import mongoose, { Schema } from 'mongoose';

//Esquema para empresas de la BBDD

const OfferSchema = new mongoose.Schema({
  position: { type: String, required: true },
  publicationDate: { type: Date, required: true },
  description: { type: String, required: true },
  companyOwner: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: false
    }
  ],
  status: { type: Boolean, required: true }, //abierta o cerrada
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
