import { NavLink } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { fetchCourses } from '@/api/courses';

interface NavBarProps {
    // Pass dynamic import functions so the NavBar can prefetch chunk bundles
    routes: Record<string, () => Promise<unknown>>;
}

export default function NavBar({ routes }: NavBarProps) {
    const queryClient = useQueryClient();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Memoize prefetching so it's snappy and doesn't re-create functions
    const prefetchCourses = useCallback(() => {
        routes['/courses']?.();
        // Pre-seed TanStack Query cache dynamically
        void queryClient.prefetchQuery({
            queryKey: ['courses', 'all'],
            queryFn: () => fetchCourses('all'),
        });
    }, [routes, queryClient]);

    const prefetchInstructors = useCallback(() => {
        routes['/instructors']?.();
    }, [routes]);

    const prefetchPricing = useCallback(() => {
        routes['/pricing']?.();
    }, [routes]);

    const prefetchLogin = useCallback(() => {
        routes['/login']?.();
    }, [routes]);

    const toggleMenu = () => setMobileMenuOpen((p) => !p);

    return (
        <>
            <header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 40,
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderBottom: '1px solid var(--clr-border)',
                }}
            >
                <div
                    className="container"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '72px',
                    }}
                >
                    {/* Logo */}
                    <NavLink
                        to="/"
                        style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}
                    >
                        <div
                            style={{
                                width: 32,
                                height: 32,
                                background: 'var(--clr-primary)',
                                borderRadius: '8px',
                                display: 'grid',
                                placeItems: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontFamily: 'var(--font-display)',
                            }}
                        >
                            m
                        </div>
                        <span
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: '700',
                                fontSize: '1.25rem',
                                color: 'var(--clr-text)',
                                letterSpacing: '-0.025em',
                            }}
                        >
                            mtf <span style={{ color: 'var(--clr-primary)' }}>Auto-école</span>
                        </span>
                    </NavLink>

                    {/* Desktop Nav */}
                    <nav
                        style={{
                            display: 'none',
                            alignItems: 'center',
                            gap: 'var(--space-2)',
                        }}
                        className="desktop-nav"
                    >
                        <NavLink
                            to="/courses"
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            onMouseEnter={prefetchCourses}
                        >
                            Formations
                        </NavLink>
                        <NavLink
                            to="/instructors"
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            onMouseEnter={prefetchInstructors}
                        >
                            Moniteurs
                        </NavLink>
                        <NavLink
                            to="/pricing"
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            onMouseEnter={prefetchPricing}
                        >
                            Tarifs
                        </NavLink>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            Contact
                        </NavLink>
                    </nav>

                    {/* Actions */}
                    <div
                        style={{
                            display: 'none',
                            alignItems: 'center',
                            gap: 'var(--space-4)',
                        }}
                        className="desktop-actions"
                    >
                        <NavLink
                            to="/login"
                            className="btn btn-outline"
                            onMouseEnter={prefetchLogin}
                        >
                            Connexion
                        </NavLink>
                        <NavLink to="/signup" className="btn btn-primary">
                            S'inscrire
                        </NavLink>
                    </div>

                    <style dangerouslySetInnerHTML={{
                        __html: `
            @media (min-width: 1024px) {
              .desktop-nav, .desktop-actions { display: flex !important; }
              .mobile-toggle { display: none !important; }
            }
          `}} />

                    {/* Mobile Menu Toggle */}
                    <button
                        className="mobile-toggle"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        style={{ padding: 'var(--space-2)' }}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu (CSS-only animation via classes) */}
            <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)} />
            <aside className={`mobile-menu-panel ${mobileMenuOpen ? 'open' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-8)' }}>
                    <button onClick={() => setMobileMenuOpen(false)} style={{ padding: 'var(--space-2)' }}>
                        <X size={24} />
                    </button>
                </div>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={toggleMenu}>Accueil</NavLink>
                    <NavLink to="/courses" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={toggleMenu}>Formations</NavLink>
                    <NavLink to="/instructors" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={toggleMenu}>Moniteurs</NavLink>
                    <NavLink to="/pricing" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={toggleMenu}>Tarifs</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={toggleMenu}>Contact</NavLink>
                    <div style={{ borderTop: '1px solid var(--clr-border)', margin: 'var(--space-4) 0' }} />
                    <NavLink to="/login" className="btn btn-outline" style={{ justifyContent: 'center' }} onClick={toggleMenu}>Connexion</NavLink>
                    <NavLink to="/signup" className="btn btn-primary" style={{ justifyContent: 'center' }} onClick={toggleMenu}>S'inscrire</NavLink>
                </nav>
            </aside>
        </>
    );
}
