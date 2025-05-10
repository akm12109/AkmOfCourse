
"use client";

import { useState, useEffect } from 'react';
import { getCourseById, incrementEnrollment } from '@/services/courseService';
import type { Course } from '@/types';
import { useParams, notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Loader2, User, Mail, Phone as PhoneIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCurrency } from '@/contexts/CurrencyContext'; 

export default function CheckoutPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const router = useRouter();
  const { toast } = useToast();
  const { formatPrice, selectedCurrency } = useCurrency(); 

  const [course, setCourse] = useState<Course | null>(null);
  const [isLoadingCourse, setIsLoadingCourse] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (courseId) {
      const fetchCourse = async () => {
        setIsLoadingCourse(true);
        const fetchedCourse = await getCourseById(courseId);
        if (!fetchedCourse) {
          notFound();
        }
        setCourse(fetchedCourse);
        setIsLoadingCourse(false);
      };
      fetchCourse();
    }
  }, [courseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course || !name || !email || !phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const formattedCoursePrice = formatPrice(course.price); 

    const message = `Hi, I'm interested in enrolling in the course:
Title: ${course.title}
Price: ${formattedCoursePrice} (${selectedCurrency.code})

My Details:
Name: ${name}
Email: ${email}
Phone: ${phone}

Please guide me on the next steps.`;

    const whatsappUrl = `https://wa.me/916202326183?text=${encodeURIComponent(message)}`;

    try {
      await incrementEnrollment(course.id);
      toast({
        title: "Enrollment Initiated!",
        description: "Redirecting to WhatsApp to complete your enrollment.",
      });
      window.open(whatsappUrl, '_blank');
      setTimeout(() => {
        router.push(`/courses/${course.id}`);
      }, 3000);

    } catch (error) {
      console.error("Error during enrollment process:", error);
      toast({
        title: "Enrollment Failed",
        description: "Could not update enrollment count. Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingCourse) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!course) {
    return notFound(); 
  }
  
  const displayPrice = formatPrice(course.price);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Enroll in Course</h1>
        <p className="mt-2 text-lg text-muted-foreground">Confirm your details to proceed with enrollment.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-5xl mx-auto">
        <div className="lg:w-2/5 order-last lg:order-first">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Course Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Image
                  src={course.imageUrl}
                  alt={course.title}
                  width={120}
                  height={80}
                  className="rounded-md object-cover aspect-[3/2]"
                  data-ai-hint={course.dataAiHint || "course image"}
                />
                <div>
                  <h3 className="font-semibold leading-tight">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">By {course.instructorName}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-1 text-sm">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Price</span>
                  <span>{displayPrice}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
                <p className="text-xs text-muted-foreground text-center w-full">
                    You will be redirected to WhatsApp to finalize your enrollment.
                </p>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:w-3/5">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Your Details</CardTitle>
              <CardDescription>Please provide your information to enroll.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="flex items-center"><User className="w-4 h-4 mr-2 text-muted-foreground" />Full Name</Label>
                  <Input id="name" placeholder="John M. Doe" required className="mt-1" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="email" className="flex items-center"><Mail className="w-4 h-4 mr-2 text-muted-foreground" />Email Address</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required className="mt-1" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="phone" className="flex items-center"><PhoneIcon className="w-4 h-4 mr-2 text-muted-foreground" />Phone Number (with country code)</Label>
                  <Input id="phone" type="tel" placeholder="+919876543210" required className="mt-1" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                
                <Button type="submit" size="lg" className="w-full mt-4 bg-primary hover:bg-primary/90 text-lg py-3" disabled={isSubmitting || isLoadingCourse}>
                  {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                  {isSubmitting ? "Processing..." : `Enroll Now & Pay ${displayPrice}`}
                </Button>
              </form>
            </CardContent>
             <CardFooter>
                <p className="text-xs text-muted-foreground text-center w-full">
                    By clicking "Enroll Now", your details will be sent via WhatsApp for enrollment processing.
                </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
