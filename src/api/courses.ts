import type { Course } from '@/types';

// ── Mock data for development ──
const mockCourses: Course[] = [
    {
        id: '1',
        title: 'Code de la Route — Intensif',
        description: 'Formation accélérée au code de la route. Passez votre examen en 3 semaines.',
        category: 'code',
        duration: '3 semaines',
        price: 350,
        imageUrl: 'https://images.unsplash.com/photo-1449965408869-ebd3fee52ae4?auto=format&fit=crop&w=600&q=80',
        level: 'débutant',
        rating: 4.8,
        reviewsCount: 234,
        lessonsCount: 20,
        instructorName: 'Ahmed Ben Salah',
    },
    {
        id: '2',
        title: 'Conduite Accompagnée',
        description: 'Formation complète à la conduite avec un moniteur expérimenté.',
        category: 'conduite',
        duration: '2 mois',
        price: 800,
        imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80',
        level: 'débutant',
        rating: 4.9,
        reviewsCount: 189,
        lessonsCount: 30,
        instructorName: 'Sami Trabelsi',
    },
    {
        id: '3',
        title: 'Permis Moto — Catégorie A',
        description: 'Formation spécifique au permis moto avec cours pratiques.',
        category: 'moto',
        duration: '6 semaines',
        price: 600,
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=600&q=80',
        level: 'intermédiaire',
        rating: 4.7,
        reviewsCount: 156,
        lessonsCount: 15,
        instructorName: 'Karim Belhadj',
    },
    {
        id: '4',
        title: 'Révision Express — Code',
        description: 'Sessions de révision rapide avec examens blancs illimités.',
        category: 'code',
        duration: '1 semaine',
        price: 150,
        imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f92c000?auto=format&fit=crop&w=600&q=80',
        level: 'avancé',
        rating: 4.6,
        reviewsCount: 312,
        lessonsCount: 10,
        instructorName: 'Fatma Gharbi',
    },
    {
        id: '5',
        title: 'Perfectionnement Conduite',
        description: 'Améliorez votre conduite après l\'obtention du permis.',
        category: 'conduite',
        duration: '2 semaines',
        price: 400,
        imageUrl: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=80',
        level: 'avancé',
        rating: 4.5,
        reviewsCount: 98,
        lessonsCount: 8,
        instructorName: 'Mohamed Ayari',
    },
    {
        id: '6',
        title: 'Permis Poids Lourd — Cat. C',
        description: 'Formation professionnelle au permis poids lourd.',
        category: 'professionnel',
        duration: '3 mois',
        price: 1200,
        imageUrl: 'https://images.unsplash.com/photo-1601584115197-04eefb3ee4a6?auto=format&fit=crop&w=600&q=80',
        level: 'intermédiaire',
        rating: 4.8,
        reviewsCount: 67,
        lessonsCount: 40,
        instructorName: 'Nabil Khelifi',
    },
];

export async function fetchCourses(category?: string): Promise<Course[]> {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 400));
    if (category && category !== 'all') {
        return mockCourses.filter((c) => c.category === category);
    }
    return mockCourses;
}

export async function fetchCourseById(id: string): Promise<Course | null> {
    await new Promise((r) => setTimeout(r, 200));
    return mockCourses.find((c) => c.id === id) ?? null;
}
