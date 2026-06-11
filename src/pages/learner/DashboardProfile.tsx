import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Shield, Key, Bell, Globe, Camera, Check, Award, CreditCard, MapPin, Clock } from 'lucide-react';

const profile = {
    firstName: 'Aziz',
    lastName: 'Ben Salah',
    email: 'aziz.bensalah@gmail.com',
    phone: '+216 98 765 432',
    dateOfBirth: '1998-05-12',
    address: 'Rue du Lac Biwa, Les Berges du Lac, Tunis',
    joinDate: '2025-11-02',
    examDate: '2026-07-15',
    subscription: 'Premium',
    subscriptionExpiry: '2026-12-31',
    lessonsCompleted: 18,
    lessonsTotal: 30,
    examsPassed: 3,
};

const cardStyle: React.CSSProperties = {
    background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: 28
};

const labelStyle: React.CSSProperties = {
    fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6
};

const valueStyle: React.CSSProperties = {
    fontSize: '0.9375rem', fontWeight: 600, color: '#0f172a'
};

const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 10,
    fontSize: '0.9375rem', color: '#0f172a', background: '#f8fafc', outline: 'none', fontFamily: 'inherit'
};

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const itemVariants = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export default function DashboardProfile() {
    const [phone, setPhone] = useState(profile.phone);
    const [examDate, setExamDate] = useState(profile.examDate);
    const [notifications, setNotifications] = useState({ email: true, push: true, sms: false });
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const daysUntilExam = Math.max(0, Math.ceil((new Date(examDate).getTime() - Date.now()) / 86400000));

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* PAGE HEADER */}
            <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Mon Profil</h1>
                    <p style={{ color: '#64748b', fontSize: '0.9375rem', margin: '4px 0 0' }}>Gérez vos informations personnelles et préférences</p>
                </div>
                <button
                    onClick={handleSave}
                    style={{
                        padding: '10px 24px', background: saved ? '#10b981' : '#0f172a', color: '#fff',
                        border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '0.875rem',
                        cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8
                    }}
                >
                    {saved ? <><Check size={16} /> Enregistré !</> : 'Sauvegarder'}
                </button>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 24, alignItems: 'start' }}>

                {/* LEFT COLUMN: Avatar Card + Subscription */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                    {/* Avatar Card */}
                    <motion.div variants={itemVariants} style={{ ...cardStyle, textAlign: 'center', padding: '40px 28px' }}>
                        <div style={{ position: 'relative', width: 96, height: 96, margin: '0 auto 20px' }}>
                            <div style={{
                                width: 96, height: 96, borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '2.25rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em'
                            }}>
                                {profile.firstName[0]}{profile.lastName[0]}
                            </div>
                            <button style={{
                                position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, borderRadius: '50%',
                                background: '#0f172a', color: '#fff', border: '3px solid #fff',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                            }}>
                                <Camera size={14} />
                            </button>
                        </div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{profile.firstName} {profile.lastName}</div>
                        <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: 4 }}>{profile.email}</div>
                        <div style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', background: '#fef3c7', borderRadius: 20 }}>
                            <Award size={14} color="#d97706" />
                            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#92400e' }}>{profile.subscription}</span>
                        </div>
                    </motion.div>

                    {/* Subscription Card */}
                    <motion.div variants={itemVariants} style={cardStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                            <CreditCard size={18} color="#10b981" />
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Abonnement</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div>
                                <div style={labelStyle}>Plan actuel</div>
                                <div style={{ ...valueStyle, color: '#10b981' }}>Premium ✨</div>
                            </div>
                            <div>
                                <div style={labelStyle}>Expire le</div>
                                <div style={valueStyle}>{new Date(profile.subscriptionExpiry).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                            </div>
                            <div style={{ height: 1, background: '#f1f5f9' }} />
                            <div>
                                <div style={labelStyle}>Progression conduite</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
                                    <div style={{ flex: 1, height: 6, background: '#f1f5f9', borderRadius: 3, overflow: 'hidden' }}>
                                        <div style={{ width: `${(profile.lessonsCompleted / profile.lessonsTotal) * 100}%`, height: '100%', background: '#10b981', borderRadius: 3 }} />
                                    </div>
                                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#10b981' }}>{profile.lessonsCompleted}/{profile.lessonsTotal}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Exam Countdown */}
                    <motion.div variants={itemVariants} style={{ ...cardStyle, background: '#0f172a', color: '#fff', textAlign: 'center' }}>
                        <Clock size={24} color="#10b981" style={{ marginBottom: 12 }} />
                        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#10b981', lineHeight: 1 }}>{daysUntilExam}</div>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#94a3b8', marginTop: 6 }}>jours avant l'examen</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 4 }}>{new Date(examDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                    </motion.div>
                </div>

                {/* RIGHT COLUMN: Personal Info, Security, Notifications */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                    {/* Personal Information */}
                    <motion.div variants={itemVariants} style={cardStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                            <User size={18} color="#10b981" />
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Informations personnelles</h3>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                            <div>
                                <label style={labelStyle}>Prénom</label>
                                <div style={valueStyle}>{profile.firstName}</div>
                            </div>
                            <div>
                                <label style={labelStyle}>Nom</label>
                                <div style={valueStyle}>{profile.lastName}</div>
                            </div>
                            <div>
                                <label style={labelStyle}>Email</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Mail size={14} color="#64748b" />
                                    <span style={valueStyle}>{profile.email}</span>
                                </div>
                            </div>
                            <div>
                                <label style={labelStyle}>Téléphone</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Phone size={14} color="#64748b" />
                                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />
                                </div>
                            </div>
                            <div>
                                <label style={labelStyle}>Date de naissance</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Calendar size={14} color="#64748b" />
                                    <span style={valueStyle}>{new Date(profile.dateOfBirth).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                </div>
                            </div>
                            <div>
                                <label style={labelStyle}>Date d'examen</label>
                                <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} style={inputStyle} />
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={labelStyle}>Adresse</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <MapPin size={14} color="#64748b" style={{ flexShrink: 0 }} />
                                    <span style={valueStyle}>{profile.address}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Security */}
                    <motion.div variants={itemVariants} style={cardStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                            <Shield size={18} color="#10b981" />
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Sécurité</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <Key size={16} color="#64748b" />
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#0f172a' }}>Mot de passe</div>
                                        <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>Modifié il y a 3 mois</div>
                                    </div>
                                </div>
                                <button style={{ padding: '8px 16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, fontWeight: 600, fontSize: '0.8125rem', color: '#0f172a', cursor: 'pointer' }}>
                                    Modifier
                                </button>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <Shield size={16} color="#64748b" />
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#0f172a' }}>Authentification 2FA</div>
                                        <div style={{ fontSize: '0.8125rem', color: '#ef4444' }}>Non activée</div>
                                    </div>
                                </div>
                                <button style={{ padding: '8px 16px', background: '#10b981', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '0.8125rem', color: '#fff', cursor: 'pointer' }}>
                                    Activer
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Notifications */}
                    <motion.div variants={itemVariants} style={cardStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                            <Bell size={18} color="#10b981" />
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Notifications</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {([
                                { key: 'email' as const, label: 'Notifications par email', desc: 'Résultats d\'examen, rappels de cours' },
                                { key: 'push' as const, label: 'Notifications push', desc: 'Alertes en temps réel sur votre navigateur' },
                                { key: 'sms' as const, label: 'Notifications SMS', desc: 'Rappels de séances de conduite' },
                            ]).map(item => (
                                <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#0f172a' }}>{item.label}</div>
                                        <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>{item.desc}</div>
                                    </div>
                                    <button
                                        onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                                        style={{
                                            width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer', position: 'relative',
                                            background: notifications[item.key] ? '#10b981' : '#e2e8f0', transition: 'background 0.2s'
                                        }}
                                    >
                                        <div style={{
                                            width: 18, height: 18, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3,
                                            left: notifications[item.key] ? 23 : 3, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                        }} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Language */}
                    <motion.div variants={itemVariants} style={cardStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                            <Globe size={18} color="#10b981" />
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Langue</h3>
                        </div>
                        <div style={{ display: 'flex', gap: 12 }}>
                            {['Français', 'العربية'].map((lang, i) => (
                                <button key={lang} style={{
                                    padding: '10px 20px', borderRadius: 10, fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.2s',
                                    background: i === 0 ? '#0f172a' : '#f8fafc', color: i === 0 ? '#fff' : '#64748b',
                                    border: i === 0 ? 'none' : '1px solid #e2e8f0'
                                }}>
                                    {lang}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Account Info Footer */}
                    <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>
                            Membre depuis le {new Date(profile.joinDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                        <button style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #fca5a5', borderRadius: 8, fontWeight: 600, fontSize: '0.8125rem', color: '#ef4444', cursor: 'pointer' }}>
                            Supprimer mon compte
                        </button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
