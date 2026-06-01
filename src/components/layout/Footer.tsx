import React from 'react';
import { useCMS } from '../../contexts/CMSContext';

export default function Footer() {
  const { content } = useCMS();
  
  return (
    <footer className="bg-white/80 backdrop-blur-md text-brand-text pt-20 pb-10 px-6 mt-auto border-t border-white/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 mb-16 border-b border-slate-200/60 pb-16">
        
        <div className="md:w-1/3">
          <a href="#" className="font-display font-bold text-2xl flex items-center gap-2 mb-6 text-brand-primary">
            <div className="w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center text-lg">E</div>
            EduxMina
          </a>
          <p className="text-slate-600 text-sm leading-relaxed max-w-xs mb-8">
            "{content.footerQuote}"
          </p>
          <div className="flex items-center gap-4">
            <a href={content.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-bg text-brand-text hover:bg-brand-primary hover:text-white flex items-center justify-center transition-colors shadow-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
        </div>

        <div className="flex gap-16 md:w-2/3 justify-end md:justify-around">
          <div>
            <h4 className="font-bold mb-6 text-brand-text tracking-wider text-sm uppercase">Navigation</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><a href="#" className="hover:text-brand-primary transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-brand-primary transition-colors">About</a></li>
              <li><a href="#courses" className="hover:text-brand-primary transition-colors">Courses</a></li>
              <li><a href="#register" className="hover:text-brand-primary transition-colors">Registration</a></li>
              <li><a href="#faq" className="hover:text-brand-primary transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-brand-text tracking-wider text-sm uppercase">Contact</h4>
            <ul className="space-y-4 text-sm text-slate-600 max-w-[200px]">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 shrink-0 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                {content.contactLocation}
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 shrink-0 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Instagram: @eduxmina
              </li>
            </ul>
          </div>
        </div>
        
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-xs text-slate-500">
        <div>© {new Date().getFullYear()} EduxMina | Miss Amina. All rights reserved.</div>
      </div>
    </footer>
  );
}
