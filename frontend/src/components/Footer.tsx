"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  if (pathname === '/login') {
    return null;
  }

  return (
    <footer className="w-full bg-white  border-t border-gray-100  py-20 px-6 md:px-12 xl:px-24">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 xl:gap-24">
        
        {/* Column 1: Brand & Copyright */}
        <div className="flex flex-col">
          <Link href="/" className="flex items-center gap-2.5 mb-8 shrink-0">
            <img 
              src="/AcrossTheWeb.png" 
              alt="AcrossTheWeb" 
              className="w-8 h-8 rounded-full object-cover" 
            />
            <span className="text-black  font-bold text-xl tracking-tight font-sans">
              acrosstheweb
            </span>
          </Link>
          <p className="text-[#888] text-[13px] font-medium leading-relaxed">
            &copy; 2026 Across The Web. All rights reserved.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="font-bold text-black  text-[16px] mb-10 h-5 flex items-center">Quick Links</h3>
          <ul className="space-y-5 text-[15px] font-medium text-[#888]">
            <li><Link href="/#about" className="hover:text-black  transition-colors">Who We Are</Link></li>
            <li><Link href="/services" className="hover:text-black  transition-colors">Services</Link></li>
            <li><Link href="/faqs" className="hover:text-black  transition-colors">FAQ's</Link></li>
            <li><Link href="/contact" className="hover:text-black  transition-colors">Contacts</Link></li>
          </ul>
        </div>

        {/* Column 3: Legal */}
        <div>
          <h3 className="font-bold text-black  text-[16px] mb-10 h-5 flex items-center">Legal</h3>
          <ul className="space-y-5 text-[15px] font-medium text-[#888]">
            <li><Link href="/legal?tab=privacy" className="hover:text-black  transition-colors">Privacy Policy</Link></li>
            <li><Link href="/legal?tab=terms" className="hover:text-black  transition-colors">Terms & Condition</Link></li>
          </ul>
        </div>

        {/* Column 4: Need Help? */}
        <div>
          <h3 className="font-bold text-black  text-[16px] mb-10 h-5 flex items-center">Need Help?</h3>
          <a href="mailto:acrosstheweb2026@gmail.com" className="block text-[15px] font-medium text-[#888] hover:text-black  transition-colors mb-6">
            acrosstheweb2026@gmail.com
          </a>
          <div className="flex items-center gap-4 text-[#888]">
            <a href="#" className="hover:text-black  transition-colors" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a href="#" className="hover:text-black  transition-colors" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
