"use client";
import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as SelectPrimitive from '@radix-ui/react-select';
import { X, Calculator, ChevronDown, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Select = ({ value, onValueChange, options }: { value: string, onValueChange: (v: string) => void, options: {value: string, label: string}[] }) => {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 dark:border-[#333] bg-white dark:bg-[#111] px-3 py-2 text-sm text-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:bg-gray-50 dark:hover:bg-[#1a1a1a]">
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="relative z-[200] max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 dark:border-[#333] bg-white dark:bg-[#111] text-black dark:text-white shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
          <SelectPrimitive.Viewport className="p-1">
            {options.map((opt) => (
              <SelectPrimitive.Item 
                key={opt.value} 
                value={opt.value}
                className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 dark:focus:bg-[#222] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
              >
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                  <SelectPrimitive.ItemIndicator>
                    <Check className="h-4 w-4" />
                  </SelectPrimitive.ItemIndicator>
                </span>
                <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

const CustomInput = ({ type = "text", value, onChange, min, placeholder, rows }: any) => {
  const baseClass = "flex w-full rounded-md border border-gray-300 dark:border-[#333] bg-white dark:bg-[#111] px-3 py-2 text-sm text-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all hover:bg-gray-50 dark:hover:bg-[#1a1a1a]";
  if (type === "textarea") {
    return <textarea rows={rows} value={value} onChange={onChange} placeholder={placeholder} className={baseClass + " resize-none"} />;
  }
  return <input type={type} min={min} value={value} onChange={onChange} placeholder={placeholder} className={baseClass + " h-10"} />;
};

export default function PreferenceModal({ service, onClose }: { service: any, onClose: () => void }) {
  const { addToCart } = useCart();
  const [details, setDetails] = useState<Record<string, any>>({});
  const [estimatedPrice, setEstimatedPrice] = useState(service.basePrice);

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
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-[100] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-gray-200 dark:border-[#333] bg-white dark:bg-[#0a0a0a] p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-2xl">
          
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <Dialog.Title className="text-lg font-semibold leading-none tracking-tight text-black dark:text-white">
              Configure {service.title}
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-500 dark:text-[#888]">
              Provide details to get an accurate Philippine commission estimate.
            </Dialog.Description>
          </div>

          <div className="grid gap-5 py-4 max-h-[60vh] overflow-y-auto px-1 custom-scrollbar">
            
            {/* Web Dev */}
            {service.id === 'web-dev' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-[13px] font-medium text-black dark:text-white leading-tight">Total Pages</label>
                  <div className="col-span-3">
                    <CustomInput type="number" min="1" value={details.pages || '3'} onChange={(e: any) => setDetails({...details, pages: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-[13px] font-medium text-black dark:text-white leading-tight">CMS / Blog</label>
                  <div className="col-span-3">
                    <Select 
                      value={details.cms || 'no'} 
                      onValueChange={(v) => setDetails({...details, cms: v})}
                      options={[{value: 'no', label: 'No (+₱0)'}, {value: 'yes', label: 'Yes (+₱5,000)'}]}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-[13px] font-medium text-black dark:text-white leading-tight">E-commerce</label>
                  <div className="col-span-3">
                    <Select 
                      value={details.ecommerce || 'no'} 
                      onValueChange={(v) => setDetails({...details, ecommerce: v})}
                      options={[{value: 'no', label: 'No (+₱0)'}, {value: 'yes', label: 'Yes (+₱8,000)'}]}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Landing Page */}
            {service.id === 'landing-page' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-[13px] font-medium text-black dark:text-white leading-tight">Copywriting</label>
                  <div className="col-span-3">
                    <Select 
                      value={details.copywriting || 'no'} 
                      onValueChange={(v) => setDetails({...details, copywriting: v})}
                      options={[{value: 'no', label: 'Provided by client'}, {value: 'yes', label: 'Write for me (+₱2,000)'}]}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-[13px] font-medium text-black dark:text-white leading-tight">Custom Graphics</label>
                  <div className="col-span-3">
                    <Select 
                      value={details.graphics || 'no'} 
                      onValueChange={(v) => setDetails({...details, graphics: v})}
                      options={[{value: 'no', label: 'Stock/Provided'}, {value: 'yes', label: 'Custom Graphics (+₱1,500)'}]}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Video Editing */}
            {service.id === 'video-editing' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-[13px] font-medium text-black dark:text-white leading-tight">Raw Footage (Mins)</label>
                  <div className="col-span-3">
                    <CustomInput type="number" min="1" value={details.footageLength || '10'} onChange={(e: any) => setDetails({...details, footageLength: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-[13px] font-medium text-black dark:text-white leading-tight">VFX & Motion</label>
                  <div className="col-span-3">
                    <Select 
                      value={details.vfx || 'no'} 
                      onValueChange={(v) => setDetails({...details, vfx: v})}
                      options={[{value: 'no', label: 'Standard Edits'}, {value: 'yes', label: 'Heavy FX (+₱2,000)'}]}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-[13px] font-medium text-black dark:text-white leading-tight">Rush Delivery</label>
                  <div className="col-span-3">
                    <Select 
                      value={details.rush || 'no'} 
                      onValueChange={(v) => setDetails({...details, rush: v})}
                      options={[{value: 'no', label: 'Standard (3-5 Days)'}, {value: 'yes', label: '24-48 Hours (+₱1,000)'}]}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Graphic Design */}
            {service.id === 'graphic-design' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-[13px] font-medium text-black dark:text-white leading-tight">Brand Guidelines</label>
                  <div className="col-span-3">
                    <Select 
                      value={details.guidelines || 'no'} 
                      onValueChange={(v) => setDetails({...details, guidelines: v})}
                      options={[{value: 'no', label: 'No (+₱0)'}, {value: 'yes', label: 'Yes (+₱4,000)'}]}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-[13px] font-medium text-black dark:text-white leading-tight">Social Media Kit</label>
                  <div className="col-span-3">
                    <Select 
                      value={details.socialKit || 'no'} 
                      onValueChange={(v) => setDetails({...details, socialKit: v})}
                      options={[{value: 'no', label: 'No (+₱0)'}, {value: 'yes', label: 'Yes (+₱2,000)'}]}
                    />
                  </div>
                </div>
              </>
            )}
            
            {/* Architectural */}
            {service.id === 'architectural' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-[13px] font-medium text-black dark:text-white leading-tight">Floor Area (SQM)</label>
                  <div className="col-span-3">
                    <CustomInput type="number" min="10" value={details.sqm || '100'} onChange={(e: any) => setDetails({...details, sqm: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-[13px] font-medium text-black dark:text-white leading-tight">3D Render Views</label>
                  <div className="col-span-3">
                    <CustomInput type="number" min="0" value={details.renders || '0'} onChange={(e: any) => setDetails({...details, renders: e.target.value})} />
                  </div>
                </div>
              </>
            )}
            
            {/* Engineering */}
            {service.id === 'engineering' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-[13px] font-medium text-black dark:text-white leading-tight">Discipline</label>
                  <div className="col-span-3">
                    <Select 
                      value={details.discipline || 'civil'} 
                      onValueChange={(v) => setDetails({...details, discipline: v})}
                      options={[
                        {value: 'civil', label: 'Civil & Structural'}, 
                        {value: 'mechanical', label: 'Mechanical (MEP)'},
                        {value: 'electrical', label: 'Electrical'},
                        {value: 'plumbing', label: 'Plumbing / Sanitary'}
                      ]}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-[13px] font-medium text-black dark:text-white leading-tight">Sign & Seal</label>
                  <div className="col-span-3">
                    <Select 
                      value={details.signSeal || 'no'} 
                      onValueChange={(v) => setDetails({...details, signSeal: v})}
                      options={[{value: 'no', label: 'Drafting Only'}, {value: 'yes', label: 'Licensed Sign & Seal (+₱5,000)'}]}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Virtual Assistant */}
            {service.id === 'va' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-[13px] font-medium text-black dark:text-white leading-tight">Hours per Week</label>
                  <div className="col-span-3">
                    <CustomInput type="number" min="5" value={details.hours || '10'} onChange={(e: any) => setDetails({...details, hours: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-[13px] font-medium text-black dark:text-white leading-tight">Specialized Tasks</label>
                  <div className="col-span-3">
                    <Select 
                      value={details.specialized || 'no'} 
                      onValueChange={(v) => setDetails({...details, specialized: v})}
                      options={[{value: 'no', label: 'Admin & Emails (Base Rate)'}, {value: 'yes', label: 'Bookkeeping/Technical (+₱150/hr)'}]}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Project Management */}
            {service.id === 'project-management' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-[13px] font-medium text-black dark:text-white leading-tight">Team Size</label>
                  <div className="col-span-3">
                    <CustomInput type="number" min="1" value={details.teamSize || '5'} onChange={(e: any) => setDetails({...details, teamSize: e.target.value})} />
                  </div>
                </div>
              </>
            )}

            {service.id === 'custom' && (
              <div className="grid grid-cols-4 items-start gap-4">
                <label className="text-right text-[13px] font-medium text-black dark:text-white pt-2 leading-tight">Describe</label>
                <div className="col-span-3">
                  <CustomInput type="textarea" rows={4} value={details.description || ''} onChange={(e: any) => setDetails({...details, description: e.target.value})} placeholder="Tell us what you need..." />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-2 p-4 bg-gray-50 dark:bg-[#111] rounded-xl border border-gray-100 dark:border-[#222]">
            <div className="flex items-center text-sm font-medium text-gray-500">
              <Calculator className="w-4 h-4 mr-2" /> 
              {service.id === 'va' ? 'Est. Weekly Total' : 'Est. Project Total'}
            </div>
            <div className="text-xl font-semibold text-black dark:text-white">
              {service.id === 'custom' ? 'TBD' : `₱${estimatedPrice.toLocaleString()}`}
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 mt-4">
            <button onClick={onClose} className="mt-2 sm:mt-0 inline-flex h-11 items-center justify-center rounded-md border border-gray-300 dark:border-[#444] bg-transparent px-5 py-2 text-sm font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#222] focus:outline-none hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer">
              Cancel
            </button>
            <button onClick={handleSave} className="inline-flex h-11 items-center justify-center rounded-md bg-black dark:bg-white px-5 py-2 text-sm font-medium text-white dark:text-black hover:scale-[1.02] active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white cursor-pointer shadow-md">
              Add to Inquiry
            </button>
          </div>
          <Dialog.Close asChild>
            <button className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100 data-[state=open]:text-gray-500 cursor-pointer">
              <X className="h-4 w-4 text-black dark:text-white" />
              <span className="sr-only">Close</span>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
