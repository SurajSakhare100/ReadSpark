import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import  connectDB  from '@/lib/db';
import Document from '@/models/Document';
import  {authOptions}  from '@/app/api/auth/[...nextauth]/config';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, languages, license, sections, content, githubRepo } = body;

    await connectDB();

    const document = await Document.create({
      userId: session.user.id,
      title,
      description,
      languages,
      license,
      sections,
      content,
      githubRepo,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json(document);
  } catch (error: any) {
    console.error('Error saving document:', error);
    return NextResponse.json(
      { error: 'Failed to save document' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const documents = await Document.find({ userId: session.user.id })
      .sort({ updatedAt: -1 })
      .select('title description githubRepo updatedAt');

    return NextResponse.json(documents);
  } catch (error: any) {
    console.error('Error fetching documents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}