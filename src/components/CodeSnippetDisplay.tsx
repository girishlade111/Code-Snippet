import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useTheme } from '../hooks/useTheme';
import { CodeSnippet } from '../types';

interface CodeSnippetDisplayProps {
  snippet: CodeSnippet | null;
}

const CodeSnippetDisplay: React.FC<CodeSnippetDisplayProps> = ({ snippet }) => {
  const [copied, setCopied] = useState(false);
  const { isDarkMode } = useTheme();

  const copyToClipboard = () => {
    if (!snippet) return;
    
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (!snippet) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6">
        <p className="text-gray-500 dark:text-gray-400 text-center">
          Enter a prompt and select a language to generate a code snippet
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {snippet.language}
        </span>
        <button
          onClick={copyToClipboard}
          className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none transition-colors duration-200"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check size={16} className="text-green-500" />
              <span className="text-green-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>
      <div className="overflow-auto max-h-[600px]">
        <SyntaxHighlighter
          language={snippet.language}
          style={isDarkMode ? vs2015 : docco}
          customStyle={{
            margin: 0,
            padding: '1rem',
            fontSize: '0.875rem',
            lineHeight: 1.6,
            borderRadius: 0,
          }}
          showLineNumbers
        >
          {snippet.code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeSnippetDisplay;