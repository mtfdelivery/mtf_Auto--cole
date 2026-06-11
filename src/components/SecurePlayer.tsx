import { useEffect, useRef } from "react";

interface SecurePlayerProps {
    videoUrl?: string;
    userEmail: string;
    title?: string;
}

export default function SecurePlayer({
    videoUrl,
    userEmail,
    title,
}: SecurePlayerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Disable right-click on the video container
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };

        container.addEventListener("contextmenu", handleContextMenu);
        return () => container.removeEventListener("contextmenu", handleContextMenu);
    }, []);

    return (
        <div ref={containerRef} style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden', background: '#000', userSelect: 'none' }} className="group">
            {/* Inline keyframes for the drifting watermark */}
            <style>{`
                @keyframes drift {
                    0% { top: 0%; left: -10%; transform: rotate(-15deg) translateY(0); }
                    50% { top: 100%; left: 110%; transform: rotate(15deg) translateY(50px); }
                    100% { top: 0%; left: -10%; transform: rotate(-15deg) translateY(0); }
                }
                .watermark-overlay {
                    position: absolute;
                    white-space: nowrap;
                    font-family: monospace;
                    pointer-events: none;
                    animation: drift 25s linear infinite;
                    z-index: 10;
                }
            `}</style>

            {/* Video element */}
            <video
                style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }}
                controls
                controlsList="nodownload noplaybackrate"
                disablePictureInPicture
                playsInline
                poster=""
            >
                {videoUrl && <source src={videoUrl} type="video/mp4" />}
                <p style={{ color: 'var(--clr-text-light)', fontSize: '0.875rem', padding: '16px' }}>
                    Votre navigateur ne supporte pas la lecture vidéo.
                </p>
            </video>

            {/* Anti-piracy watermark overlay */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                {/* Primary drifting watermark */}
                <div
                    className="watermark-overlay"
                    style={{ color: 'rgba(255, 255, 255, 0.15)', fontWeight: 700, fontSize: '0.875rem' }}
                >
                    {userEmail}
                </div>

                {/* Secondary watermark (offset timing) */}
                <div
                    className="watermark-overlay"
                    style={{ color: 'rgba(255, 255, 255, 0.1)', fontSize: '0.75rem', animationDelay: "-6s", animationDuration: "18s" }}
                >
                    {userEmail}
                </div>

                {/* Third watermark for full coverage */}
                <div
                    className="watermark-overlay"
                    style={{ color: 'rgba(255, 255, 255, 0.08)', fontSize: '10px', animationDelay: "-3s", animationDuration: "15s" }}
                >
                    CodeDrive TN • {userEmail}
                </div>
            </div>

            {/* Title overlay */}
            {title && (
                <div
                    style={{
                        position: 'absolute', top: 0, left: 0, right: 0, padding: '16px',
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
                        opacity: 0, transition: 'opacity 0.3s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                >
                    <p style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 500, margin: 0 }}>{title}</p>
                </div>
            )}
        </div>
    );
}
