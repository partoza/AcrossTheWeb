"use client";
import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Calculator, Check, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const OptionCard = ({ selected, onClick, title, subtitle }: any) => (
  <button 
    onClick={onClick}
    className={`relative flex flex-col text-left p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer w-full hover:scale-[1.02] active:scale-95 overflow-hidden ${
      selected 
        ? 'border-black dark:border-white bg-gray-50 dark:bg-white/5' 
        : 'border-gray-200 dark:border-[#222] hover:border-gray-300 dark:hover:border-[#444] bg-transparent'
    }`}
  >
    {selected && (
      <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-sm">
        <Check className="w-3 h-3" />
      </div>
    )}
    <span className={`font-medium text-lg leading-tight mb-1 pr-6 ${selected ? 'text-black dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
      {title}
    </span>
    {subtitle && (
      <span className={`text-[13px] font-medium ${selected ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500'}`}>
        {subtitle}
      </span>
    )}
  </button>
);

const NumberStepper = ({ value, onChange, min = 1, step = 1, label }: any) => (
  <div className="flex items-center justify-between p-4 px-5 rounded-2xl border-2 border-gray-200 dark:border-[#222] bg-transparent">
    <span className="font-medium text-lg text-black dark:text-white">{label}</span>
    <div className="flex items-center gap-3">
      <button 
        onClick={() => Number(value) > min && onChange(String(Number(value) - step))} 
        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#111] flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#222] active:scale-95 transition-all text-black dark:text-white border border-gray-200 dark:border-[#333] shadow-sm cursor-pointer"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-10 text-center font-bold text-xl">{value}</span>
      <button 
        onClick={() => onChange(String(Number(value) + step))} 
        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#111] flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#222] active:scale-95 transition-all text-black dark:text-white border border-gray-200 dark:border-[#333] shadow-sm cursor-pointer"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default function PreferenceModal({ service, onClose }: { service: any, onClose: () => void }) {
  const { addToCart } = useCart();
  const [details, setDetails] = useState<Record<string, any>>({});
  const [estimatedPrice, setEstimatedPrice] = useState(service.basePrice);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let price = service.basePrice;
    
    switch (service.id) {
      case 'web-dev':
        const extraPages = Math.max(0, (parseInt(details.pages || '3') - 3));
        price += extraPages * 1500;
        if (details.cms === 'yes') price += 5000;
        if (details.ecommerce === 'yes') price += 8000;
        break;
        
      case 'landing-page':
        if (details.copywriting === 'yes') price += 2000;
        if (details.graphics === 'yes') price += 1500;
        break;
        
      case 'video-editing':
        const rawMins = parseInt(details.footageLength || '10');
        if (rawMins > 10) price += Math.ceil((rawMins - 10) / 10) * 500;
        if (details.vfx === 'yes') price += 2000;
        if (details.rush === 'yes') price += 1000;
        break;
        
      case 'graphic-design':
        if (details.guidelines === 'yes') price += 4000;
        if (details.socialKit === 'yes') price += 2000;
        break;
        
      case 'architectural':
        const sqm = parseInt(details.sqm || '100');
        if (sqm > 100) price += Math.ceil((sqm - 100) / 50) * 2000;
        const renders = parseInt(details.renders || '0');
        price += renders * 1500;
        break;
        
      case 'engineering':
        if (details.signSeal === 'yes') price += 5000;
        break;
        
      case 'va':
        const hours = parseInt(details.hours || '10');
        price = hours * 300; // Base rate
        if (details.specialized === 'yes') price += (hours * 150);
        break;
        
      case 'project-management':
        const teamSize = parseInt(details.teamSize || '5');
        if (teamSize > 5) price += (teamSize - 5) * 1000;
        break;
        
      case 'custom':
        price = 0;
        break;
    }
    
    setEstimatedPrice(price);
  }, [details, service.basePrice, service.id]);

  const handleSave = () => {
    if (service.id === 'custom' && (!details.description || details.description.trim() === '')) {
      setError('Project details are required for custom scopes.');
      return;
    }
    setError(null);

    addToCart({
      serviceId: service.id,
      title: service.title,
      estimatedPrice,
      details,
      image: service.image
    });
    onClose();
  };

  return (
    <Dialog.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-[100] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-[100] w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] overflow-hidden bg-white dark:bg-[#050505] shadow-2xl sm:rounded-[2rem] border border-black/5 dark:border-white/10 p-0 duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          
          <div className="flex flex-col md:flex-row h-[90vh] sm:h-[650px]">
            
            {/* Left Side: Preview & Info (Hidden on very small screens) */}
            <div className="hidden md:flex flex-col w-2/5 bg-gray-50 dark:bg-[#0a0a0a] p-10 border-r border-gray-200 dark:border-[#1a1a1a] relative">
              {service.image && (
                <div className="w-full h-56 rounded-[1.5rem] overflow-hidden mb-10 shadow-sm border border-black/5 dark:border-white/5 relative">
                   <img src={service.image} alt={service.title} className="w-full h-full object-cover filter grayscale opacity-90" />
                </div>
              )}
              <h2 className="text-3xl lg:text-4xl font-medium tracking-tight mb-4 text-black dark:text-white leading-tight">
                {service.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 font-light text-[15px] leading-relaxed">
                {service.desc || 'Provide details to get an accurate Philippine commission estimate.'}
              </p>
              
              <div className="mt-auto pt-10">
                <div className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Base Rate</div>
                <div className="text-3xl font-medium text-black dark:text-white">{service.priceLabel}</div>
              </div>
            </div>

            {/* Right Side: Configurator */}
            <div className="flex flex-col w-full md:w-3/5 overflow-hidden">
              <div className="flex items-center justify-between p-6 sm:p-8 border-b border-gray-100 dark:border-[#1a1a1a] md:hidden">
                <div>
                  <Dialog.Title className="text-xl font-medium text-black dark:text-white leading-tight">
                    {service.title}
                  </Dialog.Title>
                  <Dialog.Description className="text-sm text-gray-500 mt-1">
                    Configure your inquiry.
                  </Dialog.Description>
                </div>
                <Dialog.Close asChild>
                  <button className="rounded-full w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-[#111] hover:bg-gray-200 dark:hover:bg-[#222] transition-colors cursor-pointer text-gray-500">
                    <X className="h-5 w-5" />
                  </button>
                </Dialog.Close>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-10">
                <div className="space-y-10">
                  
                  {/* Web Dev */}
                  {service.id === 'web-dev' && (
                    <>
                      <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Project Scale</label>
                        <NumberStepper label="Total Pages" value={details.pages || '3'} onChange={(v:any) => setDetails({...details, pages: v})} min={1} />
                      </div>
                      <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Features</label>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <OptionCard selected={details.cms === 'yes'} onClick={() => setDetails({...details, cms: details.cms === 'yes' ? 'no' : 'yes'})} title="CMS / Blog" subtitle="+₱5,000" />
                          <OptionCard selected={details.ecommerce === 'yes'} onClick={() => setDetails({...details, ecommerce: details.ecommerce === 'yes' ? 'no' : 'yes'})} title="E-Commerce" subtitle="+₱8,000" />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Landing Page */}
                  {service.id === 'landing-page' && (
                    <>
                      <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Content</label>
                        <OptionCard selected={details.copywriting === 'yes'} onClick={() => setDetails({...details, copywriting: details.copywriting === 'yes' ? 'no' : 'yes'})} title="Include Copywriting" subtitle="We write the sales copy (+₱2,000)" />
                      </div>
                      <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Assets</label>
                        <OptionCard selected={details.graphics === 'yes'} onClick={() => setDetails({...details, graphics: details.graphics === 'yes' ? 'no' : 'yes'})} title="Custom Graphics" subtitle="Bespoke illustrations & icons (+₱1,500)" />
                      </div>
                    </>
                  )}

                  {/* Video Editing */}
                  {service.id === 'video-editing' && (
                    <>
                      <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Source Footage</label>
                        <NumberStepper label="Raw Minutes" value={details.footageLength || '10'} onChange={(v:any) => setDetails({...details, footageLength: v})} min={1} />
                      </div>
                      <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Upgrades</label>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <OptionCard selected={details.vfx === 'yes'} onClick={() => setDetails({...details, vfx: details.vfx === 'yes' ? 'no' : 'yes'})} title="Heavy VFX" subtitle="+₱2,000" />
                          <OptionCard selected={details.rush === 'yes'} onClick={() => setDetails({...details, rush: details.rush === 'yes' ? 'no' : 'yes'})} title="Rush Delivery" subtitle="+₱1,000" />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Graphic Design */}
                  {service.id === 'graphic-design' && (
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Deliverables</label>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <OptionCard selected={details.guidelines === 'yes'} onClick={() => setDetails({...details, guidelines: details.guidelines === 'yes' ? 'no' : 'yes'})} title="Brand Guidelines" subtitle="Full brand book (+₱4,000)" />
                        <OptionCard selected={details.socialKit === 'yes'} onClick={() => setDetails({...details, socialKit: details.socialKit === 'yes' ? 'no' : 'yes'})} title="Social Media Kit" subtitle="Templates & assets (+₱2,000)" />
                      </div>
                    </div>
                  )}
                  
                  {/* Architectural */}
                  {service.id === 'architectural' && (
                    <>
                      <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Scope</label>
                        <NumberStepper label="Floor Area (SQM)" step={10} value={details.sqm || '100'} onChange={(v:any) => setDetails({...details, sqm: v})} min={10} />
                      </div>
                      <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Visuals</label>
                        <NumberStepper label="3D Render Views" value={details.renders || '0'} onChange={(v:any) => setDetails({...details, renders: v})} min={0} />
                      </div>
                    </>
                  )}
                  
                  {/* Engineering */}
                  {service.id === 'engineering' && (
                    <>
                      <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Discipline</label>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <OptionCard selected={!details.discipline || details.discipline === 'civil'} onClick={() => setDetails({...details, discipline: 'civil'})} title="Civil/Structural" />
                          <OptionCard selected={details.discipline === 'mechanical'} onClick={() => setDetails({...details, discipline: 'mechanical'})} title="Mechanical" />
                          <OptionCard selected={details.discipline === 'electrical'} onClick={() => setDetails({...details, discipline: 'electrical'})} title="Electrical" />
                          <OptionCard selected={details.discipline === 'plumbing'} onClick={() => setDetails({...details, discipline: 'plumbing'})} title="Plumbing" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Authentication</label>
                        <OptionCard selected={details.signSeal === 'yes'} onClick={() => setDetails({...details, signSeal: details.signSeal === 'yes' ? 'no' : 'yes'})} title="Licensed Sign & Seal" subtitle="+₱5,000" />
                      </div>
                    </>
                  )}

                  {/* Virtual Assistant */}
                  {service.id === 'va' && (
                    <>
                      <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Engagement</label>
                        <NumberStepper label="Hours per Week" value={details.hours || '10'} onChange={(v:any) => setDetails({...details, hours: v})} min={5} />
                      </div>
                      <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Specialization</label>
                        <OptionCard selected={details.specialized === 'yes'} onClick={() => setDetails({...details, specialized: details.specialized === 'yes' ? 'no' : 'yes'})} title="Technical / Bookkeeping" subtitle="+₱150/hr rate increase" />
                      </div>
                    </>
                  )}

                  {/* Project Management */}
                  {service.id === 'project-management' && (
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Team Scale</label>
                      <NumberStepper label="Team Size Managed" value={details.teamSize || '5'} onChange={(v:any) => setDetails({...details, teamSize: v})} min={1} />
                    </div>
                  )}

                  {/* Custom Scope */}
                  {service.id === 'custom' && (
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Project Details *</label>
                      <textarea 
                        rows={6} 
                        value={details.description || ''} 
                        onChange={(e) => {
                          setDetails({...details, description: e.target.value});
                          if (error) setError(null);
                        }} 
                        placeholder="Tell us what you need in detail..." 
                        className={`w-full p-5 rounded-2xl border-2 bg-transparent outline-none resize-none transition-colors text-lg ${error ? 'border-red-500 focus:border-red-600' : 'border-gray-200 dark:border-[#222] focus:border-black dark:focus:border-white'}`}
                      />
                      {error && (
                        <p className="text-red-500 text-sm font-medium ml-1 mt-1">{error}</p>
                      )}
                    </div>
                  )}

                  {/* Additional Notes (For all services) */}
                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Other Comments</label>
                    <textarea 
                      rows={3} 
                      value={details.notes || ''} 
                      onChange={(e) => setDetails({...details, notes: e.target.value})} 
                      placeholder="Any specific instructions or preferences? (Optional)" 
                      className="w-full p-5 rounded-2xl border-2 border-gray-200 dark:border-[#222] bg-transparent focus:border-black dark:focus:border-white outline-none resize-none transition-colors text-lg"
                    />
                  </div>

                </div>
              </div>

              {/* Bottom Actions Area */}
              <div className="p-6 sm:p-10 border-t border-gray-100 dark:border-[#1a1a1a] bg-white dark:bg-[#050505]">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center">
                    <Calculator className="w-4 h-4 mr-2" />
                    Est. Total
                  </div>
                  <div className="text-3xl sm:text-4xl font-medium tracking-tight text-black dark:text-white">
                    {service.id === 'custom' ? 'TBD' : `₱${estimatedPrice.toLocaleString()}`}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button onClick={onClose} className="flex-1 py-4 sm:py-5 rounded-full font-medium bg-gray-100 dark:bg-[#111] hover:bg-gray-200 dark:hover:bg-[#222] text-black dark:text-white transition-colors cursor-pointer active:scale-95 text-lg">
                    Cancel
                  </button>
                  <button onClick={handleSave} className="flex-[2] py-4 sm:py-5 rounded-full font-medium bg-black dark:bg-white text-white dark:text-black hover:scale-[1.02] active:scale-95 transition-all shadow-xl cursor-pointer text-lg">
                    Add to Inquiry
                  </button>
                </div>
              </div>

              <Dialog.Close asChild>
                <button className="hidden md:flex absolute right-6 top-6 rounded-full w-10 h-10 items-center justify-center bg-gray-100 dark:bg-[#111] hover:bg-gray-200 dark:hover:bg-[#222] transition-colors cursor-pointer text-gray-500">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </button>
              </Dialog.Close>

            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
