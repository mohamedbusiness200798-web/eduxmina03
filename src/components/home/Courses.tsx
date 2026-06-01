import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useCMS } from '../../contexts/CMSContext';

export default function Courses() {
  const { courses } = useCMS();

  return (
    <section id="courses" className="py-20 px-6 bg-transparent relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-brand-secondary/20 text-brand-primary font-medium rounded-full text-sm mb-4">
            Educational Programs
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-text mb-4">
            Find The Right Course For You
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Comprehensive English courses designed for different age groups and proficiency levels to help you achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <motion.div 
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col h-full group"
            >
              <div className="mb-6 flex-1">
                <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-brand-text mb-4 leading-tight">{course.title}</h3>
                
                <ul className="space-y-3">
                  {course.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 shrink-0 p-1 block bg-brand-primary/10 rounded-full text-brand-primary">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-sm text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-6 border-t border-slate-100">
                <a href={`#register?course=${course.id}`} className="block w-full py-3 text-center rounded-xl bg-brand-bg text-brand-primary font-medium hover:bg-brand-primary hover:text-white transition-colors">
                  Choose Course
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
