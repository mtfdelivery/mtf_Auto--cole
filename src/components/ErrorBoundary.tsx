import { Component, type ReactNode, type ErrorInfo } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('[ErrorBoundary]', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="error-boundary">
                    <div style={{ fontSize: '3rem' }}>⚠️</div>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--clr-text)' }}>
                        Une erreur est survenue
                    </h2>
                    <p style={{ color: 'var(--clr-text-light)', maxWidth: 480 }}>
                        Nous sommes désolés, cette page a rencontré un problème inattendu.
                        Veuillez réessayer ou revenir à la page d&apos;accueil.
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                        <button
                            className="btn btn-primary"
                            onClick={() => this.setState({ hasError: false, error: null })}
                        >
                            Réessayer
                        </button>
                        <a href="/" className="btn btn-outline">
                            Accueil
                        </a>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
