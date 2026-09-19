"use client";

import React, { useState } from 'react';
import { Code, Video, Briefcase, DraftingCompass, CheckCircle, Star, Search, ArrowUpRight, X, AlertCircle } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type RexDirection = 'center' | 'up' | 'up-right' | 'right' | 'down-right' | 'down' | 'down-left' | 'left' | 'up-left';

const rexPortraits: Record<RexDirection, string> = {
  center: '/images/rex/center.png',
  up: '/images/rex/up.png',
  'up-right': '/images/rex/up-right.png',
  right: '/images/rex/right.png',
  'down-right': '/images/rex/down-right.png',
  down: '/images/rex/down.png',
  'down-left': '/images/rex/down-left.png',
  left: '/images/rex/left.png',
  'up-left': '/images/rex/up-left.png',
};

function RexDirectionalPortrait() {
  const portraitRef = React.useRef<HTMLDivElement>(null);
  const frameRef = React.useRef<number | null>(null);
  const [direction, setDirection] = useState<RexDirection>('center');
  const [displayedDirection, setDisplayedDirection] = useState<RexDirection>('center');
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    Object.values(rexPortraits).forEach((src) => {
      const image = new Image();
      image.src = src;
    });

    const updateDirection = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;

      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        const rect = portraitRef.current?.getBoundingClientRect();
        if (!rect) return;

        const deltaX = event.clientX - (rect.left + rect.width / 2);
        const deltaY = event.clientY - (rect.top + rect.height / 2);
        const centerRadius = Math.max(18, rect.width * 0.18);

        if (Math.hypot(deltaX, deltaY) < centerRadius) {
          setDirection('center');
          return;
        }

        const directions: Exclude<RexDirection, 'center'>[] = [
          'right', 'down-right', 'down', 'down-left',
          'left', 'up-left', 'up', 'up-right',
        ];
        const angle = Math.atan2(deltaY, deltaX);
        const sector = Math.round(angle / (Math.PI / 4));
        const index = (sector + 8) % 8;
        setDirection(directions[index]);
      });
    };

    const resetDirection = () => setDirection('center');
    window.addEventListener('pointermove', updateDirection, { passive: true });
    document.documentElement.addEventListener('mouseleave', resetDirection);

    return () => {
      window.removeEventListener('pointermove', updateDirection);
      document.documentElement.removeEventListener('mouseleave', resetDirection);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div ref={portraitRef} className="relative h-full w-full overflow-hidden" aria-label="John Rex Partoza">
      <img
        src={rexPortraits[displayedDirection]}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <AnimatePresence initial={false}>
        {direction !== displayedDirection && (
        <motion.img
          key={direction}
          src={rexPortraits[direction]}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.14, ease: 'easeOut' }}
          onAnimationComplete={() => setDisplayedDirection(direction)}
        />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LandingPage() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const [unavailableMember, setUnavailableMember] = useState<{name: string, role: string} | null>(null);

  React.useEffect(() => {
    let animationFrameId: number;
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      // Use requestAnimationFrame for perfectly smooth 60fps updates
      animationFrameId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const centerOffset = rect.top - window.innerHeight / 2;
        // Apply directly to the DOM to bypass React render cycle
        sectionRef.current.style.setProperty('--scroll-offset', `${centerOffset}px`);
      });
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white  text-black  antialiased font-sans flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 sm:px-8 md:px-12 overflow-hidden flex flex-col items-center">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-12 items-center w-full">
          
          {/* Left Side: Content */}
          <div className="flex flex-col items-start text-left">
            <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-6 px-3 py-1 rounded-full border border-black/5  bg-gray-50 ">
              All-In-One Digital Services & Skills Hub
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-[4.5rem] leading-[1.1] md:leading-[1.05] font-medium tracking-tighter text-gray-900  mb-6">
              Scale Your Online Operations
            </h1>
            <p className="text-[17px] md:text-[19px] text-gray-500  font-medium leading-snug mb-10 max-w-xl">
              Your hassle-free digital platform for expert web creation, video post-production, architectural layouts, administrative support, and downloadable training materials.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
              <a href="/services" className="bg-black  text-white  px-7 py-3.5 rounded-full text-[14px] sm:text-[15px] font-semibold shadow-xl shadow-black/10  transition-all duration-300 hover:scale-[0.98] active:scale-95 text-center w-full sm:w-auto">
                Explore Services
              </a>
              <a href="#products" className="bg-transparent border border-black/20  text-gray-900  px-7 py-3.5 rounded-full text-[14px] sm:text-[15px] font-medium transition-all duration-300 hover:bg-black/5  hover:scale-[0.98] active:scale-95 text-center w-full sm:w-auto">
                Free Training E-Books
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 w-full border-t border-black/5  pt-12">
              {[
                { stat: "500+", label: "Projects Completed" },
                { stat: "98%", label: "Client Satisfaction" },
                { stat: "10+", label: "Service Scopes" },
                { stat: "1,200+", label: "Free Downloads" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-start">
                  <span className="text-[32px] md:text-[36px] leading-tight font-medium tracking-tight text-black ">{item.stat}</span>
                  <span className="text-[12px] sm:text-[13px] text-gray-500  font-medium leading-relaxed">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Bento Grid Cards */}
          <div className="w-full hidden md:grid grid-cols-2 gap-4 lg:gap-6 relative">
            <div className="flex flex-col gap-4 lg:gap-6 pt-12">
               {/* Card 1: Web Landing Page */}
               <div className="bg-white  p-4 rounded-[28px] border border-black/5  shadow-sm hover:-translate-y-1 transition-transform duration-500">
                  <div className="w-full h-36 sm:h-40 mb-5 rounded-[20px] bg-gray-50  overflow-hidden flex items-center justify-center border border-black/5 ">
                     <img src="/hero-service/webdev.png" alt="Web Landing Page" className="w-full h-full object-cover" />
                  </div>
                  <div className="px-2 pb-2">
                     <h3 className="text-[18px] sm:text-[19px] font-bold text-gray-900  mb-1.5 tracking-tight">Web Landing Page</h3>
                     <p className="text-[11px] sm:text-[12px] text-gray-400  font-bold uppercase tracking-wider">High-converting layouts</p>
                  </div>
               </div>

               {/* Card 3: Architecture & CAD */}
               <div className="bg-white  p-4 rounded-[28px] border border-black/5  shadow-sm hover:-translate-y-1 transition-transform duration-500">
                  <div className="w-full h-36 sm:h-40 mb-5 rounded-[20px] bg-gray-50  overflow-hidden flex items-center justify-center border border-black/5 ">
                     <img src="/hero-service/cad.png" alt="Architecture CAD" className="w-full h-full object-cover" />
                  </div>
                  <div className="px-2 pb-2">
                     <h3 className="text-[18px] sm:text-[19px] font-bold text-gray-900  mb-1.5 tracking-tight">Architecture & CAD</h3>
                     <p className="text-[11px] sm:text-[12px] text-gray-400  font-bold uppercase tracking-wider">Precision 2D/3D Plans</p>
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-4 lg:gap-6 pb-12">
               {/* Card 2: Video Editing */}
               <div className="bg-white  p-4 rounded-[28px] border border-black/5  shadow-sm hover:-translate-y-1 transition-transform duration-500">
                  <div className="w-full h-36 sm:h-40 mb-5 rounded-[20px] bg-gray-50  overflow-hidden flex items-center justify-center border border-black/5 ">
                     <img src="/hero-service/vid-edit.png" alt="Video Editing" className="w-full h-full object-cover" />
                  </div>
                  <div className="px-2 pb-2">
                     <h3 className="text-[18px] sm:text-[19px] font-bold text-gray-900  mb-1.5 tracking-tight">Video Editing Reels</h3>
                     <p className="text-[11px] sm:text-[12px] text-gray-400  font-bold uppercase tracking-wider">Social Cuts & Corporate</p>
                  </div>
               </div>

               {/* Card 4: Virtual Assistant */}
               <div className="bg-white  p-4 rounded-[28px] border border-black/5  shadow-sm hover:-translate-y-1 transition-transform duration-500">
                  <div className="w-full h-36 sm:h-40 mb-5 rounded-[20px] bg-gray-50  overflow-hidden flex items-center justify-center border border-black/5 ">
                     <img src="/hero-service/va.png" alt="Virtual Assistant" className="w-full h-full object-cover" />
                  </div>
                  <div className="px-2 pb-2">
                     <h3 className="text-[18px] sm:text-[19px] font-bold text-gray-900  mb-1.5 tracking-tight">Virtual Assistant</h3>
                     <p className="text-[11px] sm:text-[12px] text-gray-400  font-bold uppercase tracking-wider">Executive Support</p>
                  </div>
               </div>
            </div>
            
            {/* Decorative background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gray-200/50  rounded-full blur-3xl -z-10 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section ref={sectionRef} id="who-we-are" className="py-24 lg:py-40 px-6 sm:px-8 md:px-12 bg-white  border-y border-gray-200  relative overflow-hidden">
        {/* Abstract Background Element (Slight Parallax) */}
        <div 
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-100 via-transparent to-transparent  opacity-50 -z-10 pointer-events-none will-change-transform" 
          style={{ transform: 'translateY(calc(var(--scroll-offset, 0px) * 0.15))' }}
        />
        
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col xl:flex-row justify-between items-start mb-24 xl:mb-32 gap-12 relative">
            <div 
              className="xl:w-7/12 relative z-10 will-change-transform"
              style={{ transform: 'translateY(calc(var(--scroll-offset, 0px) * 0.06))' }}
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-black  animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400">Who We Are</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] leading-[1.05] font-medium tracking-tight text-black  mb-6">
                Bridging Skill <br/>
                <span className="text-gray-300  italic font-serif">Acquisition</span><br/>
                & Digital <br/>
                <span className="text-gray-300  italic font-serif">Empowerment.</span>
              </h2>
            </div>
            
            <div 
              className="xl:w-4/12 xl:pt-16 relative z-10 will-change-transform"
              style={{ transform: 'translateY(calc(var(--scroll-offset, 0px) * -0.04))' }}
            >
               <p className="text-lg sm:text-xl lg:text-[22px] font-light text-gray-700  leading-snug">
                 We connect learners, entrepreneurs, and businesses worldwide with affordable, elite digital expertise and actionable educational resources.
               </p>
               {/* Heavy Parallax on Watermark */}
               <div 
                 className="mt-12 opacity-10  pointer-events-none will-change-transform origin-center"
                 style={{ transform: 'translateY(calc(var(--scroll-offset, 0px) * -0.15)) rotate(calc(var(--scroll-offset, 0px) * 0.05deg))' }}
               >
                  <img src="/AcrossTheWeb.png" alt="Logo watermark" className="w-24 h-24 object-contain filter grayscale invert " />
               </div>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-10 lg:gap-16 mb-24 lg:mb-32">
             {/* Mission (Scrolls slightly down) */}
             <div 
               className="md:col-span-7 flex flex-col gap-5 group will-change-transform"
               style={{ transform: 'translateY(calc(var(--scroll-offset, 0px) * 0.08))' }}
             >
                <div className="border-t-2 border-black  pt-6 transition-all duration-500 group-hover:pt-8">
                  <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-black  mb-5 flex items-center gap-4">
                    01 <span className="w-6 h-[1px] bg-black  inline-block"></span> Our Mission
                  </h3>
                  <p className="text-lg sm:text-xl lg:text-[22px] font-light text-gray-500  leading-snug group-hover:text-black  transition-colors duration-500">
                    To provide a hassle-free digital platform for everyone wanting to learn basic to complex digital skills, deliver high-quality online and offline digital services at minimal costs, offer accessible training materials, and empower individuals to build sustainable digital income.
                  </p>
                </div>
             </div>
             
             {/* Vision (Scrolls slightly up) */}
             <div 
               className="md:col-span-5 md:mt-24 flex flex-col gap-5 group will-change-transform"
               style={{ transform: 'translateY(calc(var(--scroll-offset, 0px) * -0.08))' }}
             >
                <div className="border-t-2 border-gray-200  pt-6 transition-all duration-500 group-hover:pt-8 group-hover:border-gray-400">
                  <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-5 flex items-center gap-4">
                    02 <span className="w-6 h-[1px] bg-gray-400 inline-block"></span> Our Vision
                  </h3>
                  <p className="text-lg sm:text-xl lg:text-[22px] font-light text-gray-900  leading-snug">
                    To become the premier, all-in-one digital hub connecting global learners, freelancing talents, and scaling businesses to top-tier technical expertise, streamlined workflows, and transformative learning guides.
                  </p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section id="services-preview" className="py-24 lg:py-40 px-6 sm:px-8 md:px-12 bg-gray-50  relative z-10 border-b border-gray-200 ">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 lg:mb-24 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-black  inline-block" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500">Sneak Peek</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1] font-medium tracking-tighter text-black ">
                Our Core Services.
              </h2>
            </div>
            <p className="text-lg sm:text-xl text-gray-500 font-light max-w-sm pb-1 leading-snug">
              A quick look at how we can help you grow. From web development to executive VA support.
            </p>
          </div>

          {/* Cinematic Interactive Cards */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
            {[
              {
                title: "Web Design & Development",
                desc: "Custom, responsive websites engineered to convert and scale your digital presence.",
                image: "/services/webdevelopment.png"
              },
              {
                title: "Video Editing & Reels",
                desc: "Engaging social media Reels and YouTube edits crafted for maximum audience retention.",
                image: "/services/videoediting.png"
              },
              {
                title: "Graphic Design & Branding",
                desc: "Stunning logos, pitch decks, and brand books that communicate your unique identity.",
                image: "/services/graphicdesign.png"
              }
            ].map((service, i) => (
              <div key={i} className="group relative w-full h-[400px] lg:h-[500px] rounded-[2rem] overflow-hidden cursor-pointer transform-gpu will-change-transform shadow-lg ">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75 text-white scale-75 group-hover:scale-100">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-3">{service.title}</h3>
                  <p className="text-white/70 font-light text-[15px] leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 h-0 group-hover:h-auto overflow-hidden">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button at Bottom */}
          <div className="flex justify-center mt-16">
            <a href="/services" className="group inline-flex items-center gap-4 bg-black  text-white  px-10 py-4 rounded-full text-[15px] font-medium hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl shadow-black/10 ">
              View Full Catalog
              <div className="w-8 h-8 rounded-full bg-white/20  flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* The Core Team Section */}
      <section id="team" className="py-24 lg:py-40 px-6 sm:px-8 md:px-12 bg-white  relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Our People</h3>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1] font-medium tracking-tighter text-black ">
                The Core Team.
              </h2>
            </div>
            <p className="text-lg sm:text-xl text-gray-500 font-light max-w-sm pb-1 leading-snug">
              Passionate specialists dedicated to your digital growth.
            </p>
          </div>

          <div className="flex flex-col border-b border-gray-200 ">
            {[
              { name: "Gina Sasedor", role: "Founder", quote: "We built this so nobody has to choose between learning a skill and getting paid for one.", initial: "GS", image: "/images/gina.png" },
              { name: "John Rex Partoza", role: "Lead Web Developer", quote: "Every guide we publish is something we've actually used with a real client first.", initial: "JP", image: "/images/rex/center.png", directionalPortrait: true, portfolio: "https://partoza.dev" },
              { name: "Kenneth Crismas", role: "Web Designer", quote: "Hassle-free isn't a slogan here — it's how fast we respond to your first message.", initial: "KC" },
              { name: "Hannah May Alinsonorin", role: "HR Head", quote: "Empowering remote talent by placing them where their skills shine brightest.", initial: "HA", image: "/images/hannah.png" },
            ].map((member, i) => (
              <div key={i} className="group flex flex-col lg:flex-row lg:items-center py-8 lg:py-12 border-t border-gray-200  hover:bg-gray-50  transition-colors duration-500 -mx-6 px-6 sm:-mx-8 sm:px-8 md:-mx-12 md:px-12 cursor-pointer">
                
                <div className="flex items-center gap-6 lg:w-5/12 xl:w-1/3 mb-6 lg:mb-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden bg-gray-100  shrink-0 border border-black/5  group-hover:scale-105 transition-transform duration-500">
                    {member.directionalPortrait ? (
                      <RexDirectionalPortrait />
                    ) : member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-all duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl font-light text-gray-400">
                        {member.initial}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-medium text-black  tracking-tight mb-1 group-hover:translate-x-2 transition-transform duration-500">{member.name}</h4>
                    <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 group-hover:translate-x-2 transition-transform duration-500 delay-75">{member.role}</div>
                  </div>
                </div>

                <div className="lg:w-7/12 xl:w-2/3 lg:pl-12 xl:pl-24 flex flex-col sm:flex-row sm:items-center justify-between gap-6 lg:gap-8">
                  <p className="text-lg sm:text-xl lg:text-2xl font-light text-gray-500  leading-relaxed italic font-serif flex-1">
                    "{member.quote}"
                  </p>
                  
                  <a 
                    href={member.portfolio || "#"} 
                    target={member.portfolio ? "_blank" : undefined}
                    rel={member.portfolio ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 text-black group/btn shrink-0 sm:mt-0 mt-2" 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!member.portfolio) {
                        e.preventDefault();
                        setUnavailableMember({ name: member.name, role: member.role });
                      }
                    }}
                  >
                    <span className="text-[15px] sm:text-[17px] font-medium group-hover/btn:opacity-70 transition-opacity">View Portfolio</span>
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0 group-hover/btn:scale-105 transition-transform duration-300">
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </a>
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 md:py-32 px-6 sm:px-8 md:px-12 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-4 mb-16">
              <span className="w-12 h-[1px] bg-gray-200 inline-block" />
              <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Trusted By</h3>
              <span className="w-12 h-[1px] bg-gray-200 inline-block" />
            </div>
            <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 lg:gap-40 w-full px-4">
              {[
                { name: "Market Reach", src: "/company/MRI Logo (1).png", link: "https://marketreach.global" },
                { name: "Shalom Center Davao", src: "/company/SHALOM.png", link: "https://shalomcenterdavao.com/" },
                { name: "Ideas Beyond Limits", src: "/company/ibl.png", link: "https://ideasbeyondlimits.com" },
              ].map((company, i) => (
                <a 
                  key={i} 
                  href={company.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block transition-transform duration-500 hover:scale-105"
                >
                  <img 
                    src={company.src} 
                    alt={company.name} 
                    className="h-10 sm:h-14 md:h-16 lg:h-20 object-contain drop-shadow-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300" 
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Not Available Modal */}
      {unavailableMember && (
        <Dialog.Root open={true} onOpenChange={(open) => !open && setUnavailableMember(null)}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
            <Dialog.Content className="fixed left-[50%] top-[50%] z-[100] w-[90vw] max-w-md translate-x-[-50%] translate-y-[-50%] bg-white shadow-2xl rounded-3xl sm:rounded-[2.5rem] border border-black/5 p-8 sm:p-10 duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] outline-none">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <Dialog.Close asChild>
                  <button className="rounded-full w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-gray-500">
                    <X className="h-5 w-5" />
                  </button>
                </Dialog.Close>
              </div>
              <Dialog.Title className="text-2xl font-medium tracking-tight text-black mb-2">
                Portfolio Not Available
              </Dialog.Title>
              <Dialog.Description className="text-[15px] font-light text-gray-500 leading-relaxed mb-8">
                <span className="font-medium text-black">{unavailableMember.name}'s</span> portfolio is currently being updated and isn't available right now. Please check back later!
              </Dialog.Description>
              
              <button 
                onClick={() => setUnavailableMember(null)}
                className="w-full bg-black text-white py-4 rounded-xl sm:rounded-2xl font-medium hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
              >
                Close
              </button>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}

    </div>
  );
}
