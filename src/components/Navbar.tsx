'use client';

import Link from 'next/link';
import { FileText, Menu } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ThemeToggle } from './theme-toggle';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Navbar() {
  const { data: session } = useSession(); // Get session data

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-1 mt-2">
      <div className="container flex h-16 items-center rounded-full shadow-md border dark:border-opacity-50  dark:border-white">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8">
           <Image src={require("../public/logo.png")} alt="Logo" width={40} height={40} className="w-full h-full" />
          </div>
          <span className="text-xl font-semibold">ReadSpark</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 ml-auto">
          <Link
            href="/"
            className="text-lg font-medium text-primary hover:text-primary/80"
          >
            Landing
          </Link>
          <Link
            href="/create"
            className="text-lg font-medium text-muted-foreground hover:text-foreground"
          >
            Create Readme
          </Link>

          {session?.user ? (
            <>
              {/* Show Dashboard if user is signed in */}
              <Link
                href="/dashboard"
                className="text-lg font-medium text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <Button
              size="sm"
              onClick={() => signIn('github')}
            >
              Sign In
            </Button>
          )}

          <ThemeToggle />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[360px] p-4 bg-background/95 backdrop-blur-sm"
            >
              <DropdownMenuItem asChild className="py-3 px-4 focus:bg-accent">
                <Link href="/" className="w-full text-xl font-medium">
                  Landing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="py-3 px-4 focus:bg-accent">
                <Link href="/create" className="w-full text-xl font-medium">
                  Create Readme
                </Link>
              </DropdownMenuItem>
              {session?.user ? (
                <>
                  <DropdownMenuItem asChild className="py-3 px-4 focus:bg-accent">
                    <Link href="/dashboard" className="w-full text-xl font-medium">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="py-3 px-4 focus:bg-accent">
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="w-full text-xl font-medium text-left"
                    >
                      Sign Out
                    </button>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild className="py-3 px-4 focus:bg-accent">
                  <button
                    onClick={() => signIn('github')}
                    className="w-full text-xl font-medium text-left"
                  >
                    Sign In
                  </button>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}