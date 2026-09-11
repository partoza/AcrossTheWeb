"use client";
import React, { useState } from 'react';
import { Search, CheckCircle, DraftingCompass, X, ArrowUpRight } from 'lucide-react';
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
    title: "Architectural Layouts & Renders",
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
    title: "Virtual Assistant & Support",
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
    title: "Project Management",
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
    <div className="pt-24 lg:pt-40 min-h-screen bg-white dark:bg-[#050505] text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black pb-32">
      {selectedService && (
        <PreferenceModal 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}

      <div className="max-w-[1500px] mx-auto px-6 sm:px-12 lg:px-24">
        
        {/* Massive Header (Scaled down) */}
        <div className="mb-16 lg:mb-24">
          <h1 className="text-4xl sm:text-6xl lg:text-[5.5rem] leading-[1] font-medium tracking-tighter mb-6">
            Services.
          </h1>
          <p className="text-lg sm:text-xl font-light text-gray-500 max-w-3xl leading-relaxed">
            From web development and video post-production to CAD architectural drafting and executive VA support &mdash; custom-tailored for your growth.
          </p>
        </div>

        {/* Editorial Search & Filters */}
        <div className="mb-16 lg:mb-24">
          <div className="relative mb-10 lg:mb-12">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-gray-300 dark:text-gray-800" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you looking for?" 
              className="w-full bg-transparent border-b-2 border-gray-200 dark:border-[#222] pl-10 sm:pl-12 pr-10 py-4 text-xl sm:text-2xl lg:text-3xl font-light focus:outline-none text-black dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-800 transition-colors focus:border-black dark:focus:border-white"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer">
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            {categories.map((cat, i) => (
              <button 
                key={i} 
                onClick={() => setActiveCategory(cat)}
                className={`text-sm sm:text-[15px] font-medium tracking-tight transition-colors duration-300 cursor-pointer uppercase ${
                  activeCategory === cat 
                    ? 'text-black dark:text-white border-b-2 border-black dark:border-white pb-1' 
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 pb-1 border-b-2 border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Service Grid - Large Naked Minimalist Blocks */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-32 flex flex-col items-center justify-center border-t border-gray-200 dark:border-gray-900">
            <Search className="w-12 h-12 text-gray-300 mb-6" />
            <h3 className="text-2xl font-medium text-black dark:text-white mb-4 tracking-tight">No results found.</h3>
            <p className="text-[15px] text-gray-500 max-w-sm mx-auto font-light mb-10">
              We couldn't find any services matching "{searchQuery}".
            </p>
            <button 
              onClick={() => {setSearchQuery(""); setActiveCategory("All Services");}}
              className="text-[15px] font-medium underline underline-offset-8 hover:opacity-60 transition-opacity"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-x-12 xl:gap-x-20 gap-y-16 lg:gap-y-24">
            {filteredServices.map((service) => (
              <div key={service.id} className="group flex flex-col h-full">
                {service.image && (
                  <div className="w-full h-[250px] sm:h-[350px] rounded-3xl overflow-hidden bg-gray-100 dark:bg-[#111] mb-6 relative">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                    {service.tag && (
                      <div className="absolute top-5 left-5 bg-white/90 dark:bg-black/90 backdrop-blur-md text-black dark:text-white px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase">
                        {service.tag}
                      </div>
                    )}
                  </div>
                )}
                
                <h3 className="text-2xl sm:text-3xl font-medium mb-3 tracking-tight group-hover:translate-x-2 transition-transform duration-500">{service.title}</h3>
                
                <p className="text-[15px] sm:text-base font-light text-gray-500 dark:text-gray-400 mb-8 leading-relaxed max-w-md">
                  {service.desc}
                </p>
                
                <div className="flex-grow">
                  <ul className="space-y-3 mb-10">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center text-[14px] sm:text-[15px] text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-gray-900 pb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 mr-4 shrink-0" />
                        <span className="font-light">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t-2 border-black dark:border-white">
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1.5">Starting At</div>
                    <div className="text-xl sm:text-2xl font-medium">{service.priceLabel}</div>
                  </div>
                  <button 
                    onClick={() => setSelectedService(service)}
                    className="flex items-center gap-3 text-base font-medium hover:opacity-60 transition-opacity cursor-pointer group/btn"
                  >
                    Request
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#111] border border-transparent dark:border-white/10 text-black dark:text-white flex items-center justify-center shrink-0 group-hover/btn:scale-110 transition-transform duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </button>
                </div>
              </div>
            ))}
            
            {/* Custom Scope Full Width */}
            <div className="lg:col-span-2 group flex flex-col md:flex-row items-start md:items-center justify-between gap-10 bg-gray-50 dark:bg-[#0a0a0a] rounded-3xl p-8 sm:p-12 border border-gray-200 dark:border-[#222] mt-8">
               <div className="flex-1">
                 <div className="flex items-center gap-3 mb-5">
                   <div className="w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shrink-0">
                     <DraftingCompass className="w-5 h-5" />
                   </div>
                   <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Flexible Scope</span>
                 </div>
                 <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-3 tracking-tight">Build your custom package.</h3>
                 <p className="text-[15px] sm:text-base font-light text-gray-500 max-w-2xl leading-relaxed">
                   Have a specific project or multi-discipline requirement? Tell us what you need, and our team will structure a custom package just for you.
                 </p>
               </div>
               <button 
                  onClick={() => setSelectedService({
                    id: "custom",
                    title: "Custom Service Scope",
                    category: "Custom",
                    basePrice: 0,
                    priceLabel: "Custom",
                    priceUnit: "TBD"
                  })}
                  className="group/btn flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full text-base font-medium hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl w-full md:w-auto justify-center"
                >
                  Inquire Now
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
