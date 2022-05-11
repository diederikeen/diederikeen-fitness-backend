import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255,
    min: 2,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 1,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 8,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export const UserModal = mongoose.model('userModal', userSchema);
