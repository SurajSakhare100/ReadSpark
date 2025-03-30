import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import connectDB from '@/lib/db';
import User, { createOrUpdateUser } from '@/models/User';
export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!, // Ensure environment variable is set.
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          scope: 'read:user user:email repo write:repo_hook', // Read/Write Permissions
        },
      },
      profile(profile, tokens: any) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          image: profile.avatar_url,
          username: profile.login,
          accessToken: tokens.access_token || '',
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Connect to the database.
        await connectDB();

        // Use the helper function to create or update the user.
        await createOrUpdateUser({
          userId: profile?.id.toString() || '',
          username: (profile as { login?: string })?.login || '',
          accessToken: account?.access_token || '',
          image: (profile as { avatar_url?: string }).avatar_url || '',
        });

        return true;
      } catch (error) {
        console.error('Error during sign-in callback:', error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.id = user.id;
        token.username = (user as { username: string }).username;
      }
      
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};