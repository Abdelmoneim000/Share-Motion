"use client";

import { useAnalytics } from '@/hooks/useAnalytics';
import { EngagementChart } from '@/components/dashboard/EngagementChart';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { motion } from 'framer-motion';
import {
    TrendingUp, Calendar, Eye, Heart, MessageCircle, Share2,
    Instagram, Youtube, ArrowUpRight, Globe, ChevronRight, Zap,
    Clock
} from 'lucide-react';
import { clsx } from "clsx";
import { useState } from 'react';

const RECENT_POSTS = [
    { title: "Summer collection reveal ✨", platform: "Instagram", platformIcon: Instagram, time: "2h ago", reach: "12.4K", engagement: "8.2%", status: "published", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=80&h=80&fit=crop" },
    { title: "Behind the scenes team vlog", platform: "YouTube", platformIcon: Youtube, time: "5h ago", reach: "3.2K", engagement: "11.5%", status: "published", img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=80&h=80&fit=crop" },
    { title: "5 productivity tips for creators", platform: "TikTok", platformIcon: Globe, time: "1d ago", reach: "45.1K", engagement: "14.3%", status: "published", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=80&h=80&fit=crop" },
    { title: "New feature announcement", platform: "Twitter", platformIcon: Globe, time: "2d ago", reach: "8.7K", engagement: "5.1%", status: "published", img: "" },
];

const UPCOMING_POSTS = [
    { title: "Monday motivation post", time: "Tomorrow, 9:00 AM", platform: "Instagram", color: "from-pink-500 to-purple-500" },
    { title: "Product demo video", time: "Feb 12, 2:00 PM", platform: "YouTube", color: "from-red-500 to-red-600" },
    { title: "Customer spotlight thread", time: "Feb 13, 11:00 AM", platform: "Twitter", color: "from-sky-400 to-blue-500" },
];

const PLATFORM_STATS = [
    { name: "Instagram", icon: Instagram, followers: "12.4K", growth: "+340", color: "from-pink-500 to-purple-500" },
    { name: "TikTok", icon: Globe, followers: "45.2K", growth: "+1.2K", color: "from-cyan-400 to-teal-500" },
    { name: "YouTube", icon: Youtube, followers: "8.1K", growth: "+89", color: "from-red-500 to-red-600" },
];

const DATE_RANGES = ["7 Days", "30 Days", "90 Days", "This Year"];

export default function DashboardPage() {
    const { dailyData, stats, loading } = useAnalytics();
    const [dateRange, setDateRange] = useState("30 Days");

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-display font-bold text-white">Dashboard</h2>
                    <p className="text-sm text-slate-400 mt-0.5">Welcome back, Sarah. Here&apos;s your performance overview.</p>
                </div>
                <div className="flex gap-2">
                    <div className="flex bg-white/5 rounded-xl border border-white/10 p-0.5">
                        {DATE_RANGES.map((r) => (
                            <button key={r} onClick={() => setDateRange(r)} className={clsx("px-3 py-1.5 rounded-lg text-xs font-medium transition-all", dateRange === r ? "bg-white/10 text-white" : "text-slate-500 hover:text-white")}>
                                {r}
                            </button>
                        ))}
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-gold to-orange-500 text-midnight-900 font-bold rounded-xl text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-gold/20">
                        New Post
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            {loading || !stats ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
                    {[1, 2, 3, 4].map(i => <div key={i} className="glass-panel h-28 bg-white/5 rounded-2xl" />)}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <StatsCard label="Total Reach" value={stats.totalReach.toLocaleString()} trend={12.5} />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <StatsCard label="Engagement" value={stats.totalEngagement.toLocaleString()} trend={8.2} />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <StatsCard label="Active Followers" value={stats.activeFollowers.toLocaleString()} trend={-2.1} />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <StatsCard label="Growth Rate" value={`${stats.growthRate}%`} trend={1.5} />
                    </motion.div>
                </div>
            )}

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Engagement Chart */}
                <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/10 h-96 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-display font-semibold text-white">Engagement Growth</h3>
                        <div className="flex gap-3 text-xs">
                            <span className="flex items-center gap-1.5 text-slate-400"><div className="w-2 h-2 rounded-full bg-neon-rose" /> Views</span>
                            <span className="flex items-center gap-1.5 text-slate-400"><div className="w-2 h-2 rounded-full bg-gold" /> Engagement</span>
                        </div>
                    </div>
                    <div className="flex-1 min-h-0">
                        {loading ? <div className="w-full h-full bg-white/5 animate-pulse rounded-lg" /> : <EngagementChart data={dailyData} />}
                    </div>
                </div>

                {/* Platform Breakdown */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10 h-96 flex flex-col">
                    <h3 className="text-lg font-display font-semibold text-white mb-4">Platform Growth</h3>
                    <div className="space-y-4 flex-1">
                        {PLATFORM_STATS.map((p, i) => (
                            <motion.div
                                key={p.name}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className="p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all cursor-pointer group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center`}>
                                        <p.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-white">{p.name}</div>
                                        <div className="text-xs text-slate-500">{p.followers} followers</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-green-400 flex items-center gap-1">{p.growth} <ArrowUpRight className="w-3 h-3" /></div>
                                        <div className="text-[10px] text-slate-500">this month</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <button className="text-xs text-gold hover:text-yellow-400 flex items-center gap-1 mt-3 transition-colors">
                        View all platforms <ChevronRight className="w-3 h-3" />
                    </button>
                </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Posts Performance */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-display font-semibold text-white">Recent Posts</h3>
                        <button className="text-xs text-gold hover:text-yellow-400 transition-colors">View all</button>
                    </div>
                    <div className="space-y-3">
                        {RECENT_POSTS.map((post, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + i * 0.08 }}
                                className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer group border border-white/5"
                            >
                                {post.img ? (
                                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                        <img src={post.img} alt="" className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center flex-shrink-0">
                                        <post.platformIcon className="w-5 h-5 text-slate-500" />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-white truncate">{post.title}</div>
                                    <div className="flex items-center gap-3 mt-0.5">
                                        <span className="text-[10px] text-slate-500">{post.platform}</span>
                                        <span className="text-[10px] text-slate-600">•</span>
                                        <span className="text-[10px] text-slate-500">{post.time}</span>
                                    </div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {post.reach}</span>
                                        <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {post.engagement}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Scheduled / Quick Actions */}
                <div className="space-y-6">
                    {/* Upcoming */}
                    <div className="glass-panel p-6 rounded-2xl border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-display font-semibold text-white flex items-center gap-2"><Calendar className="w-4 h-4 text-gold" /> Upcoming Posts</h3>
                            <span className="text-[10px] text-slate-500">{UPCOMING_POSTS.length} scheduled</span>
                        </div>
                        <div className="space-y-2.5">
                            {UPCOMING_POSTS.map((post, i) => (
                                <div key={i} className="flex items-center gap-3 p-2.5 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-all cursor-pointer">
                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${post.color} flex items-center justify-center`}>
                                        <Clock className="w-3.5 h-3.5 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs font-medium text-white truncate">{post.title}</div>
                                        <div className="text-[10px] text-slate-500">{post.time}</div>
                                    </div>
                                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="glass-panel p-5 rounded-2xl border border-white/10">
                        <h3 className="text-sm font-display font-semibold text-white mb-3 flex items-center gap-2"><Zap className="w-4 h-4 text-gold" /> Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { label: "Create Post", icon: MessageCircle, color: "text-indigo-400" },
                                { label: "Generate AI Image", icon: Zap, color: "text-gold" },
                                { label: "Schedule Content", icon: Calendar, color: "text-sky-400" },
                                { label: "View Analytics", icon: TrendingUp, color: "text-green-400" },
                            ].map((action) => (
                                <button key={action.label} className="flex items-center gap-2 p-3 bg-white/5 rounded-xl hover:bg-white/10 border border-white/5 transition-all text-left">
                                    <action.icon className={`w-4 h-4 ${action.color}`} />
                                    <span className="text-xs text-slate-300">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
