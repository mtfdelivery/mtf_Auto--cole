import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, User, Car, FileText, Video } from 'lucide-react';

// Mock data for events
const upcomingEvents = [
    {
        id: 1,
        date: '2026-06-15',
        time: '14:00 - 15:30',
        type: 'driving', // driving | meeting | exam
        title: 'Séance de conduite Pratique',
        monitor: 'Sarah K.',
        location: 'Point de rencontre A',
        status: 'confirmed',
    },
    {
        id: 2,
        date: '2026-06-16',
        time: '10:00 - 10:30',
        type: 'meeting',
        title: 'Point d\'étape avec le moniteur',
        monitor: 'Sarah K.',
        location: 'En ligne (Visio)',
        status: 'confirmed',
    },
    {
        id: 3,
        date: '2026-06-20',
        time: '09:00 - 11:00',
        type: 'exam',
        title: 'Examen Blanc : Code de la route',
        monitor: 'Auto-école',
        location: 'Salle 2 - MTF Auto-école',
        status: 'pending',
    },
    {
        id: 4,
        date: '2026-06-25',
        time: '16:00 - 17:30',
        type: 'driving',
        title: 'Séance de conduite Pratique',
        monitor: 'Sarah K.',
        location: 'Point de rencontre B',
        status: 'confirmed',
    }
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

// Helper to format date
const formatDateFull = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
};

export default function DashboardCalendar() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 5, 15)); // Default to roughly the mock data time

    // Simple manual mini-calendar math for June 2026
    const daysInMonth = 30; // June has 30 days
    const startingDayOfWeek = 1; // June 1, 2026 is a Monday (1)

    const getEventIcon = (type: string) => {
        switch (type) {
            case 'driving': return <Car size={20} />;
            case 'meeting': return <Video size={20} />;
            case 'exam': return <FileText size={20} />;
            default: return <CalendarIcon size={20} />;
        }
    };

    const getEventColor = (type: string) => {
        switch (type) {
            case 'driving': return { bg: '#ecfdf5', text: '#10b981', border: '#a7f3d0' };
            case 'meeting': return { bg: '#eff6ff', text: '#3b82f6', border: '#bfdbfe' };
            case 'exam': return { bg: '#fef2f2', text: '#ef4444', border: '#fecaca' };
            default: return { bg: '#f8fafc', text: '#64748b', border: '#e2e8f0' };
        }
    };

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* PAGE HEADER */}
            <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>Mon Planning</h1>
                    <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>Gérez vos séances de conduite, réunions et dates d'examens.</p>
                </div>
                <button style={{
                    padding: '10px 24px', background: '#0f172a', color: '#fff',
                    border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '0.875rem',
                    cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8
                }}>
                    <CalendarIcon size={16} /> Demander une séance
                </button>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: 24, alignItems: 'start' }}>

                {/* LEFT: AGENDA / TIMELINE LIST */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {upcomingEvents.map(event => {
                        const style = getEventColor(event.type);
                        return (
                            <motion.div key={event.id} variants={itemVariants} style={{ display: 'flex', gap: 24, position: 'relative' }}>
                                {/* Timeline Line (Visual) */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 48, flexShrink: 0 }}>
                                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>{event.time.split(' ')[0]}</div>
                                    <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: 8 }}>{event.time.split(' ')[2]}</div>
                                    <div style={{ width: 2, flex: 1, background: '#e2e8f0', borderRadius: 2 }} />
                                </div>

                                {/* Event Card */}
                                <div style={{
                                    flex: 1, background: '#fff', border: `1px solid #e2e8f0`, borderLeft: `4px solid ${style.text}`,
                                    borderRadius: 16, padding: 24, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
                                    marginBottom: 16
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                                        <div>
                                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: style.bg, color: style.text, borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
                                                {getEventIcon(event.type)}
                                                {event.type === 'driving' ? 'Conduite' : event.type === 'meeting' ? 'Réunion Moniteur' : 'Examen'}
                                            </div>
                                            <h3 style={{ margin: '0 0 8px', fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{event.title}</h3>
                                            <div style={{ color: '#64748b', fontSize: '0.875rem', textTransform: 'capitalize' }}>
                                                {formatDateFull(event.date)}
                                            </div>
                                        </div>
                                        {event.status === 'confirmed' && (
                                            <div style={{ padding: '6px 12px', background: '#ecfdf5', color: '#10b981', borderRadius: 8, fontSize: '0.8125rem', fontWeight: 700 }}>
                                                Confirmé
                                            </div>
                                        )}
                                        {event.status === 'pending' && (
                                            <div style={{ padding: '6px 12px', background: '#fef3c7', color: '#d97706', borderRadius: 8, fontSize: '0.8125rem', fontWeight: 700 }}>
                                                En attente
                                            </div>
                                        )}
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: 24, borderTop: '1px solid #f1f5f9', paddingTop: 16 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#475569', fontSize: '0.875rem', fontWeight: 500 }}>
                                            <User size={16} color="#94a3b8" /> {event.monitor}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#475569', fontSize: '0.875rem', fontWeight: 500 }}>
                                            <MapPin size={16} color="#94a3b8" /> {event.location}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#475569', fontSize: '0.875rem', fontWeight: 500 }}>
                                            <Clock size={16} color="#94a3b8" /> {event.time}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* RIGHT: MINI CALENDAR WIDGET */}
                <div style={{ position: 'sticky', top: 96 }}>
                    <motion.div variants={itemVariants} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 24, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>

                        {/* Month Nav */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                            <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 800, color: '#0f172a' }}>Juin 2026</h3>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <button style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
                                    <ChevronLeft size={16} />
                                </button>
                                <button style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Days Header */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
                            {['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'].map(day => (
                                <div key={day} style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8' }}>
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Days Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                            {Array.from({ length: startingDayOfWeek - 1 }).map((_, i) => (
                                <div key={`empty-${i}`} />
                            ))}

                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const day = i + 1;
                                const isSelected = selectedDate.getDate() === day;

                                // Mock event dots
                                const hasDriving = day === 15 || day === 25;
                                const hasMeeting = day === 16;
                                const hasExam = day === 20;

                                return (
                                    <button
                                        key={day}
                                        onClick={() => setSelectedDate(new Date(2026, 5, day))}
                                        style={{
                                            position: 'relative', height: 40, border: 'none', borderRadius: 8,
                                            background: isSelected ? '#0f172a' : 'transparent',
                                            color: isSelected ? '#fff' : '#475569',
                                            fontWeight: isSelected ? 700 : 500, fontSize: '0.875rem',
                                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            transition: 'all 0.2s'
                                        }}
                                        disabled={day < 5} // Mock past days disabled just for aesthetic
                                    >
                                        <span style={{ opacity: day < 5 ? 0.3 : 1 }}>{day}</span>

                                        {/* Status Dots */}
                                        <div style={{ position: 'absolute', bottom: 4, display: 'flex', gap: 2 }}>
                                            {hasDriving && <div style={{ width: 4, height: 4, borderRadius: '50%', background: isSelected ? '#10b981' : '#10b981' }} />}
                                            {hasMeeting && <div style={{ width: 4, height: 4, borderRadius: '50%', background: isSelected ? '#3b82f6' : '#3b82f6' }} />}
                                            {hasExam && <div style={{ width: 4, height: 4, borderRadius: '50%', background: isSelected ? '#ef4444' : '#ef4444' }} />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                    </motion.div>

                    {/* Stats Widget */}
                    <motion.div variants={itemVariants} style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 16, padding: 24, marginTop: 24, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                        <div style={{ width: 48, height: 48, borderRadius: 12, background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Car size={24} />
                        </div>
                        <div>
                            <h4 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 800, color: '#064e3b' }}>Séances restantes</h4>
                            <p style={{ margin: 0, fontSize: '0.875rem', color: '#047857', lineHeight: 1.5 }}>
                                Vous avez <strong>12 séances</strong> de conduite encore disponibles dans votre forfait Premium.
                            </p>
                        </div>
                    </motion.div>
                </div>

            </div>
        </motion.div>
    );
}
