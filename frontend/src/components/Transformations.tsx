"use client";
import { motion } from "framer-motion";

const forms = [
  {
    title: "Super Saiyan",
    description: "The legendary warrior of gold. Increases power level by 50x.",
    step: "SSJ",
    color: "from-yellow-400 to-yellow-600",
    image: "/icon-ssj.jpg"
  },
  {
    title: "Super Saiyan God",
    description: "A divine transformation achieved through the power of five pure-hearted Saiyans.",
    step: "GOD",
    color: "from-red-500 to-red-700",
    image: "/icon-ssj-god.jpg"
  },
  {
    title: "Ultra Instinct",
    description: "A state where the body reacts without thinking. The pinnacle of martial arts.",
    step: "UI",
    color: "from-blue-200 to-white",
    image: "/icon-mui.jpg"
  }
];

export default function Transformations() {
  return (
    <section id="transformations" className="py-20 bg-transparent text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Legendary <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">Forms</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Witness the evolution of Saiyan power
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {forms.map((form, index) => {
              return (
                <motion.div
                  key={form.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex flex-col md:flex-row gap-6 items-center group"
                >
                  <div className="relative flex-shrink-0">
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${form.color} p-1 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]`}>
                      <img 
                        src={form.image} 
                        alt={form.title}
                        className="w-full h-full rounded-full object-cover border-2 border-black/20"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-zinc-900 border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-lg z-10">
                      {form.step}
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h3 className={`text-3xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r ${form.color}`}>{form.title}</h3>
                    <p className="text-gray-300 leading-relaxed text-lg font-medium">{form.description}</p>
                  </div>

                  {index < forms.length - 1 && (
                    <div className="hidden md:block absolute left-12 top-24 w-0.5 h-16 bg-gradient-to-b from-white/20 to-transparent" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
