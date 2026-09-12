"use client";

import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ReCAPTCHA from 'react-google-recaptcha';
import { getCsrfToken } from '@/lib/csrf-client';

export default function ContactPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const draft = localStorage.getItem('contactDraftMessage');
    if (draft) {
      setTimeout(() => setMessage(draft), 0);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      // Save draft message if any
      if (message) {
        localStorage.setItem('contactDraftMessage', message);
      }
      router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    
    if (!captchaValue) {
      alert("Please complete the CAPTCHA verification.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': getCsrfToken(),
        },
        body: JSON.stringify({
          name: session.user?.name || name,
          email: session.user?.email || email,
          message,
          captchaToken: captchaValue,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitted(true);
      setMessage('');
      localStorage.removeItem('contactDraftMessage');
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error(error);
      alert('There was an error sending your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="-mt-[72px] min-h-screen bg-white  text-black  relative overflow-hidden selection:bg-black selection:text-white   pb-24">
      
      {/* Immersive Background Blur / Grain */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-black/5  rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-black/5  rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

      {/* Full Width Hero Image */}
      <div className="w-full h-[25vh] sm:h-[30vh] lg:h-[35vh] relative mb-8 lg:mb-16 select-none pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
          alt="Team collaborating" 
          className="w-full h-full object-cover object-[center_25%] grayscale opacity-90 "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent  " />
      </div>

      <div className="max-w-[1500px] mx-auto w-full px-6 sm:px-12 lg:px-24 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start pt-12">
          
          {/* Left Column: Header & Contact Info */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-10 lg:pr-8"
          >
            {/* Hero Typography */}
            <h1 className="text-[4rem] sm:text-[5rem] lg:text-[5.5rem] leading-[1] font-medium tracking-tight mb-2 whitespace-nowrap">
              Let's talk.
            </h1>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Drop us a line</h3>
              <a href="mailto:acrosstheweb2026@gmail.com" className="text-lg font-medium hover:text-gray-500 transition-colors duration-300">
                acrosstheweb2026@gmail.com
              </a>
            </div>
            
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Call us directly</h3>
              <a href="tel:09610970735" className="text-lg font-medium hover:text-gray-500 transition-colors duration-300">
                09610970735
              </a>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Visit our office</h3>
              <p className="text-lg font-medium text-black ">
                Davao City,<br />Philippines
              </p>
            </div>
          </motion.div>

          {/* Right Column: Usable Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 lg:col-start-6 max-w-2xl w-full pt-4 lg:pt-8"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              
              <div className="flex flex-col md:flex-row gap-8 w-full">
                <div className="relative group flex-1">
                  <label htmlFor="name" className="text-[15px] font-semibold text-gray-900  mb-2 block">
                    First & Last Name
                  </label>
                  <input 
                    id="name" 
                    value={session ? session.user?.name || '' : name}
                    onChange={(e) => !session && setName(e.target.value)}
                    readOnly={!!session}
                    placeholder={session ? '' : 'John Doe'}
                    required
                    className={`w-full bg-transparent border-b border-gray-200  py-3 text-[16px] focus:outline-none transition-colors ${session ? 'text-gray-400  cursor-not-allowed select-none' : 'text-black  focus:border-black '}`}
                  />
                </div>

                <div className="relative group flex-1">
                  <label htmlFor="email" className="text-[15px] font-semibold text-gray-900  mb-2 block">
                    Email Address
                  </label>
                  <input 
                    id="email" 
                    type="email" 
                    value={session ? session.user?.email || '' : email}
                    onChange={(e) => !session && setEmail(e.target.value)}
                    readOnly={!!session}
                    placeholder={session ? '' : 'john@example.com'}
                    required
                    className={`w-full bg-transparent border-b border-gray-200  py-3 text-[16px] focus:outline-none transition-colors ${session ? 'text-gray-400  cursor-not-allowed select-none' : 'text-black  focus:border-black '}`}
                  />
                </div>
              </div>

              <div className="relative group">
                <label htmlFor="message" className="text-[15px] font-semibold text-gray-900  mb-2 block">
                  Message
                </label>
                <textarea 
                  id="message" 
                  required 
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    localStorage.setItem('contactDraftMessage', e.target.value);
                  }}
                  className="w-full resize-none bg-transparent border-b border-gray-300  py-3 text-[16px] focus:outline-none focus:border-black  transition-colors placeholder:text-gray-400"
                  placeholder="Tell us about your project..."
                />
                {!session && (
                  <p className="mt-3 text-[13px] text-gray-500 font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80"></span>
                    You will be prompted to log in to verify your identity before sending.
                  </p>
                )}
              </div>

              {session && (
                <div className="mt-2">
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                    onChange={(val) => setCaptchaValue(val)}
                    theme="light"
                  />
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting || submitted || (!!session && !captchaValue)}
                className="mt-4 flex items-center justify-center gap-3 bg-black  text-white  px-8 py-3.5 rounded-full text-[14px] font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto self-start cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30  border-t-white  rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : submitted ? (
                  <span className="text-green-400 ">Message sent!</span>
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
