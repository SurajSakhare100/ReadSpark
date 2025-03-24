'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ThemeToggle } from './ThemeToggle';

export function Navigation() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          ReadSpark
        </Link>
        <nav className="flex items-center space-x-4">
          {status === 'loading' ? (
            <div className="h-9 w-20 bg-muted animate-pulse rounded" />
          ) : session ? (
            <>
              <Link
                href="/dashboard"
                className="hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/editor"
                className="hover:text-primary transition-colors"
              >
                New Project
              </Link>
            </>
          ) : (
            <Link
              href="/auth/signin"
              className="hover:text-primary transition-colors"
            >
              Sign In
            </Link>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
} 