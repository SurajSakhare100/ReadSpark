import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/config';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(
      'https://api.github.com/user/repos?sort=updated&per_page=100',
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );


    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GitHub API Error: ${errorText}`);
    }

    const repos: any[] = await response.json();

    // Filter and transform the repos data
    const transformedRepos = repos.map((repo) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description || '',
      default_branch: repo.default_branch,
      language: repo.language,
      html_url: repo.html_url,
      visibility: repo.visibility,
      updated_at: repo.updated_at,
    }));

    return NextResponse.json(transformedRepos, { status: 200 });
  } catch (error: unknown) {
    console.error('Error fetching repositories:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
