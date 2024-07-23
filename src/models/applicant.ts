//const mongoose = require('mongoose');
import mongoose from 'mongoose';

//Esquema para empresas de la BBDD 

//const applicantSchema = mongoose.Schema({
  const applicantSchema = new mongoose.Schema({
  dni: {type: String, required: true},
  name: {type: String, required: true},
  //Comentados para borrador
  // mail: {type: String, required: true},  // falta verificación de forma
  // //phone ??
  // photo: {type: String, required: false},
  // experience : [{
  //   company_name: {type: String, required: true},
  //   start_date: {type: Date, required: true},
  //   end_date: {type: Date, required: true},
  //   role: {type: String, required: false},
  //   job: {type: Boolean, required: true}, //experiencia laboral o académica
  //   description: {type: String, required: false},
  // }],
  // ubication: {type: String, required: false},
  // geographically_mobile: {type: Boolean, required: true},
  // disponibility: {type: Boolean, required: true},
  // preferredOffers: {type: Array, required: false}, //_id o embebido ?
  // suscribedOffers: {type: Array, required: false}, //_id o embebido ?

});

const Applicant = mongoose.model('Applicant', applicantSchema);
//module.exports = Applicant;

export default Applicant;

