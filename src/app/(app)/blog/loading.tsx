import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Newspaper } from "lucide-react";

const BlogPostCardSkeleton = () => (
  <Card className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg">
    <CardHeader className="p-0 relative">
      <Skeleton className="w-full h-56" />
    </CardHeader>
    <CardContent className="p-6 flex-grow space-y-3">
      <Skeleton className="h-4 w-1/4" /> {/* Category */}
      <Skeleton className="h-6 w-3/4" /> {/* Title */}
      <Skeleton className="h-4 w-full" /> {/* Excerpt line 1 */}
      <Skeleton className="h-4 w-5/6" /> {/* Excerpt line 2 */}
    </CardContent>
    <CardFooter className="p-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-center space-x-3">
        <Skeleton className="h-8 w-8 rounded-full" /> {/* Avatar */}
        <div className="space-y-1">
          <Skeleton className="h-3 w-24" /> {/* Author Name */}
          <Skeleton className="h-3 w-20" /> {/* Date */}
        </div>
      </div>
      <Skeleton className="h-8 w-24 rounded-md" /> {/* Read More Button */}
    </CardFooter>
  </Card>
);

export default function BlogLoading() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-10 md:mb-12">
        <Newspaper className="mx-auto h-12 w-12 text-primary mb-4" />
        <Skeleton className="h-10 w-3/4 mx-auto mb-3" /> {/* Title */}
        <Skeleton className="h-5 w-1/2 mx-auto" /> {/* Subtitle */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <BlogPostCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
