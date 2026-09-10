"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Trash2, Loader2, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeItem, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, items }),
      });
      
      if (!res.ok) throw new Error("Failed to send request.");
      
      setSuccess(true);
      clearCart();
    } catch (err) {
      console.error(err);
      setError("An error occurred while submitting your request.");
    } finally {
      setLoading(false);
    }
  };

  const closeCart = () => {
    setIsCartOpen(false);
    setTimeout(() => {
      setIsCheckingOut(false);
      setSuccess(false);
    }, 200);
  };

  return (
    <Dialog.Root open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 h-full w-full sm:max-w-md border-l bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:rounded-l-xl flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-semibold tracking-tight">
              Inquiry Builder
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </button>
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4">
            {success ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-2">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Request Sent!</h3>
                <p className="text-muted-foreground">We have received your quotation request and will get back to you shortly.</p>
                <button
                  onClick={closeCart}
                  className="mt-4 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Close
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <p>Your inquiry cart is empty.</p>
              </div>
            ) : !isCheckingOut ? (
              <>
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 border rounded-lg p-4 bg-card shadow-sm">
                    <div className="flex-1">
                      <h4 className="font-medium leading-none">{item.serviceName}</h4>
                      <p className="text-sm font-semibold mt-1">${item.price}+</p>
                      <div className="mt-2 text-xs text-muted-foreground space-y-1">
                        <p><span className="font-medium">Type:</span> {item.preferences.projectType}</p>
                        <p><span className="font-medium">Timeline:</span> {item.preferences.timeline}</p>
                        <p><span className="font-medium">Tier:</span> {item.preferences.tier}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors self-start p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </>
            ) : (
              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Please provide your contact information. We will send a detailed quotation to your email.
                </p>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium leading-none">Full Name</label>
                  <input
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium leading-none">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
              </form>
            )}
          </div>

          {!success && items.length > 0 && (
            <div className="mt-6 border-t pt-4 space-y-4">
              {!isCheckingOut ? (
                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Proceed to Request Quotation
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    disabled={loading}
                    className="flex-1 inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={loading}
                    className="flex-[2] inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {loading ? "Sending..." : "Submit Request"}
                  </button>
                </div>
              )}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
