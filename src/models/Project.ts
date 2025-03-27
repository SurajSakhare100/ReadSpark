import mongoose, { Schema } from 'mongoose';

export interface IProject {
  userId: string;
  docId: string;
  title: string;
  isGithubRepo: boolean;
  repoUrl?: string;
  visibility?: string;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>({
  userId: { type: String, required: true },
  docId: { type: String, required: true },
  title: { type: String, required: true },
  isGithubRepo: { type: Boolean, default: false },
  repoUrl: { type: String ,required:false},
  visibility: { type: String }
}, { timestamps: true });

export const Project = mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema);

export default Project;