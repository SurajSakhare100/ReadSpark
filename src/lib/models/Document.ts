import mongoose, { Schema } from 'mongoose';

export interface IDocument {
  userId: string;
  title: string;
  description: string;
  languages: string[];
  license: string;
  sections: string[];
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema = new Schema<IDocument>(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    languages: [{ type: String }],
    license: { type: String },
    sections: [{ type: String }],
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const Document = mongoose.models.Document || mongoose.model<IDocument>('Document', DocumentSchema);

export default Document; 