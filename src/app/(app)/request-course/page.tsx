
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { addCourseRequest } from "@/services/courseService";
import { FileQuestion, Loader2 } from "lucide-react";

export default function RequestCoursePage() {
  const [courseTitle, setCourseTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addCourseRequest({ courseTitle, description, email });
      toast({
        title: "Request Submitted!",
        description: "Thank you for your course suggestion. We'll review it shortly.",
      });
      setCourseTitle("");
      setDescription("");
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message || "Failed to submit course request.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-10">
        <FileQuestion className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tight">Request a Course</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          Have a specific topic you'd like to learn on Akm of course? Let us know!
        </p>
      </header>

      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Submit Your Course Idea</CardTitle>
          <CardDescription>
            Fill in the details below. If we create a course based on your suggestion, we might reach out!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="courseTitle">Suggested Course Title</Label>
              <Input
                id="courseTitle"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="e.g., Advanced AI for Robotics, SwiftUI for Beginners"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe what you'd like to see in this course..."
                rows={4}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Your Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
              <p className="text-xs text-muted-foreground">
                We'll use this to contact you if your suggestion is selected or if we need more details.
              </p>
            </div>

            <Button type="submit" size="lg" className="w-full md:w-auto md:ml-auto mt-2 bg-primary hover:bg-primary/90" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
