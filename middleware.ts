import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Middleware to protect /editor and /create routes
export async function middleware(req: NextRequest) {
  // Retrieve the token using NextAuth's getToken
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // Check if the request is for an editor or create page
  if (pathname.startsWith('/editor') || pathname.startsWith('/create')) {
    // If no token, redirect to sign-in page
    if (!token) {
      const signInUrl = new URL('/auth/signin', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }
  
  // Allow the request to proceed if authenticated or not on protected pages
  return NextResponse.next();
}

// Specify which paths should be matched by this middleware
export const config = {
  matcher: ['/editor/:path*', '/create/:path*'],
};
