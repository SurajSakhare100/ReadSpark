import NextAuth from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/config'; // Import auth config from separate file

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
