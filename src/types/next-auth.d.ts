import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: string;
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username: string;
    };
  }

  interface User {
    username: string;
  }
} 