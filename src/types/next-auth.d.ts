import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
      name?: string | null;
      image?: string | null;
      accessToken: string;
    };
  }

  interface User {
    id: string;
    username: string;
    accessToken: string;
    name?: string | null;
    image?: string | null;
  }
  interface Profile {
    id: string;
    username: string;
    accessToken: string;
    name?: string | null;
    image?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    username?: string;
    accessToken?: string;
  }
}
