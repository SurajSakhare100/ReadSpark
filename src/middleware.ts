import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: Request) {
  const token = await getToken({ req: request as any, secret: process.env.NEXTAUTH_SECRET });

  const url = new URL(request.url);
  const pathname = url.pathname;

  // Allow access to public routes and static files
  if (
    pathname.startsWith('/auth/signin') || // Allow sign-in page
    pathname.startsWith('/api/auth') || // Allow NextAuth API routes
    pathname.startsWith('/_next') || // Allow Next.js static files
    pathname.startsWith('/favicon.ico') // Allow favicon
  ) {
    return NextResponse.next();
  }

  // Redirect to /auth/signin if the user is not authenticated
  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};