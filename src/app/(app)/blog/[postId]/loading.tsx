import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, UserCircle, Tag } from 'lucide-react';

export default function BlogPostLoading() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      <article className="prose prose-lg dark:prose-invert max-w-none mx-auto bg-card p-6 sm:p-8 md:p-10 rounded-xl shadow-xl">
        <header className="mb-8">
          <Skeleton className="h-4 w-1/4 mb-2" /> {/* Category */}
          <Skeleton className="h-10 w-full mb-4" /> {/* Title */}
          <Skeleton className="h-8 w-3/4" /> {/* Sub-Title/Large Title part 2 */}
          
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" /> {/* Avatar */}
              <Skeleton className="h-4 w-24" /> {/* Author Name */}
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <Skeleton className="h-4 w-20" /> {/* Date */}
            </div>
          </div>
        </header>

        <Skeleton className="my-8 rounded-lg w-full aspect-video" /> {/* Image Placeholder */}
        
        <div className="space-y-4">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
          <Skeleton className="h-5 w-full" />
          <br />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
        </div>

        <footer className="mt-10 pt-6 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span>Tags:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>
        </footer>
      </article>

      <div className="mt-12 text-center">
         <Skeleton className="h-5 w-32 mx-auto" /> {/* Back to Blog Link */}
      </div>
    </div>
  );
}
