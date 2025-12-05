
import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { CursorType } from '../types';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

const CustomCursor: React.FC = () => {
  const { cursorType } = useCursor();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const particles = useRef<Particle[]>([]);
  const cursorRef = useRef({ x: 0, y: 0 });
  const lastCursorRef = useRef({ x: 0, y: 0 });
  
  // Framer Motion for the main leader cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  
  // Rotate the main cursor based on movement
  const rotate = useTransform(smoothX, (current) => {
     const velocity = current - (smoothX.getPrevious() || 0);
     return velocity * 2;
  });

  const [isMobile, setIsMobile] = useState(false);

  // Theme colors for stars
  const colors = ['#38bdf8', '#818cf8', '#ffffff', '#c084fc'];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Track mouse
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', moveCursor);

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Interpolate to fill gaps if mouse moves fast
      const dx = cursorRef.current.x - lastCursorRef.current.x;
      const dy = cursorRef.current.y - lastCursorRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Spawn particles
      if (dist > 2) {
        const steps = Math.min(dist / 5, 10); // Limit steps for performance
        for (let i = 0; i < steps; i++) {
            const t = i / steps;
            const x = lastCursorRef.current.x + dx * t;
            const y = lastCursorRef.current.y + dy * t;
            
            // Random chance to spawn a star
            if (Math.random() > 0.5) {
                particles.current.push({
                    x: x + (Math.random() - 0.5) * 10,
                    y: y + (Math.random() - 0.5) * 10,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5 + 0.5, // Slight fall
                    life: 1,
                    size: Math.random() * 3 + 1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    rotation: Math.random() * 360,
                    rotationSpeed: (Math.random() - 0.5) * 5
                });
            }
        }
      }
      
      lastCursorRef.current = { ...cursorRef.current };

      // Update and Draw particles
      particles.current.forEach((p, index) => {
        p.life -= 0.02; // Fade speed
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.life <= 0) {
          particles.current.splice(index, 1);
        } else {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          
          // Draw Star Shape
          ctx.beginPath();
          const spikes = 4;
          const outerRadius = p.size;
          const innerRadius = p.size / 2;
          for(let i=0; i<spikes*2; i++){
            const r = (i % 2 === 0) ? outerRadius : innerRadius;
            const angle = (Math.PI / spikes) * i;
            ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
          }
          ctx.closePath();
          ctx.fill();
          
          // Optional Glow
          ctx.shadowBlur = 5;
          ctx.shadowColor = p.color;
          
          ctx.restore();
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(requestRef.current);
    };
  }, [isMobile, cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 pointer-events-none z-50 w-full h-full"
      />
      
      {/* Main Cursor - The "Head" of the comet */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[60] mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          rotate: rotate,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
          {/* Default Star Shape */}
          <motion.div
            animate={{
               scale: cursorType === CursorType.HOVER ? 1.5 : 1,
               rotate: cursorType === CursorType.HOVER ? 45 : 0,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative flex items-center justify-center"
          >
              <div className="absolute w-1 h-6 bg-white rounded-full"></div>
              <div className="absolute w-6 h-1 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-accent rounded-full blur-[2px]"></div>
          </motion.div>

          {/* Ring for button interaction */}
          <motion.div 
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/50"
             animate={{
                width: cursorType === CursorType.BUTTON ? 40 : 0,
                height: cursorType === CursorType.BUTTON ? 40 : 0,
                opacity: cursorType === CursorType.BUTTON ? 1 : 0,
             }}
          />
      </motion.div>
    </>
  );
};

export default CustomCursor;
    