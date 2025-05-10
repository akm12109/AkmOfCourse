
import { LifeBuoy, Search, Mail, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { placeholderFaqs } from '@/lib/placeholder-data'; 

export default function SupportCenterPage() {
  const faqs = placeholderFaqs.slice(0, 3); // Show a few FAQs

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <header className="text-center mb-12 md:mb-16">
        <LifeBuoy className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Support Center</h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Welcome to the Akm of course Support Center. We're here to help you get the most out of our platform.
        </p>
      </header>

      <section className="mb-12 md:mb-16 max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">How can we help you today?</h2>
        <div className="relative">
          <Input
            type="search"
            placeholder="Search help articles, FAQs..."
            className="h-12 pl-12 text-base"
          />
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </div>
         <p className="text-center mt-4 text-sm text-muted-foreground">
            (Search functionality is a placeholder for future implementation)
        </p>
      </section>

      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">Popular Topics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">Account & Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li><Link href="/faq#account" className="text-primary hover:underline">Updating your profile</Link></li>
                <li><Link href="/faq#password" className="text-primary hover:underline">Password recovery</Link></li>
                <li><Link href="/faq#notifications" className="text-primary hover:underline">Notification settings</Link></li>
              </ul>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">Course Enrollment</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li><Link href="/faq#enroll" className="text-primary hover:underline">How to enroll in a course</Link></li>
                <li><Link href="/faq#access" className="text-primary hover:underline">Lifetime access details</Link></li>
                <li><Link href="/faq#certificates" className="text-primary hover:underline">Certificates of completion</Link></li>
              </ul>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">Payment & Billing</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li><Link href="/faq#payment" className="text-primary hover:underline">Accepted payment methods</Link></li>
                <li><Link href="/faq#refund" className="text-primary hover:underline">Refund policy</Link></li>
                <li><Link href="/faq#invoice" className="text-primary hover:underline">Finding your invoices</Link></li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12 md:mb-16 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
        {faqs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
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
        <div className="text-center mt-6">
          <Link href="/faq" className="text-primary hover:underline font-medium">
            View All FAQs &rarr;
          </Link>
        </div>
      </section>

      <section className="text-center bg-secondary/30 py-12 rounded-lg">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Still Need Help?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          If you couldn't find the answer you were looking for, please don't hesitate to contact our support team directly.
        </p>
        <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-lg py-3">
          <Link href="/contact">
            <Mail className="mr-2 h-5 w-5" /> Contact Support
          </Link>
        </Button>
      </section>
    </div>
  );
}
