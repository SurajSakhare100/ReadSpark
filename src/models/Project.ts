import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['readme', 'profile', 'documentation'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  githubRepo: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project; 