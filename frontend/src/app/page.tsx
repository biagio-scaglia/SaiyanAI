import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CharacterGrid from "@/components/CharacterGrid";
import ChatSection from "@/components/ChatSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-white">
      <Navbar />
      <Hero />
      
      {/* Main Content with Background */}
      <div className="relative w-full">
        {/* Fixed Background Image for this section */}
        <div 
          className="absolute inset-0 z-0 bg-no-repeat bg-center"
          style={{
            backgroundImage: 'url(/background.jpg)',
            backgroundSize: 'cover',
            imageRendering: 'auto'
          }}
        >
          {/* Heavy Overlay for readability */}
          <div className="absolute inset-0 bg-black/85" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <CharacterGrid />
          <ChatSection />
          
          {/* Footer */}
          <footer className="py-8 bg-black/50 backdrop-blur text-center text-gray-600 text-sm border-t border-white/5">
            <p>Developed by <span className="text-orange-500 font-semibold">Biagio Scaglia</span></p>
            <p className="mt-2 text-xs text-gray-500">Built with Next.js, LangChain & Dragon Ball Passion</p>
          </footer>
        </div>
      </div>
    </main>
  );
}
