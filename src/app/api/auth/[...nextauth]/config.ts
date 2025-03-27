import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import connectDB from '@/lib/db';
import User from '@/models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!, // Ensure environment variable is set.
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          scope: 'read:user user:email repo write:repo_hook',// Read/Write Permissions
        },
      },
      profile(profile, tokens) {
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

        // Check if the user already exists in your database.
        const existingUser = await User.findOne({ username: user.username });

        if (!existingUser) {
          // Create a new user record with initial projectCount.
          await User.create({
            username: user.username,
            projectCount: 0,
            accessToken: account?.access_token || '',
            image:user.image
          });
        }
        return true;
      } catch (error) {
        console.error("Error during sign-in callback:", error);
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
};
