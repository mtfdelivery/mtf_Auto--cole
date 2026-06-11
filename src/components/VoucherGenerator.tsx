import { useState } from "react";
import { z } from "zod";

function generateVoucherCode(): string {
    const year = new Date().getFullYear();
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Exclude confusing chars (0, O, I, 1)
    let code = "";
    for (let i = 0; i < 4; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `CD-${year}-${code}`;
}

interface GeneratedVoucher {
    code: string;
    duration_days: number;
    created_at: string;
}

export default function VoucherGenerator() {
    const [quantity, setQuantity] = useState(5);
    const [duration, setDuration] = useState(30);
    const [vouchers, setVouchers] = useState<GeneratedVoucher[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const voucherGenSchema = z.object({
        quantity: z.number().int().min(1, "Minimum 1 voucher").max(100, "Maximum 100 vouchers à la fois"),
        duration: z.number().int().min(7, "La durée minimum est de 7 jours"),
    });

    const handleGenerate = () => {
        setError(null);
        const parsed = voucherGenSchema.safeParse({ quantity, duration });
        if (!parsed.success) {
            setError(parsed.error.issues?.[0]?.message || "Erreur de validation");
            return;
        }

        setIsGenerating(true);
        setTimeout(() => {
            const newVouchers: GeneratedVoucher[] = [];
            for (let i = 0; i < quantity; i++) {
                newVouchers.push({
                    code: generateVoucherCode(),
                    duration_days: duration,
                    created_at: new Date().toISOString(),
                });
            }
            setVouchers((prev) => [...newVouchers, ...prev]);
            setIsGenerating(false);
        }, 500);
    };

    const handleCopyAll = () => {
        const codes = vouchers.map((v) => v.code).join("\n");
        navigator.clipboard.writeText(codes).then(() => {
            alert("Codes copiés dans le presse-papiers !");
        }).catch(() => {
            setError("Erreur lors de la copie.");
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {/* Generator Form */}
            <div className="card" style={{ padding: 'var(--space-6)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--clr-text)', marginBottom: 'var(--space-4)' }}>
                    Générer des Vouchers
                </h3>

                {error && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--clr-danger)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)', fontSize: '0.875rem' }}>
                        {error}
                    </div>
                )}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                    <div style={{ flex: '1 1 200px' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--clr-text-light)', marginBottom: 'var(--space-2)' }}>
                            Quantité
                        </label>
                        <input
                            type="number"
                            min={1}
                            max={100}
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="input-field"
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div style={{ flex: '1 1 200px' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--clr-text-light)', marginBottom: 'var(--space-2)' }}>
                            Durée (jours)
                        </label>
                        <select
                            value={duration}
                            onChange={(e) => setDuration(Number(e.target.value))}
                            className="input-field"
                            style={{ width: '100%', appearance: 'none', background: 'var(--clr-surface)', cursor: 'pointer' }}
                        >
                            <option value={7}>7 jours</option>
                            <option value={15}>15 jours</option>
                            <option value={30}>30 jours</option>
                            <option value={60}>60 jours</option>
                            <option value={90}>90 jours</option>
                        </select>
                    </div>
                    <div style={{ flex: '1 1 200px', display: 'flex', alignItems: 'flex-end' }}>
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="btn btn-primary"
                            style={{ width: '100%' }}
                        >
                            {isGenerating ? "Génération..." : "Générer"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Generated Vouchers */}
            {vouchers.length > 0 && (
                <div className="card" style={{ padding: 'var(--space-6)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--clr-text)' }}>
                            Vouchers générés ({vouchers.length})
                        </h3>
                        <button className="btn btn-outline" onClick={handleCopyAll}>
                            Copier tout
                        </button>
                    </div>

                    <div style={{ overflowX: 'auto', background: 'var(--clr-white)', border: '1px solid var(--clr-border)', borderRadius: 'var(--radius-lg)' }}>
                        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--clr-border)', background: 'var(--clr-surface)' }}>
                                    <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--clr-text-light)' }}>Code</th>
                                    <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--clr-text-light)' }}>Durée</th>
                                    <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--clr-text-light)' }}>Statut</th>
                                    <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--clr-text-light)' }}>Créé le</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vouchers.map((voucher, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid var(--clr-border)', transition: 'background 0.2s ease' }} className="hover-bg-surface">
                                        <td style={{ padding: '12px 16px' }}>
                                            <code style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--clr-primary)' }}>{voucher.code}</code>
                                        </td>
                                        <td style={{ padding: '12px 16px', color: 'var(--clr-text)' }}>{voucher.duration_days} jours</td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600, background: 'rgba(16, 185, 129, 0.1)', color: 'var(--clr-success)' }}>
                                                Disponible
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px 16px', color: 'var(--clr-text-light)' }}>
                                            {new Date(voucher.created_at).toLocaleDateString("fr-TN")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
