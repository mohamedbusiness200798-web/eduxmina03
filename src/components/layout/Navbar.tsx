import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Courses', href: '#courses' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="font-display font-bold text-2xl text-brand-primary flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center text-lg">E</div>
          EduxMina
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex flex-row gap-6 text-sm font-medium text-slate-600">
            {navLinks.map(link => (
              <li key={link.name}>
                <a href={link.href} className="hover:text-brand-primary transition-colors">{link.name}</a>
              </li>
            ))}
          </ul>
          <a href="#register" className="px-5 py-2.5 bg-brand-primary text-white text-sm font-medium rounded-full shadow hover:bg-opacity-90 transition-all hover:shadow-md">
            Register Now
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="md:hidden text-brand-text p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden shadow-lg absolute w-full"
          >
            <ul className="flex flex-col py-4 px-6 space-y-4 font-medium text-slate-700">
              {navLinks.map(link => (
                <li key={link.name}>
                  <a href={link.href} onClick={() => setMobileMenuOpen(false)} className="block w-full">{link.name}</a>
                </li>
              ))}
              <li className="pt-2">
                <a href="#register" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center px-5 py-3 bg-brand-primary text-white font-medium rounded-full">
                  Register Now
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
