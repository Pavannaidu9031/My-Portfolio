import React, { useState } from 'react';
import Section from './Section';
import { Publication } from '../types';
import { useCursor } from '../context/CursorContext';
import { CursorType } from '../types';
import { ArrowUpRight, BookOpen, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PublicationsProps {
  publications: Publication[];
}

const PublicationItem: React.FC<{ pub: Publication }> = ({ pub }) => {
  const { setCursorType } = useCursor();
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className={`group glass-card rounded-2xl overflow-hidden transition-all duration-300 ${isHovered ? 'border-accent/40 bg-white/5' : 'border-white/5'}`}
      onMouseEnter={() => {
          setCursorType(CursorType.HOVER);
          setIsHovered(true);
      }}
      onMouseLeave={() => {
          setCursorType(CursorType.DEFAULT);
          setIsHovered(false);
      }}
    >
        <div className="p-6 md:p-8 cursor-pointer relative" onClick={() => setIsExpanded(!isExpanded)}>
             {/* Glowing side accent */}
             <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors duration-300 ${isHovered ? 'bg-accent' : 'bg-transparent'}`}></div>

             <div className="flex justify-between items-start gap-4">
                 <div className="flex-1">
                     <div className="flex items-center gap-2 mb-2">
                        <BookOpen size={14} className="text-accent2" />
                        <span className="text-xs font-mono text-accent2 tracking-wider">{pub.date}</span>
                     </div>
                     <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-snug group-hover:text-accent transition-colors">
                        {pub.title}
                     </h3>
                     
                     {/* Desktop View */}
                     <div className="hidden md:block">
                        <p className="text-sm text-secondary mb-1">by <span className="text-gray-300">{pub.authors}</span></p>
                        <p className="text-xs font-mono text-gray-500">{pub.journal}</p>
                     </div>
                 </div>
                 
                 <div className="flex flex-col items-end gap-2">
                     <ArrowUpRight className={`text-white transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} size={20} />
                     <button className="md:hidden text-gray-500">
                        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                            <ChevronDown size={18} />
                        </motion.div>
                     </button>
                 </div>
             </div>

             {/* Mobile Expanded View */}
             <AnimatePresence>
                 {isExpanded && (
                     <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden pt-4 mt-4 border-t border-white/10"
                     >
                        <p className="text-sm text-secondary mb-2">by {pub.authors}</p>
                        <p className="text-xs font-mono text-gray-500">{pub.journal}</p>
                     </motion.div>
                 )}
             </AnimatePresence>
        </div>
    </motion.div>
  );
};

const Publications: React.FC<PublicationsProps> = ({ publications }) => {
  return (
    <Section id="publications">
      <div className="flex flex-col gap-2 mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Publications</h2>
        <div className="h-1 w-20 bg-accent2 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {publications.map((pub, index) => (
          <PublicationItem key={index} pub={pub} />
        ))}
      </div>
    </Section>
  );
};

export default Publications;