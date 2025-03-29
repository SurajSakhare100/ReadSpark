import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/config';

interface GitHubRequestBody {
  owner: string;
  repo: string;
  content: string;
  sha?: string;
}

// Helper function to encode content to Base64
const encodeToBase64 = (content: string) =>
  Buffer.from(content, 'utf-8').toString('base64');

// Helper function to create GitHub API headers
const createHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
  Accept: 'application/vnd.github.v3+json',
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = (await request.json()) as GitHubRequestBody;
    const { owner, repo, content, sha } = body;

    // Validate required fields
    if (!owner || !repo || !content) {
      return NextResponse.json(
        { error: 'Missing required parameters: owner, repo, or content' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/README.md`,
      {
        method: 'PUT',
        headers: createHeaders(session.user.accessToken),
        body: JSON.stringify({
          message: 'Update README.md via ReadSpark',
          content: encodeToBase64(content),
          sha,
        }),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorMessage = errorResponse?.message || 'Failed to update README';
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    console.error('Error pushing to GitHub:', error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}
