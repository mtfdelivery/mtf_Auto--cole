import { FileText, Download, Lock } from 'lucide-react';

const userProfile = { isPremium: false };
const pdfs = [
    { id: 1, title: "Signalisation verticale", size: "1.2 MB", isPremium: false },
    { id: 2, title: "Priorités & intersections", size: "2.4 MB", isPremium: true },
    { id: 3, title: "Distances de freinage", size: "0.8 MB", isPremium: true },
    { id: 4, title: "Les sanctions et amendes", size: "1.5 MB", isPremium: true },
    { id: 5, title: "Règles de dépassement", size: "1.1 MB", isPremium: true },
    { id: 6, title: "Entretien du véhicule", size: "3.2 MB", isPremium: true },
];

export default function DashboardPDFs() {
    return (
        <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: 24 }}>Fiches de Révision PDF</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
                {pdfs.map((pdf) => (
                    <div key={pdf.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 20, padding: 24, position: 'relative', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ width: 48, height: 48, background: '#fee2e2', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: '#ef4444' }}>
                            <FileText size={24} />
                        </div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.3, marginBottom: 8, flex: 1 }}>{pdf.title}</h3>
                        <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: 20 }}>{pdf.size}</div>

                        <button style={{ width: '100%', padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, fontWeight: 600, color: '#475569', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                            <Download size={16} /> Télécharger
                        </button>

                        {!userProfile.isPremium && pdf.isPremium && (
                            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(3px)', borderRadius: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                                <div style={{ width: 48, height: 48, background: '#fff', border: '1px solid #e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                                    <Lock size={20} />
                                </div>
                                <span style={{ fontSize: '0.875rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Version Premium</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
