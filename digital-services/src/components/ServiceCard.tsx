import React from "react";
import { Check } from "lucide-react";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  onRequestQuote: (id: string, title: string, price: number) => void;
}

export function ServiceCard({ id, title, description, price, features, onRequestQuote }: ServiceCardProps) {
  return (
    <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow h-full">
      <div className="p-6 flex flex-col gap-2">
        <h3 className="font-semibold leading-none tracking-tight text-xl">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="p-6 pt-0 flex-1">
        <div className="text-3xl font-bold mb-6">${price}<span className="text-sm font-normal text-muted-foreground">/starting</span></div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 pt-0 mt-auto">
        <button
          onClick={() => onRequestQuote(id, title, price)}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
        >
          Request Quote
        </button>
      </div>
    </div>
  );
}
