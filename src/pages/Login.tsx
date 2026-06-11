import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, EyeOff, Quote, Cloud, Shield, CheckCircle2, PlaySquare } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import PageTransition from '@/components/PageTransition';

const loginSchema = z.object({
    email: z.string().min(1, 'L\'email est requis').email('Email invalide'),
    password: z.string().min(6, '6 caractères minimum'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
    const navigate = useNavigate();

    // React Hook Form for zero uncontrolled re-renders during typing
    // Validation triggers only on blur
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onBlur',
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            // Simulate network request
            await new Promise((resolve) => setTimeout(resolve, 800));

            console.log('Login attempt with', data);

            // Demo logic
            if (data.email.includes('admin')) {
                toast.success('Connecté en tant qu\'administrateur');
                navigate('/admin');
            } else {
                toast.success('Connexion réussie !');
                navigate('/dashboard');
            }
        } catch {
            toast.error('Identifiants incorrects');
        }
    };

    return (
        <PageTransition>
            <Helmet>
                <title>Connexion | mtf Auto-école</title>
            </Helmet>

            <div className="auth-layout">
                {/* Left Side: Auth Form */}
                <div className="auth-form-side">
                    <Link to="/" className="nav-link" style={{ alignSelf: 'flex-start', padding: 0, background: 'transparent' }}>
                        <div style={{ width: 32, height: 32, background: 'var(--clr-primary)', borderRadius: '8px', display: 'grid', placeItems: 'center', color: 'white', fontWeight: 'bold' }}>m</div>
                        <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--clr-text)' }}>mtf <span style={{ color: 'var(--clr-primary)' }}>Auto-école</span></span>
                    </Link>

                    <div style={{ width: '100%', maxWidth: 420, margin: 'auto' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>Bienvenue !</h1>
                        <p style={{ color: 'var(--clr-text-light)', marginBottom: 'var(--space-12)' }}>
                            Connectez-vous pour accéder à votre tableau de bord et suivre votre progression.
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                            <div>
                                <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: 'var(--space-2)' }}>Email</label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--clr-text-muted)' }} />
                                    <input
                                        id="email"
                                        type="email"
                                        {...register('email')}
                                        className={`input ${errors.email ? 'input-error' : ''}`}
                                        placeholder="votre@email.com"
                                    />
                                </div>
                                {errors.email && <span style={{ color: 'var(--clr-danger)', fontSize: '0.875rem', marginTop: 'var(--space-1)', display: 'block' }}>{errors.email.message}</span>}
                            </div>

                            <div>
                                <label htmlFor="password" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: 'var(--space-2)' }}>Mot de passe</label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--clr-text-muted)' }} />
                                    <input
                                        id="password"
                                        type="password"
                                        {...register('password')}
                                        className={`input ${errors.password ? 'input-error' : ''}`}
                                        placeholder="••••••••"
                                    />
                                    <button type="button" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--clr-text-muted)' }}>
                                        <EyeOff size={18} />
                                    </button>
                                </div>
                                {errors.password && <span style={{ color: 'var(--clr-danger)', fontSize: '0.875rem', marginTop: 'var(--space-1)', display: 'block' }}>{errors.password.message}</span>}

                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-2)' }}>
                                    <Link to="#" style={{ fontSize: '0.875rem', color: 'var(--clr-primary-dark)', fontWeight: 600 }}>Mot de passe oublié ?</Link>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ padding: 'var(--space-4)', fontSize: '1rem' }}>
                                {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
                            </button>
                        </form>

                        <div style={{ margin: 'var(--space-8) 0', position: 'relative', textAlign: 'center' }}>
                            <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', borderTop: '1px solid var(--clr-border)' }} />
                            <span style={{ position: 'relative', background: 'var(--clr-white)', padding: '0 var(--space-4)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--clr-text-muted)', letterSpacing: '0.1em' }}>OU</span>
                        </div>

                        <button type="button" className="btn btn-outline" style={{ width: '100%', padding: 'var(--space-4)', marginBottom: 'var(--space-6)', display: 'flex', gap: 'var(--space-3)' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12.0396 21.5367C17.3828 21.5367 21.7146 17.1554 21.7146 11.7513C21.7146 11.135 21.654 10.5401 21.5432 9.96667H12.0396V14.1565H17.4729C17.2346 15.5492 16.4258 16.7118 15.2255 17.481V19.4678H18.4907C20.4079 17.7554 21.7146 14.8698 21.7146 11.7513C21.7146 11.135 21.654 10.5401 21.5432 9.96667L22.0432 8.96667C22.2541 9.84008 22.3713 10.7631 22.3713 11.7226C22.3713 17.5026 17.747 22.1884 12.0396 22.1884C6.33235 22.1884 1.70801 17.5026 1.70801 11.7226C1.70801 5.9426 6.33235 1.25684 12.0396 1.25684C14.77 1.25684 17.2403 2.2778 19.1128 4.0048L16.2759 6.88373C15.1118 5.76295 13.6264 5.16109 12.0396 5.16109C8.36394 5.16109 5.23469 7.91572 4.19504 11.233H6.84039L7.43391 10.045C8.16738 7.39106 10.6121 5.43734 13.5396 5.43734H12.0396V1.25684ZM12.0396 21.5367V17.068C9.53941 17.068 7.35639 15.421 6.38612 13.233H3.06733V15.2201C4.83606 18.9174 8.44186 21.5367 12.0396 21.5367Z" fill="currentColor" fillOpacity="0" />
                                <path d="M22.0163 10.231H12.0002V14.1206H17.7502C17.4938 15.3533 16.6346 16.4831 15.4395 17.2657L18.6657 19.8242C20.5982 18.0678 22.0163 15.3409 22.0163 12.0001C22.0163 11.3934 21.9404 10.8037 21.7997 10.231H22.0163Z" fill="#4285F4" />
                                <path d="M11.9998 22.0001C14.8694 22.0001 17.2917 21.0504 19.0493 19.4328L15.823 16.8742C14.8967 17.5029 13.5684 17.9189 11.9998 17.9189C8.98687 17.9189 6.43851 15.8576 5.52988 13.1251L2.21387 15.7196C4.0152 19.3496 7.6974 22.0001 11.9998 22.0001Z" fill="#34A853" />
                                <path d="M5.5015 13.1249C5.26786 12.4173 5.13606 11.6627 5.13606 10.8804C5.13606 10.1611 5.25828 9.46328 5.48003 8.80499L2.2472 6.1366C1.55403 7.57508 1.15332 9.17621 1.15332 10.8804C1.15332 12.6515 1.58334 14.3129 2.33614 15.8038L5.5015 13.1249Z" fill="#FBBC05" />
                                <path d="M12.0004 3.84074C13.5238 3.84074 14.8968 4.37256 15.9818 5.37803L18.7303 2.62948C16.9634 0.985651 14.7302 0 12.0004 0C7.74797 0 4.10321 2.59343 2.29639 6.15582L5.52922 8.82421C6.45524 6.16016 8.9819 3.84074 12.0004 3.84074Z" fill="#EA4335" />
                            </svg>
                            Continuer avec Google
                        </button>

                        <div style={{ textAlign: 'center', fontSize: '0.9375rem' }}>
                            Vous n'avez pas de compte ? <Link to="/signup" style={{ color: 'var(--clr-primary-dark)', fontWeight: 600 }}>S'inscrire</Link>
                        </div>
                    </div>
                </div>

                {/* Right Side: Visual Promotion */}
                <div className="auth-promo-side">
                    {/* Soft glow decors */}
                    <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '80%', height: '80%', background: '#127d72', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.5, mixBlendMode: 'screen' }} />

                    <div style={{ position: 'relative', zIndex: 10, padding: 'var(--space-12)', color: 'white', maxWidth: 600, margin: '0 auto' }}>
                        <h2 style={{ fontSize: '3.5rem', lineHeight: 1.1, marginBottom: 'var(--space-12)' }}>
                            Révolutionnez votre <br />Apprentissage de<br /><span style={{ color: 'var(--clr-primary-light)' }}>la Conduite</span>
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                            <Quote size={32} color="var(--clr-primary-light)" style={{ transform: 'rotate(180deg)', opacity: 0.8 }} />
                            <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
                                "mtf Auto-école a complètement transformé ma façon d'apprendre. Fiable, efficace, j'ai eu mon permis du premier coup !"
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Amine T." style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid rgba(16, 185, 129, 0.4)', objectFit: 'cover' }} />
                                <div>
                                    <div style={{ fontWeight: 600 }}>Amine Trabelsi</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--clr-primary-light)' }}>Nouveau Conducteur à Tunis</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ position: 'absolute', bottom: 'var(--space-12)', left: 0, width: '100%', padding: '0 var(--space-12)' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', marginBottom: 'var(--space-4)' }}>REJOIGNEZ LE RÉSEAU</div>
                        <div style={{ display: 'flex', gap: 'var(--space-6)', opacity: 0.6 }}>
                            <PlaySquare size={24} color="white" />
                            <Cloud size={24} color="white" />
                            <Shield size={24} color="white" />
                            <CheckCircle2 size={24} color="white" />
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
