
//const mongoose = require('mongoose');
import mongoose, { Schema } from 'mongoose';

//Esquema para empresas de la BBDD

const companySchema = new mongoose.Schema({
  dniCif: {type: String, required: true},
  password: {type: String, required: true}, //aplicar hash
  name: {type: String, required: true},
  mail: {type: String, required: true}, 
  phone: {type: String, required: true}, 
  sector: {type: String, required: true},
  ubication: {type: String, required: true},
  description: {type: String, required: true},
  publishedOffers: [{
    type: Schema.Types.ObjectId,
    ref: 'InternshipOffer',
    required: false
  }]
});



const Company = mongoose.model('Company', companySchema);
//module.exports = Company;

export default Company;
