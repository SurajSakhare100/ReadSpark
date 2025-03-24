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

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-1 mt-2">
      <div className="container flex h-16 items-center  bg-white rounded-full shadow-md">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8">
            <FileText className="w-full h-full text-primary" />
          </div>
          <span className="text-xl font-semibold">
            ReadSpark
          </span>
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
            Readme Generator
          </Link>
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
                <Link href="/generator" className="w-full text-xl font-medium">
                  Readme Generator
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}