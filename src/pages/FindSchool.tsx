import { Helmet } from 'react-helmet-async';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Star, SlidersHorizontal, Navigation, X, Heart, ChevronDown, BookOpen, CarFront } from 'lucide-react';
import { Link } from 'react-router-dom';
import InteractiveMap from '@/components/InteractiveMap';
import PageTransition from '@/components/PageTransition';

const governorates = [
    "Tous", "Tunis", "Ariana", "Ben Arous", "Manouba",
    "Sfax", "Sousse", "Monastir", "Nabeul", "Bizerte",
    "Kairouan", "Gabès", "Médenine", "Béja", "Jendouba",
    "Kasserine", "Kef", "Mahdia", "Sidi Bouzid", "Siliana",
    "Tataouine", "Tozeur", "Gafsa", "Zaghouan", "Kébili"
];

const mockSchools = [
    { id: 1, slug: "auto-ecole-the-one", name: "Auto-école The One", address: "Avenue Habib Bourguiba, La Marsa", city: "Tunis", lat: 36.8783, lng: 10.3248, price_per_hour: 30, rating: 5.0, reviews_count: 78, image_url: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80", is_premium: true, services: ["Code", "Conduite"], license_types: ["Permis B"] },
    { id: 2, slug: "auto-ecole-louna", name: "Auto-école Louna", address: "Centre ville, Sfax", city: "Sfax", lat: 34.7398, lng: 10.7600, price_per_hour: 27, rating: 4.9, reviews_count: 165, image_url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80", is_premium: true, services: ["Code", "Conduite"], license_types: ["Permis B"] },
    { id: 3, slug: "auto-ecole-harrabi", name: "Auto-école Harrabi Nidhal", address: "Rue de Marseille, Tunis", city: "Tunis", lat: 36.8000, lng: 10.1833, price_per_hour: 30, rating: 4.9, reviews_count: 60, image_url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80", is_premium: false, services: ["Code", "Conduite"], license_types: ["Permis B", "Permis A"] },
    { id: 4, slug: "auto-ecole-adel", name: "Auto-école Adel", address: "Avenue de la Liberté, Tunis", city: "Tunis", lat: 36.8065, lng: 10.1815, price_per_hour: 35, rating: 4.7, reviews_count: 12, image_url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80", is_premium: false, services: ["Code", "Conduite"], license_types: ["Permis B", "Permis C"] },
    { id: 5, slug: "auto-ecole-sousse", name: "Auto-école Sousse Résistance", address: "Boulevard de la Corniche, Sousse", city: "Sousse", lat: 35.8245, lng: 10.6346, price_per_hour: 28, rating: 4.9, reviews_count: 201, image_url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80", is_premium: true, services: ["Code", "Conduite"], license_types: ["Permis B"] },
    { id: 6, slug: "auto-ecole-bizerte", name: "Auto-école Bizerte Corniche", address: "Corniche, Bizerte", city: "Bizerte", lat: 37.2744, lng: 9.8739, price_per_hour: 27, rating: 4.4, reviews_count: 78, image_url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80", is_premium: false, services: ["Code", "Conduite"], license_types: ["Permis B"] },
];

function SchoolCard({ school }: { school: any }) {
    const [liked, setLiked] = useState(false);
    const displayPrice = school.price_per_hour || school.price || "—";
    const displayRating = school.rating || 0;
    const displayName = school.name || school.title || "Auto-école";
    const displayCity = school.city || school.address || "";
    const displayReviews = school.reviews_count || school.reviews || 0;
    const services = school.services || ["Code", "Conduite"];

    return (
        <Link to={`/ecoles/${school.slug || school.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
            <motion.div
                className="card"
                style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', padding: 0 }}
                whileHover={{ y: -6, scale: 1.01 }}
            >
                <div style={{ height: 176, position: 'relative' }}>
                    <img src={school.image_url} alt={displayName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {school.is_premium && (
                        <div style={{ position: 'absolute', top: 12, left: 12, background: 'linear-gradient(to right, #eab308, #f59e0b)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: 4, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                            <Star size={12} fill="currentColor" /> Premium
                        </div>
                    )}
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
                        style={{
                            position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: '50%',
                            background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: 'none', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}
                    >
                        <Heart size={16} fill={liked ? '#ef4444' : 'transparent'} color={liked ? '#ef4444' : '#6b7280'} />
                    </button>
                </div>
                <div style={{ padding: 'var(--space-4)', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h3 style={{ fontSize: '15px', fontWeight: 700, lineHeight: 1.2, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{displayName}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#EAB308', fontWeight: 700, flexShrink: 0, fontSize: '14px' }}>
                            <Star size={16} fill="currentColor" /> {displayRating}
                        </div>
                    </div>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--clr-text-light)', fontSize: '0.875rem', margin: 0 }}>
                        <MapPin size={14} /> {displayCity}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 4 }}>
                        {services.map((s: string) => (
                            <span key={s} style={{
                                display: 'inline-flex', alignItems: 'center', gap: '4px',
                                fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '9999px',
                                border: '1px solid',
                                background: s === "Code" ? '#eff6ff' : '#f0fdf4',
                                color: s === "Code" ? '#2563eb' : '#16a34a',
                                borderColor: s === "Code" ? '#dbeafe' : '#bbf7d0'
                            }}>
                                {s === "Code" ? <BookOpen size={12} /> : <CarFront size={12} />} {s}
                            </span>
                        ))}
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--clr-text-light)', margin: '4px 0 0' }}>{displayReviews} avis</p>
                    <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--clr-border)', display: 'flex', alignItems: 'baseline' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--clr-primary)' }}>{displayPrice} DT</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--clr-text-light)', marginLeft: 4 }}>par heure</span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

function FilterModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [priceRange, setPriceRange] = useState([10, 100]);
    const [selectedLicenses, setSelectedLicenses] = useState<string[]>(["Permis B"]);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', zIndex: 60 }}
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        style={{
                            position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                            background: '#fff', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                            width: '90vw', maxWidth: 500, maxHeight: '85vh', overflowY: 'auto', zIndex: 70, padding: 24
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Filtres</h2>
                            <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 8, borderRadius: '50%', transition: 'background 0.2s' }}>
                                <X size={20} color="var(--clr-text-light)" />
                            </button>
                        </div>

                        {/* License Type */}
                        <div style={{ marginBottom: 24 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                                <CarFront size={16} color="var(--clr-text-light)" />
                                <h3 style={{ fontSize: '0.875rem', fontWeight: 700, margin: 0 }}>Type de permis</h3>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                {["Permis B", "Permis A", "Permis C", "Permis D"].map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => setSelectedLicenses(prev => prev.includes(l) ? prev.filter(x => x !== l) : [...prev, l])}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderRadius: '12px',
                                            border: `1px solid ${selectedLicenses.includes(l) ? 'var(--clr-primary)' : '#e5e7eb'}`,
                                            background: selectedLicenses.includes(l) ? 'rgba(16,185,129,0.1)' : '#fff',
                                            color: selectedLicenses.includes(l) ? 'var(--clr-primary)' : 'var(--clr-text-light)',
                                            fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer'
                                        }}
                                    >
                                        <div style={{
                                            width: 16, height: 16, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            border: `2px solid ${selectedLicenses.includes(l) ? 'var(--clr-primary)' : '#d1d5db'}`,
                                            background: selectedLicenses.includes(l) ? 'var(--clr-primary)' : 'transparent'
                                        }}>
                                            {selectedLicenses.includes(l) && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                                        </div>
                                        <CarFront size={16} /> {l}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Budget */}
                        <div style={{ marginBottom: 24 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                                <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--clr-text-light)' }}>$</span>
                                <h3 style={{ fontSize: '0.875rem', fontWeight: 700, margin: 0 }}>Budget par heure</h3>
                            </div>
                            <input
                                type="range" min={10} max={100} value={priceRange[1]}
                                onChange={(e) => setPriceRange([10, parseInt(e.target.value)])}
                                style={{ width: '100%', height: 8, borderRadius: 4, appearance: 'none', background: '#e5e7eb', outline: 'none' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--clr-primary)' }}>{priceRange[0]} DT</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--clr-text-light)' }}>à</span>
                                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--clr-primary)' }}>{priceRange[1]} DT</span>
                            </div>
                        </div>

                        {/* Rating */}
                        <div style={{ marginBottom: 24 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                                <Star size={16} fill="#f59e0b" color="#f59e0b" />
                                <h3 style={{ fontSize: '0.875rem', fontWeight: 700, margin: 0 }}>Note minimum</h3>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {[5, 4, 3].map((r) => (
                                    <button
                                        key={r}
                                        onClick={() => setSelectedRating(selectedRating === r ? null : r)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: '12px',
                                            border: `1px solid ${selectedRating === r ? '#fcd34d' : '#e5e7eb'}`,
                                            background: selectedRating === r ? '#fffbeb' : '#fff', cursor: 'pointer', width: '100%'
                                        }}
                                    >
                                        <div style={{
                                            width: 16, height: 16, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            border: `2px solid ${selectedRating === r ? 'var(--clr-primary)' : '#d1d5db'}`,
                                            background: selectedRating === r ? 'var(--clr-primary)' : 'transparent'
                                        }}>
                                            {selectedRating === r && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={16} fill={i < r ? "#fbbc04" : "#e5e7eb"} color={i < r ? "#fbbc04" : "#e5e7eb"} />
                                            ))}
                                        </div>
                                        <span style={{ color: 'var(--clr-text-light)', fontSize: '0.875rem' }}>et plus</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: 12, marginTop: 24, paddingTop: 16, borderTop: '1px solid #e5e7eb' }}>
                            <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', padding: '12px', borderRadius: '12px' }} onClick={onClose}>Réinitialiser</button>
                            <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '12px', borderRadius: '12px' }} onClick={onClose}>Appliquer</button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default function FindSchool() {
    const [selectedGov, setSelectedGov] = useState("Tous");
    const [showGovDropdown, setShowGovDropdown] = useState(false);
    const [showFiltersModal, setShowFiltersModal] = useState(false);

    const filteredSchools = useMemo(() => {
        return mockSchools.filter(s => {
            if (selectedGov === "Tous") return true;
            return s.city?.includes(selectedGov) || s.address?.includes(selectedGov);
        });
    }, [selectedGov]);

    return (
        <PageTransition style={{ height: 'calc(100vh - 72px)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <Helmet>
                <title>Trouver une Auto-école | mtf Auto-école</title>
            </Helmet>

            {/* Filter Bar (Airbnb style) */}
            <div style={{
                background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '12px 24px',
                display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', zIndex: 40
            }}>
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setShowGovDropdown(!showGovDropdown)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px',
                            background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 12,
                            cursor: 'pointer', minWidth: 200, justifyContent: 'space-between'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <MapPin size={16} color="var(--clr-primary)" />
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '10px', color: '#6b7280', lineHeight: 1, marginBottom: 2 }}>Gouvernorat</div>
                                <div style={{ fontWeight: 600, fontSize: '14px', lineHeight: 1 }}>{selectedGov === "Tous" ? "N'importe où" : selectedGov}</div>
                            </div>
                        </div>
                        <ChevronDown size={16} color="#6b7280" style={{ transform: showGovDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                    </button>
                    <AnimatePresence>
                        {showGovDropdown && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                style={{
                                    position: 'absolute', top: '100%', left: 0, marginTop: 4, width: 256,
                                    background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb',
                                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', overflow: 'hidden', zIndex: 50
                                }}
                            >
                                <div style={{ maxHeight: 256, overflowY: 'auto' }}>
                                    {governorates.map(g => (
                                        <button
                                            key={g} onClick={() => { setSelectedGov(g); setShowGovDropdown(false); }}
                                            style={{
                                                width: '100%', textAlign: 'left', padding: '10px 16px', background: selectedGov === g ? 'rgba(16,185,129,0.1)' : '#fff',
                                                border: 'none', color: selectedGov === g ? 'var(--clr-primary)' : 'var(--clr-text)',
                                                fontWeight: selectedGov === g ? 600 : 400, cursor: 'pointer'
                                            }}
                                        >
                                            {g === "Tous" ? "N'importe où" : g}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <button style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px',
                    background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 12, cursor: 'pointer'
                }}>
                    <CarFront size={16} color="var(--clr-primary)" />
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '10px', color: '#6b7280', lineHeight: 1, marginBottom: 2 }}>Type de permis</div>
                        <div style={{ fontWeight: 600, fontSize: '14px', lineHeight: 1 }}>Permis B</div>
                    </div>
                </button>

                <button onClick={() => setShowFiltersModal(true)} style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px',
                    background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 12, cursor: 'pointer'
                }}>
                    <SlidersHorizontal size={16} color="var(--clr-primary)" />
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '10px', color: '#6b7280', lineHeight: 1, marginBottom: 2 }}>Filtres</div>
                        <div style={{ fontWeight: 600, fontSize: '14px', lineHeight: 1 }}>Ajouter des filtres</div>
                    </div>
                </button>

                <button style={{ width: 42, height: 42, borderRadius: '50%', background: '#f9fafb', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginLeft: 'auto' }}>
                    <Navigation size={18} color="var(--clr-primary)" />
                </button>

                <button style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--clr-primary)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', boxShadow: '0 4px 6px -1px rgba(16,185,129,0.3)' }}>
                    <Search size={18} />
                </button>
            </div>

            {/* Split Screen Logic */}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                {/* Left Side: Listing */}
                <div style={{ width: '100%', maxWidth: '800px', flex: '0 0 auto', overflowY: 'auto', borderRight: '1px solid #e5e7eb' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb' }}>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                            <span style={{ fontWeight: 700, color: '#111827' }}>{filteredSchools.length}</span> sur plus de <span style={{ fontWeight: 700, color: '#111827' }}>500 auto-écoles</span> près de votre position
                        </p>
                    </div>

                    {/* 2 Column Grid */}
                    <div style={{ padding: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                        {filteredSchools.map((s) => <SchoolCard key={s.id} school={s} />)}

                        {filteredSchools.length === 0 && (
                            <div style={{ gridColumn: '1 / -1', padding: '80px 20px', textAlign: 'center' }}>
                                <div style={{ width: 64, height: 64, background: '#f3f4f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                    <Search size={28} color="#9ca3af" />
                                </div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: 8, color: '#111827' }}>Aucune auto-école trouvée</h3>
                                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Essayez de modifier vos filtres ou votre localisation</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Interactive Map */}
                <div className="hidden lg-block" style={{ flex: 1, position: 'relative', background: '#E5E7EB' }}>
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        @media (max-width: 1024px) {
                            .lg-block { display: none !important; }
                        }
                    `}} />
                    <InteractiveMap schools={filteredSchools} />
                </div>
            </div>

            <FilterModal isOpen={showFiltersModal} onClose={() => setShowFiltersModal(false)} />
        </PageTransition>
    );
}
