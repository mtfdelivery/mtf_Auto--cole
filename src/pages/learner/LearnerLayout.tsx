import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bell, ChevronDown, User, Settings, LogOut, Play,
    FileText, Download, Star
} from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';

// Reusing MOCK DATA for layout profile
const userProfile = {
    firstName: "Aziz",
    isPremium: true
};

export default function LearnerLayout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { path: '/dashboard', label: "Vue d'ensemble", icon: User },
        { path: '/dashboard/videos', label: "Vidéos (Leçons)", icon: Play },
        { path: '/dashboard/exams', label: "Examens Blancs", icon: FileText },
        { path: '/dashboard/pdfs', label: "Fiches PDF", icon: Download },
    ];

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
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link key={item.path} to={item.path} style={{
                                        display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 8,
                                        background: isActive ? '#ecfdf5' : 'transparent',
                                        color: isActive ? '#10b981' : '#475569',
                                        fontWeight: isActive ? 700 : 600, textDecoration: 'none'
                                    }}>
                                        <item.icon size={18} /> {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </aside>

                {/* MAIN CONTENT NESTED */}
                <main style={{ flex: 1, padding: '32px 32px 64px', overflowY: 'auto' }}>
                    <div style={{ maxWidth: 1000, margin: '0 auto', width: '100%' }}>
                        <Outlet />
                    </div>
                </main>
            </div>
        </PageTransition>
    );
}
