import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Star, MapPin, Phone, CheckCircle, ArrowRight, ShieldCheck, Clock, Map, ChevronLeft } from 'lucide-react';
import PageTransition from '@/components/PageTransition';

const mockSchool = {
    name: "Auto-école Tunis Centre",
    address: "Avenue Habib Bourguiba, Tunis",
    phone: "+216 71 123 456",
    rating: 4.8,
    reviews: 124,
    price: "30 DT/h",
    services: ["Code de la route", "Conduite B", "Conduite Accompagnée"],
    description: "Située en plein cœur de Tunis, notre auto-école vous offre une formation de qualité avec des moniteurs expérimentés et des véhicules récents. Rejoignez-nous pour obtenir votre permis dans les meilleures conditions et en un temps record grâce à notre pédagogie innovante et notre suivi personnalisé.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1920&q=80",
};

export default function SchoolDetails() {
    const { slug } = useParams<{ slug: string }>();

    return (
        <PageTransition>
            <Helmet>
                <title>{mockSchool.name} — mtf Auto-école</title>
                <meta name="description" content={mockSchool.description.slice(0, 160)} />
            </Helmet>

            {/* Top Navigation - Glassmorphism */}
            <header style={{
                position: 'fixed', top: 0, width: '100%', zIndex: 50,
                background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(16px)',
                borderBottom: '1px solid var(--clr-border)', transition: 'all 0.3s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
                <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link to="/ecoles" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--clr-text-light)', textDecoration: 'none' }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--clr-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ChevronLeft size={20} />
                        </div>
                        <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Retour aux résultats</span>
                    </Link>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 32, height: 32, background: 'var(--clr-primary)', borderRadius: 8, display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 700 }}>m</div>
                        <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--clr-text)' }}>mtf <span style={{ color: 'var(--clr-primary)' }}>Auto-école</span></span>
                    </Link>
                    <div style={{ width: 120 }} />
                </div>
            </header>

            {/* Immersive Hero Cover */}
            <div style={{
                position: 'relative', width: '100%', height: '55vh', minHeight: 400,
                background: '#0f172a', marginTop: 64, overflow: 'hidden'
            }}>
                <img
                    src={mockSchool.image}
                    alt="Couverture de l'auto-école"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3), transparent)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.6), transparent)' }} />

                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end' }}>
                    <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', padding: '0 24px', paddingBottom: 48 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 700, color: '#fff' }}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8, width: 'fit-content',
                                background: '#10b981', color: '#fff', padding: '6px 14px', borderRadius: 'var(--radius-full)',
                                fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase',
                                boxShadow: '0 4px 14px rgba(16,185,129,0.2)'
                            }}>
                                <ShieldCheck size={16} /> ÉCOLE CERTIFIÉE
                            </div>
                            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1, margin: 0 }}>
                                {mockSchool.name}
                            </h1>
                            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, color: '#d1d5db', fontWeight: 500, fontSize: '0.875rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)', padding: '8px 16px', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <MapPin size={20} color="#34d399" /> {mockSchool.address}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)', padding: '8px 16px', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <Phone size={20} color="#34d399" /> {mockSchool.phone}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Layout */}
            <main style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48 }}>

                    {/* Left Column: Details (65%) */}
                    <div style={{ flex: '1 1 600px', display: 'flex', flexDirection: 'column', gap: 48 }}>

                        {/* Rating Summary Block */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 24, paddingBottom: 32, borderBottom: '1px solid var(--clr-border)' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 16, background: '#fffbeb', borderRadius: 'var(--radius-xl)', border: '1px solid #fef3c7', minWidth: 120 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#f59e0b', marginBottom: 4 }}>
                                    <Star size={28} fill="#f59e0b" />
                                    <span style={{ fontSize: '1.875rem', fontWeight: 900 }}>{mockSchool.rating}</span>
                                </div>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Excellent</span>
                            </div>
                            <div>
                                <h3 style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--clr-text)', margin: 0 }}>Avis des élèves</h3>
                                <p style={{ color: 'var(--clr-text-light)', fontSize: '0.875rem', margin: '4px 0 0' }}>Basé sur <span style={{ fontWeight: 700, color: 'var(--clr-text)' }}>{mockSchool.reviews} évaluations</span> authentiques d'anciens candidats.</p>
                            </div>
                        </div>

                        {/* About */}
                        <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, margin: 0 }}>À propos de l'auto-école</h2>
                            <p style={{ color: 'var(--clr-text-light)', lineHeight: 1.7, fontSize: '1.0625rem', margin: 0, whiteSpace: 'pre-line' }}>
                                {mockSchool.description}
                            </p>
                        </section>

                        {/* Services */}
                        <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, margin: 0 }}>Formations proposées</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                                {mockSchool.services.map(service => (
                                    <div key={service} style={{
                                        display: 'flex', alignItems: 'center', gap: 16, padding: 16,
                                        borderRadius: 'var(--radius-xl)', border: '1px solid var(--clr-border)',
                                        background: 'var(--clr-surface)', transition: 'all 0.2s ease', cursor: 'pointer'
                                    }}>
                                        <div style={{ background: '#fff', padding: 10, borderRadius: 'var(--radius-lg)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', color: '#10b981' }}>
                                            <CheckCircle size={20} strokeWidth={2.5} />
                                        </div>
                                        <span style={{ fontWeight: 700, color: 'var(--clr-text)' }}>{service}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Practical Info */}
                        <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, margin: 0 }}>Informations pratiques</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                                <div style={{ padding: 24, background: '#fff', border: '1px solid var(--clr-border)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                                    <div style={{ background: 'rgba(16,185,129,0.08)', color: '#059669', padding: 14, borderRadius: 'var(--radius-xl)' }}><Clock size={24} /></div>
                                    <div>
                                        <h4 style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--clr-text)', margin: 0 }}>Horaires</h4>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-light)', marginTop: 8, lineHeight: 1.6 }}>Lun - Sam : 08h00 - 18h00<br />Dimanche : Fermé</p>
                                    </div>
                                </div>
                                <div style={{ padding: 24, background: '#fff', border: '1px solid var(--clr-border)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                                    <div style={{ background: 'rgba(16,185,129,0.08)', color: '#059669', padding: 14, borderRadius: 'var(--radius-xl)' }}><Map size={24} /></div>
                                    <div>
                                        <h4 style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--clr-text)', margin: 0 }}>Plan d'accès</h4>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-light)', marginTop: 8, lineHeight: 1.6 }}>{mockSchool.address}</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Pre-Booking Widget (35%) */}
                    <div style={{ flex: '0 0 380px', maxWidth: 400 }}>
                        <div style={{
                            position: 'sticky', top: 112,
                            background: '#fff', border: '1px solid #e5e7eb',
                            boxShadow: '0 20px 60px -15px rgba(0,0,0,0.05)',
                            borderRadius: '2rem', padding: 32,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
                        }}>
                            {/* Price Block */}
                            <div style={{
                                width: '100%', background: 'rgba(16,185,129,0.06)', borderRadius: 'var(--radius-xl)', padding: 24,
                                marginBottom: 32, border: '1px solid rgba(16,185,129,0.1)', position: 'relative', overflow: 'hidden'
                            }}>
                                <div style={{ position: 'absolute', top: 0, right: 0, width: 96, height: 96, background: 'rgba(16,185,129,0.1)', borderRadius: '50%', filter: 'blur(32px)', marginRight: -40, marginTop: -40 }} />
                                <span style={{ color: '#047857', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', display: 'block', marginBottom: 8 }}>Tarif de base estimé</span>
                                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 6 }}>
                                    <span style={{ fontSize: '3.75rem', fontWeight: 900, color: '#059669', letterSpacing: '-0.02em' }}>{mockSchool.price.split(' ')[0]}</span>
                                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'rgba(5,150,105,0.6)', marginBottom: 8 }}>DT / heure</span>
                                </div>
                            </div>

                            {/* Features */}
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 20, textAlign: 'left', marginBottom: 32, padding: '0 8px' }}>
                                {[
                                    { title: "Réservation en direct", desc: "Choisissez vos créneaux en ligne selon vos disponibilités." },
                                    { title: "Paiement flexible", desc: "Réglez sur place lors de votre première séance ou en ligne." },
                                    { title: "Annulation gratuite", desc: "Jusqu'à 48h avant le début de votre séance." },
                                ].map((f, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                                        <div style={{ marginTop: 4, background: 'rgba(16,185,129,0.1)', borderRadius: '50%', padding: 4 }}>
                                            <CheckCircle size={16} color="#059669" strokeWidth={3} />
                                        </div>
                                        <div>
                                            <h4 style={{ fontWeight: 700, color: 'var(--clr-text)', fontSize: '0.875rem', margin: 0 }}>{f.title}</h4>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--clr-text-light)', margin: '2px 0 0' }}>{f.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <Link
                                to={`/ecoles/${slug}/book`}
                                className="btn btn-primary"
                                style={{
                                    width: '100%', fontWeight: 700, fontSize: '1.0625rem', padding: '16px 24px',
                                    borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                    boxShadow: '0 8px 20px -4px rgba(16,185,129,0.3)', textDecoration: 'none'
                                }}
                            >
                                Réserver mon créneau <ArrowRight size={20} />
                            </Link>

                            <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#9ca3af', marginTop: 20, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                🔒 Aucun paiement requis pour réserver
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </PageTransition>
    );
}
