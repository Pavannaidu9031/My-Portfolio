import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Cpu, CircuitBoard, Brain } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { CursorType, ProfileData } from '../types';

interface HeroProps {
  data: ProfileData;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  const { setCursorType } = useCursor();

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center px-6 relative pt-20">
      
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-[800px] h-[800px] border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[600px] h-[600px] border border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="z-10 flex flex-col items-center max-w-4xl mx-auto text-center"
      >
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8 px-4 py-1.5 rounded-full glass border border-white/10 flex items-center gap-2"
        >
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             <span className="text-xs font-mono tracking-widest text-accent uppercase">
                {data.location}
             </span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 mb-6">
          {data.name.split(' ')[0]} <br className="md:hidden"/> {data.name.split(' ')[1]}
        </h1>

        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-secondary font-light max-w-2xl mb-12 leading-relaxed"
            onMouseEnter={() => setCursorType(CursorType.TEXT)}
            onMouseLeave={() => setCursorType(CursorType.DEFAULT)}
        >
            {data.shortBio}
        </motion.p>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-3 gap-4 md:gap-8 w-full max-w-2xl"
        >
            <div className="glass-card p-6 rounded-2xl flex flex-col items-center gap-3 hover:bg-white/5 transition-colors duration-300">
                <Cpu className="text-accent" size={24} />
                <span className="text-xs uppercase tracking-wider font-bold text-gray-400">VLSI</span>
            </div>
            <div className="glass-card p-6 rounded-2xl flex flex-col items-center gap-3 hover:bg-white/5 transition-colors duration-300">
                <CircuitBoard className="text-accent2" size={24} />
                <span className="text-xs uppercase tracking-wider font-bold text-gray-400">Embedded</span>
            </div>
            <div className="glass-card p-6 rounded-2xl flex flex-col items-center gap-3 hover:bg-white/5 transition-colors duration-300">
                <Brain className="text-purple-400" size={24} />
                <span className="text-xs uppercase tracking-wider font-bold text-gray-400">AI / ML</span>
            </div>
        </motion.div>

      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="text-white/30 animate-bounce" size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;