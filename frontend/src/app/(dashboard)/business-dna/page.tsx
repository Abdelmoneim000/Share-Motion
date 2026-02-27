"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Dna, Globe, Loader2, Sparkles, Target, MessageCircle, Palette,
    Users, RefreshCcw, ChevronRight, Lightbulb, TrendingUp, Copy,
    FileText, Zap, CheckCircle
} from "lucide-react";
import { clsx } from "clsx";

type AnalysisStage = "idle" | "scanning" | "analyzing" | "generating" | "complete";

const ANALYSIS_STAGES = [
    { id: "scanning", label: "Scanning website...", duration: 1500 },
    { id: "analyzing", label: "Analyzing brand identity...", duration: 2000 },
    { id: "generating", label: "Generating Business DNA...", duration: 1500 },
];

const MOCK_DNA = {
    brandVoice: {
        tone: "Sophisticated & Approachable",
        personality: ["Confident", "Innovative", "Trustworthy", "Premium"],
        doStyle: ["Use active voice", "Lead with value", "Include data points", "End with clear CTAs"],
        dontStyle: ["Avoid jargon heavy copy", "Skip aggressive sales language", "Don't use excessive emojis"],
    },
    targetAudience: {
        primary: "Tech-savvy professionals, 25-40",
        interests: ["SaaS", "Productivity", "Design", "Innovation"],
        painPoints: ["Content consistency", "Brand coherence", "Time management"],
    },
    contentStyle: {
        visualMood: "Clean, minimal, with bold accent colors",
        colorPalette: ["#1a1a2e", "#e94560", "#0f3460", "#16213e", "#ffd700"],
        contentMix: [
            { type: "Educational", pct: 40 },
            { type: "Behind-the-scenes", pct: 25 },
            { type: "Product showcase", pct: 20 },
            { type: "User-generated", pct: 15 },
        ],
    },
    industry: "Technology / SaaS",
    positioning: "Premium productivity platform for modern teams",
};

const MOCK_SUGGESTIONS = [
    { type: "Post Idea", text: "5 ways AI is transforming content creation for small teams — thread with real examples from our users", platform: "Twitter" },
    { type: "Campaign", text: "\"Productivity Week\" — 7-day challenge with daily tips, user spotlights, and a giveaway", platform: "Multi-platform" },
    { type: "Caption", text: "🚀 Your content pipeline shouldn't be a bottleneck. Here's how our team ships 3x more content with half the effort →", platform: "LinkedIn" },
    { type: "Reel Idea", text: "Before vs After: Our dashboard makeover. Quick transition reel showing old clunky workflow → smooth new UI", platform: "Instagram" },
];

export default function BusinessDnaPage() {
    const [url, setUrl] = useState("https://sharemotion.io");
    const [stage, setStage] = useState<AnalysisStage>("idle");
    const [dna, setDna] = useState<typeof MOCK_DNA | null>(null);
    const [activeSection, setActiveSection] = useState<string>("voice");

    const handleAnalyze = async () => {
        setStage("scanning");
        await new Promise(r => setTimeout(r, 1500));
        setStage("analyzing");
        await new Promise(r => setTimeout(r, 2000));
        setStage("generating");
        await new Promise(r => setTimeout(r, 1500));
        setDna(MOCK_DNA);
        setStage("complete");
    };

    const sections = [
        { id: "voice", label: "Brand Voice", icon: MessageCircle },
        { id: "audience", label: "Target Audience", icon: Users },
        { id: "style", label: "Content Style", icon: Palette },
        { id: "suggestions", label: "Content Ideas", icon: Lightbulb },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                    <Dna className="w-7 h-7 text-gold" /> Business DNA
                </h2>
                <p className="text-sm text-slate-400 mt-1">Analyze your brand and generate AI-powered content strategies</p>
            </div>

            {/* URL Input */}
            <div className="glass-panel rounded-2xl border border-white/10 p-6">
                <label className="text-sm font-medium text-white mb-3 block">Enter your website URL</label>
                <div className="flex gap-3">
                    <div className="relative flex-1">
                        <Globe className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                        <input
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-midnight-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all"
                            placeholder="https://yourcompany.com"
                        />
                    </div>
                    <button
                        onClick={handleAnalyze}
                        disabled={stage !== "idle" && stage !== "complete"}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-orange-500 text-midnight-900 font-bold rounded-xl shadow-lg shadow-gold/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 text-sm"
                    >
                        {stage === "complete" ? <><RefreshCcw className="w-4 h-4" /> Re-analyze</> : stage !== "idle" ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Sparkles className="w-4 h-4" /> Analyze</>}
                    </button>
                </div>

                {/* Analysis Progress */}
                <AnimatePresence>
                    {stage !== "idle" && stage !== "complete" && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4 space-y-3">
                            {ANALYSIS_STAGES.map((s, i) => {
                                const isCurrent = stage === s.id;
                                const isDone = ANALYSIS_STAGES.findIndex(st => st.id === stage) > i;
                                return (
                                    <div key={s.id} className={clsx("flex items-center gap-3 transition-all", isDone ? "opacity-50" : isCurrent ? "opacity-100" : "opacity-30")}>
                                        {isDone ? <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" /> : isCurrent ? <Loader2 className="w-4 h-4 text-gold animate-spin flex-shrink-0" /> : <div className="w-4 h-4 rounded-full border border-white/20 flex-shrink-0" />}
                                        <span className="text-sm text-slate-300">{s.label}</span>
                                    </div>
                                );
                            })}
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mt-2">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-gold to-orange-500 rounded-full"
                                    initial={{ width: "0%" }}
                                    animate={{ width: stage === "scanning" ? "33%" : stage === "analyzing" ? "66%" : "100%" }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* DNA Results */}
            <AnimatePresence>
                {dna && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex gap-6">
                        {/* Sidebar Tabs */}
                        <div className="w-56 space-y-1.5 flex-shrink-0">
                            {sections.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => setActiveSection(s.id)}
                                    className={clsx(
                                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left",
                                        activeSection === s.id ? "bg-gold/10 border border-gold/30 text-gold" : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"
                                    )}
                                >
                                    <s.icon className="w-4 h-4" /> {s.label}
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="flex-1 glass-panel rounded-2xl border border-white/10 p-6">
                            {activeSection === "voice" && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-display font-semibold text-white mb-1">Brand Voice</h3>
                                        <p className="text-sm text-slate-400">How your brand communicates</p>
                                    </div>
                                    <div className="p-4 bg-gold/5 border border-gold/20 rounded-xl">
                                        <div className="text-xs text-gold uppercase tracking-wider mb-1">Tone</div>
                                        <div className="text-lg font-display font-bold text-white">{dna.brandVoice.tone}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Personality Traits</div>
                                        <div className="flex flex-wrap gap-2">
                                            {dna.brandVoice.personality.map(t => (
                                                <span key={t} className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm rounded-lg">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-xs text-green-400 uppercase tracking-wider mb-2">✓ Do</div>
                                            <ul className="space-y-1.5">
                                                {dna.brandVoice.doStyle.map(d => <li key={d} className="text-sm text-slate-300 flex items-start gap-2"><ChevronRight className="w-3 h-3 text-green-400 mt-1 flex-shrink-0" />{d}</li>)}
                                            </ul>
                                        </div>
                                        <div>
                                            <div className="text-xs text-red-400 uppercase tracking-wider mb-2">✕ Don&apos;t</div>
                                            <ul className="space-y-1.5">
                                                {dna.brandVoice.dontStyle.map(d => <li key={d} className="text-sm text-slate-300 flex items-start gap-2"><ChevronRight className="w-3 h-3 text-red-400 mt-1 flex-shrink-0" />{d}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeSection === "audience" && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-display font-semibold text-white mb-1">Target Audience</h3>
                                        <p className="text-sm text-slate-400">Who your content should reach</p>
                                    </div>
                                    <div className="p-4 bg-sky-500/5 border border-sky-500/20 rounded-xl">
                                        <div className="text-xs text-sky-400 uppercase tracking-wider mb-1">Primary Audience</div>
                                        <div className="text-lg font-display font-bold text-white">{dna.targetAudience.primary}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Interests</div>
                                        <div className="flex flex-wrap gap-2">
                                            {dna.targetAudience.interests.map(t => <span key={t} className="px-3 py-1.5 bg-white/5 border border-white/10 text-slate-300 text-sm rounded-lg">{t}</span>)}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Pain Points</div>
                                        <div className="space-y-2">
                                            {dna.targetAudience.painPoints.map(p => (
                                                <div key={p} className="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                                                    <Target className="w-4 h-4 text-red-400 flex-shrink-0" />
                                                    <span className="text-sm text-slate-300">{p}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeSection === "style" && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-display font-semibold text-white mb-1">Content Style</h3>
                                        <p className="text-sm text-slate-400">Visual and content direction</p>
                                    </div>
                                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Visual Mood</div>
                                        <div className="text-white font-medium">{dna.contentStyle.visualMood}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Brand Colors</div>
                                        <div className="flex gap-3">
                                            {dna.contentStyle.colorPalette.map(c => (
                                                <div key={c} className="text-center group">
                                                    <div className="w-12 h-12 rounded-xl border-2 border-white/10 group-hover:border-white/30 transition-colors cursor-pointer shadow-lg" style={{ backgroundColor: c }} />
                                                    <span className="text-[10px] text-slate-500 mt-1 block font-mono">{c}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Content Mix</div>
                                        <div className="space-y-3">
                                            {dna.contentStyle.contentMix.map(m => (
                                                <div key={m.type} className="flex items-center gap-3">
                                                    <span className="text-sm text-slate-300 w-36">{m.type}</span>
                                                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                                        <motion.div initial={{ width: 0 }} animate={{ width: `${m.pct}%` }} transition={{ delay: 0.5, duration: 0.8 }} className="h-full bg-gradient-to-r from-gold to-orange-500 rounded-full" />
                                                    </div>
                                                    <span className="text-xs text-gold font-mono w-8 text-right">{m.pct}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeSection === "suggestions" && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-display font-semibold text-white mb-1">Content Ideas</h3>
                                            <p className="text-sm text-slate-400">AI-generated suggestions based on your DNA</p>
                                        </div>
                                        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gold bg-gold/10 rounded-lg hover:bg-gold/20 transition-colors">
                                            <Zap className="w-3 h-3" /> Generate More
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {MOCK_SUGGESTIONS.map((s, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-gold/20 transition-all group"
                                            >
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="px-2 py-0.5 bg-gold/10 border border-gold/20 text-gold text-[10px] font-medium rounded">{s.type}</span>
                                                    <span className="text-[10px] text-slate-500">{s.platform}</span>
                                                </div>
                                                <p className="text-sm text-slate-300 leading-relaxed">{s.text}</p>
                                                <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="flex items-center gap-1 px-2.5 py-1 text-[10px] text-gold bg-gold/10 rounded-lg"><Copy className="w-3 h-3" /> Copy</button>
                                                    <button className="flex items-center gap-1 px-2.5 py-1 text-[10px] text-slate-400 bg-white/5 rounded-lg"><FileText className="w-3 h-3" /> Create Post</button>
                                                    <button className="flex items-center gap-1 px-2.5 py-1 text-[10px] text-slate-400 bg-white/5 rounded-lg"><TrendingUp className="w-3 h-3" /> Expand</button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
