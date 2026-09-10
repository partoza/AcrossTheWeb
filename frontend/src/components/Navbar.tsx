"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Monitor } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Who We Are', href: '#who-we-are', active: true },
    { name: 'Services', href: '#services', active: false },
    { name: 'Products & Guides', href: '#products', active: false },
    { name: 'Support & Contact', href: '#support-contact', active: false },
  ];

  return (
    <>
      {/* Background Mask to obscure scrolled text */}
      <div 
        className={`fixed inset-x-0 top-0 h-32 pointer-events-none z-40 transition-opacity duration-500 bg-gradient-to-b from-white dark:from-[#0a0a0a] via-white/80 dark:via-[#0a0a0a]/80 to-transparent ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      <nav className="fixed inset-x-0 top-6 z-50 flex justify-center w-full px-4 sm:px-6">
        <div 
          className={`relative flex flex-row items-center justify-between mx-auto rounded-full px-6 py-3.5 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled 
              ? 'w-full max-w-[1100px] bg-white dark:bg-[#111111] border border-black/20 dark:border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]' 
              : 'w-full max-w-6xl bg-white/70 dark:bg-[#111111]/70 border border-black/10 dark:border-white/10 shadow-[0_4px_20px_rgb(0,0,0,0.04)] dark:shadow-none'
          }`}
        >
          
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2.5 z-10 shrink-0">
            <img 
              src="/AcrossTheWeb.png" 
              alt="AcrossTheWeb" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="text-black dark:text-white font-bold text-xl tracking-tight font-sans hidden sm:block">
              acrosstheweb
            </div>
          </Link>

          {/* Center: Desktop Links */}
          <div className="hidden lg:flex flex-1 flex-row items-center justify-center px-4">
            <div className="flex space-x-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`relative px-4 py-2.5 text-[15px] transition-colors rounded-full ${
                  link.active 
                    ? 'text-black dark:text-white font-semibold bg-gray-100 dark:bg-neutral-800' 
                    : 'text-gray-500 dark:text-gray-400 font-medium hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-neutral-800/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 z-10">
          <button className="hidden sm:flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer text-[15px] font-medium px-2 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800">
            <ShoppingCart className="w-5 h-5" />
            <span className="bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-0.5 leading-none">
              0
            </span>
          </button>

          <button className="bg-black dark:bg-[#f4f4f5] text-white dark:text-black px-6 py-2.5 rounded-full text-[15px] font-semibold hover:opacity-90 hover:scale-[0.98] active:scale-95 transition-all duration-300 shadow-sm">
            Get Started
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-gray-600 dark:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[72px] left-4 right-4 bg-white dark:bg-[#161616] border border-black/10 dark:border-white/10 rounded-2xl p-4 flex flex-col gap-2 shadow-xl z-40">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-[15px] font-medium py-2.5 px-4 rounded-xl ${
                link.active 
                  ? 'bg-gray-100 dark:bg-neutral-800 text-black dark:text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-neutral-800/50'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-[1px] bg-black/5 dark:bg-white/5 w-full my-2" />
          <button className="flex items-center justify-between text-gray-600 dark:text-gray-300 py-2.5 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-neutral-800/50 w-full text-left font-medium">
            Cart
            <span className="bg-[#0d9488] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">0</span>
          </button>
        </div>
      )}
    </nav>
    </>
  );
}
