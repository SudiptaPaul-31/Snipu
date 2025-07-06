import { prisma } from "@/lib/prisma";
import EditSnippetForm from "@/components/EditSnippetForm";
import Link from "next/link";

const EditPageSnippet = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const resolvedParams = await params;
  const id = Number.parseInt(resolvedParams.id);

  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });

  if (!snippet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 bg-fixed">
        <div className="max-w-4xl mx-auto p-8 animate-fade-in">
          <div className="bg-slate-800/30 p-8 rounded-xl backdrop-blur-sm border border-slate-700">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4">
              Snippet not found
            </h1>
            <p className="text-blue-200 mb-6">
              The snippet you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
            <Link
              href="/"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              ← Back to Snippets
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 bg-fixed">
      <div className="max-w-4xl mx-auto p-8 animate-fade-in">
        <div className="bg-slate-800/30 p-8 rounded-xl backdrop-blur-sm border border-slate-700">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-6">
            Edit Snippet
          </h1>
          <EditSnippetForm snippet={snippet} />
        </div>
      </div>
    </div>
  );
};

export default EditPageSnippet;
