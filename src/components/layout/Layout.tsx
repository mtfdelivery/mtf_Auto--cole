import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import TopProgressBar from './TopProgressBar';

interface LayoutProps {
    routes: Record<string, () => Promise<unknown>>;
}

export default function Layout({ routes }: LayoutProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <TopProgressBar />
            <NavBar routes={routes} />
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Outlet />
            </main>

            {/* Simple Footer */}
            <footer style={{ background: 'var(--clr-accent)', color: 'var(--clr-white)', padding: 'var(--space-12) 0 var(--space-8)' }}>
                <div className="container">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <div style={{ width: 24, height: 24, background: 'var(--clr-primary)', borderRadius: '6px', display: 'grid', placeItems: 'center', fontWeight: 'bold', fontSize: '12px' }}>m</div>
                            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.25rem' }}>mtf Auto-école</span>
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 400 }}>La plateforme tunisienne de référence pour la préparation au code de la route et permis de conduire.</p>
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', width: '100%', marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
                            &copy; {new Date().getFullYear()} mtf Auto-école. Tous droits réservés.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
