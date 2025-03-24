import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const owner = searchParams.get('owner');
    const repo = searchParams.get('repo');

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!owner || !repo) {
      return new NextResponse('Missing owner or repo parameter', { status: 400 });
    }

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken as string}`,
        'Accept': 'application/vnd.github.v3.raw',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return new NextResponse('README not found', { status: 404 });
      }
      throw new Error('Failed to fetch README');
    }

    const content = await response.text();
    return new NextResponse(content);
  } catch (error) {
    console.error('Error fetching README:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 