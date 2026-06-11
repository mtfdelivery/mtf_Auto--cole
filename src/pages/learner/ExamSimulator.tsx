import { useState, useCallback, useEffect, useRef } from "react";
import PageTransition from "@/components/PageTransition";
import { Check, X } from "lucide-react";

// Mock Questions Array
const MOCK_QUESTIONS = [
    { id: "1", theme: "Priorité", question_text: "À une intersection sans signalisation, qui a la priorité ?", options: ["Le véhicule venant de gauche", "Le véhicule venant de droite", "Le véhicule le plus rapide", "Le véhicule le plus grand"], correct_option_index: 1, explanation: "En Tunisie, la règle de priorité à droite s'applique aux intersections non signalisées." },
    { id: "2", theme: "Signalisation", question_text: "Que signifie un panneau triangulaire à bordure rouge ?", options: ["Interdiction", "Obligation", "Danger / Avertissement", "Information"], correct_option_index: 2, explanation: "Les panneaux triangulaires à bordure rouge signalent un danger ou un avertissement." },
    { id: "3", theme: "Vitesse", question_text: "Quelle est la vitesse maximale autorisée en agglomération en Tunisie ?", options: ["30 km/h", "40 km/h", "50 km/h", "60 km/h"], correct_option_index: 2, explanation: "La vitesse maximale en agglomération est de 50 km/h sauf indication contraire." },
    { id: "4", theme: "Sécurité", question_text: "Le port de la ceinture de sécurité est obligatoire pour :", options: ["Le conducteur uniquement", "Le conducteur et le passager avant", "Tous les occupants du véhicule", "Personne en ville"], correct_option_index: 2, explanation: "La ceinture de sécurité est obligatoire pour tous les occupants du véhicule." },
    { id: "5", theme: "Arrêt et Stationnement", question_text: "Un marquage jaune en zig-zag au sol signifie :", options: ["Stationnement autorisé", "Arrêt de bus - stationnement interdit", "Zone de chargement", "Passage piéton"], correct_option_index: 1, explanation: "Le marquage jaune en zig-zag indique un arrêt de bus où le stationnement est interdit." },
];

const TIME_PER_QUESTION = 30; // seconds

function CountdownBar({ duration, onTimeUp }: { duration: number; onTimeUp: () => void }) {
    const [remaining, setRemaining] = useState(duration);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        setRemaining(duration);
        intervalRef.current = setInterval(() => {
            setRemaining((prev) => {
                if (prev <= 1) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    onTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [duration, onTimeUp]);

    const percentage = (remaining / duration) * 100;
    const isCritical = remaining <= 5;
    const isLow = remaining <= 10;

    let barColor = "var(--clr-primary)";
    if (isCritical) barColor = "var(--clr-danger)";
    else if (isLow) barColor = "#EAB308";

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', marginBottom: 'var(--space-6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--clr-text-light)' }}>Temps restant</span>
                <span style={{ fontFamily: 'monospace', fontWeight: 700, color: barColor, animation: isCritical ? 'pulse 1s infinite' : 'none' }}>
                    {remaining}s
                </span>
            </div>
            <div style={{ height: 8, background: 'var(--clr-surface)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: barColor, width: `${percentage}%`, transition: 'width 1s linear, background-color 0.3s ease' }} />
            </div>
        </div>
    );
}

function ScoreRing({ score, total, size = 180, strokeWidth = 12 }: { score: number; total: number; size?: number; strokeWidth?: number }) {
    const [animatedScore, setAnimatedScore] = useState(0);
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const percentage = total > 0 ? score / total : 0;
    const passed = percentage >= 0.7;
    const color = passed ? "var(--clr-success)" : "var(--clr-danger)";

    useEffect(() => {
        const timer = setTimeout(() => setAnimatedScore(score), 100);
        return () => clearTimeout(timer);
    }, [score]);

    const targetOffset = circumference - (animatedScore / total) * circumference;

    return (
        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--clr-surface)" strokeWidth={strokeWidth} />
                <circle
                    cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
                    strokeDasharray={circumference} strokeDashoffset={targetOffset} strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
                />
            </svg>
            <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color }}>{Math.round(percentage * 100)}%</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--clr-text-light)' }}>{score}/{total}</span>
            </div>
        </div>
    );
}

export default function ExamSimulator() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [showResult, setShowResult] = useState(false);
    const [timerKey, setTimerKey] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const question = MOCK_QUESTIONS[currentIndex];
    const totalQuestions = MOCK_QUESTIONS.length;

    if (!question) return null;

    const handleSelect = (idx: number) => {
        if (showResult) return;
        setSelectedOption(idx);
    };

    const handleConfirm = useCallback(() => {
        if (selectedOption === null && !showResult) {
            setAnswers((prev) => ({ ...prev, [question.id]: -1 }));
            setShowResult(true);
            return;
        }

        if (!showResult) {
            setAnswers((prev) => ({ ...prev, [question.id]: selectedOption! }));
            setShowResult(true);
            return;
        }

        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedOption(null);
            setShowResult(false);
            setTimerKey((k) => k + 1);
        } else {
            setIsFinished(true);
        }
    }, [selectedOption, showResult, currentIndex, totalQuestions, question.id]);

    const handleTimeUp = useCallback(() => {
        if (!showResult) {
            setAnswers((prev) => ({ ...prev, [question.id]: -1 }));
            setShowResult(true);
        }
    }, [showResult, question.id]);

    const score = Object.entries(answers).reduce((acc, [qId, answer]) => {
        const q = MOCK_QUESTIONS.find((mq) => mq.id === qId);
        return acc + (q && answer === q.correct_option_index ? 1 : 0);
    }, 0);

    if (isFinished) {
        const passed = score / totalQuestions >= 0.7;
        return (
            <PageTransition className="container section flex flex-col items-center justify-center text-center" style={{ minHeight: '80vh', gap: 'var(--space-8)' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Résultat de l'examen blanc</h2>
                <ScoreRing score={score} total={totalQuestions} />
                <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: passed ? 'var(--clr-success)' : 'var(--clr-danger)', marginBottom: 'var(--space-2)' }}>
                        {passed ? "Félicitations, vous êtes prêt !" : "Encore un peu d'entraînement..."}
                    </h3>
                    <p style={{ color: 'var(--clr-text-light)' }}>
                        Vous avez obtenu {score} bonnes réponses sur {totalQuestions}.<br />
                        (Seuil de réussite exigé : 70%)
                    </p>
                </div>
                <button className="btn btn-primary lg" onClick={() => { setCurrentIndex(0); setSelectedOption(null); setAnswers({}); setShowResult(false); setTimerKey(0); setIsFinished(false); }}>
                    Recommencer l'examen
                </button>
            </PageTransition>
        );
    }

    return (
        <PageTransition className="container section">
            <div className="card" style={{ maxWidth: 900, margin: '0 auto', border: '1px solid var(--clr-border)', boxShadow: 'var(--shadow-xl)' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}>
                    <span style={{ fontWeight: 600, color: 'var(--clr-text-light)' }}>Question {currentIndex + 1}/{totalQuestions}</span>
                    <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--clr-primary)' }}>{question.theme}</span>
                </div>

                {/* Timer */}
                {!showResult && <CountdownBar key={timerKey} duration={TIME_PER_QUESTION} onTimeUp={handleTimeUp} />}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-8)' }}>

                    {/* Main Question Side */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                        <div style={{ aspectRatio: '16/9', background: 'var(--clr-surface)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <p style={{ color: 'var(--clr-text-light)' }}>Image Situationnelle</p>
                        </div>
                        <div style={{ padding: 'var(--space-4)', background: 'var(--clr-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--clr-border)' }}>
                            <p style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0, lineHeight: 1.5 }}>{question.question_text}</p>
                        </div>
                    </div>

                    {/* Options Side */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                        {question.options.map((option, idx) => {
                            let bg = "var(--clr-white)";
                            let border = "var(--clr-border)";
                            let outlineStatus = <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid var(--clr-border)' }} />;

                            if (showResult) {
                                if (idx === question.correct_option_index) {
                                    bg = "rgba(34, 197, 94, 0.05)";
                                    border = "var(--clr-success)";
                                    outlineStatus = <Check size={24} color="var(--clr-success)" />;
                                } else if (idx === selectedOption) {
                                    bg = "rgba(239, 68, 68, 0.05)";
                                    border = "var(--clr-danger)";
                                    outlineStatus = <X size={24} color="var(--clr-danger)" />;
                                }
                            } else if (idx === selectedOption) {
                                border = "var(--clr-primary)";
                                outlineStatus = <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--clr-primary)' }} />;
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleSelect(idx)}
                                    disabled={showResult}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-4)',
                                        background: bg, border: `2px solid ${border}`, borderRadius: 'var(--radius-md)',
                                        textAlign: 'left', transition: 'all 0.2s ease', cursor: showResult ? 'default' : 'pointer'
                                    }}
                                >
                                    <span style={{ display: 'inline-flex', flexShrink: 0 }}>{outlineStatus}</span>
                                    <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>{option}</span>
                                </button>
                            );
                        })}

                        {/* Explanation box */}
                        {showResult && (
                            <div style={{ padding: 'var(--space-4)', background: 'rgba(16, 185, 129, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid var(--clr-primary)', marginTop: 'var(--space-2)' }}>
                                <p style={{ color: 'var(--clr-primary)', fontWeight: 700, margin: '0 0 8px 0' }}>💡 Explication</p>
                                <p style={{ margin: 0, color: 'var(--clr-text)', fontSize: '0.875rem', lineHeight: 1.5 }}>{question.explanation}</p>
                            </div>
                        )}

                        <button
                            className="btn btn-primary"
                            style={{ width: '100%', marginTop: 'auto', padding: '16px' }}
                            onClick={handleConfirm}
                            disabled={!showResult && selectedOption === null}
                        >
                            {showResult ? (currentIndex < totalQuestions - 1 ? "Question suivante →" : "Voir les résultats") : "Valider la réponse"}
                        </button>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
