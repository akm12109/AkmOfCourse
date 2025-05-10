import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Clock, Users, BarChart3, Award, Download } from 'lucide-react';

export default function CourseDetailLoading() {
  return (
    <div className="bg-secondary/30">
      <section className="bg-gradient-to-r from-primary/80 via-primary/70 to-accent/70 text-primary-foreground py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center md:text-left">
            <Skeleton className="h-10 md:h-12 lg:h-14 w-3/4 md:w-full mb-4" /> {/* Title */}
            <Skeleton className="h-6 w-full md:w-5/6 mb-6" /> {/* Short Description */}
            <Skeleton className="h-5 w-32 mb-2 mx-auto md:mx-0" /> {/* Rating */}
            <Skeleton className="h-4 w-48 mb-1 mx-auto md:mx-0" /> {/* Instructor */}
            <div className="flex items-center space-x-4 text-sm opacity-80 justify-center md:justify-start">
              <Skeleton className="h-4 w-20" /> {/* Duration */}
              <Skeleton className="h-4 w-24" /> {/* Lessons */}
              <Skeleton className="h-4 w-28" /> {/* Students */}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="lg:flex lg:gap-8">
          {/* Main Content Area */}
          <div className="lg:w-2/3 space-y-8">
            {/* What you'll learn */}
            <Skeleton className="h-64 w-full rounded-lg" />
            
            {/* Full Description */}
            <Skeleton className="h-40 w-full rounded-lg" />

            {/* Curriculum */}
            <Skeleton className="h-80 w-full rounded-lg" />
            
            {/* Requirements */}
            <Skeleton className="h-32 w-full rounded-lg" />

            {/* Instructor */}
            <Skeleton className="h-48 w-full rounded-lg" />

            {/* Reviews List & Form */}
            <Skeleton className="h-72 w-full rounded-lg" />
            <Skeleton className="h-56 w-full rounded-lg" />
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="sticky top-24 shadow-xl bg-card rounded-lg">
              <Skeleton className="w-full h-56 rounded-t-lg" /> {/* Image */}
              <div className="p-6 space-y-4">
                <Skeleton className="h-10 w-1/2" /> {/* Price */}
                <Skeleton className="h-4 w-1/3 mb-2" /> {/* Discount text */}
                <Skeleton className="h-12 w-full rounded-md" /> {/* Enroll Button */}
                <Skeleton className="h-3 w-1/2 mx-auto" /> {/* Guarantee text */}
                
                <div className="space-y-2 pt-4 border-t">
                    <Skeleton className="h-4 w-1/3 mb-2" /> {/* This course includes title */}
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-5/6" />
                    <Skeleton className="h-3 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
