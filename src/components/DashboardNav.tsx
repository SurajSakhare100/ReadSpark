'use client';

import { signOut, useSession } from 'next-auth/react';

export default function DashboardNav() {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between  shadow px-6 py-4 dark:border-b">
      <div className="flex items-center space-x-4">
        {session?.user?.image && (
          <img
            src={session.user.image}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
        )}
        <div>
          <p className="text-md font-medium ">
            {session?.user?.name || 'User'}
          </p>
        </div>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: '/auth/signin' })}
        className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
}