import BookmarkingBtn from "./BookmarkingBtn";
import { CodeSnippet } from "./SnippetDataType";

interface SnippetCardProps {
  codeSnippet: CodeSnippet;
}

export default function SnippetCard({ codeSnippet }: SnippetCardProps) {
  return (
    <div className="bg-white p-4 rounded shadow w-[300px] m-2">
      <h2 className="font-bold text-lg">{codeSnippet.title}</h2>
      <p className="text-sm text-gray-600">{codeSnippet.language}</p>
      <pre className="bg-gray-100 p-2 mt-2 rounded text-sm overflow-x-auto">
        <code>{codeSnippet.code}</code>
      </pre>
      <BookmarkingBtn snippetId={codeSnippet.id} />
    </div>
  );
}
