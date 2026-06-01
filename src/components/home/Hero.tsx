import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '../../contexts/CMSContext';
import { Sparkles, Star, CheckCircle, GraduationCap } from 'lucide-react';

export default function Hero() {
  const { content } = useCMS();

  return (
    <section className="relative px-6 py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
        
        {/* Left Side: Premium Text & CTAs */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-secondary/30 text-brand-primary font-medium text-sm mb-6 border border-brand-primary/10 backdrop-blur-sm"
          >
            <Sparkles size={16} />
            <span>Premium International Academy</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-text leading-[1.1] mb-6"
          >
            {content.heroTitle}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans"
          >
            {content.heroSubtitle}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <a href="#register" className="w-full sm:w-auto px-8 py-4 bg-brand-primary text-white font-semibold rounded-full shadow-lg shadow-brand-primary/30 hover:bg-opacity-90 transition-all hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-2">
              Start Learning Now
            </a>
            <a href="#courses" className="w-full sm:w-auto px-8 py-4 bg-white/50 backdrop-blur-sm text-brand-text border border-slate-200 font-semibold rounded-full hover:bg-white transition-all shadow-sm">
              Explore Programs
            </a>
          </motion.div>
          
          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm font-medium text-slate-500"
          >
             <div className="flex items-center gap-2">
               <CheckCircle size={18} className="text-brand-primary" />
               <span>Expert Teachers</span>
             </div>
             <div className="flex items-center gap-2">
               <Star size={18} className="text-brand-accent fill-brand-accent" />
               <span>5.0 Rated</span>
             </div>
          </motion.div>
        </div>
        
        {/* Right Side: Visual Centerpiece */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          className="flex-1 w-full max-w-lg lg:max-w-none relative"
        >
          {/* Main Hero Container with Glassmorphism */}
          <div className="relative rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-white/60 p-4 shadow-2xl aspect-[4/3]">
             {/* Vibrant Glowing Orbs behind the image */}
             <div className="absolute top-10 -left-10 w-32 h-32 bg-brand-primary/30 rounded-full blur-2xl"></div>
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-accent/20 rounded-full blur-2xl"></div>
             
             {/* The Image Itself */}
             <div className="w-full h-full rounded-[2rem] relative overflow-hidden z-10 shadow-inner">
               <img src={content.aboutImage || "/miss-amina.jpg"} alt="Miss Amina" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
               
               {/* Fallback */}
               <div className="absolute inset-0 bg-slate-50 flex flex-col items-center justify-center text-slate-400 -z-10">
                  <span className="font-medium text-center px-4">Image placeholder<br/>miss-amina.jpg</span>
               </div>
             </div>
             
             {/* Floating Premium Badges */}
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-8 -right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 flex flex-col items-center gap-1 z-20"
             >
               <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-1">
                 <GraduationCap size={24} />
               </div>
               <span className="font-bold text-slate-800">100%</span>
               <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Success</span>
             </motion.div>
             
             <motion.div 
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute bottom-10 -left-10 bg-white/90 backdrop-blur-md py-3 px-5 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3 z-20"
             >
               <div className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               <div>
                 <div className="font-bold text-brand-text">Certified</div>
                 <div className="text-xs text-slate-500 font-medium">Native Approach</div>
               </div>
             </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
