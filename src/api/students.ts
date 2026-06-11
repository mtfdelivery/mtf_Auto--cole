import type { StudentProgress, LessonSlot } from '@/types';

const mockProgress: StudentProgress = {
    studentId: 'student-1',
    codeProgress: 78,
    conduiteProgress: 45,
    totalLessons: 30,
    completedLessons: 14,
    averageScore: 82,
    nextExamDate: '2026-07-01',
};

const mockLessonSlots: LessonSlot[] = [
    { id: 'ls-1', date: '2026-06-12', startTime: '08:00', endTime: '09:00', instructorId: '1', instructorName: 'Ahmed Ben Salah', available: true, type: 'code' },
    { id: 'ls-2', date: '2026-06-12', startTime: '09:00', endTime: '10:00', instructorId: '2', instructorName: 'Sami Trabelsi', available: false, type: 'conduite' },
    { id: 'ls-3', date: '2026-06-13', startTime: '10:00', endTime: '11:30', instructorId: '1', instructorName: 'Ahmed Ben Salah', available: true, type: 'conduite' },
    { id: 'ls-4', date: '2026-06-13', startTime: '14:00', endTime: '15:00', instructorId: '3', instructorName: 'Fatma Gharbi', available: true, type: 'code' },
    { id: 'ls-5', date: '2026-06-14', startTime: '08:00', endTime: '09:30', instructorId: '4', instructorName: 'Karim Belhadj', available: true, type: 'conduite' },
    { id: 'ls-6', date: '2026-06-14', startTime: '11:00', endTime: '12:00', instructorId: '2', instructorName: 'Sami Trabelsi', available: false, type: 'code' },
    { id: 'ls-7', date: '2026-06-15', startTime: '09:00', endTime: '10:00', instructorId: '1', instructorName: 'Ahmed Ben Salah', available: true, type: 'code' },
    { id: 'ls-8', date: '2026-06-16', startTime: '15:00', endTime: '16:30', instructorId: '5', instructorName: 'Nabil Khelifi', available: true, type: 'conduite' },
];

import { supabase } from '@/lib/supabase';

export async function fetchStudentProgress(studentId: string): Promise<StudentProgress> {
    try {
        // Attempt to fetch from Supabase LIVE schema
        const { data: profile, error } = await supabase
            .from('profiles')
            .select(`
                average_score,
                exams_taken,
                videos_watched,
                total_videos,
                exam_date
            `)
            .eq('id', studentId)
            .single();

        if (!error && profile) {
            return {
                studentId,
                codeProgress: 0,
                conduiteProgress: 0,
                totalLessons: profile.total_videos || 30,
                completedLessons: profile.videos_watched || 0,
                averageScore: profile.average_score || 0,
                nextExamDate: profile.exam_date || '2026-07-01',
            };
        }

    } catch (err) {
        console.warn("Supabase fetch failed, falling back to mock data.", err);
    }

    // Fallback if Supabase fails (e.g., tables not created yet)
    await new Promise((r) => setTimeout(r, 400));
    return { ...mockProgress, studentId };
}

export async function fetchLessonSlots(): Promise<LessonSlot[]> {
    await new Promise((r) => setTimeout(r, 350));
    return mockLessonSlots;
}
