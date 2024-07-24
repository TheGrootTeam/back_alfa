//internshipPosition

//const mongoose = require('mongoose');
import mongoose, {Schema} from 'mongoose';

//Esquema para empresas de la BBDD

const internshipOfferSchema = new mongoose.Schema({
  tittle: {type: String, required: true},
  publicationDate: {type: Date, required: true},  
  description: {type: String, required: true},
  company: [{
    type: Schema.Types.ObjectId,
    ref: 'Company', 
    required: false
  }],
  status: {type: Boolean, required: true}, //abierta o cerrada
  numberVacancies: {type: Number, required: true},
  listAspirings: [{
    type: Schema.Types.ObjectId,
    ref: 'Applicant', 
    required: false
  }],
  numberAspirings: {type: Number, required: false}
});

const InternshipOffer = mongoose.model('InternshipOffer', internshipOfferSchema);

//module.exports = InternshipPosition;
export default InternshipOffer;

