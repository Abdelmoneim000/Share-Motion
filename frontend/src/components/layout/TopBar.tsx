"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Bell, Search, ChevronRight, X, Clock, FileText, CheckCircle, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BREADCRUMB_LABELS: Record<string, string> = {
    dashboard: "Dashboard",
    content: "Content Library",
    create: "Creative Studio",
    calendar: "Scheduling Calendar",
    media: "Media Library",
    influencers: "Influencer Marketplace",
    chat: "Messages",
    settings: "Settings",
    "business-dna": "Business DNA",
};

const MOCK_NOTIFICATIONS = [
    { id: '1', type: 'approval', title: 'Post approved', desc: '"Summer campaign" was approved by Alex', time: '2m ago', icon: CheckCircle, color: 'text-green-400' },
    { id: '2', type: 'scheduled', title: 'Post scheduled', desc: 'Instagram post goes live at 3:00 PM', time: '15m ago', icon: Clock, color: 'text-gold' },
    { id: '3', type: 'mention', title: 'New comment', desc: 'Sarah mentioned you on "Product launch"', time: '1h ago', icon: FileText, color: 'text-sky-400' },
    { id: '4', type: 'alert', title: 'Publishing failed', desc: 'TikTok video exceeded duration limit', time: '3h ago', icon: AlertTriangle, color: 'text-neon-rose' },
];

export function TopBar() {
    const pathname = usePathname();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const pathSegments = pathname.split("/").filter(Boolean);
    const currentPage = pathSegments[0] || "dashboard";

    return (
        <header className="h-16 border-b border-white/5 bg-midnight-900/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40 ml-64">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500">Home</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-white font-medium">{BREADCRUMB_LABELS[currentPage] || currentPage}</span>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">
                {/* Search */}
                <AnimatePresence>
                    {showSearch && (
                        <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 280, opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="overflow-hidden">
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search posts, media, people..."
                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold/40"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                <button
                    onClick={() => setShowSearch(!showSearch)}
                    className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                    {showSearch ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
                </button>

                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors relative"
                    >
                        <Bell className="w-4 h-4" />
                        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-neon-rose rounded-full ring-2 ring-midnight-900 animate-pulse" />
                    </button>

                    <AnimatePresence>
                        {showNotifications && (
                            <>
                                <div className="fixed inset-0 z-30" onClick={() => setShowNotifications(false)} />
                                <motion.div
                                    initial={{ opacity: 0, y: -5, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                                    className="absolute right-0 top-12 w-80 bg-midnight-800/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 z-40 overflow-hidden"
                                >
                                    <div className="flex items-center justify-between p-4 border-b border-white/5">
                                        <h3 className="text-sm font-display font-semibold text-white">Notifications</h3>
                                        <span className="text-[10px] text-gold font-medium bg-gold/10 px-2 py-0.5 rounded-full">4 new</span>
                                    </div>
                                    <div className="max-h-80 overflow-y-auto">
                                        {MOCK_NOTIFICATIONS.map((n) => (
                                            <div key={n.id} className="flex gap-3 p-4 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 last:border-b-0">
                                                <n.icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${n.color}`} />
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-medium text-white">{n.title}</div>
                                                    <div className="text-xs text-slate-400 mt-0.5 truncate">{n.desc}</div>
                                                    <div className="text-[10px] text-slate-600 mt-1">{n.time}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-3 border-t border-white/5">
                                        <button className="w-full text-center text-xs text-gold hover:text-yellow-400 font-medium transition-colors">View all notifications</button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>

                {/* User Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-orange-500 border-2 border-gold/30 cursor-pointer hover:border-gold/60 transition-colors" />
            </div>
        </header>
    );
}
