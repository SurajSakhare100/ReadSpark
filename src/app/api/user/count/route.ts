import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { authOptions } from '@/app/api/auth/[...nextauth]/config';
import User from '@/models/User';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ username: session.user.username });

    return NextResponse.json({ count:user.projectCount }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error counting projects:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
