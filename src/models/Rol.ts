import mongoose from 'mongoose';

const RolSchema = new mongoose.Schema({
  rol: { type: String, index: true }
});

const Rol = mongoose.model('Rol', RolSchema);

export default Rol;
