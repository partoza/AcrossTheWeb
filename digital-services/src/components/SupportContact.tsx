"use client";
import React, { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, Mail, MapPin, Phone, Loader2 } from "lucide-react";

const faqs = [
  {
    question: "How does the pricing work?",
    answer: "Our pricing is tailored to your specific needs. The prices shown on the services are starting points. Once you request a quote, we will provide a detailed breakdown based on your project scope and timeline."
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

export function SupportContact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'rate-limited'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
        }),
      });

      if (res.status === 429) {
        setSubmitStatus('rate-limited');
        const retryAfter = res.headers.get('Retry-After');
        setErrorMessage(
          `Too many requests. Please try again in ${retryAfter ? `${Math.ceil(Number(retryAfter) / 60)} minutes` : 'a few minutes'}.`
        );
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      form.reset();
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Support & Contact</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions or need assistance? Check out our FAQ or reach out to us directly. We&apos;re here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div id="support">
            <h3 className="text-xl font-semibold mb-6">Frequently Asked Questions</h3>
            <Accordion.Root type="single" collapsible className="w-full space-y-2">
              {faqs.map((faq, index) => (
                <Accordion.Item key={index} value={`item-${index}`} className="border rounded-lg bg-background overflow-hidden">
                  <Accordion.Header className="flex">
                    <Accordion.Trigger className="flex flex-1 items-center justify-between py-4 px-5 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
                      {faq.question}
                      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="pb-4 pt-0 px-5 text-muted-foreground">
                      {faq.answer}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>

            <div className="mt-12 space-y-6">
              <h3 className="text-xl font-semibold">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>hello@acrosstheweb.com</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>123 Digital Way, Tech District</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background border rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-sm font-medium leading-none">Name</label>
                  <input id="contact-name" name="name" required maxLength={100} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-sm font-medium leading-none">Email</label>
                  <input id="contact-email" name="email" type="email" required maxLength={254} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-subject" className="text-sm font-medium leading-none">Subject</label>
                <input id="contact-subject" name="subject" required maxLength={200} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-sm font-medium leading-none">Message</label>
                <textarea id="contact-message" name="message" required maxLength={5000} className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none" />
              </div>

              {submitStatus === 'success' && (
                <div className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-md p-3">
                  Message sent successfully! We will get back to you shortly.
                </div>
              )}
              {(submitStatus === 'error' || submitStatus === 'rate-limited') && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground h-10 px-4 py-2 w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
