
import React from 'react';
import Section from './Section';
import { ProfileData, CursorType } from '../types';
import { useCursor } from '../context/CursorContext';
import { motion } from 'framer-motion';

interface AboutProps {
  data: ProfileData;
}

const About: React.FC<AboutProps> = ({ data }) => {
  const { setCursorType } = useCursor();

  return (
    <Section id="about">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* Image Card */}
        <div className="md:col-span-5 relative group">
            {/* Ambient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-accent2 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-card p-1"
            >
                {/* Image */}
                <img 
                    src={data.profileImage} 
                    alt={data.name} 
                    onError={(e) => {
                        // Fallback: Show initials if local file is missing, instead of a random person
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=111827&color=38bdf8&size=512`;
                    }}
                    className="w-full h-full object-cover object-center rounded-xl shadow-2xl relative z-0"
                />

                {/* Tech Overlays/Decorations */}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent z-10 pointer-events-none mix-blend-overlay"></div>
                
                {/* Tech Corners */}
                <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-accent/50 rounded-tl-lg z-20"></div>
                <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-accent/50 rounded-br-lg z-20"></div>
                <div className="absolute top-3 right-3 w-2 h-2 bg-accent/50 rounded-full z-20"></div>
            </motion.div>
        </div>
        
        <div className="md:col-span-7 flex flex-col gap-8">
            <div>
                 <h2 className="text-sm font-mono uppercase tracking-widest text-accent mb-2">About Me</h2>
                 <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                    Bridging Hardware & Software
                 </h3>
            </div>
            
            <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
                <p
                    className="text-lg text-secondary leading-relaxed font-light relative z-10"
                    onMouseEnter={() => setCursorType(CursorType.TEXT)}
                    onMouseLeave={() => setCursorType(CursorType.DEFAULT)}
                >
                    {data.longBio}
                </p>
            </div>

            <div>
                <h4 className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-4">Technical Arsenal</h4>
                <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                    <motion.span
                        key={skill}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-4 py-2 text-sm text-gray-300 glass rounded-full hover:bg-accent/10 hover:text-white hover:border-accent/50 transition-colors cursor-default border border-white/5"
                    >
                    {skill}
                    </motion.span>
                ))}
                </div>
            </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
