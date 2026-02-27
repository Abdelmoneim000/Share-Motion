"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    User, Building2, Globe, ArrowRight, ArrowLeft, Loader2, Sparkles,
    Check, Instagram, Youtube, Twitter, Linkedin
} from "lucide-react";
import { MockAuthService } from "@/services/mock/auth.mock";

const STEPS = ["Account", "Workspace", "Connect"];

const INDUSTRIES = [
    "Fashion & Beauty", "Technology", "Health & Fitness",
    "Food & Beverage", "Travel", "Education",
    "Entertainment", "Finance", "E-commerce", "Other"
];

const PLATFORMS = [
    { id: "instagram", name: "Instagram", icon: Instagram, color: "from-pink-500 to-purple-500" },
    { id: "tiktok", name: "TikTok", icon: Globe, color: "from-cyan-400 to-teal-500" },
    { id: "youtube", name: "YouTube", icon: Youtube, color: "from-red-500 to-red-600" },
    { id: "twitter", name: "X / Twitter", icon: Twitter, color: "from-sky-400 to-blue-500" },
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "from-blue-600 to-blue-700" },
    { id: "facebook", name: "Facebook", icon: Globe, color: "from-blue-500 to-indigo-600" },
];

export default function RegisterPage() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);

    // Step 1 - Account
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Step 2 - Workspace
    const [workspaceName, setWorkspaceName] = useState("");
    const [industry, setIndustry] = useState("");
    const [workspaceType, setWorkspaceType] = useState<string>("");

    // Step 3 - Platforms
    const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);

    const togglePlatform = (id: string) => {
        setConnectedPlatforms((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        );
    };

    const handleFinish = async () => {
        setLoading(true);
        await MockAuthService.register(name, email, password);
        setLoading(false);
        router.push("/dashboard");
    };

    return (
        <div className="flex-1 flex items-center justify-center p-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-gold to-orange-500 shadow-2xl shadow-gold/30 mb-5">
                        <Sparkles className="w-7 h-7 text-midnight-900" />
                    </div>
                    <h1 className="text-2xl font-display font-bold text-white">Create your account</h1>
                </div>

                {/* Progress */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    {STEPS.map((s, i) => (
                        <div key={s} className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < step ? "bg-green-500 text-white" : i === step ? "bg-gold text-midnight-900 shadow-lg shadow-gold/30" : "bg-white/5 text-slate-500 border border-white/10"
                                }`}>
                                {i < step ? <Check className="w-4 h-4" /> : i + 1}
                            </div>
                            <span className={`text-xs font-medium hidden sm:inline ${i === step ? "text-white" : "text-slate-500"}`}>{s}</span>
                            {i < STEPS.length - 1 && <div className={`w-12 h-px ${i < step ? "bg-green-500" : "bg-white/10"}`} />}
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <div className="glass-panel p-8 rounded-2xl border border-white/10 min-h-[340px]">
                    {step === 0 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                            <div className="flex items-center gap-3 mb-6">
                                <User className="w-5 h-5 text-gold" />
                                <h2 className="text-lg font-display font-semibold text-white">Your details</h2>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-300">Full Name</label>
                                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-midnight-900/50 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all" placeholder="Sarah Mitchell" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-300">Work Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-midnight-900/50 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all" placeholder="sarah@company.com" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-300">Password</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-midnight-900/50 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all" placeholder="Min 8 characters" />
                            </div>
                        </motion.div>
                    )}

                    {step === 1 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                            <div className="flex items-center gap-3 mb-6">
                                <Building2 className="w-5 h-5 text-gold" />
                                <h2 className="text-lg font-display font-semibold text-white">Your workspace</h2>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-300">Workspace Name</label>
                                <input value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} className="w-full px-4 py-3 bg-midnight-900/50 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all" placeholder="Mitchell Studios" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-300">I am a...</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {["Influencer / Creator", "Agency", "Brand / Company", "UGC Creator"].map((t) => (
                                        <button key={t} onClick={() => setWorkspaceType(t)} className={`p-3 rounded-xl border text-sm font-medium transition-all text-left ${workspaceType === t ? "bg-gold/10 border-gold/40 text-gold" : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-white"}`}>
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-300">Industry</label>
                                <div className="flex flex-wrap gap-2">
                                    {INDUSTRIES.map((ind) => (
                                        <button key={ind} onClick={() => setIndustry(ind)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${industry === ind ? "bg-gold text-midnight-900" : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"}`}>
                                            {ind}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                            <div className="flex items-center gap-3 mb-2">
                                <Globe className="w-5 h-5 text-gold" />
                                <h2 className="text-lg font-display font-semibold text-white">Connect platforms</h2>
                            </div>
                            <p className="text-sm text-slate-400 mb-4">Select the platforms you want to manage. You can always add more later.</p>
                            <div className="space-y-3">
                                {PLATFORMS.map((p) => {
                                    const connected = connectedPlatforms.includes(p.id);
                                    return (
                                        <button
                                            key={p.id}
                                            onClick={() => togglePlatform(p.id)}
                                            className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${connected ? "bg-white/10 border-gold/30 shadow-lg shadow-gold/5" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
                                        >
                                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center`}>
                                                <p.icon className="w-5 h-5 text-white" />
                                            </div>
                                            <span className="text-sm font-medium text-white flex-1 text-left">{p.name}</span>
                                            {connected ? (
                                                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                                    <Check className="w-3 h-3 text-white" />
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-500">Click to connect</span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-6">
                    {step > 0 ? (
                        <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 px-4 py-2.5 text-slate-400 hover:text-white transition-colors text-sm font-medium">
                            <ArrowLeft className="w-4 h-4" /> Back
                        </button>
                    ) : (
                        <div />
                    )}
                    {step < 2 ? (
                        <button onClick={() => setStep(step + 1)} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-gold to-orange-500 text-midnight-900 font-bold rounded-xl shadow-lg shadow-gold/25 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm">
                            Continue <ArrowRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <button onClick={handleFinish} disabled={loading} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-gold to-orange-500 text-midnight-900 font-bold rounded-xl shadow-lg shadow-gold/25 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm disabled:opacity-50">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Sparkles className="w-4 h-4" /> Launch Workspace</>}
                        </button>
                    )}
                </div>

                <p className="text-center mt-6 text-sm text-slate-400">
                    Already have an account?{" "}
                    <Link href="/login" className="text-gold hover:text-yellow-400 font-medium transition-colors">Sign in</Link>
                </p>
            </motion.div>
        </div>
    );
}
