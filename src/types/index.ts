export interface Language {
  id: string;
  name: string;
  extension: string;
}

export interface CodeSnippet {
  language: string;
  code: string;
}