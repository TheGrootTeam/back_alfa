//const mongoose = require('mongoose');
//require('dotenv').config();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const MONGO_URI: string = process.env.MONGO_URI || 'mongodb://localhost:27017/proyecto';
//const MONGO_URI: string = process.env.MONGO_URI_DEV || 'mongodb://localhost:27017/proyecto';
//Events listeners
mongoose.connection.on('error', (err) => {
  console.log('### Connexion error MongoDB: ', err);
});
mongoose.connection.on('open', () => {
  console.log('### Connected at MongoDB <', mongoose.connection.name, '>\n');
});

// mongoose.connect('mongodb://127.0.0.1:27017/nodepopDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });  //  Not applicable to TypeScript
mongoose.connect(MONGO_URI);


//module.exports = mongoose.connection;
export default mongoose.connection;
