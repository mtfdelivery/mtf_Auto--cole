import { Play, CheckCircle, Lock } from 'lucide-react';

const userProfile = { isPremium: true, videosWatched: 8, totalVideos: 12 };
const videos = [
    { id: 1, title: "Leçon 1 — Introduction et Installation", duration: "5 min", completed: true, isPremium: false },
    { id: 2, title: "Leçon 2 — Signalisation verticale", duration: "12 min", completed: true, isPremium: false },
    { id: 3, title: "Leçon 3 — Priorités & intersections", duration: "15 min", completed: false, isPremium: true, progress: 45 },
    { id: 4, title: "Leçon 4 — Le Dépassement", duration: "9 min", completed: false, isPremium: true, progress: 0 },
    { id: 5, title: "Leçon 5 — Arrêt et Stationnement", duration: "11 min", completed: false, isPremium: true, progress: 0 },
];

export default function DashboardVideos() {
    return (
        <section style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 24, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px 0' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0, marginBottom: 16 }}>Programme Vidéo</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: 8 }}>
                    <span>{userProfile.videosWatched} sur {userProfile.totalVideos} complétées</span>
                    <span>{Math.round((userProfile.videosWatched / userProfile.totalVideos) * 100)}%</span>
                </div>
                <div style={{ width: '100%', height: 4, background: '#f1f5f9', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${(userProfile.videosWatched / userProfile.totalVideos) * 100}%`, height: '100%', background: '#10b981' }} />
                </div>
            </div>

            <div style={{ padding: 12, marginTop: 12 }}>
                {videos.map((vid, i) => {
                    const isLocked = !userProfile.isPremium && vid.isPremium;
                    const isActive = vid.progress !== undefined && vid.progress > 0;

                    return (
                        <div key={vid.id} style={{
                            display: 'flex', alignItems: 'center', gap: 16, padding: '16px',
                            borderRadius: 16, background: isActive ? '#fef3c7' : 'transparent',
                            border: isActive ? '1px solid #fde68a' : '1px solid transparent',
                            cursor: isLocked ? 'not-allowed' : 'pointer'
                        }}>
                            <div style={{
                                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                                background: vid.completed ? '#10b981' : isLocked ? '#f1f5f9' : '#eff6ff',
                                color: vid.completed ? '#fff' : isLocked ? '#94a3b8' : '#2563eb',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                {vid.completed ? <CheckCircle size={16} /> : isLocked ? <Lock size={16} /> : <Play size={14} fill="currentColor" />}
                            </div>
                            <div style={{ flex: 1, minWidth: 0, opacity: isLocked ? 0.6 : 1 }}>
                                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{vid.title}</div>
                                <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{vid.duration}</div>
                            </div>
                            {isActive && (
                                <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #d97706', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
