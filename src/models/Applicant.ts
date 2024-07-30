
//const mongoose = require('mongoose');
import mongoose, { Schema } from 'mongoose';

//Esquema para empresas de la BBDD

const applicantSchema = new mongoose.Schema({
  dniCif: {type: String, required: true},
  password: {type: String, required: true}, 
  name: {type: String, required: true},
  email: {type: String, required: true},  
  phone: {type: String, required: true},
  photo: {type: String, default: null}, //url to image
  cv: {type: String, required: true}, //url a documento
  //Other althernative to VC
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
  wantedJob: {type: String, required: true}, //preferred job position sought
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

