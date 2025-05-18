import React from 'react';
import { Github, Coffee } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 px-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <div className="mb-4 md:mb-0">
          <p>© 2025 CodeSnippet Generator by Girish Lade. All rights reserved.</p>
        </div>
        <div className="flex items-center space-x-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
          <a 
            href="#" 
            className="flex items-center space-x-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <Coffee size={16} />
            <span>Buy me a coffee</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;