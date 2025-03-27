'use client';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import { Features } from '@/components/features';
import { Workflow } from '@/components/workflow';
import { Testimonials } from '@/components/testimonials';
import { Screenshots } from '@/components/screenshots';
import { FAQ } from '@/components/faq';
import { Footer } from '@/components/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-slate-900">
      <Navbar />
      <Hero />
      <Features />
      <Screenshots />
      <Workflow />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
