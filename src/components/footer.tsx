import Link from 'next/link';
import { Github, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-secondary">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-lg">
          <div className="space-y-4">
            <h3 className="font-semibold text-xl">ReadSpark</h3>
            <p className="text-muted-foreground">
              AI-powered documentation generator for modern developers.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Product</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link href="/features" className="hover:text-primary">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-primary">Pricing</Link></li>
              <li><Link href="/docs" className="hover:text-primary">Documentation</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary">About</Link></li>
              <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-primary">Careers</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Connect</h4>
            <div className="flex space-x-4">
              <Link href="https://github.com/SurajSakhare100" className="text-muted-foreground hover:text-primary">
                <Github className="h-6 w-6" />
              </Link>
              <Link href="https://x.com/surajsakhare100" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t text-center  ">
          <p>© {new Date().getFullYear()} ReadSpark. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}