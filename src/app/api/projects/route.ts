import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import { Project } from '@/models/Project';
import User from '@/models/User';
import { authOptions } from '@/app/api/auth/[...nextauth]/config';

export async function GET() {
  try {
    // Get user session using authOptions
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to the database
    await connectDB();

    // Fetch projects for the logged-in user
    const projects = await Project.find({ userId: session.user.id })
      .select('userId docId title isGithubRepo visibility repoUrl createdAt updatedAt')
      .sort({ updatedAt: -1 });

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error fetching projects:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Get user session using authOptions
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Connect to the database
    await connectDB();

    // Check current project count for the user
    const projectCount = await Project.countDocuments({ userId: session.user.id });
    if (projectCount >= 5) {
      return NextResponse.json({ error: 'Project limit reached' }, { status: 403 });
    }

    const data = await request.json();
    const { title, description, language, type, content, githubRepo } = data;

    // Validate required fields
    if (!title || !description || !language || !type || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate project type requirements
    if (type === 'github_readme' && !githubRepo) {
      return NextResponse.json(
        { error: 'GitHub repository is required for GitHub README projects' },
        { status: 400 }
      );
    }

    // Get or create the user by username (assumes session.user.username is available)
    let user = await User.findOne({ username: session.user.username });
    if (!user) {
      user = await User.create({
        username: session.user.username,
        email: session.user.email,
      });
    }

    // Check user's project count
    if (user.projectCount >= 5) {
      return NextResponse.json({ error: 'Maximum project limit (5) reached' }, { status: 403 });
    }

    // Create the new project
    const project = await Project.create({
      userId: session.user.id,
      title,
      description,
      language,
      type,
      content,
      githubRepo,
      showBadge: type === 'github_readme',
    });

    // Increment user's project count
    await User.findByIdAndUpdate(user._id, { $inc: { projectCount: 1 } });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating project:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
