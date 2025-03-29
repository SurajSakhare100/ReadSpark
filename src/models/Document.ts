import { Moon } from 'lucide-react';
import mongoose, { Mongoose } from 'mongoose';

const documentSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default:""
  },
  languages: {
    type: [String],
    default: [],
  },
  license: {
    type: String,
    required: false,
    default:""
  },
  sections: {
    type: [String],
    default: ['installation', 'usage', 'contributing'],
  },
  content: {
    type: String,
    required: true,
  },
  packageManager: {
    type: String,
    enum: ['npm', 'yarn'],
    default: 'npm',
  },
  integrationType: {
    type: String,
    enum: ['github', 'readme'],
    default: 'readme',
  },
  githubRepo: {
    type: String,
    default: '', 
  },
  userId: {
    type: String,
    required: true,
    default: '', 
  },
}, { timestamps: true });

const Document = mongoose.models.Document || mongoose.model('Document', documentSchema);

export default Document;
