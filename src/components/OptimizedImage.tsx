import { useState, type CSSProperties } from 'react';

interface OptimizedImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    style?: CSSProperties;
    eager?: boolean;
}

export default function OptimizedImage({
    src,
    alt,
    width,
    height,
    className,
    style,
    eager = false,
}: OptimizedImageProps) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: width,
                aspectRatio: `${width} / ${height}`,
                overflow: 'hidden',
                borderRadius: 'inherit',
                ...style,
            }}
        >
            {/* Blur placeholder skeleton */}
            {!loaded && (
                <div
                    className="img-skeleton"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 'inherit',
                    }}
                    aria-hidden="true"
                />
            )}
            <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                loading={eager ? 'eager' : 'lazy'}
                decoding="async"
                onLoad={() => setLoaded(true)}
                className={className}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: loaded ? 1 : 0,
                    transition: 'opacity 0.2s ease-out',
                    borderRadius: 'inherit',
                }}
            />
        </div>
    );
}
