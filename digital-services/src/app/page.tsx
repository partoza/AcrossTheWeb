"use client";
import React, { useState } from "react";
import { ServiceCard } from "@/components/ServiceCard";
import { PreferenceModal } from "@/components/PreferenceModal";
import { SupportContact } from "@/components/SupportContact";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: "web-design",
    title: "Web Design & Development",
    description: "Custom, responsive websites built with modern frameworks to elevate your brand.",
    price: 1500,
    features: [
      "Responsive Design",
      "SEO Optimization",
      "Custom UI/UX",
      "Performance Tuning"
    ]
  },
  {
    id: "video-editing",
    title: "Video Editing",
    description: "Professional video editing for YouTube, social media, and corporate presentations.",
    price: 300,
    features: [
      "Color Correction",
      "Motion Graphics",
      "Audio Mixing",
      "Subtitles & Captions"
    ]
  },
  {
    id: "virtual-assistant",
    title: "Virtual Assistant",
    description: "Reliable administrative support to help you scale your business operations smoothly.",
    price: 500,
    features: [
      "Email Management",
      "Calendar Scheduling",
      "Data Entry",
      "Customer Support"
    ]
  },
  {
    id: "branding",
    title: "Brand Identity",
    description: "Cohesive brand design including logos, color palettes, and typography.",
    price: 800,
    features: [
      "Logo Design",
      "Brand Guidelines",
      "Social Media Kits",
      "Business Cards"
    ]
  }
];

export default function Home() {
  const [selectedService, setSelectedService] = useState<{ id: string; title: string; price: number } | null>(null);

  const handleRequestQuote = (id: string, title: string, price: number) => {
    setSelectedService({ id, title, price });
  };

  return (
    <>
      <section className="relative overflow-hidden py-24 lg:py-32 bg-background border-b">
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8">
            Empower Your Digital Presence
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Top-tier digital services crafted for modern businesses. Build your customized quote today and let&apos;s bring your vision to life.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="#services" 
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Explore Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
        {/* Abstract background decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
      </section>

      <section id="services" className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl">
              Choose from our range of professional digital services. Click &quot;Request Quote&quot; to configure your preferences and get a customized estimate.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                {...service}
                onRequestQuote={handleRequestQuote}
              />
            ))}
          </div>
        </div>
      </section>

      <SupportContact />

      <PreferenceModal 
        isOpen={!!selectedService} 
        onClose={() => setSelectedService(null)} 
        service={selectedService} 
      />
    </>
  );
}
