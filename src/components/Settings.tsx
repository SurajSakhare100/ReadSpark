'use client';
import DashboardNav from './DashboardNav';
import { ThemeToggle } from './theme-toggle';

export default function SettingsPage() {

  return (
    <div className=" mx-auto  h-screen">
      <DashboardNav />
      <div className='p-4'><h1 className="text-3xl font-bold mb-4 dark:text-white ">Settings</h1>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">Theme</span>
          <ThemeToggle />
        </div>
      </div>
      </div>
    </div>
  );
}