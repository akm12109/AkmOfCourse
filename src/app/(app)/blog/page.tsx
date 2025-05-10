
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';
import { ArrowRight, Newspaper } from 'lucide-react';
import type { BlogPost } from '@/types';
import { getBlogPosts } from '@/services/blogService'; 
import { cn } from '@/lib/utils';

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <Card className={cn(
        "flex flex-col h-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out",
        "hover:scale-[1.03]" 
      )}>
      <Link href={`/blog/${post.slug}`} className="block">
        <CardHeader className="p-0 relative">
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={800}
            height={500}
            className="w-full h-56 object-cover"
            data-ai-hint={post.dataAiHint || "blog abstract technology"}
          />
        </CardHeader>
      </Link>
      <CardContent className="p-6 flex-grow">
        {post.category && (
          <p className="text-xs text-primary font-semibold uppercase tracking-wide mb-1">{post.category}</p>
        )}
        <Link href={`/blog/${post.slug}`} className="block">
          <CardTitle className="text-xl font-semibold mb-2 leading-tight hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="p-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            {post.author.avatarUrl && <AvatarImage src={post.author.avatarUrl} alt={post.author.name} data-ai-hint="author avatar" />}
            <AvatarFallback>{post.author.name.substring(0, 1)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs font-medium text-foreground">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">
              {format(parseISO(post.createdAt as string), 'MMMM d, yyyy')}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" asChild className="mt-2 sm:mt-0">
          <Link href={`/blog/${post.slug}`}>
            Read More <ArrowRight className="ml-1.5 h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};


export default async function BlogPage() {
  const posts: BlogPost[] = await getBlogPosts(); 

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-10 md:mb-12">
        <Newspaper className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tight">Akm of course Blog</h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay updated with the latest news, tutorials, and insights on various technologies and skills.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No blog posts available yet. Check back soon!</p>
      )}
    </div>
  );
}
