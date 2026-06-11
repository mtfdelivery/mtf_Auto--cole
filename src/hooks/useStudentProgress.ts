import { useQuery } from '@tanstack/react-query';
import { fetchStudentProgress } from '@/api/students';

export function useStudentProgress(studentId: string) {
    return useQuery({
        queryKey: ['progress', studentId],
        queryFn: () => fetchStudentProgress(studentId),
        staleTime: 60_000,
    });
}
