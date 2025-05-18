import { CodeSnippet } from '../types';

const GEMINI_API_KEY = 'AIzaSyDK68voN4wRnCh95nrlu0m9vHbtJKOECqM';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const generateSnippet = async (prompt: string, language: string): Promise<CodeSnippet> => {
  try {
    const enhancedPrompt = `Generate a code snippet in ${language} for the following request: ${prompt}
    
    Requirements:
    - Keep it simple and focused
    - Include helpful comments
    - Follow best practices
    - Use modern syntax
    - Make it production-ready
    - Only include the code, no explanations outside the code comments
    `;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: enhancedPrompt }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate snippet');
    }

    const data = await response.json();
    const generatedCode = data.candidates[0].content.parts[0].text;

    return {
      language,
      code: generatedCode.trim()
    };
  } catch (error) {
    console.error('Error generating snippet:', error);
    
    // Fallback to default snippets if API fails
    return {
      language,
      code: getDefaultSnippet(language)
    };
  }
};

// Fallback snippets for when API is unavailable
const getDefaultSnippet = (language: string): string => {
  const snippets: Record<string, string> = {
    javascript: `// JavaScript Example
function example() {
  console.log("Hello from JavaScript!");
}`,
    typescript: `// TypeScript Example
function example(): void {
  console.log("Hello from TypeScript!");
}`,
    python: `# Python Example
def example():
    print("Hello from Python!")`,
    react: `// React Component Example
import React from 'react';

function ExampleComponent() {
  return (
    <div>
      <h1>Hello from React!</h1>
    </div>
  );
}

export default ExampleComponent;`,
    html: `<!-- HTML Example -->
<div class="example">
  <h1>Hello from HTML!</h1>
</div>`,
    css: `/* CSS Example */
.example {
  color: blue;
  padding: 1rem;
}`,
    node: `// Node.js Example
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from Node.js!');
});

server.listen(3000);`,
    express: `// Express.js Example
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(3000);`,
    django: `# Django View Example
from django.http import HttpResponse

def example_view(request):
    return HttpResponse("Hello from Django!")`,
    mongodb: `// MongoDB Example
db.collection.find({
  status: "active"
}).limit(10)`,
    mysql: `-- MySQL Example
SELECT * FROM users 
WHERE status = 'active' 
LIMIT 10;`,
    firebase: `// Firebase Example
import { getFirestore } from 'firebase/firestore';

const db = getFirestore();
const usersRef = collection(db, 'users');`
  };

  return snippets[language] || snippets.javascript;
};