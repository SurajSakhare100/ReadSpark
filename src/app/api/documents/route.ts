import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import Document from '@/models/Document';
import User from '@/models/User';
import { authOptions } from '@/app/api/auth/[...nextauth]/config';
import mongoose from 'mongoose';

// Define TypeScript types for body content
interface DocumentBody {
  title: string;
  description: string;
  languages: string[];
  license: string;
  sections: string[];
  content: string;
  githubRepo?: string;
  integrationType: string;
}
// POST: Create a new document
export async function POST(req: Request) {
  try {
    // Get the user session
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: DocumentBody = await req.json();
    await connectDB();

    const userId = session.user.id;
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check project count limit
    if (user.projectCount >= 5) {
      return NextResponse.json({ error: 'Project limit reached (max 5)' }, { status: 403 });
    }
      
      const { title, description, languages, license, sections, content,integrationType } = body;
    if (!title || !languages || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: title, languages, or content' },
        { status: 400 }
      );
    }

    // Create a new document
    const document = await Document.create({
      userId: userId,
      title,
      description,
      languages,
      license,
      sections,
      content,
      integrationType,
      githubRepo: body.githubRepo || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Increment the user's project count
    await User.findOneAndUpdate(
      { userId: userId},
      { $inc: { projectCount: 1 } }, 
      { new: true } 
    );
    return NextResponse.json(document, { status: 201 });
  } catch (error: any) {
    console.error('Error saving document:', error.message || error);
    return NextResponse.json({ error: 'Failed to save document' }, { status: 500 });
  }
}

// GET: Retrieve all documents for the logged-in user
export async function GET() {
  try {
    // Get the user session
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const userId = session.user.id;
    const documents = await Document.find({ userId: userId })
      .sort({ updatedAt: -1 })
      .select('title description githubRepo updatedAt');

    return NextResponse.json(documents, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching documents:', error.message || error);
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
  }
}
