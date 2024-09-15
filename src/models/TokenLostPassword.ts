import mongoose, { Schema } from 'mongoose';

const tokenLostPasswordSchema = new mongoose.Schema({
  token: { type: String, required: true, index: true },
  userId: { type: Schema.Types.ObjectId, required: true, index: true }
});

const TokenLostPassword = mongoose.model('TokenLostPassword', tokenLostPasswordSchema);

export default TokenLostPassword;
