"use client";
import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export function Navbar() {
  const { items, setIsCartOpen } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">AcrossTheWeb</span>
          </Link>
          <div className="hidden md:flex gap-4">
            <a href="#services" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Services</a>
            <a href="#support" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Support</a>
            <a href="#contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Contact</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground rounded-md"
          >
            <ShoppingCart className="h-5 w-5" />
            {items.length > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                {items.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
