'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { Loader2, Save, Wand2, Github, MoveLeft, ArrowLeft } from 'lucide-react';
import MarkdownPreview from '@/components/MarkdownPreview';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface EditorPageProps {
  params: Promise<{ id: string }>;
}

export default function EditorPage({ params }: EditorPageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editableContent, setEditableContent] = useState('');
  const [documentData, setDocumentData] = useState<any>(null);
  const [isPushing, setIsPushing] = useState(false);
  const [pushError, setPushError] = useState<string | null>(null);

  const resolvedParams = React.use(params);
  const id = resolvedParams.id;
  const router = useRouter();
  const {data:session}=useSession();
  useEffect(() => {
    const fetchDocument = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/documents/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch document');
        }

        const data = await response.json();
        setDocumentData(data);
        setEditableContent(data.content);
      } catch (error: any) {
        console.error('Error fetching document:', error);
        setError(error.message || 'Failed to fetch document');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDocument();
    }
  }, [id]);
 const fetchGenerateMarkdown = async (projectData: {
    title: string;
    description?: string;
    languages: string[];
    license?: string;
    sections: string[];
    currentContent?: string;
  }) => {
    try {
      const response = await fetch("/api/documents/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to generate markdown");
      }
  
      const data = await response.json();
      return data.content;
    } catch (error: any) {
      console.error("Error fetching markdown:", error);
      throw new Error(error.message || "Failed to generate markdown");
    }
  };
  

  const handleRegenerate = async () => {
    try {
      setLoading(true);
      setError(null);

      const projectData = {
        title: documentData.title,
        description: documentData.description,
        languages: documentData.languages,
        license: documentData.license,
        sections: documentData.sections,
        currentContent: editableContent,
      };
      // Call API
    const content = await fetchGenerateMarkdown(projectData);
    setEditableContent(content);

      // Save the regenerated content
      const response = await fetch(`/api/documents/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...documentData,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save regenerated content');
      }

      setDocumentData((prev: any) => ({ ...prev, content }));
    } catch (error: any) {
      console.error('Error regenerating markdown:', error);
      setError(error.message || 'Failed to regenerate markdown');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/documents/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...documentData,
          content: editableContent,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save document');
      }

      setDocumentData((prev: any) => ({ ...prev, content: editableContent }));
      toast.success('Document saved successfully!');
    } catch (error: any) {
      console.error('Error saving document:', error);
      setError(error.message || 'Failed to save document');
    } finally {
      setLoading(false);
    }
  };

  const handleRename = async () => {
    const newTitle = prompt('Enter new project name:', documentData.title);
    if (newTitle && newTitle !== documentData.title) {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/documents/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...documentData,
            title: newTitle,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to rename project');
        }

        setDocumentData((prevData: any) => ({ ...prevData, title: newTitle }));
        toast.success('Project renamed successfully!');
      } catch (error: any) {
        console.error('Error renaming project:', error);
        setError(error.message || 'Failed to rename project');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDownload = () => {
    const blob = new Blob([editableContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${documentData?.title || 'project'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePushToGithub = async () => {
    if (!documentData?.githubRepo && documentData.integrationType!='github' ) return;
    
    try {
      setIsPushing(true);
      setPushError(null);
      
      const owner = session?.user?.username;
      const repo = documentData.githubRepo;
      
      // Get current README SHA dynamically
      const readmeResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/README.md`,{
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`, // ✅ Include token for private repo access
          Accept: 'application/vnd.github.v3+json',
        },
      });
      const readmeData = await readmeResponse.json();
      
      const response = await fetch('/api/github/push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          owner,
          repo,
          content: documentData.content,
          sha: readmeData.sha,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      toast.success('Successfully pushed to GitHub!');
    } catch (error: any) {
      console.error('Error pushing to GitHub:', error);
      setPushError(error instanceof Error ? error.message : 'Failed to push to GitHub');
      toast.error('Failed to push to GitHub');
    } finally {
      setIsPushing(false);
    }
  };
  const handleBack = () => {
    router.push('/dashboard');
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 min-h-[400px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" mx-auto p-4 flex flex-col items-center">
      <div className="w-full max-w-7xl">
      <Button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 mb-6 bg-gray-200 text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">{documentData?.title}</h1>
            {documentData?.integrationType=="github" && documentData?.userId && (
              <Button
                onClick={handlePushToGithub}
                disabled={isPushing}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Github className="h-4 w-4" />
                {isPushing ? 'Pushing...' : 'Push to GitHub'}
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleRename}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors disabled:opacity-50"
            >
              Rename
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
            >
              Download
            </button>
            <button
  onClick={handleRegenerate}
  disabled={loading}
  className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors disabled:opacity-50 relative overflow-hidden
    before:absolute before:inset-0 before:bg-primary/30 before:blur-xl before:opacity-0 hover:before:opacity-100 before:transition-opacity"
>
  {loading ? (
    <Loader2 className="h-4 w-4 animate-spin" />
  ) : (
    <Wand2 className="h-4 w-4" />
  )}
  Regenerate
</button>

            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              Save
            </button>
          </div>
        </div>

        {pushError && (
          <div className="text-red-500 mb-4">
            {pushError}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="min-h-[500px] relative">
            <textarea
              value={editableContent}
              onChange={(e) => setEditableContent(e.target.value)}
              className="w-full h-full min-h-[500px] p-4 font-mono text-sm bg-background border border-input rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
              placeholder="Start typing your markdown here..."
            />
          </div>
          <div className="border rounded-lg p-6 bg-card min-h-[500px] overflow-auto">
            <MarkdownPreview content={editableContent} />
          </div>
        </div>
      </div>
    </div>
  );
}
