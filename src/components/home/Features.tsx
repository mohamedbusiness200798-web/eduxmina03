import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, MessageSquare, TrendingUp, Calendar, Heart, PenTool } from 'lucide-react';

const features = [
  { icon: Laptop, title: "Interactive Lessons", desc: "Engaging digital tools and modern teaching methods." },
  { icon: PenTool, title: "Practical Exercises", desc: "Hands-on activities to reinforce learning quickly." },
  { icon: MessageSquare, title: "Speaking Practice", desc: "Focus on real conversation and pronunciation." },
  { icon: TrendingUp, title: "Progress Tracking", desc: "Regular assessments to monitor your improvement." },
  { icon: Heart, title: "Supportive Environment", desc: "A positive classroom atmosphere that encourages mistakes." },
  { icon: Calendar, title: "Flexible Schedule", desc: "Class times designed to fit into your busy life." },
];

export default function Features() {
  return (
    <section className="py-20 px-6 bg-transparent relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-text mb-4">
            Why Learn With EduxMina?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 rounded-3xl border border-white/50 hover:border-brand-primary/30 hover:shadow-lg transition-all group bg-white/60 backdrop-blur-md"
            >
              <div className="w-14 h-14 bg-white shadow-sm border border-slate-100 text-brand-primary rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-2 group-hover:bg-brand-primary group-hover:text-white transition-all">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-brand-text mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
