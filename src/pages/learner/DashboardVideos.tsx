import { useState } from 'react';
import { Play, CheckCircle, Lock, MonitorPlay, FileText, HelpCircle, MessageSquare, Download, ChevronRight, CheckSquare, ArrowLeft, BookOpen, Car, Wrench, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const userProfile = { isPremium: true, videosWatched: 8, totalVideos: 12 };

const sections = [
    { id: 'code', title: 'Code de la Route', icon: BookOpen, color: '#3b82f6', desc: 'Règles, panneaux et priorités', count: 12 },
    { id: 'conduite', title: 'Conduite Pratique', icon: Car, color: '#10b981', desc: 'Manoeuvres et circulation', count: 8 },
    { id: 'mecanique', title: 'Mécanique Basique', icon: Wrench, color: '#f59e0b', desc: 'Entretien et vérifications', count: 4 },
    { id: 'eco', title: 'Eco-conduite', icon: Leaf, color: '#84cc16', desc: 'Conduire de manière écologique', count: 3 },
];

const videosDatabase = [
    { id: 1, section: 'code', title: "Leçon 1 — Introduction et Installation", duration: "5:20", completed: true, isPremium: false },
    { id: 2, section: 'code', title: "Leçon 2 — Signalisation verticale", duration: "12:45", completed: true, isPremium: false },
    { id: 3, section: 'code', title: "Leçon 3 — Priorités & intersections", duration: "15:30", completed: false, isPremium: true, progress: 45 },
    { id: 4, section: 'code', title: "Leçon 4 — Le Dépassement", duration: "9:15", completed: false, isPremium: true, progress: 0 },
    { id: 5, section: 'conduite', title: "Leçon 1 — Démarrage en côte", duration: "11:00", completed: false, isPremium: true, progress: 0 },
    { id: 6, section: 'conduite', title: "Leçon 2 — Créneau parfait", duration: "14:20", completed: false, isPremium: true, progress: 0 },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function DashboardVideos() {
    const [selectedSection, setSelectedSection] = useState<string | null>(null);
    const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'quiz' | 'qa'>('overview');

    // Section view rendering
    if (!selectedSection) {
        return (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ padding: '0px' }}>
                <motion.div variants={itemVariants} style={{ marginBottom: 32 }}>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>Catalogue de Formations</h1>
                    <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>Choisissez un module pour commencer votre apprentissage vidéo.</p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
                    {sections.map(sec => (
                        <motion.div
                            key={sec.id}
                            variants={itemVariants}
                            onClick={() => {
                                setSelectedSection(sec.id);
                                const firstVid = videosDatabase.find(v => v.section === sec.id);
                                setActiveVideoId(firstVid ? firstVid.id : null);
                            }}
                            style={{
                                background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 24,
                                cursor: 'pointer', transition: 'all 0.2s', position: 'relative', overflow: 'hidden',
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                            }}
                            whileHover={{ y: -4, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        >
                            <div style={{ width: 48, height: 48, borderRadius: 12, background: `${sec.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                                <sec.icon size={24} color={sec.color} />
                            </div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>{sec.title}</h3>
                            <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0 0 16px' }}>{sec.desc}</p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: 16 }}>
                                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#94a3b8' }}>{sec.count} chapitres</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: sec.color, fontSize: '0.875rem', fontWeight: 600 }}>
                                    Entrer <ChevronRight size={16} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        );
    }

    // Video Player View
    const sectionVideos = videosDatabase.filter(v => v.section === selectedSection);
    const activeVideo = sectionVideos.find(v => v.id === activeVideoId) || sectionVideos[0];
    const sectionInfo = sections.find(s => s.id === selectedSection);

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* Header Back Button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button onClick={() => setSelectedSection(null)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, fontWeight: 600, color: '#475569', cursor: 'pointer', transition: 'all 0.2s' }}>
                        <ArrowLeft size={16} /> Retour aux modules
                    </button>
                    <div style={{ padding: '4px 12px', background: `${sectionInfo?.color}15`, color: sectionInfo?.color, borderRadius: 20, fontSize: '0.875rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                        {sectionInfo && <sectionInfo.icon size={14} />} {sectionInfo?.title}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: 24, alignItems: 'start' }}>

                    {/* LEFT: MAIN PLAYER & TABS */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                        {/* Video Player Container */}
                        <div style={{ background: '#0f172a', borderRadius: 16, overflow: 'hidden', aspectRatio: '16/9', position: 'relative', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(45deg, #09090b, #1e293b)' }}>
                                {activeVideo ? (
                                    <div style={{ textAlign: 'center' }}>
                                        <button style={{ width: 64, height: 64, borderRadius: '50%', background: '#10b981', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', cursor: 'pointer', boxShadow: '0 0 20px rgba(16,185,129,0.4)', transition: 'transform 0.2s' }}>
                                            <Play size={28} fill="currentColor" style={{ marginLeft: 4 }} />
                                        </button>
                                        <div style={{ color: '#fff', fontWeight: 600 }}>{activeVideo.title}</div>
                                    </div>
                                ) : (
                                    <div style={{ color: '#94a3b8' }}>Aucune vidéo disponible dans ce module.</div>
                                )}
                            </div>
                        </div>

                        {/* Tabs & Content */}
                        {activeVideo && (
                            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', minHeight: 400 }}>
                                <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', padding: '0 24px', gap: 32 }}>
                                    {[
                                        { id: 'overview', icon: MonitorPlay, label: "Vue d'ensemble" },
                                        { id: 'resources', icon: FileText, label: "Ressources PDF" },
                                        { id: 'quiz', icon: CheckSquare, label: "Quiz Express" },
                                        { id: 'qa', icon: MessageSquare, label: "Discussions" }
                                    ].map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as any)}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: 8, padding: '20px 0',
                                                border: 'none', background: 'transparent', cursor: 'pointer',
                                                color: activeTab === tab.id ? '#10b981' : '#64748b',
                                                fontWeight: activeTab === tab.id ? 700 : 600,
                                                borderBottom: activeTab === tab.id ? '2px solid #10b981' : '2px solid transparent',
                                                marginBottom: -1, fontSize: '0.9375rem', transition: 'all 0.2s'
                                            }}
                                        >
                                            <tab.icon size={18} /> {tab.label}
                                        </button>
                                    ))}
                                </div>

                                <div style={{ padding: 32 }}>
                                    {activeTab === 'overview' && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 16px', color: '#0f172a' }}>À propos de {activeVideo.title}</h3>
                                            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: 24 }}>
                                                Maitrisez les notions essentielles correspondantes à ce chapitre. Le contenu pédagogique est conçu pour vous préparer au mieux à l'examen.
                                            </p>
                                        </motion.div>
                                    )}

                                    {activeTab === 'resources' && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 16px', color: '#0f172a' }}>Documents d'accompagnement</h3>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', border: '1px solid #e2e8f0', borderRadius: 12, background: '#fff' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                                        <div style={{ width: 40, height: 40, background: '#fee2e2', color: '#dc2626', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <FileText size={20} />
                                                        </div>
                                                        <div>
                                                            <div style={{ fontWeight: 600, color: '#0f172a' }}>Résumé du Chapitre (PDF)</div>
                                                            <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>1.2 MB • Synthèse globale</div>
                                                        </div>
                                                    </div>
                                                    <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: '#f1f5f9', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: 8, fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer' }}>
                                                        <Download size={16} /> Télécharger
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'quiz' && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, padding: 16, background: '#eff6ff', borderRadius: 12, border: '1px solid #bfdbfe' }}>
                                                <HelpCircle size={24} color="#2563eb" />
                                                <div>
                                                    <div style={{ fontWeight: 600, color: '#1e3a8a' }}>Testez vos connaissances !</div>
                                                    <div style={{ fontSize: '0.875rem', color: '#1d4ed8' }}>Ce mini-quiz validera cette leçon avant d'avancer.</div>
                                                </div>
                                            </div>
                                            <button style={{ width: '100%', padding: 16, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>
                                                Démarrer le Quiz express
                                            </button>
                                        </motion.div>
                                    )}

                                    {activeTab === 'qa' && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>
                                            <MessageSquare size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
                                            <div style={{ fontWeight: 600, fontSize: '1.125rem', color: '#0f172a', marginBottom: 8 }}>Aucune question pour le moment</div>
                                            <div>Soyez le premier à poser une question au moniteur sur ce chapitre.</div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT: PLAYLIST SIDEBAR */}
                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 160px)', position: 'sticky', top: 96 }}>
                        <div style={{ padding: '24px 20px', borderBottom: '1px solid #e2e8f0' }}>
                            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0f172a', margin: 0, marginBottom: 12 }}>Contenu de {sectionInfo?.title}</h2>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 600, color: '#64748b', marginBottom: 8 }}>
                                <span>Progression globale</span>
                                <span style={{ color: '#10b981' }}>{Math.round((userProfile.videosWatched / userProfile.totalVideos) * 100)}%</span>
                            </div>
                            <div style={{ width: '100%', height: 4, background: '#f1f5f9', borderRadius: 2, overflow: 'hidden' }}>
                                <div style={{ width: `${(userProfile.videosWatched / userProfile.totalVideos) * 100}%`, height: '100%', background: '#10b981' }} />
                            </div>
                        </div>

                        <div style={{ overflowY: 'auto', flex: 1, padding: 12 }}>
                            {sectionVideos.length === 0 ? (
                                <div style={{ padding: 20, textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>
                                    Les vidéos arrivent bientôt.
                                </div>
                            ) : (
                                sectionVideos.map((vid) => {
                                    const isLocked = !userProfile.isPremium && vid.isPremium;
                                    const isSelected = activeVideoId === vid.id;

                                    return (
                                        <div
                                            key={vid.id}
                                            onClick={() => !isLocked && setActiveVideoId(vid.id)}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: 12, padding: '12px',
                                                borderRadius: 12, background: isSelected ? '#ecfdf5' : 'transparent',
                                                cursor: isLocked ? 'not-allowed' : 'pointer', transition: 'background 0.2s',
                                                marginBottom: 4
                                            }}
                                        >
                                            <div style={{
                                                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                                                background: vid.completed ? '#10b981' : isLocked ? '#f1f5f9' : isSelected ? '#10b981' : '#eff6ff',
                                                color: vid.completed ? '#fff' : isLocked ? '#94a3b8' : isSelected ? '#fff' : '#2563eb',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                {vid.completed ? <CheckCircle size={14} /> : isLocked ? <Lock size={14} /> : isSelected ? <MonitorPlay size={14} /> : <Play size={12} fill="currentColor" />}
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0, opacity: isLocked ? 0.5 : 1 }}>
                                                <div style={{ fontWeight: 600, color: isSelected ? '#065f46' : '#0f172a', fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{vid.title}</div>
                                                <div style={{ fontSize: '0.75rem', color: isSelected ? '#047857' : '#64748b' }}>{vid.duration}</div>
                                            </div>
                                            {!isLocked && !vid.completed && !isSelected && (
                                                <ChevronRight size={16} color="#cbd5e1" />
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

