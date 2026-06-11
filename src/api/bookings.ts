import type { Booking, BookingData } from '@/types';

const mockBookings: Booking[] = [
    {
        id: '1',
        studentId: 'student-1',
        instructorId: '1',
        instructorName: 'Ahmed Ben Salah',
        date: '2026-06-15',
        time: '09:00',
        duration: 60,
        type: 'code',
        status: 'confirmé',
    },
    {
        id: '2',
        studentId: 'student-1',
        instructorId: '2',
        instructorName: 'Sami Trabelsi',
        date: '2026-06-17',
        time: '14:00',
        duration: 90,
        type: 'conduite',
        status: 'en_attente',
    },
    {
        id: '3',
        studentId: 'student-1',
        instructorId: '1',
        instructorName: 'Ahmed Ben Salah',
        date: '2026-06-20',
        time: '10:00',
        duration: 60,
        type: 'examen',
        status: 'confirmé',
    },
];

export async function fetchBookings(studentId: string): Promise<Booking[]> {
    await new Promise((r) => setTimeout(r, 300));
    return mockBookings.filter((b) => b.studentId === studentId);
}

export async function postBooking(data: BookingData): Promise<Booking> {
    await new Promise((r) => setTimeout(r, 500));
    // Simulate success
    return {
        id: `booking-${Date.now()}`,
        studentId: 'student-1',
        instructorId: data.instructorId,
        instructorName: 'Moniteur',
        date: data.date,
        time: data.time,
        duration: data.duration,
        type: data.type,
        status: 'en_attente',
    };
}
