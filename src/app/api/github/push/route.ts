import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { owner, repo, content, sha } = await request.json();

    if (!session?.user?.accessToken) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!owner || !repo || !content) {
      return new NextResponse('Missing required parameters', { status: 400 });
    }

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/README.md`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        message: 'Update README.md via ReadSpark',
        content: Buffer.from(content).toString('base64'),
        sha: sha,
      }),
    });
    console.log(response)

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update README');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error pushing to GitHub:', error);
    return new NextResponse(error instanceof Error ? error.message : 'Internal Server Error', 
      { status: 500 }
    );
  }
} 