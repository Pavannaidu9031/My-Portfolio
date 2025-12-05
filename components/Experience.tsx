import React from 'react';
import Section from './Section';
import { Experience } from '../types';
import { motion } from 'framer-motion';
import { Briefcase, ArrowLeft } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { CursorType } from '../types';

interface ExperienceProps {
  experience: Experience[];
  onBack?: () => void;
}

const ExperienceSection: React.FC<ExperienceProps> = ({ experience, onBack }) => {
  const { setCursorType } = useCursor();

  return (
    <Section id="experience" className="relative min-h-screen">
      
      {/* Optional Back Button for UX */}
      {onBack && (
        <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center gap-2 text-secondary hover:text-white mb-8 group transition-colors"
            onMouseEnter={() => setCursorType(CursorType.BUTTON)}
            onMouseLeave={() => setCursorType(CursorType.DEFAULT)}
        >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-mono uppercase tracking-wider">Back to Home</span>
        </motion.button>
      )}

      <div className="flex flex-col gap-2 mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Experience</h2>
        <div className="h-1 w-20 bg-accent2 rounded-full"></div>
      </div>

      <div className="relative space-y-8">
        {/* Timeline Line */}
        <div className="absolute left-8 top-4 bottom-4 w-px bg-gradient-to-b from-accent/50 via-white/10 to-transparent hidden md:block"></div>

        {experience.map((exp, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative md:pl-24"
          >
              {/* Timeline Dot */}
              <div className="absolute left-[26px] top-6 w-3 h-3 rounded-full bg-surface border-2 border-accent z-10 hidden md:block shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>

              <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 hover:border-accent/30 transition-colors duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                      <div className="flex items-center gap-3">
                          <div className="p-2 bg-white/5 rounded-lg text-accent md:hidden">
                            <Briefcase size={16} />
                          </div>
                          <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      </div>
                      <span className="font-mono text-xs text-accent2 bg-accent2/10 px-3 py-1 rounded-full w-fit">
                        {exp.period}
                      </span>
                  </div>
                  
                  <div className="text-gray-400 font-medium mb-4 flex items-center gap-2">
                     <span className="w-1 h-1 bg-white rounded-full"></span>
                     {exp.company}
                  </div>

                  <ul className="space-y-3">
                    {exp.description.map((point, idx) => (
                        <li key={idx} className="text-sm text-secondary leading-relaxed flex items-start gap-3">
                             <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 flex-shrink-0"></span>
                             {point}
                        </li>
                    ))}
                  </ul>
              </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default ExperienceSection;