import mongoose from 'mongoose';

const SectorSchema = new mongoose.Schema({
  sector: { type: String, index: true }
});

const Sector = mongoose.model('Sector', SectorSchema);

export default Sector;
