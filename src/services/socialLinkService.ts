
import { db } from '@/lib/firebase';
import type { SocialLink } from '@/types';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';

const SOCIAL_LINKS_COLLECTION = 'socialLinks';

const processSocialLinkDoc = (docSnapshot: any): SocialLink => {
  const data = docSnapshot.data();
  return {
    id: docSnapshot.id,
    platform: data.platform || '',
    url: data.url || '',
    iconName: data.iconName,
    order: data.order || 0,
    // createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : data.createdAt,
  };
};

export async function addSocialLink(linkData: Omit<SocialLink, 'id'>): Promise<string> {
  try {
    const payload = {
      ...linkData,
      createdAt: serverTimestamp(),
      order: linkData.order || 0,
    };
    const docRef = await addDoc(collection(db, SOCIAL_LINKS_COLLECTION), payload);
    return docRef.id;
  } catch (error) {
    console.error("Error adding social link to Firestore: ", error);
    throw new Error("Failed to add social link.");
  }
}

export async function updateSocialLink(linkId: string, linkData: Partial<Omit<SocialLink, 'id'>>): Promise<void> {
  try {
    const linkRef = doc(db, SOCIAL_LINKS_COLLECTION, linkId);
    await updateDoc(linkRef, linkData);
  } catch (error) {
    console.error("Error updating social link in Firestore: ", error);
    throw new Error("Failed to update social link.");
  }
}

export async function deleteSocialLink(linkId: string): Promise<void> {
  try {
    const linkRef = doc(db, SOCIAL_LINKS_COLLECTION, linkId);
    await deleteDoc(linkRef);
  } catch (error) {
    console.error("Error deleting social link from Firestore: ", error);
    throw new Error("Failed to delete social link.");
  }
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  try {
    const q = query(collection(db, SOCIAL_LINKS_COLLECTION), orderBy('order', 'asc'), orderBy('platform', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(processSocialLinkDoc);
  } catch (error) {
    console.error("Error fetching social links: ", error);
    // Fallback for development or if Firestore fails
    return [
        {id: 'placeholder_gh', platform: "Github", url: "#", iconName: "Github", order: 1 },
        {id: 'placeholder_tw', platform: "Twitter", url: "#", iconName: "Twitter", order: 2 },
        {id: 'placeholder_li', platform: "Linkedin", url: "#", iconName: "Linkedin", order: 3 },
    ];
  }
}
