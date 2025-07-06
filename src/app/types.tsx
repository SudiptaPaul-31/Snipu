export interface Snippet {
  id: number;
  title: string;
  code: string;
  language: string;
  description?: string;
  authorId: string;
  tags: string[];
  createdAt: Date;
  comments?: Comment[];
  author?: User;
  views?: number;
  copies?: number;
  isBookmarked?: boolean;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  snippetId: number;
}

export interface User {
  id: string;
  walletAddress: string;
  username: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ProgrammingLanguage =
  | "JavaScript"
  | "TypeScript"
  | "Python"
  | "Java"
  | "C#"
  | "C++"
  | "C"
  | "PHP"
  | "Ruby"
  | "Go"
  | "Swift"
  | "Kotlin"
  | "Rust"
  | "SQL"
  | "HTML"
  | "CSS"
  | "SCSS"
  | "SASS"
  | "Less"
  | "Dart"
  | "R"
  | "Shell"
  | "PowerShell"
  | "Objective-C"
  | string;
