// src/app/(dashboard)/influencers/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Influencer, MockInfluencerService } from '@/services/mock/influencers.mock';
import { Search, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function InfluencersPage() {
    const [influencers, setInfluencers] = useState<Influencer[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function load() {
            try {
                const data = await MockInfluencerService.getAll();
                setInfluencers(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const filteredInfluencers = influencers.filter(inf =>
        inf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inf.niche.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-display font-bold text-white">Influencer Marketplace</h2>
                <div className="relative group">
                    <input
                        type="text"
                        placeholder="Search by niche, name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-gold/50 w-64 md:w-96 transition-all group-hover:bg-white/10"
                    />
                    <Search className="absolute left-3 top-2.5 text-slate-500 w-4 h-4" />
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center p-20">
                    <Loader2 className="w-8 h-8 text-gold animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredInfluencers.map((inf, i) => (
                        <motion.div
                            key={inf.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-panel group relative overflow-hidden rounded-2xl transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-gold/5 cursor-pointer"
                        >
                            {/* Aura Pattern Background - Dynamic based on engagement */}
                            <div className={`absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-30 group-hover:opacity-60 transition-opacity duration-500`} />

                            <div className="relative p-6 space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className={`w-16 h-16 rounded-full border-2 border-white/10 shadow-lg ${inf.avatarColor} flex items-center justify-center text-xl font-bold text-white/80`}>
                                        {inf.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-display font-bold text-white text-lg group-hover:text-gold transition-colors">{inf.name}</h3>
                                        <div className="text-xs font-mono text-neon-rose uppercase tracking-wider">{inf.niche}</div>
                                    </div>
                                </div>

                                <div className="flex justify-between text-sm py-4 border-t border-white/5 border-b">
                                    <div className="text-center">
                                        <div className="font-bold text-white">{(inf.reach / 1000000).toFixed(1)}M</div>
                                        <div className="text-slate-500 text-xs">Reach</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-white">{inf.engagementRate}%</div>
                                        <div className="text-slate-500 text-xs">Eng. Rate</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-gold">${inf.startRate}</div>
                                        <div className="text-slate-500 text-xs">Start Rate</div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    {inf.platforms.map(p => (
                                        <span key={p} className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">{p}</span>
                                    ))}
                                </div>

                                <button className="w-full py-2 bg-white/5 hover:bg-gold hover:text-midnight-900 border border-white/10 text-white rounded-lg transition-all font-medium text-sm mt-2">
                                    View Profile
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
