import { useQuery } from '@tanstack/react-query';
import { fetchInstructors } from '@/api/instructors';

export function useInstructors() {
    return useQuery({
        queryKey: ['instructors'],
        queryFn: fetchInstructors,
        staleTime: 60_000,
    });
}
