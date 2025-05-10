
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { getCourseById, updateCourse } from "@/services/courseService";
import type { Course } from "@/types";
import { Loader2, BookOpen } from "lucide-react"; 
import { useParams, useRouter, notFound } from "next/navigation";

const courseCategoriesOptions = ['Cybersecurity', 'Software Development', 'Game Development', 'Graphic Design', 'Digital Marketing', 'Video Editing', 'Data Science', 'Business', 'Other'];
const skillLevelsOptions: Array<Course['skillLevel']> = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [title, setTitle] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [dataAiHint, setDataAiHint] = useState("");
  const [category, setCategory] = useState("");
  const [skillLevel, setSkillLevel] = useState<Course['skillLevel'] | "">("");
  const [tags, setTags] = useState(""); 
  const [whatYoullLearn, setWhatYoullLearn] = useState(""); 
  const [requirements, setRequirements] = useState(""); 
  const [isFeatured, setIsFeatured] = useState(false);
  const [duration, setDuration] = useState("");
  const [lessonsCount, setLessonsCount] = useState("");
  const [simplifiedCurriculum, setSimplifiedCurriculum] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingCourse, setIsFetchingCourse] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (courseId) {
      const fetchCourse = async () => {
        setIsFetchingCourse(true);
        try {
          const fetchedCourse = await getCourseById(courseId);
          if (!fetchedCourse) {
            notFound();
            return;
          }
          setCourse(fetchedCourse);
          setTitle(fetchedCourse.title);
          setInstructorName(fetchedCourse.instructorName);
          setPrice(fetchedCourse.price.toString()); 
          setOriginalPrice(fetchedCourse.originalPrice?.toString() || ""); 
          setDescription(fetchedCourse.description);
          setShortDescription(fetchedCourse.shortDescription);
          setImageUrl(fetchedCourse.imageUrl);
          setDataAiHint(fetchedCourse.dataAiHint || "");
          setCategory(fetchedCourse.category);
          setSkillLevel(fetchedCourse.skillLevel);
          setTags(fetchedCourse.tags?.join(', ') || "");
          setWhatYoullLearn(fetchedCourse.whatYoullLearn?.join('\n') || "");
          setRequirements(fetchedCourse.requirements?.join('\n') || "");
          setIsFeatured(fetchedCourse.isFeatured || false);
          setDuration(fetchedCourse.duration || "");
          setLessonsCount(fetchedCourse.lessonsCount?.toString() || "");
          setSimplifiedCurriculum(typeof fetchedCourse.curriculum === 'string' ? fetchedCourse.curriculum : JSON.stringify(fetchedCourse.curriculum, null, 2) || "");

        } catch (error) {
          toast({ title: "Error fetching course", description: (error as Error).message, variant: "destructive" });
          notFound();
        } finally {
          setIsFetchingCourse(false);
        }
      };
      fetchCourse();
    }
  }, [courseId, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillLevel) {
        toast({ title: "Skill Level Required", description: "Please select a skill level.", variant: "destructive"});
        return;
    }
    if (!category) {
        toast({ title: "Category Required", description: "Please select a category.", variant: "destructive"});
        return;
    }
     if (!title || !instructorName || !price || !description || !shortDescription || !imageUrl ) {
        toast({ title: "Missing Required Fields", description: "Please fill all required fields like title, instructor, price, descriptions, and image URL.", variant: "destructive" });
        return;
    }


    setIsLoading(true);

    const courseDataToUpdate: Partial<Omit<Course, 'id' | 'createdAt' | 'rating' | 'reviewsCount' | 'studentsEnrolled'>> = {
      title,
      instructorName,
      price: parseFloat(price), 
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined, 
      description,
      shortDescription,
      imageUrl,
      dataAiHint,
      category,
      skillLevel: skillLevel as Course['skillLevel'],
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      whatYoullLearn: whatYoullLearn.split('\n').map(item => item.trim()).filter(item => item),
      requirements: requirements.split('\n').map(item => item.trim()).filter(item => item),
      isFeatured,
      duration,
      lessonsCount: parseInt(lessonsCount) || 0,
      curriculum: simplifiedCurriculum,
    };

    try {
      await updateCourse(courseId, courseDataToUpdate);
      toast({ title: "Course Updated!", description: `"${title}" has been successfully updated.` });
      router.push('/admin/manage-courses');
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message || "Failed to update course.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetchingCourse) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading course details...</p>
      </div>
    );
  }
  
  if (!course && !isFetchingCourse) {
    return <p className="text-center text-destructive text-lg py-10">Course not found.</p>;
  }


  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Card className="max-w-3xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center">
            <BookOpen className="mr-3 h-8 w-8 text-primary" /> Edit Course
          </CardTitle>
          <CardDescription>Update the details for "{course?.title}".</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Course Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., The Complete Python Masterclass" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="instructorName">Instructor Name</Label>
                <Input id="instructorName" value={instructorName} onChange={(e) => setInstructorName(e.target.value)} placeholder="Dr. Evelyn Reed" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price (INR)</Label>
                <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="3340.00" required min="0" step="0.01"/>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                  <Label htmlFor="originalPrice">Original Price (INR) (Optional)</Label>
                  <Input id="originalPrice" type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} placeholder="7515.00" min="0" step="0.01"/>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="imageUrl">Course Thumbnail Image URL</Label>
                <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" required />
              </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="dataAiHint">AI Hint for Image (Optional)</Label>
                <Input id="dataAiHint" value={dataAiHint} onChange={(e) => setDataAiHint(e.target.value)} placeholder="e.g. abstract code" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {courseCategoriesOptions.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="skillLevel">Skill Level</Label>
                <Select value={skillLevel} onValueChange={(value) => setSkillLevel(value as Course['skillLevel'])} required>
                  <SelectTrigger id="skillLevel">
                    <SelectValue placeholder="Select skill level" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillLevelsOptions.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="shortDescription">Short Description (for card display)</Label>
              <Textarea id="shortDescription" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} placeholder="A brief summary (max 150 chars)" rows={2} maxLength={150} required/>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Full Description</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Detailed course description..." rows={5} required/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="grid gap-2">
                    <Label htmlFor="duration">Duration (e.g., 30 hours)</Label>
                    <Input id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="30 hours" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="lessonsCount">Number of Lessons</Label>
                    <Input id="lessonsCount" type="number" value={lessonsCount} onChange={(e) => setLessonsCount(e.target.value)} placeholder="200" />
                </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Python, Programming, Beginner" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="whatYoullLearn">What You'll Learn (one item per line)</Label>
              <Textarea id="whatYoullLearn" value={whatYoullLearn} onChange={(e) => setWhatYoullLearn(e.target.value)} placeholder="Understand Python fundamentals\nDevelop applications with OOP" rows={4}/>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="requirements">Requirements (one item per line)</Label>
              <Textarea id="requirements" value={requirements} onChange={(e) => setRequirements(e.target.value)} placeholder="A computer with internet access\nNo prior experience needed" rows={3}/>
            </div>
            
            <div className="grid gap-2">
                <Label htmlFor="simplifiedCurriculum">Simplified Curriculum Details (or structured JSON)</Label>
                <Textarea id="simplifiedCurriculum" value={simplifiedCurriculum} onChange={(e) => setSimplifiedCurriculum(e.target.value)} placeholder="Module 1: Intro...\nModule 2: Basics...\nOR JSON: [{id:'m1', title:'Mod1', lessons:[{...}]}]" rows={3} />
            </div>

            <div className="flex items-center space-x-2 mt-2">
              <Checkbox id="isFeatured" checked={isFeatured} onCheckedChange={(checked) => setIsFeatured(checked as boolean)} />
              <Label htmlFor="isFeatured" className="text-sm font-normal">
                Mark as Featured Course
              </Label>
            </div>

            <Button type="submit" size="lg" className="w-full md:w-auto md:ml-auto mt-4 bg-primary hover:bg-primary/90" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Updating Course..." : "Update Course"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
