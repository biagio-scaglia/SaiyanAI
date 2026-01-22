"use client";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Database, Sparkles } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Ask a Question",
    description: "Ask anything about Dragon Ball: characters, transformations, techniques, or story arcs.",
    step: "01"
  },
  {
    icon: Database,
    title: "Smart Retrieval",
    description: "The system automatically decides whether to use the local knowledge base or the web for fresh info.",
    step: "02"
  },
  {
    icon: Sparkles,
    title: "Answer Generation",
    description: "The AI generates a grounded answer using the retrieved context—while staying in the selected persona.",
    step: "03"
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-transparent text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Works</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            An advanced RAG pipeline combining curated knowledge with strong reasoning
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex flex-col md:flex-row gap-6 items-start group"
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-orange-900/30">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-zinc-900 border-2 border-orange-500 flex items-center justify-center text-xs font-bold text-orange-500">
                      {step.step}
                    </div>
                  </div>
                  
                  <div className="flex-1 pt-2">
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-lg">{step.description}</p>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute left-10 top-24 w-0.5 h-16 bg-gradient-to-b from-orange-500/50 to-transparent" />
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <a 
              href="#chat" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-yellow-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(234,88,12,0.5)] transition-all"
            >
              Try It Now <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
