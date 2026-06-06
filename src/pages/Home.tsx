import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AcademyBackground from '../components/layout/AcademyBackground';
import About from '../components/home/About';
import Courses from '../components/home/Courses';
import Features from '../components/home/Features';
import Benefits from '../components/home/Benefits';
import Registration from '../components/home/Registration';
import Testimonials from '../components/home/Testimonials';
import Instagram from '../components/home/Instagram';
import FAQ from '../components/home/FAQ';

export default function Home() {
  return (
    <div className="relative text-brand-text min-h-screen flex flex-col font-sans selection:bg-brand-primary/20">
      <AcademyBackground />
      <Navbar />
      <main className="flex-1 relative z-10 pt-20 lg:pt-28">
        <About />
        <Courses />
        <Features />
        <Benefits />
        <Registration />
        <Testimonials />
        <Instagram />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
