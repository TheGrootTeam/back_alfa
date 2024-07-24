//const mongoose = require('mongoose');
import mongoose, { Schema } from 'mongoose';

//Esquema para usuarios de la BBDD

const userSchema = new mongoose.Schema({
  dniCif: {type: String, required: true},
  password: {type: String, required: true}, //aplicar hash
  enterprise: {type: Boolean, required: true}, //true: empresa - false: aspirante 
  mail: {type: String, required: true},
  
  // xxx: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Xxx',
  //   required: false
  // }]
});



const User = mongoose.model('User', userSchema);
//module.exports = Company;

export default User;
