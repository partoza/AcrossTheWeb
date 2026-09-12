"use client";
import React, { useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, ShoppingCart, ArrowRight, Check, ChevronLeft, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ReCAPTCHA from 'react-google-recaptcha';
import { getCsrfToken } from '@/lib/csrf-client';

export default function CartDrawer() {
  const { items, removeFromCart, isCartOpen, setIsCartOpen, totalEstimatedPrice, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const [isCheckingOut, setIsCheckingOut] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [captchaValue, setCaptchaValue] = React.useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  React.useEffect(() => {
    if (session && typeof window !== 'undefined') {
      const shouldReopen = localStorage.getItem('reopenCart');
      if (shouldReopen === 'true') {
        localStorage.removeItem('reopenCart');
        setIsCartOpen(true);
      }
    }
  }, [session, setIsCartOpen]);

  // Reset state when drawer closes
  React.useEffect(() => {
    if (!isCartOpen) {
      const timer = setTimeout(() => {
        setIsCheckingOut(false);
        setIsSubmitting(false);
        setCaptchaValue(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isCartOpen]);

  const handleInquire = async () => {
    if (!session) {
      localStorage.setItem('reopenCart', 'true');
      setIsCartOpen(false);
      router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
    } else {
      if (!isCheckingOut) {
        setIsCheckingOut(true);
      } else {
        if (!captchaValue) return; // Prevent submission if no captcha
        
        setIsSubmitting(true);
        try {
          const res = await fetch('/api/inquiry', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-Token': getCsrfToken(),
            },
            body: JSON.stringify({
              name: session.user?.name,
              email: session.user?.email,
              items: items,
              totalEstimatedPrice: totalEstimatedPrice,
              captchaToken: captchaValue,
            }),
          });
          
          if (!res.ok) throw new Error('Failed to send inquiry');

          setIsSubmitting(false);
          setIsCartOpen(false);
          
          setTimeout(() => {
             setSubmitStatus('success');
             if (clearCart) clearCart();
          }, 300);
        } catch (error) {
          console.error(error);
          setIsSubmitting(false);
          setIsCartOpen(false);
          
          setTimeout(() => {
             setSubmitStatus('error');
          }, 300);
        }
      }
    }
  };

  const onCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  return (
    <>
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
                      {isCheckingOut && !isSubmitting && (
                        <button 
                          onClick={() => setIsCheckingOut(false)}
                          className="rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#111] transition-colors cursor-pointer text-gray-400 hover:text-black dark:hover:text-white mr-1"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                      )}
                      <Dialog.Title className="text-2xl font-medium text-black dark:text-white tracking-tight">
                        {isCheckingOut ? 'Review Inquiry' : 'Inquiry Cart'}
                      </Dialog.Title>
                      {!isCheckingOut && (
                        <span className="bg-black/5 dark:bg-white/10 text-black dark:text-white text-[12px] font-bold px-2.5 py-1 rounded-full">
                          {items.length}
                        </span>
                      )}
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
                      ) : isCheckingOut ? (
                        <motion.div
                          key="checkout"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="pb-6 space-y-6"
                        >
                           <div className="bg-gray-50 dark:bg-[#111] p-6 rounded-2xl border border-black/5 dark:border-white/5">
                              <h4 className="text-[15px] font-medium text-black dark:text-white mb-5 tracking-tight">Contact Information</h4>
                              
                              <div className="space-y-4">
                                <div>
                                  <label className="text-[11px] text-gray-500 font-bold uppercase tracking-widest block mb-2">Sender Name</label>
                                  <div className="text-[15px] text-black dark:text-white font-medium bg-white dark:bg-[#050505] p-3.5 rounded-xl border border-black/5 dark:border-white/5 shadow-sm">
                                    {session?.user?.name || 'Valued Client'}
                                  </div>
                                </div>
                                <div>
                                  <label className="text-[11px] text-gray-500 font-bold uppercase tracking-widest block mb-2">Email Address</label>
                                  <div className="text-[15px] text-black dark:text-white font-medium bg-white dark:bg-[#050505] p-3.5 rounded-xl border border-black/5 dark:border-white/5 shadow-sm">
                                    {session?.user?.email}
                                  </div>
                                </div>
                              </div>
                           </div>
                           
                           <div className="bg-gray-50 dark:bg-[#111] p-6 rounded-2xl border border-black/5 dark:border-white/5">
                             <h4 className="text-[15px] font-medium text-black dark:text-white mb-5 tracking-tight">Quotation Summary</h4>
                             <div className="space-y-4">
                               {items.map(item => (
                                 <div key={item.id} className="flex justify-between items-start text-[14px]">
                                 <div className="pr-4 flex-1 min-w-0">
                                   <span className="text-gray-700 dark:text-gray-300 block font-medium mb-1 truncate">{item.title}</span>
                                   <span className="text-[12px] text-gray-400 block truncate">
                                      {Object.entries(item.details).filter(([_, v]) => v && v !== 'no').map(([k, v]) => v === 'yes' ? k : (k === 'description' && String(v).length > 30 ? String(v).substring(0, 30) + '...' : v)).join(' • ')}
                                   </span>
                                 </div>
                                 <span className="font-medium text-black dark:text-white whitespace-nowrap mt-0.5 shrink-0">
                                   {item.serviceId === 'custom' || item.estimatedPrice === 0 ? 'TBD' : `₱${item.estimatedPrice.toLocaleString()}`}
                                 </span>
                               </div>
                               ))}
                             </div>
                           </div>
                        </motion.div>
                      ) : (
                        <motion.div layout className="pb-6" key="cart">
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
                                        <h4 className="font-medium text-lg text-black dark:text-white leading-tight pr-6 truncate max-w-[180px] sm:max-w-[240px]" title={item.title}>{item.title}</h4>
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
                                              {idx > 0 && <span className="mr-2 opacity-30 shrink-0">•</span>}
                                              <span className="truncate max-w-[150px] sm:max-w-[200px] block" title={typeof label === 'string' ? label : ''}>
                                                {key === 'description' ? (String(value).length > 50 ? String(value).substring(0, 50) + '...' : value) : label}
                                              </span>
                                            </span>
                                          );
                                        })}
                                      </div>
                                    </div>
                                    <div className="mt-4 font-semibold text-black dark:text-white tracking-tight">
                                      {item.serviceId === 'custom' || item.estimatedPrice === 0 ? 'TBD' : `₱${item.estimatedPrice.toLocaleString()}`}
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
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Taxes</span>
                        <span className="text-[13px] text-gray-400 font-medium">Calculated at checkout</span>
                      </div>
                      <div className="flex justify-between items-center mb-6 pb-6 border-b border-black/5 dark:border-white/5">
                        <span className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Est. Total</span>
                        <span className="text-[18px] text-black dark:text-white font-medium">₱{totalEstimatedPrice.toLocaleString()}</span>
                      </div>

                      <AnimatePresence>
                        {isCheckingOut && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="flex justify-center mb-6 overflow-hidden"
                          >
                            <ReCAPTCHA
                              ref={recaptchaRef}
                              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                              onChange={onCaptchaChange}
                              theme="light"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                        
                        <button 
                          onClick={handleInquire}
                          disabled={isSubmitting || (isCheckingOut && !captchaValue)}
                          className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-full font-medium text-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer shadow-xl group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                          {!session 
                            ? 'Login to Inquire' 
                            : isCheckingOut 
                              ? (isSubmitting ? (
                                  <>
                                    Sending Quotation
                                    <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                                  </>
                                ) : 'Confirm & Submit')
                              : 'Submit Inquiry'
                          }
                          {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
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

      <Dialog.Root open={submitStatus !== 'idle'} onOpenChange={(open) => !open && setSubmitStatus('idle')}>
        <AnimatePresence>
          {submitStatus !== 'idle' && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-[110]" 
                />
              </Dialog.Overlay>
              <Dialog.Content asChild forceMount>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[110] w-full max-w-[400px] bg-white dark:bg-[#111] rounded-3xl p-8 shadow-2xl border border-black/5 dark:border-white/5 flex flex-col items-center text-center"
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${submitStatus === 'success' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                    {submitStatus === 'success' ? (
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    ) : (
                      <XCircle className="w-10 h-10 text-red-500" />
                    )}
                  </div>
                  <Dialog.Title className="text-2xl font-medium text-black dark:text-white mb-2 tracking-tight">
                    {submitStatus === 'success' ? 'Request Sent!' : 'Request Failed'}
                  </Dialog.Title>
                  <p className="text-[15px] font-light text-gray-500 dark:text-[#888] leading-relaxed mb-8">
                    {submitStatus === 'success' 
                      ? `We have received your request and will send a detailed quotation to ${session?.user?.email} shortly.`
                      : 'There was an error processing your request. Please try again later.'}
                  </p>
                  <button 
                    onClick={() => setSubmitStatus('idle')}
                    className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-full font-medium text-[15px] hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl cursor-pointer"
                  >
                    Close
                  </button>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </>
  );
}
