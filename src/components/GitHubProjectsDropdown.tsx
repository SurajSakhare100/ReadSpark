import React, { useState, useEffect } from 'react';
import { ChevronDown, Github } from 'lucide-react';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  default_branch: string;
  language: string;
  html_url: string;
  visibility: string;
  updated_at: string;
}

interface GitHubProjectsDropdownProps {
  onSelectProject: (owner: string, repo: string, repoDetails: Repository) => void;
}

export default function GitHubProjectsDropdown({ onSelectProject }: GitHubProjectsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/github/repos');
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Github className="h-4 w-4" />
        Select GitHub Project
        <ChevronDown className="h-4 w-4 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-64 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="py-1 max-h-60 overflow-auto">
            {loading && (
              <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                Loading repositories...
              </div>
            )}
            {error && (
              <div className="px-4 py-2 text-sm text-red-500">
                {error}
              </div>
            )}
            {!loading && !error && repos.length === 0 && (
              <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                No repositories found
              </div>
            )}
            {repos.map((repo) => (
              <button
                key={repo.id}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  const [owner, repoName] = repo.full_name.split('/');
                  onSelectProject(owner, repoName, repo);
                  setIsOpen(false);
                }}
              >
                <div>
                  <div className="font-medium">{repo.full_name}</div>
                  {repo.description && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {repo.description}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 