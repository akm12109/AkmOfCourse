import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { placeholderFaqs } from "@/lib/placeholder-data";
import type { FaqItem } from "@/types";
import { HelpCircle } from "lucide-react";

export default function FAQPage() {
  const faqs: FaqItem[] = placeholderFaqs;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-10 md:mb-12">
        <HelpCircle className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about Akm of course courses, our platform, and online learning.
        </p>
      </div>

      {faqs.length > 0 ? (
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index + 1}`} key={faq.id} className="border-b">
              <AccordionTrigger className="py-4 text-left text-lg hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pt-0 pb-4 text-base text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p className="text-center text-muted-foreground">No FAQs available at the moment.</p>
      )}

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-3">Can't find your answer?</h2>
        <p className="text-muted-foreground mb-4">
          Feel free to reach out to our support team for any further questions.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
