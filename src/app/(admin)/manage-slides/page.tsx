"use client";

import { useState, useEffect } from "react";
import type { Slide } from "@/types";
import { getSlides, addSlide, updateSlide, deleteSlide } from "@/services/slideService";
// import Link from "next/link"; // Keep if needed for view live, though slides are on homepage
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card"; // Removed CardContent, CardDescription as they are not directly used for skeleton structure here
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox"; // Not used in current form for handleCheckboxChange
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"; // DialogTrigger not used as button opens dialog programmatically
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Edit, Trash2, PlusCircle, Loader2 } from 'lucide-react'; // Removed MoreHorizontal, Image, ArrowUpDown as not directly used
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton"; // Added Skeleton
import { Badge } from "@/components/ui/badge"; // Added Badge for status display

type SlideFormData = Omit<Slide, 'id' | 'createdAt'>;

const initialSlideFormData: SlideFormData = {
  title: "",
  description: "",
  imageUrl: "",
  ctaText: "",
  ctaLink: "",
  dataAiHint: "",
  isActive: true,
  order: 0,
};

const SlideCardSkeleton = () => (
  <Card className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
    <Skeleton className="relative w-full sm:w-40 h-24 sm:h-20 rounded-md shrink-0" />
    <div className="flex-grow space-y-2">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-3 w-1/4" />
    </div>
    <div className="flex gap-2 items-center shrink-0 mt-2 sm:mt-0">
      <Skeleton className="h-9 w-9 rounded-md" />
      <Skeleton className="h-9 w-9 rounded-md" />
    </div>
  </Card>
);


export default function ManageSlidesPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<SlideFormData>(initialSlideFormData);
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null);
  const [slideToDelete, setSlideToDelete] = useState<Slide | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

  const fetchSlidesData = async () => {
    setIsLoading(true);
    try {
      const slidesFromDb = await getSlides(); // Get all slides for admin, active or not
      setSlides(slidesFromDb.sort((a,b) => (a.order || 0) - (b.order || 0)));
    } catch (error) {
      toast({ title: "Error fetching slides", description: (error as Error).message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSlidesData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentSlide(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean, name: string) => {
      setCurrentSlide(prev => ({ ...prev, [name]: checked }));
  };

  const handleAddNewSlide = () => {
    setEditingSlideId(null);
    setCurrentSlide({...initialSlideFormData, order: slides.length > 0 ? Math.max(...slides.map(s => s.order || 0)) + 1 : 0 });
    setIsDialogOpen(true);
  };

  const handleEditSlide = (slide: Slide) => {
    setEditingSlideId(slide.id);
    setCurrentSlide({
      title: slide.title,
      description: slide.description,
      imageUrl: slide.imageUrl,
      ctaText: slide.ctaText || "",
      ctaLink: slide.ctaLink || "",
      dataAiHint: slide.dataAiHint || "",
      isActive: slide.isActive !== undefined ? slide.isActive : true,
      order: slide.order || 0,
    });
    setIsDialogOpen(true);
  };

  const handleSubmitSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingSlideId) {
        await updateSlide(editingSlideId, {...currentSlide, order: Number(currentSlide.order) });
        toast({ title: "Slide Updated", description: `Slide "${currentSlide.title}" has been updated.` });
      } else {
        await addSlide({...currentSlide, order: Number(currentSlide.order)});
        toast({ title: "Slide Added", description: `Slide "${currentSlide.title}" has been added.` });
      }
      fetchSlidesData(); // Refresh list
      setIsDialogOpen(false);
      setCurrentSlide(initialSlideFormData);
      setEditingSlideId(null);
    } catch (error) {
      toast({ title: "Error Saving Slide", description: (error as Error).message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteSlide = async () => {
    if (!slideToDelete) return;
    setIsSubmitting(true); 
    try {
      await deleteSlide(slideToDelete.id);
      toast({ title: "Slide Deleted", description: `Slide "${slideToDelete.title}" has been deleted.` });
      fetchSlidesData(); 
      setSlideToDelete(null);
    } catch (error) {
      toast({ title: "Error Deleting Slide", description: (error as Error).message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Slideshow ({isLoading ? '...' : slides.length})</h1>
        <Button onClick={handleAddNewSlide}><PlusCircle className="mr-2 h-4 w-4" /> Add New Slide</Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => <SlideCardSkeleton key={i} />)}
        </div>
      ) : slides.length === 0 ? (
        <p className="text-center text-muted-foreground text-lg py-10">No slides available. Add some to display on the homepage.</p>
      ) : (
        <div className="space-y-4">
          {slides.map(slide => (
            <Card key={slide.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 shadow-md">
              <div className="relative w-full sm:w-40 h-24 sm:h-20 rounded-md overflow-hidden shrink-0 bg-muted">
                {slide.imageUrl ? (
                    <Image src={slide.imageUrl} alt={slide.title} layout="fill" objectFit="cover" data-ai-hint={slide.dataAiHint || "slide image"} />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No Image</div>
                )}
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-lg">{slide.title} <Badge variant={slide.isActive ? "default" : "outline"}>{slide.isActive ? "Active" : "Inactive"}</Badge></h3>
                <p className="text-sm text-muted-foreground truncate max-w-md">{slide.description}</p>
                <p className="text-xs text-muted-foreground">Order: {slide.order || 0}</p>
              </div>
              <div className="flex gap-2 items-center shrink-0 mt-2 sm:mt-0">
                 <Button variant="outline" size="icon" onClick={() => handleEditSlide(slide)}><Edit className="h-4 w-4" /></Button>
                 <Button variant="destructive" size="icon" onClick={() => setSlideToDelete(slide)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingSlideId ? "Edit Slide" : "Add New Slide"}</DialogTitle>
            <DialogDescription>
              {editingSlideId ? "Update the details for this slide." : "Fill in the details for the new slide."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitSlide} className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={currentSlide.title} onChange={handleInputChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={currentSlide.description} onChange={handleInputChange} rows={3} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" name="imageUrl" value={currentSlide.imageUrl} onChange={handleInputChange} placeholder="https://example.com/image.jpg" required />
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="ctaText">CTA Text (Optional)</Label>
                    <Input id="ctaText" name="ctaText" value={currentSlide.ctaText} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="ctaLink">CTA Link (Optional)</Label>
                    <Input id="ctaLink" name="ctaLink" value={currentSlide.ctaLink} placeholder="/courses" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="order">Display Order</Label>
                    <Input id="order" name="order" type="number" value={currentSlide.order} onChange={handleInputChange} />
                </div>
                 <div className="grid gap-2 items-center">
                    <div className="flex items-center space-x-2 mt-6">
                        <Switch id="isActive" name="isActive" checked={currentSlide.isActive} onCheckedChange={(checked) => handleSwitchChange(checked, 'isActive')}/>
                        <Label htmlFor="isActive">Active</Label>
                    </div>
                </div>
            </div>
             <div className="grid gap-2">
                <Label htmlFor="dataAiHint">AI Hint for Image (Optional, 1-2 keywords)</Label>
                <Input id="dataAiHint" name="dataAiHint" value={currentSlide.dataAiHint} onChange={handleInputChange} placeholder="e.g. gaming landscape" />
            </div>
            <DialogFooter className="mt-2">
              <DialogClose asChild><Button type="button" variant="outline" disabled={isSubmitting}>Cancel</Button></DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingSlideId ? "Save Changes" : "Add Slide"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {slideToDelete && (
        <AlertDialog open={!!slideToDelete} onOpenChange={() => setSlideToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Slide "{slideToDelete.title}"?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the slide.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setSlideToDelete(null)} disabled={isSubmitting}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteSlide} className="bg-destructive hover:bg-destructive/90" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
