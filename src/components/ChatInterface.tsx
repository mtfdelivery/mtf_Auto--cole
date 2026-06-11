import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, UserCircle2, Phone, MoreVertical, Search, CheckCheck } from "lucide-react";

interface Message {
    id: number;
    text: string;
    sender: "me" | "them";
    time: string;
}

const INITIAL_MESSAGES: Message[] = [
    { id: 1, text: "Bonjour ! Avez-vous une disponibilité pour la semaine prochaine ?", sender: "me", time: "10:14" },
    { id: 2, text: "Bonjour Mohammed, bien sûr. Je suis disponible mardi à 14h ou jeudi matin.", sender: "them", time: "10:30" },
    { id: 3, text: "Mardi 14h me convient parfaitement. On maintient ce créneau ?", sender: "me", time: "10:35" },
    { id: 4, text: "C'est noté. Je bloque le créneau de 14h à 16h pour la conduite.", sender: "them", time: "10:42" },
];

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [inputText, setInputText] = useState("");

    const handleSend = () => {
        if (!inputText.trim()) return;
        const newMsg: Message = {
            id: Date.now(),
            text: inputText,
            sender: "me",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...messages, newMsg]);
        setInputText("");
    };

    return (
        <div style={{
            display: 'flex', height: 'calc(100vh - 120px)', width: '100%', maxWidth: 1100, margin: '0 auto',
            background: 'var(--clr-white)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)',
            overflow: 'hidden', border: '1px solid var(--clr-border)', marginTop: 'var(--space-4)'
        }}>

            {/* Sidebar */}
            <div style={{ display: 'none', flexDirection: 'column', width: 320, background: 'var(--clr-surface)', borderRight: '1px solid var(--clr-border)' }} className="md-flex">
                <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--clr-border)' }}>
                    <h2 style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--clr-text)', marginBottom: 'var(--space-4)' }}>Messages</h2>
                    <div style={{ position: 'relative' }}>
                        <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--clr-text-light)' }} />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            style={{
                                width: '100%', background: 'var(--clr-white)', border: '1px solid var(--clr-border)',
                                fontSize: '0.875rem', borderRadius: 'var(--radius-md)', padding: '8px 16px 8px 36px',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {[
                        { name: "Moniteur Tarek", school: "Auto-école Tunis", active: true },
                        { name: "Moniteur Sami", school: "Auto-école Ben Arous", active: false },
                    ].map((contact, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-4)',
                            cursor: 'pointer', borderBottom: '1px solid var(--clr-border)',
                            background: contact.active ? 'var(--clr-white)' : 'transparent',
                            borderLeft: contact.active ? '4px solid var(--clr-primary)' : '4px solid transparent'
                        }}
                            className="hover-bg-surface"
                        >
                            <div style={{ position: 'relative' }}>
                                <UserCircle2 size={40} color={contact.active ? 'var(--clr-primary)' : 'var(--clr-text-light)'} />
                                <div style={{
                                    position: 'absolute', bottom: 0, right: 0, width: 10, height: 10,
                                    border: '2px solid var(--clr-white)', borderRadius: '50%',
                                    background: contact.active ? 'var(--clr-success)' : 'var(--clr-text-light)'
                                }} />
                            </div>
                            <div style={{ flex: 1, overflow: 'hidden' }}>
                                <h4 style={{ fontWeight: 700, fontSize: '0.875rem', color: contact.active ? 'var(--clr-primary)' : 'var(--clr-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>{contact.name}</h4>
                                <p style={{ fontSize: '0.75rem', color: 'var(--clr-text-light)', margin: 0 }}>{contact.school}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#F8FAFC', position: 'relative' }}>
                {/* Chat Header */}
                <div style={{
                    height: 64, padding: '0 var(--space-6)', background: 'var(--clr-white)', borderBottom: '1px solid var(--clr-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10, flexShrink: 0
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <UserCircle2 size={32} color="var(--clr-primary)" />
                        <div>
                            <h3 style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--clr-text)', margin: 0 }}>Moniteur Tarek</h3>
                            <span style={{ fontSize: '0.75rem', color: 'var(--clr-success)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
                                <span style={{ width: 6, height: 6, background: 'var(--clr-success)', borderRadius: '50%', display: 'inline-block' }}></span> En ligne
                            </span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: 'var(--clr-text-light)' }}>
                        <button className="btn-icon"><Phone size={20} /></button>
                        <button className="btn-icon"><MoreVertical size={20} /></button>
                    </div>
                </div>

                {/* Timeline */}
                <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', background: 'linear-gradient(to bottom, transparent, rgba(248, 250, 252, 0.5))' }}>
                    <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--clr-text-light)', fontWeight: 500, marginBottom: 'var(--space-6)' }}>Aujourd'hui</div>
                    <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                style={{ display: 'flex', justifyContent: msg.sender === "me" ? "flex-end" : "flex-start" }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: '75%' }}>
                                    <div style={{
                                        padding: '12px 14px', fontSize: '0.875rem', lineHeight: 1.5,
                                        background: msg.sender === "me" ? 'var(--clr-primary)' : 'var(--clr-white)',
                                        color: msg.sender === "me" ? 'var(--clr-white)' : 'var(--clr-text)',
                                        borderRadius: '16px',
                                        borderBottomRightRadius: msg.sender === "me" ? 2 : 16,
                                        borderBottomLeftRadius: msg.sender === "me" ? 16 : 2,
                                        boxShadow: msg.sender === "me" ? '0 4px 14px rgba(16, 185, 129, 0.2)' : 'var(--shadow-sm)',
                                        border: msg.sender === "me" ? 'none' : '1px solid var(--clr-border)'
                                    }}>
                                        {msg.text}
                                    </div>
                                    <div style={{ fontSize: '10px', color: 'var(--clr-text-light)', display: 'flex', alignItems: 'center', gap: 4, justifyContent: msg.sender === "me" ? "flex-end" : "flex-start" }}>
                                        {msg.time} {msg.sender === "me" && <CheckCheck size={12} color="#3B82F6" />}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Input Area */}
                <div style={{ padding: 'var(--space-4)', background: 'var(--clr-white)', borderTop: '1px solid var(--clr-border)', flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', borderRadius: 'var(--radius-xl)', padding: '8px 10px' }}>
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Écrivez votre message..."
                            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '0.875rem', paddingLeft: 12, color: 'var(--clr-text)' }}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!inputText.trim()}
                            style={{
                                background: 'var(--clr-primary)', color: 'var(--clr-white)', padding: 10, borderRadius: 'var(--radius-lg)',
                                opacity: !inputText.trim() ? 0.5 : 1, transition: 'background 0.2s ease', cursor: !inputText.trim() ? 'not-allowed' : 'pointer'
                            }}
                        >
                            <Send size={16} style={{ transform: 'translate(-1px, 1px)' }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
