"use client";

import { useState, useEffect } from 'react';
import type { Review } from '@/types';
import { getCourses, getReviewsByCourseId } from '@/services/courseService'; 
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Trash2, Loader2 } from 'lucide-react'; // Removed Star, MessageSquare as not directly used for skeleton
import { useToast } from '@/hooks/use-toast';
import RatingStars from '@/components/shared/RatingStars';
import { formatDistanceToNow } from 'date-fns';
// import { Badge } from '@/components/ui/badge'; // Not used
import { Skeleton } from '@/components/ui/skeleton'; // Added Skeleton

async function deleteReviewById(reviewId: string, courseId: string): Promise<void> {
    console.warn(`deleteReviewById(${reviewId}, ${courseId}) called - full implementation needed in reviewService or as a cloud function.`);
    throw new Error("Full review deletion with rating recalculation is not implemented on client-side for this demo.");
}

const ReviewCardSkeleton = () => (
  <Card className="shadow-sm">
    <CardHeader className="pb-3">
      <div className="flex justify-between items-start">
        <div>
          <Skeleton className="h-6 w-32 mb-1" /> {/* User Name */}
          <Skeleton className="h-4 w-40" /> {/* Course Link */}
        </div>
        <Skeleton className="h-8 w-8 rounded-md" /> {/* Delete Button */}
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex items-center mb-2">
        <Skeleton className="h-5 w-24" /> {/* Rating Stars */}
        <Skeleton className="h-3 w-20 ml-auto" /> {/* Time ago */}
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6 mt-1" />
    </CardContent>
  </Card>
);

export default function ManageReviewsPage() {
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const fetchAllReviewsData = async () => {
    setIsLoading(true);
    try {
      const courses = await getCourses();
      let reviews: Review[] = [];
      for (const course of courses) {
        const courseReviews = await getReviewsByCourseId(course.id);
        reviews = reviews.concat(courseReviews.map(r => ({...r, courseTitle: course.title}))); // Add courseTitle for context
      }
      reviews.sort((a, b) => new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime());
      setAllReviews(reviews);
    } catch (error) {
      toast({ title: "Error fetching reviews", description: (error as Error).message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllReviewsData();
  }, []);

  const handleDeleteReview = async () => {
    if (!reviewToDelete) return;
    setIsDeleting(true);
    try {
      await deleteReviewById(reviewToDelete.id, reviewToDelete.courseId); 
      toast({ title: "Deletion Not Implemented", description: "Full review deletion with rating update is a backend task.", variant: "default"});
    } catch (error) {
      toast({ title: "Error Deleting Review", description: (error as Error).message, variant: "destructive" });
    } finally {
      setIsDeleting(false);
      setReviewToDelete(null); 
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage All Reviews ({isLoading ? '...' : allReviews.length})</h1>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => <ReviewCardSkeleton key={i} />)}
        </div>
      ) : allReviews.length === 0 ? (
        <p className="text-center text-muted-foreground text-lg py-10">No reviews found across all courses.</p>
      ) : (
        <div className="space-y-6">
          {allReviews.map(review => (
            <Card key={review.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg">{review.userName}</CardTitle>
                        <CardDescription>
                            For course: <Link href={`/courses/${review.courseId}`} target="_blank" className="text-primary hover:underline">{(review as any).courseTitle || review.courseId.substring(0,10)+"..."}</Link>
                        </CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setReviewToDelete(review)} className="text-destructive hover:text-destructive/80">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-2">
                  <RatingStars rating={review.rating} starSize={16} />
                  <span className="ml-auto text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(review.createdAt as string | Date), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

       {reviewToDelete && (
        <AlertDialog open={!!reviewToDelete} onOpenChange={() => setReviewToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete this review?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Deleting review by "{reviewToDelete.userName}".
                <br />
                <strong className="text-destructive">Note:</strong> Full review deletion including recalculation of course ratings is a complex operation, typically handled by backend logic or a Cloud Function. This demo might only visually remove it or show an error.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setReviewToDelete(null)} disabled={isDeleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteReview} 
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                disabled={isDeleting}
              >
                {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isDeleting ? "Deleting..." : "Yes, delete review"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
