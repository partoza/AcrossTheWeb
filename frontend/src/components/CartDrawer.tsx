"use client";
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useSession, signIn } from 'next-auth/react';
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
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" 
              />
            </Dialog.Overlay>
            
            <Dialog.Content asChild forceMount>
              <motion.div 
                initial={{ x: '100%', opacity: 0.5 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="fixed right-0 top-0 bottom-0 z-[100] w-full max-w-[500px] border-l border-gray-200 dark:border-[#333] bg-white dark:bg-[#0a0a0a] p-0 shadow-2xl flex flex-col"
              >
                
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-[#222] p-6 bg-white dark:bg-[#0a0a0a] z-10 sticky top-0">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 dark:bg-[#111] p-2 rounded-full border border-gray-200 dark:border-[#333]">
                      <ShoppingCart className="w-5 h-5 text-black dark:text-white" />
                    </div>
                    <Dialog.Title className="text-xl font-bold text-black dark:text-white tracking-tight">
                      Inquiry Cart
                    </Dialog.Title>
                    <span className="bg-black text-white dark:bg-white dark:text-black text-[12px] font-bold px-2 py-0.5 rounded-full">
                      {items.length}
                    </span>
                  </div>
                  <Dialog.Close asChild>
                    <button className="rounded-full p-2.5 hover:bg-gray-100 dark:hover:bg-[#222] transition-colors cursor-pointer text-gray-500 hover:text-black dark:hover:text-white">
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 bg-gray-50/50 dark:bg-[#050505] custom-scrollbar">
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
                        <div className="w-24 h-24 bg-gray-100 dark:bg-[#111] rounded-full flex items-center justify-center mb-6 border border-gray-200 dark:border-[#333] shadow-sm">
                          <ShoppingCart className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-black dark:text-white mb-2 tracking-tight">Your cart is empty</h3>
                        <p className="text-[14px] text-gray-500 dark:text-[#888] mb-8 max-w-[250px] mx-auto">
                          Browse our catalog and configure services to start building your inquiry.
                        </p>
                        <button 
                          onClick={() => setIsCartOpen(false)} 
                          className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full text-[14px] font-medium hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-md cursor-pointer"
                        >
                          Browse Catalog
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div layout className="space-y-5 pb-6">
                        <AnimatePresence>
                          {items.map((item) => (
                            <motion.div 
                              layout
                              key={item.id} 
                              initial={{ opacity: 0, scale: 0.9, y: 20 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9, x: 50, height: 0, marginBottom: 0 }}
                              transition={{ type: "spring", stiffness: 400, damping: 30 }}
                              className="group relative bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                              <div className="flex flex-col sm:flex-row">
                                {item.image && (
                                  <div className="w-full sm:w-32 h-32 sm:h-auto shrink-0 bg-gray-100 dark:bg-[#0a0a0a] border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-[#333]">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                  </div>
                                )}
                                <div className="p-4 flex-1">
                                  <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-semibold text-[15px] text-black dark:text-white leading-tight pr-6">{item.title}</h4>
                                    <button 
                                      onClick={() => removeFromCart(item.id)} 
                                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-1.5 cursor-pointer bg-white/80 dark:bg-[#111]/80 backdrop-blur-sm rounded-full hover:bg-red-50 dark:hover:bg-red-950/30"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  
                                  <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
                                    {Object.entries(item.details).map(([key, value]) => {
                                      if (!value || value === 'no') return null;
                                      const isYes = value === 'yes';
                                      const label = isYes ? key : value;
                                      return (
                                        <span key={key} className="inline-flex items-center text-[11px] font-medium bg-gray-100 dark:bg-[#222] text-gray-600 dark:text-[#aaa] px-2 py-0.5 rounded-full capitalize border border-gray-200 dark:border-[#333]">
                                          {key === 'description' ? 'Custom' : label}
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="bg-gray-50 dark:bg-[#0a0a0a] px-4 py-3 flex justify-between items-center border-t border-gray-200 dark:border-[#333]">
                                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Estimated</span>
                                <span className="font-bold text-black dark:text-white text-[15px]">{`₱${item.estimatedPrice.toLocaleString()}`}</span>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {items.length > 0 && (
                    <motion.div 
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 100, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="border-t border-gray-200 dark:border-[#333] p-6 bg-white dark:bg-[#0a0a0a] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-10"
                    >
                      <div className="flex flex-col gap-1 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] text-gray-500 dark:text-[#888] font-medium">Subtotal</span>
                          <span className="text-[14px] text-gray-700 dark:text-gray-300 font-medium">₱{totalEstimatedPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] text-gray-500 dark:text-[#888] font-medium">Taxes (if applicable)</span>
                          <span className="text-[14px] text-gray-700 dark:text-gray-300 font-medium">Calculated at checkout</span>
                        </div>
                        <div className="flex justify-between items-end mt-4 pt-4 border-t border-gray-100 dark:border-[#222]">
                          <span className="text-[16px] text-black dark:text-white font-bold tracking-tight">Total Estimate</span>
                          <span className="text-3xl font-semibold text-black dark:text-white tracking-tighter">₱{totalEstimatedPrice.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={handleInquire}
                        className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-medium text-[15px] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer shadow-lg shadow-black/10 dark:shadow-white/10 group"
                      >
                        {session ? 'Submit Inquiry' : 'Login to Inquire'}
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                      
                      {!session && (
                        <p className="text-[11px] text-center text-gray-400 mt-3 font-medium">
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
