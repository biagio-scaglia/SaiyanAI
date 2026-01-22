"use client";
import { motion } from "framer-motion";
import { Brain, Database, Search, Shield, Zap, MessageSquare } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Powered AI",
    description: "Built on Llama-3.2 and LangGraph to deliver accurate, grounded answers about the Dragon Ball universe.",
    color: "from-orange-500 to-yellow-500"
  },
  {
    icon: Database,
    title: "Local Knowledge Base",
    description: "A Qdrant vector database packed with characters, transformations, techniques, and story arcs.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Search,
    title: "Web Search",
    description: "DuckDuckGo integration for release dates, recent news, and information outside the lore.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: MessageSquare,
    title: "Multiple Personas",
    description: "Chat as Goku, Vegeta, Gohan, or Frieza—each with a distinct voice and attitude.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Shield,
    title: "Local Privacy",
    description: "Your data and models stay on your machine. Nothing is sent to external servers.",
    color: "from-red-500 to-orange-500"
  },
  {
    icon: Zap,
    title: "Advanced RAG",
    description: "Retrieval-Augmented Generation that blends curated knowledge with strong reasoning.",
    color: "from-yellow-500 to-orange-500"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-transparent text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Limitless <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Power</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Cutting-edge tech for a next-level Dragon Ball AI experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-900/20"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
