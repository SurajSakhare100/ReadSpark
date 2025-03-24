import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import  {authOptions}  from '@/app/api/auth/[...nextauth]/config';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.accessToken) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100', {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }

    const repos = await response.json();
    
    // Filter and transform the repos data
    const transformedRepos = repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description || '',
      default_branch: repo.default_branch,
      language: repo.language,
      html_url: repo.html_url,
      visibility: repo.visibility,
      updated_at: repo.updated_at
    }));

    return NextResponse.json(transformedRepos);
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 