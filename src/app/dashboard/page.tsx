'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { 
  Plus, 
  Search, 
  FileText, 
  Calendar, 
  MoreVertical,
  Edit3,
  Trash2,
  Download,
  Loader2
} from 'lucide-react';
import { format } from 'date-fns';
import GitHubProjectsDropdown from '@/components/GitHubProjectsDropdown';
import MarkdownPreview from '@/components/MarkdownPreview';
import { useRouter } from 'next/navigation';

interface Document {
  _id: string;
  title: string;
  description: string;
  languages: string[];
  updatedAt: string;
  githubRepo?: string;
  content?: string;
  repoUrl?: string;
  visibility?: string;
  lastUpdated?: string;
  defaultBranch?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [readmeContent, setReadmeContent] = useState<string>('');

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('/api/documents');
        if (!response.ok) throw new Error('Failed to fetch documents');
        const data = await response.json();
        setDocuments(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchDocuments();
    }
  }, [session]);

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/documents/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete document');
      setDocuments(docs => docs.filter(doc => doc._id !== id));
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSelectProject = async (owner: string, repo: string, repoDetails: any) => {
    try {
      setLoading(true);
      setError(null);

      // Check if project already exists
      const existingDoc = documents.find(doc => 
        'githubRepo' in doc && doc.githubRepo === `${owner}/${repo}`
      );

      if (existingDoc) {
        setError('This repository has already been imported');
        return;
      }

      // Fetch README content
      const readmeResponse = await fetch(`/api/github/readme?owner=${owner}&repo=${repo}`);
      if (!readmeResponse.ok) {
        throw new Error('Failed to fetch README');
      }
      const content = await readmeResponse.text();

      // Save to database
      const saveResponse = await fetch('/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: repo,
          content: content,
          githubRepo: `${owner}/${repo}`,
          description: repoDetails.description || 'Imported from GitHub',
          languages: repoDetails.language ? [repoDetails.language] : [],
          repoUrl: repoDetails.html_url,
          visibility: repoDetails.visibility,
          lastUpdated: repoDetails.updated_at,
          defaultBranch: repoDetails.default_branch
        })
      });

      if (!saveResponse.ok) {
        throw new Error('Failed to save document');
      }

      const savedDoc = await saveResponse.json();
      setDocuments(prev => [...prev, savedDoc]);
      router.push(`/editor/${savedDoc._id}`);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import project');
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Please sign in to view your dashboard</h2>
          <Link
            href="/auth/signin"
            className="inline-block px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white text-black p-4 flex flex-col justify-between border-r border-gray-800">
        <div>
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>
          <ul className="space-y-2">
            <li><Link href="/" className="block py-2 px-4 rounded hover:bg-gray-700">All Files</Link></li>
            <li><Link href="/team-folders" className="block py-2 px-4 rounded hover:bg-gray-700">Team Folders</Link></li>
            <li><Link href="/upgrade" className="block py-2 px-4 rounded hover:bg-gray-700">Upgrade</Link></li>
          </ul>
        </div>
        <div className="mt-auto">
          <h3 className="font-semibold mb-2">Recent Projects</h3>
          <ul className="space-y-1">
            {documents.slice(0, 5).map(doc => (
              <li key={doc._id}>
                <Link 
                  href={`/editor/${doc._id}`}
                  className="block py-1 px-2 text-sm rounded hover:bg-gray-700 truncate"
                >
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <main className="flex-1 container mx-auto px-4 py-8 bg-white text-black">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Projects</h1>
            <p className="text-gray-400 mt-1">
              Manage and organize your documentation projects
            </p>
          </div>
          <Link
            href="/create"
            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Project
          </Link>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg bg-white text-black focus:border-black focus:ring-1 focus:ring-black transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <GitHubProjectsDropdown onSelectProject={handleSelectProject} />
          </div>

          <div className="min-h-[200px] bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            {loading && (
              <div className="flex items-center justify-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
              </div>
            )}
            
            {error && (
              <div className="text-red-500 text-center p-4">
                {error}
              </div>
            )}

            {!loading && !error && !readmeContent && (
              <div className="text-gray-500 dark:text-gray-400 text-center p-4">
                Select a GitHub project to view its README
              </div>
            )}

            {!loading && !error && readmeContent && (
              <MarkdownPreview content={readmeContent} />
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        ) : error ? (
          <div className="bg-red-500 text-white p-4 rounded-lg">
            {error}
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-600 rounded-lg">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No projects found</h3>
            <p className="text-gray-400 mb-4">
              {searchQuery
                ? "No projects match your search"
                : "Start by creating your first project"}
            </p>
            {!searchQuery && (
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Create Project
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredDocuments.map((doc) => (
              <Link
                href={`/editor/${doc._id}`}
                key={doc._id}
                className="block"
              >
                <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-white hover:border-black transition-colors group">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-2 bg-white rounded">
                      <FileText className="h-6 w-6 text-black" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-black truncate">{doc.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {doc.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-00">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(doc.updatedAt), 'MMM d, yyyy')}
                        </div>
                        <div className="flex gap-1">
                          {doc.languages?.map((lang:string) => (
                            <span
                              key={lang}
                              className="px-2 py-0.5 bg-white text-black rounded text-xs"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/editor/${doc._id}`;
                      }}
                      className="p-2 hover:bg-gray-700 rounded-md transition-colors"
                      title="Edit"
                    >
                      <Edit3 className="h-4 w-4 text-white" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(doc._id);
                      }}
                      className="p-2 hover:bg-red-500 hover:text-white rounded-md transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4 text-white" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        // Implement download functionality
                      }}
                      className="p-2 hover:bg-gray-700 rounded-md transition-colors"
                      title="Download"
                    >
                      <Download className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 