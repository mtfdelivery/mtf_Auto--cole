import { Helmet } from 'react-helmet-async';
import React, { useState, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { Star } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import OptimizedImage from '@/components/OptimizedImage';
import { useCourses } from '@/hooks/useCourses';
import { CourseCardSkeleton } from '@/components/skeletons';

const CATEGORIES = [
    { id: 'all', label: 'Toutes' },
    { id: 'code', label: 'Code' },
    { id: 'conduite', label: 'Conduite' },
    { id: 'moto', label: 'Permis Moto' },
    { id: 'professionnel', label: 'Poids Lourd' },
];

const CourseCard = React.memo(({ course }: { course: any }) => (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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

export default function Courses() {
    const [activeCategory, setActiveCategory] = useState('all');

    // Uses keepPreviousData = true, so no UI flicker when switching tabs
    const { data: courses, isPending, isFetching } = useCourses(activeCategory);

    // Derive filtered list
    const displayCourses = useMemo(() => courses ?? [], [courses]);

    return (
        <PageTransition>
            <Helmet>
                <title>Nos Formations | mtf Auto-école</title>
                <meta name="description" content="Découvrez notre catalogue de formations: Code de la Route, Permis B, Permis Moto et Poids Lourd." />
            </Helmet>

            <section style={{ padding: 'var(--space-12) 0', background: 'var(--clr-white)', borderBottom: '1px solid var(--clr-border)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>Toutes Nos Formations</h1>
                    <p style={{ color: 'var(--clr-text-light)', maxWidth: 600, margin: '0 auto' }}>
                        Des cours adaptés à tous les niveaux. Choisissez la formule qui vous convient et réservez en ligne.
                    </p>
                </div>
            </section>

            <section style={{ padding: 'var(--space-8) 0' }}>
                <div className="container">

                    {/* Filter Tabs */}
                    <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-8)', justifyContent: 'center' }}>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`btn ${activeCategory === cat.id ? 'btn-primary' : 'btn-outline'}`}
                                style={{
                                    transition: 'all 0.1s', // Instant feel
                                    opacity: isFetching && activeCategory !== cat.id ? 0.7 : 1 // slight dimming on loading old data
                                }}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <div className="grid-cards">
                        {isPending ? (
                            <>
                                <CourseCardSkeleton />
                                <CourseCardSkeleton />
                                <CourseCardSkeleton />
                                <CourseCardSkeleton />
                            </>
                        ) : (
                            displayCourses.map((course) => (
                                <div key={course.id} style={{ opacity: isFetching ? 0.6 : 1, transition: 'opacity 0.2s' }}>
                                    <CourseCard course={course} />
                                </div>
                            ))
                        )}

                        {/* Empty state */}
                        {!isPending && displayCourses.length === 0 && (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 'var(--space-12)' }}>
                                <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>📭</div>
                                <h3>Aucune formation trouvée</h3>
                                <p style={{ color: 'var(--clr-text-light)' }}>Essayez de modifier vos filtres.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </PageTransition>
    );
}
