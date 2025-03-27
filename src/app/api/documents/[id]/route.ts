import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import Document from '@/models/Document';
import { authOptions } from '@/app/api/auth/[...nextauth]/config';
import mongoose from 'mongoose';
import User from '@/models/User';

// Define TypeScript type for route parameters.
interface RouteParams {
  params: { id: string };
}

// Helper function to validate MongoDB ObjectId.
const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

// ✅ GET: Fetch a single document by ID.
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params; // Await the params promise and destructure id.
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid document ID' }, { status: 400 });
    }

    await connectDB();

    const document = await Document.findOne({
      _id: id,
      username: session.user.username,
    });

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    return NextResponse.json(document, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching document:', error.message || error);
    return NextResponse.json({ error: 'Failed to fetch document' }, { status: 500 });
  }
}

// ✅ PUT: Update a document by ID.
export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params; // Await the params promise and destructure id.
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid document ID' }, { status: 400 });
    }

    await connectDB();

    const existingDoc = await Document.findOne({
      _id: id,
      username: session.user.username,
    });

    if (!existingDoc) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    const body = await req.json();
    const { title, description, languages, license, sections, content } = body;

    // Validate required fields.
    if (
      !title ||
      !Array.isArray(languages) ||
      !license ||
      !Array.isArray(sections) ||
      !content
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updatedDoc = await Document.findByIdAndUpdate(
      id,
      {
        title,
        description,
        languages,
        license,
        sections,
        content,
        updatedAt: new Date(),
      },
      { new: true }
    );

    return NextResponse.json(updatedDoc, { status: 200 });
  } catch (error: any) {
    console.error('Error updating document:', error.message || error);
    return NextResponse.json({ error: 'Failed to update document' }, { status: 500 });
  }
}

// ✅ DELETE: Remove a document by ID.
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params; // Await the params promise and destructure id.
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid document ID' }, { status: 400 });
    }

    await connectDB();

    const document = await Document.findOne({
      _id: id,
      username: session.user.username,
    });

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    await Document.deleteOne({ _id: id });
    await User.findOneAndUpdate(
      { username: session.user.username },
      { $inc: { projectCount: -1 } },
      { new: true }
    );
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting document:', error.message || error);
    return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 });
  }
}
