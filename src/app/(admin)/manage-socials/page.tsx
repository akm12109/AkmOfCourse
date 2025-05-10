"use client";

import { useState, useEffect } from "react";
import type { SocialLink } from "@/types";
import { getSocialLinks, addSocialLink, updateSocialLink, deleteSocialLink } from "@/services/socialLinkService";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"; // CardContent, CardDescription, CardHeader, CardTitle not used for skeleton here
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Edit, Trash2, PlusCircle, Link as LinkIcon, Loader2, Github, Twitter, Linkedin, Facebook, Instagram, Youtube } from 'lucide-react'; // MoreHorizontal not used
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton"; // Added Skeleton


type SocialLinkFormData = Omit<SocialLink, 'id'>;

const initialSocialLinkFormData: SocialLinkFormData = {
  platform: "",
  url: "",
  iconName: "",
  order: 0,
};

const availableIcons = [
  { name: "Github", component: Github },
  { name: "Twitter", component: Twitter },
  { name: "Linkedin", component: Linkedin },
  { name: "Facebook", component: Facebook },
  { name: "Instagram", component: Instagram },
  { name: "Youtube", component: Youtube },
  { name: "Link", component: LinkIcon }, // Generic link
];

const SocialLinkCardSkeleton = () => (
  <Card className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 shadow-md">
    <Skeleton className="h-10 w-10 rounded-md" /> {/* Icon placeholder */}
    <div className="flex-grow space-y-2">
      <Skeleton className="h-6 w-1/2" /> {/* Platform Name */}
      <Skeleton className="h-4 w-3/4" /> {/* URL */}
      <Skeleton className="h-3 w-1/4" /> {/* Order */}
    </div>
    <div className="flex gap-2 items-center shrink-0 mt-2 sm:mt-0">
      <Skeleton className="h-9 w-9 rounded-md" /> {/* Edit button */}
      <Skeleton className="h-9 w-9 rounded-md" /> {/* Delete button */}
    </div>
  </Card>
);


export default function ManageSocialLinksPage() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState<SocialLinkFormData>(initialSocialLinkFormData);
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [linkToDelete, setLinkToDelete] = useState<SocialLink | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

  const fetchLinksData = async () => {
    setIsLoading(true);
    try {
      const linksFromDb = await getSocialLinks();
      setSocialLinks(linksFromDb.sort((a,b) => (a.order || 0) - (b.order || 0)));
    } catch (error) {
      toast({ title: "Error fetching social links", description: (error as Error).message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLinksData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentLink(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string, name: string) => {
     setCurrentLink(prev => ({ ...prev, [name]: value }));
     if(name === 'platform') { 
        const selectedIcon = availableIcons.find(icon => icon.name.toLowerCase() === value.toLowerCase());
        if(selectedIcon) {
            setCurrentLink(prev => ({ ...prev, iconName: selectedIcon.name }));
        }
     }
  };


  const handleAddNewLink = () => {
    setEditingLinkId(null);
    setCurrentLink({...initialSocialLinkFormData, order: socialLinks.length > 0 ? Math.max(...socialLinks.map(s => s.order || 0)) + 1 : 0});
    setIsDialogOpen(true);
  };

  const handleEditLink = (link: SocialLink) => {
    setEditingLinkId(link.id);
    setCurrentLink({
      platform: link.platform,
      url: link.url,
      iconName: link.iconName || "",
      order: link.order || 0,
    });
    setIsDialogOpen(true);
  };

  const handleSubmitLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!currentLink.platform || !currentLink.url) {
        toast({ title: "Missing fields", description: "Platform and URL are required.", variant: "destructive" });
        setIsSubmitting(false);
        return;
    }
    try {
      const payload = {...currentLink, order: Number(currentLink.order)};
      if (editingLinkId) {
        await updateSocialLink(editingLinkId, payload);
        toast({ title: "Social Link Updated", description: `Link for "${currentLink.platform}" has been updated.` });
      } else {
        await addSocialLink(payload);
        toast({ title: "Social Link Added", description: `Link for "${currentLink.platform}" has been added.` });
      }
      fetchLinksData(); 
      setIsDialogOpen(false);
      setCurrentLink(initialSocialLinkFormData);
      setEditingLinkId(null);
    } catch (error) {
      toast({ title: "Error Saving Link", description: (error as Error).message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteLink = async () => {
    if (!linkToDelete) return;
    setIsSubmitting(true);
    try {
      await deleteSocialLink(linkToDelete.id);
      toast({ title: "Social Link Deleted", description: `Link for "${linkToDelete.platform}" has been deleted.` });
      fetchLinksData(); 
      setLinkToDelete(null);
    } catch (error) {
      toast({ title: "Error Deleting Link", description: (error as Error).message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIconComponent = (iconName?: string) => {
    if (!iconName) return <LinkIcon className="h-5 w-5" />;
    const iconEntry = availableIcons.find(icon => icon.name === iconName);
    return iconEntry ? <iconEntry.component className="h-5 w-5" /> : <LinkIcon className="h-5 w-5" />;
  };


  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Social Links ({isLoading ? '...' : socialLinks.length})</h1>
        <Button onClick={handleAddNewLink}><PlusCircle className="mr-2 h-4 w-4" /> Add New Link</Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => <SocialLinkCardSkeleton key={i} />)}
        </div>
      ) : socialLinks.length === 0 ? (
        <p className="text-center text-muted-foreground text-lg py-10">No social links configured. Add some to display in the footer.</p>
      ) : (
        <div className="space-y-4">
          {socialLinks.map(link => (
            <Card key={link.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 shadow-md">
               <div className="p-2 bg-secondary rounded-md text-primary">
                 {getIconComponent(link.iconName)}
               </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-lg">{link.platform}</h3>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline truncate max-w-md block">{link.url}</a>
                <p className="text-xs text-muted-foreground">Order: {link.order || 0}</p>
              </div>
              <div className="flex gap-2 items-center shrink-0 mt-2 sm:mt-0">
                 <Button variant="outline" size="icon" onClick={() => handleEditLink(link)}><Edit className="h-4 w-4" /></Button>
                 <Button variant="destructive" size="icon" onClick={() => setLinkToDelete(link)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingLinkId ? "Edit Social Link" : "Add New Social Link"}</DialogTitle>
            <DialogDescription>
              {editingLinkId ? "Update the details for this social link." : "Provide platform name, URL, and optionally an icon."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitLink} className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
            <div className="grid gap-2">
                <Label htmlFor="platform">Platform Name</Label>
                <Input id="platform" name="platform" value={currentLink.platform} onChange={handleInputChange} placeholder="e.g., Github, Twitter" required />
            </div>
             <div className="grid gap-2">
                <Label htmlFor="iconName">Icon</Label>
                <Select value={currentLink.iconName} onValueChange={(value) => handleSelectChange(value, 'iconName')}>
                    <SelectTrigger id="iconName">
                        <SelectValue placeholder="Select icon (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                        {availableIcons.map(icon => <SelectItem key={icon.name} value={icon.name}>{icon.name}</SelectItem>)}
                    </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Select an icon. If platform name matches common ones, it might auto-select.</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="url">URL</Label>
              <Input id="url" name="url" type="url" value={currentLink.url} onChange={handleInputChange} placeholder="https://example.com/profile" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="order">Display Order</Label>
              <Input id="order" name="order" type="number" value={currentLink.order} onChange={handleInputChange} />
            </div>
            <DialogFooter className="mt-2">
              <DialogClose asChild><Button type="button" variant="outline" disabled={isSubmitting}>Cancel</Button></DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingLinkId ? "Save Changes" : "Add Link"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {linkToDelete && (
        <AlertDialog open={!!linkToDelete} onOpenChange={() => setLinkToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete link for "{linkToDelete.platform}"?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the social link.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setLinkToDelete(null)} disabled={isSubmitting}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteLink} className="bg-destructive hover:bg-destructive/90" disabled={isSubmitting}>
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
