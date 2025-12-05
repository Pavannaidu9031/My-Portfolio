import React, { useState } from 'react';
import { CursorProvider } from './context/CursorContext';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Projects from './components/Projects';
import ExperienceSection from './components/Experience';
import EducationSection from './components/Education';
import Publications from './components/Publications';
import About from './components/About';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import ChatWidget from './components/ChatWidget';
import { PROFILE_DATA } from './constants';
import { motion, AnimatePresence } from 'framer-motion';

const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-900/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[35vw] h-[35vw] bg-indigo-900/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] bg-blue-900/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
    </div>
  );
};

export type ViewState = 'home' | 'projects' | 'experience' | 'education';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  return (
    <CursorProvider>
      <div className="bg-background min-h-screen text-primary relative selection:bg-accent selection:text-black overflow-x-hidden flex flex-col">
        
        <AuroraBackground />
        <CustomCursor />
        <Navigation currentView={currentView} onViewChange={setCurrentView} />

        <main className="relative z-10 flex-grow flex flex-col">
          <AnimatePresence mode="wait">
            {currentView === 'home' ? (
              <motion.div
                key="home"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-12 md:gap-24"
              >
                <Hero data={PROFILE_DATA} />
                <About data={PROFILE_DATA} />
                <Publications publications={PROFILE_DATA.publications} />
              </motion.div>
            ) : currentView === 'projects' ? (
              <motion.div
                key="projects"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="pt-24"
              >
                <Projects projects={PROFILE_DATA.projects} onBack={() => setCurrentView('home')} />
              </motion.div>
            ) : currentView === 'experience' ? (
              <motion.div
                key="experience"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="pt-24"
              >
                <ExperienceSection experience={PROFILE_DATA.experience} onBack={() => setCurrentView('home')} />
              </motion.div>
            ) : (
              <motion.div
                key="education"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="pt-24"
              >
                <EducationSection education={PROFILE_DATA.education} onBack={() => setCurrentView('home')} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer data={PROFILE_DATA} />
        <ChatWidget />
      </div>
    </CursorProvider>
  );
};

export default App;