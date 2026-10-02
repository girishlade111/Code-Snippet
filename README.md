# Code Snippet Generator

An AI-powered web app that converts natural-language requests into ready-to-use code snippets across common languages and frameworks — describe what you want, pick a language, and get a well-formatted snippet with syntax highlighting. Built with React + Vite + Tailwind CSS.

## Features

- Natural-language to code-snippet generation (powered by Google Gemini API)
- 12 supported languages: JavaScript, TypeScript, React, HTML, CSS, Node.js, Express.js, Python, Django, MongoDB, MySQL, Firebase
- Syntax-highlighted output with one-click copy to clipboard
- Dark / light theme toggle (follows system preference, saved in localStorage)
- Graceful offline fallback snippets when the API is unavailable
- Fully client-side, responsive UI

## Tech Stack

- React 18 + TypeScript + Vite 5
- Tailwind CSS (class-based dark mode)
- lucide-react icons, react-syntax-highlighter

## Quick Start

```bash
npm install
npm run dev      # start dev server
npm run build    # production build -> dist/
```

The app calls the Gemini API from `src/snippets.ts`. If you fork this, replace the API key with your own (see note below).

## Project Structure

```
.
├── index.html
├── src/
│   ├── App.tsx                  # Main generator UI
│   ├── main.tsx                 # Entry point
│   ├── index.css                # Tailwind styles
│   ├── languages.ts             # Supported language list
│   ├── snippets.ts              # Gemini API + fallback snippets
│   ├── types/index.ts           # Language / CodeSnippet types
│   ├── hooks/useTheme.tsx       # Dark-mode theme context
│   └── components/              # Header, Footer, LanguageSelector, CodeSnippetDisplay
├── Simple Code Snippet Generator.zip  # Original project archive
└── README.md
```

## Deploy

Static build (`npm run build` → `dist/`). Currently deployed on Cloudflare Pages — see the homepage URL in this repo's "About" section.

## Security note

The Gemini API key shipped in `src/snippets.ts` is a client-side key and is publicly visible in this repo. If you fork or reuse this project, **rotate the key and use your own** — never commit a production key.

---

**Built by [Girish Lade](https://ladestack.in)** — part of the [LadeStack](https://ladestack.in) collection of free tools.
