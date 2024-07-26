
//const mongoose = require('mongoose');
import mongoose, { Schema } from 'mongoose';

//Esquema para empresas de la BBDD

const applicantSchema = new mongoose.Schema({
  dniCif: {type: String, required: true},
  password: {type: String, required: true}, //aplicar hash
  name: {type: String, required: true},
  email: {type: String, required: true},  // falta verificación de forma
  phone: {type: String, required: true},
  photo: {type: String, required: false}, //url a imagen
  cv: {type: String, required: true}, //url a documento
  //Alternativa a cv
  // cv : [{
  //   company_name: {type: String, required: true},
  //   start_date: {type: Date, required: true},
  //   end_date: {type: Date, required: true},
  //   role: {type: String, required: false},
  //   job: {type: Boolean, required: true}, //experiencia laboral o académica
  //   description: {type: String, required: false},
  // }],
  ubication: {type: String, required: false},
  role: {type: String, required: true}, //presencial - teletrabajo - hibrido
  typeJob: {type: String, required: true}, //renumerado, no renumerado, voluntariado
  wantedJob: {type: String, required: true}, //puesto preferido que se busca
  geographically_mobile: {type: Boolean, required: true},
  disponibility: {type: Boolean, required: true},
  preferredOffers: [{
    type: Schema.Types.ObjectId,
    ref: 'Offer',
    required: false
  }],
  suscribedOffers: [{
    type: Schema.Types.ObjectId,
    ref: 'Offer',
    required: false
  }] 
});

const Applicant = mongoose.model('Applicant', applicantSchema);
//module.exports = Applicant;

export default Applicant;

