'use client'
import { Home, Code, Search } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-teal-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent animate-scale-in">
            404
          </h1>
        </div>

        <div className="mb-6 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Oops! The page you're looking for seems to have wandered off into the digital void. 
            Don't worry, even the best code snippets sometimes get lost in the blockchain.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up">
          <Link
            href="/"
            className="group bg-gradient-to-r from-teal-400 to-blue-500 text-white font-medium px-6 py-3 rounded-full inline-flex items-center gap-2 hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] transition-all duration-300 hover:scale-105"
          >
            <Home className="h-4 w-4 group-hover:animate-pulse" />
            Go Home
          </Link>
          
          <Link
            href="/snippet"
            className="group bg-transparent border-2 border-teal-500 text-teal-400 font-medium px-6 py-3 rounded-full inline-flex items-center gap-2 hover:bg-teal-500 hover:text-white transition-all duration-300 hover:scale-105"
          >
            <Code className="h-4 w-4 group-hover:animate-pulse" />
            Browse Snippets
          </Link>
        </div>

        <div className="relative animate-fade-in">

          <div className="absolute -top-20 -left-20 text-teal-400/20 text-2xl animate-pulse">
            {'</>'}
          </div>
          <div className="absolute -top-16 -right-16 text-blue-400/20 text-xl animate-pulse delay-1000">
            {'{}'}
          </div>
          <div className="absolute -bottom-20 -left-16 text-cyan-400/20 text-lg animate-pulse delay-500">
            {'[]'}
          </div>
          <div className="absolute -bottom-16 -right-20 text-teal-400/20 text-xl animate-pulse delay-1500">
            {'()'}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700/50 animate-fade-in-up">
          <p className="text-gray-400 text-sm mb-4">
            Need help finding something?
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/snippet"
              className="text-teal-400 hover:text-teal-300 transition-colors duration-200 flex items-center gap-1"
            >
              <Search className="h-3 w-3" />
              Search Snippets
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              href="/"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center gap-1"
            >
              <Home className="h-3 w-3" />
              Homepage
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0; 
            transform: scale(0.5); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.8s ease-out;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-1500 {
          animation-delay: 1.5s;
        }
      `}</style>
    </div>
  )
}
