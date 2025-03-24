import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import Project from '@/models/Project';

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    await connectDB();

    const projects = await Project.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .limit(5);

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    await connectDB();

    const projectCount = await Project.countDocuments({ userId: session.user.id });
    if (projectCount >= 5) {
      return NextResponse.json(
        { error: 'Project limit reached' },
        { status: 403 }
      );
    }

    const data = await request.json();
    const project = await Project.create({
      ...data,
      userId: session.user.id,
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}