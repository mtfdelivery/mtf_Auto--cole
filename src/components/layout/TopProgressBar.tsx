import { useEffect, useRef } from 'react';
import { useIsFetching } from '@tanstack/react-query';

export default function TopProgressBar() {
    const isFetching = useIsFetching();
    const barRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const bar = barRef.current;
        if (!bar) return;

        if (isFetching > 0) {
            bar.style.opacity = '1';
            bar.style.width = '0%';

            // Animate to 80% quickly
            requestAnimationFrame(() => {
                bar.style.width = '80%';
            });
        } else {
            // Complete the bar
            bar.style.width = '100%';
            timerRef.current = setTimeout(() => {
                bar.style.opacity = '0';
                setTimeout(() => {
                    bar.style.width = '0%';
                }, 300);
            }, 200);
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [isFetching]);

    return (
        <div
            ref={barRef}
            className="top-progress-bar"
            role="progressbar"
            aria-label="Chargement en cours"
            style={{ width: '0%', opacity: 0 }}
        />
    );
}
