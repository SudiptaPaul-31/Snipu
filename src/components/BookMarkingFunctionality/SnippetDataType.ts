export interface CodeSnippet {
  id: number;
  title: string;
  code: string;
  language: string;
}

export interface BookmarkState {
  snippetId: number;
  bookmarked: boolean;
}