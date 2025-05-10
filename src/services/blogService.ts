
import { db } from '@/lib/firebase';
import type { BlogPost } from '@/types';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  Timestamp,
  limit, // Added limit import
} from 'firebase/firestore';

const BLOG_POSTS_COLLECTION = 'blogPosts';

const processBlogPostDoc = (docSnapshot: any): BlogPost => {
  const data = docSnapshot.data();
  // Ensure author is correctly structured
  const author = data.author && typeof data.author === 'object' 
    ? { name: data.author.name || 'Unknown Author', avatarUrl: data.author.avatarUrl }
    : { name: 'Unknown Author' };

  return {
    id: docSnapshot.id,
    slug: data.slug || '',
    title: data.title || '',
    author,
    category: data.category,
    tags: data.tags || [],
    imageUrl: data.imageUrl || '',
    dataAiHint: data.dataAiHint,
    excerpt: data.excerpt || '',
    content: data.content || '',
    isPublished: data.isPublished !== undefined ? data.isPublished : false,
    createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : 
               (data.createdAt && typeof data.createdAt === 'object' && data.createdAt.seconds) ? new Date(data.createdAt.seconds * 1000).toISOString() : 
               data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate().toISOString() :
               (data.updatedAt && typeof data.updatedAt === 'object' && data.updatedAt.seconds) ? new Date(data.updatedAt.seconds * 1000).toISOString() :
               data.updatedAt,
    date: data.date || (data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : new Date().toISOString()), // for placeholder compatibility
  };
};

export async function addBlogPost(postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const payload = {
      ...postData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, BLOG_POSTS_COLLECTION), payload);
    return docRef.id;
  } catch (error) {
    console.error("Error adding blog post: ", error);
    throw new Error("Failed to add blog post.");
  }
}

export async function updateBlogPost(postId: string, postData: Partial<Omit<BlogPost, 'id' | 'createdAt'>>): Promise<void> {
  try {
    const postRef = doc(db, BLOG_POSTS_COLLECTION, postId);
    await updateDoc(postRef, {
      ...postData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating blog post: ", error);
    throw new Error("Failed to update blog post.");
  }
}

export async function deleteBlogPost(postId: string): Promise<void> {
  try {
    const postRef = doc(db, BLOG_POSTS_COLLECTION, postId);
    await deleteDoc(postRef);
  } catch (error) {
    console.error("Error deleting blog post: ", error);
    throw new Error("Failed to delete blog post.");
  }
}

export async function getBlogPosts(includeUnpublished: boolean = false): Promise<BlogPost[]> {
  try {
    let q;
    if (includeUnpublished) {
      q = query(collection(db, BLOG_POSTS_COLLECTION), orderBy('createdAt', 'desc'));
    } else {
      q = query(collection(db, BLOG_POSTS_COLLECTION), where('isPublished', '==', true), orderBy('createdAt', 'desc'));
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(processBlogPostDoc);
  } catch (error) {
    console.error("Error fetching blog posts: ", error);
    return [];
  }
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const docRef = doc(db, BLOG_POSTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return processBlogPostDoc(docSnap);
    }
    return null;
  } catch (error) {
    console.error("Error fetching blog post by ID: ", error);
    return null;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const q = query(collection(db, BLOG_POSTS_COLLECTION), where('slug', '==', slug), where('isPublished', '==', true), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return processBlogPostDoc(querySnapshot.docs[0]);
    }
    return null;
  } catch (error) {
    console.error("Error fetching blog post by slug: ", error);
    return null;
  }
}

