import { CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const recentExams = [
    { id: 1, date: "Hier", score: 26, duration: "14m 20s", passed: true },
    { id: 2, date: "Lun 12 Mai", score: 22, duration: "15m 05s", passed: false },
    { id: 3, date: "Dim 11 Mai", score: 28, duration: "12m 45s", passed: true },
];

export default function DashboardExams() {
    return (
        <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Simulateur d'Examen</h2>
                <Link to="/learner/exam" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '1rem', borderRadius: 12 }}>Nouveau test (30 min)</Link>
            </div>

            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 24, padding: '8px 0', overflow: 'hidden' }}>
                <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9', background: '#f8fafc', fontWeight: 700, color: '#64748b', fontSize: '0.875rem' }}>
                    Historique de tes examens
                </div>
                {recentExams.map((exam, i) => (
                    <div key={exam.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: i < recentExams.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{ width: 56, height: 56, borderRadius: 16, background: exam.passed ? '#ecfdf5' : '#fef2f2', color: exam.passed ? '#10b981' : '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {exam.passed ? <CheckCircle2 size={28} /> : <XCircle size={28} />}
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '1.125rem' }}>Test du {exam.date}</div>
                                <div style={{ color: '#64748b', fontSize: '1rem', display: 'flex', gap: 12, marginTop: 4 }}>
                                    <span>⏱ {exam.duration}</span>
                                    <span>•</span>
                                    <span style={{ color: exam.passed ? '#059669' : '#dc2626', fontWeight: 600 }}>{exam.score}/30 correct</span>
                                </div>
                            </div>
                        </div>
                        <button style={{ padding: '10px 20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, fontSize: '1rem', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>Réviser vos erreurs</button>
                    </div>
                ))}
            </div>
        </section>
    );
}
