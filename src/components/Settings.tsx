'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import DashboardNav from './DashboardNav';

export default function SettingsPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Load the theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  // Toggle the theme and save it to localStorage
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className=" mx-auto  h-screen">
      <DashboardNav />
      <div className='p-4'><h1 className="text-3xl font-bold mb-4 dark:text-white ">Settings</h1>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">Theme</span>
          <Button onClick={toggleTheme} className="flex items-center gap-2">
            {theme === 'light' ? (
              <>
                <Moon className="h-4 w-4" />
                Switch to Dark Mode
              </>
            ) : (
              <>
                <Sun className="h-4 w-4" />
                Switch to Light Mode
              </>
            )}
          </Button>
        </div>
      </div></div>
    </div>
  );
}