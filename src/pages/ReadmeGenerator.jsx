import React, { useState } from 'react';
import MarkdownIt from 'markdown-it';
import markdownItTaskLists from 'markdown-it-task-lists';
import 'prismjs/themes/prism-tomorrow.css';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-http';
import { Clipboard, Trash } from 'lucide-react';
import Badge from '../components/badge/Badge';
import badgesData from '../data.json'



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

  const handleChange = (event) => {
    setMarkdownText(event.target.value);
  };

  const renderedMarkdown = md.render(markdownText);
  setTimeout(() => Prism.highlightAll(), 0);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(renderedMarkdown);
    alert('Copied to clipboard!');
  };

  const clearText = () => {
    setMarkdownText('');
  };
  const addgitprofile=()=>{
    setMarkdownText(`
I am a bachelor's student at {} . I am a {} from India with a proven ability to deliver high-quality solutions. Currently working on My Projects.

- 🔭 I’m currently working on **{on project}**

- 🌱 I’m currently learning ** this task **

- 👨‍💻 All of my projects are available at My Portfolio website -- {add your link}
`)
  }
  const handleBadgeClick = async (filename) => {
    try {
      const response = await fetch(`public/templates/${filename}`); // Fetch the markdown file
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const text = await response.text(); 
      setMarkdownText(text); 
    } catch (error) {
      console.error('Error fetching the markdown file:', error);
    }
  };
  return (
    <div className="w-full px-4 md:px-0 ">
      <div className="md:w-[66rem] mx-auto mt-20 mb-4">
        <h1 className="tagline text-5xl text-center font-semibold">
        Start Editing Your <span className='text-[#10B981]'>README.md</span> Now</h1>
        <div className='w-full py-4'>
        <h2 className='text-xl font-semibold mb-2'>Templates For You : </h2>
        <div className='flex gap-2 flex-wrap justify-center'>
        {badgesData?.map(badge => (
          <Badge
          key={badge.id}
          BadgeName={badge.name}
          className={badge.className}
          onClick={() => handleBadgeClick(badge.filename)} // Pass the click handler
        />
        ))}
        </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row w-full pt-4 h-[44rem] md:h-auto ">
          <div className="flex flex-col gap-2 md:w-1/2 h-1/2 md:h-full">
            <div className="flex gap-4 justify-end  pb-2  ">
              
             <div>
             <button onClick={copyToClipboard} className="icon-button text-green-400 font-semibold">
                <Clipboard size={20} />
              </button>
              <button onClick={clearText} className="icon-button text-red-400 font-semibold">
                <Trash size={20} />
              </button>
             </div>
            </div>
            <div className='w-full md:h-[44rem] flex-grow '>
            <textarea
              className="textarea border rounded-md p-4 h-full w-full flex-shrink-0"
              value={markdownText}
              onChange={handleChange}
            />
            </div>
          </div>
          <div className=" md:w-1/2 flex flex-col h-1/2 md:h-full">
            <div className="flex gap-2 justify-end options pb-3 ">
              <button onClick={() => setView('preview')} className={view === 'preview' ? 'active' : ''}>
                Preview
              </button>
              <button onClick={() => setView('raw')} className={view === 'raw' ? 'active' : '' } >
                Raw
              </button>
            </div>
            <div className="preview border p-4 rounded-lg h-full  ">
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
