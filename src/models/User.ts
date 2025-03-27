import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  projectCount: {
    type: Number,
    default: 0,
  },
  accessToken: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;