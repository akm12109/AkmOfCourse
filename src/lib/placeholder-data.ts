
import type { Course, Review, User, BlogPost, FaqItem, Slide, Instructor, CourseRequest } from '@/types';
import type { Timestamp } from 'firebase/firestore';


// Simplified User, mainly for author display or anonymous inputs
export const placeholderUser: User = {
  id: 'user1',
  name: 'Alex Doe',
  avatarUrl: 'https://picsum.photos/seed/alex/100/100',
};

export const placeholderInstructor: Instructor = {
  id: 'instructor1',
  name: 'Dr. Evelyn Reed',
  avatarUrl: 'https://picsum.photos/seed/evelyn/100/100',
  bio: 'Experienced educator and industry professional with over 10 years of experience in full-stack development and cybersecurity. Passionate about making complex topics accessible to all learners.',
  coursesCount: 8,
  studentsCount: 2500,
};

export const placeholderReviews: Review[] = [
  {
    id: 'review1',
    courseId: 'python-masterclass', // Example courseId
    userName: 'Jane Miles', 
    avatarUrl: 'https://picsum.photos/seed/jane/80/80',
    rating: 5,
    comment: 'This Python course is amazing! Learned so much and the instructor was great.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: 'review2',
    courseId: 'python-masterclass', // Example courseId
    userName: 'Bob Ross', 
    avatarUrl: 'https://picsum.photos/seed/bob/80/80',
    rating: 4,
    comment: 'Great content, but some advanced topics were a bit fast-paced.',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
];

// Prices are in INR
export const placeholderCourses: Course[] = [
  {
    id: 'python-masterclass',
    title: 'The Complete Python Masterclass: From Zero to Hero',
    instructorName: placeholderInstructor.name,
    instructorBio: placeholderInstructor,
    price: 3340, // Approx $39.99 USD in INR
    originalPrice: 7515, // Approx $89.99 USD in INR
    description: 'Master Python 3, from basic syntax to advanced concepts like OOP, web scraping, data analysis, and automation. Build real-world projects and become a confident Python developer.',
    shortDescription: 'Learn Python from scratch and build real-world projects.',
    imageUrl: 'https://picsum.photos/seed/pythoncourse/600/400',
    dataAiHint: 'python code',
    category: 'Software Development',
    skillLevel: 'Beginner',
    rating: 4.8,
    reviewsCount: 1850,
    duration: "30 hours",
    lessonsCount: 200,
    tags: ['Python', 'Programming', 'Web Development', 'Data Science', 'Beginner'],
    isFeatured: true,
    studentsEnrolled: 12500,
    whatYoullLearn: [
      'Understand Python fundamentals and core concepts.',
      'Develop applications using Object-Oriented Programming (OOP).',
      'Scrape websites and automate tasks.',
      'Perform data analysis with Pandas and NumPy.',
      'Build web applications with Flask or Django (overview).'
    ],
    requirements: [
      'A computer with internet access (Windows, Mac, or Linux).',
      'No prior programming experience needed.',
      'A willingness to learn and practice.'
    ],
    curriculum: [
      {
        id: 'module1', title: 'Introduction to Python',
        lessons: [
          { id: 'l1-1', title: 'Setting up Python Environment', duration: '15min', isVideo: true },
          { id: 'l1-2', title: 'Basic Syntax and Data Types', duration: '25min', isVideo: true },
          { id: 'l1-3', title: 'Your First Python Program', duration: '10min', isVideo: true, isDownloadable: true },
        ]
      },
      {
        id: 'module2', title: 'Control Flow and Functions',
        lessons: [
          { id: 'l2-1', title: 'Conditional Statements', duration: '20min', isVideo: true },
          { id: 'l2-2', title: 'Loops (For and While)', duration: '30min', isVideo: true, previewUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 'l2-3', title: 'Defining and Calling Functions', duration: '25min', isVideo: true },
        ]
      }
    ],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'ethical-hacking-essentials',
    title: 'Ethical Hacking Essentials: Beginner to Advanced',
    instructorName: 'Ken Adams',
    price: 4175, // Approx $49.99 USD
    description: 'Learn the fundamentals of ethical hacking and penetration testing. Understand vulnerabilities, attack vectors, and how to secure systems against them. Covers network scanning, web app security, and more.',
    shortDescription: 'Master ethical hacking techniques and cybersecurity.',
    imageUrl: 'https://picsum.photos/seed/hackingcourse/600/400',
    dataAiHint: 'cyber security',
    category: 'Cybersecurity',
    skillLevel: 'Intermediate',
    rating: 4.9,
    reviewsCount: 950,
    duration: "35 hours",
    lessonsCount: 180,
    tags: ['Ethical Hacking', 'Cybersecurity', 'Penetration Testing', 'Networking'],
    isFeatured: true,
    studentsEnrolled: 7200,
    whatYoullLearn: [
      'Fundamentals of cybersecurity and ethical hacking.',
      'Network scanning and enumeration techniques.',
      'Web application penetration testing.',
      'Wireless network security and attacks.',
      'Social engineering and mitigation strategies.'
    ],
    requirements: [
      'Basic understanding of networking concepts.',
      'Familiarity with operating systems (Windows, Linux).',
      'A curious and analytical mindset.'
    ],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'graphic-design-bootcamp',
    title: 'Graphic Design Bootcamp: From Beginner to Pro',
    instructorName: 'Laura Chen',
    price: 2920, // Approx $34.99 USD
    description: 'Master Adobe Photoshop, Illustrator, and InDesign. Learn design principles, typography, color theory, and create stunning visuals for web, print, and social media.',
    shortDescription: 'Become a professional graphic designer.',
    imageUrl: 'https://picsum.photos/seed/designcourse/600/400',
    dataAiHint: 'graphic design tools',
    category: 'Graphic Design',
    skillLevel: 'All Levels',
    rating: 4.7,
    reviewsCount: 1200,
    duration: "20 hours",
    lessonsCount: 130,
    tags: ['Graphic Design', 'Photoshop', 'Illustrator', 'Branding', 'UI/UX Basics'],
    studentsEnrolled: 9800,
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'digital-marketing-strategy',
    title: 'The Complete Digital Marketing Strategy Course',
    instructorName: 'Mike Wheeler',
    price: 3755, // Approx $44.99 USD
    originalPrice: 6680, // Approx $79.99 USD
    description: 'Learn SEO, content marketing, social media marketing, email marketing, PPC advertising, and analytics. Develop a comprehensive digital marketing strategy to grow businesses.',
    shortDescription: 'Master digital marketing and grow businesses online.',
    imageUrl: 'https://picsum.photos/seed/marketingcourse/600/400',
    dataAiHint: 'marketing analytics',
    category: 'Digital Marketing',
    skillLevel: 'Intermediate',
    rating: 4.6,
    reviewsCount: 780,
    duration: "28 hours",
    lessonsCount: 160,
    tags: ['Digital Marketing', 'SEO', 'Social Media', 'Content Marketing', 'PPC'],
    isFeatured: false,
    studentsEnrolled: 6500,
    createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const placeholderSlides: Slide[] = [
  {
    id: 'slide1',
    title: 'Unlock Your Full Potential',
    description: 'Explore our wide range of courses and start building your dream career today with Akm of course.',
    imageUrl: 'https://picsum.photos/seed/slideNew1/1200/500',
    dataAiHint: 'learning education',
    ctaText: 'Explore Courses',
    ctaLink: '/courses',
    isActive: true,
    order: 1,
  },
  {
    id: 'slide2',
    title: 'New! Cybersecurity Masterclass',
    description: 'Dive deep into ethical hacking, network security, and protect digital assets like a pro.',
    imageUrl: 'https://picsum.photos/seed/slideNew2/1200/500',
    dataAiHint: 'cyber security lock',
    ctaText: 'Learn More',
    ctaLink: '/courses/ethical-hacking-essentials',
    isActive: true,
    order: 2,
  },
  {
    id: 'slide3',
    title: 'Skill Up Sale: Up to 50% Off!',
    description: 'Grab your favorite Akm of course courses at unbeatable prices. Limited time offer.',
    imageUrl: 'https://picsum.photos/seed/slideNew3/1200/500',
    dataAiHint: 'discount sale offer',
    ctaText: 'Shop Now',
    ctaLink: '/courses',
    isActive: true,
    order: 3,
  },
];

export const placeholderBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'introduction-to-python-programming',
    title: 'Introduction to Python Programming: A Beginner\'s Guide',
    author: { name: placeholderUser.name, avatarUrl: placeholderUser.avatarUrl },
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), 
    excerpt: 'Python is a versatile and beginner-friendly language. This Akm of course guide helps you take your first steps...',
    content: '&lt;p&gt;Python is renowned for its simplicity and readability, making it an excellent choice for beginners. This guide will walk you through setting up Python, understanding basic syntax, and writing your first program. Python\'s extensive libraries also make it powerful for web development, data science, machine learning, and more.&lt;/p&gt;&lt;h3&gt;Why Python?&lt;/h3&gt;&lt;p&gt;Python\'s clear syntax and large community support make learning easier. It\'s used by major companies like Google, Netflix, and Spotify.&lt;/p&gt;&lt;h3&gt;Getting Started&lt;/h3&gt;&lt;p&gt;Download Python from python.org and choose an IDE like VS Code or PyCharm. Start with "Hello, World!" and explore variables, data types, and control structures.&lt;/p&gt;',
    imageUrl: 'https://picsum.photos/seed/blogNew1/800/500',
    dataAiHint: 'python code screen',
    tags: ['Python', 'Beginner', 'Tutorial', 'Programming'],
    category: 'Software Development',
    isPublished: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    slug: 'understanding-digital-marketing-funnels',
    title: 'Understanding Digital Marketing Funnels for Business Growth',
    author: { name: placeholderInstructor.name, avatarUrl: placeholderInstructor.avatarUrl },
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    excerpt: 'A well-structured marketing funnel is key to converting leads. Learn how from Akm of course...',
    content: '&lt;p&gt;A digital marketing funnel guides potential customers through awareness, interest, decision, and action. Key stages include:&lt;/p&gt;&lt;ol&gt;&lt;li&gt;&lt;strong&gt;Awareness:&lt;/strong&gt; Attract users with SEO, content marketing, and social media.&lt;/li&gt;&lt;li&gt;&lt;strong&gt;Interest:&lt;/strong&gt; Engage them with valuable content like blog posts, webinars, and lead magnets.&lt;/li&gt;&lt;li&gt;&lt;strong&gt;Decision:&lt;/strong&gt; Nurture leads with email marketing, case studies, and testimonials.&lt;/li&gt;&lt;li&gt;&lt;strong&gt;Action:&lt;/strong&gt; Convert leads with clear calls-to-action, landing pages, and offers.&lt;/li&gt;&lt;/ol&gt;&lt;p&gt;Optimizing each stage is crucial for maximizing conversions and business growth.&lt;/p&gt;',
    imageUrl: 'https://picsum.photos/seed/blogNew2/800/500',
    dataAiHint: 'marketing funnel chart',
    tags: ['Digital Marketing', 'Strategy', 'Business', 'SEO'],
    category: 'Digital Marketing',
    isPublished: true,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const placeholderFaqs: FaqItem[] = [
  {
    id: 'faq1',
    question: 'What kind of courses does Akm of course offer?',
    answer: 'Akm of course offers a wide variety of courses across disciplines like Software Development, Cybersecurity, Graphic Design, Digital Marketing, Data Science, Business, and more. We aim to provide learning opportunities for various skill levels, from beginner to advanced.',
  },
  {
    id: 'faq2',
    question: 'Do I need prior experience for beginner courses?',
    answer: 'No, our beginner-level courses are designed for individuals with little to no prior experience in the subject. We start with the fundamentals and gradually build up your skills.',
  },
  {
    id: 'faq3',
    question: 'How do I access my purchased courses?',
    answer: 'Once you enroll in a course, it will be available in your "My Courses" dashboard. You typically have lifetime access to the course materials, unless otherwise specified.',
  },
  {
    id: 'faq4',
    question: 'Is there a refund policy?',
    answer: 'Yes, we offer a 30-day money-back guarantee on most of our courses. If you\'re not satisfied, you can request a full refund within 30 days of purchase by contacting our support team.',
  },
];

export const courseCategories = ['All', 'Cybersecurity', 'Software Development', 'Game Development', 'Graphic Design', 'Digital Marketing', 'Video Editing', 'Data Science', 'Business', 'Other'];
export const skillLevels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

// Placeholder Course Requests (example, usually fetched from DB)
export const placeholderCourseRequests: CourseRequest[] = [
    {
        id: 'req1',
        courseTitle: 'Advanced Cloud Computing with AWS and Azure',
        description: 'A deep dive into multi-cloud architectures, serverless, and DevOps practices.',
        email: 'user1@example.com',
        requestedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'req2',
        courseTitle: 'Introduction to Quantum Computing',
        email: 'user2@example.com',
        requestedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    }
];
