import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Calendar, Shield, Key, Bell, Globe, Camera, Check, Award, CreditCard, MapPin, Clock, X, AlertTriangle, Eye, EyeOff } from 'lucide-react';

const initialProfile = {
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
const modalOverlay: React.CSSProperties = {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200
};
const modalBox: React.CSSProperties = {
    background: '#fff', borderRadius: 20, padding: 32, width: 420, maxWidth: '90vw', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)'
};

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const itemVariants = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export default function DashboardProfile() {
    // Editable fields
    const [phone, setPhone] = useState(initialProfile.phone);
    const [examDate, setExamDate] = useState(initialProfile.examDate);
    const [address, setAddress] = useState(initialProfile.address);
    const [notifications, setNotifications] = useState({ email: true, push: true, sms: false });
    const [language, setLanguage] = useState<'fr' | 'ar'>('fr');
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Modal states
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);

    // Password form
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPw, setShowCurrentPw] = useState(false);
    const [showNewPw, setShowNewPw] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState(false);

    // Delete confirmation
    const [deleteConfirmText, setDeleteConfirmText] = useState('');

    // Toast
    const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

    const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSave = () => {
        showToast('Profil mis à jour avec succès ✓');
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAvatarUrl(url);
            showToast('Photo de profil mise à jour');
        }
    };

    const handlePasswordChange = () => {
        setPasswordError('');
        if (!currentPassword) { setPasswordError('Veuillez entrer votre mot de passe actuel'); return; }
        if (newPassword.length < 8) { setPasswordError('Le nouveau mot de passe doit contenir au moins 8 caractères'); return; }
        if (newPassword !== confirmPassword) { setPasswordError('Les mots de passe ne correspondent pas'); return; }
        setPasswordSuccess(true);
        setTimeout(() => {
            setShowPasswordModal(false);
            setPasswordSuccess(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            showToast('Mot de passe modifié avec succès');
        }, 1200);
    };

    const handle2FAToggle = () => {
        setIs2FAEnabled(!is2FAEnabled);
        showToast(is2FAEnabled ? '2FA désactivée' : '2FA activée avec succès 🔒');
    };

    const handleDeleteAccount = () => {
        if (deleteConfirmText === 'SUPPRIMER') {
            showToast('Demande de suppression envoyée. Vous recevrez un email de confirmation.', 'error');
            setShowDeleteModal(false);
            setDeleteConfirmText('');
        }
    };

    const daysUntilExam = Math.max(0, Math.ceil((new Date(examDate).getTime() - Date.now()) / 86400000));

    return (
        <>
            {/* TOAST NOTIFICATION */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: 'fixed', top: 80, right: 32, zIndex: 300, padding: '14px 24px',
                            background: toast.type === 'success' ? '#10b981' : '#ef4444', color: '#fff',
                            borderRadius: 12, fontWeight: 600, fontSize: '0.875rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)',
                            display: 'flex', alignItems: 'center', gap: 10
                        }}
                    >
                        {toast.type === 'success' ? <Check size={18} /> : <AlertTriangle size={18} />}
                        {toast.msg}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                {/* PAGE HEADER */}
                <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Mon Profil</h1>
                        <p style={{ color: '#64748b', fontSize: '0.9375rem', margin: '4px 0 0' }}>Gérez vos informations personnelles et préférences</p>
                    </div>
                    <button onClick={handleSave} style={{
                        padding: '10px 24px', background: '#0f172a', color: '#fff',
                        border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '0.875rem',
                        cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8
                    }}>
                        Sauvegarder
                    </button>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 24, alignItems: 'start' }}>

                    {/* LEFT COLUMN */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                        {/* Avatar Card */}
                        <motion.div variants={itemVariants} style={{ ...cardStyle, textAlign: 'center', padding: '40px 28px' }}>
                            <div style={{ position: 'relative', width: 96, height: 96, margin: '0 auto 20px' }}>
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt="Avatar" style={{ width: 96, height: 96, borderRadius: '50%', objectFit: 'cover', border: '3px solid #e2e8f0' }} />
                                ) : (
                                    <div style={{
                                        width: 96, height: 96, borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '2.25rem', fontWeight: 800, color: '#fff'
                                    }}>
                                        {initialProfile.firstName[0]}{initialProfile.lastName[0]}
                                    </div>
                                )}
                                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
                                <button onClick={() => fileInputRef.current?.click()} style={{
                                    position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, borderRadius: '50%',
                                    background: '#0f172a', color: '#fff', border: '3px solid #fff',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                                }}>
                                    <Camera size={14} />
                                </button>
                            </div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{initialProfile.firstName} {initialProfile.lastName}</div>
                            <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: 4 }}>{initialProfile.email}</div>
                            <div style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', background: '#fef3c7', borderRadius: 20 }}>
                                <Award size={14} color="#d97706" />
                                <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#92400e' }}>{initialProfile.subscription}</span>
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
                                    <div style={valueStyle}>{new Date(initialProfile.subscriptionExpiry).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                                </div>
                                <div style={{ height: 1, background: '#f1f5f9' }} />
                                <div>
                                    <div style={labelStyle}>Progression conduite</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
                                        <div style={{ flex: 1, height: 6, background: '#f1f5f9', borderRadius: 3, overflow: 'hidden' }}>
                                            <div style={{ width: `${(initialProfile.lessonsCompleted / initialProfile.lessonsTotal) * 100}%`, height: '100%', background: '#10b981', borderRadius: 3 }} />
                                        </div>
                                        <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#10b981' }}>{initialProfile.lessonsCompleted}/{initialProfile.lessonsTotal}</span>
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

                    {/* RIGHT COLUMN */}
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
                                    <div style={valueStyle}>{initialProfile.firstName}</div>
                                </div>
                                <div>
                                    <label style={labelStyle}>Nom</label>
                                    <div style={valueStyle}>{initialProfile.lastName}</div>
                                </div>
                                <div>
                                    <label style={labelStyle}>Email</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <Mail size={14} color="#64748b" />
                                        <span style={valueStyle}>{initialProfile.email}</span>
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
                                        <span style={valueStyle}>{new Date(initialProfile.dateOfBirth).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
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
                                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} style={inputStyle} />
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
                                    <button onClick={() => setShowPasswordModal(true)} style={{ padding: '8px 16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, fontWeight: 600, fontSize: '0.8125rem', color: '#0f172a', cursor: 'pointer' }}>
                                        Modifier
                                    </button>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <Shield size={16} color="#64748b" />
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#0f172a' }}>Authentification 2FA</div>
                                            <div style={{ fontSize: '0.8125rem', color: is2FAEnabled ? '#10b981' : '#ef4444' }}>{is2FAEnabled ? 'Activée ✓' : 'Non activée'}</div>
                                        </div>
                                    </div>
                                    <button onClick={handle2FAToggle} style={{ padding: '8px 16px', background: is2FAEnabled ? '#f1f5f9' : '#10b981', border: is2FAEnabled ? '1px solid #e2e8f0' : 'none', borderRadius: 8, fontWeight: 600, fontSize: '0.8125rem', color: is2FAEnabled ? '#64748b' : '#fff', cursor: 'pointer' }}>
                                        {is2FAEnabled ? 'Désactiver' : 'Activer'}
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
                                            onClick={() => { setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] })); showToast(`${item.label} ${notifications[item.key] ? 'désactivées' : 'activées'}`); }}
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
                                {([{ id: 'fr' as const, label: 'Français' }, { id: 'ar' as const, label: 'العربية' }]).map(lang => (
                                    <button key={lang.id} onClick={() => { setLanguage(lang.id); showToast(`Langue changée : ${lang.label}`); }} style={{
                                        padding: '10px 20px', borderRadius: 10, fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.2s',
                                        background: language === lang.id ? '#0f172a' : '#f8fafc', color: language === lang.id ? '#fff' : '#64748b',
                                        border: language === lang.id ? 'none' : '1px solid #e2e8f0'
                                    }}>
                                        {lang.label}
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Account Footer */}
                        <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                            <div style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>
                                Membre depuis le {new Date(initialProfile.joinDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </div>
                            <button onClick={() => setShowDeleteModal(true)} style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #fca5a5', borderRadius: 8, fontWeight: 600, fontSize: '0.8125rem', color: '#ef4444', cursor: 'pointer' }}>
                                Supprimer mon compte
                            </button>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* PASSWORD CHANGE MODAL */}
            <AnimatePresence>
                {showPasswordModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={modalOverlay} onClick={() => setShowPasswordModal(false)}>
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} style={modalBox} onClick={e => e.stopPropagation()}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Modifier le mot de passe</h3>
                                <button onClick={() => setShowPasswordModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={20} /></button>
                            </div>

                            {passwordSuccess ? (
                                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                        <Check size={28} color="#10b981" />
                                    </div>
                                    <div style={{ fontWeight: 700, fontSize: '1.125rem', color: '#0f172a' }}>Mot de passe modifié !</div>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <div>
                                        <label style={labelStyle}>Mot de passe actuel</label>
                                        <div style={{ position: 'relative' }}>
                                            <input type={showCurrentPw ? 'text' : 'password'} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} style={inputStyle} placeholder="••••••••" />
                                            <button onClick={() => setShowCurrentPw(!showCurrentPw)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                                                {showCurrentPw ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Nouveau mot de passe</label>
                                        <div style={{ position: 'relative' }}>
                                            <input type={showNewPw ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} style={inputStyle} placeholder="Minimum 8 caractères" />
                                            <button onClick={() => setShowNewPw(!showNewPw)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                                                {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                        {newPassword.length > 0 && (
                                            <div style={{ marginTop: 8, display: 'flex', gap: 4 }}>
                                                {[1, 2, 3, 4].map(i => (
                                                    <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: newPassword.length >= i * 3 ? (newPassword.length >= 8 ? '#10b981' : '#f59e0b') : '#e2e8f0' }} />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Confirmer</label>
                                        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} style={inputStyle} placeholder="Retapez le nouveau mot de passe" />
                                    </div>

                                    {passwordError && (
                                        <div style={{ padding: '10px 14px', background: '#fef2f2', borderRadius: 8, color: '#dc2626', fontSize: '0.8125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <AlertTriangle size={14} /> {passwordError}
                                        </div>
                                    )}

                                    <button onClick={handlePasswordChange} style={{ padding: '12px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '0.9375rem', cursor: 'pointer', marginTop: 8 }}>
                                        Mettre à jour
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* DELETE ACCOUNT MODAL */}
            <AnimatePresence>
                {showDeleteModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={modalOverlay} onClick={() => setShowDeleteModal(false)}>
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} style={modalBox} onClick={e => e.stopPropagation()}>
                            <div style={{ textAlign: 'center', marginBottom: 24 }}>
                                <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                    <AlertTriangle size={28} color="#ef4444" />
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>Supprimer votre compte ?</h3>
                                <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0, lineHeight: 1.5 }}>
                                    Cette action est irréversible. Toutes vos données, progressions, et résultats d'examens seront définitivement supprimés.
                                </p>
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <label style={labelStyle}>Tapez SUPPRIMER pour confirmer</label>
                                <input type="text" value={deleteConfirmText} onChange={e => setDeleteConfirmText(e.target.value)} style={{ ...inputStyle, borderColor: deleteConfirmText === 'SUPPRIMER' ? '#ef4444' : '#e2e8f0' }} placeholder="SUPPRIMER" />
                            </div>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <button onClick={() => { setShowDeleteModal(false); setDeleteConfirmText(''); }} style={{ flex: 1, padding: '12px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 10, fontWeight: 600, cursor: 'pointer' }}>
                                    Annuler
                                </button>
                                <button onClick={handleDeleteAccount} disabled={deleteConfirmText !== 'SUPPRIMER'} style={{
                                    flex: 1, padding: '12px', background: deleteConfirmText === 'SUPPRIMER' ? '#ef4444' : '#fca5a5',
                                    color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600, cursor: deleteConfirmText === 'SUPPRIMER' ? 'pointer' : 'not-allowed'
                                }}>
                                    Supprimer
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
