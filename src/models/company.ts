//const mongoose = require('mongoose');
import mongoose from 'mongoose';

//Esquema para empresas de la BBDD

// const companySchema = new mongoose.Schema({
  const companySchema = new mongoose.Schema({
  cif: {type: String, required: false},
  name: {type: String, required: true},
  //Comentados para borrador
  // mail: {type: String, required: true},  // falta verificación de forma
  // sector: {type: String, required: true},
  // ubication: {type: String, required: true},
  // description: {type: String, required: true},
  // publishedOffers: {type: Array, required: false},
});

const Company = mongoose.model('Company', companySchema);
//module.exports = Company;

export default Company;
