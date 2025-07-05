import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import { deleteSnippet } from "@/actions";
import { notFound } from "next/navigation";
// import CommentSection from "@/components/Comments/CommentSection";
import { getIPFSUrl } from "@/lib/ipfs";

type SnippetDetailsProps = {
  params: Promise<{ id: string }>;
};

const SnippetDetailPage: React.FC<SnippetDetailsProps> = async ({ params }) => {
  const id = parseInt((await params).id);

  await new Promise((r) => setTimeout(r, 2000));

  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });

  if (!snippet) notFound();

  const deleteSnippetActions = deleteSnippet.bind(null, snippet.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 bg-fixed">
      <div className="max-w-4xl mx-auto p-8 animate-fade-in">
        <div className="flex flex-col gap-5 bg-slate-800/30 p-6 rounded-xl backdrop-blur-sm border border-slate-700">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              {snippet.title}
            </h1>
            <div className="flex items-center gap-2">
              <Link href={`/snippet/${snippet.id}/edit`}>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-200 hover:scale-105">
                  Edit
                </Button>
              </Link>

              <form action={deleteSnippetActions}>
                <Button
                  variant={"destructive"}
                  type="submit"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all duration-200 hover:scale-105"
                >
                  Delete
                </Button>
              </form>
            </div>
          </div>

          {/* Add IPFS link if available */}
          {snippet.ipfsCid && (
            <div className="mt-2">
              <a
                href={getIPFSUrl(snippet.ipfsCid)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                View on IPFS
              </a>
            </div>
          )}

          <div className="group">
            <pre className="p-6 bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-300 overflow-x-auto">
              <code className="text-blue-200 font-mono text-sm">
                {snippet.code}
              </code>
            </pre>
          </div>

          {/* Comment Section */}
          <div className="mt-8 bg-slate-800/30 rounded-xl p-6 border border-slate-700">
            {/* <CommentSection snippetId={snippet.id} /> */}
          </div>

          <Link
            href="/"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mt-4"
          >
            ← Back to Snippets
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SnippetDetailPage;

export const generateStaticParams = async () => {
  const snippets = await prisma.snippet.findMany();

  return snippets.map((snippet) => {
    return { id: snippet.id.toString() };
  });
};
