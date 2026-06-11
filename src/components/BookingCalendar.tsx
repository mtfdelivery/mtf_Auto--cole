import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, Clock, CheckCircle } from "lucide-react";

// In mtf-perf we use Vanilla CSS + standard buttons, we skip the UI library Button if not needed, 
// or use our standard standard class 'btn btn-primary' from index.css.

const TIME_SLOTS = ["08:00", "09:30", "11:00", "14:00", "15:30", "17:00"];
const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

export default function BookingCalendar({ schoolName }: { schoolName: string }) {
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [step, setStep] = useState<1 | 2>(1);

    const handleConfirm = () => {
        setStep(2);
    };

    return (
        <div style={{
            background: 'var(--clr-white)', border: '1px solid var(--clr-border)',
            boxShadow: 'var(--shadow-xl)', borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-6)', maxWidth: 500, width: '100%', margin: '0 auto',
            position: 'relative', overflow: 'hidden'
        }}>
            <AnimatePresence mode="wait">
                {step === 1 ? (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}
                    >
                        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--clr-text)', margin: 0 }}>Réserver votre séance</h2>
                            <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-light)', margin: 0 }}>Choisissez une date et un créneau horaire de conduite pour <span style={{ fontWeight: 700, color: 'var(--clr-primary)' }}>{schoolName}</span>.</p>
                        </div>

                        {/* Calendar Header */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'var(--space-6)' }}>
                            <button className="btn-icon">
                                <ChevronLeft size={20} />
                            </button>
                            <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--clr-text)' }}>Juin 2026</span>
                            <button className="btn-icon">
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* Fake Days Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'var(--clr-text-light)', marginBottom: 8 }}>
                            {DAYS.map(d => <span key={d}>{d}</span>)}
                        </div>

                        {/* Fake Dates Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
                            {Array.from({ length: 24 }).map((_, i) => {
                                const dateNum = i + 1;
                                const isPast = dateNum < 10;
                                const isSelected = selectedDate === dateNum;

                                return (
                                    <motion.button
                                        key={i}
                                        disabled={isPast}
                                        whileHover={!isPast ? { scale: 1.1 } : {}}
                                        whileTap={!isPast ? { scale: 0.9 } : {}}
                                        onClick={() => setSelectedDate(dateNum)}
                                        style={{
                                            aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            borderRadius: 'var(--radius-md)', fontSize: '0.875rem', fontWeight: 700,
                                            transition: 'all 0.2s ease', cursor: isPast ? 'not-allowed' : 'pointer',
                                            color: isPast ? 'var(--clr-muted)' : (isSelected ? 'var(--clr-white)' : 'var(--clr-text)'),
                                            background: isSelected ? 'var(--clr-primary)' : (!isPast ? 'var(--clr-surface)' : 'transparent'),
                                            boxShadow: isSelected ? '0 4px 14px rgba(16, 185, 129, 0.3)' : 'none',
                                            border: 'none', outline: 'none'
                                        }}
                                    >
                                        {dateNum}
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Time Slots */}
                        <AnimatePresence>
                            {selectedDate && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    style={{ paddingTop: 'var(--space-6)', borderTop: '1px solid var(--clr-border)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: 'var(--clr-text)' }}>
                                        <Clock size={16} color="var(--clr-primary)" /> Créneaux disponibles le {selectedDate} Juin
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                                        {TIME_SLOTS.map(slot => (
                                            <button
                                                key={slot}
                                                onClick={() => setSelectedSlot(slot)}
                                                style={{
                                                    padding: '8px 12px', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', fontWeight: 700,
                                                    transition: 'all 0.3s ease', cursor: 'pointer', outline: 'none',
                                                    border: selectedSlot === slot ? '1px solid var(--clr-primary)' : '1px solid var(--clr-border)',
                                                    background: selectedSlot === slot ? 'var(--clr-primary)' : 'var(--clr-white)',
                                                    color: selectedSlot === slot ? 'var(--clr-white)' : 'var(--clr-text-light)',
                                                    boxShadow: selectedSlot === slot ? 'var(--shadow-md)' : 'none'
                                                }}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div style={{ paddingTop: 'var(--space-4)' }}>
                            <button
                                onClick={handleConfirm}
                                disabled={!selectedDate || !selectedSlot}
                                className="btn btn-primary"
                                style={{ width: '100%', height: 48, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                            >
                                <Calendar size={16} /> Confirmer la réservation
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'var(--space-10) 0', gap: 'var(--space-5)' }}
                    >
                        <div style={{ width: 80, height: 80, background: 'rgba(16, 185, 129, 0.1)', color: 'var(--clr-success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                            <CheckCircle size={40} />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--clr-text)', margin: 0 }}>Réservation Confirmée !</h2>
                        <p style={{ color: 'var(--clr-text-light)', margin: 0 }}>
                            Votre séance de conduite le <span style={{ fontWeight: 700, color: 'var(--clr-text)' }}>{selectedDate} Juin à {selectedSlot}</span> a été réservée avec succès.
                        </p>
                        <button
                            onClick={() => setStep(1)}
                            className="btn btn-outline"
                            style={{ marginTop: 'var(--space-4)' }}
                        >
                            Faire une autre réservation
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
