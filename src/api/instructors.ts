import type { Instructor } from '@/types';

const mockInstructors: Instructor[] = [
    {
        id: '1',
        name: 'Ahmed Ben Salah',
        specialty: 'Code de la Route',
        bio: 'Moniteur certifié avec 15 ans d\'expérience. Spécialiste de la préparation au code.',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        rating: 4.9,
        reviewsCount: 342,
        yearsExperience: 15,
        licenseTypes: ['Permis B', 'Permis A'],
        available: true,
    },
    {
        id: '2',
        name: 'Sami Trabelsi',
        specialty: 'Conduite',
        bio: 'Passionné par l\'enseignement, Sami forme des conducteurs responsables depuis 10 ans.',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
        rating: 4.8,
        reviewsCount: 278,
        yearsExperience: 10,
        licenseTypes: ['Permis B', 'Permis C'],
        available: true,
    },
    {
        id: '3',
        name: 'Fatma Gharbi',
        specialty: 'Code & Conduite',
        bio: 'Formatrice polyvalente, Fatma combine théorie et pratique pour un apprentissage complet.',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80',
        rating: 4.7,
        reviewsCount: 195,
        yearsExperience: 8,
        licenseTypes: ['Permis B'],
        available: false,
    },
    {
        id: '4',
        name: 'Karim Belhadj',
        specialty: 'Permis Moto',
        bio: 'Expert moto, Karim vous accompagne du débutant au pilote confirmé.',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
        rating: 4.9,
        reviewsCount: 167,
        yearsExperience: 12,
        licenseTypes: ['Permis A', 'Permis A1'],
        available: true,
    },
    {
        id: '5',
        name: 'Nabil Khelifi',
        specialty: 'Poids Lourd',
        bio: 'Ancien chauffeur routier, Nabil forme les futurs professionnels de la route.',
        avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
        rating: 4.8,
        reviewsCount: 89,
        yearsExperience: 20,
        licenseTypes: ['Permis C', 'Permis D', 'Permis B'],
        available: true,
    },
    {
        id: '6',
        name: 'Leila Mansouri',
        specialty: 'Conduite',
        bio: 'Leila est reconnue pour sa patience et son approche pédagogique adaptée.',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
        rating: 4.6,
        reviewsCount: 134,
        yearsExperience: 6,
        licenseTypes: ['Permis B'],
        available: true,
    },
];

export async function fetchInstructors(): Promise<Instructor[]> {
    await new Promise((r) => setTimeout(r, 350));
    return mockInstructors;
}

export async function fetchInstructorById(id: string): Promise<Instructor | null> {
    await new Promise((r) => setTimeout(r, 200));
    return mockInstructors.find((i) => i.id === id) ?? null;
}
