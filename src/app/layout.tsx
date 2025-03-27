import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider from '@/components/providers/AuthProvider';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ReadSpark - AI-Powered Github Documentation Generator',
  description: 'Generate beautiful documentation with AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
