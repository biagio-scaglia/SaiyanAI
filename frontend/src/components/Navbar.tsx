import Link from "next/link";
import { Zap } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-orange-500">
          <Zap className="h-6 w-6" />
          <span className="font-bold text-xl tracking-tighter text-white">SAIYAN<span className="text-orange-500">AI</span></span>
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          <Link href="#hero" className="hover:text-orange-500 transition-colors">Home</Link>
          <Link href="#characters" className="hover:text-orange-500 transition-colors">Characters</Link>
          <Link href="#chat" className="hover:text-orange-500 transition-colors">Chat</Link>
        </div>
        
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full text-sm font-bold transition-transform hover:scale-105">
          Power Up
        </button>
      </div>
    </nav>
  );
}
