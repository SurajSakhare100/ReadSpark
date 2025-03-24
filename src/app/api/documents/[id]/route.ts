import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import  connectDB  from '@/lib/db';
import Document from '@/lib/models/Document';
import  {authOptions}  from '@/app/api/auth/[...nextauth]/config';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // First verify the document belongs to the user
    const document = await Document.findOne({
      _id: params.id,
      userId: session.user.id,
    });

    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    await Document.deleteOne({ _id: params.id });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting document:', error);
    return NextResponse.json(
      { error: 'Failed to delete document' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const document = await Document.findOne({
      _id: params.id,
      userId: session.user.id,
    });

    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(document);
  } catch (error: any) {
    console.error('Error fetching document:', error);
    return NextResponse.json(
      { error: 'Failed to fetch document' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // First verify the document belongs to the user
    const existingDoc = await Document.findOne({
      _id: params.id,
      userId: session.user.id,
    });

    if (!existingDoc) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { title, description, languages, license, sections, content } = body;

    const updatedDoc = await Document.findByIdAndUpdate(
      params.id,
      {
        title,
        description,
        languages,
        license,
        sections,
        content,
      },
      { new: true }
    );

    return NextResponse.json(updatedDoc);
  } catch (error: any) {
    console.error('Error updating document:', error);
    return NextResponse.json(
      { error: 'Failed to update document' },
      { status: 500 }
    );
  }
} 