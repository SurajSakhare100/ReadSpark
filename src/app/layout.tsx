import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider from '@/components/providers/AuthProvider';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { icons } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ReadSpark - AI-Powered Github Documentation Generator',
  description: 'Generate beautiful documentation with AI',
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        {/* Viewport Meta Tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
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
