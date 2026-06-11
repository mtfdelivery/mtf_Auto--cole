import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchCourses } from '@/api/courses';

export function useCourses(category?: string) {
    return useQuery({
        queryKey: ['courses', category ?? 'all'],
        queryFn: () => fetchCourses(category),
        staleTime: 60_000,
        placeholderData: keepPreviousData,
    });
}
