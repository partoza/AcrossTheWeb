"use client";

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-white dark:bg-[#050505] text-black dark:text-white relative overflow-hidden selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black pb-24">
      
      {/* Immersive Background Blur / Grain */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-black/5 dark:bg-white/5 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-black/5 dark:bg-white/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

      <div className="max-w-[1500px] mx-auto w-full px-6 sm:px-12 lg:px-24 pt-16 lg:pt-32 relative z-10">
        
        {/* Hero Typography */}
        <div className="mb-16 lg:mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-[1] font-medium tracking-tight"
          >
            Let's talk.
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start">
          
          {/* Left Column: Clear Contact Info */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4 flex flex-col gap-10 lg:pr-8"
          >
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Drop us a line</h3>
              <a href="mailto:hello@acrosstheweb.app" className="text-lg font-medium hover:text-gray-500 transition-colors duration-300">
                hello@acrosstheweb.app
              </a>
            </div>
            
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Call us directly</h3>
              <a href="tel:+15551234567" className="text-lg font-medium hover:text-gray-500 transition-colors duration-300">
                +1 (555) 123-4567
              </a>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Visit our office</h3>
              <p className="text-lg font-medium text-black dark:text-white">
                123 Digital Way,<br />Tech District, NY
              </p>
            </div>
          </motion.div>

          {/* Right Column: Usable Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 lg:col-start-5 max-w-2xl w-full"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              
              <div className="relative group">
                <label htmlFor="name" className="text-[13px] font-semibold text-gray-900 dark:text-gray-100 mb-2 block">
                  First & Last Name
                </label>
                <input 
                  id="name" 
                  required 
                  className="w-full bg-transparent border-b border-gray-300 dark:border-gray-800 py-3 text-[16px] focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder:text-gray-400"
                  placeholder="John Doe"
                />
              </div>

              <div className="relative group">
                <label htmlFor="email" className="text-[13px] font-semibold text-gray-900 dark:text-gray-100 mb-2 block">
                  Email Address
                </label>
                <input 
                  id="email" 
                  type="email" 
                  required 
                  className="w-full bg-transparent border-b border-gray-300 dark:border-gray-800 py-3 text-[16px] focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder:text-gray-400"
                  placeholder="john@example.com"
                />
              </div>

              <div className="relative group">
                <label htmlFor="message" className="text-[13px] font-semibold text-gray-900 dark:text-gray-100 mb-2 block">
                  Message
                </label>
                <textarea 
                  id="message" 
                  required 
                  rows={4}
                  className="w-full resize-none bg-transparent border-b border-gray-300 dark:border-gray-800 py-3 text-[16px] focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder:text-gray-400"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || submitted}
                className="mt-4 flex items-center justify-center gap-3 bg-black dark:bg-white text-white dark:text-black px-8 py-3.5 rounded-full text-[14px] font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto self-start disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : submitted ? (
                  <span className="text-green-400 dark:text-green-600">Message sent!</span>
                ) : (
                  <>
                    Send Message
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
