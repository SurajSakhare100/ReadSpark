'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { 
  Plus, 
  Search, 
  FileText, 
  Calendar, 
  Edit3,
  Trash2,
  Download,
  Loader2,
  Home,
  Users,
  Settings,
  Star
} from 'lucide-react';
import { format } from 'date-fns';
import GitHubProjectsDropdown from '@/components/GitHubProjectsDropdown';
import { useRouter } from 'next/navigation';
import { CircularProgress } from "@/components/ui/circular-progress";
import { Card } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import DashboardNav from '@/components/DashboardNav';
import SettingsPage from '@/components/Settings';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

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
const {toast}=useToast();
  const [projectStats, setProjectStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0
  });
  const [activeTab, setActiveTab] = useState<'projects' | 'settings'>('projects');

  const [projectCount, setProjectCount] = useState(0);
  

 

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!session) return;
      
      try {
        const response = await fetch('/api/documents');
        if (!response.ok) throw new Error('Failed to fetch documents');
        const data = await response.json();
        
        setDocuments(data);
        setProjectStats({
          total: data.length,
          completed: data.filter((doc: Document) => doc.content && doc.content.trim().length > 0).length,
          inProgress: data.filter((doc: Document) => !doc.content || doc.content.trim().length === 0).length
        });
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
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

  useEffect(() => {
    if (session?.user.id) {
      fetch(`/api/user/count`)  
        .then((res) => res.json())
        .then((data) => setProjectCount(data.projectCount))
        .catch((err) => console.error('Error fetching project count:', err));
    }
  }, [session?.user.id]);
  const handleSelectProject = async (owner: string, repo: string, repoDetails: any) => {
    try {
      setLoading(true);
      setError(null);

      const existingDoc = documents.find(doc => 
        doc.githubRepo === `${repo}`
      );
      if(projectCount > 5) {
        // setError('Project limit reached. Please delete an existing project to import a new one.');    
        toast({
          title: 'Error',
          description: 'Project limit reached. Please delete an existing project to import a new one.',
          variant: 'destructive',
        });
        setLoading(false);  
        return;
      }

      if (existingDoc) {
        // setError('Repository already imported');
        toast({
          title: 'Error',
          description: 'Repository already imported',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      const readmeResponse = await fetch(`/api/github/readme?owner=${owner}&repo=${repo}`);
      if (!readmeResponse.ok) throw new Error('Failed to fetch README');
      const {content} = await readmeResponse.json();

      const saveResponse = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: repo,
          content,
          githubRepo: `${repo}`,
          description: repoDetails.description || 'Imported from GitHub',
          languages: repoDetails.language ? [repoDetails.language] : [],
          license:repoDetails.license || "MIT",
          integrationType: 'github',
          sections: repoDetails.sections || ['installation', 'usage', 'contributing'],
          repoUrl: repoDetails.html_url,
          visibility: repoDetails.visibility,
          lastUpdated: repoDetails.updated_at,
          defaultBranch: repoDetails.default_branch
        })
      });

      if (!saveResponse.ok) throw new Error('Failed to save document');

      const savedDoc = await saveResponse.json();
      setDocuments(prev => [...prev, savedDoc]);
      router.push(`/editor/${savedDoc._id}`);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Import failed');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchProjectCount = async () => {
      if (!session) return;
      try {
        const response = await fetch('/api/user/count');
        if (!response.ok) throw new Error('Failed to fetch project count');
        const data = await response.json();
        setProjectCount(data.count);
      } catch (error) {
        console.error('Error fetching project count:', error);
      }
    };

    fetchProjectCount();
  }, [session,handleDelete,handleSelectProject]);


  const renderSettingsTab = () => {
    return <SettingsPage />;
  };

 

  return (
    <div className="flex h-screen ">
   
      <aside className="w-64  shadow-lg dark:border-r">
        <div className="h-full flex flex-col p-4">
          <nav className="space-y-1 ">
          <Link href="/"
                className={`w-full flex items-center space-x-1 px-3 rounded-lg cursor-pointer mb-6`}
              >
                        <Image src={require('../../public/logo.png')} alt="Logo" width={40} height={40} />  

                <span>ReadSpark</span>
              </Link>

              <div
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg  cursor-pointer ${
                  activeTab === 'projects' ? 'bg-blue-700  text-white' : ''
                }`}
              >
                <Home className="h-5 w-5" />
                <span>Projects</span>
              </div>
              <div
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer  ${
                  activeTab === 'settings' ? 'bg-blue-700 text-white' : ''
                }`}
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </div>
            </nav>

          <div className="mt-auto flex items-center justify-center w-full">
            
            <div className="flex-1  items-center w-full space-y-3 justify-center">
              <h1 className='text-lg'>Project count :</h1>
              <CircularProgress value={(projectCount ) } />
              
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-auto ">
        {activeTab == 'projects' ? <div >
      <DashboardNav />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Your Projects</h1>
              <p className="text-gray-500">Manage your documentation</p>
            </div>
            <div className="flex items-center space-x-4">
              <GitHubProjectsDropdown onSelectProject={handleSelectProject} />
              <Button asChild>
                <Link href="/create">
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Link>
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
              {error}
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No projects found</h3>
              <p className="text-gray-500 mb-4">
                {searchQuery ? "No projects match your search" : "Start by creating your first project"}
              </p>
              {!searchQuery && (
                <Button asChild>
                  <Link href="/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Project
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredDocuments.map((doc) => (
                <Card key={doc._id} className="hover:shadow-md transition-shadow">
                  <Link href={`/editor/${doc._id}`}>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="p-2 rounded">
                            <FileText className="h-6 w-6 " />
                          </div>
                          <div>
                            <h3 className="font-medium ">{doc.title}</h3>
                            <p className="text-sm text-gray-500 line-clamp-1 ">{doc.description}</p>
                            
                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="h-4 w-4 mr-1" />
                                {format(new Date(doc.updatedAt), 'MMM d, yyyy')}
                              </div>
                              <div className="flex gap-1">
                                {doc.languages?.map((lang) => (
                                  <span key={lang} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                    {lang}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              router.push(`/editor/${doc._id}`);
                            }}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              handleDelete(doc._id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              // TODO: Implement download
                            }}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>: renderSettingsTab()}
      </main>

      
    </div>
  );
}