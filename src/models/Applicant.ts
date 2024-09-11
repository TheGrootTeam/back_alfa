//const mongoose = require('mongoose');
import mongoose, { Schema } from 'mongoose';

//Esquema para empresas de la BBDD

const applicantSchema = new mongoose.Schema({
  dniCif: { type: String, required: true, index: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  photo: { type: String, default: null }, //url to image
  cv: { type: String, required: true }, //url a documento
  ubication: { type: String, required: false },
  typeJob: { type: String, required: true }, //presencial - teletrabajo - hibrido
  internType: { type: String, required: true }, //renumerado, no renumerado, voluntariado
  wantedRol: [{ type: Schema.Types.ObjectId, ref: 'Rol', required: true }], //preferred job position sought
  mainSkills: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Skill',
      required: true
    }
  ],
  geographically_mobile: { type: Boolean, required: true },
  disponibility: { type: Boolean, required: true },
  preferredOffers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Offer',
      required: false
    }
  ],
  suscribedOffers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Offer',
      required: false
    }
  ]
});

const Applicant = mongoose.model('Applicant', applicantSchema);
//module.exports = Applicant;

export default Applicant;
