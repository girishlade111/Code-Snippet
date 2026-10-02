import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { ThemeProvider } from './hooks/useTheme';
import Header from './components/Header';
import Footer from './components/Footer';
import LanguageSelector from './components/LanguageSelector';
import CodeSnippetDisplay from './components/CodeSnippetDisplay';
import { generateSnippet } from './snippets';
import { languages } from './languages';
import type { CodeSnippet } from './types';

function SnippetGenerator() {
  const [prompt, setPrompt] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [snippet, setSnippet] = useState<CodeSnippet | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    try {
      const result = await generateSnippet(prompt.trim(), selectedLanguage);
      setSnippet(result);
    } catch (error) {
      console.error('Failed to generate snippet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Generate Code Snippets</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Describe what you want to build, pick a language, and get a ready-to-use snippet.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 mb-6">
          <label htmlFor="prompt" className="block text-sm font-medium mb-2">
            What do you want to create?
          </label>
          <textarea
            id="prompt"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. A debounce function, a REST API route, a responsive navbar…"
            className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 resize-y"
          />
          <div className="flex flex-col md:flex-row md:items-center gap-3 mt-4">
            <LanguageSelector
              languages={languages}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed rounded-md transition-colors"
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Sparkles size={16} />
              )}
              {isLoading ? 'Generating…' : 'Generate Snippet'}
            </button>
          </div>
        </div>

        <CodeSnippetDisplay snippet={snippet} />
      </main>
      <Footer />
    </div>
  );
}

const App: React.FC = () => (
  <ThemeProvider>
    <SnippetGenerator />
  </ThemeProvider>
);

export default App;
