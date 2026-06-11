export function HomeHeroSkeleton() {
    return (
        <div
            style={{
                width: '100%',
                minHeight: '80vh',
                background: 'linear-gradient(135deg, #065F46 0%, #0A3F3A 40%, #064E3B 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--space-8)',
            }}
        >
            <div style={{ maxWidth: 800, width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', alignItems: 'center' }}>
                <div className="skeleton" style={{ height: 64, width: '80%' }} />
                <div className="skeleton" style={{ height: 32, width: '60%' }} />
                <div className="skeleton" style={{ height: 56, width: 240, marginTop: 'var(--space-4)', borderRadius: 'var(--radius-xl)' }} />
            </div>
        </div>
    );
}

export function CourseCardSkeleton() {
    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: 400 }}>
            {/* Image placeholder */}
            <div className="skeleton" style={{ height: 200, width: '100%', borderRadius: '0' }} />
            {/* Content */}
            <div style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="skeleton" style={{ height: 24, width: 80, borderRadius: 'var(--radius-full)' }} />
                    <div className="skeleton" style={{ height: 20, width: 40 }} />
                </div>
                <div className="skeleton" style={{ height: 28, width: '90%' }} />
                <div className="skeleton" style={{ height: 20, width: '100%' }} />
                <div className="skeleton" style={{ height: 20, width: '70%' }} />
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--clr-border)' }}>
                    <div className="skeleton" style={{ height: 24, width: 100 }} />
                    <div className="skeleton" style={{ height: 24, width: 60 }} />
                </div>
            </div>
        </div>
    );
}

export function InstructorCardSkeleton() {
    return (
        <div className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 'var(--space-4)' }}>
            <div className="skeleton" style={{ width: 120, height: 120, borderRadius: 'var(--radius-full)' }} />
            <div className="skeleton" style={{ width: '60%', height: 24 }} />
            <div className="skeleton" style={{ width: '40%', height: 20 }} />
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                <div className="skeleton" style={{ width: 60, height: 24, borderRadius: 'var(--radius-full)' }} />
                <div className="skeleton" style={{ width: 60, height: 24, borderRadius: 'var(--radius-full)' }} />
            </div>
            <div className="skeleton" style={{ width: '100%', height: 60, marginTop: 'var(--space-2)' }} />
        </div>
    );
}

export function PricingTableSkeleton() {
    return (
        <div className="grid-cards">
            {[1, 2, 3].map((i) => (
                <div key={i} className="card" style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                    <div className="skeleton" style={{ height: 28, width: '50%' }} />
                    <div className="skeleton" style={{ height: 48, width: '70%' }} />
                    <div className="skeleton" style={{ height: 20, width: '100%' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', margin: 'var(--space-4) 0' }}>
                        {[1, 2, 3, 4, 5].map((j) => (
                            <div key={j} className="skeleton" style={{ height: 20, width: '100%' }} />
                        ))}
                    </div>
                    <div className="skeleton" style={{ height: 48, width: '100%', borderRadius: 'var(--radius-xl)', marginTop: 'auto' }} />
                </div>
            ))}
        </div>
    );
}

export function DashboardSkeleton() {
    return (
        <div className="dashboard-layout">
            <aside className="dashboard-sidebar">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    <div className="skeleton" style={{ height: 40, width: 140, marginBottom: 'var(--space-6)' }} />
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="skeleton" style={{ height: 40, width: '100%', borderRadius: 'var(--radius-lg)' }} />
                    ))}
                </div>
            </aside>
            <main className="dashboard-main">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', maxWidth: 1000, margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="skeleton" style={{ height: 40, width: 240 }} />
                        <div className="skeleton" style={{ height: 48, width: 48, borderRadius: 'var(--radius-full)' }} />
                    </div>

                    <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="card" style={{ padding: 'var(--space-6)' }}>
                                <div className="skeleton" style={{ height: 24, width: 120, marginBottom: 'var(--space-4)' }} />
                                <div className="skeleton" style={{ height: 48, width: 80 }} />
                            </div>
                        ))}
                    </div>

                    <div className="card" style={{ padding: 'var(--space-6)', height: 400 }}>
                        <div className="skeleton" style={{ height: 28, width: 200, marginBottom: 'var(--space-6)' }} />
                        <div className="skeleton" style={{ height: 'calc(100% - 60px)', width: '100%' }} />
                    </div>
                </div>
            </main>
        </div>
    );
}

export function LessonCalendarSkeleton() {
    return (
        <div className="card" style={{ padding: 'var(--space-6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                <div className="skeleton" style={{ height: 28, width: 160 }} />
                <div className="skeleton" style={{ height: 36, width: 200, borderRadius: 'var(--radius-lg)' }} />
            </div>
            <div className="calendar-grid">
                {/* Days header */}
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div key={`header-${i}`} className="skeleton" style={{ height: 40, margin: '0 2px' }} />
                ))}
                {/* Calendar days */}
                {Array.from({ length: 35 }).map((_, i) => (
                    <div key={`day-${i}`} className="skeleton" style={{ height: 100, margin: '2px', borderRadius: 'var(--radius-md)' }} />
                ))}
            </div>
        </div>
    );
}

// Ensure the default export is the HomeHeroSkeleton for use with React.lazy if needed,
// but named exports are preferred.
export default HomeHeroSkeleton;
