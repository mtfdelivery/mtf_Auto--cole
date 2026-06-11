import { Play, TrendingUp, Flame, FileText, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// MOCK DATA for OVERVIEW
const userProfile = {
    firstName: "Aziz",
    isPremium: true,
    examDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    streak: 5,
    avgScore: 73,
    examsTaken: 12,
    videosWatched: 8,
    totalVideos: 12,
    weakAreas: [
        { topic: "Signalisation", score: 43, videoId: 2 },
        { topic: "Priorités", score: 61, videoId: 4 }
    ]
};

export default function DashboardOverview() {
    const daysUntilExam = Math.ceil((userProfile.examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

    const getScoreColor = (score: number) => {
        if (score >= 85) return '#10b981';
        if (score >= 70) return '#f59e0b';
        return '#ef4444';
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {/* 2. Hero Welcome Strip */}
            <section style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'center', background: '#fff', padding: 32, borderRadius: 24, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>Bon retour, {userProfile.firstName} 👋</h1>
                        {userProfile.isPremium ? (
                            <span style={{ background: '#fef3c7', color: '#d97706', padding: '4px 10px', borderRadius: 999, fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Premium</span>
                        ) : (
                            <a href="#voucher" style={{ background: '#fee2e2', color: '#dc2626', padding: '4px 10px', borderRadius: 999, fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none' }}>Activer Premium</a>
                        )}
                    </div>
                    <p style={{ color: '#64748b', margin: 0, fontSize: '1.0625rem' }}>
                        Ton examen est dans <strong style={{ color: '#10b981', fontWeight: 800 }}>{daysUntilExam} jours</strong>. On continue l'entraînement ?
                    </p>
                </div>
                <div>
                    <button style={{ background: '#10b981', color: '#fff', border: 'none', padding: '16px 24px', borderRadius: 16, fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(16,185,129,0.3)', transition: 'transform 0.2s' }}>
                        <Play size={20} fill="currentColor" /> Reprendre la Leçon 3
                    </button>
                </div>
            </section>

            {/* 3. Progress Overview 2x2 */}
            <section>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Ta progression</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                    {/* Avg Score */}
                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748b', fontSize: '0.875rem', fontWeight: 600, marginBottom: 12 }}>
                            <TrendingUp size={16} /> Score Moyen
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 900, color: getScoreColor(userProfile.avgScore), lineHeight: 1 }}>{userProfile.avgScore}%</div>
                    </div>

                    {/* Streak */}
                    <div style={{ background: 'linear-gradient(135deg, #fffbeb, #fef3c7)', border: '1px solid #fde68a', borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#b45309', fontSize: '0.875rem', fontWeight: 600, marginBottom: 12 }}>
                            <Flame size={16} /> Jours consécutifs
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#d97706', lineHeight: 1 }}>{userProfile.streak} <span style={{ fontSize: '1.25rem' }}>🔥</span></div>
                    </div>

                    {/* Exams */}
                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748b', fontSize: '0.875rem', fontWeight: 600, marginBottom: 12 }}>
                            <FileText size={16} /> Examens Blancs
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{userProfile.examsTaken}</div>
                    </div>

                    {/* Videos */}
                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748b', fontSize: '0.875rem', fontWeight: 600, marginBottom: 12 }}>
                            <Play size={16} /> Vidéos vues
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{userProfile.videosWatched}<span style={{ color: '#94a3b8', fontSize: '1.5rem' }}>/{userProfile.totalVideos}</span></div>
                        <div style={{ width: '100%', height: 4, background: '#f1f5f9', borderRadius: 2, marginTop: 12, overflow: 'hidden' }}>
                            <div style={{ width: `${(userProfile.videosWatched / userProfile.totalVideos) * 100}%`, height: '100%', background: '#10b981' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Weak Areas Widget */}
            <section style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 24, padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <AlertCircle size={24} color="#2563eb" />
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e3a8a', margin: 0 }}>Points à réviser</h2>
                </div>
                <p style={{ color: '#1e40af', fontSize: '0.9375rem', marginBottom: 20 }}>D'après tes 3 derniers examens, tu perds des points sur ces thèmes :</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {userProfile.weakAreas.map((area, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', background: '#fff', padding: '16px', borderRadius: 16, border: '1px solid #dbeafe' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <span style={{ fontWeight: 700, color: '#1e3a8a' }}>{area.topic}</span>
                                    <span style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.875rem' }}>{area.score}% correct</span>
                                </div>
                                <div style={{ width: '100%', height: 4, background: '#f1f5f9', borderRadius: 2, overflow: 'hidden' }}>
                                    <div style={{ width: `${area.score}%`, height: '100%', background: '#ef4444' }} />
                                </div>
                            </div>
                            <button style={{ marginLeft: 24, padding: '8px 12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Play size={12} fill="currentColor" /> Revoir la vidéo
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
