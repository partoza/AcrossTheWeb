"use client";
import React from 'react';
import { signIn } from 'next-auth/react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh+72px)] -mt-[72px] flex w-full bg-white dark:bg-[#050505]">
      
      {/* Left Side (Black/Brand Area) */}
      <div className="flex w-full lg:w-1/2 bg-[#050505] text-white flex-col justify-between p-8 lg:p-12 xl:p-16 relative overflow-hidden selection:bg-white/20 min-h-[calc(100vh+72px)] lg:min-h-0">
        
        {/* Background Image with Dark Blend */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/login-bg.png" 
            alt="Background" 
            className="w-full h-full object-cover object-center opacity-40 grayscale"
          />
          {/* Gradient Overlays to smoothly fade the image into the black background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/10 via-[#050505]/30 to-[#050505]"></div>
        </div>

        {/* Top Header */}
        <div className="relative z-10 flex items-center gap-2 md:gap-3">
          <img src="/AcrossTheWeb.png" alt="Logo" className="w-5 h-5 md:w-6 md:h-6 object-contain filter invert" />
          <span className="font-semibold text-[20px] md:text-2xl tracking-tight lowercase">acrosstheweb</span>
        </div>

        {/* Center Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 mt-12 lg:mt-auto mb-0 lg:mb-24 shrink-0"
        >
          <h1 className="text-[36px] sm:text-[44px] xl:text-[56px] 2xl:text-[64px] font-medium tracking-tight leading-[1.05] mb-6 max-w-[800px]">
            Your digital presence, elevated.
          </h1>
          <p className="hidden lg:block text-[#a1a1a1] text-[15px] leading-relaxed mb-10 max-w-[440px]">
            Sign in to your Across The Web workspace to manage your digital portfolio, update your professional details, and track your ongoing projects.
          </p>
          <Link href="/" className="hidden lg:inline-flex items-center text-[13px] font-medium text-white hover:text-gray-300 active:scale-95 transition-all duration-200 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
            Back to Home
          </Link>
        </motion.div>

        {/* Mobile Login Section (Hidden on Desktop) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col lg:hidden w-full max-w-[400px] z-10 mt-8 mb-auto"
        >
          <h2 className="text-[26px] font-medium text-white tracking-tight mb-2">
            Ready to get started?
          </h2>
          <p className="text-gray-400 text-[14px] leading-relaxed mb-6">
            Sign in with your Google account to access your workspace.
          </p>
          
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="relative w-full group flex items-center justify-center gap-3 bg-white/10 border border-white/20 text-white px-6 py-4 rounded-[14px] font-medium text-[14px] hover:bg-white/20 active:scale-[0.98] transition-all duration-200 cursor-pointer backdrop-blur-md shadow-lg"
          >
            <div className="bg-white rounded-full p-0.5">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            </div>
            <span>Continue with Google</span>
          </button>
          
          <div className="mt-6 flex flex-col items-center gap-6">
            <p className="text-[12px] text-gray-500 text-center">
              By continuing, you agree to our{' '}
              <a href="#" className="text-gray-400 hover:text-white font-medium hover:underline underline-offset-4 cursor-pointer">Terms</a>
              {' '}and{' '}
              <a href="#" className="text-gray-400 hover:text-white font-medium hover:underline underline-offset-4 cursor-pointer">Privacy Policy</a>.
            </p>
            <Link href="/" className="inline-flex items-center text-[13px] font-medium text-gray-400 hover:text-white active:scale-95 transition-all duration-200 group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
              Back to Home
            </Link>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-10 w-full text-center"
        >
          <div className="text-[12px] text-[#666] font-medium">
            &copy; {new Date().getFullYear()} Across The Web. All rights reserved.
          </div>
        </motion.div>
      </div>

      {/* Right Side (White/Login Area) */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center bg-white dark:bg-[#0a0a0a] px-8 sm:px-16 xl:px-32 relative">
        
        {/* Mobile Header */}
        <div className="absolute top-8 left-8 right-8 flex lg:hidden justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <img src="/AcrossTheWeb.png" alt="Logo" className="w-5 h-5 object-contain filter invert dark:invert-0" />
            <span className="font-semibold text-[20px] tracking-tight lowercase text-black dark:text-white">acrosstheweb</span>
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-[400px] mx-auto"
        >
          <div className="mb-8">
            <h2 className="text-[36px] font-medium text-black dark:text-white tracking-tight mb-3">
              Ready to get started?
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-[14px] leading-relaxed">
              Sign in with your Google account to access your workspace. No additional passwords needed.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="relative w-full group flex items-center justify-center gap-3 bg-black dark:bg-white text-white dark:text-black px-6 py-4 rounded-[14px] font-medium text-[14px] hover:shadow-xl hover:shadow-black/10 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <div className="bg-white rounded-full p-0.5">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              </div>
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="mt-12 text-center">
            <p className="text-[13px] text-gray-500 dark:text-gray-400">
              By continuing, you agree to our{' '}
              <a href="#" className="text-black dark:text-white font-medium hover:underline underline-offset-4 cursor-pointer">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-black dark:text-white font-medium hover:underline underline-offset-4 cursor-pointer">Privacy Policy</a>.
            </p>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
