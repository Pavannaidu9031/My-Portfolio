
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { CursorType } from '../types';
import { ViewState } from '../App';
import { Menu, X } from 'lucide-react';
import { PROFILE_DATA } from '../constants';

interface NavigationProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const { setCursorType } = useCursor();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (target: string) => {
    setIsOpen(false);
    if (target === 'projects') {
      onViewChange('projects');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'experience') {
      onViewChange('experience');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'education') {
      onViewChange('education');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (currentView !== 'home') {
        onViewChange('home');
        // Small timeout to allow render
        setTimeout(() => {
          const element = document.querySelector(target);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        // Already on home, just scroll
        const element = document.querySelector(target);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const links = [
    { name: 'Projects', target: 'projects' },
    { name: 'Experience', target: 'experience' },
    { name: 'Education', target: 'education' },
    { name: 'About', target: '#about' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50"
      >
        <nav className="glass px-2 py-2 rounded-full flex items-center gap-1 shadow-lg shadow-black/20">
          <button 
              onClick={() => handleNavClick('#root')}
              className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full overflow-hidden border border-white/5 hover:bg-white/10 transition-colors p-0"
              onMouseEnter={() => setCursorType(CursorType.HOVER)}
              onMouseLeave={() => setCursorType(CursorType.DEFAULT)}
          >
              <img 
                src={PROFILE_DATA.profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerText = "PK";
                }}
              />
          </button>
          
          <div className="h-4 w-px bg-white/10 mx-1"></div>

          <ul className="flex items-center">
              {links.map((link) => (
              <li key={link.name}>
                  <button
                  onClick={() => handleNavClick(link.target)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all block ${
                      (link.target === currentView) 
                      ? 'text-white bg-white/10' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  onMouseEnter={() => setCursorType(CursorType.BUTTON)}
                  onMouseLeave={() => setCursorType(CursorType.DEFAULT)}
                  >
                  {link.name}
                  </button>
              </li>
              ))}
          </ul>

          <div className="h-4 w-px bg-white/10 mx-1"></div>

          <a
              href="mailto:pavannaidu9031@gmail.com"
              className="px-4 py-2 rounded-full bg-accent text-black text-xs font-bold hover:bg-white transition-colors"
              onMouseEnter={() => setCursorType(CursorType.BUTTON)}
              onMouseLeave={() => setCursorType(CursorType.DEFAULT)}
          >
              Hire Me
          </a>
        </nav>
      </motion.div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="md:hidden fixed top-6 left-6 right-6 z-50 flex justify-between items-center"
      >
          <button 
              onClick={() => handleNavClick('#root')}
              className="glass w-10 h-10 flex items-center justify-center rounded-full overflow-hidden border border-white/5 hover:bg-white/10 transition-colors p-0"
          >
               <img 
                src={PROFILE_DATA.profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerText = "PK";
                }}
              />
          </button>

          <button
              onClick={() => setIsOpen(!isOpen)}
              className="glass w-10 h-10 flex items-center justify-center rounded-full text-white border border-white/5 hover:bg-white/10 transition-colors"
          >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-4 z-40 glass rounded-3xl md:hidden flex flex-col items-center justify-center p-8 mt-20 border border-white/10 bg-black/80 backdrop-blur-2xl"
            >
                <ul className="flex flex-col items-center gap-6 w-full">
                    {links.map((link, idx) => (
                        <motion.li 
                            key={link.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <button
                                onClick={() => handleNavClick(link.target)}
                                className={`text-2xl font-display font-bold ${
                                    (link.target === currentView) 
                                    ? 'text-accent' 
                                    : 'text-white/60 hover:text-white'
                                }`}
                            >
                                {link.name}
                            </button>
                        </motion.li>
                    ))}
                </ul>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 w-full max-w-xs"
                >
                    <a
                        href="mailto:pavannaidu9031@gmail.com"
                        className="flex items-center justify-center w-full px-8 py-4 bg-accent text-black rounded-full font-bold text-lg hover:scale-105 transition-transform"
                    >
                        Hire Me
                    </a>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
