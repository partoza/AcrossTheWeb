"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Monitor, ChevronDown, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useSession, signOut, signIn } from 'next-auth/react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { items, setIsCartOpen } = useCart();
  const { data: session } = useSession();

  const [activeSection, setActiveSection] = useState('who-we-are');

  useEffect(() => {
    // Set initial active section based on pathname
    if (pathname === '/services') {
      setActiveSection('services');
    } else if (pathname === '/contact') {
      setActiveSection('contact');
    } else if (pathname === '/faqs') {
      setActiveSection('faqs');
    } else {
      setActiveSection('who-we-are');
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['who-we-are', 'services', 'contact', 'faqs'];
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= 100) {
            current = section;
          }
        }
      }
      
      if (current && pathname === '/') {
        setActiveSection(current);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const navLinks = [
    { name: 'Who We Are', href: '/', id: 'who-we-are' },
    { name: 'Services', href: '/services', id: 'services' },
    { name: 'FAQ\'s', href: '/faqs', id: 'faqs' },
    { name: 'Contacts', href: '/contact', id: 'contact' },
  ];

  if (pathname === '/login') return null;

  return (
    <>
      {/* Background Mask to obscure scrolled text */}
      <div 
        className={`fixed inset-x-0 top-0 h-32 pointer-events-none z-40 transition-opacity duration-500 bg-gradient-to-b from-white  via-white/80  to-transparent ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      <nav className="fixed inset-x-0 top-6 z-50 flex justify-center w-full px-4 sm:px-6">
        <div 
          className={`relative flex flex-row items-center justify-between mx-auto rounded-full px-6 py-3.5 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled 
              ? 'w-full max-w-[1100px] bg-white  border border-black/20  shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] ' 
              : 'w-full max-w-6xl bg-white/70  border border-black/10  shadow-[0_4px_20px_rgb(0,0,0,0.04)] '
          }`}
        >
          
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2.5 z-10 shrink-0">
            <img 
              src="/AcrossTheWeb.png" 
              alt="AcrossTheWeb" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="text-black  font-bold text-xl tracking-tight font-sans block">
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
                  link.id === activeSection 
                    ? 'text-black  font-semibold' 
                    : 'text-gray-500  font-medium hover:text-black  hover:bg-gray-50 '
                }`}
              >
                {link.id === activeSection && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-gray-100  rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-4 z-10">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-1.5 text-gray-500 hover:text-black transition-colors cursor-pointer text-[15px] font-medium px-2 py-1.5 rounded-full hover:bg-gray-100"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-0.5 leading-none">
              {items.length}
            </span>
          </button>

          {session ? (
            <div className="relative hidden sm:block">
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2.5 bg-white  pl-1.5 pr-3 py-1.5 rounded-full border border-gray-200  shadow-sm hover:bg-gray-50  transition-colors cursor-pointer"
              >
                <img src={session.user?.image || ''} alt="Profile" className="w-8 h-8 rounded-full border border-gray-200 " />
                <span className="text-[13px] font-bold text-black  leading-tight">{session.user?.name?.split(' ')[0]}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white  border border-black/10  rounded-2xl p-2 shadow-2xl z-50 flex flex-col">
                  <div className="px-3 py-2.5 border-b border-black/5  mb-1 flex flex-col">
                    <span className="text-[14px] font-bold text-black ">{session.user?.name}</span>
                    <span className="text-[11px] font-medium text-gray-500 truncate">{session.user?.email}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      signOut();
                    }} 
                    className="flex items-center gap-2.5 w-full text-left px-3 py-2.5 text-[13px] font-semibold text-red-600  hover:bg-red-50  rounded-xl transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href={`/login?callbackUrl=${encodeURIComponent(pathname)}`} className="hidden sm:inline-flex items-center justify-center bg-black  text-white  px-6 py-2.5 rounded-full text-[15px] font-medium hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-sm cursor-pointer">
              Get Started
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-gray-600  p-1 rounded-full hover:bg-gray-100  transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[72px] left-4 right-4 bg-white  border border-black/10  rounded-2xl p-4 flex flex-col gap-2 shadow-xl z-40">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-[15px] font-medium py-2.5 px-4 rounded-xl ${
                link.id === activeSection 
                  ? 'bg-gray-100  text-black ' 
                  : 'text-gray-600  hover:bg-gray-50 '
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-[1px] bg-black/5 w-full my-2" />

          {session ? (
            <div className="flex flex-col gap-2">
              <div className="px-4 py-2 flex items-center gap-3">
                <img src={session.user?.image || ''} alt="Profile" className="w-8 h-8 rounded-full border border-gray-200 " />
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-black  leading-tight">{session.user?.name}</span>
                  <span className="text-[11px] font-medium text-gray-500 truncate">{session.user?.email}</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  signOut();
                }} 
                className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-[14px] font-medium text-red-600  hover:bg-red-50  rounded-xl transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          ) : (
            <Link 
              href={`/login?callbackUrl=${encodeURIComponent(pathname)}`} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center bg-black  text-white  px-4 py-3 rounded-xl text-[15px] font-medium shadow-sm"
            >
              Get Started
            </Link>
          )}
        </div>
      )}
    </nav>
    </>
  );
}
