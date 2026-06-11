import { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Mail, Phone, MessageSquare, FileText, ChevronRight, Search } from 'lucide-react';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const faqItems = [
    { q: "Comment réserver une séance de conduite ?", a: "Allez dans l'onglet 'Mon Planning' et cliquez sur 'Demander une séance'. Choisissez ensuite un créneau disponible avec votre moniteur." },
    { q: "Combien de temps est valable l'abonnement ?", a: "Votre abonnement Premium est valable un an à partir de la date de souscription." },
    { q: "Où puis-je télécharger mon attestation de réussite ?", a: "Une fois votre examen validé, le document sera disponible dans la section 'Fiches PDF' sous l'onglet 'Documents Officiels'." },
    { q: "Mon code d'accès (Voucher) ne fonctionne pas", a: "Veuillez vérifier que le code est saisi sans espaces. Si le problème persiste, contactez le support technique via le bouton 'Contacter le support'." },
];

export default function DashboardAssistance() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

            {/* Header / Hero */}
            <motion.div variants={itemVariants} style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: 24, padding: '48px 40px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                        <div style={{ background: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 12 }}>
                            <HelpCircle size={24} color="#fff" />
                        </div>
                        <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 800 }}>Centre d'Assistance</h1>
                    </div>
                    <p style={{ margin: '0 0 32px 0', fontSize: '1.125rem', color: '#cbd5e1', maxWidth: 600, lineHeight: 1.6 }}>
                        Comment pouvons-nous vous aider aujourd'hui ? Trouvez des réponses rapides ou contactez notre équipe de support.
                    </p>

                    {/* Search Bar */}
                    <div style={{ position: 'relative', maxWidth: 600 }}>
                        <Search size={20} color="#94a3b8" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="text"
                            placeholder="Rechercher une question, un article..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%', padding: '16px 20px 16px 48px', borderRadius: 16, border: 'none',
                                outline: 'none', fontSize: '1rem', color: '#0f172a', fontWeight: 500,
                                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                            }}
                        />
                    </div>
                </div>
                {/* Decorative BG */}
                <div style={{ position: 'absolute', top: -50, right: -50, width: 300, height: 300, background: 'rgba(255,255,255,0.05)', borderRadius: '50%', border: '40px solid rgba(255,255,255,0.02)' }} />
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: 32, alignItems: 'start' }}>

                {/* Left: FAQ Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Questions Fréquentes (FAQ)</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {faqItems.filter(item => item.q.toLowerCase().includes(searchQuery.toLowerCase())).map((item, idx) => (
                            <motion.div key={idx} variants={itemVariants} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 24, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 12 }}>
                                    <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.4 }}>{item.q}</h3>
                                    <button style={{ background: '#f8fafc', border: 'none', width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                                        <ChevronRight size={16} color="#64748b" />
                                    </button>
                                </div>
                                <p style={{ margin: 0, color: '#64748b', fontSize: '0.9375rem', lineHeight: 1.6 }}>{item.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right: Contact Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Contactez-nous</h2>

                    <motion.div variants={itemVariants} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 24, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                <div style={{ width: 48, height: 48, borderRadius: 12, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                                    <MessageSquare size={24} />
                                </div>
                                <div>
                                    <h4 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>Chat en direct</h4>
                                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>Réponse en - de 5 min</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                <div style={{ width: 48, height: 48, borderRadius: 12, background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>Appeler l'Auto-école</h4>
                                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>+216 71 123 456</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                <div style={{ width: 48, height: 48, borderRadius: 12, background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>Email Support</h4>
                                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>support@mtf.tn</p>
                                </div>
                            </div>

                        </div>

                        <button style={{
                            width: '100%', marginTop: 24, padding: '14px', background: '#0f172a', color: '#fff',
                            border: 'none', borderRadius: 12, fontWeight: 700, fontSize: '0.9375rem', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                        }}>
                            <FileText size={18} /> Ouvrir un ticket
                        </button>
                    </motion.div>
                </div>

            </div>
        </motion.div>
    );
}
