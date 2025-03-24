import { useState, useEffect } from 'react';
import { Editor as MonacoEditor } from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';

interface EditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
}

export default function Editor({ initialContent = '', onChange }: EditorProps) {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleEditorChange = (value: string | undefined) => {
    const newContent = value || '';
    setContent(newContent);
    onChange?.(newContent);
  };

  return (
    <div className="grid grid-cols-2 gap-4 h-[calc(100vh-200px)]">
      <div className="border rounded-lg overflow-hidden">
        <MonacoEditor
          height="100%"
          defaultLanguage="markdown"
          value={content}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            wordWrap: 'on',
            lineNumbers: 'on',
            fontSize: 14,
          }}
        />
      </div>
      <div className="border rounded-lg p-4 overflow-auto prose dark:prose-invert max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
} 