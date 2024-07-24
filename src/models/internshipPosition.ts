//internshipPosition

//const mongoose = require('mongoose');
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

//Esquema para empresas de la BBDD 

//const internshipPositionSchema = mongoose.Schema({
  const internshipPositionSchema = new mongoose.Schema({
  tittle: {type: String, required: true},
  publicationDate: {type: Date, required: true},

  //Comentados para borrador
  // description: {type: String, required: true},
  // company: {type: ObjectId, required: true}, //o array con nombre y cif
  // status: {type: Boolean, required: true}, //abierta o cerrada
  // numberVacancies: {type: Number, required: true},
  // listAspirings: {type: String, required: true},
  // numberAspirings: {type: Number, required: false}

});

const InternshipPosition = mongoose.model('InternshipPosition', internshipPositionSchema);

//module.exports = InternshipPosition;
export default InternshipPosition;

