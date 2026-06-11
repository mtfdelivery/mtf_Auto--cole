import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postBooking } from '@/api/bookings';
import type { Booking, BookingData } from '@/types';

export function useBooking() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: BookingData) => postBooking(data),
        onMutate: async (newBooking) => {
            // Cancel any outgoing queries
            await queryClient.cancelQueries({ queryKey: ['bookings'] });

            // Snapshot previous value
            const previous = queryClient.getQueryData<Booking[]>(['bookings']);

            // Optimistically add the booking
            queryClient.setQueryData<Booking[]>(['bookings'], (old) => [
                ...(old ?? []),
                {
                    id: `temp-${Date.now()}`,
                    studentId: 'student-1',
                    instructorId: newBooking.instructorId,
                    instructorName: 'Moniteur',
                    date: newBooking.date,
                    time: newBooking.time,
                    duration: newBooking.duration,
                    type: newBooking.type,
                    status: 'en_attente' as const,
                },
            ]);

            return { previous };
        },
        onError: (_err, _newBooking, context) => {
            // Roll back on error
            if (context?.previous) {
                queryClient.setQueryData(['bookings'], context.previous);
            }
        },
        onSettled: () => {
            // Refetch after success or error
            void queryClient.invalidateQueries({ queryKey: ['bookings'] });
        },
    });
}
