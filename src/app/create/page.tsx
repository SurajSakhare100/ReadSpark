'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Check, FileText, Book, Package, Scale, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { SiJavascript, SiTypescript, SiPython, SiGo, SiRust, SiCplusplus, SiRuby, SiPhp, SiKotlin, SiSwift, SiDart, SiScala, SiR, SiPerl } from 'react-icons/si';
import MarkdownPreview from '@/components/MarkdownPreview';

const languages = [
  { id: 'javascript', name: 'JavaScript', icon: <SiJavascript className="w-8 h-8" />, color: 'bg-[#F7DF1E]/10 border-[#F7DF1E]/20' },
  { id: 'typescript', name: 'TypeScript', icon: <SiTypescript className="w-8 h-8" />, color: 'bg-[#3178C6]/10 border-[#3178C6]/20' },
  { id: 'python', name: 'Python', icon: <SiPython className="w-8 h-8" />, color: 'bg-[#3776AB]/10 border-[#3776AB]/20' },
  // { id: 'java', name: 'Java', icon: <Sijav className="w-8 h-8" />, color: 'bg-[#007396]/10 border-[#007396]/20' },
  { id: 'go', name: 'Go', icon: <SiGo className="w-8 h-8" />, color: 'bg-[#00ADD8]/10 border-[#00ADD8]/20' },
  { id: 'rust', name: 'Rust', icon: <SiRust className="w-8 h-8" />, color: 'bg-black/10 border-black/20' },
  { id: 'cpp', name: 'C++', icon: <SiCplusplus className="w-8 h-8" />, color: 'bg-[#00599C]/10 border-[#00599C]/20' },
  { id: 'ruby', name: 'Ruby', icon: <SiRuby className="w-8 h-8" />, color: 'bg-[#CC342D]/10 border-[#CC342D]/20' },
];

const licenses = [
  { 
    id: 'mit', 
    name: 'MIT License', 
    description: 'Simple and permissive',
    icon: '🔓'
  },
  { 
    id: 'apache', 
    name: 'Apache 2.0', 
    description: 'Patent protection included',
    icon: '⚖️'
  },
  { 
    id: 'gpl', 
    name: 'GNU GPL v3', 
    description: 'Copyleft license',
    icon: '🔄'
  },
  { 
    id: 'bsd', 
    name: 'BSD 3-Clause', 
    description: 'Business-friendly',
    icon: '💼'
  },
];

const sections = [
  { id: 'installation', label: 'Installation Guide', icon: '📥' },
  { id: 'usage', label: 'Usage Instructions', icon: '📖' },
  { id: 'contributing', label: 'Contributing Guidelines', icon: '🤝' },
  { id: 'testing', label: 'Testing Instructions', icon: '🧪' },
  { id: 'dependencies', label: 'Dependencies List', icon: '📦' },
];

export default function CreateProject() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [docId, setDocId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    languages: [] as string[],
    license: '',
    sections: ['installation', 'usage', 'contributing'] as string[],
    packageManager: 'npm',
  });

  const [previewMarkdown, setPreviewMarkdown] = useState('');

  useEffect(() => {
    const loadExistingDoc = async () => {
      if (docId) {
        try {
          const response = await fetch(`/api/documents/${docId}`);
          if (response.ok) {
            const doc = await response.json();
            setFormData({
              title: doc.title,
              description: doc.description,
              languages: doc.languages,
              license: doc.license,
              sections: doc.sections,
              packageManager: doc.packageManager || 'npm',
            });
          }
        } catch (error) {
          console.error('Error loading document:', error);
        }
      }
    };

    loadExistingDoc();
  }, [docId]);

  const handleLanguageToggle = (langId: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(langId)
        ? prev.languages.filter(id => id !== langId)
        : [...prev.languages, langId],
    }));
  };

  const handleSectionToggle = (sectionId: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.includes(sectionId)
        ? prev.sections.filter(id => id !== sectionId)
        : [...prev.sections, sectionId],
    }));
  };

  const generatePreview = () => {
    const preview = `# ${formData.title} ${formData.languages.map(lang => 
      languages.find(l => l.id === lang)?.icon
    ).join(' ')}

${formData.description}

## Technologies Used
${formData.languages.map(lang => 
  `- ${languages.find(l => l.id === lang)?.name}`
).join('\n')}

## License
${licenses.find(l => l.id === formData.license)?.icon} This project is licensed under the ${
  licenses.find(l => l.id === formData.license)?.name
}.

## Getting Started
${formData.sections.includes('installation') ? '### Installation\n\`\`\`bash\n# Install dependencies\n' + 
  (formData.packageManager === 'npm' ? 'npm install' : 'yarn install') + 
  '\n\`\`\`\n' : ''}

${formData.sections.includes('usage') ? '### Usage\nInstructions for using the project will go here.\n' : ''}

${formData.sections.includes('contributing') ? '### Contributing\nGuidelines for contributing to the project.\n' : ''}

${formData.sections.includes('testing') ? '### Testing\nInstructions for running tests.\n' : ''}

${formData.sections.includes('dependencies') ? '### Dependencies\nList of project dependencies.\n' : ''}`;

    setPreviewMarkdown(preview);
  };

  const saveToDb = async () => {
    try {
      const response = await fetch('/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          content: previewMarkdown
        })
      });

      if (!response.ok) throw new Error('Failed to save document');
      
      const savedDoc = await response.json();
      setDocId(savedDoc._id);
      return savedDoc._id;
    } catch (error) {
      console.error('Error saving document:', error);
      return null;
    }
  };

  const handleNext = async () => {
    if (currentStep === 3) {
      // Generate the preview content if not already done
      if (!previewMarkdown) {
        generatePreview();
      }
      const docId = await saveToDb();
      if (docId) {
        router.push(`/editor/${docId}`);
      }
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <FileText className="h-6 w-6 text-primary" />
              <h2>Basic Information</h2>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 rounded-lg bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="Project Title"
                required
              />
              <textarea
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-3 rounded-lg bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary transition-colors min-h-[100px]"
                placeholder="A brief description of your project..."
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xl font-semibold">
                <Book className="h-6 w-6 text-primary" />
                <h2>Languages & Technologies</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {languages.map(lang => (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => handleLanguageToggle(lang.id)}
                    className={`p-4 rounded-lg border ${
                      formData.languages.includes(lang.id)
                        ? 'border-primary bg-primary/10'
                        : `border-input hover:border-primary/50 ${lang.color}`
                    } transition-all group`}
                  >
                    <div className="text-2xl mb-2 flex justify-center">{lang.icon}</div>
                    <div className="font-medium">{lang.name}</div>
                    {formData.languages.includes(lang.id) && (
                      <Check className="w-4 h-4 text-primary mx-auto mt-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xl font-semibold">
                <Scale className="h-6 w-6 text-primary" />
                <h2>License</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {licenses.map(license => (
                  <button
                    key={license.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, license: license.id }))}
                    className={`p-4 rounded-lg border ${
                      formData.license === license.id
                        ? 'border-primary bg-primary/10'
                        : 'border-input hover:border-primary/50'
                    } transition-all text-left`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{license.icon}</span>
                      <div>
                        <div className="font-medium">{license.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {license.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <Package className="h-6 w-6 text-primary" />
              <h2>Documentation Sections</h2>
            </div>
            <div className="grid gap-3">
              {sections.map(section => (
                <label
                  key={section.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-input hover:border-primary/50 transition-all cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.sections.includes(section.id)}
                    onChange={() => handleSectionToggle(section.id)}
                    className="h-4 w-4 rounded border-input"
                  />
                  <span className="text-xl">{section.icon}</span>
                  <span>{section.label}</span>
                </label>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            Create Your Project
          </h1>
          <p className="text-muted-foreground">
            Let's gather some information about your project to create the perfect documentation
          </p>
          <div className="flex justify-center gap-4 mt-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full ${
                  currentStep >= step ? 'bg-primary' : 'bg-primary/20'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form className="space-y-8">
            {renderStep()}

            <div className="flex gap-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex-1 p-4 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
              )}
              <button
                type="button"
                onClick={generatePreview}
                className="flex-1 p-4 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
              >
                Preview
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 p-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                {currentStep === 3 ? 'Create Project' : 'Next'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Preview Section */}
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="text-lg font-semibold mb-4">Preview</h3>
            <div className="prose dark:prose-invert max-w-none">
              <MarkdownPreview content={previewMarkdown} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}