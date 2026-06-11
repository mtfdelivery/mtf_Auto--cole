import ChatInterface from '@/components/ChatInterface';

export default function DashboardChat() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Messagerie</h2>
                <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Contactez votre moniteur principal</div>
            </div>

            {/* We reuse the ChatInterface we found in components/ */}
            <div style={{ flex: 1, minHeight: 600 }}>
                <ChatInterface />
            </div>
        </div>
    );
}
