import React, { useState, useEffect } from 'react';
import MarkdownIt from 'markdown-it';
import markdownItTaskLists from 'markdown-it-task-lists';
import 'prismjs/themes/prism-tomorrow.css';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-http';
import { Clipboard, Trash, Download } from 'lucide-react';
import Badge from '../components/badge/Badge';
import { Helmet } from 'react-helmet';
// import {badgesData} from '../data.json';


const badgesData = [
  {
    "id": 1,
    "name": "React README",
    "className": "bg-green-300 text-green-800",
    "filename": "react.md",
    "readmeText": "# React Project\n\nThis is a React project README template. It covers all the basics of setting up, running, and deploying a React application.\n\n## Installation\n\n```bash\nnpm install\n```\n\n## Usage\n\n```bash\nnpm start\n```\n\n## Features\n- Component-based architecture\n- Hooks for managing state and side effects\n- Support for custom themes\n\nHappy coding!"
  },
  {
    "id": 2,
    "name": "Next.js README",
    "className": "bg-blue-300 text-blue-800",
    "filename": "next.md",
    "readmeText": "# Next.js Project\n\nThis template is designed for a Next.js project, providing details on setup and usage.\n\n## Getting Started\n\nFirst, install the dependencies:\n\n```bash\nnpm install\n```\n\nThen run the development server:\n\n```bash\nnpm run dev\n```\n\n## Key Features\n- Server-side rendering (SSR)\n- Static site generation (SSG)\n- API routes for backend functionality\n\nDeploy easily to Vercel!"
  },
  {
    "id": 3,
    "name": "Flask README",
    "className": "bg-orange-300 text-orange-800",
    "filename": "flask.md",
    "readmeText": "# Flask Application\n\nThis README template provides a basic overview of a Flask project.\n\n## Setup\n\n1. Install dependencies:\n\n```bash\npip install -r requirements.txt\n```\n\n2. Run the application:\n\n```bash\nflask run\n```\n\n## Features\n- RESTful API support\n- Lightweight and fast\n- Jinja2 templating for dynamic HTML\n\nUse this template to start building Python-powered web apps!"
  },
  {
    "id": 4,
    "name": "Vue README",
    "className": "bg-violet-300 text-violet-800",
    "filename": "vue.md",
    "readmeText": "# Vue Project\n\nA README template tailored for Vue projects. It includes setup, usage, and features.\n\n## Installation\n\n```bash\nnpm install\n```\n\n## Running the App\n\n```bash\nnpm run serve\n```\n\n## Features\n- Reactive data binding\n- Vue Router for single-page navigation\n- Vuex for state management\n\nPerfect for building dynamic, front-end applications!"
  },
  {
    "id": 5,
    "name": "GitHub Profile Readme",
    "className": "bg-yellow-300 text-gray-800",
    "filename": "profile.md",
    "readmeText": "# Hello, I'm [Your Name]! 👋\n\nWelcome to my GitHub profile! Here's a little about me.\n\n- 🔭 I’m currently working on exciting projects\n- 🌱 I’m learning new frameworks and technologies\n- 📫 How to reach me: [your.email@example.com]\n\n## Skills\n- Languages: JavaScript, Python, HTML, CSS\n- Frameworks: React, Vue, Flask\n\nThanks for stopping by!"
  }
]


const ReadmeGenerator = () => {
  const [markdownText, setMarkdownText] = useState(`
# Hello, Markdown!
## This is a list:
- Item 1
- Item 2
  - Sub-item 1
  - Sub-item 2

## And here is a table:
| Header 1 | Header 2 |
|----------|----------|
| Row 1    | Data 1   |
| Row 2    | Data 2   |

## Task List:
- [x] Task 1
- [ ] Task 2

## Code Examples:
\`\`\`http
GET /api/data
Host: example.com
\`\`\`
  `);

  const [view, setView] = useState('preview');
  const md = new MarkdownIt().use(markdownItTaskLists);

  useEffect(() => {
    Prism.highlightAll();
  }, [markdownText]);

  const handleChange = (event) => {
    setMarkdownText(event.target.value);
  };

  const renderedMarkdown = md.render(markdownText);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdownText);
    alert('Copied to clipboard!');
  };

  const clearText = () => {
    setMarkdownText('');
  };

  const handleBadgeClick = async (filename) => {
    try {
      const response = await fetch(`/templates/${filename}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const text = await response.text();
      setMarkdownText(text);
    } catch (error) {
      console.error('Error fetching the markdown file:', error);
    }
  };

  // New function to handle download
  const downloadMarkdown = () => {
    const blob = new Blob([markdownText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'README.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  return (
    <div className="w-full px-4 md:px-0 ">
      <Helmet>
        <title>ReadSpark: Create stunning READMEs in seconds</title>
        <meta name="description" content="Create stunning READMEs in seconds with ReadSpark. Easy to use, customizable templates for all your documentation needs." />
        <meta name="keywords" content="README generator, documentation tool, markdown editor, open source, developer tools" />
        <link rel="canonical" href="https://readspark.vercel.app/" />
      </Helmet>
      <div className="md:w-[66rem] mx-auto mt-28 mb-4">
        <h1 className="tagline text-5xl text-center font-semibold">
          Start Editing Your <span className='text-[#10B981]'>README.md</span> Now
        </h1>
        <div className='w-full '>
          <h2 className='text-xl font-semibold mb-4'>Templates For You : </h2>
          <div className='flex gap-2 flex-wrap justify-center mb-4'>
            {badgesData?.map(badge => (
              <Badge
                key={badge.id}
                BadgeName={badge.name}
                className={badge.className} // Ensure this is passed correctly
                onClick={() => handleBadgeClick(badge.filename)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row w-full pt-4 md:h-auto ">
          <div className="flex flex-col gap-2 md:w-1/2 h-1/2 md:h-full">
            <div className="flex gap-4 justify-end pb-2">
              <button onClick={copyToClipboard} className="icon-button text-green-400 font-semibold">
                <Clipboard size={20} />
              </button>
              <button onClick={clearText} className="icon-button text-red-400 font-semibold">
                <Trash size={20} />
              </button>
              {/* Download button */}
              <button onClick={downloadMarkdown} className="icon-button text-blue-400 font-semibold">
                <Download size={20} />
              </button>
            </div>
            <textarea
              className="textarea border rounded-md p-4 !h-[32rem]  w-full flex-shrink-0"
              value={markdownText}
              onChange={handleChange}
            />
          </div>
          <div className="md:w-1/2 flex flex-col h-1/2 md:h-full">
            <div className="flex gap-2 justify-end options pb-3">
              <button onClick={() => setView('preview')} className={view === 'preview' ? 'active' : ''}>
                Preview
              </button>
              <button onClick={() => setView('raw')} className={view === 'raw' ? 'active' : ''}>
                Raw
              </button>
            </div>
            <div className="preview border p-4 rounded-lg h-full">
              {view === 'preview' ? (
                <div dangerouslySetInnerHTML={{ __html: renderedMarkdown }} className='h-full overflow-y-scroll' />
              ) : (
                <pre className="raw">{markdownText}</pre>
              )}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ReadmeGenerator;
