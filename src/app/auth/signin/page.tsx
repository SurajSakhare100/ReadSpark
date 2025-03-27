'use client';

import { signIn } from 'next-auth/react';
import { Github } from 'lucide-react';

export default function SignIn() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 px-4 text-center">
        <h2 className="text-3xl font-bold">Welcome to ReadSpark</h2>
        <p className="text-sm text-muted-foreground">
          Sign in to start creating beautiful documentation.
        </p>
        <button
          onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
          className="w-full flex items-center justify-center gap-3 bg-[#24292F] text-white px-4 py-3 rounded-lg hover:bg-[#24292F]/90 transition-colors"
        >
          <Github className="w-5 h-5" />
          Continue with GitHub
        </button>
      </div>
    </div>
  );
}
