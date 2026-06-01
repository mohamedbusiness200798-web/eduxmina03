import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Mic, Rocket, Globe, GraduationCap, Award } from 'lucide-react';

const benefits = [
  { title: "Build Confidence", icon: Award, color: "text-brand-accent", bg: "bg-brand-accent/10" },
  { title: "Improve Speaking", icon: Mic, color: "text-brand-primary", bg: "bg-brand-primary/10" },
  { title: "Learn Faster", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { title: "Real Communication Skills", icon: Globe, color: "text-green-500", bg: "bg-green-500/10" },
  { title: "Better Academic Results", icon: GraduationCap, color: "text-purple-500", bg: "bg-purple-500/10" },
  { title: "International Opportunities", icon: Rocket, color: "text-pink-500", bg: "bg-pink-500/10" },
];

export default function Benefits() {
  return (
    <section className="py-20 px-6 bg-transparent relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-text mb-4">
            Student Benefits
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            What you will achieve by joining our English programs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
          {benefits.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/60 backdrop-blur-md border border-white/50 p-6 rounded-3xl flex flex-col items-center text-center hover:bg-white transition-colors shadow-sm hover:shadow-md"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${item.bg} ${item.color}`}>
                <item.icon size={28} />
              </div>
              <h3 className="font-medium text-brand-text">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
