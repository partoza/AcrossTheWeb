"use client";
import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WelcomeModal() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      // Use a simple key to track if it was shown during this specific login session
      const hasSeen = sessionStorage.getItem('welcome_shown');
      if (!hasSeen) {
        setTimeout(() => setIsOpen(true), 100);
      }
    } else if (status === 'unauthenticated') {
      // The user logged out, clear the flag so it shows again on next login
      sessionStorage.removeItem('welcome_shown');
    }
  }, [status]);

  const handleClose = () => {
    sessionStorage.setItem('welcome_shown', 'true');
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/60  backdrop-blur-md z-[100]" 
              />
            </Dialog.Overlay>
            
            <Dialog.Content asChild forceMount>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20, x: '-50%' }}
                animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
                exit={{ opacity: 0, scale: 0.95, y: 20, x: '-50%' }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="fixed left-1/2 top-1/2 z-[100] w-[90%] max-w-[500px] bg-white  rounded-[2.5rem] p-1 shadow-2xl border border-black/5  overflow-hidden"
              >
                {/* Inner Content Wrapper for neat borders and gradient */}
                <div className="relative bg-white  rounded-[2.25rem] p-8 sm:p-10 overflow-hidden">
                  
                  {/* Subtle Top Gradient */}
                  <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-50  to-transparent pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-5 mb-8">
                      {/* Profile Image with Shield Badge */}
                      <div className="relative">
                        <img 
                          src={session?.user?.image || ''} 
                          alt="Profile" 
                          className="w-16 h-16 rounded-full border-2 border-white  shadow-md object-cover"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-white  rounded-full p-0.5">
                          <div className="bg-green-500 text-white rounded-full p-1 shadow-sm">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Dialog.Title className="text-2xl font-bold tracking-tight text-black ">
                          Welcome, {session?.user?.name?.split(' ')[0]}!
                        </Dialog.Title>
                        <p className="text-[13px] text-gray-500 font-medium mt-0.5">
                          {session?.user?.email}
                        </p>
                      </div>
                    </div>
                    
                    <Dialog.Description asChild>
                      <div className="space-y-4 mb-10">
                        <p className="text-[15px] font-light text-gray-600  leading-relaxed">
                          Your privacy is our priority. To ensure complete transparency, we want to guarantee that your data is safe with us:
                        </p>
                        
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                            <span className="text-[14px] text-gray-600  font-medium leading-snug">
                              <strong className="text-black ">No Cloud Storage:</strong> Your activity and personal profile are never stored.
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                            <span className="text-[14px] text-gray-600  font-medium leading-snug">
                              <strong className="text-black ">Strictly Validation:</strong> Logging in is only used to validate your email for reliable communication regarding your inquiries.
                            </span>
                          </li>
                        </ul>
                      </div>
                    </Dialog.Description>
                    
                    <div className="flex gap-3 mb-6">
                      <button 
                        onClick={handleClose}
                        className="flex-1 bg-black  text-white  py-3.5 rounded-full font-semibold text-[14px] hover:scale-[1.02] active:scale-95 transition-all shadow-md cursor-pointer"
                      >
                        I Understand
                      </button>
                    </div>

                    {/* Small Gray Brand */}
                    <div className="flex items-center justify-center gap-1.5 opacity-40 grayscale select-none pointer-events-none">
                      <img src="/AcrossTheWeb.png" alt="AcrossTheWeb" className="w-3.5 h-3.5 object-cover rounded-full" />
                      <span className="text-black  font-bold text-[11px] tracking-tight">acrosstheweb</span>
                    </div>
                  </div>
                  
                  <Dialog.Close asChild>
                    <button className="absolute top-6 right-6 text-gray-400 hover:text-black  transition-colors rounded-full p-2 hover:bg-gray-100  z-20">
                      <X className="w-5 h-5" />
                    </button>
                  </Dialog.Close>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
