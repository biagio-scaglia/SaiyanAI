"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const CHARACTERS = [
  {
    name: "Goku",
    role: "Saiyan Raised on Earth",
    desc: "The main protagonist. Cheerful, energetic, and obsessed with fighting.",
    color: "from-orange-500 to-yellow-500",
    image: "/goku.jpg"
  },
  {
    name: "Vegeta",
    role: "Prince of Saiyans",
    desc: "Proud and disciplined. Goku's eternal rival and ally.",
    color: "from-blue-600 to-purple-600",
    image: "/vegeta.webp"
  },
  {
    name: "Gohan",
    role: "Hybrid Saiyan",
    desc: "Goku's son. Possesses immense latent potential.",
    color: "from-purple-500 to-indigo-500",
    image: "/gohan.webp"
  },
  {
    name: "Frieza",
    role: "Galactic Tyrant",
    desc: "Cruel and powerful emperor. Responsible for destroying Planet Vegeta.",
    color: "from-purple-800 to-pink-600",
    image: "/frieza.webp"
  }
];

export default function CharacterGrid() {
  return (
    <section id="characters" className="py-20 bg-transparent text-white">
      <div className="container mx-auto px-4">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Main Fighters</h2>
          <p className="text-gray-400">Legends of the Dragon Ball Universe</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CHARACTERS.map((char, index) => (
            <motion.div
              key={char.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-white/10 hover:border-orange-500/50 transition-colors flex flex-col"
            >
              <div className="relative h-96 w-full overflow-hidden">
                 <div className={`absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-10 opacity-30`} />
                 <img 
                    src={char.image} 
                    alt={char.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                 />
              </div>
              <div className={`h-1 w-full bg-gradient-to-r ${char.color}`} />
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold mb-2">{char.name}</h3>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">{char.role}</p>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-1">
                  {char.desc}
                </p>
                
                <Link href={`/character/${char.name.toLowerCase()}`} className="block w-full text-center py-3 rounded-lg bg-zinc-800 text-sm font-medium hover:bg-zinc-700 transition-colors border border-white/5 group-hover:bg-white/10">
                    Ask about {char.name}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
