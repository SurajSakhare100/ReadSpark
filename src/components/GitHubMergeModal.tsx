'use client';

import { useState } from 'react';
import { Github, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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

interface GitHubMergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMerge: (owner: string, repo: string, repoDetails: Repository) => void;
  documentId: string;
}

export default function GitHubMergeModal({ isOpen, onClose, onMerge, documentId }: GitHubMergeModalProps) {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleMerge = async (repo: Repository) => {
    const [owner, repoName] = repo.full_name.split('/');
    onMerge(owner, repoName, repo);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Link with GitHub Repository</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="py-4">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          )}
          {error && (
            <div className="text-red-500 text-center py-4">
              {error}
            </div>
          )}
          {!loading && !error && repos.length === 0 && (
            <div className="text-center py-8">
              <Github className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No repositories found</p>
            </div>
          )}
          {repos.map((repo) => (
            <button
              key={repo.id}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => handleMerge(repo)}
            >
              <div className="flex items-start gap-3">
                <Github className="h-5 w-5 mt-1" />
                <div>
                  <div className="font-medium">{repo.full_name}</div>
                  {repo.description && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {repo.description}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}