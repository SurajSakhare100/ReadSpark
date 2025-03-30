'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import {
  Check,
  FileText,
  Book,
  Package,
  Scale,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from 'lucide-react';
import MarkdownPreview from '@/components/MarkdownPreview';

// Available languages list now includes Java (text only)
const availableLanguages = [
  { id: 'javascript', name: 'JavaScript', color: 'bg-[#F7DF1E]/10 border-[#F7DF1E]/20' },
  { id: 'typescript', name: 'TypeScript', color: 'bg-[#3178C6]/10 border-[#3178C6]/20' },
  { id: 'python', name: 'Python', color: 'bg-[#3776AB]/10 border-[#3776AB]/20' },
  { id: 'go', name: 'Go', color: 'bg-[#00ADD8]/10 border-[#00ADD8]/20' },
  { id: 'rust', name: 'Rust', color: 'bg-black/10 border-black/20' },
  { id: 'cpp', name: 'C++', color: 'bg-[#00599C]/10 border-[#00599C]/20' },
  { id: 'ruby', name: 'Ruby', color: 'bg-[#CC342D]/10 border-[#CC342D]/20' },
  { id: 'java', name: 'Java', color: 'bg-[#B07219]/10 border-[#B07219]/20' },
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

interface FormErrors {
  title?: string;
  languages?: string;
  license?: string;
  sections?: string;
}

export default function CreateProject() {
  const router = useRouter();
  const { toast } = useToast();
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
  const [errors, setErrors] = useState<FormErrors>({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadExistingDoc = async () => {
      if (docId) {
        try {
          const response = await fetch(`/api/documents/${docId}`);
          if (response.ok) {
            const doc = await response.json();
            setFormData({
              title: doc.title,
              description: doc.description || '',
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

  // Add custom language if not available in the list
  const handleAddCustomLanguage = () => {
    const customLang = searchQuery.trim();
    if (!customLang) return;
    // Check if already selected
    if (!formData.languages.includes(customLang)) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, customLang],
      }));
    }
    setSearchQuery('');
  };

  const handleSectionToggle = (sectionId: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.includes(sectionId)
        ? prev.sections.filter(id => id !== sectionId)
        : [...prev.sections, sectionId],
    }));
  };

  const generatePreview = (): string => {
    const preview = `# ${formData.title}

${formData.description || ''}

## Technologies Used
${formData.languages
        .map(lang => {
          const found = availableLanguages.find(l => l.id === lang);
          return `- ${found ? found.name : lang}`;
        })
        .join('\n')}

## License
${licenses.find(l => l.id === formData.license)?.icon || ''} This project is licensed under the ${licenses.find(l => l.id === formData.license)?.name || ''
      }.

## Getting Started
${formData.sections.includes('installation')
        ? '### Installation\n```bash\n' +
        (formData.packageManager === 'npm' ? 'npm install' : 'yarn install') +
        '\n```'
        : ''
      }

${formData.sections.includes('usage')
        ? '\n### Usage\nInstructions for using the project will go here.'
        : ''
      }

${formData.sections.includes('contributing')
        ? '\n### Contributing\nGuidelines for contributing to the project.'
        : ''
      }

${formData.sections.includes('testing')
        ? '\n### Testing\nInstructions for running tests.'
        : ''
      }

${formData.sections.includes('dependencies')
        ? '\n### Dependencies\nList of project dependencies.'
        : ''
      }`;

    setPreviewMarkdown(preview);
    return preview;
  };

  const saveToDb = async () => {
    try {
      let content = previewMarkdown;

      if (!content) {
        content = await generatePreview(); // Ensure preview is generated and use the returned value
      }
      const response = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          content,
        }),
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

  const validateStep = (): boolean => {
    let valid = true;
    const newErrors: FormErrors = {};

    if (currentStep === 1) {
      if (!formData.title.trim()) {
        newErrors.title = 'Project title is required';
        valid = false;
      }
    }
    if (currentStep === 2) {
      if (formData.languages.length === 0) {
        newErrors.languages = 'Select at least one language';
        valid = false;
      }
      if (!formData.license) {
        newErrors.license = 'License selection is required';
        valid = false;
      }
    }
    if (currentStep === 3) {
      if (formData.sections.length === 0) {
        newErrors.sections = 'Select at least one documentation section';
        valid = false;
      }
    }
    setErrors(newErrors);
    return valid;
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    if (currentStep === 3) {

      const docId = await saveToDb();
      if (docId) {
        router.push(`/editor/${docId}`);
      }
    } else {
      setCurrentStep(prev => prev + 1);
      setErrors({});
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
    setErrors({});
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <FileText className="h-6 w-6 text-primary" />
              <h2>Basic Information</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-md font-medium">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e =>
                    setFormData(prev => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full p-3 rounded-lg bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="Enter your project title"
                  required
                />
                {errors.title && (
                  <p className="text-red-500 text-md">{errors.title}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-md font-medium">
                  Project Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full p-3 rounded-lg bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary transition-colors min-h-[100px]"
                  placeholder="Enter a brief description of your project (optional)"
                />
              </div>
            </div>
          </div>
        );
      case 2: {
        const filteredLanguages = availableLanguages.filter(lang =>
          lang.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const showCustomAdd =
          searchQuery.trim() &&
          !availableLanguages.some(
            lang => lang.name.toLowerCase() === searchQuery.trim().toLowerCase()
          );
        return (
          <>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xl font-semibold">
                <Book className="h-6 w-6 text-primary" />
                <h2>
                  Languages & Technologies <span className="text-red-500">*</span>
                </h2>
              </div>
              {errors.languages && (
                <p className="text-red-500 text-md">{errors.languages}</p>
              )}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search and add language..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full p-2 rounded border border-input focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredLanguages.map(lang => (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => {
                      handleLanguageToggle(lang.id);
                      setSearchQuery('');
                    }}
                    className={`p-4 rounded-lg border transition-all group ${formData.languages.includes(lang.id)
                        ? 'border-primary bg-primary/10'
                        : `border-input hover:border-primary/50 ${lang.color}`
                      }`}
                  >
                    <div className="font-medium text-center">{lang.name}</div>
                  </button>
                ))}
              </div>
              {showCustomAdd && (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleAddCustomLanguage}
                    className="px-4 py-2 bg-gray-200 border border-gray-400 rounded hover:bg-gray-300 transition-colors"
                  >
                    Add "{searchQuery.trim()}"
                  </button>
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {formData.languages.map(langId => {
                  const lang =
                    availableLanguages.find(l => l.id === langId) || { name: langId };
                  return (
                    <div
                      key={langId}
                      className="flex items-center gap-1 bg-primary/10 text-primary rounded px-2 py-1"
                    >
                      <span>{lang.name}</span>
                      <button
                        type="button"
                        onClick={() => handleLanguageToggle(langId)}
                        className="text-primary hover:text-primary/80"
                      >
                        &times;
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="space-y-4 mt-6">
              <div className="flex items-center gap-2 text-xl font-semibold">
                <Scale className="h-6 w-6 text-primary" />
                <h2>
                  License <span className="text-red-500">*</span>
                </h2>
              </div>
              {errors.license && (
                <p className="text-red-500 text-md">{errors.license}</p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {licenses.map(license => (
                  <button
                    key={license.id}
                    type="button"
                    onClick={() =>
                      setFormData(prev => ({ ...prev, license: license.id }))
                    }
                    className={`p-4 rounded-lg border transition-all text-left ${formData.license === license.id
                        ? 'border-primary bg-primary/10'
                        : 'border-input hover:border-primary/50'
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{license.icon}</span>
                      <div>
                        <div className="font-medium">{license.name}</div>
                        <div className="text-md text-muted-foreground">
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
      }
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <Package className="h-6 w-6 text-primary" />
              <h2>
                Documentation Sections{' '}
                <span className="text-red-500">*</span>
              </h2>
            </div>
            {errors.sections && (
              <p className="text-red-500 text-md">{errors.sections}</p>
            )}
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
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="max-w-6xl w-full px-4 py-8">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            Create Your Project
          </h1>
          <p className="text-muted-foreground">
            Let's gather some information about your project to create the perfect documentation.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            {[1, 2, 3].map(step => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full ${currentStep >= step ? 'bg-primary' : 'bg-primary/20'
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
