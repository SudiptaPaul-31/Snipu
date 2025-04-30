
import { codeSnippets } from "@/components/BookMarkingFunctionality/CodeSnippetData";
import SnippetCard from "@/components/BookMarkingFunctionality/SnippetCard";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";


export default async function Home() {
  const snippets = await prisma.snippet.findMany();




  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 bg-fixed w-full">
      <div className="w-full min-h-screen">
        <div className="max-w-4xl mx-auto p-8 animate-fade-in">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent animate-pulse">
              Code Snippets
            </h1>
            <p className="mt-4 text-lg text-blue-200">Your collection of useful code snippets</p>
          </div>

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-blue-300">My Snippets</h2>
            <Link href="/snippet/new">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transform transition-all duration-200 hover:scale-105 shadow-lg">
                + New Snippet
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {snippets.map((snippet, index) => (
              <Link
                key={snippet.id}
                href={`/snippet/${snippet.id}`}
                className="block group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border border-slate-700 hover:border-blue-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 flex items-center justify-between">
                    <h3 className="text-xl font-medium text-blue-200">{snippet.title}</h3>
                    <Button
                      variant="outline"
                      className="bg-transparent border border-blue-400 text-blue-300 hover:bg-blue-500/10 hover:text-blue-100 transition-colors"
                    >
                      View →
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

         {snippets.length === 0 && (
            <div className="text-center py-12 animate-pulse">
              <p className="text-blue-400 text-lg">No snippets found. Create your first one!</p>











              <div className=" w-full flex items-center justify-between flex-wrap "  >


                {codeSnippets.map((item, index) =>(
                     <SnippetCard key={index} codeSnippet={item}  />
                ))}

              </div>














            </div>
          )}
        </div>
      </div>
    </div>
  );
}