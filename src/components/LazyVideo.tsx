import { useRef, useState, useEffect, type CSSProperties } from 'react';

interface LazyVideoProps {
    src: string;
    poster?: string;
    width?: number;
    height?: number;
    className?: string;
    style?: CSSProperties;
    muted?: boolean;
    autoPlay?: boolean;
    loop?: boolean;
}

export default function LazyVideo({
    src,
    poster,
    width,
    height,
    className,
    style,
    muted = true,
    autoPlay = true,
    loop = true,
}: LazyVideoProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                position: 'relative',
                width: width ?? '100%',
                height: height ?? '100%',
                overflow: 'hidden',
                ...style,
            }}
        >
            {/* Poster fallback */}
            {poster && !isVisible && (
                <img
                    src={poster}
                    alt=""
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                    aria-hidden="true"
                />
            )}
            {isVisible && (
                <video
                    src={src}
                    poster={poster}
                    muted={muted}
                    autoPlay={autoPlay}
                    loop={loop}
                    playsInline
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            )}
        </div>
    );
}
