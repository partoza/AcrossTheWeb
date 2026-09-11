"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    question: "How do I get started with a new project?",
    answer: "To get started, simply click on the 'Get Started' button in the navigation bar to create your workspace. From there, you can outline your project requirements, and our expert team will contact you within 24 hours to discuss the next steps."
  },
  {
    question: "What is your typical turnaround time?",
    answer: "Turnaround times vary based on the complexity of your requirements. A standard informational website or brand portfolio typically takes 2-4 weeks, while custom web applications may take 8-12 weeks. We provide a detailed timeline during the proposal phase."
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer: "Yes, we provide comprehensive ongoing support and maintenance packages. We ensure your digital presence stays updated, secure, and performs optimally long after the initial launch."
  },
  {
    question: "How does pricing work?",
    answer: "Our pricing is project-based and tailored to your specific requirements. After our initial consultation, we provide a completely transparent, itemized proposal outlining all costs associated with your digital transformation."
  },
  {
    question: "Can you redesign an existing platform?",
    answer: "Absolutely. We specialize in modernizing existing platforms. We can retain your core brand identity while completely revamping the user experience, aesthetic design, and underlying technology to meet modern standards."
  }
];

function FAQItem({ question, answer, isOpen, onClick, index }: { question: string; answer: string; isOpen: boolean; onClick: () => void; index: number }) {
  return (
    <div className="border-b border-gray-300 dark:border-gray-800">
      <button
        onClick={onClick}
        className="w-full py-6 md:py-8 flex items-center justify-between text-left focus:outline-none group cursor-pointer"
      >
        <div className="flex items-center gap-5 md:gap-8">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden sm:block">0{index + 1}</span>
          <span className="text-lg sm:text-xl lg:text-2xl font-medium text-black dark:text-white group-hover:text-gray-500 transition-colors duration-300 pr-6 leading-tight">
            {question}
          </span>
        </div>
        <div className="relative w-4 h-4 flex items-center justify-center shrink-0 text-black dark:text-white opacity-40 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute w-full h-[1.5px] bg-current transition-transform duration-500" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          <div className="absolute w-[1.5px] h-full bg-current transition-transform duration-500" style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-8 sm:pl-12 md:pl-16 text-[15px] sm:text-base font-light text-gray-500 dark:text-gray-400 leading-relaxed pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-[calc(100vh-72px)] bg-white dark:bg-[#050505] text-black dark:text-white relative overflow-hidden selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black pb-24">
      
      {/* Immersive Background Blur / Grain */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-black/5 dark:bg-white/5 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-black/5 dark:bg-white/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

      <div className="max-w-[1500px] mx-auto w-full px-6 sm:px-12 lg:px-24 pt-16 lg:pt-32 relative z-10">
        
        {/* Massive Typography Hero (Scaled down) */}
        <div className="mb-12 lg:mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-[5.5rem] leading-[1] font-medium tracking-tight"
          >
            FAQs.
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Context & Contact */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4 flex flex-col gap-8 lg:pr-8"
          >
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-5">Need more help?</h3>
              <p className="text-[15px] sm:text-base font-light text-gray-500 mb-8 leading-relaxed max-w-sm">
                Find everything you need to know about our services, pricing, and process. If you can't find your answer here, feel free to reach out.
              </p>
              
              <Link
                href="/contact"
                className="group flex items-center gap-3 text-lg sm:text-xl font-medium hover:opacity-60 transition-opacity w-fit"
              >
                Contact Support
                <div className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Naked Accordion */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 max-w-4xl w-full border-t border-gray-300 dark:border-gray-800"
          >
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index}
                index={index}
                question={faq.question} 
                answer={faq.answer} 
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
