
"use client"; 

import React, { useEffect, useState } from 'react'; // Explicitly import React for React.use
import Image from 'next/image';
import { getCourseById, getReviewsByCourseId } from '@/services/courseService';
import type { Course, Instructor, Review } from '@/types'; 
import { notFound, useRouter } from 'next/navigation'; 
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RatingStars from '@/components/shared/RatingStars';
import CurriculumSection from '@/components/courses/CurriculumSection';
import CourseReviewsList from '@/components/courses/CourseReviewsList';
import CourseReviewForm from '@/components/courses/CourseReviewForm';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, Clock, Users, BarChart3, Award, Download, Loader2 } from 'lucide-react'; 
import Link from 'next/link';
import { useCurrency } from '@/contexts/CurrencyContext'; 


export default function CoursePage({ params: paramsPromise }: { params: Promise<{ courseId: string }> }) {
  // Resolve the params promise using React.use()
  // This will suspend the component rendering until the promise resolves.
  const params = React.use(paramsPromise);
  const courseId = params.courseId; // Now params is the resolved object

  const [course, setCourse] = useState<Course | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]); 
  const [isLoading, setIsLoading] = useState(true); // For data fetching after params are resolved
  const { formatPrice } = useCurrency(); 
  const router = useRouter();

  useEffect(() => {
    // By the time useEffect runs, courseId is a resolved value.
    const fetchCourseData = async () => {
      setIsLoading(true);
      try {
        const fetchedCourse = await getCourseById(courseId);
        if (!fetchedCourse) {
          notFound();
          return;
        }
        setCourse(fetchedCourse);
        const fetchedReviews = await getReviewsByCourseId(courseId);
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Failed to fetch course data:", error);
        // Potentially set an error state here to display to the user or rely on notFound()
      }
      setIsLoading(false);
    };

    if (courseId) { // Ensure courseId is available
      fetchCourseData();
    }
  }, [courseId]); // Depend on the resolved courseId

  const handleReviewSubmitted = async () => {
    if(course){ // courseId should be used if course object might not be up-to-date
        const updatedReviews = await getReviewsByCourseId(courseId);
        setReviews(updatedReviews);
        const updatedCourse = await getCourseById(courseId); // Re-fetch course to get updated rating/review count
        if (updatedCourse) setCourse(updatedCourse);
    }
  };

  // The page-level loading.tsx handles suspense for params resolution (due to React.use).
  // This isLoading state is for the subsequent data fetching.
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading course details...</p>
      </div>
    );
  }

  if (!course) {
    // This case is hit if getCourseById returned null (handled by notFound() in effect)
    // or if there was an error during fetchCourseData that didn't call notFound().
    // notFound() in useEffect should typically prevent reaching here if course doesn't exist.
    return <p className="text-center text-destructive text-lg py-10">Course not found or error loading details.</p>;
  }
  
  const instructor: Instructor | undefined = course.instructorBio || 
    (course.instructorName ? { 
        id: `inst-${course.instructorName.toLowerCase().replace(/\s+/g, '-')}`,
        name: course.instructorName, 
        avatarUrl: course.instructorBio?.avatarUrl || `https://picsum.photos/seed/${course.instructorName.split(' ')[0] || 'instructor'}/100/100`,
        bio: course.instructorBio?.bio || 'Experienced instructor.',
        coursesCount: course.instructorBio?.coursesCount,
        studentsCount: course.instructorBio?.studentsCount
    } : undefined);

  return (
    <div className="bg-secondary/30">
      <section className="bg-gradient-to-r from-primary/80 via-primary/70 to-accent/70 text-primary-foreground py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg md:text-xl mb-6 opacity-90">{course.shortDescription}</p>
            <div className="flex items-center mb-2 justify-center md:justify-start">
              <RatingStars rating={course.rating} reviewCount={course.reviewsCount} starSize={20} showText className="text-lg" />
            </div>
            {instructor && (
              <p className="text-sm mb-1">Created by <Link href={`/instructors/${instructor.id}`} className="font-semibold hover:underline">{instructor.name}</Link></p>
            )}
            <div className="flex items-center space-x-4 text-sm opacity-80 justify-center md:justify-start">
              {course.duration && <span><Clock className="inline mr-1 h-4 w-4" /> {course.duration}</span>}
              {course.lessonsCount && <span><BarChart3 className="inline mr-1 h-4 w-4" /> {course.lessonsCount} lessons</span>}
              <span><Users className="inline mr-1 h-4 w-4" /> {(course.studentsEnrolled || 0).toLocaleString()} students</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="lg:flex lg:gap-8">
          <div className="lg:w-2/3 space-y-8">
            {course.whatYoullLearn && course.whatYoullLearn.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">What you'll learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    {course.whatYoullLearn.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            <Card>
                <CardHeader><CardTitle className="text-2xl">Full Description</CardTitle></CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground/90">
                    <p>{course.description}</p>
                </CardContent>
            </Card>
            
            {typeof course.curriculum === 'string' ? (
                <Card>
                    <CardHeader><CardTitle className="text-2xl">Course Content (Simplified)</CardTitle></CardHeader>
                    <CardContent className="prose prose-sm max-w-none text-foreground/90 whitespace-pre-line">
                        {course.curriculum}
                    </CardContent>
                </Card>
            ) : course.curriculum && Array.isArray(course.curriculum) && course.curriculum.length > 0 ? (
                <CurriculumSection curriculum={course.curriculum} />
            ) : null}


            {course.requirements && course.requirements.length > 0 && (
                 <Card>
                    <CardHeader><CardTitle className="text-2xl">Requirements</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-1 text-sm text-foreground/90">
                            {course.requirements.map((req, index) => <li key={index}>{req}</li>)}
                        </ul>
                    </CardContent>
                </Card>
            )}
            
            {instructor && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">About the Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={instructor.avatarUrl} alt={instructor.name} data-ai-hint="instructor portrait"/>
                      <AvatarFallback>{instructor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-xl font-semibold text-primary hover:underline">
                        <Link href={`/instructors/${instructor.id}`}>{instructor.name}</Link>
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">Lead Instructor</p> 
                      <p className="text-sm text-foreground/90 mb-2">{instructor.bio}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        {instructor.coursesCount && <span><Award className="inline mr-1 h-4 w-4" /> {instructor.coursesCount} Courses</span>}
                        {instructor.studentsCount && <span><Users className="inline mr-1 h-4 w-4" /> {instructor.studentsCount.toLocaleString()} Students</span>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <CourseReviewsList reviews={reviews} />
            <CourseReviewForm courseId={course.id} onSubmitSuccess={handleReviewSubmitted} />
          </div>

          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <Card className="sticky top-24 shadow-xl">
              <CardHeader className="p-0 relative">
                <Image
                  src={course.imageUrl}
                  alt={course.title}
                  width={600}
                  height={350}
                  className="w-full h-56 object-cover rounded-t-lg"
                  data-ai-hint={course.dataAiHint || "course thumbnail"}
                />
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-primary">{formatPrice(course.price)}</p>
                    {course.originalPrice && (
                        <p className="text-lg text-muted-foreground line-through">{formatPrice(course.originalPrice)}</p>
                    )}
                </div>
                {course.originalPrice && course.price < course.originalPrice && (
                    <p className="text-sm text-accent font-semibold">
                        {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% off - Limited time!
                    </p>
                )}
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-lg py-3" asChild>
                  <Link href={`/checkout/${course.id}`}>Enroll Now</Link>
                </Button>
                <p className="text-xs text-muted-foreground text-center">30-Day Money-Back Guarantee</p>
                
                <div className="space-y-2 pt-4 border-t">
                    <h4 className="font-semibold text-sm">This course includes:</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                        {course.duration && <li className="flex items-center"><Clock className="h-3 w-3 mr-2 text-primary"/>{course.duration} on-demand video</li>}
                        {course.lessonsCount && <li className="flex items-center"><BarChart3 className="h-3 w-3 mr-2 text-primary"/>{course.lessonsCount} lessons</li>}
                        <li className="flex items-center"><Download className="h-3 w-3 mr-2 text-primary"/>Downloadable resources</li>
                        <li className="flex items-center"><Award className="h-3 w-3 mr-2 text-primary"/>Certificate of completion</li>
                    </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
