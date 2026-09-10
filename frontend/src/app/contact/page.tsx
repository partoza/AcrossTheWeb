"use client";
import React from 'react';
import { Mail, Phone, MapPin, ChevronDown } from 'lucide-react';

export default function ContactPage() {
  const faqs = [
    {
      question: "How does the pricing work?",
      answer: "Our pricing is tailored to your specific needs. The prices shown on our services are starting points. Once you request a quote, we will provide a detailed breakdown based on your project scope and timeline."
    },
    {
      question: "What is your typical turnaround time?",
      answer: "Turnaround times vary depending on the service and the scope of the project. Standard projects take 1-2 weeks, while larger ones may take a month or more. Rush options are available."
    },
    {
      question: "Do you offer revisions?",
      answer: "Yes, we include a set number of revisions in every project tier to ensure you are completely satisfied with the final result."
    }
  ];

  return (
    <div id="contact" className="pt-24 min-h-screen bg-white dark:bg-[#000]">
      <section className="py-20 px-6 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-black dark:text-white mb-6">
              Support & Contact
            </h1>
            <p className="text-lg text-gray-500 dark:text-[#888] font-normal leading-relaxed">
              Have questions or need assistance? Check out our FAQ or reach out to us directly. We&apos;re here to help.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Left side: FAQ and Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4 mb-12">
                {faqs.map((faq, i) => (
                  <details key={i} className="group border border-gray-200 dark:border-[#333] rounded-lg bg-gray-50 dark:bg-[#0a0a0a] overflow-hidden">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-5 text-black dark:text-white transition-colors hover:bg-gray-100 dark:hover:bg-[#111]">
                      <span>{faq.question}</span>
                      <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180 text-gray-500" />
                    </summary>
                    <div className="p-5 border-t border-gray-200 dark:border-[#333] text-gray-500 dark:text-[#888] text-[14.5px] leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#111] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black dark:text-white">Email Us</h3>
                    <p className="text-gray-500 dark:text-[#888] mt-1 text-[14.5px]">support@acrosstheweb.app</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#111] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black dark:text-white">Call Us</h3>
                    <p className="text-gray-500 dark:text-[#888] mt-1 text-[14.5px]">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#111] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black dark:text-white">Visit Us</h3>
                    <p className="text-gray-500 dark:text-[#888] mt-1 text-[14.5px]">123 Digital Way, Tech District</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Form */}
            <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#333] rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none h-fit">
              <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Send us a message</h2>
              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-black dark:text-white">Name</label>
                    <input 
                      id="name" 
                      required 
                      className="w-full bg-gray-50 dark:bg-[#000] border border-gray-200 dark:border-[#333] rounded-xl px-4 py-3 text-[14.5px] focus:outline-none focus:border-gray-400 dark:focus:border-[#555] transition-colors text-black dark:text-white placeholder:text-gray-400"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-black dark:text-white">Email</label>
                    <input 
                      id="email" 
                      type="email" 
                      required 
                      className="w-full bg-gray-50 dark:bg-[#000] border border-gray-200 dark:border-[#333] rounded-xl px-4 py-3 text-[14.5px] focus:outline-none focus:border-gray-400 dark:focus:border-[#555] transition-colors text-black dark:text-white placeholder:text-gray-400"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-black dark:text-white">Subject</label>
                  <input 
                    id="subject" 
                    required 
                    className="w-full bg-gray-50 dark:bg-[#000] border border-gray-200 dark:border-[#333] rounded-xl px-4 py-3 text-[14.5px] focus:outline-none focus:border-gray-400 dark:focus:border-[#555] transition-colors text-black dark:text-white placeholder:text-gray-400"
                    placeholder="How can we help you?"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-black dark:text-white">Message</label>
                  <textarea 
                    id="message" 
                    required 
                    className="w-full min-h-[150px] resize-none bg-gray-50 dark:bg-[#000] border border-gray-200 dark:border-[#333] rounded-xl px-4 py-3 text-[14.5px] focus:outline-none focus:border-gray-400 dark:focus:border-[#555] transition-colors text-black dark:text-white placeholder:text-gray-400"
                    placeholder="Provide details about your inquiry..."
                  />
                </div>
                <button type="submit" className="w-full bg-black dark:bg-white text-white dark:text-black px-6 py-3.5 rounded-xl text-[15px] font-semibold hover:opacity-90 transition-all duration-300 cursor-pointer">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
