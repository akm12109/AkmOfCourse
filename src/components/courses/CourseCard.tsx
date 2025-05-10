
"use client"; // Make this a client component to use the hook

import Image from 'next/image';
import Link from 'next/link';
import type { Course } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import RatingStars from '@/components/shared/RatingStars';
import { Users, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCurrency } from '@/contexts/CurrencyContext'; // Import useCurrency

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { formatPrice } = useCurrency(); // Use the currency context

  return (
    <Card className={cn(
        "flex flex-col h-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out",
        "hover:scale-[1.03]"
      )}>
      <Link href={`/courses/${course.id}`} className="block">
        <CardHeader className="p-0 relative">
          <Image
            src={course.imageUrl}
            alt={course.title}
            width={600}
            height={400}
            className="w-full h-48 object-cover"
            data-ai-hint={course.dataAiHint || "online course"}
          />
          {course.isFeatured && (
            <Badge variant="default" className="absolute top-2 right-2 bg-accent text-accent-foreground">Featured</Badge>
          )}
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-grow">
        <Link href={`/courses/${course.id}`} className="block">
          <CardTitle className="text-lg font-semibold mb-1 leading-tight hover:text-primary transition-colors">
            {course.title}
          </CardTitle>
        </Link>
        <p className="text-xs text-muted-foreground mb-2">By {course.instructorName}</p>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.shortDescription}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <div className="flex items-center gap-1">
                <BarChart3 className="w-3 h-3" />
                <span>{course.skillLevel}</span>
            </div>
            
            <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{(course.studentsEnrolled || 0).toLocaleString()}</span>
            </div>
            
        </div>
        <RatingStars rating={course.rating} reviewCount={course.reviewsCount} starSize={14} showText />
      </CardContent>
      <CardFooter className="p-4 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <p className="text-xl font-bold text-primary">{formatPrice(course.price)}</p>
          {course.originalPrice && course.price < course.originalPrice && (
            <p className="text-sm text-muted-foreground line-through">{formatPrice(course.originalPrice)}</p>
          )}
        </div>
        <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90">
          <Link href={`/courses/${course.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
