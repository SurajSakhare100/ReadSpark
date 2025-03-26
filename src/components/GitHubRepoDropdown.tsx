'use client';

import { useState } from 'react';
import { MoreVertical, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import GitHubMergeModal from './GitHubMergeModal';

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

interface GitHubRepoDropdownProps {
  documentId: string;
  onMerge: (owner: string, repo: string, repoDetails: Repository) => void;
}

export default function GitHubRepoDropdown({ documentId, onMerge }: GitHubRepoDropdownProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
            <Github className="mr-2 h-4 w-4" />
            Merge with GitHub
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <GitHubMergeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onMerge={onMerge}
        documentId={documentId}
      />
    </>
  );
}