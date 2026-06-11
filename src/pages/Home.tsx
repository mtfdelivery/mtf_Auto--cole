import { Helmet } from 'react-helmet-async';
import React, { useMemo } from 'react';
import { ArrowRight, Star, ShieldCheck, Video } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import OptimizedImage from '@/components/OptimizedImage';
import LazyVideo from '@/components/LazyVideo';
import { useInstructors } from '@/hooks/useInstructors';
import { useCourses } from '@/hooks/useCourses';
import { CourseCardSkeleton, InstructorCardSkeleton } from '@/components/skeletons';

// Extracted and React.memo applied for render optimization
const InstructorCard = React.memo(({ item }: { item: any }) => (
    <div className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 'var(--space-4)' }}>
        <OptimizedImage
            src={item.avatarUrl}
            alt={item.name}
            width={120}
            height={120}
            style={{ borderRadius: 'var(--radius-full)' }}
        />
        <div>
            <h3 style={{ fontSize: '1.125rem' }}>{item.name}</h3>
            <p style={{ color: 'var(--clr-text-light)', fontSize: '0.875rem' }}>{item.specialty}</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            {item.licenseTypes.map((l: string) => (
                <span key={l} className="badge badge-accent">{l}</span>
            ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 'auto', color: '#EAB308', fontWeight: 600 }}>
            <Star size={16} fill="currentColor" />
            <span>{item.rating}</span>
            <span style={{ color: 'var(--clr-text-light)', fontWeight: 400 }}>({item.reviewsCount} avis)</span>
        </div>
    </div>
));
InstructorCard.displayName = 'InstructorCard';

const CourseCard = React.memo(({ course }: { course: any }) => (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
        <OptimizedImage
            src={course.imageUrl}
            alt={course.title}
            width={400}
            height={200}
            style={{ borderRadius: '0' }}
        />
        <div style={{ padding: 'var(--space-5)', flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-primary">{course.category.toUpperCase()}</span>
                <span style={{ fontWeight: 600 }}>{course.price} TND</span>
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>{course.title}</h3>
            <p style={{ color: 'var(--clr-text-light)', fontSize: '0.9375rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {course.description}
            </p>
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--clr-border)', color: 'var(--clr-text-muted)', fontSize: '0.875rem' }}>
                <span>{course.duration}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={14} color="#EAB308" fill="#EAB308" />
                    <span>{course.rating}</span>
                </div>
            </div>
        </div>
    </div>
));
CourseCard.displayName = 'CourseCard';

export default function Home() {
    const { data: instructors, isLoading: loadingInstructors } = useInstructors();
    const { data: courses, isLoading: loadingCourses } = useCourses('all');

    // useMemo for derived data
    const topInstructors = useMemo(() => instructors?.slice(0, 4) ?? [], [instructors]);
    const topCourses = useMemo(() => courses?.slice(0, 3) ?? [], [courses]);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "mtf Auto-école",
        description: "Plateforme tunisienne de préparation au code de la route.",
        url: "https://codedrive.tn",
    };

    return (
        <PageTransition>
            <Helmet>
                <title>mtf Auto-école — Le Permis en Toute Confiance</title>
                <meta name="description" content="Découvrez une nouvelle façon d'obtenir votre permis de conduire. Code de la route en ligne, moniteurs certifiés et réservation simplifiée." />
                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            </Helmet>

            {/* Hero Section */}
            <section className="hero-gradient" style={{ position: 'relative', padding: '120px 0', overflow: 'hidden', color: 'white' }}>
                {/* Background Video using LazyVideo (loads when mounted since it's above fold, but uses poster first) */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.2, mixBlendMode: 'overlay' }}>
                    <LazyVideo
                        src="/hero-video.mp4"
                        poster="/hero-driving.webp"
                        muted autoPlay loop
                    />
                </div>

                <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 800, display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', alignItems: 'center' }}>
                    <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 16px', color: '#34D399' }}>
                        Numéro #1 en Tunisie
                    </span>
                    <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                        Le Permis de Conduire, <br />
                        <span style={{ color: '#34D399' }}>Plus Rapide & Moins Cher</span>
                    </h1>
                    <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.8)', maxWidth: 600, margin: '0 auto' }}>
                        Révisez votre code de la route en ligne 24/7 et réservez vos heures de conduite avec les meilleurs moniteurs certifiés de votre région.
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                        <a href="/signup" className="btn btn-primary btn-cta-pulse" style={{ background: '#34D399', color: '#064E3B' }}>
                            Commencer Gratuitement <ArrowRight size={18} />
                        </a>
                        <a href="/courses" className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', backdropFilter: 'blur(10px)' }}>
                            Voir les Formations
                        </a>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section style={{ padding: 'var(--space-16) 0', background: 'var(--clr-white)' }}>
                <div className="container grid-cards">
                    <div className="glass-card" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
                        <div style={{ width: 64, height: 64, background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-6)', color: 'var(--clr-primary-dark)' }}>
                            <Video size={32} />
                        </div>
                        <h3 style={{ marginBottom: 'var(--space-2)' }}>Code 100% en Ligne</h3>
                        <p style={{ color: 'var(--clr-text-light)' }}>Vidéos 3D interactives et examens blancs conformes aux normes tunisiennes.</p>
                    </div>
                    <div className="glass-card" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
                        <div style={{ width: 64, height: 64, background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-6)', color: 'var(--clr-primary-dark)' }}>
                            <ShieldCheck size={32} />
                        </div>
                        <h3 style={{ marginBottom: 'var(--space-2)' }}>Moniteurs Certifiés</h3>
                        <p style={{ color: 'var(--clr-text-light)' }}>Plus de 50 moniteurs évalués par nos élèves pour garantir votre réussite.</p>
                    </div>
                    <div className="glass-card" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
                        <div style={{ width: 64, height: 64, background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-6)', color: 'var(--clr-primary-dark)' }}>
                            <Star size={32} />
                        </div>
                        <h3 style={{ marginBottom: 'var(--space-2)' }}>Taux de Réussite 92%</h3>
                        <p style={{ color: 'var(--clr-text-light)' }}>Un accompagnement personnalisé qui multiplie vos chances de succès.</p>
                    </div>
                </div>
            </section>

            {/* Top Courses */}
            <section style={{ padding: 'var(--space-16) 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-8)' }}>
                        <div>
                            <span className="text-gradient" style={{ fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.875rem' }}>Nos Offres</span>
                            <h2 style={{ fontSize: '2.5rem', marginTop: 'var(--space-2)' }}>Formations Populaires</h2>
                        </div>
                        <a href="/courses" style={{ color: 'var(--clr-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>Voir tout <ArrowRight size={16} /></a>
                    </div>

                    <div className="grid-cards">
                        {loadingCourses ? (
                            <>
                                <CourseCardSkeleton />
                                <CourseCardSkeleton />
                                <CourseCardSkeleton />
                            </>
                        ) : (
                            topCourses.map((course) => <CourseCard key={course.id} course={course} />)
                        )}
                    </div>
                </div>
            </section>

            {/* Meet Instructors */}
            <section style={{ padding: 'var(--space-16) 0', background: 'var(--clr-white)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
                        <h2 style={{ fontSize: '2.5rem' }}>Rencontrez Nos Moniteurs</h2>
                        <p style={{ color: 'var(--clr-text-light)', maxWidth: 600, margin: 'var(--space-4) auto 0' }}>
                            Choisissez le moniteur qui vous correspond. Chaque formateur est noté par nos anciens élèves.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
                        {loadingInstructors ? (
                            <>
                                <InstructorCardSkeleton />
                                <InstructorCardSkeleton />
                                <InstructorCardSkeleton />
                                <InstructorCardSkeleton />
                            </>
                        ) : (
                            topInstructors.map((item) => <InstructorCard key={item.id} item={item} />)
                        )}
                    </div>
                </div>
            </section>

        </PageTransition>
    );
}
