import { Helmet } from 'react-helmet-async';
import PageTransition from '@/components/PageTransition';

export default function Contact() {
    return (
        <PageTransition>
            <Helmet>
                <title>Contact | mtf Auto-école</title>
            </Helmet>
            <section style={{ padding: 'var(--space-12) 0', background: 'var(--clr-white)', minHeight: '60vh' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>Contact</h1>
                    <p style={{ color: 'var(--clr-text-light)' }}>Page en cours de construction.</p>
                </div>
            </section>
        </PageTransition>
    );
}
