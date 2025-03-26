import connectDB from '@/lib/db';
import { Project } from '@/models/Project';
import User from '@/models/User';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        {
          status: 401,
        }
      );
    }

    const projects = await Project.find({ userId: session.user.id })
      .select('userId docId title isGithubRepo visibility repoUrl createdAt updatedAt')
      .sort({ updatedAt: -1 });

    if (!projects) {
      return NextResponse.json({ projects: [] });
    }
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
    const { title, description, language, type, content, githubRepo } = data;

    // Validate required fields
    if (!title || !description || !language || !type || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate project type and GitHub repo
    if (type === 'github_readme' && !githubRepo) {
      return NextResponse.json(
        { error: 'GitHub repository is required for GitHub README projects' },
        { status: 400 }
      );
    }

    // Get or create user
    let user = await User.findOne({ username: session.user.username });
    if (!user) {
      user = await User.create({
        username: session.user.username,
        email: session.user.email,
      });
    }

    // Check project limit
    if (user.projectCount >= 5) {
      return NextResponse.json(
        { error: 'Maximum project limit (5) reached' },
        { status: 403 }
      );
    }

    const project = await Project.create({
      userId: session.user.id,
      title,
      description,
      language,
      type,
      content,
      githubRepo,
      showBadge: type === 'github_readme'
    });

    // Increment user's project count
    await User.findByIdAndUpdate(user._id, { $inc: { projectCount: 1 } });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}