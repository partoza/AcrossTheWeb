"use client";
import React from 'react';
import { signIn } from 'next-auth/react';
import { ArrowLeft, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="min-h-[calc(100vh+72px)] -mt-[72px] flex w-full bg-white dark:bg-[#050505]">
      {/* Left Side (Dark/Premium) */}
      <div className="hidden lg:flex flex-col justify-between w-[55%] bg-black text-white p-12 relative overflow-hidden selection:bg-white/20">
        
        {/* Dynamic Abstract Background Elements */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/10 to-transparent rounded-full blur-[100px] pointer-events-none" />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Massive White Logo Graphic */}
        <motion.div 
          initial={{ opacity: 0, x: 150, rotate: -15 }}
          animate={{ opacity: 1, x: 0, rotate: -35 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute top-[-15%] right-[-45%] pointer-events-none"
        >
          <img src="/AcrossTheWeb.png" alt="Massive Abstract Shape" className="w-[1200px] h-[1200px] object-contain filter invert opacity-100 drop-shadow-2xl" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <Link href="/" className="flex items-center gap-3 w-max group">
            <div className="bg-white p-1.5 rounded-lg group-hover:scale-105 transition-transform">
              <img src="/AcrossTheWeb.png" alt="Across The Web Logo" className="w-6 h-6 object-contain" />
            </div>
            <span className="font-bold text-[22px] tracking-tight">Across The Web</span>
          </Link>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-xl mt-auto mb-20"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[13px] font-medium text-gray-300 mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            Premium Digital Services
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-[64px] font-bold tracking-tighter leading-[1.05] mb-6">
            Your digital <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
              presence, elevated.
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-gray-400 text-[17px] leading-relaxed mb-10 max-w-md">
            Sign in to your Across The Web workspace to request quotes, manage your digital portfolio, and track your ongoing projects with our team of experts.
          </motion.p>

          <motion.div variants={itemVariants} className="flex gap-6 mb-12">
            <div className="flex items-center gap-2">
              <div className="bg-white/10 p-2 rounded-full">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-300">Secure Auth</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-white/10 p-2 rounded-full">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-300">Fast Setup</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="relative z-10 flex justify-between items-end"
        >
          <div className="text-[13px] text-gray-500 font-medium">
            &copy; {new Date().getFullYear()} Across The Web. All rights reserved.
          </div>
          <div className="flex -space-x-2">
            <img src="https://i.pravatar.cc/100?img=33" className="w-8 h-8 rounded-full border-2 border-black" alt="User" />
            <img src="https://i.pravatar.cc/100?img=47" className="w-8 h-8 rounded-full border-2 border-black" alt="User" />
            <img src="https://i.pravatar.cc/100?img=12" className="w-8 h-8 rounded-full border-2 border-black" alt="User" />
            <div className="w-8 h-8 rounded-full border-2 border-black bg-white/10 backdrop-blur-md flex items-center justify-center text-[10px] font-bold text-white">
              +2k
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side (Light/Interactive) */}
      <div className="flex flex-col justify-center w-full lg:w-[45%] bg-white dark:bg-[#0a0a0a] px-8 sm:px-16 md:px-20 relative">
        {/* Mobile Header */}
        <div className="absolute top-8 left-8 right-8 flex lg:hidden justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-black dark:bg-white p-1.5 rounded-lg">
              <img src="/AcrossTheWeb.png" alt="Logo" className="w-5 h-5 object-contain filter invert dark:invert-0" />
            </div>
            <span className="font-bold text-[18px] tracking-tight text-black dark:text-white">Across The Web</span>
          </Link>
        </div>


        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-[420px] mx-auto"
        >
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-black dark:text-white tracking-tight mb-3">
              Welcome back
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed">
              Sign in to your account to continue configuring services and managing your digital presence.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="relative w-full group flex items-center justify-center gap-3 bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] text-black dark:text-white px-6 py-4 rounded-2xl font-semibold text-[15px] hover:border-gray-300 dark:hover:border-[#555] hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5 active:scale-[0.98] transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/50 dark:via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <svg viewBox="0 0 24 24" className="w-5 h-5 relative z-10" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="relative z-10">Continue with Google</span>
            </button>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-100 dark:border-[#222] text-center">
            <p className="text-[13px] text-gray-500 dark:text-gray-400">
              By continuing, you agree to our{' '}
              <a href="#" className="text-black dark:text-white font-semibold hover:underline decoration-gray-300 underline-offset-4">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-black dark:text-white font-semibold hover:underline decoration-gray-300 underline-offset-4">Privacy Policy</a>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
