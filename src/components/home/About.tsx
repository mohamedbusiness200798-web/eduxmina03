import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Award, Users, BookOpen } from 'lucide-react';
import { useCMS } from '../../contexts/CMSContext';

export default function About() {
  const { content } = useCMS();

  return (
    <section id="about" className="py-16 px-6 relative overflow-hidden">
      {/* Container */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
          
           <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-5/12 relative max-w-md mx-auto"
          >
            <div className="aspect-square bg-gradient-to-br from-brand-secondary/30 to-brand-primary/10 rounded-3xl relative overflow-hidden flex items-center justify-center p-6">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/20 rounded-bl-[100px]"></div>
               <div className="absolute bottom-12 left-12 w-24 h-24 bg-brand-primary/20 rounded-full blur-xl"></div>

               <div className="grid grid-cols-2 gap-4 w-full max-w-[240px] aspect-square relative z-10">
                 <div className="bg-white rounded-2xl p-5 shadow-md transform -rotate-3 hover:rotate-0 transition-transform flex flex-col items-center justify-center">
                   <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 mb-3 text-xl font-bold">Aa</div>
                   <div className="h-1.5 w-12 bg-slate-200 rounded-full mb-2"></div>
                   <div className="h-1.5 w-8 bg-slate-200 rounded-full"></div>
                 </div>
                 <div className="bg-brand-primary rounded-2xl p-5 shadow-md transform translate-y-6 rotate-2 hover:rotate-0 transition-transform text-white flex flex-col items-center justify-center">
                   <div className="text-2xl font-display font-bold mb-1">A+</div>
                   <div className="text-xs opacity-90">Progress</div>
                 </div>
                 <div className="bg-brand-accent rounded-2xl p-5 shadow-md transform -translate-y-4 -rotate-2 hover:rotate-0 transition-transform flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                 </div>
                 <div className="bg-white rounded-2xl p-5 shadow-md transform rotate-3 hover:rotate-0 transition-transform flex flex-col">
                   <div className="flex gap-1 mb-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                     <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                     <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                   </div>
                   <div className="flex-1 bg-slate-100 rounded mt-1 border-t border-l border-white shadow-inner flex items-center justify-center text-slate-400 text-[10px]">Video call</div>
                 </div>
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 lg:pt-4"
          >
            <div className="inline-block px-4 py-1.5 bg-brand-primary/10 text-brand-primary font-medium rounded-full text-sm mb-6">
              About The Teacher
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-text mb-6">
              {content.aboutTitle}
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {content.aboutText}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:border-brand-primary/20 hover:shadow-md">
                <div className="w-12 h-12 bg-brand-bg rounded-xl text-brand-primary flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-text mb-1">Location</h4>
                  <p className="text-sm text-slate-600">{content.contactLocation}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:border-brand-accent/30 hover:shadow-md">
                <div className="w-12 h-12 bg-brand-bg rounded-xl text-brand-accent flex items-center justify-center shrink-0">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-text mb-1">Student Focus</h4>
                  <p className="text-sm text-slate-600">Personalized success paths</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:border-blue-300 hover:shadow-md sm:col-span-2">
                <div className="w-12 h-12 bg-brand-bg rounded-xl text-blue-500 flex items-center justify-center shrink-0">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-text mb-1">Interactive Learning</h4>
                  <p className="text-sm text-slate-600">Engaging lessons and practical learning methods for real-world application.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
