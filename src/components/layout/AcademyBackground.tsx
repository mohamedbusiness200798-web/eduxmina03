import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, GraduationCap, Globe, MessageCircle, PenTool, Lightbulb, Compass, Award } from 'lucide-react';

export default function AcademyBackground() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -250]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#F4F9FF]">
      {/* Soft Elegant Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F4F9FF] via-[#EEF6FF] to-[#EAF4FF] opacity-90" />
      
      {/* Parallax Glowing Orbs */}
      <motion.div style={{ y: y1 }} className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#3B82F6]/10 rounded-full blur-[140px] mix-blend-multiply" />
      <motion.div style={{ y: y2 }} className="absolute top-[40%] right-[-10%] w-[40%] h-[40%] bg-[#FBBF24]/10 rounded-full blur-[130px] mix-blend-multiply" />
      <motion.div style={{ y: y3 }} className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] bg-[#EAF4FF]/80 rounded-full blur-[150px] mix-blend-multiply" />

      {/* Subtle World Map Pattern (Very Faint) */}
      <div className="absolute inset-0 opacity-[0.02]" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 500'%3E%3Cpath fill='%233B82F6' d='M200 100c-10 20-30 30-50 20-10-5-10-15-5-25 5-10 15-15 25-10 10 5 15 15 10 25zM700 150c-20 30-60 40-90 20-15-10-20-30-10-45 10-15 30-20 45-10 20 10 25 25 15 35zM500 300c-30 40-90 50-130 20-25-20-30-50-10-75 20-25 50-30 75-10 30 20 40 45 25 65z'/%3E%3C/svg%3E")`,
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             backgroundRepeat: 'no-repeat'
           }} 
      />

      {/* Floating Elements Collection */}
      <div className="absolute inset-0 max-w-[100vw] overflow-hidden pointer-events-none">
        
        {/* Abstract Glassmorphism Geometric Shapes */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute top-[15%] right-[5%] w-64 h-64 border border-[#3B82F6]/10 rounded-3xl backdrop-blur-3xl opacity-40 -rotate-12"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] left-[5%] w-80 h-80 border border-[#FBBF24]/10 rounded-full backdrop-blur-2xl opacity-30"
        />

        {/* Floating Typography (Premium Educational Words) */}
        <motion.div style={{ y: y1 }} className="absolute top-[20%] left-[12%] opacity-10">
          <span className="text-4xl font-display font-bold text-[#3B82F6]">Learn</span>
        </motion.div>
        <motion.div style={{ y: y2 }} className="absolute top-[35%] right-[18%] opacity-[0.07]">
          <span className="text-5xl font-display font-medium text-[#1E293B]">Fluent</span>
        </motion.div>
        <motion.div style={{ y: y3 }} className="absolute bottom-[40%] left-[8%] opacity-[0.08]">
          <span className="text-3xl font-display font-semibold text-[#FBBF24]">Grow</span>
        </motion.div>
        <motion.div style={{ y: y1 }} className="absolute bottom-[25%] right-[12%] opacity-[0.06]">
          <span className="text-6xl font-display font-bold text-[#3B82F6]">Success</span>
        </motion.div>
        <motion.div style={{ y: y2 }} className="absolute top-[60%] left-[25%] opacity-[0.05]">
          <span className="text-4xl font-sans font-bold text-[#1E293B]">Confidence</span>
        </motion.div>
        <motion.div style={{ y: y3 }} className="absolute top-[15%] right-[30%] opacity-[0.08]">
          <span className="text-3xl font-serif italic text-[#3B82F6]">Speak</span>
        </motion.div>

        {/* Educational Icons with Gentle Float */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[25%] left-[8%] opacity-20 text-[#3B82F6]"
        >
          <BookOpen size={40} strokeWidth={1} />
        </motion.div>

        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }} 
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-[18%] right-[12%] opacity-20 text-[#1E293B]"
        >
          <GraduationCap size={48} strokeWidth={1} />
        </motion.div>

        <motion.div 
          animate={{ y: [0, -30, 0], rotate: [5, -10, 5] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          className="absolute top-[45%] right-[8%] opacity-15 text-[#3B82F6]"
        >
          <Globe size={56} strokeWidth={1} />
        </motion.div>

        <motion.div 
          animate={{ y: [0, -20, 0] }} 
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[30%] left-[10%] opacity-20 text-[#FBBF24]"
        >
          <Lightbulb size={40} strokeWidth={1} />
        </motion.div>

      </div>
    </div>
  );
}
