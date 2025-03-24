'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 px-4 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-destructive">Oops!</h1>
          <h2 className="text-2xl font-semibold">Authentication Error</h2>
          <p className="text-muted-foreground">
            {error === 'AccessDenied'
              ? 'You do not have permission to sign in.'
              : error === 'Configuration'
              ? 'There is a problem with the server configuration.'
              : 'An error occurred during authentication.'}
          </p>
          <div className="pt-4">
            <Link
              href="/auth/signin"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Try Again
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 