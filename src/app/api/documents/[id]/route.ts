import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import Document from '@/models/Document';
import { authOptions } from '@/app/api/auth/[...nextauth]/config';
import User from '@/models/User';

// GET method to fetch a document by ID
export async function GET(
  req: NextRequest,
  params : { params: { id: string } }
) {
  try {
    const id = await params.id;
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const userId = session.user.id;

    const document = await Document.findOne({ _id: id, userId });

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    return NextResponse.json(document, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching document:', error.message || error);
    return NextResponse.json({ error: 'Failed to fetch document' }, { status: 500 });
  }
}

// PUT method to update a document by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } =await params;
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const userId = session.user.id;

    const existingDoc = await Document.findOne({ _id: id, userId });

    if (!existingDoc) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    const body = await req.json();
    const { title, description, languages, license, sections, content } = body;

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

// DELETE method to delete a document by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } =await params;
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const userId = session.user.id;

    const document = await Document.findOne({ _id: id, userId });

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    await Document.deleteOne({ _id: id });
    await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { projectCount: -1 } },
      { new: true }
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting document:', error.message || error);
    return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 });
  }
}
