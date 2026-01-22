"use client";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-section.jpg" 
          alt="Dragon Ball Background" 
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-black/40 mix-blend-overlay" />
      
      <div className="container relative z-10 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter drop-shadow-2xl">
            UNLEASH YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500 drop-shadow-sm">
              INNER POWER
            </span>
          </h1>
          
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 drop-shadow-md font-medium">
            The ultimate AI companion for the Dragon Ball universe.
            Ask about lore, transformations, techniques, and sagas… and if needed, I can search the web too.
          </p>
          
          <div className="flex gap-4 justify-center">
            <a href="#chat" className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-700 transition-all hover:shadow-[0_0_20px_rgba(234,88,12,0.5)] shadow-lg shadow-orange-900/20">
              Start Chatting
            </a>
            <a href="#characters" className="bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20 shadow-lg">
              Explore Fighters
            </a>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50 z-10">
        <ArrowDown />
      </div>
    </section>
  );
}
