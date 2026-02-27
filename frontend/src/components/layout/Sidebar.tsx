"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    LayoutDashboard, FileText, PlusCircle, Calendar, Image as ImageIcon,
    Users, MessageSquare, Settings, LogOut, ChevronDown, Check, Sparkles,
    Dna,
} from "lucide-react";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const WORKSPACES = [
    { id: 'ws-1', name: 'Mitchell Studios', gradient: 'from-indigo-500 to-purple-600', plan: 'Pro' },
    { id: 'ws-2', name: 'Luxe Fashion Co', gradient: 'from-rose-500 to-pink-600', plan: 'Enterprise' },
    { id: 'ws-3', name: 'TechVibe Agency', gradient: 'from-cyan-500 to-blue-600', plan: 'Free' },
];

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Content", href: "/content", icon: FileText },
    { name: "Create", href: "/create", icon: PlusCircle, accent: true },
    { name: "Calendar", href: "/calendar", icon: Calendar },
    { name: "Media", href: "/media", icon: ImageIcon },
    { name: "Business DNA", href: "/business-dna", icon: Dna },
    { name: "Influencers", href: "/influencers", icon: Users },
    { name: "Chat", href: "/chat", icon: MessageSquare, badge: 3 },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const [activeWorkspace, setActiveWorkspace] = useState(WORKSPACES[0]);
    const [showWsPicker, setShowWsPicker] = useState(false);

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-midnight-900/95 border-r border-white/5 backdrop-blur-xl z-50 flex flex-col">
            {/* Logo */}
            <div className="p-5 pb-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold to-orange-500 flex items-center justify-center shadow-lg shadow-gold/20">
                        <Sparkles className="w-5 h-5 text-midnight-900" />
                    </div>
                    <h1 className="text-lg font-display font-bold text-white tracking-tight">Share Motion</h1>
                </div>
            </div>

            {/* Workspace Switcher */}
            <div className="px-4 mb-4">
                <button
                    onClick={() => setShowWsPicker(!showWsPicker)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group"
                >
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${activeWorkspace.gradient} flex items-center justify-center text-xs font-bold text-white`}>
                        {activeWorkspace.name.charAt(0)}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                        <div className="text-sm font-medium text-white truncate">{activeWorkspace.name}</div>
                        <div className="text-[10px] text-slate-500">{activeWorkspace.plan} Plan</div>
                    </div>
                    <ChevronDown className={clsx("w-4 h-4 text-slate-400 transition-transform", showWsPicker && "rotate-180")} />
                </button>

                <AnimatePresence>
                    {showWsPicker && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, y: -8 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -8 }}
                            className="mt-1 bg-midnight-800 border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                        >
                            {WORKSPACES.map((ws) => (
                                <button
                                    key={ws.id}
                                    onClick={() => { setActiveWorkspace(ws); setShowWsPicker(false); }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 transition-colors"
                                >
                                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${ws.gradient} flex items-center justify-center text-xs font-bold text-white`}>
                                        {ws.name.charAt(0)}
                                    </div>
                                    <span className="text-sm text-slate-300 flex-1 text-left truncate">{ws.name}</span>
                                    {ws.id === activeWorkspace.id && <Check className="w-4 h-4 text-gold" />}
                                </button>
                            ))}
                            <div className="border-t border-white/5 p-2">
                                <button className="w-full text-xs text-center text-gold hover:text-yellow-400 py-1.5 transition-colors">+ Create Workspace</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
                {navigation.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                                item.accent && !isActive && "border border-dashed border-gold/20 hover:border-gold/40",
                                isActive
                                    ? "bg-white/10 text-white shadow-lg shadow-white/5 border border-white/10"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon
                                className={clsx(
                                    "w-5 h-5 transition-colors",
                                    isActive ? "text-gold" : item.accent ? "text-gold/60 group-hover:text-gold" : "text-slate-500 group-hover:text-gold"
                                )}
                            />
                            <span className="font-medium text-sm flex-1">{item.name}</span>
                            {item.badge && (
                                <span className="min-w-[20px] h-5 flex items-center justify-center rounded-full bg-neon-rose text-[10px] font-bold text-white px-1.5">
                                    {item.badge}
                                </span>
                            )}
                            {isActive && (
                                <motion.div
                                    layoutId="sidebar-active"
                                    className="absolute left-0 w-1 h-8 bg-gold rounded-r-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User section */}
            <div className="p-3 border-t border-white/5">
                <div className="flex items-center gap-3 px-3 py-2.5 mb-1">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-orange-500 flex items-center justify-center text-xs font-bold text-midnight-900 ring-2 ring-gold/30">
                        S
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white truncate">Sarah Mitchell</div>
                        <div className="text-[10px] text-slate-500">Owner</div>
                    </div>
                </div>
                <button className="flex items-center gap-3 w-full px-3 py-2 text-slate-500 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span className="text-xs font-medium">Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
