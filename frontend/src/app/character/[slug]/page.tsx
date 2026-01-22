import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ChatSection from "@/components/ChatSection";

// Simulating a data fetch
const CHARACTERS: Record<string, { name: string; role: string; desc: string; color: string; persona: string; image: string }> = {
  goku: {
    name: "Goku",
    role: "Saiyan Raised on Earth",
    desc: "The main protagonist. Cheerful, energetic, and obsessed with fighting.",
    color: "from-orange-500 to-yellow-500",
    persona: "goku",
    image: "/goku.jpg"
  },
  vegeta: {
    name: "Vegeta",
    role: "Prince of Saiyans",
    desc: "Proud and disciplined. Goku's eternal rival and ally.",
    color: "from-blue-600 to-purple-600",
    persona: "vegeta",
    image: "/vegeta.webp"
  },
  gohan: {
    name: "Gohan",
    role: "Hybrid Saiyan",
    desc: "Goku's son. Possesses immense latent potential.",
    color: "from-purple-500 to-indigo-500",
    persona: "default", // Fallback to default for now
    image: "/gohan.webp"
  },
  frieza: {
    name: "Frieza",
    role: "Galactic Tyrant",
    desc: "Cruel and powerful emperor.",
    color: "from-purple-800 to-pink-600",
    persona: "default",
    image: "/frieza.webp"
  }
};

export default async function CharacterPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug.toLowerCase();
  const char = CHARACTERS[slug];

  if (!char) {
    return <div className="min-h-screen flex items-center justify-center text-white bg-black">Character not found</div>;
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className={`relative h-64 w-full bg-gradient-to-r ${char.color}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <h1 className="text-5xl font-black tracking-tighter mb-2">{char.name}</h1>
          <p className="text-xl opacity-90 font-medium">{char.role}</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Card */}
          <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl h-fit">
            <h2 className="text-xl font-bold mb-4">About</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {char.desc}
            </p>
            <div className="h-96 bg-zinc-800 rounded-xl flex items-center justify-center border border-white/5 overflow-hidden relative">
               <img 
                 src={char.image} 
                 alt={char.name} 
                 className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
               />
            </div>
          </div>

          {/* Chat with Character */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Chat with {char.name}</h2>
            <div className="border border-white/10 rounded-3xl overflow-hidden bg-zinc-950">
               <ChatSection 
                  persona={char.persona} 
                  initialMessage={char.persona === 'goku' ? "Hey! Let's train! Or grab some food!" : char.persona === 'vegeta' ? "What do you want, insect? Make it quick." : `Ask me anything about ${char.name}.`}
               />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
