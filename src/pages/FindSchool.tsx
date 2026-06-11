import { Helmet } from 'react-helmet-async';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Star, SlidersHorizontal, Navigation, X, Heart, ChevronDown, BookOpen, CarFront } from 'lucide-react';
import InteractiveMap from '@/components/InteractiveMap';
import PageTransition from '@/components/PageTransition';

const governorates = [
    "Tous", "Tunis", "Ariana", "Ben Arous", "Manouba",
    "Sfax", "Sousse", "Monastir", "Nabeul", "Bizerte"
];

// Reusing the structured mock data designed for the map
const mockSchools = [
    { id: 1, name: "Auto-école The One", address: "Avenue Habib Bourguiba, La Marsa", city: "Tunis", lat: 36.8783, lng: 10.3248, price_per_hour: 30, rating: 5.0, reviews_count: 78, image_url: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80", is_premium: true, services: ["Code", "Conduite"], license_types: ["Permis B"] },
    { id: 2, name: "Auto-école Louna", address: "Centre ville, Sfax", city: "Sfax", lat: 34.7398, lng: 10.7600, price_per_hour: 27, rating: 4.9, reviews_count: 165, image_url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80", is_premium: true, services: ["Code", "Conduite"], license_types: ["Permis B"] },
    { id: 3, name: "Auto-école Harrabi Nidhal", address: "Rue de Marseille, Tunis", city: "Tunis", lat: 36.8000, lng: 10.1833, price_per_hour: 30, rating: 4.9, reviews_count: 60, image_url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80", is_premium: false, services: ["Code", "Conduite"], license_types: ["Permis B", "Permis A"] },
];

function SchoolCard({ school }: { school: any }) {
    const [liked, setLiked] = useState(false);
    const displayPrice = school.price_per_hour || school.price || "—";
    const displayRating = school.rating || 0;
    const displayName = school.name || school.title || "Auto-école";
    const displayCity = school.city || school.address || "";
    const displayReviews = school.reviews_count || school.reviews || 0;

    return (
        <motion.div
            className="card"
            style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer', padding: 0 }}
            whileHover={{ y: -6 }}
        >
            <div style={{ height: 160, position: 'relative' }}>
                <img src={school.image_url} alt={displayName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {school.is_premium && (
                    <div className="badge badge-accent" style={{ position: 'absolute', top: 12, left: 12, boxShadow: 'var(--shadow-sm)' }}>
                        <Star size={12} fill="currentColor" /> Premium
                    </div>
                )}
                <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
                    style={{
                        position: 'absolute', top: 12, right: 12,
                        width: 36, height: 36, borderRadius: '50%',
                        background: 'rgba(255,255,255,0.9)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: 'var(--shadow-sm)', transition: 'transform 0.2s'
                    }}
                >
                    <Heart size={16} fill={liked ? 'var(--clr-danger)' : 'transparent'} color={liked ? 'var(--clr-danger)' : 'var(--clr-text-muted)'} />
                </button>
            </div>
            <div style={{ padding: 'var(--space-4)', flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: '1rem', lineHeight: 1.2, margin: 0 }}>{displayName}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#EAB308', fontWeight: 600, flexShrink: 0 }}>
                        <Star size={14} fill="currentColor" /> {displayRating}
                    </div>
                </div>
                <p style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--clr-text-light)', fontSize: '0.875rem' }}>
                    <MapPin size={14} /> {displayCity}
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {school.services.map((s: string) => (
                        <span key={s} className="badge" style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', color: 'var(--clr-text-light)' }}>
                            {s}
                        </span>
                    ))}
                </div>
                <div style={{ marginTop: 'auto', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--clr-border)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--clr-text-light)' }}>{displayReviews} avis</span>
                    <div>
                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--clr-primary)' }}>{displayPrice} DT</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--clr-text-light)', marginLeft: 4 }}>/ heure</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function FindSchool() {
    const [selectedGov, setSelectedGov] = useState("Tous");
    const [showGovDropdown, setShowGovDropdown] = useState(false);

    const filteredSchools = useMemo(() => {
        return mockSchools.filter(s => {
            if (selectedGov === "Tous") return true;
            return s.city?.includes(selectedGov) || s.address?.includes(selectedGov);
        });
    }, [selectedGov]);

    return (
        <PageTransition style={{ height: 'calc(100vh - 72px)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <Helmet>
                <title>Trouver une Auto-école | mtf</title>
            </Helmet>

            {/* Filter Bar */}
            <div style={{
                background: 'var(--clr-white)',
                padding: 'var(--space-3) var(--space-6)',
                borderBottom: '1px solid var(--clr-border)',
                display: 'flex', gap: 'var(--space-3)', alignItems: 'center', zIndex: 40
            }}>
                {/* Governorate */}
                <div style={{ position: 'relative' }}>
                    <button
                        className="btn btn-outline"
                        onClick={() => setShowGovDropdown(!showGovDropdown)}
                        style={{ width: 220, justifyContent: 'space-between' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <MapPin size={16} color="var(--clr-primary)" />
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '10px', color: 'var(--clr-text-light)' }}>Gouvernorat</div>
                                <div style={{ fontWeight: 600, fontSize: '14px' }}>{selectedGov === "Tous" ? "Partout" : selectedGov}</div>
                            </div>
                        </div>
                        <ChevronDown size={16} />
                    </button>

                    <AnimatePresence>
                        {showGovDropdown && (
                            <motion.div
                                initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                                style={{
                                    position: 'absolute', top: '100%', left: 0, transform: 'translateY(4px)', width: '100%',
                                    background: 'var(--clr-white)', border: '1px solid var(--clr-border)', borderRadius: 'var(--radius-lg)',
                                    boxShadow: 'var(--shadow-lg)', zIndex: 50, maxHeight: 200, overflowY: 'auto'
                                }}
                            >
                                {governorates.map(g => (
                                    <button
                                        key={g}
                                        onClick={() => { setSelectedGov(g); setShowGovDropdown(false); }}
                                        style={{
                                            width: '100%', textAlign: 'left', padding: '10px 16px', background: selectedGov === g ? 'var(--clr-surface)' : 'transparent',
                                            fontWeight: selectedGov === g ? 600 : 400, color: selectedGov === g ? 'var(--clr-primary)' : 'var(--clr-text)'
                                        }}
                                    >
                                        {g}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <button className="btn btn-outline">
                    <CarFront size={16} color="var(--clr-primary)" />
                    Permis B
                </button>

                <button className="btn btn-outline">
                    <SlidersHorizontal size={16} color="var(--clr-primary)" />
                    Filtres avancés
                </button>
            </div>

            {/* Split Screen Logic */}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                {/* Left Side: Listing */}
                <div style={{ width: '100%', maxWidth: '600px', overflowY: 'auto', padding: 'var(--space-6)', borderRight: '1px solid var(--clr-border)' }}>
                    <div style={{ marginBottom: 'var(--space-4)', fontSize: '0.875rem', color: 'var(--clr-text-light)' }}>
                        <span style={{ fontWeight: 700, color: 'var(--clr-text)' }}>{filteredSchools.length}</span> écoles trouvées
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                        {filteredSchools.map((s) => <SchoolCard key={s.id} school={s} />)}
                    </div>
                </div>

                {/* Right Side: Interactive Map */}
                <div style={{ flex: 1, background: '#E5E7EB', position: 'relative' }}>
                    <InteractiveMap schools={filteredSchools} />
                </div>
            </div>
        </PageTransition>
    );
}
