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
import FeedbackForm from '../components/FeedBack/FeedbackForm';
import axios from 'axios';
// import {badgesData} from '../data.json';


const badgesData = [
  {
    "id": 1,
    "name": "React README",
    "className": "bg-green-300 text-green-800",
    "download": "bg-green-800 text-green-300",
    "filename": "react.md",
    "readmeText": "# React Project\n\nThis is a React project README template. It covers all the basics of setting up, running, and deploying a React application.\n\n## Installation\n\n```bash\nnpm install\n```\n\n## Usage\n\n```bash\nnpm start\n```\n\n## Features\n- Component-based architecture\n- Hooks for managing state and side effects\n- Support for custom themes\n\nHappy coding!"
  },
  {
    "id": 2,
    "name": "Next.js README",
    "className": "bg-blue-300 text-blue-800",
    "download": "bg-blue-800 text-blue-300",
    "filename": "next.md",
    "readmeText": "# Next.js Project\n\nThis template is designed for a Next.js project, providing details on setup and usage.\n\n## Getting Started\n\nFirst, install the dependencies:\n\n```bash\nnpm install\n```\n\nThen run the development server:\n\n```bash\nnpm run dev\n```\n\n## Key Features\n- Server-side rendering (SSR)\n- Static site generation (SSG)\n- API routes for backend functionality\n\nDeploy easily to Vercel!"
  },
  {
    "id": 3,
    "name": "Flask README",
    "className": "bg-orange-300 text-orange-800",
    "download": "bg-orange-800 text-orange-300",
    "filename": "flask.md",
    "readmeText": "# Flask Application\n\nThis README template provides a basic overview of a Flask project.\n\n## Setup\n\n1. Install dependencies:\n\n```bash\npip install -r requirements.txt\n```\n\n2. Run the application:\n\n```bash\nflask run\n```\n\n## Features\n- RESTful API support\n- Lightweight and fast\n- Jinja2 templating for dynamic HTML\n\nUse this template to start building Python-powered web apps!"
  },
  {
    "id": 4,
    "name": "Vue README",
    "className": "bg-violet-300 text-violet-800",
    "download": "bg-violet-800 text-violet-300",
    "filename": "vue.md",
    "readmeText": "# Vue Project\n\nA README template tailored for Vue projects. It includes setup, usage, and features.\n\n## Installation\n\n```bash\nnpm install\n```\n\n## Running the App\n\n```bash\nnpm run serve\n```\n\n## Features\n- Reactive data binding\n- Vue Router for single-page navigation\n- Vuex for state management\n\nPerfect for building dynamic, front-end applications!"
  },
  {
    "id": 5,
    "name": "GitHub Profile Readme",
    "className": "bg-yellow-300 text-yellow-800",
    "download": "bg-yellow-800 text-yellow-300",
    "filename": "profile.md",
    "readmeText": "# Hello, I'm [Your Name]! 👋\n\nWelcome to my GitHub profile! Here's a little about me.\n\n- 🔭 I’m currently working on exciting projects\n- 🌱 I’m learning new frameworks and technologies\n- 📫 How to reach me: [your.email@example.com]\n\n## Skills\n- Languages: JavaScript, Python, HTML, CSS\n- Frameworks: React, Vue, Flask\n\nThanks for stopping by!"
  }
]


const ReadmeGenerator = () => {
  const [markdownText, setMarkdownText] = useState(badgesData[4].readmeText);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState(null);
  const [fileName,setFilename]=useState(badgesData[4].filename)
  const backend_url=import.meta.env.VITE_BACKEND_URL;

  const [view, setView] = useState('preview');
  const md = new MarkdownIt().use(markdownItTaskLists);

  useEffect(() => {
    Prism.highlightAll();
  }, [markdownText]);

  const handleChange = (event) => {
    setMarkdownText(event.target.value);
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const renderedMarkdown = md.render(markdownText);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdownText);
    alert('Copied to clipboard!');
  };

  const clearText = () => {
    setMarkdownText('');
  };

  useEffect(()=>{
    const fetchData=  async()=>{
       try {
         const response=await axios.get(`${backend_url}/api/download-stats`)
         const files=response.data.files
         if(files){
           setFiles(files)
         }

         
     } catch (error) {
         console.error('Failed  download count:', error);
     }
     }
     fetchData()
   },[])

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
    }finally{
      setFilename(filename)
    }
  };

  const [lastRequestTime, setLastRequestTime] = useState(0);

const downloadMarkdown = async () => {
  const currentTime = Date.now();

  if (currentTime - lastRequestTime < 10000) {
    alert("You're trying to download too quickly. Please make some changes to the README or wait a few seconds before trying again.");
    return;
  }

  const blob = new Blob([markdownText], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);

  try {
    // Send request to the backend to increase the download count
    await axios.post(`${backend_url}/api/increase-download-count`, {
      fileName,
    });
  } catch (error) {
    console.error('Failed to increase download count:', error);
  } finally {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'README.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Update the last request time
    setLastRequestTime(currentTime);
  }
};


  return (
    <div>
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
                className={badge.className} 
                downloadClassName={badge.download}
                fileName={badge.filename} 
                files={files}
                onClick={() => handleBadgeClick(badge.filename)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-16 md:gap-4 w-full pt-4 h-screen md:h-[600px] py-10 ">
          <div className="editor-section md:w-1/2 h-1/2 md:h-full">
            <div className="flex justify-end pb-2 gap-4">
              <button onClick={copyToClipboard} className="icon-button text-green-400">
                <Clipboard size={20} />
              </button>
              <button onClick={clearText} className="icon-button text-red-400">
                <Trash size={20} />
              </button>
              <button onClick={downloadMarkdown} className="icon-button text-blue-400">
                <Download size={20} />
              </button>
            </div>
            <textarea
              className="h-full border rounded-md p-4 w-full "
              value={markdownText}
              onChange={handleChange}
            />
          </div>

          <div className=" md:w-1/2 h-1/2 md:h-full">
            <div className="flex gap-2 justify-end pb-3">
              <button onClick={() => setView('preview')} className={view === 'preview' ? 'active' : ''}>
                Preview
              </button>
              <button onClick={() => setView('raw')} className={view === 'raw' ? 'active' : ''}>
                Raw
              </button>
            </div>
            <div className="preview border p-4 rounded-lg h-full overflow-y-scroll">
              {view === 'preview' ? (
                <div dangerouslySetInnerHTML={{ __html: renderedMarkdown }} />
              ) : (
                <pre>{markdownText}</pre>
              )}
            </div>
          </div>
        </div>
    <a href="https://buymeacoffee.com/sakharesuraj10" target="_blank" className='hidden sm:block fixed left-4 bottom-8 z-50'><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" className='h-12 w-48' /></a>
      </div>
      
    </div>
    {/* <button onClick={toggleModal} className="hidden sm:block fixed font-sans font-semibold right-3 leading-snug tracking-tight bottom-8 top-[h-screen-20px] px-4 py-2 bg-green-400 text-white rounded hover:bg-green-600 focus:outline-none">
         Your Feedback Matters ❤️
      </button> */}
    {/* <FeedbackForm isModalOpen={isModalOpen} toggleModal={toggleModal}/> */}

    </div>
  );
};

export default ReadmeGenerator;
