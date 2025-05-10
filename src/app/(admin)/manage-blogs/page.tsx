"use client";

import { useState, useEffect } from "react";
import type { BlogPost } from "@/types";
import { getBlogPosts, deleteBlogPost } from "@/services/blogService";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { MoreHorizontal, Edit, Trash2, PlusCircle, Eye, Search, Newspaper, Loader2, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { format, parseISO } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton"; // Added Skeleton

const TableSkeletonRow = () => (
  <TableRow>
    <TableCell><Skeleton className="h-5 w-full" /></TableCell>
    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
    <TableCell className="text-center"><Skeleton className="h-6 w-20 mx-auto rounded-full" /></TableCell>
    <TableCell><Skeleton className="h-5 w-28" /></TableCell>
    <TableCell className="text-center"><Skeleton className="h-8 w-8 rounded-full mx-auto" /></TableCell>
  </TableRow>
);


export default function ManageBlogPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const fetchBlogPostsData = async () => {
    setIsLoading(true);
    try {
      const postsFromDb = await getBlogPosts(true); // Fetch all posts (published and drafts)
      setPosts(postsFromDb);
      setFilteredPosts(postsFromDb);
    } catch (error) {
      toast({ title: "Error fetching blog posts", description: (error as Error).message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPostsData();
  }, []);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = posts.filter(item =>
      item.title.toLowerCase().includes(lowercasedFilter) ||
      (item.category && item.category.toLowerCase().includes(lowercasedFilter)) ||
      item.author.name.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredPosts(filteredData);
  }, [searchTerm, posts]);

  const handleDeletePost = async () => {
    if (!postToDelete) return;
    setIsDeleting(true);
    try {
      await deleteBlogPost(postToDelete.id);
      toast({ title: "Blog Post Deleted", description: `"${postToDelete.title}" has been successfully deleted.` });
      setPosts(prev => prev.filter(post => post.id !== postToDelete.id));
      setPostToDelete(null);
    } catch (error) {
      toast({ title: "Error Deleting Post", description: (error as Error).message, variant: "destructive" });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold flex items-center">
          <Newspaper className="mr-3 h-8 w-8 text-primary" /> Manage Blog Posts ({isLoading ? '...' : filteredPosts.length})
        </h1>
        <div className="flex gap-2 flex-col sm:flex-row w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
                 <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                    type="search"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-full sm:w-64"
                />
            </div>
            <Button asChild className="w-full sm:w-auto">
                <Link href="/add-blog-post"><PlusCircle className="mr-2 h-4 w-4" /> Add New Post</Link>
            </Button>
        </div>
      </div>

      {isLoading ? (
         <div className="overflow-x-auto bg-card p-4 sm:p-6 rounded-lg shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, i) => <TableSkeletonRow key={i} />)}
            </TableBody>
          </Table>
        </div>
      ) : filteredPosts.length === 0 ? (
        <p className="text-center text-muted-foreground text-lg py-10">
          {searchTerm ? "No posts match your search." : "No blog posts available. Create one!"}
        </p>
      ) : (
        <div className="overflow-x-auto bg-card p-4 sm:p-6 rounded-lg shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.category || <Badge variant="outline">N/A</Badge>}</TableCell>
                  <TableCell>{post.author.name}</TableCell>
                  <TableCell className="text-center">
                    {post.isPublished ? 
                        <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle className="mr-1 h-3.5 w-3.5"/>Published</Badge> : 
                        <Badge variant="secondary"><XCircle className="mr-1 h-3.5 w-3.5"/>Draft</Badge>}
                  </TableCell>
                  <TableCell>{format(parseISO(post.createdAt as string), 'MMM d, yyyy')}</TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/blog/${post.slug}`} target="_blank" className="flex items-center cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" /> View Live
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/edit-blog-post/${post.id}`} className="flex items-center cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setPostToDelete(post)} className="flex items-center text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {postToDelete && (
        <AlertDialog open={!!postToDelete} onOpenChange={() => setPostToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete this blog post?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the post "{postToDelete.title}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setPostToDelete(null)} disabled={isDeleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeletePost} 
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                disabled={isDeleting}
              >
                {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isDeleting ? "Deleting..." : "Yes, delete post"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
