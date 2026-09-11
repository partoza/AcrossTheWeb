"use client";
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function CartDrawer() {
  const { items, removeFromCart, isCartOpen, setIsCartOpen, totalEstimatedPrice } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const handleInquire = () => {
    if (!session) {
      setIsCartOpen(false);
      router.push('/login');
    } else {
      alert(`Inquiry Submitted for ${items.length} items! We will contact you at ${session?.user?.email}`);
    }
  };

  return (
    <Dialog.Root open={isCartOpen} onOpenChange={setIsCartOpen}>
      <AnimatePresence>
        {isCartOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-[100]" 
              />
            </Dialog.Overlay>
            
            <Dialog.Content asChild forceMount>
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="fixed right-0 top-0 bottom-0 z-[100] w-full max-w-[500px] border-l border-black/5 dark:border-white/5 bg-white dark:bg-[#050505] p-0 shadow-2xl flex flex-col"
              >
                
                <div className="flex items-center justify-between p-8 pb-4 z-10 sticky top-0 bg-white/90 dark:bg-[#050505]/90 backdrop-blur-xl border-b border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-3">
                    <Dialog.Title className="text-2xl font-medium text-black dark:text-white tracking-tight">
                      Inquiry Cart
                    </Dialog.Title>
                    <span className="bg-black/5 dark:bg-white/10 text-black dark:text-white text-[12px] font-bold px-2.5 py-1 rounded-full">
                      {items.length}
                    </span>
                  </div>
                  <Dialog.Close asChild>
                    <button className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#111] transition-colors cursor-pointer text-gray-400 hover:text-black dark:hover:text-white">
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="flex-1 overflow-y-auto overflow-x-hidden p-8 pt-4 bg-white dark:bg-[#050505] custom-scrollbar">
                  <AnimatePresence mode="popLayout">
                    {items.length === 0 ? (
                      <motion.div 
                        key="empty"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center justify-center h-full text-center text-gray-500 mt-20"
                      >
                        <div className="w-24 h-24 bg-gray-50 dark:bg-[#111] rounded-full flex items-center justify-center mb-6">
                          <ShoppingCart className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                        </div>
                        <h3 className="text-2xl font-medium text-black dark:text-white mb-2 tracking-tight">Your cart is empty</h3>
                        <p className="text-[15px] font-light text-gray-500 dark:text-[#888] mb-10 max-w-[250px] mx-auto leading-relaxed">
                          Browse our catalog and configure services to start building your inquiry.
                        </p>
                        <button 
                          onClick={() => {
                            setIsCartOpen(false);
                            router.push('/services');
                          }} 
                          className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full text-[15px] font-medium hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl cursor-pointer"
                        >
                          Explore Services
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div layout className="pb-6">
                        <AnimatePresence>
                          {items.map((item) => {
                            const validDetails = Object.entries(item.details).filter(([_, v]) => v && v !== 'no');
                            
                            return (
                              <motion.div 
                                layout
                                key={item.id} 
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, x: 20, height: 0, padding: 0 }}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                className="group relative flex py-6 border-b border-black/5 dark:border-white/5"
                              >
                                {item.image && (
                                  <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-2xl overflow-hidden bg-gray-50 dark:bg-[#111] mr-5 border border-black/5 dark:border-white/5">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                  </div>
                                )}
                                <div className="flex-1 flex flex-col justify-between py-1">
                                  <div>
                                    <div className="flex justify-between items-start mb-1">
                                      <h4 className="font-medium text-lg text-black dark:text-white leading-tight pr-6">{item.title}</h4>
                                      <button 
                                        onClick={() => removeFromCart(item.id)} 
                                        className="text-gray-300 hover:text-red-500 transition-colors cursor-pointer -mt-1 -mr-2 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30"
                                      >
                                        <X className="w-4 h-4" />
                                      </button>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-x-2 gap-y-1 mt-2 text-[13px] text-gray-500 font-light">
                                      {validDetails.map(([key, value], idx) => {
                                        const isYes = value === 'yes';
                                        const label = isYes ? key : value;
                                        return (
                                          <span key={key} className="flex items-center capitalize">
                                            {idx > 0 && <span className="mr-2 opacity-30">•</span>}
                                            {key === 'description' ? 'Custom Scope' : label}
                                          </span>
                                        );
                                      })}
                                    </div>
                                  </div>
                                  <div className="mt-4 font-semibold text-black dark:text-white tracking-tight">
                                    {`₱${item.estimatedPrice.toLocaleString()}`}
                                  </div>
                                </div>
                              </motion.div>
                            )
                          })}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {items.length > 0 && (
                    <motion.div 
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 50, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="p-8 bg-gray-50 dark:bg-[#0a0a0a] z-10 border-t border-black/5 dark:border-white/5"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Subtotal</span>
                        <span className="text-[15px] text-black dark:text-white font-medium">₱{totalEstimatedPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center mb-6 pb-6 border-b border-black/5 dark:border-white/5">
                        <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Taxes</span>
                        <span className="text-[13px] text-gray-400 font-medium">Calculated at checkout</span>
                      </div>

                      <div className="flex justify-between items-end mb-8">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Est. Total</span>
                        <span className="text-3xl font-medium tracking-tight text-black dark:text-white">
                          ₱{totalEstimatedPrice.toLocaleString()}
                        </span>
                      </div>
                      
                      <button 
                        onClick={handleInquire}
                        className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-full font-medium text-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer shadow-xl group"
                      >
                        {session ? 'Submit Inquiry' : 'Login to Inquire'}
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                      
                      {!session && (
                        <p className="text-[11px] text-center text-gray-400 mt-4 font-medium">
                          You will be asked to sign in with Google to continue.
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
