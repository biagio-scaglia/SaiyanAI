"use client";
import { motion } from "framer-motion";

export default function DragonRadar() {
  // Deterministic positions for the 7 balls
  const dragonBalls = [
    { top: "30%", left: "40%", delay: 0 },
    { top: "50%", left: "70%", delay: 0.5 },
    { top: "70%", left: "30%", delay: 1 },
    { top: "40%", left: "60%", delay: 1.5 },
    { top: "60%", left: "50%", delay: 2 },
    { top: "20%", left: "50%", delay: 2.5 },
    { top: "80%", left: "60%", delay: 3 },
  ];

  return (
    <section className="py-20 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Container */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        {/* Radar Body */}
        <div className="w-80 h-80 md:w-96 md:h-96 bg-gray-300 rounded-full p-4 shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-gray-400 relative flex items-center justify-center">
            {/* Top Button */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-8 bg-gray-400 rounded-t-lg border-t-2 border-white/50 shadow-lg cursor-pointer active:translate-y-1 transition-transform" />

            {/* Screen Bezel */}
            <div className="w-full h-full bg-gray-800 rounded-full p-2 shadow-inner border-4 border-gray-500">
                
                {/* Green Screen */}
                <div className="w-full h-full bg-[#0ea956] rounded-full relative overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] border-2 border-[#096a36]">
                    
                    {/* Grid Lines */}
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-30 pointer-events-none">
                        {[...Array(7)].map((_, i) => (
                            <div key={`v-${i}`} className="absolute top-0 bottom-0 w-px bg-[#063b1e]" style={{ left: `${i * 16.66}%` }} />
                        ))}
                        {[...Array(7)].map((_, i) => (
                            <div key={`h-${i}`} className="absolute left-0 right-0 h-px bg-[#063b1e]" style={{ top: `${i * 16.66}%` }} />
                        ))}
                    </div>

                    {/* Central Triangle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[20px] border-b-red-600 drop-shadow-md z-20" />

                    {/* Scanning Line */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 w-[150%] h-[2px] bg-gradient-to-r from-transparent via-[#a7f3d0] to-transparent origin-left -translate-y-1/2 z-10 opacity-60"
                        style={{ left: "50%" }}
                    />

                    {/* Dragon Balls (Blips) */}
                    {dragonBalls.map((pos, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 1] }}
                            transition={{ 
                                duration: 2, 
                                repeat: Infinity, 
                                delay: pos.delay,
                                repeatDelay: 0.5
                            }}
                            className="absolute w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)] z-10"
                            style={{ top: pos.top, left: pos.left }}
                        />
                    ))}
                </div>
            </div>
        </div>
      </motion.div>

      {/* Text Context */}
      <div className="mt-12 text-center z-10">
        <h3 className="text-3xl font-bold text-white mb-2 font-mono tracking-widest uppercase">
            System <span className="text-green-500">Online</span>
        </h3>
        <p className="text-green-400 font-mono text-sm max-w-md mx-auto">
            SCANNING FOR KNOWLEDGE... TARGET ACQUIRED. <br/>
            READY TO UPLOAD DATA TO CAPSULE CORP DATABASE.
        </p>
      </div>

    </section>
  );
}
