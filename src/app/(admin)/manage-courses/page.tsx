"use client";

import { useState, useEffect } from "react";
import type { Course } from "@/types";
import { getCourses, deleteCourse } from "@/services/courseService";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { MoreHorizontal, Edit, Trash2, PlusCircle, Eye, Search, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton"; // Added Skeleton

const TableSkeletonRow = () => (
  <TableRow>
    <TableCell><Skeleton className="h-5 w-full" /></TableCell>
    <TableCell><Skeleton className="h-5 w-full" /></TableCell>
    <TableCell><Skeleton className="h-5 w-full" /></TableCell>
    <TableCell className="text-right"><Skeleton className="h-5 w-1/2 ml-auto" /></TableCell>
    <TableCell className="text-center"><Skeleton className="h-5 w-10 mx-auto" /></TableCell>
    <TableCell className="text-center"><Skeleton className="h-8 w-8 rounded-full mx-auto" /></TableCell>
  </TableRow>
);

export default function ManageCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const fetchCoursesData = async () => {
    setIsLoading(true);
    try {
      const coursesFromDb = await getCourses();
      setCourses(coursesFromDb);
      setFilteredCourses(coursesFromDb);
    } catch (error) {
      toast({ title: "Error fetching courses", description: (error as Error).message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoursesData();
  }, []);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = courses.filter(item =>
      item.title.toLowerCase().includes(lowercasedFilter) ||
      item.category.toLowerCase().includes(lowercasedFilter) ||
      item.instructorName.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredCourses(filteredData);
  }, [searchTerm, courses]);

  const handleDeleteCourse = async () => {
    if (!courseToDelete) return;
    setIsDeleting(true);
    try {
      await deleteCourse(courseToDelete.id);
      toast({ title: "Course Deleted", description: `"${courseToDelete.title}" has been successfully deleted.` });
      setCourses(prev => prev.filter(course => course.id !== courseToDelete.id));
      setCourseToDelete(null);
    } catch (error) {
      toast({ title: "Error Deleting Course", description: (error as Error).message, variant: "destructive" });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Manage Courses ({isLoading ? '...' : filteredCourses.length})</h1>
        <div className="flex gap-2 flex-col sm:flex-row w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
                 <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                    type="search"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-full sm:w-64"
                />
            </div>
            <Button asChild className="w-full sm:w-auto">
                <Link href="/add-course"><PlusCircle className="mr-2 h-4 w-4" /> Add New Course</Link>
            </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="overflow-x-auto bg-card p-4 sm:p-6 rounded-lg shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-center">Featured</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, i) => <TableSkeletonRow key={i} />)}
            </TableBody>
          </Table>
        </div>
      ) : filteredCourses.length === 0 ? (
        <p className="text-center text-muted-foreground text-lg py-10">
          {searchTerm ? "No courses match your search." : "No courses available. Add some!"}
        </p>
      ) : (
        <div className="overflow-x-auto bg-card p-4 sm:p-6 rounded-lg shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-center">Featured</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>{course.instructorName}</TableCell>
                  <TableCell className="text-right">${course.price.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    {course.isFeatured ? <Badge>Yes</Badge> : <Badge variant="secondary">No</Badge>}
                  </TableCell>
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
                          <Link href={`/courses/${course.id}`} target="_blank" className="flex items-center cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" /> View Live
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/edit-course/${course.id}`} className="flex items-center cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setCourseToDelete(course)} className="flex items-center text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer">
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

      {courseToDelete && (
        <AlertDialog open={!!courseToDelete} onOpenChange={() => setCourseToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete this course?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the course "{courseToDelete.title}" and all its associated data, including reviews.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setCourseToDelete(null)} disabled={isDeleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteCourse} 
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                disabled={isDeleting}
              >
                {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isDeleting ? "Deleting..." : "Yes, delete course"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
