import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, ArrowLeft } from 'lucide-react';
import Section from './Section';
import { Project } from '../types';
import { useCursor } from '../context/CursorContext';
import { CursorType } from '../types';

interface ProjectsProps {
  projects: Project[];
  onBack?: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ projects, onBack }) => {
  const { setCursorType } = useCursor();

  return (
    <Section id="projects" className="relative min-h-screen">
      
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
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Selected Works</h2>
        <div className="h-1 w-20 bg-accent rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.a
            href={project.link}
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10, scale: 1.015, rotate: -0.5 }}
            viewport={{ once: true }}
            transition={{ 
                delay: index * 0.1, 
                duration: 0.5,
                scale: { type: "spring", stiffness: 300, damping: 20 },
                rotate: { type: "spring", stiffness: 300, damping: 20 }
            }}
            className="group glass-card rounded-3xl overflow-hidden relative flex flex-col h-full hover:bg-white/5 z-0 hover:z-10"
            onMouseEnter={() => setCursorType(CursorType.HOVER)}
            onMouseLeave={() => setCursorType(CursorType.DEFAULT)}
          >
             {/* Image Container */}
             <div className="relative h-48 md:h-60 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent z-10 opacity-60"></div>
                <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                {/* Mobile: Always visible image hint */}
                <div className="absolute bottom-2 left-2 z-20 md:hidden bg-black/50 p-1 rounded-md">
                     <span className="text-[10px] text-white font-mono">View Project</span>
                </div>

                <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={16} className="text-white" />
                </div>
             </div>

             {/* Content */}
             <div className="p-6 md:p-8 flex flex-col flex-grow">
                 <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded bg-white/5 text-accent border border-white/5">
                            {tag}
                        </span>
                    ))}
                 </div>
                 
                 <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                     {project.title.split('(')[0]}
                 </h3>
                 
                 <p className="text-sm text-secondary leading-relaxed mb-6 flex-grow">
                    {project.description}
                 </p>

                 <div className="flex items-center text-accent text-sm font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                    View Project <ArrowUpRight size={16} className="ml-1" />
                 </div>
             </div>

             {/* Hover Glow */}
             <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/20 rounded-3xl transition-all duration-300 pointer-events-none"></div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
};

export default Projects;