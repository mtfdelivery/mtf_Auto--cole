import { Helmet } from 'react-helmet-async';
import { Check } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { PricingTableSkeleton } from '@/components/skeletons';
import { useQuery } from '@tanstack/react-query';

const mockPlans = [
    {
        id: 'code',
        name: 'Pack Code',
        price: 350,
        duration: '3 mois d\'accès',
        popular: false,
        features: [
            'Accès illimité aux vidéos 3D',
            'Plus de 2000 questions d\'examen',
            'Suivi de progression détaillé',
            'Assistance en ligne 7j/7'
        ]
    },
    {
        id: 'premium',
        name: 'Pack Premium',
        price: 850,
        duration: 'Jusqu\'au permis',
        popular: true,
        features: [
            'Tout le Pack Code inclus',
            '30 heures de conduite garanties',
            'Frais de 1er passage d\'examen',
            'Priorité sur le planning',
            'Moniteur au choix'
        ]
    },
    {
        id: 'conduite',
        name: 'Pack Conduite',
        price: 600,
        duration: '6 mois',
        popular: false,
        features: [
            '20 heures de conduite individuelles',
            'Évaluation de départ',
            'Véhicule récent',
            'Bilan pédagogique'
        ]
    }
];

export default function Pricing() {
    const { data: plans, isPending } = useQuery({
        queryKey: ['pricing'],
        queryFn: async () => {
            await new Promise(r => setTimeout(r, 400));
            return mockPlans;
        },
        staleTime: 600_000,
    });

    return (
        <PageTransition>
            <Helmet>
                <title>Tarifs & Offres | mtf Auto-école</title>
            </Helmet>

            <section style={{ padding: 'var(--space-12) 0', background: 'var(--clr-white)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <span className="badge badge-primary" style={{ marginBottom: 'var(--space-4)' }}>Tarifs Transparents</span>
                    <h1 style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>Des forfaits adaptés à vos besoins</h1>
                    <p style={{ color: 'var(--clr-text-light)', maxWidth: 600, margin: '0 auto' }}>
                        Trouvez l'offre parfaite pour démarrer votre apprentissage. Aucun frais caché, tout est clair dès le départ.
                    </p>
                </div>
            </section>

            <section style={{ padding: 'var(--space-12) 0' }}>
                <div className="container" style={{ maxWidth: 1100 }}>
                    {isPending ? (
                        <PricingTableSkeleton />
                    ) : (
                        <div className="grid-cards">
                            {plans?.map((plan) => (
                                <div key={plan.id} className={`card ${plan.popular ? 'pricing-highlight' : ''}`} style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-2)' }}>{plan.name}</h3>
                                    <div style={{ fontSize: '3rem', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: 'var(--space-1)' }}>
                                        {plan.price} <span style={{ fontSize: '1.25rem', color: 'var(--clr-text-light)', fontWeight: 500 }}>TND</span>
                                    </div>
                                    <div style={{ color: 'var(--clr-text-light)', marginBottom: 'var(--space-8)', fontSize: '0.9375rem' }}>{plan.duration}</div>

                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', flex: 1 }}>
                                        {plan.features.map((feature, i) => (
                                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                                                <Check size={20} color="var(--clr-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                                <span style={{ color: 'var(--clr-text-light)' }}>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button className={`btn mt-8 w-full ${plan.popular ? 'btn-primary' : 'btn-outline'}`} style={{ marginTop: 'var(--space-8)' }}>
                                        Choisir ce forfait
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </PageTransition>
    );
}
