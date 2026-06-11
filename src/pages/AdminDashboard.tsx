import { Helmet } from 'react-helmet-async';
import PageTransition from '@/components/PageTransition';
import { LayoutDashboard, Ticket, Users, DollarSign } from 'lucide-react';
import VoucherGenerator from '@/components/VoucherGenerator';

export default function AdminDashboard() {
    return (
        <PageTransition>
            <Helmet>
                <title>Administration | mtf Auto-école</title>
            </Helmet>

            <div className="dashboard-layout">
                <aside className="dashboard-sidebar">
                    <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-8)' }}>Portail Admin</h2>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                        <a href="#" className="nav-link"><LayoutDashboard size={20} /> Console de Contrôle</a>
                        <a href="#" className="nav-link active"><Ticket size={20} /> Moteur de Vouchers</a>
                        <a href="#" className="nav-link"><Users size={20} /> Gestion Utilisateurs</a>
                        <a href="#" className="nav-link"><DollarSign size={20} /> Finances & Revenus</a>
                    </nav>
                </aside>

                <main className="dashboard-main">
                    <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h1 style={{ fontSize: '2rem' }}>Administration Système ⚙️</h1>
                                <p style={{ color: 'var(--clr-text-light)' }}>Gérez les accès, les écoles et analysez les revenus.</p>
                            </div>
                            <img
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80"
                                alt="Avatar Admin"
                                style={{ width: 48, height: 48, borderRadius: 'var(--radius-full)', border: '2px solid var(--clr-primary)' }}
                            />
                        </header>

                        <div>
                            <VoucherGenerator />
                        </div>
                    </div>
                </main>
            </div>
        </PageTransition>
    );
}
