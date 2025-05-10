
import type { LucideIcon } from 'lucide-react';
import type { Timestamp } from 'firebase/firestore';

export interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  admin?: boolean; 
  isRequestCourse?: boolean; 
  isCurrencySelector?: boolean; 
}

export interface Course {
  id: string;
  title: string;
  instructorName: string;
  instructorBio?: Instructor;
  price: number; 
  originalPrice?: number; 
  description: string;
  shortDescription: string;
  imageUrl: string;
  category: string; // e.g., 'Software Development', 'Graphic Design', 'Cybersecurity'
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  rating: number; 
  reviewsCount: number; 
  duration?: string; // e.g., "30 hours", "6 weeks"
  lessonsCount?: number;
  tags?: string[]; // e.g., ['Python', 'Web Scraping', 'AI', 'Photoshop']
  curriculum?: CourseModule[] | string; 
  whatYoullLearn?: string[];
  requirements?: string[];
  isFeatured?: boolean;
  studentsEnrolled: number; 
  dataAiHint?: string; // For image generation hints
  createdAt?: Timestamp | Date | string;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string; // e.g., "15min", "1h 30min"
  isVideo: boolean;
  isDownloadable?: boolean;
  previewUrl?: string;
}

export interface Instructor {
  id: string;
  name: string;
  avatarUrl: string;
  bio: string;
  coursesCount?: number;
  studentsCount?: number;
}

export interface Review {
  id: string;
  courseId: string;
  userName: string; 
  avatarUrl?: string; 
  rating: number;
  comment: string;
  createdAt: Timestamp | Date | string; 
}

export interface User { 
  id: string;
  name: string;
  avatarUrl: string;
}

export type EnrolledCourseInfo = Pick<Course, 'id' | 'title' | 'imageUrl' | 'instructorName' | 'dataAiHint'>;


export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: { 
    name: string;
    avatarUrl?: string;
  };
  date?: string; 
  excerpt: string;
  content: string; 
  imageUrl: string;
  tags?: string[];
  category?: string; // e.g., 'Tech News', 'Tutorials', 'Industry Insights'
  dataAiHint?: string;
  isPublished: boolean;
  createdAt: Timestamp | Date | string;
  updatedAt?: Timestamp | Date | string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Slide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  ctaText?: string;
  ctaLink?: string;
  dataAiHint?: string;
  isActive?: boolean; 
  order?: number; 
}

export interface CourseRequest {
  id?: string;
  courseTitle: string;
  description?: string;
  email: string; 
  requestedAt?: Timestamp | Date | string;
}

export interface SocialLink {
  id: string;
  platform: string; 
  url: string;
  iconName?: string; 
  order?: number;
}

export type CurrencyCode = 'INR' | 'USD';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  name: string;
}
