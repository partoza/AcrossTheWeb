"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface PreferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: { id: string; title: string; price: number } | null;
}

export function PreferenceModal({ isOpen, onClose, service }: PreferenceModalProps) {
  const { addItem, setIsCartOpen } = useCart();
  const [projectType, setProjectType] = useState("");
  const [timeline, setTimeline] = useState("");
  const [tier, setTier] = useState("");

  if (!service) return null;

  const handleAddToCart = () => {
    addItem({
      id: Math.random().toString(36).substr(2, 9),
      serviceName: service.title,
      price: service.price,
      preferences: {
        projectType: projectType || "Not specified",
        timeline: timeline || "Not specified",
        tier: tier || "Standard",
      }
    });
    onClose();
    // Reset state
    setProjectType("");
    setTimeline("");
    setTier("");
    setIsCartOpen(true);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <Dialog.Title className="text-lg font-semibold leading-none tracking-tight">
            Customize your Quote: {service.title}
          </Dialog.Title>
          <Dialog.Description className="text-sm text-muted-foreground">
            Please provide some details about your needs so we can give you an accurate estimate.
          </Dialog.Description>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="projectType" className="text-sm font-medium leading-none">Project Type / Scope</label>
              <select 
                id="projectType"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="" disabled>Select scope...</option>
                <option value="Small">Small / One-off</option>
                <option value="Medium">Medium / Standard</option>
                <option value="Large">Large / Complex</option>
              </select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="timeline" className="text-sm font-medium leading-none">Timeline</label>
              <select 
                id="timeline"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="" disabled>Select timeline...</option>
                <option value="Rush">Rush (1-3 days)</option>
                <option value="Standard">Standard (1-2 weeks)</option>
                <option value="Flexible">Flexible (1+ month)</option>
              </select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="tier" className="text-sm font-medium leading-none">Service Tier</label>
              <select 
                id="tier"
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="" disabled>Select tier...</option>
                <option value="Basic">Basic</option>
                <option value="Pro">Pro</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
          </div>
          
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <button
              onClick={onClose}
              className="mt-2 sm:mt-0 inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={handleAddToCart}
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Add to Inquiry
            </button>
          </div>

          <Dialog.Close asChild>
            <button
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
