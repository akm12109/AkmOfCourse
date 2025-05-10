
import { db } from '@/lib/firebase';
import type { Slide } from '@/types';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';

const SLIDES_COLLECTION = 'slides';

const processSlideDoc = (docSnapshot: any): Slide => {
  const data = docSnapshot.data();
  return {
    id: docSnapshot.id,
    title: data.title || '',
    description: data.description || '',
    imageUrl: data.imageUrl || '',
    ctaText: data.ctaText,
    ctaLink: data.ctaLink,
    dataAiHint: data.dataAiHint,
    isActive: data.isActive !== undefined ? data.isActive : true,
    order: data.order || 0,
    // createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : data.createdAt,
  };
};

export async function addSlide(slideData: Omit<Slide, 'id'>): Promise<string> {
  try {
    const payload = {
      ...slideData,
      createdAt: serverTimestamp(),
      isActive: slideData.isActive !== undefined ? slideData.isActive : true,
      order: slideData.order || 0,
    };
    const docRef = await addDoc(collection(db, SLIDES_COLLECTION), payload);
    return docRef.id;
  } catch (error) {
    console.error("Error adding slide to Firestore: ", error);
    throw new Error("Failed to add slide.");
  }
}

export async function updateSlide(slideId: string, slideData: Partial<Omit<Slide, 'id'>>): Promise<void> {
  try {
    const slideRef = doc(db, SLIDES_COLLECTION, slideId);
    await updateDoc(slideRef, slideData);
  } catch (error) {
    console.error("Error updating slide in Firestore: ", error);
    throw new Error("Failed to update slide.");
  }
}

export async function deleteSlide(slideId: string): Promise<void> {
  try {
    const slideRef = doc(db, SLIDES_COLLECTION, slideId);
    await deleteDoc(slideRef);
  } catch (error) {
    console.error("Error deleting slide from Firestore: ", error);
    throw new Error("Failed to delete slide.");
  }
}

export async function getSlides(onlyActive: boolean = false): Promise<Slide[]> {
  try {
    let q = query(collection(db, SLIDES_COLLECTION), orderBy('order', 'asc'), orderBy('createdAt', 'desc'));
    if (onlyActive) {
        q = query(collection(db, SLIDES_COLLECTION), where('isActive', '==', true), orderBy('order', 'asc'), orderBy('createdAt', 'desc'));
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(processSlideDoc);
  } catch (error) {
    console.error("Error fetching slides: ", error);
    // Fallback to placeholder data if service fails or is not fully implemented
    // This helps maintain UI stability during development.
    // Consider removing this fallback in production if Firestore is mandatory.
    // return placeholderSlides; 
    return [];
  }
}

// Example for fetching placeholder data for now - this would be removed if Firestore is primary
import { placeholderSlides } from '@/lib/placeholder-data';

export async function getSlidesForHomepage(): Promise<Slide[]> {
   // Prefer Firestore, fallback to placeholders if empty or error
  try {
    const firestoreSlides = await getSlides(true); // Get only active slides
    if (firestoreSlides.length > 0) {
      return firestoreSlides;
    }
  } catch (error) {
    console.warn("Could not fetch slides from Firestore, using placeholders:", error);
  }
  return placeholderSlides.filter(slide => slide.isActive !== false); // Filter placeholders if they have isActive
}
