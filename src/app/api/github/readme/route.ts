import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/config';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const owner = searchParams.get('owner');
    const repo = searchParams.get('repo');

    // Validate required parameters
    if (!owner || !repo) {
      return NextResponse.json(
        { error: 'Missing required parameters: owner or repo' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          Accept: 'application/vnd.github.v3.raw',
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'README not found' }, { status: 404 });
      }
      const errorText = await response.text();
      throw new Error(`GitHub API Error: ${errorText}`);
    }

    const content = await response.text();
    return NextResponse.json({ content });
    
  } catch (error: unknown) {
    console.error('Error fetching README:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
