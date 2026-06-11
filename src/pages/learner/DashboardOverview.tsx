import { Play, TrendingUp, Flame, FileText, AlertCircle, ArrowRight, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function DashboardOverview() {
    const daysUntilExam = Math.ceil((userProfile.examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

    const getScoreColor = (score: number) => {
        if (score >= 85) return '#10b981'; // Emerald
        if (score >= 70) return '#f59e0b'; // Amber
        return '#ef4444'; // Red
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            style={{ display: 'flex', flexDirection: 'column', gap: 40 }}
        >
            {/* 2. PREMIUM HERO WELCOME STRIP */}
            <motion.section
                variants={itemVariants}
                style={{
                    position: 'relative', overflow: 'hidden',
                    display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'center',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
                    padding: '40px 32px', borderRadius: 24,
                    border: '1px solid #bbf7d0',
                    boxShadow: '0 20px 25px -5px rgba(16, 185, 129, 0.05), 0 8px 10px -6px rgba(16, 185, 129, 0.01)'
                }}
            >
                {/* Decorative glowing orb */}
                <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: '#34d399', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.4, pointerEvents: 'none' }} />

                <div style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#064e3b', margin: 0, letterSpacing: '-0.03em' }}>Bon retour, {userProfile.firstName} 👋</h1>
                        {userProfile.isPremium ? (
                            <span style={{
                                background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff',
                                padding: '6px 14px', borderRadius: 999, fontSize: '0.75rem',
                                fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em',
                                boxShadow: '0 4px 6px -1px rgba(245, 158, 11, 0.4)'
                            }}>Premium</span>
                        ) : (
                            <a href="#voucher" style={{ background: '#fee2e2', color: '#dc2626', padding: '6px 14px', borderRadius: 999, fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none' }}>Activer Premium</a>
                        )}
                    </div>
                    <p style={{ color: '#047857', margin: 0, fontSize: '1.125rem', fontWeight: 500 }}>
                        Objectif Permis : Examen dans <strong style={{ color: '#065f46', fontWeight: 800 }}>{daysUntilExam} jours</strong>. On continue l'entraînement ?
                    </p>
                </div>
                <div style={{ position: 'relative', zIndex: 10 }}>
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(16,185,129,0.4)' }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            background: '#10b981', color: '#fff', border: 'none',
                            padding: '16px 28px', borderRadius: 16, fontWeight: 800, fontSize: '1.0625rem',
                            display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                            boxShadow: '0 10px 15px -3px rgba(16,185,129,0.3)', transition: 'all 0.2s'
                        }}
                    >
                        <Play size={22} fill="currentColor" />
                        <span>Reprendre <span style={{ opacity: 0.8, fontWeight: 500, fontSize: '0.9375rem', marginLeft: 4 }}>Leçon 3</span></span>
                    </motion.button>
                </div>
            </section>

            {/* 3. PROGRESS GRID */}
            <motion.section variants={itemVariants}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Tableau de bord</h2>
                    <Link to="/dashboard/exams" style={{ color: '#10b981', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                        Voir les détails <ArrowRight size={16} />
                    </Link>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>

                    {/* Card 1: Score */}
                    <motion.div whileHover={{ y: -4 }} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 24, padding: 24, display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', transition: 'box-shadow 0.2s' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#64748b', fontSize: '0.9375rem', fontWeight: 700, marginBottom: 16 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 12, background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Target size={18} />
                            </div>
                            Score Moyen
                        </div>
                        <div style={{ fontSize: '3rem', fontWeight: 900, color: getScoreColor(userProfile.avgScore), lineHeight: 1, letterSpacing: '-0.04em' }}>{userProfile.avgScore}%</div>
                    </motion.div>

                    {/* Card 2: Streak (Premium Glow) */}
                    <motion.div whileHover={{ y: -4 }} style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #fffbeb, #fef3c7)', border: '1px solid #fde68a', borderRadius: 24, padding: 24, display: 'flex', flexDirection: 'column', boxShadow: '0 10px 15px -3px rgba(245, 158, 11, 0.1)' }}>
                        <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, background: '#fbbf24', borderRadius: '50%', filter: 'blur(40px)', opacity: 0.3 }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#b45309', fontSize: '0.9375rem', fontWeight: 700, marginBottom: 16, position: 'relative', zIndex: 2 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(245,158,11,0.2)', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Flame size={18} fill="currentColor" />
                            </div>
                            Jours consécutifs
                        </div>
                        <div style={{ fontSize: '3rem', fontWeight: 900, color: '#d97706', lineHeight: 1, letterSpacing: '-0.04em', position: 'relative', zIndex: 2 }}>
                            {userProfile.streak} <span style={{ fontSize: '1.5rem', verticalAlign: 'top', opacity: 0.8 }}>jours</span>
                        </div>
                    </motion.div>

                    {/* Card 3: Exams */}
                    <motion.div whileHover={{ y: -4 }} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 24, padding: 24, display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#64748b', fontSize: '0.9375rem', fontWeight: 700, marginBottom: 16 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 12, background: '#f3e8ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FileText size={18} />
                            </div>
                            Tests Blancs
                        </div>
                        <div style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a', lineHeight: 1, letterSpacing: '-0.04em' }}>{userProfile.examsTaken}</div>
                    </motion.div>

                    {/* Card 4: Videos */}
                    <motion.div whileHover={{ y: -4 }} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 24, padding: 24, display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#64748b', fontSize: '0.9375rem', fontWeight: 700, marginBottom: 16 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 12, background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Play size={18} fill="currentColor" />
                            </div>
                            Programme Vidéo
                        </div>
                        <div style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a', lineHeight: 1, letterSpacing: '-0.04em' }}>
                            {userProfile.videosWatched}<span style={{ color: '#cbd5e1', fontSize: '1.5rem', fontWeight: 500 }}>/{userProfile.totalVideos}</span>
                        </div>
                        <div style={{ width: '100%', height: 6, background: '#f1f5f9', borderRadius: 3, marginTop: 'auto', overflow: 'hidden' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(userProfile.videosWatched / userProfile.totalVideos) * 100}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                style={{ height: '100%', background: '#10b981', borderRadius: 3 }}
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* 8. WEAK AREAS - SMART ANALYSIS */}
            <motion.section variants={itemVariants} style={{ background: '#1e3a8a', borderRadius: 32, padding: 32, position: 'relative', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(30, 58, 138, 0.3)' }}>
                {/* Decorative background vectors */}
                <div style={{ position: 'absolute', top: -50, left: -50, width: 250, height: 250, background: '#3b82f6', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.5 }} />
                <div style={{ position: 'absolute', bottom: -50, right: -50, width: 300, height: 300, background: '#60a5fa', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.4 }} />

                <div style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                        <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.1)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#93c5fd' }}>
                            <Zap size={24} />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>Algorithme de Révision</h2>
                            <p style={{ color: '#93c5fd', margin: 0, fontSize: '0.9375rem', marginTop: 4 }}>Analyse de tes 3 derniers examens pour cibler tes faiblesses</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {userProfile.weakAreas.map((area, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,1)' }}
                                style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.95)', padding: '16px 24px', borderRadius: 20, transition: 'background 0.2s' }}
                            >
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                        <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.0625rem' }}>{area.topic}</span>
                                        <span style={{ background: '#fee2e2', color: '#ef4444', padding: '2px 8px', borderRadius: 8, fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase' }}>{area.score}% validé</span>
                                    </div>
                                    <div style={{ width: '100%', height: 6, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${area.score}%` }}
                                            transition={{ duration: 1, delay: 0.6 + (i * 0.2) }}
                                            style={{ height: '100%', background: '#ef4444', borderRadius: 3 }}
                                        />
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ marginLeft: 32, padding: '12px 16px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 12, fontSize: '0.875rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)' }}
                                >
                                    <Play size={14} fill="currentColor" /> Revoir ce cours
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>
        </motion.div>
    );
}
