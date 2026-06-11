import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, EyeOff, Quote, Cloud, Shield, CheckCircle2, PlaySquare, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import PageTransition from '@/components/PageTransition';

const signupSchema = z.object({
    name: z.string().min(3, '3 caractères minimum réquis'),
    email: z.string().min(1, 'L\'email est requis').email('Email invalide'),
    password: z.string().min(6, '6 caractères minimum'),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        mode: 'onBlur',
    });

    const onSubmit = async (data: SignupFormData) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 800));
            console.log('Signup attempt with', data);
            toast.success('Compte créé avec succès !');
            navigate('/login');
        } catch {
            toast.error('Erreur lors de l\'inscription');
        }
    };

    return (
        <PageTransition>
            <Helmet>
                <title>Inscription | mtf Auto-école</title>
            </Helmet>

            <div className="auth-layout">
                <div className="auth-form-side">
                    <Link to="/" className="nav-link" style={{ alignSelf: 'flex-start', padding: 0, background: 'transparent' }}>
                        <div style={{ width: 32, height: 32, background: 'var(--clr-primary)', borderRadius: '8px', display: 'grid', placeItems: 'center', color: 'white', fontWeight: 'bold' }}>m</div>
                        <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--clr-text)' }}>mtf <span style={{ color: 'var(--clr-primary)' }}>Auto-école</span></span>
                    </Link>

                    <div style={{ width: '100%', maxWidth: 420, margin: 'auto' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>Créer un Compte</h1>
                        <p style={{ color: 'var(--clr-text-light)', marginBottom: 'var(--space-12)' }}>
                            Rejoignez notre plateforme pour trouver votre auto-école, réviser votre code et programmer vos heures.
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                            <div>
                                <label htmlFor="name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: 'var(--space-2)' }}>Nom complet</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--clr-text-muted)' }} />
                                    <input
                                        id="name"
                                        type="text"
                                        {...register('name')}
                                        className={`input ${errors.name ? 'input-error' : ''}`}
                                        placeholder="Votre nom"
                                    />
                                </div>
                                {errors.name && <span style={{ color: 'var(--clr-danger)', fontSize: '0.875rem', marginTop: 'var(--space-1)', display: 'block' }}>{errors.name.message}</span>}
                            </div>

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
                                        placeholder="Créer un mot de passe"
                                    />
                                    <button type="button" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--clr-text-muted)' }}>
                                        <EyeOff size={18} />
                                    </button>
                                </div>
                                {errors.password && <span style={{ color: 'var(--clr-danger)', fontSize: '0.875rem', marginTop: 'var(--space-1)', display: 'block' }}>{errors.password.message}</span>}
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ padding: 'var(--space-4)', fontSize: '1rem', marginTop: 'var(--space-2)' }}>
                                {isSubmitting ? 'Création en cours...' : 'S\'inscrire'}
                            </button>
                        </form>

                        <div style={{ textAlign: 'center', fontSize: '0.9375rem', marginTop: 'var(--space-8)' }}>
                            Vous avez déjà un compte ? <Link to="/login" style={{ color: 'var(--clr-primary-dark)', fontWeight: 600 }}>Se connecter</Link>
                        </div>
                    </div>
                </div>

                <div className="auth-promo-side">
                    <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '80%', height: '80%', background: '#127d72', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.5, mixBlendMode: 'screen' }} />

                    <div style={{ position: 'relative', zIndex: 10, padding: 'var(--space-12)', color: 'white', maxWidth: 600, margin: '0 auto' }}>
                        <h2 style={{ fontSize: '3.5rem', lineHeight: 1.1, marginBottom: 'var(--space-12)' }}>
                            Rejoignez le réseau<br /><span style={{ color: 'var(--clr-primary-light)' }}>N°1 en Tunisie</span>
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                            <Quote size={32} color="var(--clr-primary-light)" style={{ transform: 'rotate(180deg)', opacity: 0.8 }} />
                            <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
                                "En tant que moniteur, la plateforme mtf m'a permis d'acquérir de nouveaux candidats très rapidement."
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
                                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80" alt="Karim B.A." style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid rgba(16, 185, 129, 0.4)', objectFit: 'cover' }} />
                                <div>
                                    <div style={{ fontWeight: 600 }}>Karim Ben Ali</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--clr-primary-light)' }}>Moniteur agréé à Sousse</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
