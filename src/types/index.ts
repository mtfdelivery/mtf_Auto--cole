/* ═══════════════════════════════════════════
   Domain Types — mtf Auto-école
   ═══════════════════════════════════════════ */

export interface Course {
    id: string;
    title: string;
    description: string;
    category: string;
    duration: string;
    price: number;
    imageUrl: string;
    level: 'débutant' | 'intermédiaire' | 'avancé';
    rating: number;
    reviewsCount: number;
    lessonsCount: number;
    instructorName: string;
}

export interface Instructor {
    id: string;
    name: string;
    specialty: string;
    bio: string;
    avatarUrl: string;
    rating: number;
    reviewsCount: number;
    yearsExperience: number;
    licenseTypes: string[];
    available: boolean;
}

export interface Booking {
    id: string;
    studentId: string;
    instructorId: string;
    instructorName: string;
    date: string;
    time: string;
    duration: number;
    type: 'code' | 'conduite' | 'examen';
    status: 'confirmé' | 'en_attente' | 'annulé' | 'terminé';
}

export interface BookingData {
    instructorId: string;
    date: string;
    time: string;
    duration: number;
    type: 'code' | 'conduite' | 'examen';
}

export interface Student {
    id: string;
    name: string;
    email: string;
    role: 'learner' | 'teacher' | 'admin';
    avatarUrl: string;
    enrolledAt: string;
}

export interface StudentProgress {
    studentId: string;
    codeProgress: number;
    conduiteProgress: number;
    totalLessons: number;
    completedLessons: number;
    averageScore: number;
    nextExamDate: string | null;
}

export interface LessonSlot {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    instructorId: string;
    instructorName: string;
    available: boolean;
    type: 'code' | 'conduite';
}

export interface PricingPlan {
    id: string;
    name: string;
    price: number;
    duration: string;
    features: string[];
    popular: boolean;
}

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    imageUrl: string;
    author: string;
    publishedAt: string;
    category: string;
    readTime: string;
}
