
import CourseCard from '@/components/courses/CourseCard';
import { HomepageSlideshow } from '@/components/home/HomepageSlideshow';
import AdScripts from '@/components/home/AdScripts'; // Import the new component
import { getFeaturedCourses, getLatestCourses } from '@/services/courseService';
import type { Course } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Helper component for loading skeleton (kept here for direct use on this page)
const CourseCardSkeleton = () => (
  <Card className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg">
    <Skeleton className="h-48 w-full" />
    <CardContent className="p-4 flex-grow space-y-2">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </CardContent>
    <CardFooter className="p-4 border-t flex justify-between items-center">
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-8 w-24" />
    </CardFooter>
  </Card>
);


export default async function HomePage() {
  // Fetch courses in parallel
  const [featuredCourses, latestCourses] = await Promise.all([
    getFeaturedCourses(4),
    getLatestCourses(4)
  ]);

  return (
    <>
      <AdScripts /> {/* Use the new Client Component for scripts */}

      <div className="flex flex-col">
        <HomepageSlideshow />

        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Featured Courses</h2>
              <Button variant="outline" asChild>
                <Link href="/courses">
                  View All Courses <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            {featuredCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(4)].map((_,i) => <CourseCardSkeleton key={`feat_skel_${i}`} />)}
               </div>
            )}
             {!featuredCourses.length && <p className="mt-4 text-center text-muted-foreground">No featured courses available at the moment. Check back soon!</p>}
          </div>
        </section>

         <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Latest Courses</h2>
               <Button variant="outline" asChild>
                <Link href="/courses?sort=newest">
                  View All Courses <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            {latestCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {latestCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(4)].map((_,i) => <CourseCardSkeleton key={`latest_skel_${i}`} />)}
              </div>
            )}
            {!latestCourses.length && <p className="mt-4 text-center text-muted-foreground">No new courses available at the moment. Check back soon!</p>}
          </div>
        </section>

        {/* Adsterra Container Div remains here as it's just markup */}
        <div className="container mx-auto px-4 py-8">
          <div id="container-0d34bfa184002fad5912558643501f63"></div>
        </div>

        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose Akm of course?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              We provide high-quality, up-to-date courses taught by industry experts to help you master new skills and achieve your creative or professional goals.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-card rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
                <p className="text-muted-foreground">Learn from seasoned professionals with real-world experience in diverse fields.</p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <h3 className="text-xl font-semibold mb-2">Comprehensive Curriculum</h3>
                <p className="text-muted-foreground">Covering everything from beginner basics to advanced techniques across various subjects.</p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <h3 className="text-xl font-semibold mb-2">Community Support</h3>
                <p className="text-muted-foreground">Join a vibrant community of learners and creators to share knowledge and grow together.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
