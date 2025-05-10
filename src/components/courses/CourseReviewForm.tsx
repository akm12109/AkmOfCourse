
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RatingStarsInteractive from "@/components/shared/RatingStarsInteractive";
import { useToast } from "@/hooks/use-toast";
import { addReview } from "@/services/courseService";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; // Added Loader2 import


interface CourseReviewFormProps {
  courseId: string;
  onSubmitSuccess?: () => void; 
}

const CourseReviewForm: React.FC<CourseReviewFormProps> = ({ courseId, onSubmitSuccess }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      toast({ title: "Name Required", description: "Please enter your name.", variant: "destructive" });
      return;
    }
    if (rating === 0) {
      toast({ title: "Rating Required", description: "Please select a star rating.", variant: "destructive" });
      return;
    }
    if (comment.trim().length < 10) {
      toast({ title: "Comment Too Short", description: "Please provide a comment of at least 10 characters.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    
    try {
      await addReview(courseId, { rating, comment, userName });
      toast({ title: "Review Submitted!", description: "Thank you for your feedback." });
      setRating(0);
      setComment("");
      setUserName("");
      onSubmitSuccess?.();
      router.refresh(); 
    } catch (error) {
      toast({ title: "Error Submitting Review", description: (error as Error).message || "Could not submit review.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-lg bg-card shadow-sm">
      <h3 className="text-xl font-semibold">Leave a Review</h3>
      <div>
        <Label htmlFor="userName" className="font-medium">Your Name</Label>
        <Input 
          id="userName" 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
          className="mt-1"
          maxLength={50}
          required
        />
      </div>
      <div>
        <Label htmlFor="rating" className="mb-1 block font-medium">Your Rating</Label>
        <RatingStarsInteractive rating={rating} setRating={setRating} starSize={28} />
      </div>
      <div>
        <Label htmlFor="comment" className="font-medium">Your Comment</Label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about the course..."
          rows={4}
          className="mt-1"
          maxLength={1000}
          required
        />
        <p className="text-xs text-muted-foreground mt-1">{comment.length}/1000</p>
      </div>
      <Button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-primary hover:bg-primary/90">
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isLoading ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
};

export default CourseReviewForm;

