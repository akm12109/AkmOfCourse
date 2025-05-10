
'use client'; 

import { useState, useEffect } from 'react';
import CourseList from '@/components/courses/CourseList';
import FilterSidebar from '@/components/layout/FilterSidebar';
import { getCourses } from '@/services/courseService';
import type { Course } from '@/types';
import { Input } from '@/components/ui/input';
import { Search, ListFilter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from '@/components/ui/skeleton'; 
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export default function CoursesPage() {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<any>({}); 
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoursesData = async () => {
      setIsLoading(true);
      try {
        const coursesFromDb = await getCourses();
        setAllCourses(coursesFromDb);
        setFilteredCourses(coursesFromDb); 
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
      setIsLoading(false);
    };
    fetchCoursesData();
  }, []);

  useEffect(() => {
    if (isLoading) return; 

    let courses = [...allCourses];

    if (searchTerm) {
      courses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (course.tags && course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    if (filters.categories && filters.categories.length > 0 && !filters.categories.includes('All')) {
      courses = courses.filter(course => filters.categories.includes(course.category));
    }
    if (filters.priceRange) {
      courses = courses.filter(course => course.price >= filters.priceRange[0] && course.price <= filters.priceRange[1]);
    }
    if (filters.skillLevels && filters.skillLevels.length > 0 && !filters.skillLevels.includes('All Levels')) {
      courses = courses.filter(course => filters.skillLevels.includes(course.skillLevel));
    }

    switch (sortBy) {
      case "price_asc":
        courses.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        courses.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        courses.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        courses.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt as string | Date).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt as string | Date).getTime() : 0;
          return dateB - dateA;
        });
        break;
      default: 
        if (searchTerm) {
             courses.sort((a, b) => a.title.localeCompare(b.title));
        }
        break;
    }

    setFilteredCourses(courses);
  }, [searchTerm, filters, allCourses, sortBy, isLoading]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Explore Our Courses</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Find the perfect course to level up your skills in various domains.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="hidden md:block md:w-72 lg:w-80">
           <FilterSidebar onFilterChange={handleFilterChange} />
        </div>

        <div className="flex-1">
          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:max-w-xs">
              <Input
                type="search"
                placeholder="Search courses..."
                className="h-10 pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
            
            <div className="flex items-center gap-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="md:hidden">
                      <ListFilter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="p-0">
                    <FilterSidebar onFilterChange={handleFilterChange} />
                  </SheetContent>
                </Sheet>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] h-10">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="price_asc">Price: Low to High</SelectItem>
                    <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
            </div>
          </div>
          {isLoading ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <Card key={i} className="flex flex-col h-full">
                        <Skeleton className="h-48 w-full" />
                        <CardContent className="p-4 flex-grow space-y-2">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </CardContent>
                        <CardFooter className="p-4 border-t flex justify-between items-center">
                            <Skeleton className="h-8 w-20" />
                            <Skeleton className="h-8 w-24" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
          ) : (
            <CourseList courses={filteredCourses} />
          )}
        </div>
      </div>
    </div>
  );
}
