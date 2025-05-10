
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { addBlogPost } from "@/services/blogService";
import type { BlogPost } from "@/types";
import { Loader2, Newspaper } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddBlogPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [authorName, setAuthorName] = useState("Admin"); 
  const [authorAvatarUrl, setAuthorAvatarUrl] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [dataAiHint, setDataAiHint] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState(""); 
  const [isPublished, setIsPublished] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") 
      .replace(/[\s_-]+/g, "-") 
      .replace(/^-+|-+$/g, ""); 
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(generateSlug(newTitle));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !excerpt || !content || !imageUrl) {
        toast({ title: "Missing Fields", description: "Please fill all required fields.", variant: "destructive" });
        return;
    }
    setIsLoading(true);

    const postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'> = {
      title,
      slug,
      author: { name: authorName, avatarUrl },
      category,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      imageUrl,
      dataAiHint,
      excerpt,
      content,
      isPublished,
    };

    try {
      await addBlogPost(postData);
      toast({ title: "Blog Post Added!", description: `"${title}" has been successfully added.` });
      router.push('/admin/manage-blogs'); 
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message || "Failed to add blog post.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Card className="max-w-3xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center">
            <Newspaper className="mr-3 h-8 w-8 text-primary" /> Add New Blog Post
          </CardTitle>
          <CardDescription>Fill in the details below to create a new blog post.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Post Title</Label>
              <Input id="title" value={title} onChange={handleTitleChange} placeholder="e.g., Mastering Python for Data Science" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="slug">Post Slug (URL)</Label>
              <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto-generated-from-title" required />
              <p className="text-xs text-muted-foreground">URL-friendly version of the title. Auto-generated, but can be edited.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="authorName">Author Name</Label>
                <Input id="authorName" value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="John Doe" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="authorAvatarUrl">Author Avatar URL (Optional)</Label>
                <Input id="authorAvatarUrl" value={authorAvatarUrl} onChange={(e) => setAuthorAvatarUrl(e.target.value)} placeholder="https://example.com/avatar.jpg" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g., Software Development, Tutorials" />
              </div>
               <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Python, Data Science, Beginner" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="imageUrl">Featured Image URL</Label>
                    <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="dataAiHint">AI Hint for Image (Optional)</Label>
                    <Input id="dataAiHint" value={dataAiHint} onChange={(e) => setDataAiHint(e.target.value)} placeholder="e.g., abstract technology" />
                </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="excerpt">Excerpt (Short Summary)</Label>
              <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="A brief summary for previews (max 200 chars)" rows={3} maxLength={200} required/>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="content">Full Content (HTML or Markdown supported)</Label>
              <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your full blog post here..." rows={10} required/>
            </div>
            
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox id="isPublished" checked={isPublished} onCheckedChange={(checked) => setIsPublished(checked as boolean)} />
              <Label htmlFor="isPublished" className="text-sm font-normal">
                Publish this post immediately
              </Label>
            </div>

            <Button type="submit" size="lg" className="w-full md:w-auto md:ml-auto mt-4 bg-primary hover:bg-primary/90" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Adding Post..." : "Add Blog Post"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
