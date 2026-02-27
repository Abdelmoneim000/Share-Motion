"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, Filter, Grid3X3, List, Plus, Archive, Trash2,
    Clock, CheckCircle, AlertCircle, FileText, Eye, Edit3,
    MoreVertical, Calendar, X, Send, MessageSquare, ChevronDown,
    Instagram, Youtube, Twitter, Linkedin, Globe, LayoutGrid
} from "lucide-react";
import { clsx } from "clsx";
import { Post, PostStatus, Platform } from "@/types/post";
import { usePosts } from "@/hooks/usePosts";
import { format } from "date-fns";

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: typeof Clock }> = {
    draft: { label: "Draft", color: "bg-slate-500/20 text-slate-400 border-slate-500/20", icon: FileText },
    scheduled: { label: "Scheduled", color: "bg-sky-500/20 text-sky-400 border-sky-500/20", icon: Clock },
    published: { label: "Published", color: "bg-green-500/20 text-green-400 border-green-500/20", icon: CheckCircle },
    failed: { label: "Failed", color: "bg-red-500/20 text-red-400 border-red-500/20", icon: AlertCircle },
    in_review: { label: "In Review", color: "bg-amber-500/20 text-amber-400 border-amber-500/20", icon: Eye },
    archived: { label: "Archived", color: "bg-slate-600/20 text-slate-500 border-slate-600/20", icon: Archive },
};

const PLATFORM_ICONS: Record<string, typeof Instagram> = {
    instagram: Instagram,
    youtube: Youtube,
    twitter: Twitter,
    linkedin: Linkedin,
    tiktok: Globe,
    facebook: Globe,
};

const MOCK_IMAGES = [
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop",
    "",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=200&fit=crop",
    "",
];

export default function ContentPage() {
    const { posts, loading } = usePosts();
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [platformFilter, setPlatformFilter] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [showDrawer, setShowDrawer] = useState(false);

    const filteredPosts = posts.filter((p) => {
        if (statusFilter !== "all" && p.status !== statusFilter) return false;
        if (platformFilter !== "all" && !p.platforms.includes(platformFilter as Platform)) return false;
        if (searchQuery && !p.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const openPost = (post: Post) => {
        setSelectedPost(post);
        setShowDrawer(true);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-display font-bold text-white">Content Library</h2>
                    <p className="text-sm text-slate-400 mt-1">{filteredPosts.length} posts • Manage all your content in one place</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gold to-orange-500 text-midnight-900 font-bold rounded-xl shadow-lg shadow-gold/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm">
                    <Plus className="w-4 h-4" /> New Post
                </button>
            </div>

            {/* Filters Bar */}
            <div className="glass-panel rounded-xl p-4 border border-white/10">
                <div className="flex flex-wrap items-center gap-3">
                    {/* Search */}
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search posts..."
                            className="w-full pl-10 pr-4 py-2 bg-midnight-900/50 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold/40 transition-all"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="appearance-none pl-3 pr-8 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white cursor-pointer focus:outline-none focus:border-gold/40 transition-all"
                        >
                            <option value="all">All Status</option>
                            <option value="draft">Drafts</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="published">Published</option>
                            <option value="in_review">In Review</option>
                            <option value="failed">Failed</option>
                        </select>
                        <ChevronDown className="absolute right-2.5 top-2.5 w-4 h-4 text-slate-500 pointer-events-none" />
                    </div>

                    {/* Platform Pills */}
                    <div className="flex gap-1.5">
                        {["all", "instagram", "tiktok", "youtube", "twitter", "linkedin"].map((p) => {
                            const Icon = p === "all" ? LayoutGrid : PLATFORM_ICONS[p] || Globe;
                            return (
                                <button
                                    key={p}
                                    onClick={() => setPlatformFilter(p)}
                                    className={clsx(
                                        "p-2 rounded-lg transition-all",
                                        platformFilter === p ? "bg-gold/15 border border-gold/30 text-gold" : "bg-white/5 border border-white/10 text-slate-500 hover:text-white"
                                    )}
                                >
                                    <Icon className="w-4 h-4" />
                                </button>
                            );
                        })}
                    </div>

                    {/* View Toggle */}
                    <div className="flex bg-white/5 rounded-lg border border-white/10 p-0.5">
                        <button onClick={() => setViewMode("grid")} className={clsx("p-1.5 rounded-md transition-all", viewMode === "grid" ? "bg-white/10 text-white" : "text-slate-500")}>
                            <Grid3X3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => setViewMode("list")} className={clsx("p-1.5 rounded-md transition-all", viewMode === "list" ? "bg-white/10 text-white" : "text-slate-500")}>
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Active Filters */}
                {(statusFilter !== "all" || platformFilter !== "all" || searchQuery) && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Active:</span>
                        {statusFilter !== "all" && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/5 rounded-md text-xs text-slate-300">
                                {statusFilter} <button onClick={() => setStatusFilter("all")}><X className="w-3 h-3 text-slate-500 hover:text-white" /></button>
                            </span>
                        )}
                        {platformFilter !== "all" && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/5 rounded-md text-xs text-slate-300">
                                {platformFilter} <button onClick={() => setPlatformFilter("all")}><X className="w-3 h-3 text-slate-500 hover:text-white" /></button>
                            </span>
                        )}
                        <button onClick={() => { setStatusFilter("all"); setPlatformFilter("all"); setSearchQuery(""); }} className="text-[10px] text-gold hover:text-yellow-400 ml-auto">Clear all</button>
                    </div>
                )}
            </div>

            {/* Content Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-72 rounded-2xl bg-white/5 animate-pulse" />)}
                </div>
            ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredPosts.map((post, i) => {
                        const status = STATUS_CONFIG[post.status] || STATUS_CONFIG.draft;
                        const StatusIcon = status.icon;
                        const img = MOCK_IMAGES[i % MOCK_IMAGES.length];
                        return (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => openPost(post)}
                                className="glass-panel rounded-2xl border border-white/10 overflow-hidden cursor-pointer group hover:border-gold/20 hover:shadow-xl hover:shadow-gold/5 transition-all"
                            >
                                {/* Media Preview */}
                                {img ? (
                                    <div className="relative h-40 overflow-hidden">
                                        <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/80 to-transparent" />
                                        <div className="absolute top-3 right-3">
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium border backdrop-blur-md ${status.color}`}>
                                                <StatusIcon className="w-3 h-3" /> {status.label}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-3 left-3 flex gap-1.5">
                                            {post.platforms.map(p => {
                                                const PIcon = PLATFORM_ICONS[p] || Globe;
                                                return <div key={p} className="w-6 h-6 rounded-md bg-black/40 backdrop-blur-md flex items-center justify-center"><PIcon className="w-3 h-3 text-white" /></div>;
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-20 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-between px-4">
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium border ${status.color}`}>
                                            <StatusIcon className="w-3 h-3" /> {status.label}
                                        </span>
                                        <div className="flex gap-1.5">
                                            {post.platforms.map(p => {
                                                const PIcon = PLATFORM_ICONS[p] || Globe;
                                                return <PIcon key={p} className="w-3.5 h-3.5 text-slate-500" />;
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-4 space-y-3">
                                    <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">{post.content}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] text-slate-600">{format(new Date(post.createdAt), "MMM d, yyyy")}</span>
                                        <div className="flex items-center gap-3 text-[10px] text-slate-500">
                                            {post.metrics && (
                                                <>
                                                    <span>❤️ {post.metrics.likes}</span>
                                                    <span>💬 {post.metrics.comments}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            ) : (
                /* List View */
                <div className="space-y-2">
                    {filteredPosts.map((post, i) => {
                        const status = STATUS_CONFIG[post.status] || STATUS_CONFIG.draft;
                        const StatusIcon = status.icon;
                        return (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.03 }}
                                onClick={() => openPost(post)}
                                className="glass-panel flex items-center gap-4 p-4 rounded-xl border border-white/10 cursor-pointer hover:border-gold/20 transition-all group"
                            >
                                <div className="w-12 h-12 rounded-lg bg-white/5 overflow-hidden flex-shrink-0">
                                    {MOCK_IMAGES[i % MOCK_IMAGES.length] ? (
                                        <img src={MOCK_IMAGES[i % MOCK_IMAGES.length]} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center"><FileText className="w-5 h-5 text-slate-600" /></div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-white truncate">{post.content}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium border ${status.color}`}>
                                            <StatusIcon className="w-2.5 h-2.5" /> {status.label}
                                        </span>
                                        {post.platforms.map(p => {
                                            const PIcon = PLATFORM_ICONS[p] || Globe;
                                            return <PIcon key={p} className="w-3 h-3 text-slate-500" />;
                                        })}
                                    </div>
                                </div>
                                <span className="text-[10px] text-slate-600 flex-shrink-0">{format(new Date(post.createdAt), "MMM d")}</span>
                                <button className="p-1.5 text-slate-500 opacity-0 group-hover:opacity-100 hover:text-white transition-all">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Post Detail Drawer */}
            <AnimatePresence>
                {showDrawer && selectedPost && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                            onClick={() => setShowDrawer(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed right-0 top-0 h-full w-[500px] bg-midnight-900/95 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col overflow-y-auto"
                        >
                            {/* Drawer Header */}
                            <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-white/5 bg-midnight-900/90 backdrop-blur-md">
                                <h3 className="font-display font-semibold text-white">Post Details</h3>
                                <div className="flex gap-2">
                                    <button className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-lg transition-colors"><Edit3 className="w-4 h-4" /></button>
                                    <button onClick={() => setShowDrawer(false)} className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-lg transition-colors"><X className="w-4 h-4" /></button>
                                </div>
                            </div>

                            <div className="p-5 space-y-6 flex-1">
                                {/* Status & Platforms */}
                                <div className="flex items-center gap-2 flex-wrap">
                                    {(() => {
                                        const s = STATUS_CONFIG[selectedPost.status] || STATUS_CONFIG.draft;
                                        const SIcon = s.icon;
                                        return <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border ${s.color}`}><SIcon className="w-3.5 h-3.5" /> {s.label}</span>;
                                    })()}
                                    {selectedPost.platforms.map(p => {
                                        const PIcon = PLATFORM_ICONS[p] || Globe;
                                        return <span key={p} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded-lg text-xs text-slate-400 border border-white/10"><PIcon className="w-3.5 h-3.5" /> {p}</span>;
                                    })}
                                </div>

                                {/* Media Preview */}
                                <div className="rounded-xl overflow-hidden border border-white/10 bg-midnight-800 aspect-video">
                                    <img src={MOCK_IMAGES[0]} alt="" className="w-full h-full object-cover" />
                                </div>

                                {/* Caption */}
                                <div className="space-y-2">
                                    <h4 className="text-xs text-slate-500 uppercase tracking-wider">Caption</h4>
                                    <p className="text-sm text-slate-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">{selectedPost.content}</p>
                                </div>

                                {/* Hashtags */}
                                <div className="space-y-2">
                                    <h4 className="text-xs text-slate-500 uppercase tracking-wider">Hashtags</h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {["#brand", "#marketing", "#content", "#socialmedia", "#growth"].map(tag => (
                                            <span key={tag} className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs rounded-md">{tag}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div className="space-y-2">
                                    <h4 className="text-xs text-slate-500 uppercase tracking-wider">Status History</h4>
                                    <div className="space-y-3 pl-4 border-l-2 border-white/10">
                                        {[
                                            { status: "Created", time: "Oct 20, 2:30 PM", by: "Sarah Mitchell" },
                                            { status: "Submitted for Review", time: "Oct 21, 10:00 AM", by: "Sarah Mitchell" },
                                            { status: "Approved", time: "Oct 21, 3:15 PM", by: "Alex Manager" },
                                        ].map((entry, i) => (
                                            <div key={i} className="relative">
                                                <div className="absolute -left-[21px] w-2.5 h-2.5 rounded-full bg-gold border-2 border-midnight-900" />
                                                <div className="text-xs">
                                                    <span className="text-white font-medium">{entry.status}</span>
                                                    <div className="text-slate-500">{entry.time} • {entry.by}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Comments */}
                                <div className="space-y-3">
                                    <h4 className="text-xs text-slate-500 uppercase tracking-wider flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" /> Comments (2)</h4>
                                    {[
                                        { name: "Alex Manager", text: "Looks great! Can we adjust the CTA slightly?", time: "2h ago", color: "bg-purple-500" },
                                        { name: "Sarah Mitchell", text: "Updated! Check the latest version.", time: "1h ago", color: "bg-gold" },
                                    ].map((c, i) => (
                                        <div key={i} className="flex gap-3">
                                            <div className={`w-7 h-7 rounded-full ${c.color} flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white`}>{c.name.charAt(0)}</div>
                                            <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/5">
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-xs font-medium text-white">{c.name}</span>
                                                    <span className="text-[10px] text-slate-600">{c.time}</span>
                                                </div>
                                                <p className="text-xs text-slate-400 mt-1">{c.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex gap-2">
                                        <input placeholder="Write a comment..." className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-gold/30" />
                                        <button className="p-2 bg-gold text-midnight-900 rounded-xl"><Send className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            </div>

                            {/* Drawer Footer — Approval Actions */}
                            <div className="sticky bottom-0 p-4 border-t border-white/5 bg-midnight-900/90 backdrop-blur-md flex gap-2">
                                <button className="flex-1 py-2.5 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-sm font-medium hover:bg-green-500/20 transition-all">
                                    ✓ Approve
                                </button>
                                <button className="flex-1 py-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl text-sm font-medium hover:bg-amber-500/20 transition-all">
                                    ↻ Request Changes
                                </button>
                                <button className="py-2.5 px-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-medium hover:bg-red-500/20 transition-all">
                                    ✕
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
