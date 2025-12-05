import React from 'react';
import Section from './Section';
import { Education } from '../types';
import { GraduationCap, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { CursorType } from '../types';

interface EducationProps {
  education: Education[];
  onBack?: () => void;
}

const EducationSection: React.FC<EducationProps> = ({ education, onBack }) => {
  const { setCursorType } = useCursor();

  return (
    <Section id="education" className="relative min-h-screen">
      
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
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Education</h2>
        <div className="h-1 w-20 bg-purple-500 rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {education.map((edu, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }} 
            className="glass-card p-6 md:p-8 rounded-2xl flex flex-col md:flex-row gap-6 items-start hover:border-purple-500/30 transition-colors duration-300"
          >
             <div className="p-3 bg-white/5 rounded-xl text-purple-400 shrink-0">
                <GraduationCap size={24} />
             </div>
             <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{edu.institution}</h3>
                    <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full w-fit mt-2 md:mt-0">
                        {edu.period}
                    </span>
                </div>
                <p className="text-lg text-gray-300 mb-4 font-light">{edu.degree}</p>
                <div className="flex flex-wrap gap-2">
                    {edu.details.map((detail, idx) => (
                        <span key={idx} className="text-sm text-secondary bg-white/5 px-3 py-1 rounded border border-white/5">
                            {detail}
                        </span>
                    ))}
                </div>
             </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default EducationSection;