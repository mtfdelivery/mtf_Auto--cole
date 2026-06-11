import { Helmet } from 'react-helmet-async';
import PageTransition from '@/components/PageTransition';
import { LayoutDashboard, BookOpen, FileText, BarChart3 } from 'lucide-react';
import BookingCalendar from '@/components/BookingCalendar';

export default function TeacherDashboard() {
    return (
        <PageTransition>
            <Helmet>
                <title>Espace Moniteur | mtf Auto-école</title>
            </Helmet>

            <div className="dashboard-layout">
                <aside className="dashboard-sidebar">
                    <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-8)' }}>Portail Moniteur</h2>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                        <a href="#" className="nav-link"><LayoutDashboard size={20} /> Tableau de Bord</a>
                        <a href="#" className="nav-link active"><BookOpen size={20} /> Mon Planning</a>
                        <a href="#" className="nav-link"><FileText size={20} /> Ressources Pédagogiques</a>
                        <a href="#" className="nav-link"><BarChart3 size={20} /> Performance Élèves</a>
                    </nav>
                </aside>

                <main className="dashboard-main">
                    <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h1 style={{ fontSize: '2rem' }}>Bonjour, Tarek 🚗</h1>
                                <p style={{ color: 'var(--clr-text-light)' }}>Gérez vos créneaux et vos séances de conduite.</p>
                            </div>
                            <img
                                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&q=80"
                                alt="Avatar Moniteur"
                                style={{ width: 48, height: 48, borderRadius: 'var(--radius-full)', border: '2px solid var(--clr-primary)' }}
                            />
                        </header>

                        <div style={{ display: 'grid', gap: 'var(--space-8)', gridTemplateColumns: 'minmax(0, 1fr) 500px' }}>
                            {/* Dummy Content Left */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Aujourd'hui</h2>
                                <div className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--clr-border)', paddingBottom: 'var(--space-4)' }}>
                                        <div>
                                            <p style={{ fontWeight: 700, margin: 0 }}>Séance Conduite - Amine</p>
                                            <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-light)', margin: 0 }}>Permis B - Parcours Ville</p>
                                        </div>
                                        <div style={{ fontWeight: 800, color: 'var(--clr-primary)' }}>14:00</div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <p style={{ fontWeight: 700, margin: 0 }}>Séance Conduite - Sarah</p>
                                            <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-light)', margin: 0 }}>Permis B - Créneaux</p>
                                        </div>
                                        <div style={{ fontWeight: 800, color: 'var(--clr-primary)' }}>16:00</div>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Calendar Integration Right */}
                            <div>
                                <BookingCalendar schoolName="Auto-école Tunis" />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </PageTransition>
    );
}
