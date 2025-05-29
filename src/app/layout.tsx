import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider from '@/components/providers/AuthProvider';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@vercel/analytics/next';
import Head from 'next/head';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ReadSpark - AI-Powered GitHub Documentation Generator',
  description: 'Generate beautiful documentation with AI',
  icons: {
    icon: '/logo.png',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        {/* Basic SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Generate beautiful GitHub documentation effortlessly with AI-powered ReadSpark." />
        <meta name="keywords" content="GitHub README generator, AI documentation, Markdown editor, Readme builder, Documentation tool" />
        <meta name="author" content="ReadSpark Team" />
        <link rel="canonical" href="https://readspark.vercel.app/" />

        {/* Open Graph (OG) - Social Media Sharing */}
        <meta property="og:title" content="ReadSpark - AI-Powered GitHub Documentation Generator" />
        <meta property="og:description" content="Create high-quality README files effortlessly with AI-powered ReadSpark." />
        <meta property="og:image" content="https://readspark.vercel.app/favicon.ico" />
        <meta property="og:url" content="https://readspark.vercel.app/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card - Better Previews on Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ReadSpark - AI-Powered GitHub Documentation Generator" />
        <meta name="twitter:description" content="Create high-quality README files effortlessly with AI-powered ReadSpark." />
        <meta name="twitter:image" content="https://readspark.vercel.app/favicon.ico" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-MJXHR9BRJ6"></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-MJXHR9BRJ6');
        `}
        </Script>
      </Head>

      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Analytics />
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
