import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bell, ChevronDown, User, Settings, LogOut, Play,
    FileText, Download, Star, Menu, X, MessageSquare, Sparkles, MessageCircle, Calendar as ReactCalendar
} from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageTransition from '@/components/PageTransition';

// Reusing MOCK DATA for layout profile
const userProfile = {
    firstName: "Aziz",
    isPremium: true
};

export default function LearnerLayout() {
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [notifTab, setNotifTab] = useState<'tous' | 'non lues'>('tous');
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [aiMessages, setAiMessages] = useState<{ text: string; sender: 'ai' | 'user' }[]>([
        { text: "Bonjour ! Je suis votre assistant IA 🤖 Posez-moi vos questions sur le code de la route.", sender: 'ai' }
    ]);
    const [aiInput, setAiInput] = useState('');
    const location = useLocation();

    const AI_REPLIES: Record<string, string> = {
        'priorité': "La priorité à droite s'applique à toute intersection sans signalisation. Si un véhicule arrive à votre droite, vous devez le laisser passer.",
        'stop': "Le panneau STOP impose un arrêt complet. Vous devez marquer un temps d'arrêt à la ligne, même si la voie est libre.",
        'rond-point': "Dans un rond-point, cédez le passage aux véhicules déjà engagés. Utilisez votre clignotant pour signaler votre sortie.",
        'vitesse': "En agglomération : 50 km/h. Hors agglomération : 90 km/h. Autoroute : 130 km/h (110 km/h par temps de pluie).",
        'ceinture': "Le port de la ceinture de sécurité est obligatoire pour tous les occupants du véhicule, avant et arrière.",
    };

    const handleAiSend = () => {
        if (!aiInput.trim()) return;
        const userMsg = aiInput.trim();
        setAiMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
        setAiInput('');

        setTimeout(() => {
            const key = Object.keys(AI_REPLIES).find(k => userMsg.toLowerCase().includes(k));
            const reply = key ? (AI_REPLIES[key] ?? "Je vérifie...") : "Bonne question ! Je vais vérifier cela. En attendant, consultez vos cours vidéo pour plus de détails. 📚";
            setAiMessages(prev => [...prev, { text: reply, sender: 'ai' }]);
        }, 800);
    };

    const navItems = [
        { path: '/dashboard', label: t('dashboard.overview'), icon: User },
        { path: '/dashboard/videos', label: t('dashboard.videos'), icon: Play },
        { path: '/dashboard/calendar', label: t('dashboard.planning'), icon: ReactCalendar },
        { path: '/dashboard/exams', label: t('dashboard.exams'), icon: FileText },
        { path: '/dashboard/pdfs', label: t('dashboard.pdfs'), icon: Download },
        { path: '/dashboard/chat', label: t('dashboard.chat'), icon: MessageCircle },
        { path: '/dashboard/assistance', label: t('dashboard.assistance'), icon: Sparkles },
        { path: '/dashboard/profile', label: t('dashboard.profile'), icon: Settings },
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <button
                        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Menu size={24} />
                    </button>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                        <div style={{ width: 32, height: 32, background: 'var(--clr-primary)', borderRadius: 8, display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 700 }}>m</div>
                        <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#0f172a', letterSpacing: '-0.02em' }}>
                            mtf <span style={{ color: 'var(--clr-primary)' }}>Auto-école</span>
                        </span>
                    </Link>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                            style={{ position: 'relative', background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}
                        >
                            <Bell size={22} />
                            <span style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, background: '#ef4444', borderRadius: '50%', border: '2px solid #fff' }} />
                        </button>

                        <AnimatePresence>
                            {isNotificationsOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    style={{
                                        position: 'absolute', top: 'calc(100% + 12px)', right: 0, width: 340,
                                        background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0',
                                        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)', overflow: 'hidden', zIndex: 100
                                    }}
                                >
                                    <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: '#3b82f6' }}>Notifications</h3>
                                        <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                                            <Settings size={20} />
                                        </button>
                                    </div>

                                    <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>
                                        <button
                                            onClick={() => setNotifTab('tous')}
                                            style={{ flex: 1, padding: '12px 0', background: 'transparent', border: 'none', borderBottom: notifTab === 'tous' ? '2px solid #3b82f6' : '2px solid transparent', color: notifTab === 'tous' ? '#3b82f6' : '#64748b', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', textTransform: 'uppercase' }}
                                        >
                                            TOUS
                                        </button>
                                        <button
                                            onClick={() => setNotifTab('non lues')}
                                            style={{ flex: 1, padding: '12px 0', background: 'transparent', border: 'none', borderBottom: notifTab === 'non lues' ? '2px solid #3b82f6' : '2px solid transparent', color: notifTab === 'non lues' ? '#3b82f6' : '#64748b', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', textTransform: 'uppercase' }}
                                        >
                                            NON LUES
                                        </button>
                                    </div>

                                    <div style={{ padding: '48px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#fff' }}>
                                        <div style={{ width: 64, height: 64, background: '#fffbeb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                                            <Bell size={28} color="#f59e0b" fill="#fcd34d" />
                                        </div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.9375rem', fontWeight: 500 }}>Pas de notifications</div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

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
                                        <Link to="/dashboard/profile" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', color: '#475569', textDecoration: 'none', borderRadius: 8, fontSize: '14px', fontWeight: 500 }}>
                                            <User size={16} /> Mon Profil
                                        </Link>
                                        <Link to="/dashboard/profile" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', color: '#475569', textDecoration: 'none', borderRadius: 8, fontSize: '14px', fontWeight: 500 }}>
                                            <Settings size={16} /> Paramètres
                                        </Link>
                                        <button
                                            onClick={() => i18n.changeLanguage(i18n.language === 'fr' ? 'ar' : 'fr')}
                                            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', color: '#475569', background: 'transparent', border: 'none', width: '100%', borderRadius: 8, fontSize: '14px', fontWeight: 500, cursor: 'pointer', textAlign: 'left' }}
                                        >
                                            <span style={{ fontSize: 16 }}>🌍</span> {i18n.language === 'fr' ? 'Passer en Arabe' : 'Passer en Français'}
                                        </button>
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

            <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
                {/* DRAWER / SIDEBAR (Mini-variant supported) */}
                <motion.aside
                    animate={{ width: isDrawerOpen ? 280 : 80 }}
                    transition={{ duration: 0.3, ease: 'circOut' }}
                    style={{
                        position: 'sticky', top: 64, height: 'calc(100vh - 64px)',
                        borderRight: '1px solid #e2e8f0', background: '#fff',
                        display: 'flex', flexDirection: 'column', flexShrink: 0, zIndex: 40, overflow: 'hidden'
                    }}
                >
                    <div style={{ padding: isDrawerOpen ? '32px 24px' : '32px 16px', overflowY: 'auto', flex: 1, overflowX: 'hidden' }}>
                        <div style={{ display: 'flex', justifyContent: isDrawerOpen ? 'space-between' : 'center', alignItems: 'center', marginBottom: 24, height: 20 }}>
                            <AnimatePresence mode="wait">
                                {isDrawerOpen ? (
                                    <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }} style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0, whiteSpace: 'nowrap' }}>Mon Étude</motion.h2>
                                ) : (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ width: 4, height: 4, borderRadius: '50%', background: '#cbd5e1' }} />
                                )}
                            </AnimatePresence>
                        </div>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link key={item.path} to={item.path} style={{
                                        display: 'flex', alignItems: 'center', gap: 12, padding: isDrawerOpen ? '10px 12px' : '12px', borderRadius: 12,
                                        background: isActive ? '#ecfdf5' : 'transparent',
                                        color: isActive ? '#10b981' : '#475569',
                                        fontWeight: isActive ? 700 : 600, textDecoration: 'none',
                                        justifyContent: isDrawerOpen ? 'flex-start' : 'center',
                                        transition: 'background 0.2s'
                                    }}>
                                        <item.icon size={20} style={{ flexShrink: 0 }} />
                                        <AnimatePresence>
                                            {isDrawerOpen && (
                                                <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                                    {item.label}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </motion.aside>

                {/* MAIN CONTENT NESTED */}
                <main style={{ flex: 1, padding: '32px 32px 64px' }}>
                    <div style={{ maxWidth: 1440, margin: '0 auto', width: '100%' }}>
                        <Outlet />
                    </div>
                </main>

                {/* FLOATING AI ASSISTANT */}
                <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
                    <AnimatePresence>
                        {isChatOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                style={{ width: 320, height: 420, background: '#fff', borderRadius: 20, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                            >
                                <div style={{ background: '#10b981', color: '#fff', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <Sparkles size={18} />
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>IA CodeDrive</div>
                                            <div style={{ fontSize: '0.6875rem', opacity: 0.85 }}>Assistant Virtuel</div>
                                        </div>
                                    </div>
                                    <button onClick={() => setIsChatOpen(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex' }}><X size={18} /></button>
                                </div>
                                <div style={{ flex: 1, background: '#f8fafc', padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {aiMessages.map((msg, i) => (
                                        <div key={i} style={{ alignSelf: msg.sender === 'ai' ? 'flex-start' : 'flex-end', maxWidth: '85%' }}>
                                            <div style={{
                                                padding: '10px 14px', borderRadius: 16, fontSize: '0.8125rem', lineHeight: 1.5,
                                                background: msg.sender === 'ai' ? '#fff' : '#10b981',
                                                color: msg.sender === 'ai' ? '#334155' : '#fff',
                                                border: msg.sender === 'ai' ? '1px solid #e2e8f0' : 'none',
                                                borderBottomLeftRadius: msg.sender === 'ai' ? 4 : 16,
                                                borderBottomRightRadius: msg.sender === 'user' ? 4 : 16,
                                            }}>{msg.text}</div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ padding: 12, background: '#fff', borderTop: '1px solid #e2e8f0' }}>
                                    <div style={{ background: '#f1f5f9', borderRadius: 24, padding: '6px 6px 6px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <input
                                            type="text"
                                            value={aiInput}
                                            onChange={(e) => setAiInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleAiSend()}
                                            placeholder="Posez votre question..."
                                            style={{ border: 'none', background: 'transparent', outline: 'none', flex: 1, fontSize: '0.8125rem', color: '#0f172a' }}
                                        />
                                        <button
                                            onClick={handleAiSend}
                                            disabled={!aiInput.trim()}
                                            style={{ width: 32, height: 32, borderRadius: '50%', background: aiInput.trim() ? '#10b981' : '#e2e8f0', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: aiInput.trim() ? 'pointer' : 'default', flexShrink: 0, transition: 'background 0.2s' }}
                                        >
                                            <ChevronDown size={16} style={{ transform: 'rotate(-90deg)' }} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={() => setIsChatOpen(!isChatOpen)}
                        style={{
                            width: 48, height: 48, borderRadius: '50%', background: '#10b981', color: '#fff',
                            border: 'none', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.2s'
                        }}
                    >
                        {isChatOpen ? <X size={20} /> : <Sparkles size={20} />}
                    </button>
                </div>
            </div>
        </PageTransition>
    );
}
