
'use server'; 

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, ListChecks, BarChart2, Settings, Users, MessageSquare, Palette, Image as ImageIcon, ClipboardList, FileQuestion, Newspaper, PenTool, BookOpen, Edit3, TrendingUp } from 'lucide-react'; // Added TrendingUp
import { getReviewsByCourseId, getCourses, getCourseRequests } from '@/services/courseService'; 
import { getBlogPosts } from '@/services/blogService';
import type { Review } from '@/types';
import RatingStars from '@/components/shared/RatingStars';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { collection, getDocs, query as firestoreQuery, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';

async function fetchAdminData() {
  try {
    const courses = await getCourses(); 
    const courseRequests = await getCourseRequests();
    const allBlogPosts = await getBlogPosts(true); // Include unpublished for admin count

    // Calculate published vs draft blog posts
    const publishedBlogPostsCount = allBlogPosts.filter(post => post.isPublished).length;
    const draftBlogPostsCount = allBlogPosts.length - publishedBlogPostsCount;

    // Calculate featured courses
    const featuredCoursesCount = courses.filter(course => course.isFeatured).length;

    // Fetch a few latest overall reviews.
    const latestReviewsSnapshot = await getDocs(firestoreQuery(collection(db, "reviews"), orderBy("createdAt", "desc"), limit(3)));
    const latestReviews: Review[] = latestReviewsSnapshot.docs.map(doc => {
        const data = doc.data();
        const createdAt = data.createdAt instanceof Date ? data.createdAt : 
                          (data.createdAt && data.createdAt.toDate) ? data.createdAt.toDate() : new Date();
        return { 
            id: doc.id, 
            ...data, 
            courseId: data.courseId || 'N/A',
            createdAt: createdAt 
        } as Review;
    });
    
    // Fetch total reviews count
    const allReviewsCountSnapshot = await getDocs(collection(db, "reviews"));
    const totalReviews = allReviewsCountSnapshot.size;

    return {
      totalCourses: courses.length,
      latestReviews,
      totalCourseRequests: courseRequests.length,
      totalBlogPosts: allBlogPosts.length,
      publishedBlogPostsCount,
      draftBlogPostsCount,
      featuredCoursesCount,
      totalReviews,
    };
  } catch (error) {
    console.error("Error fetching admin data:", error);
    return {
      totalCourses: 0,
      latestReviews: [],
      totalCourseRequests: 0,
      totalBlogPosts: 0,
      publishedBlogPostsCount: 0,
      draftBlogPostsCount: 0,
      featuredCoursesCount: 0,
      totalReviews: 0,
    };
  }
}


export default async function AdminDashboardPage() {
  const { 
    totalCourses, 
    latestReviews, 
    totalCourseRequests, 
    totalBlogPosts,
    publishedBlogPostsCount,
    draftBlogPostsCount,
    featuredCoursesCount,
    totalReviews
  } = await fetchAdminData();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back, Admin!</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Manage Courses ({totalCourses})
              <BookOpen className="h-6 w-6 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              View, add, edit, or delete courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button asChild className="flex-1">
                <Link href="/add-course"><PlusCircle className="mr-2 h-4 w-4" /> Add New Course</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/manage-courses">View All Courses</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Manage Blog Posts ({totalBlogPosts})
              <Newspaper className="h-6 w-6 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Create, edit, and manage blog content.
            </p>
             <div className="flex flex-col sm:flex-row gap-2">
                <Button asChild className="flex-1">
                    <Link href="/add-blog-post"><PlusCircle className="mr-2 h-4 w-4" /> Add New Post</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                    <Link href="/manage-blogs">View All Posts</Link>
                </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Slideshow Content
              <ImageIcon className="h-6 w-6 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Manage homepage slideshow content.
            </p>
            <Button asChild>
              <Link href="/manage-slides">Manage Slides</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Site Settings
              <Settings className="h-6 w-6 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Manage social media links and other site configurations.
            </p>
            <Button asChild>
              <Link href="/manage-socials">Manage Social Links</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Course Requests ({totalCourseRequests})
              <FileQuestion className="h-6 w-6 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              View and manage submitted course requests.
            </p>
            <Button asChild>
              <Link href="/manage-course-requests">View Course Requests</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Content Editor
              <PenTool className="h-6 w-6 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Access integrated editor for live content changes. (Future Feature)
            </p>
            <Button asChild>
              <Link href="/admin/content-editor">Open Editor</Link>
            </Button>
          </CardContent>
        </Card>

         <Card className="md:col-span-2 lg:col-span-3 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Platform Analytics Overview
              <BarChart2 className="h-6 w-6 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Key platform statistics.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center md:text-left">
                <div className="p-4 bg-secondary/50 rounded-md">
                    <h4 className="text-sm font-medium text-muted-foreground">Total Users</h4>
                    <p className="text-2xl font-bold">N/A</p>
                    <p className="text-xs text-muted-foreground">(User tracking not implemented)</p>
                </div>
                 <div className="p-4 bg-secondary/50 rounded-md">
                    <h4 className="text-sm font-medium text-muted-foreground">Active Courses</h4>
                    <p className="text-2xl font-bold">{totalCourses}</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-md">
                    <h4 className="text-sm font-medium text-muted-foreground">Featured Courses</h4>
                    <p className="text-2xl font-bold">{featuredCoursesCount}</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-md">
                    <h4 className="text-sm font-medium text-muted-foreground">Published Blogs</h4>
                    <p className="text-2xl font-bold">{publishedBlogPostsCount}</p>
                </div>
                 <div className="p-4 bg-secondary/50 rounded-md">
                    <h4 className="text-sm font-medium text-muted-foreground">Draft Blogs</h4>
                    <p className="text-2xl font-bold">{draftBlogPostsCount}</p>
                </div>
                 <div className="p-4 bg-secondary/50 rounded-md">
                    <h4 className="text-sm font-medium text-muted-foreground">Total Reviews</h4>
                    <p className="text-2xl font-bold">{totalReviews}</p>
                </div>
            </div>
             <Button variant="link" asChild className="mt-4">
                <Link href="/admin/advanced-analytics">View Advanced Analytics (Future)</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Advanced Analytics (Future)
              <TrendingUp className="h-6 w-6 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Deep dive into user behavior, traffic sources, and content performance. (Future Feature)
            </p>
            <Button asChild>
              <Link href="/admin/advanced-analytics">Explore Advanced Analytics</Link>
            </Button>
          </CardContent>
        </Card>


        {latestReviews.length > 0 && (
            <Card className="md:col-span-2 lg:col-span-3 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <MessageSquare className="mr-3 h-6 w-6 text-primary" /> Latest Reviews
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {latestReviews.map(review => (
                        <div key={review.id} className="p-3 border rounded-md bg-background">
                            <div className="flex justify-between items-start mb-1">
                                <div>
                                    <p className="font-semibold text-sm">{review.userName}</p>
                                     <Link href={`/courses/${review.courseId}`} className="text-xs text-primary hover:underline">
                                        View Course
                                    </Link>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                    {formatDistanceToNow(review.createdAt as Date, { addSuffix: true })}
                                </Badge>
                            </div>
                            <RatingStars rating={review.rating} starSize={14} />
                            <p className="text-sm text-muted-foreground mt-1 truncate">{review.comment}</p>
                        </div>
                    ))}
                     <Button variant="link" asChild className="mt-2">
                        <Link href="/manage-reviews">View All Reviews</Link>
                    </Button>
                </CardContent>
            </Card>
        )}


        <Card className="border-dashed border-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-muted-foreground">
              Future Modules
              <Palette className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              User management and other upcoming enhancements.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

