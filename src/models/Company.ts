//const mongoose = require('mongoose');
import mongoose, { Schema } from 'mongoose';

//Esquema para empresas de la BBDD

const companySchema = new mongoose.Schema({
  dniCif: { type: String, required: true, index: true },
  password: { type: String, required: true }, //aplicar hash
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  sector: { type: Schema.Types.ObjectId, ref: 'Sector', required: true },
  ubication: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String, required: true },
  publishedOffers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Offer',
      required: false,
      index: true
    }
  ]
});

const Company = mongoose.model('Company', companySchema);
//module.exports = Company;

export default Company;
