
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, MessageSquare, User, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactUsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log({ name, email, subject, message }); // In a real app, send this data to a backend

    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    });

    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <header className="text-center mb-12 md:mb-16">
        <Mail className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Contact Us</h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Have questions, feedback, or partnership inquiries? We'd love to hear from you.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start max-w-5xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Send className="mr-3 h-6 w-6 text-primary" /> Send Us a Message
            </CardTitle>
            <CardDescription>Fill out the form and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="flex items-center mb-1">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" /> Your Name
                  </Label>
                  <Input id="name" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="email" className="flex items-center mb-1">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" /> Your Email
                  </Label>
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
              </div>
              <div>
                <Label htmlFor="subject" className="flex items-center mb-1">
                  <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" /> Subject
                </Label>
                <Input id="subject" type="text" placeholder="e.g., Course Inquiry, Feedback" value={subject} onChange={(e) => setSubject(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="message" className="flex items-center mb-1">
                  <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" /> Message
                </Label>
                <Textarea id="message" placeholder="Your message here..." rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required />
              </div>
              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-lg py-3" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                {isLoading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Other Ways to Reach Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                <strong>Email:</strong> <a href="mailto:support@akmofcourse.com" className="text-primary hover:underline">support@akmofcourse.com</a>
              </p>
              <p>
                <strong>Business Hours:</strong> Monday - Friday, 9 AM - 5 PM (Your Timezone)
              </p>
              <p>
                For quick answers, you might also find our <a href="/faq" className="text-primary hover:underline">FAQ page</a> helpful.
              </p>
               <p>
                Interested in a specific course topic we don't offer yet? <a href="/request-course" className="text-primary hover:underline">Request a new course!</a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
