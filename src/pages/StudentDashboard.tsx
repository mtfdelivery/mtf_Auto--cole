import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bell, ChevronDown, User, Settings, LogOut, Flame, Play,
    CheckCircle, Lock, Download, AlertCircle, Phone, ArrowRight,
    TrendingUp, FileText, CheckCircle2, XCircle, Unlock, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';

// --- MOCK DATA ---
const userProfile = {
    firstName: "Aziz",
    isPremium: true,
    examDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
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

const recentExams = [
    { id: 1, date: "Hier", score: 26, duration: "14m 20s", passed: true },
    { id: 2, date: "Lun 12 Mai", score: 22, duration: "15m 05s", passed: false },
    { id: 3, date: "Dim 11 Mai", score: 28, duration: "12m 45s", passed: true },
];

const videos = [
    { id: 1, title: "Leçon 1 — Introduction et Installation", duration: "5 min", completed: true, isPremium: false },
    { id: 2, title: "Leçon 2 — Signalisation verticale", duration: "12 min", completed: true, isPremium: false },
    { id: 3, title: "Leçon 3 — Priorités & intersections", duration: "15 min", completed: false, isPremium: true, progress: 45 },
    { id: 4, title: "Leçon 4 — Le Dépassement", duration: "9 min", completed: false, isPremium: true, progress: 0 },
    { id: 5, title: "Leçon 5 — Arrêt et Stationnement", duration: "11 min", completed: false, isPremium: true, progress: 0 },
];

const pdfs = [
    { id: 1, title: "Signalisation verticale", size: "1.2 MB", isPremium: false },
    { id: 2, title: "Priorités & intersections", size: "2.4 MB", isPremium: true },
    { id: 3, title: "Distances de freinage", size: "0.8 MB", isPremium: true },
    { id: 4, title: "Les sanctions et amendes", size: "1.5 MB", isPremium: true },
];


export default function StudentDashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [voucherCode, setVoucherCode] = useState('');
    const [voucherStatus, setVoucherStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleVoucherSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (voucherCode.length < 5) setVoucherStatus('error');
        else setVoucherStatus('success');
    };

    // Calculate days until exam
    const daysUntilExam = Math.ceil((userProfile.examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

    // Average score color wrapper
    const getScoreColor = (score: number) => {
        if (score >= 85) return '#10b981'; // Green
        if (score >= 70) return '#f59e0b'; // Amber
        return '#ef4444'; // Red
    };

    return (
        <PageTransition style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
            <Helmet>
                <title>Mon Espace | mtf Auto-école</title>
            </Helmet>

            {/* 1. Navigation Bar (sticky) */}
            <header style={{
                position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(12px)', borderBottom: '1px solid #e2e8f0',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 24px', height: 64
            }}>
                {/* ... Header Content (Unchanged) ... */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                        <div style={{ width: 32, height: 32, background: 'var(--clr-primary)', borderRadius: 8, display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 700 }}>m</div>
                        <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#0f172a', letterSpacing: '-0.02em' }}>
                            mtf <span style={{ color: 'var(--clr-primary)' }}>Auto-école</span>
                        </span>
                    </Link>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <button style={{ position: 'relative', background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                        <Bell size={22} />
                        <span style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, background: '#ef4444', borderRadius: '50%', border: '2px solid #fff' }} />
                    </button>

                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                        >
                            <div style={{ position: 'relative' }}>
                                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#334155' }}>
                                    {userProfile.firstName.charAt(0)}
                                </div>
                                {userProfile.isPremium && (
                                    <div style={{ position: 'absolute', bottom: -2, right: -2, background: '#f59e0b', color: '#fff', width: 14, height: 14, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>
                                        <Star size={8} fill="#fff" />
                                    </div>
                                )}
                            </div>
                            <ChevronDown size={16} color="#64748b" />
                        </button>

                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    style={{
                                        position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: 220,
                                        background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0',
                                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', overflow: 'hidden'
                                    }}
                                >
                                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{userProfile.firstName}</div>
                                        {userProfile.isPremium ? (
                                            <div style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 4 }}>👑 Premium Actif</div>
                                        ) : (
                                            <div style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 4 }}>K Compte Gratuit</div>
                                        )}
                                    </div>
                                    <div style={{ padding: 8 }}>
                                        <Link to="/settings" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', color: '#475569', textDecoration: 'none', borderRadius: 8, fontSize: '14px', fontWeight: 500 }}>
                                            <User size={16} /> Mon Profil
                                        </Link>
                                        <Link to="/settings" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', color: '#475569', textDecoration: 'none', borderRadius: 8, fontSize: '14px', fontWeight: 500 }}>
                                            <Settings size={16} /> Paramètres
                                        </Link>
                                        <button style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', color: '#ef4444', background: 'transparent', border: 'none', width: '100%', borderRadius: 8, fontSize: '14px', fontWeight: 500, cursor: 'pointer', textAlign: 'left' }}>
                                            <LogOut size={16} /> Déconnexion
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </header>

            <div style={{ display: 'flex', flex: 1 }}>
                {/* DRAWER / SIDEBAR */}
                <aside style={{ width: 280, borderRight: '1px solid #e2e8f0', background: '#fff', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 32 }}>
                    <div>
                        <h2 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Mon Étude</h2>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 8, background: '#ecfdf5', color: '#10b981', fontWeight: 700, textDecoration: 'none' }}>
                                <User size={18} /> Vue d'ensemble
                            </Link>
                            <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 8, color: '#475569', fontWeight: 600, textDecoration: 'none' }}>
                                <Play size={18} /> Vidéos (Leçons)
                            </Link>
                            <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 8, color: '#475569', fontWeight: 600, textDecoration: 'none' }}>
                                <FileText size={18} /> Examens Blancs
                            </Link>
                            <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 8, color: '#475569', fontWeight: 600, textDecoration: 'none' }}>
                                <Download size={18} /> Fiches PDF
                            </Link>
                        </nav>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <main style={{ maxWidth: 1000, margin: '0 auto', width: '100%', padding: '32px 32px 64px', display: 'flex', flexDirection: 'column', gap: 40 }}>

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

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: 32, alignItems: 'start' }}>
                        {/* LEFT COLUMN */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

                            {/* 4. Exam Simulator Section */}
                            <section>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Simulateur d'Examen</h2>
                                    <Link to="/learner/exam" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.875rem', borderRadius: 12 }}>Nouveau test</Link>
                                </div>

                                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 24, padding: '8px 0', overflow: 'hidden' }}>
                                    {recentExams.map((exam, i) => (
                                        <div key={exam.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: i < recentExams.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                                <div style={{ width: 48, height: 48, borderRadius: 12, background: exam.passed ? '#ecfdf5' : '#fef2f2', color: exam.passed ? '#10b981' : '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    {exam.passed ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem' }}>Test du {exam.date}</div>
                                                    <div style={{ color: '#64748b', fontSize: '0.875rem', display: 'flex', gap: 12 }}>
                                                        <span>{exam.duration}</span>
                                                        <span>•</span>
                                                        <span style={{ color: exam.passed ? '#059669' : '#dc2626', fontWeight: 600 }}>{exam.score}/30 correct</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button style={{ padding: '8px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '0.875rem', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>Réviser</button>
                                        </div>
                                    ))}
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

                            {/* 6. PDF Cheat Sheets Section */}
                            <section>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Fiches de Révision</h2>
                                <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 16, WebkitOverflowScrolling: 'touch' }}>
                                    {pdfs.map((pdf) => (
                                        <div key={pdf.id} style={{ flex: '0 0 240px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 20, padding: 20, position: 'relative' }}>
                                            <div style={{ width: 40, height: 40, background: '#fee2e2', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: '#ef4444' }}>
                                                <FileText size={20} />
                                            </div>
                                            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.3, marginBottom: 8 }}>{pdf.title}</h3>
                                            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 16 }}>{pdf.size}</div>
                                            <button style={{ width: '100%', padding: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, fontWeight: 600, color: '#475569', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                                                <Download size={14} /> Télécharger
                                            </button>

                                            {!userProfile.isPremium && pdf.isPremium && (
                                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(2px)', borderRadius: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                                    <div style={{ width: 32, height: 32, background: '#fff', border: '1px solid #e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                                                        <Lock size={16} />
                                                    </div>
                                                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Premium</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>

                        </div>

                        {/* RIGHT COLUMN */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

                            {/* 5. Video Lessons Section */}
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
                                                display: 'flex', alignItems: 'center', gap: 16, padding: '12px',
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
                                                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{vid.title}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{vid.duration}</div>
                                                </div>
                                                {isActive && (
                                                    <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #d97706', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* 7. Voucher Activation Panel */}
                            <section id="voucher" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 24, padding: 24, position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: '#10b981', filter: 'blur(80px)', opacity: 0.2 }} />
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}><Unlock size={20} color="#10b981" /> Activer Premium</h2>
                                <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: 16 }}>Accédez à toutes les vidéos, PDFs et examens illimités.</p>

                                <form onSubmit={handleVoucherSubmit} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                                    <input
                                        type="text"
                                        value={voucherCode}
                                        onChange={(e) => setVoucherCode(e.target.value)}
                                        placeholder="CD-XXXX-XXXX"
                                        style={{ flex: 1, padding: '12px 16px', borderRadius: 12, border: '1px solid #cbd5e1', fontSize: '0.875rem', fontFamily: 'monospace', textTransform: 'uppercase' }}
                                    />
                                    <button type="submit" style={{ padding: '0 20px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }}>Activer</button>
                                </form>

                                {voucherStatus === 'error' && <div style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 600, marginBottom: 16 }}>Code invalide ou expiré.</div>}
                                {voucherStatus === 'success' && <div style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 600, marginBottom: 16 }}>Bravo ! Ton compte Premium est activé.</div>}

                                <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5, paddingTop: 16, borderTop: '1px solid #e2e8f0' }}>
                                    Tu n'as pas encore de code ? Contacte ton auto-école ou paie directement via Dinar Postale.
                                    <a href="https://wa.me/21600000000" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#25d366', fontWeight: 700, textDecoration: 'none', marginTop: 8 }}>
                                        <Phone size={14} /> Contacter sur WhatsApp
                                    </a>
                                </div>
                            </section>

                        </div>
                    </div>
                </main>
            </div>
        </PageTransition>
    );
}
