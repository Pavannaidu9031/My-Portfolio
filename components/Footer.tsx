import React from 'react';
import Section from './Section';
import { ProfileData, CursorType } from '../types';
import { useCursor } from '../context/CursorContext';
import { Github, Linkedin, Mail, Instagram, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  data: ProfileData;
}

const Footer: React.FC<FooterProps> = ({ data }) => {
  const { setCursorType } = useCursor();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Github': return <Github size={20} />;
      case 'Linkedin': return <Linkedin size={20} />;
      case 'Mail': return <Mail size={20} />;
      case 'Instagram': return <Instagram size={20} />;
      default: return null;
    }
  };

  return (
    <footer className="relative mt-20 pt-20 pb-10 border-t border-white/5 bg-black/40 backdrop-blur-xl">
      <Section id="contact" className="!py-0">
        <div className="flex flex-col items-center text-center space-y-12">
            
            <div className="max-w-2xl space-y-6">
                 <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight">
                    Let's Build <br/> The Future
                 </h2>
                 <p className="text-secondary text-lg">
                    Always open to discussing semiconductor physics, VLSI design, or full-stack web development.
                 </p>
            </div>

            <a
                href={`mailto:${data.email}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 hover:bg-accent hover:text-white transition-all duration-300"
                onMouseEnter={() => setCursorType(CursorType.BUTTON)}
                onMouseLeave={() => setCursorType(CursorType.DEFAULT)}
            >
                Start a Conversation <Mail size={20} />
            </a>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12"></div>

            <div className="flex flex-col md:flex-row justify-between items-center w-full gap-8">
                <div className="text-left space-y-1">
                     <p className="text-gray-400 text-sm">{data.location}</p>
                     <p className="text-gray-500 text-xs">{data.phone}</p>
                </div>

                <div className="flex gap-4">
                    {data.socials.map((social) => (
                        <a
                            key={social.platform}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 glass rounded-full text-gray-300 hover:text-white hover:bg-accent/20 hover:border-accent/50 transition-all duration-300"
                            onMouseEnter={() => setCursorType(CursorType.BUTTON)}
                            onMouseLeave={() => setCursorType(CursorType.DEFAULT)}
                            aria-label={social.platform}
                        >
                            {getIcon(social.icon)}
                        </a>
                    ))}
                </div>

                <div className="text-right">
                    <p className="text-gray-500 text-xs font-mono">
                        &copy; {new Date().getFullYear()} {data.name}
                    </p>
                </div>
            </div>
        </div>
      </Section>
    </footer>
  );
};

export default Footer;