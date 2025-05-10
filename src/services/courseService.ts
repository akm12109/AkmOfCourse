
import { db } from '@/lib/firebase';
import type { Course, Review, CourseRequest } from '@/types';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,
  serverTimestamp,
  runTransaction,
  writeBatch,
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';

const COURSES_COLLECTION = 'courses';
const REVIEWS_COLLECTION = 'reviews';
const COURSE_REQUESTS_COLLECTION = 'courseRequests';


const processCourseDoc = (docSnapshot: any): Course => {
  const data = docSnapshot.data();
  const course: Course = {
    ...data,
    id: docSnapshot.id,
    createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : 
               (data.createdAt && typeof data.createdAt === 'object' && data.createdAt.seconds) ? new Date(data.createdAt.seconds * 1000).toISOString() : 
               data.createdAt,
    studentsEnrolled: Number(data.studentsEnrolled) || 0,
    rating: Number(data.rating) || 0,
    reviewsCount: Number(data.reviewsCount) || 0,
    price: Number(data.price) || 0, // Ensure price is a number (stored in INR)
    originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined, // Ensure price is a number (stored in INR)
    lessonsCount: Number(data.lessonsCount) || 0,
  };
  
  if (typeof data.curriculum === 'string') {
    course.curriculum = data.curriculum;
  } else if (Array.isArray(data.curriculum)) {
    course.curriculum = data.curriculum;
  }


  if (typeof data.instructor === 'object' && data.instructor !== null && 'name' in data.instructor) {
    course.instructorName = (data.instructor as unknown as { name: string }).name;
  } else if (typeof data.instructor === 'string') {
     course.instructorName = data.instructor;
  }


  return course;
};


export async function addCourse(courseData: Omit<Course, 'id' | 'rating' | 'reviewsCount' | 'studentsEnrolled' | 'createdAt' | 'instructorBio'> & { instructorName: string }): Promise<string> {
  try {
    const coursePayload: Partial<Omit<Course, 'id'>> = {
      ...courseData,
      price: Number(courseData.price) || 0, // Price stored in INR
      originalPrice: courseData.originalPrice ? Number(courseData.originalPrice) : undefined, // Price stored in INR
      lessonsCount: Number(courseData.lessonsCount) || 0,
      rating: 0, 
      reviewsCount: 0, 
      studentsEnrolled: 0, 
      isFeatured: courseData.isFeatured || false,
      createdAt: serverTimestamp(), 
    };

    const docRef = await addDoc(collection(db, COURSES_COLLECTION), coursePayload);
    return docRef.id;
  } catch (error) {
    console.error("Error adding course to Firestore: ", error);
    throw new Error("Failed to add course.");
  }
}

export async function updateCourse(courseId: string, courseData: Partial<Omit<Course, 'id' | 'createdAt'>>): Promise<void> {
  try {
    const courseRef = doc(db, COURSES_COLLECTION, courseId);
    const updatePayload: Partial<Course> = { ...courseData };
    if (updatePayload.price !== undefined) updatePayload.price = Number(updatePayload.price); // Price stored in INR
    if (updatePayload.originalPrice !== undefined) updatePayload.originalPrice = Number(updatePayload.originalPrice); // Price stored in INR
    if (updatePayload.lessonsCount !== undefined) updatePayload.lessonsCount = Number(updatePayload.lessonsCount);
    await updateDoc(courseRef, updatePayload as any);
  } catch (error) {
    console.error("Error updating course in Firestore: ", error);
    throw new Error("Failed to update course.");
  }
}

export async function deleteCourse(courseId: string): Promise<void> {
  try {
    const courseRef = doc(db, COURSES_COLLECTION, courseId);
    await deleteDoc(courseRef);

    const reviewsQuery = query(collection(db, REVIEWS_COLLECTION), where('courseId', '==', courseId));
    const reviewsSnapshot = await getDocs(reviewsQuery);
    const batch = writeBatch(db);
    reviewsSnapshot.docs.forEach(reviewDoc => {
      batch.delete(reviewDoc.ref);
    });
    await batch.commit();

  } catch (error) {
    console.error("Error deleting course from Firestore: ", error);
    throw new Error("Failed to delete course.");
  }
}


export async function getCourses(): Promise<Course[]> {
  try {
    const q = query(collection(db, COURSES_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(processCourseDoc);
  } catch (error) {
    console.error("Error fetching courses: ", error);
    return [];
  }
}

export async function getCourseById(id: string): Promise<Course | null> {
  try {
    const docRef = doc(db, COURSES_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return processCourseDoc(docSnap);
    }
    return null;
  } catch (error) {
    console.error("Error fetching course by ID: ", error);
    return null;
  }
}

export async function getFeaturedCourses(count: number = 4): Promise<Course[]> {
  try {
    const q = query(
      collection(db, COURSES_COLLECTION), 
      where('isFeatured', '==', true), 
      orderBy('createdAt', 'desc'), 
      limit(count)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(processCourseDoc);
  } catch (error) {
    console.error("Error fetching featured courses: ", error);
    return [];
  }
}

export async function getLatestCourses(count: number = 4): Promise<Course[]> {
   try {
    const q = query(
      collection(db, COURSES_COLLECTION), 
      orderBy('createdAt', 'desc'), 
      limit(count)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(processCourseDoc);
  } catch (error)
 {
    console.error("Error fetching latest courses: ", error);
    return [];
  }
}

export async function addReview(
  courseId: string, 
  reviewData: { rating: number; comment: string; userName: string; avatarUrl?: string }
): Promise<string> {
  try {
    const reviewPayload: Omit<Review, 'id'> = {
      ...reviewData,
      courseId,
      createdAt: serverTimestamp(),
    };
    const reviewDocRef = await addDoc(collection(db, REVIEWS_COLLECTION), reviewPayload);

    await runTransaction(db, async (transaction) => {
      const courseRef = doc(db, COURSES_COLLECTION, courseId);
      const courseDoc = await transaction.get(courseRef);
      if (!courseDoc.exists()) {
        throw new Error("Course does not exist!");
      }
      
      const currentRating = courseDoc.data().rating || 0;
      const currentReviewsCount = courseDoc.data().reviewsCount || 0;
      
      const newReviewsCount = currentReviewsCount + 1;
      const newTotalRatingSum = (currentRating * currentReviewsCount) + reviewData.rating;
      const newAverageRating = newReviewsCount > 0 ? newTotalRatingSum / newReviewsCount : 0;
      
      transaction.update(courseRef, {
        rating: parseFloat(newAverageRating.toFixed(1)),
        reviewsCount: newReviewsCount,
      });
    });

    return reviewDocRef.id;
  } catch (error) {
    console.error("Error adding review: ", error);
    throw new Error("Failed to add review.");
  }
}

export async function getReviewsByCourseId(courseId: string): Promise<Review[]> {
  try {
    const q = query(
      collection(db, REVIEWS_COLLECTION), 
      where('courseId', '==', courseId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnap => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : 
                   (data.createdAt && typeof data.createdAt === 'object' && data.createdAt.seconds) ? new Date(data.createdAt.seconds * 1000).toISOString() : 
                   data.createdAt,
      } as Review;
    });
  } catch (error) {
    console.error("Error fetching reviews: ", error);
    return [];
  }
}

export async function incrementEnrollment(courseId: string): Promise<void> {
  try {
    const courseRef = doc(db, COURSES_COLLECTION, courseId);
    await runTransaction(db, async (transaction) => {
      const courseDoc = await transaction.get(courseRef);
      if (!courseDoc.exists()) {
        throw "Document does not exist!";
      }
      const currentEnrollments = courseDoc.data().studentsEnrolled || 0;
      transaction.update(courseRef, { studentsEnrolled: currentEnrollments + 1 });
    });
  } catch (error) {
    console.error("Error incrementing enrollment: ", error);
    throw new Error("Failed to update enrollment count.");
  }
}

export async function addCourseRequest(requestData: Omit<CourseRequest, 'id' | 'requestedAt'>): Promise<string> {
  try {
    const payload: Omit<CourseRequest, 'id'> = {
      ...requestData,
      requestedAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, COURSE_REQUESTS_COLLECTION), payload);
    return docRef.id;
  } catch (error) {
    console.error("Error adding course request: ", error);
    throw new Error("Failed to submit course request.");
  }
}

const processCourseRequestDoc = (docSnapshot: any): CourseRequest => {
  const data = docSnapshot.data();
  return {
    id: docSnapshot.id,
    courseTitle: data.courseTitle || '',
    description: data.description || '',
    email: data.email || '',
    requestedAt: data.requestedAt instanceof Timestamp ? data.requestedAt.toDate().toISOString() :
                 (data.requestedAt && typeof data.requestedAt === 'object' && data.requestedAt.seconds) ? new Date(data.requestedAt.seconds * 1000).toISOString() :
                 data.requestedAt,
  };
};

export async function getCourseRequests(): Promise<CourseRequest[]> {
  try {
    const q = query(collection(db, COURSE_REQUESTS_COLLECTION), orderBy('requestedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(processCourseRequestDoc);
  } catch (error) {
    console.error("Error fetching course requests: ", error);
    return [];
  }
}
