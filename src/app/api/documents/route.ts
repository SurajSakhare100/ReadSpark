import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import Document from '@/models/Document';
import User from '@/models/User';
import { authOptions } from '@/app/api/auth/[...nextauth]/config';

// Define TypeScript types for body content
interface DocumentBody {
  title: string;
  description: string;
  languages: string[];
  license: string;
  sections: string[];
  content: string;
  githubRepo?: string;
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

    // Validate required fields
    const { title, description, languages, license, sections, content } = body;
    if (!title || !languages || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: title, languages, or content' },
        { status: 400 }
      );
    }

    await connectDB();

    // Create a new document
    const document = await Document.create({
      username: session.user.username,
      title,
      description,
      languages,
      license,
      sections,
      content,
      githubRepo: body.githubRepo || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Increment the user's project count
    const user=await User.findByIdAndUpdate(
      { username: session.user.username },
      { $inc: { projectCount: 1 } }, 
      { new: true } // Returns the updated document
    );
    console.log(user)
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

    // Fetch documents for the user
    const documents = await Document.find({ username: session.user.username })
      .sort({ updatedAt: -1 })
      .select('title description githubRepo updatedAt');

    return NextResponse.json(documents, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching documents:', error.message || error);
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
  }
}
