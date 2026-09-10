"use client";

import React from 'react';
import { Code, Video, Briefcase, DraftingCompass, CheckCircle, Star, Search } from 'lucide-react';

export default function LandingPage() {
  const sectionRef = React.useRef<HTMLElement>(null);

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
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white antialiased font-sans flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 sm:px-8 md:px-12 overflow-hidden flex flex-col items-center">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-12 items-center w-full">
          
          {/* Left Side: Content */}
          <div className="flex flex-col items-start text-left">
            <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-6 px-3 py-1 rounded-full border border-black/5 dark:border-white/5 bg-gray-50 dark:bg-[#111111]">
              All-In-One Digital Services & Skills Hub
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-[4.5rem] leading-[1.1] md:leading-[1.05] font-medium tracking-tighter text-gray-900 dark:text-[#f4f4f5] mb-6">
              Scale Your Online Operations
            </h1>
            <p className="text-[17px] md:text-[19px] text-gray-500 dark:text-[#8a8f98] font-medium leading-snug mb-10 max-w-xl">
              Your hassle-free digital platform for expert web creation, video post-production, architectural layouts, administrative support, and downloadable training materials.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
              <a href="#services" className="bg-black dark:bg-[#f4f4f5] text-white dark:text-black px-7 py-3.5 rounded-full text-[14px] sm:text-[15px] font-semibold shadow-xl shadow-black/10 dark:shadow-white/5 transition-all duration-300 hover:scale-[0.98] active:scale-95 text-center w-full sm:w-auto">
                Explore Services
              </a>
              <a href="#products" className="bg-transparent border border-black/20 dark:border-white/20 text-gray-900 dark:text-[#f4f4f5] px-7 py-3.5 rounded-full text-[14px] sm:text-[15px] font-medium transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5 hover:scale-[0.98] active:scale-95 text-center w-full sm:w-auto">
                Free Training E-Books
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 w-full border-t border-black/5 dark:border-white/5 pt-12">
              {[
                { stat: "500+", label: "Projects Completed" },
                { stat: "98%", label: "Client Satisfaction" },
                { stat: "10+", label: "Service Scopes" },
                { stat: "1,200+", label: "Free Downloads" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-start">
                  <span className="text-[32px] md:text-[36px] leading-tight font-medium tracking-tight text-black dark:text-white">{item.stat}</span>
                  <span className="text-[12px] sm:text-[13px] text-gray-500 dark:text-[#8a8f98] font-medium leading-relaxed">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Bento Grid Cards */}
          <div className="w-full hidden md:grid grid-cols-2 gap-4 lg:gap-6 relative">
            <div className="flex flex-col gap-4 lg:gap-6 pt-12">
               {/* Card 1: Web Landing Page */}
               <div className="bg-white dark:bg-[#161616] p-4 rounded-[28px] border border-black/5 dark:border-white/5 shadow-sm hover:-translate-y-1 transition-transform duration-500">
                  <div className="w-full h-36 sm:h-40 mb-5 rounded-[20px] bg-gray-50 dark:bg-[#111111] overflow-hidden flex items-center justify-center border border-black/5 dark:border-white/5">
                     <img src="/hero-service/webdev.png" alt="Web Landing Page" className="w-full h-full object-cover" />
                  </div>
                  <div className="px-2 pb-2">
                     <h3 className="text-[18px] sm:text-[19px] font-bold text-gray-900 dark:text-white mb-1.5 tracking-tight">Web Landing Page</h3>
                     <p className="text-[11px] sm:text-[12px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">High-converting layouts</p>
                  </div>
               </div>

               {/* Card 3: Architecture & CAD */}
               <div className="bg-white dark:bg-[#161616] p-4 rounded-[28px] border border-black/5 dark:border-white/5 shadow-sm hover:-translate-y-1 transition-transform duration-500">
                  <div className="w-full h-36 sm:h-40 mb-5 rounded-[20px] bg-gray-50 dark:bg-[#111111] overflow-hidden flex items-center justify-center border border-black/5 dark:border-white/5">
                     <img src="/hero-service/cad.png" alt="Architecture CAD" className="w-full h-full object-cover" />
                  </div>
                  <div className="px-2 pb-2">
                     <h3 className="text-[18px] sm:text-[19px] font-bold text-gray-900 dark:text-white mb-1.5 tracking-tight">Architecture & CAD</h3>
                     <p className="text-[11px] sm:text-[12px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">Precision 2D/3D Plans</p>
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-4 lg:gap-6 pb-12">
               {/* Card 2: Video Editing */}
               <div className="bg-white dark:bg-[#161616] p-4 rounded-[28px] border border-black/5 dark:border-white/5 shadow-sm hover:-translate-y-1 transition-transform duration-500">
                  <div className="w-full h-36 sm:h-40 mb-5 rounded-[20px] bg-gray-50 dark:bg-[#111111] overflow-hidden flex items-center justify-center border border-black/5 dark:border-white/5">
                     <img src="/hero-service/vid-edit.png" alt="Video Editing" className="w-full h-full object-cover" />
                  </div>
                  <div className="px-2 pb-2">
                     <h3 className="text-[18px] sm:text-[19px] font-bold text-gray-900 dark:text-white mb-1.5 tracking-tight">Video Editing Reels</h3>
                     <p className="text-[11px] sm:text-[12px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">Social Cuts & Corporate</p>
                  </div>
               </div>

               {/* Card 4: Virtual Assistant */}
               <div className="bg-white dark:bg-[#161616] p-4 rounded-[28px] border border-black/5 dark:border-white/5 shadow-sm hover:-translate-y-1 transition-transform duration-500">
                  <div className="w-full h-36 sm:h-40 mb-5 rounded-[20px] bg-gray-50 dark:bg-[#111111] overflow-hidden flex items-center justify-center border border-black/5 dark:border-white/5">
                     <img src="/hero-service/va.png" alt="Virtual Assistant" className="w-full h-full object-cover" />
                  </div>
                  <div className="px-2 pb-2">
                     <h3 className="text-[18px] sm:text-[19px] font-bold text-gray-900 dark:text-white mb-1.5 tracking-tight">Virtual Assistant</h3>
                     <p className="text-[11px] sm:text-[12px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">Executive Support</p>
                  </div>
               </div>
            </div>
            
            {/* Decorative background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gray-200/50 dark:bg-[#161616] rounded-full blur-3xl -z-10 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section ref={sectionRef} id="who-we-are" className="py-32 px-6 sm:px-8 md:px-12 bg-white dark:bg-[#000] border-y border-gray-200 dark:border-[#333] relative overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="absolute top-0 left-0 w-full h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent -z-10"
          style={{ transform: `translateY(calc(var(--scroll-offset, 0px) * 0.2))` }}
        />
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 max-w-3xl mx-auto relative z-10" style={{ transform: `translateY(calc(var(--scroll-offset, 0px) * 0.05))` }}>
            <style>{`
              @keyframes float {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-8px); }
                100% { transform: translateY(0px); }
              }
            `}</style>
            
            <div className="flex justify-center mb-8 relative">
              <img 
                src="/AcrossTheWeb.png" 
                alt="Across The Web Logo" 
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain relative z-10"
                style={{ animation: 'float 6s ease-in-out infinite' }}
              />
            </div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] text-gray-500 dark:text-gray-400 mb-8">
              <span className="text-[11px] font-semibold tracking-wider uppercase">Who We Are</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight font-semibold tracking-tighter text-black dark:text-white mb-6">
              Bridging Skill Acquisition & Digital Empowerment
            </h2>
            <p className="text-lg text-gray-500 dark:text-[#888] font-normal leading-relaxed">
              We connect learners, entrepreneurs, and businesses worldwide with affordable, elite digital expertise and actionable educational resources.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-32 relative max-w-5xl mx-auto items-center">
             
             {/* Mission Card (moves up slightly on scroll) */}
             <div 
               className="md:-mt-12 will-change-transform"
               style={{ transform: `translateY(calc(var(--scroll-offset, 0px) * 0.08))` }}
             >
               <div className="relative group p-[1px] rounded-[17px] overflow-hidden bg-gray-200 dark:bg-[#333]">
                 {/* Running border gradient */}
                 <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#000_50%,transparent_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#fff_50%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                 
                 {/* Card Content */}
                 <div className="relative bg-white dark:bg-[#000] p-8 md:p-10 rounded-2xl h-full w-full">
                    <div className="relative z-10">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 dark:bg-[#111] text-black dark:text-white mb-6 border border-gray-200 dark:border-[#333]">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white tracking-tight mb-3">Our Mission</h3>
                      <p className="text-[15px] text-gray-500 dark:text-[#888] font-normal leading-relaxed">
                        To provide a hassle-free digital platform for everyone wanting to learn basic to complex digital skills, deliver high-quality online and offline digital services at minimal costs, offer accessible training materials, and empower individuals to build sustainable digital income.
                      </p>
                    </div>
                 </div>
               </div>
             </div>

             {/* Vision Card (moves down slightly on scroll) */}
             <div 
               className="md:mt-12 will-change-transform"
               style={{ transform: `translateY(calc(var(--scroll-offset, 0px) * -0.05))` }}
             >
               <div className="relative group p-[1px] rounded-[17px] overflow-hidden bg-gray-200 dark:bg-[#333]">
                 {/* Running border gradient */}
                 <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#000_50%,transparent_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#fff_50%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                 
                 {/* Card Content */}
                 <div className="relative bg-white dark:bg-[#000] p-8 md:p-10 rounded-2xl h-full w-full">
                    <div className="relative z-10">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 dark:bg-[#111] text-black dark:text-white mb-6 border border-gray-200 dark:border-[#333]">
                        <Star className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white tracking-tight mb-3">Our Vision</h3>
                      <p className="text-[15px] text-gray-500 dark:text-[#888] font-normal leading-relaxed">
                        To become the premier, all-in-one digital hub connecting global learners, freelancing talents, and scaling businesses to top-tier technical expertise, streamlined workflows, and transformative learning guides.
                      </p>
                    </div>
                 </div>
               </div>
             </div>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-[24px] md:text-[28px] font-medium tracking-tight text-black dark:text-white mb-4">Meet Our Core Team</h3>
            <p className="text-[13px] sm:text-[14px] text-gray-500 dark:text-[#8a8f98] font-medium">Passionate specialists dedicated to your digital growth.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Gina Sasedor", role: "Founder", quote: "We built this so nobody has to choose between learning a skill and getting paid for one.", initial: "GS" },
              { name: "John Rex Partoza", role: "Lead Web Developer", quote: "Every guide we publish is something we've actually used with a real client first.", initial: "JP" },
              { name: "Kenneth Crismas", role: "Web Designer", quote: "Hassle-free isn't a slogan here — it's how fast we respond to your first message.", initial: "KC" },
              { name: "Hannah May Alinsonorin", role: "HR Head", quote: "Empowering remote talent by placing them where their skills shine brightest.", initial: "HA" },
            ].map((member, i) => (
              <div key={i} className="bg-white dark:bg-[#161616] p-6 rounded-[14px] border border-black/5 dark:border-white/5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-none hover:border-black/20 dark:hover:border-white/20 transition-colors flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-[#111111] flex items-center justify-center text-[18px] font-bold text-gray-900 dark:text-white mb-4 border border-black/5 dark:border-white/5">
                  {member.initial}
                </div>
                <h4 className="text-[15px] sm:text-[16px] font-semibold text-gray-900 dark:text-white tracking-tight mb-1">{member.name}</h4>
                <div className="font-mono text-[10px] sm:text-[11px] text-gray-500 mb-4">{member.role}</div>
                <p className="text-[12px] sm:text-[13px] text-gray-500 dark:text-[#8a8f98] font-medium leading-relaxed italic">"{member.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 sm:px-8 md:px-12 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-[11px] font-semibold tracking-wider uppercase mb-6 block text-gray-500 dark:text-gray-400">Solutions & Scope</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight font-semibold tracking-tighter text-black dark:text-white mb-6">
              Comprehensive Digital Services
            </h2>
            <p className="text-lg text-gray-500 dark:text-[#888] font-normal leading-relaxed">
              From web development and video post-production to CAD architectural drafting and executive VA support — custom-tailored for your growth.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative mb-8">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search services (e.g. Video, CAD, Landing Page, VA)..." 
                className="w-full bg-white dark:bg-[#000] border border-gray-200 dark:border-[#333] rounded-xl pl-12 pr-4 py-4 text-[15px] focus:outline-none focus:border-gray-400 dark:focus:border-[#555] transition-colors text-black dark:text-white placeholder:text-gray-400 shadow-sm"
              />
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {["All Services", "Web & Digital", "Creative & Media", "Architectural & Engineering", "Virtual Assistants & Ops"].map((cat, i) => (
                <button key={i} className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[13px] sm:text-sm font-medium transition-colors border ${i === 0 ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white' : 'bg-transparent text-gray-600 dark:text-[#888] border-gray-200 dark:border-[#333] hover:border-gray-300 dark:hover:border-[#555] bg-white dark:bg-[#000]'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            onMouseMove={(e) => {
              const cards = document.querySelectorAll('.spotlight-card');
              for (const card of Array.from(cards)) {
                const rect = (card as HTMLElement).getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
                (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
              }
            }}
          >
            {[
              {
                title: "Web Design & Development",
                desc: "Custom, responsive websites, storefronts, and web applications engineered to convert visitors into loyal clients.",
                features: ["Responsive Mobile-First UI/UX", "SEO & Performance Optimization", "CMS & Custom Tech Integrations"],
                price: "$150",
                tag: "POPULAR",
                image: "/services/webdevelopment.png"
              },
              {
                title: "Landing Page Design",
                desc: "High-impact sales and lead generation landing pages optimized for maximum click-throughs and subscriptions.",
                features: ["A/B Test Ready Structures", "Fast 48-72 Hour Delivery", "Form & Email Automation Sync"],
                price: "$100",
                priceUnit: "starting / page",
                tag: "HIGH CONVERSION",
                image: "/services/landingpage.png"
              },
              {
                title: "Video Editing & Reels",
                desc: "Engaging social media Reels, TikToks, YouTube edits, corporate promo videos, and motion graphic overlays.",
                features: ["Captivating Subtitles & Animations", "Sound Design & Color Grading", "Multi-platform Aspect Ratios"],
                price: "$80",
                tag: "CREATIVE",
                image: "/services/videoediting.png"
              },
              {
                title: "Graphic Design & Branding",
                desc: "Stunning logos, social media graphics, pitch decks, brand books, and marketing collateral.",
                features: ["Brand Style Guidelines", "Social Media Content Kits", "Vector Source Files Provided"],
                price: "$75",
                priceUnit: "starting / asset",
                tag: "BRANDING",
                image: "/services/graphicdesign.png"
              },
              {
                title: "Architectural Layouts & 3D Renders",
                desc: "Precise 2D CAD floor plans, structural draftings, Revit building models, and photorealistic 3D renders.",
                features: ["Architectural & Space Planning", "Photorealistic 3D Visualization", "CAD & PDF Deliverables"],
                price: "$120",
                tag: "TECHNICAL",
                image: "/services/architectural.png"
              },
              {
                title: "Engineering Scope & Drafting",
                desc: "Electrical, mechanical, and civil engineering schematic drafting, quantity estimation, and technical drawings.",
                features: ["MEP Technical Drawings", "Project Quantity Take-offs", "Standards Compliant Specs"],
                price: "$140",
                priceUnit: "starting / scope",
                tag: "ENGINEERING",
                image: "/services/engineering.png"
              },
              {
                title: "Virtual Assistant & Admin Support",
                desc: "Dedicated executive administrative support, email inbox triage, calendar management, and client communication.",
                features: ["Dedicated Hourly/Monthly Retainer", "Trained in Remote Tools", "Daily Task Reporting"],
                price: "$8",
                priceUnit: "/ hour starting",
                tag: "ONGOING",
                image: "/services/virtualassistant.png"
              },
              {
                title: "Project Management & Workflows",
                desc: "Setup and management of Notion/Asana workspaces, Agile sprint planning, and team output oversight.",
                features: ["Custom Workspace SOP Setup", "Weekly Sprint Tracking", "Team Milestone Management"],
                price: "$200",
                priceUnit: "/ month starting",
                tag: "OPERATIONS",
                image: "/services/projectmanagement.png"
              }
            ].map((service, i) => (
              <div key={i} className="spotlight-card group relative bg-white dark:bg-[#000] rounded-xl border border-gray-200 dark:border-[#333] hover:border-gray-300 dark:hover:border-[#555] transition-all duration-300 overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md dark:shadow-none">
                {/* Subtle mouse-following spotlight effect */}
                <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 bg-[radial-gradient(600px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(0,0,0,0.03),transparent_40%)] dark:bg-[radial-gradient(600px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.04),transparent_40%)] z-20" />
                
                {service.image && (
                  <div className="w-full h-36 overflow-hidden border-b border-gray-200 dark:border-[#333] relative z-10">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-grow relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-[16px] font-semibold text-black dark:text-white leading-tight pr-2">{service.title}</h3>
                    {service.tag && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-gray-100 dark:bg-[#111] text-gray-600 dark:text-[#888] border border-gray-200 dark:border-[#333] whitespace-nowrap tracking-wider">
                        {service.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-[14px] text-gray-500 dark:text-[#888] mb-6 flex-grow leading-relaxed">
                    {service.desc}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start text-[13px] text-gray-600 dark:text-[#888] group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors">
                        <CheckCircle className="w-4 h-4 mr-2 text-black dark:text-white shrink-0 mt-[1px]" />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-[#222]">
                    <div>
                      <div className="text-[17px] font-bold text-black dark:text-white">{service.price}</div>
                      <div className="text-[10px] text-gray-500">{service.priceUnit || "starting / project"}</div>
                    </div>
                    <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md text-[13px] font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                      Request Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Custom Scope Card */}
            <div className="spotlight-card group relative rounded-xl p-[1px] overflow-hidden mt-6 sm:col-span-2 lg:col-span-3 xl:col-span-4">
              {/* Running border gradient (visible on hover) */}
              <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#000_50%,transparent_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#fff_50%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-gray-50 dark:bg-[#0a0a0a] rounded-xl border border-dashed border-gray-300 dark:border-[#444] group-hover:border-transparent transition-colors duration-300 overflow-hidden flex flex-col md:flex-row items-center justify-between p-8 md:p-10 z-10 w-full h-full">
                
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                
                {/* Spotlight effect overlay */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-[radial-gradient(800px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(0,0,0,0.03),transparent_40%)] dark:bg-[radial-gradient(800px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.04),transparent_40%)] z-0" />

                <div className="relative z-10 flex-1 text-left mb-8 md:mb-0 md:pr-12">
                   <div className="flex items-center gap-3 mb-4">
                     <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-[#222] text-black dark:text-white">
                       <DraftingCompass className="w-5 h-5" />
                     </div>
                     <span className="text-[10px] font-bold px-2 py-1 rounded bg-black text-white dark:bg-white dark:text-black tracking-wider uppercase">
                       Flexible Scope
                     </span>
                   </div>
                   <h3 className="text-2xl font-bold text-black dark:text-white mb-3">Custom Service Scope</h3>
                   <p className="text-[15px] text-gray-500 dark:text-[#888] max-w-2xl leading-relaxed mb-6">
                     Have a specific project or multi-discipline requirement? Tell us what you need, and our team will structure a custom package for you.
                   </p>
                   
                   <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                     <ul className="space-y-2">
                       <li className="flex items-center text-[13px] text-gray-600 dark:text-[#888]">
                         <CheckCircle className="w-4 h-4 mr-2 text-black dark:text-white" />
                         <span>Hybrid Team & Multi-Skill Scopes</span>
                       </li>
                       <li className="flex items-center text-[13px] text-gray-600 dark:text-[#888]">
                         <CheckCircle className="w-4 h-4 mr-2 text-black dark:text-white" />
                         <span>Tailored Turnaround & Milestones</span>
                       </li>
                     </ul>
                     <ul className="space-y-2">
                       <li className="flex items-center text-[13px] text-gray-600 dark:text-[#888]">
                         <CheckCircle className="w-4 h-4 mr-2 text-black dark:text-white" />
                         <span>Free Strategy Consultation</span>
                       </li>
                       <li className="flex items-center text-[13px] text-gray-600 dark:text-[#888]">
                         <CheckCircle className="w-4 h-4 mr-2 text-black dark:text-white" />
                         <span>Dedicated Project Manager</span>
                       </li>
                     </ul>
                   </div>
                </div>
                
                <div className="relative z-10 flex-shrink-0 w-full md:w-auto flex flex-col items-center md:items-end border-t md:border-t-0 md:border-l border-gray-200 dark:border-[#333] pt-6 md:pt-0 md:pl-10">
                   <div className="text-[13px] text-gray-500 mb-4 font-medium uppercase tracking-wider">Custom quote on request</div>
                   <button className="w-full md:w-auto bg-black dark:bg-white text-white dark:text-black px-8 py-3.5 rounded-md text-[14px] font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg shadow-black/10 dark:shadow-white/10 hover:scale-[1.02] active:scale-[0.98] transform duration-300">
                     Inquire Custom Scope
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-[#333] bg-white dark:bg-[#000] py-16 px-6 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            
            {/* Column 1: Brand */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <img src="/AcrossTheWeb.png" alt="Across The Web Logo" className="w-6 h-6 object-contain" />
                <span className="font-semibold text-black dark:text-white text-[18px] tracking-tight">Across The Web</span>
              </div>
              <div className="text-[13px] text-gray-500 dark:text-[#888] mb-2 font-medium">
                Founder: John Rex T. Partoza
              </div>
              <div className="text-[13px] text-gray-500 dark:text-[#888] font-medium">
                &copy; {new Date().getFullYear()} Across The Web. All rights reserved.
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="font-semibold text-black dark:text-white mb-6 text-[15px]">Quick Links</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-[13.5px] text-gray-500 hover:text-black dark:text-[#888] dark:hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-[13.5px] text-gray-500 hover:text-black dark:text-[#888] dark:hover:text-white transition-colors">FAQ's</a></li>
                <li><a href="#" className="text-[13.5px] text-gray-500 hover:text-black dark:text-[#888] dark:hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-[13.5px] text-gray-500 hover:text-black dark:text-[#888] dark:hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div>
              <h4 className="font-semibold text-black dark:text-white mb-6 text-[15px]">Legal</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-[13.5px] text-gray-500 hover:text-black dark:text-[#888] dark:hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-[13.5px] text-gray-500 hover:text-black dark:text-[#888] dark:hover:text-white transition-colors">Terms & Condition</a></li>
              </ul>
            </div>

            {/* Column 4: Need Help? */}
            <div>
              <h4 className="font-semibold text-black dark:text-white mb-6 text-[15px]">Need Help?</h4>
              <ul className="space-y-4 mb-6">
                <li><a href="mailto:support@acrosstheweb.app" className="text-[13.5px] text-gray-500 hover:text-black dark:text-[#888] dark:hover:text-white transition-colors">support@acrosstheweb.app</a></li>
              </ul>
              <div className="flex items-center gap-4">
                {/* Facebook icon */}
                <a href="#" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                </a>
                {/* Instagram icon */}
                <a href="#" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}
