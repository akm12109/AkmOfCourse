
import type { BlogPost } from '@/types';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format, parseISO } from 'date-fns';
import { CalendarDays, UserCircle, Tag } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { getBlogPostBySlug, getBlogPosts } from '@/services/blogService'; 

export async function generateStaticParams() {
  const posts = await getBlogPosts(); 
  return posts.map(post => ({
    postId: post.slug, 
  }));
}

export default async function BlogPostPage({ params }: { params: { postId: string } }) { 
  const post = await getBlogPostBySlug(params.postId);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      <article className="prose prose-lg dark:prose-invert max-w-none mx-auto bg-card p-6 sm:p-8 md:p-10 rounded-xl shadow-xl">
        <header className="mb-8">
          {post.category && (
             <Link href={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`} className="text-primary font-semibold uppercase tracking-wide text-sm hover:underline">
                {post.category}
            </Link>
          )}
          <h1 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                {post.author.avatarUrl && <AvatarImage src={post.author.avatarUrl} alt={post.author.name} data-ai-hint="author photo"/>}
                <AvatarFallback>{post.author.name.substring(0,1).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              <time dateTime={post.createdAt as string}>{format(parseISO(post.createdAt as string), 'MMMM d, yyyy')}</time>
            </div>
          </div>
        </header>

        {post.imageUrl && (
          <div className="my-8 rounded-lg overflow-hidden shadow-md">
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={1200}
              height={675}
              className="w-full h-auto object-cover"
              priority
              data-ai-hint={post.dataAiHint || "featured image"}
            />
          </div>
        )}
        
        <div dangerouslySetInnerHTML={{ __html: post.content }} />

        {post.tags && post.tags.length > 0 && (
          <footer className="mt-10 pt-6 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Tag className="h-4 w-4" />
              <span>Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Link href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`} key={tag}>
                  <Badge variant="secondary" className="hover:bg-accent hover:text-accent-foreground transition-colors">{tag}</Badge>
                </Link>
              ))}
            </div>
          </footer>
        )}
      </article>

      <div className="mt-12 text-center">
          <Link href="/blog" className="text-primary hover:underline">&larr; Back to Blog</Link>
      </div>
    </div>
  );
}
