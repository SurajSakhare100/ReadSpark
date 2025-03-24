'use client';

import { signIn } from 'next-auth/react';
import { Github } from 'lucide-react';
import Image from 'next/image';

export default function SignIn() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Welcome to ReadSpark
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to start creating beautiful documentation
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <button
            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
            className="w-full flex items-center justify-center gap-3 bg-[#24292F] text-white px-4 py-3 rounded-lg hover:bg-[#24292F]/90 transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>Continue with GitHub</span>
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">
                By signing in, you agree to our terms and conditions
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Why GitHub?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                We use GitHub authentication to:
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col items-center p-4 rounded-lg border border-border bg-card">
                <svg
                  className="w-8 h-8 text-primary mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <h4 className="text-sm font-medium">Secure Authentication</h4>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  No need to remember another password
                </p>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg border border-border bg-card">
                <svg
                  className="w-8 h-8 text-primary mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
                <h4 className="text-sm font-medium">Developer Friendly</h4>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  Perfect for managing documentation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 