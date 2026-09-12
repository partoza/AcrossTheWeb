"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Database, ServerOff } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const PrivacyIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
  </svg>
)

const TermsIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z" clipRule="evenodd" />
    <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
  </svg>
)

function LegalPageContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'terms' ? 'terms' : 'privacy';
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  return (
    <div className="min-h-[calc(100vh-72px)] bg-white dark:bg-[#050505] text-black dark:text-white relative overflow-hidden selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-black/5 dark:bg-white/5 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-black/5 dark:bg-white/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

      <div className="max-w-[1000px] mx-auto w-full px-6 sm:px-12 lg:px-24 pt-16 lg:pt-24 pb-24 relative z-10">
        
        {/* Branding Header */}
        <div className="flex flex-col items-center justify-center mb-16">

          <h1 className="text-5xl sm:text-7xl font-medium tracking-tight mb-6 text-center">
            Legal & Privacy
          </h1>
          <p className="text-[17px] sm:text-[19px] font-light text-gray-500 max-w-2xl text-center leading-relaxed">
            We believe in complete transparency. Our policies are written to be easily understood, prioritizing your privacy and data security above all.
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="flex items-center justify-center mb-16 relative z-20">
          <div className="bg-gray-100/50 dark:bg-neutral-900/50 p-1.5 rounded-full inline-flex border border-gray-200/50 dark:border-white/10 backdrop-blur-xl">
            {['privacy', 'terms'].map((tab) => {
              const isActive = activeTab === tab;
              const isPrivacy = tab === 'privacy';
              const Icon = isPrivacy ? PrivacyIcon : TermsIcon;
              
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative flex items-center justify-center px-7 py-3 rounded-full text-[14px] font-semibold transition-colors duration-300 outline-none ${
                    isActive 
                      ? 'text-black dark:text-white' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="legal-tab-pill"
                      className="absolute inset-0 bg-white dark:bg-[#222] rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-black/5 dark:border-white/5"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2.5">
                    <Icon className="w-[18px] h-[18px]" />
                    {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTab === 'privacy' ? (
              <motion.div
                key="privacy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="max-w-[760px] mx-auto"
              >
                
                <p className="text-[20px] sm:text-[22px] font-light leading-[1.8] text-gray-600 dark:text-gray-400 mb-16">
                  At Across The Web, we believe the best way to secure your data is to not collect it in the first place. When you browse our website, we do not track your activity, use analytics cookies, or monitor your behavior. We have explicitly disabled user analytics to provide a completely private browsing experience.
                </p>

                <div className="space-y-16">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-medium text-black dark:text-white mb-6 flex items-baseline gap-4 tracking-tight">
                      <span className="text-[13px] font-bold text-gray-300 dark:text-gray-700 uppercase tracking-widest">01</span>
                      How We Use Authentication
                    </h2>
                    <p className="text-[17px] sm:text-[19px] font-light leading-[1.8] text-gray-600 dark:text-gray-400">
                      Our Google Sign-In integration is utilized strictly as an anti-spam and identity verification measure. When you authenticate, we simply read your email address from your Google profile to ensure that any service inquiries you submit are attached to a valid, reachable email address. 
                      <span className="block mt-4 font-medium text-black dark:text-white">
                        We do not save your Google profile, name, or email address in any cloud storage or database.
                      </span>
                      The information exists only temporarily in your browser session.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-medium text-black dark:text-white mb-6 flex items-baseline gap-4 tracking-tight">
                      <span className="text-[13px] font-bold text-gray-300 dark:text-gray-700 uppercase tracking-widest">02</span>
                      Inquiries and Communications
                    </h2>
                    <p className="text-[17px] sm:text-[19px] font-light leading-[1.8] text-gray-600 dark:text-gray-400">
                      If you submit an inquiry for our digital services, the details of your inquiry will be securely emailed directly to our team. Once the email is dispatched, no trace of the submission is kept on our servers.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-medium text-black dark:text-white mb-6 flex items-baseline gap-4 tracking-tight">
                      <span className="text-[13px] font-bold text-gray-300 dark:text-gray-700 uppercase tracking-widest">03</span>
                      Third-Party Services
                    </h2>
                    <p className="text-[17px] sm:text-[19px] font-light leading-[1.8] text-gray-600 dark:text-gray-400">
                      We do not share, sell, or distribute any information to third parties. Our platform is self-contained and prioritizes zero-knowledge architecture wherever possible.
                    </p>
                  </div>
                </div>
                
                <div className="mt-20 pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col gap-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="text-[12px] font-medium text-gray-400 uppercase tracking-widest">
                      Last Updated &mdash; September 2026
                    </div>
                    <small className="text-[11px] font-medium text-gray-400">
                      &copy; {new Date().getFullYear()} Across The Web. All rights reserved.
                    </small>
                  </div>
                  <Link href="/" className="flex items-center gap-2 self-start hover:opacity-80 transition-opacity">
                    <img 
                      src="/AcrossTheWeb.png" 
                      alt="AcrossTheWeb Logo" 
                      className="w-5 h-5 rounded-full object-cover filter grayscale opacity-70"
                    />
                    <span className="text-[17px] font-bold tracking-tight lowercase text-gray-500 dark:text-gray-400">
                      acrosstheweb
                    </span>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="terms"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="max-w-[760px] mx-auto"
              >
                <div className="space-y-16">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-medium text-black dark:text-white mb-6 flex items-baseline gap-4 tracking-tight">
                      <span className="text-[13px] font-bold text-gray-300 dark:text-gray-700 uppercase tracking-widest">01</span>
                      Acceptance of Terms
                    </h2>
                    <p className="text-[17px] sm:text-[19px] font-light leading-[1.8] text-gray-600 dark:text-gray-400">
                      By accessing and using Across The Web's platform and digital services, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-medium text-black dark:text-white mb-6 flex items-baseline gap-4 tracking-tight">
                      <span className="text-[13px] font-bold text-gray-300 dark:text-gray-700 uppercase tracking-widest">02</span>
                      Service Commissions & Inquiries
                    </h2>
                    <p className="text-[17px] sm:text-[19px] font-light leading-[1.8] text-gray-600 dark:text-gray-400">
                      The estimates provided through our platform's cart calculator are preliminary and subject to final review. Submitting an inquiry does not constitute a binding contract. A formal agreement and final quotation will be provided after we review your specific requirements.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-medium text-black dark:text-white mb-6 flex items-baseline gap-4 tracking-tight">
                      <span className="text-[13px] font-bold text-gray-300 dark:text-gray-700 uppercase tracking-widest">03</span>
                      Disclaimer of Warranties
                    </h2>
                    <p className="text-[17px] sm:text-[19px] font-light leading-[1.8] text-gray-600 dark:text-gray-400">
                      Our services and platform are provided on an "as is" and "as available" basis. Across The Web makes no warranties, expressed or implied, and hereby disclaims all warranties, including without limitation, implied warranties or conditions of merchantability or fitness for a particular purpose.
                    </p>
                  </div>
                </div>

                <div className="mt-20 pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col gap-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="text-[12px] font-medium text-gray-400 uppercase tracking-widest">
                      Last Updated &mdash; September 2026
                    </div>
                    <small className="text-[11px] font-medium text-gray-400">
                      &copy; {new Date().getFullYear()} Across The Web. All rights reserved.
                    </small>
                  </div>
                  <Link href="/" className="flex items-center gap-2 self-start hover:opacity-80 transition-opacity">
                    <img 
                      src="/AcrossTheWeb.png" 
                      alt="AcrossTheWeb Logo" 
                      className="w-5 h-5 rounded-full object-cover filter grayscale opacity-70"
                    />
                    <span className="text-[17px] font-bold tracking-tight lowercase text-gray-500 dark:text-gray-400">
                      acrosstheweb
                    </span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function LegalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-[#050505]" />}>
      <LegalPageContent />
    </Suspense>
  );
}
