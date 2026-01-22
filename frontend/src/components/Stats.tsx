"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { number: "4", label: "Available Personas", suffix: "" },
  { number: "1000+", label: "Knowledge Chunks", suffix: "" },
  { number: "5", label: "Knowledge Files", suffix: "" },
  { number: "24/7", label: "Always Ready", suffix: "" }
];

function AnimatedNumber({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
      {isInView ? value : "0"}{suffix}
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-20 bg-transparent text-white border-y border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring" }}
              className="text-center"
            >
              <AnimatedNumber value={stat.number} suffix={stat.suffix} />
              <p className="text-gray-400 mt-2 text-sm md:text-base font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
