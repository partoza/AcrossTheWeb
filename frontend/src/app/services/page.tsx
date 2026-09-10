"use client";
import React, { useState } from 'react';
import { Search, CheckCircle, DraftingCompass, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import PreferenceModal from '@/components/PreferenceModal';

export const servicesData = [
  {
    id: "web-dev",
    title: "Web Design & Development",
    category: "Web & Digital",
    desc: "Custom, responsive websites, storefronts, and web applications engineered to convert visitors into loyal clients.",
    features: ["Responsive Mobile-First UI/UX", "SEO & Performance Optimization", "CMS & Custom Tech Integrations"],
    basePrice: 15000,
    priceLabel: "₱15,000",
    priceUnit: "starting / project",
    tag: "POPULAR",
    image: "/services/webdevelopment.png"
  },
  {
    id: "landing-page",
    title: "Landing Page Design",
    category: "Web & Digital",
    desc: "High-impact sales and lead generation landing pages optimized for maximum click-throughs and subscriptions.",
    features: ["A/B Test Ready Structures", "Fast 48-72 Hour Delivery", "Form & Email Automation Sync"],
    basePrice: 5000,
    priceLabel: "₱5,000",
    priceUnit: "starting / page",
    tag: "HIGH CONVERSION",
    image: "/services/landingpage.png"
  },
  {
    id: "video-editing",
    title: "Video Editing & Reels",
    category: "Creative & Media",
    desc: "Engaging social media Reels, TikToks, YouTube edits, corporate promo videos, and motion graphic overlays.",
    features: ["Captivating Subtitles & Animations", "Sound Design & Color Grading", "Multi-platform Aspect Ratios"],
    basePrice: 1500,
    priceLabel: "₱1,500",
    priceUnit: "starting / video",
    tag: "CREATIVE",
    image: "/services/videoediting.png"
  },
  {
    id: "graphic-design",
    title: "Graphic Design & Branding",
    category: "Creative & Media",
    desc: "Stunning logos, social media graphics, pitch decks, brand books, and marketing collateral.",
    features: ["Brand Style Guidelines", "Social Media Content Kits", "Vector Source Files Provided"],
    basePrice: 3500,
    priceLabel: "₱3,500",
    priceUnit: "starting / asset",
    tag: "BRANDING",
    image: "/services/graphicdesign.png"
  },
  {
    id: "architectural",
    title: "Architectural Layouts & 3D Renders",
    category: "Architectural & Engineering",
    desc: "Precise 2D CAD floor plans, structural draftings, Revit building models, and photorealistic 3D renders.",
    features: ["Architectural & Space Planning", "Photorealistic 3D Visualization", "CAD & PDF Deliverables"],
    basePrice: 8000,
    priceLabel: "₱8,000",
    priceUnit: "starting / project",
    tag: "TECHNICAL",
    image: "/services/architectural.png"
  },
  {
    id: "engineering",
    title: "Engineering Scope & Drafting",
    category: "Architectural & Engineering",
    desc: "Electrical, mechanical, and civil engineering schematic drafting, quantity estimation, and technical drawings.",
    features: ["MEP Technical Drawings", "Project Quantity Take-offs", "Standards Compliant Specs"],
    basePrice: 10000,
    priceLabel: "₱10,000",
    priceUnit: "starting / scope",
    tag: "ENGINEERING",
    image: "/services/engineering.png"
  },
  {
    id: "va",
    title: "Virtual Assistant & Admin Support",
    category: "Virtual Assistants & Ops",
    desc: "Dedicated executive administrative support, email inbox triage, calendar management, and client communication.",
    features: ["Dedicated Hourly/Monthly Retainer", "Trained in Remote Tools", "Daily Task Reporting"],
    basePrice: 300,
    priceLabel: "₱300",
    priceUnit: "/ hour starting",
    tag: "ONGOING",
    image: "/services/virtualassistant.png"
  },
  {
    id: "project-management",
    title: "Project Management & Workflows",
    category: "Virtual Assistants & Ops",
    desc: "Setup and management of Notion/Asana workspaces, Agile sprint planning, and team output oversight.",
    features: ["Custom Workspace SOP Setup", "Weekly Sprint Tracking", "Team Milestone Management"],
    basePrice: 15000,
    priceLabel: "₱15,000",
    priceUnit: "/ month starting",
    tag: "OPERATIONS",
    image: "/services/projectmanagement.png"
  }
];

const categories = ["All Services", "Web & Digital", "Creative & Media", "Architectural & Engineering", "Virtual Assistants & Ops"];

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Services");
  const [selectedService, setSelectedService] = useState<any>(null);

  const filteredServices = servicesData.filter(service => {
    const matchesCategory = activeCategory === "All Services" || service.category === activeCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
      {selectedService && (
        <PreferenceModal 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}
      <section id="services" className="pb-32 px-6 sm:px-8 md:px-12 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-[11px] font-semibold tracking-wider uppercase mb-6 block text-gray-500 dark:text-gray-400">Solutions & Scope</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight font-semibold tracking-tighter text-black dark:text-white mb-6">
              Comprehensive Digital Services
            </h2>
            <p className="text-lg text-gray-500 dark:text-[#888] font-normal leading-relaxed">
              From web development and video post-production to CAD architectural drafting and executive VA support &mdash; custom-tailored for your growth.
            </p>
          </div>

          {/* Sleek Search and Filters Browser */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="relative group mb-10">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-neutral-800 dark:to-neutral-900 rounded-[1.5rem] blur opacity-40 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative flex items-center bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#333] rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <Search className="w-6 h-6 ml-6 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What service are you looking for?" 
                  className="w-full bg-transparent pl-4 pr-6 py-5 text-lg focus:outline-none text-black dark:text-white placeholder:text-gray-400 font-medium"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="mr-6 p-2 text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer rounded-full hover:bg-gray-100 dark:hover:bg-[#222]">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((cat, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-[14px] font-medium transition-all duration-300 cursor-pointer shadow-sm hover:scale-[1.03] active:scale-95 ${
                    activeCategory === cat 
                      ? 'bg-black text-white dark:bg-white dark:text-black border-transparent shadow-md' 
                      : 'bg-white dark:bg-[#111] text-gray-600 dark:text-[#aaa] border border-gray-200 dark:border-[#333] hover:border-gray-400 dark:hover:border-[#555] hover:text-black dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filteredServices.length === 0 ? (
            <div className="text-center py-32 flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-gray-100 dark:bg-[#111] rounded-full flex items-center justify-center mb-6 border border-gray-200 dark:border-[#333]">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-2">No results found</h3>
              <p className="text-gray-500 dark:text-[#888] mb-8 max-w-sm mx-auto">
                We couldn't find any services matching your search for "{searchQuery}". Try adjusting your filters or search term.
              </p>
              <button 
                onClick={() => {setSearchQuery(""); setActiveCategory("All Services");}}
                className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-full text-[14px] font-medium hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-md cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          ) : (
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
              {filteredServices.map((service) => (
                <div key={service.id} className="spotlight-card group relative bg-white dark:bg-[#000] rounded-xl border border-gray-200 dark:border-[#333] hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col h-full shadow-sm">
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
                        <div className="text-[17px] font-bold text-black dark:text-white">{service.priceLabel}</div>
                        <div className="text-[10px] text-gray-500">{service.priceUnit}</div>
                      </div>
                      <button 
                        onClick={() => setSelectedService(service)}
                        className="bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-md text-[13px] font-medium hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer shadow-sm"
                      >
                        Request Quote
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Custom Scope Card */}
              <div className="spotlight-card group relative rounded-xl p-[1px] overflow-hidden sm:col-span-2 lg:col-span-3 xl:col-span-4 mt-4">
                <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#000_50%,transparent_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#fff_50%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative bg-gray-50 dark:bg-[#0a0a0a] rounded-xl border border-dashed border-gray-300 dark:border-[#444] group-hover:border-transparent transition-colors duration-300 overflow-hidden flex flex-col md:flex-row items-center justify-between p-8 md:p-10 z-10 w-full h-full">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                  
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
                  </div>
                  
                  <div className="relative z-10 flex-shrink-0 w-full md:w-auto flex flex-col items-center md:items-end border-t md:border-t-0 md:border-l border-gray-200 dark:border-[#333] pt-6 md:pt-0 md:pl-10">
                     <div className="text-[13px] text-gray-500 mb-4 font-medium uppercase tracking-wider">Custom quote on request</div>
                     <button 
                      onClick={() => setSelectedService({
                        id: "custom",
                        title: "Custom Service Scope",
                        category: "Custom",
                        basePrice: 0,
                        priceLabel: "Custom",
                        priceUnit: "TBD"
                      })}
                      className="w-full md:w-auto bg-black dark:bg-white text-white dark:text-black px-8 py-3.5 rounded-md text-[14px] font-medium hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer shadow-md">
                       Inquire Custom Scope
                     </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
