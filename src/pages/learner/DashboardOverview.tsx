import { Play, TrendingUp, Flame, FileText, AlertCircle, ArrowRight, BookOpen, Clock } from 'lucide-react';
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
        { topic: "Priorités et Intersections", score: 61, videoId: 4 }
    ]
};

export default function DashboardOverview() {
    const daysUntilExam = Math.ceil((userProfile.examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

    // Clean, professional color scheme mapping
    const getScoreColor = (score: number) => {
        if (score >= 85) return '#059669'; // Darker Emerald
        if (score >= 70) return '#d97706'; // Darker Amber
        return '#dc2626'; // Darker Red
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

            {/* 2. CLEAN HERO WELCOME STRIP */}
            <section style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24,
                background: '#fff', padding: '32px 40px', borderRadius: 16,
                border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', margin: 0, letterSpacing: '-0.01em' }}>
                            Bonjour, {userProfile.firstName}
                        </h1>
                        {userProfile.isPremium && (
                            <span style={{
                                background: '#f8fafc', color: '#475569', border: '1px solid #cbd5e1',
                                padding: '4px 10px', borderRadius: 6, fontSize: '0.75rem',
                                fontWeight: 600, letterSpacing: '0.05em'
                            }}>PRO</span>
                        )}
                    </div>
                    <p style={{ color: '#475569', margin: 0, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Clock size={16} /> Ton examen est prévu dans <strong style={{ color: '#0f172a', fontWeight: 600 }}>{daysUntilExam} jours</strong>.
                    </p>
                </div>

                <Link to="/dashboard/videos" style={{
                    background: '#10b981', color: '#fff', textDecoration: 'none',
                    padding: '12px 24px', borderRadius: 8, fontWeight: 600, fontSize: '0.9375rem',
                    display: 'flex', alignItems: 'center', gap: 8, transition: 'background 0.2s'
                }}>
                    <Play size={18} fill="currentColor" /> Reprendre la révision
                </Link>
            </section>

            {/* 3. PROGRESS GRID */}
            <section>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', margin: 0 }}>Statistiques Globales</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>

                    {/* Card 1: Score */}
                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748b', fontSize: '0.875rem', fontWeight: 500, marginBottom: 12 }}>
                            <TrendingUp size={16} /> Score Moyen
                        </div>
                        <div style={{ fontSize: '2.25rem', fontWeight: 700, color: getScoreColor(userProfile.avgScore), lineHeight: 1 }}>
                            {userProfile.avgScore}%
                        </div>
                    </div>

                    {/* Card 2: Streak */}
                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748b', fontSize: '0.875rem', fontWeight: 500, marginBottom: 12 }}>
                            <Flame size={16} /> Jours consécutifs
                        </div>
                        <div style={{ fontSize: '2.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>
                            {userProfile.streak} <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 500 }}>jours</span>
                        </div>
                    </div>

                    {/* Card 3: Exams */}
                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748b', fontSize: '0.875rem', fontWeight: 500, marginBottom: 12 }}>
                            <FileText size={16} /> Tests Blancs
                        </div>
                        <div style={{ fontSize: '2.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>
                            {userProfile.examsTaken} <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 500 }}>faits</span>
                        </div>
                    </div>

                    {/* Card 4: Videos */}
                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748b', fontSize: '0.875rem', fontWeight: 500, marginBottom: 12 }}>
                            <BookOpen size={16} /> Programme Vidéo
                        </div>
                        <div style={{ fontSize: '2.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1, marginBottom: 12 }}>
                            {userProfile.videosWatched}<span style={{ color: '#94a3b8', fontSize: '1.25rem', fontWeight: 500 }}>/{userProfile.totalVideos}</span>
                        </div>
                        <div style={{ width: '100%', height: 4, background: '#f1f5f9', borderRadius: 2, overflow: 'hidden' }}>
                            <div style={{ width: `${(userProfile.videosWatched / userProfile.totalVideos) * 100}%`, height: '100%', background: '#10b981' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. WEAK AREAS - PROFESSIONAL */}
            <section style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ borderBottom: '1px solid #f1f5f9', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#fdf2f8', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AlertCircle size={18} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', margin: 0 }}>Points d'amélioration</h2>
                        <p style={{ color: '#64748b', margin: 0, fontSize: '0.875rem', marginTop: 2 }}>Thèmes à réviser en priorité selon vos dernières erreurs</p>
                    </div>
                </div>

                <div style={{ padding: '24px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
                        {userProfile.weakAreas.map((area, i) => (
                            <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.9375rem' }}>{area.topic}</span>
                                    <span style={{ background: '#fef2f2', color: '#dc2626', padding: '4px 8px', borderRadius: 6, fontWeight: 600, fontSize: '0.75rem' }}>{area.score}% de réussite</span>
                                </div>
                                <div style={{ width: '100%', height: 4, background: '#f1f5f9', borderRadius: 2, overflow: 'hidden' }}>
                                    <div style={{ width: `${area.score}%`, height: '100%', background: '#dc2626' }} />
                                </div>
                                <Link to="/dashboard/videos" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a', borderRadius: 6, fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none', transition: 'background 0.2s' }}>
                                    <Play size={14} fill="currentColor" /> Révisez ce module
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
