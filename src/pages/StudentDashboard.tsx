import { Helmet } from 'react-helmet-async';
import { TrendingUp, Calendar as CalIcon, BookOpen, Clock } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { useStudentProgress } from '@/hooks/useStudentProgress';
import { DashboardSkeleton } from '@/components/skeletons';
import ChatInterface from '@/components/ChatInterface';

export default function StudentDashboard() {
    const { data: progress, isPending } = useStudentProgress('student-1');

    if (isPending) return <DashboardSkeleton />;

    return (
        <PageTransition>
            <Helmet>
                <title>Tableau de Bord | mtf Auto-école</title>
            </Helmet>

            <div className="dashboard-layout">
                <aside className="dashboard-sidebar">
                    <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-8)' }}>Mon Espace</h2>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                        {/* Synchronous active state */}
                        <a href="#" className="nav-link active">Vue d'ensemble</a>
                        <a href="#" className="nav-link">Cours & Vidéos</a>
                        <a href="#" className="nav-link">Examens Blancs</a>
                        <a href="#" className="nav-link">Réservations</a>
                        <a href="#" className="nav-link">Paiements</a>
                    </nav>
                </aside>

                <main className="dashboard-main">
                    <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>

                        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h1 style={{ fontSize: '2rem' }}>Bonjour, Amine 👋</h1>
                                <p style={{ color: 'var(--clr-text-light)' }}>Voici un résumé de votre progression.</p>
                            </div>
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                                alt="Avatar"
                                style={{ width: 48, height: 48, borderRadius: 'var(--radius-full)', border: '2px solid var(--clr-primary)' }}
                            />
                        </header>

                        {/* Stats Grid */}
                        <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                            <div className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--clr-text-light)' }}>
                                    <span style={{ fontWeight: 600 }}>Avancement Code</span>
                                    <BookOpen size={20} />
                                </div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>{progress?.codeProgress}%</div>
                                <div style={{ width: '100%', height: 6, background: 'var(--clr-muted)', borderRadius: 'var(--radius-full)', marginTop: 'var(--space-2)', overflow: 'hidden' }}>
                                    <div style={{ width: `${progress?.codeProgress}%`, height: '100%', background: 'var(--clr-primary)' }} />
                                </div>
                            </div>

                            <div className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--clr-text-light)' }}>
                                    <span style={{ fontWeight: 600 }}>Heures Conduite</span>
                                    <Clock size={20} />
                                </div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                                    {progress?.completedLessons}/{progress?.totalLessons}
                                </div>
                                <div style={{ width: '100%', height: 6, background: 'var(--clr-muted)', borderRadius: 'var(--radius-full)', marginTop: 'var(--space-2)', overflow: 'hidden' }}>
                                    <div style={{ width: `${(progress?.completedLessons || 0) / (progress?.totalLessons || 1) * 100}%`, height: '100%', background: 'var(--clr-accent)' }} />
                                </div>
                            </div>

                            <div className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--clr-text-light)' }}>
                                    <span style={{ fontWeight: 600 }}>Score Moyen</span>
                                    <TrendingUp size={20} />
                                </div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>{progress?.averageScore}/40</div>
                                <p style={{ fontSize: '0.875rem', color: 'var(--clr-success)', marginTop: 'var(--space-1)' }}>Excellent, vous êtes prêt pour l'examen.</p>
                            </div>
                        </div>

                        {/* Next Milestone */}
                        <div className="card" style={{ padding: 'var(--space-6)', background: 'var(--clr-accent)', color: 'var(--clr-white)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-1)' }}>Prochaine étape importante</h3>
                                <p style={{ color: 'rgba(255,255,255,0.8)' }}>Examen du Code de la Route programmé.</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', background: 'rgba(255,255,255,0.1)', padding: 'var(--space-3) var(--space-6)', borderRadius: 'var(--radius-xl)' }}>
                                <CalIcon size={24} color="var(--clr-primary-light)" />
                                <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                                    {progress?.nextExamDate ? new Date(progress.nextExamDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Non programmé'}
                                </span>
                            </div>
                        </div>

                    </div>

                    <div style={{ marginTop: 'var(--space-12)' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 'var(--space-4)' }}>Assistance & Messagerie</h3>
                        <ChatInterface />
                    </div>
                </main>
            </div>

        </PageTransition>
    );
}
