"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    User, Building2, Globe, Shield, CreditCard, Bell, Palette, Link2,
    Check, Plus, Trash2, ChevronRight, Crown, Mail, Lock,
    Instagram, Youtube, Twitter, Linkedin, Camera
} from "lucide-react";
import { clsx } from "clsx";

type SettingsTab = "profile" | "workspace" | "accounts" | "team" | "billing" | "notifications";

const TABS = [
    { id: "profile" as SettingsTab, label: "Profile", icon: User },
    { id: "workspace" as SettingsTab, label: "Workspace", icon: Building2 },
    { id: "accounts" as SettingsTab, label: "Connected Accounts", icon: Link2 },
    { id: "team" as SettingsTab, label: "Team Members", icon: Shield },
    { id: "billing" as SettingsTab, label: "Billing", icon: CreditCard },
    { id: "notifications" as SettingsTab, label: "Notifications", icon: Bell },
];

const CONNECTED_ACCOUNTS = [
    { id: "ig-1", platform: "Instagram", handle: "@mitchell.studios", icon: Instagram, color: "from-pink-500 to-purple-500", connected: true, followers: "12.4K" },
    { id: "tt-1", platform: "TikTok", handle: "@mitchellstudios", icon: Globe, color: "from-cyan-400 to-teal-500", connected: true, followers: "45.2K" },
    { id: "yt-1", platform: "YouTube", handle: "Mitchell Studios", icon: Youtube, color: "from-red-500 to-red-600", connected: true, followers: "8.1K" },
    { id: "tw-1", platform: "X / Twitter", handle: "@mitchellstd", icon: Twitter, color: "from-sky-400 to-blue-500", connected: false, followers: "" },
    { id: "li-1", platform: "LinkedIn", handle: "", icon: Linkedin, color: "from-blue-600 to-blue-700", connected: false, followers: "" },
];

const TEAM_MEMBERS = [
    { name: "Sarah Mitchell", email: "sarah@sharemotion.io", role: "Owner", color: "bg-gold", status: "active" },
    { name: "Alex Johnson", email: "alex@sharemotion.io", role: "Admin", color: "bg-purple-500", status: "active" },
    { name: "Emily Chen", email: "emily@sharemotion.io", role: "Editor", color: "bg-cyan-500", status: "active" },
    { name: "James Miller", email: "james@sharemotion.io", role: "Viewer", color: "bg-green-500", status: "pending" },
];

const PLANS = [
    { name: "Free", price: "$0", features: ["3 social accounts", "50 posts/month", "Basic analytics"], current: false },
    { name: "Pro", price: "$29", features: ["10 social accounts", "Unlimited posts", "Advanced analytics", "AI generation", "Team collaboration"], current: true },
    { name: "Enterprise", price: "$99", features: ["Unlimited accounts", "Unlimited everything", "Custom AI models", "Priority support", "White-label"], current: false },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

    return (
        <div className="flex gap-6 h-[calc(100vh-8rem)]">
            {/* Sidebar */}
            <div className="w-56 space-y-1 flex-shrink-0">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={clsx(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left",
                            activeTab === tab.id ? "bg-white/10 text-white border border-white/10" : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <tab.icon className={clsx("w-4 h-4", activeTab === tab.id ? "text-gold" : "")} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 glass-panel rounded-2xl border border-white/10 p-6 overflow-y-auto">
                {/* PROFILE */}
                {activeTab === "profile" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-lg">
                        <div>
                            <h3 className="text-lg font-display font-semibold text-white">Profile Settings</h3>
                            <p className="text-sm text-slate-400 mt-1">Manage your personal information</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold to-orange-500 flex items-center justify-center text-2xl font-bold text-midnight-900">S</div>
                                <div className="absolute inset-0 rounded-2xl bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <Camera className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-white">Sarah Mitchell</div>
                                <div className="text-xs text-slate-500">Owner • Mitchell Studios</div>
                                <button className="text-xs text-gold mt-1 hover:text-yellow-400 transition-colors">Change avatar</button>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-300">Full Name</label>
                                <input defaultValue="Sarah Mitchell" className="w-full px-4 py-2.5 bg-midnight-900/50 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-gold/40 transition-all" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-300 flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> Email</label>
                                <input defaultValue="sarah@sharemotion.io" className="w-full px-4 py-2.5 bg-midnight-900/50 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-gold/40 transition-all" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-300 flex items-center gap-2"><Lock className="w-3.5 h-3.5" /> Password</label>
                                <input type="password" defaultValue="••••••••" className="w-full px-4 py-2.5 bg-midnight-900/50 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-gold/40 transition-all" />
                            </div>
                        </div>
                        <button className="px-5 py-2.5 bg-gold text-midnight-900 font-bold rounded-xl text-sm hover:bg-yellow-400 transition-all shadow-lg shadow-gold/20">Save Changes</button>
                    </motion.div>
                )}

                {/* WORKSPACE */}
                {activeTab === "workspace" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-lg">
                        <div>
                            <h3 className="text-lg font-display font-semibold text-white">Workspace Settings</h3>
                            <p className="text-sm text-slate-400 mt-1">Configure your workspace details</p>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-300">Workspace Name</label>
                                <input defaultValue="Mitchell Studios" className="w-full px-4 py-2.5 bg-midnight-900/50 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-gold/40 transition-all" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-300">Industry</label>
                                <select className="w-full px-4 py-2.5 bg-midnight-900/50 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-gold/40 transition-all">
                                    <option>Fashion & Beauty</option>
                                    <option>Technology</option>
                                    <option>Health & Fitness</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-300 flex items-center gap-2"><Palette className="w-3.5 h-3.5" /> Brand Color</label>
                                <div className="flex gap-3">
                                    {["#efc07b", "#f43f5e", "#2dd4bf", "#818cf8", "#fb923c"].map((c) => (
                                        <button key={c} className="w-10 h-10 rounded-xl border-2 border-white/10 hover:border-white/40 transition-colors shadow-md" style={{ backgroundColor: c }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button className="px-5 py-2.5 bg-gold text-midnight-900 font-bold rounded-xl text-sm hover:bg-yellow-400 transition-all shadow-lg shadow-gold/20">Save Changes</button>
                    </motion.div>
                )}

                {/* CONNECTED ACCOUNTS */}
                {activeTab === "accounts" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div>
                            <h3 className="text-lg font-display font-semibold text-white">Connected Accounts</h3>
                            <p className="text-sm text-slate-400 mt-1">Manage your social media connections</p>
                        </div>
                        <div className="space-y-3">
                            {CONNECTED_ACCOUNTS.map((acc) => (
                                <div key={acc.id} className={clsx("flex items-center gap-4 p-4 rounded-xl border transition-all", acc.connected ? "bg-white/5 border-white/10" : "bg-midnight-900/30 border-dashed border-white/10")}>
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${acc.color} flex items-center justify-center shadow-lg`}>
                                        <acc.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-white">{acc.platform}</div>
                                        {acc.connected ? (
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-xs text-slate-400">{acc.handle}</span>
                                                <span className="text-[10px] text-slate-500">•</span>
                                                <span className="text-[10px] text-gold">{acc.followers} followers</span>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-slate-500">Not connected</span>
                                        )}
                                    </div>
                                    {acc.connected ? (
                                        <div className="flex gap-2">
                                            <span className="flex items-center gap-1 px-2.5 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-lg"><Check className="w-3 h-3" /> Connected</span>
                                            <button className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg hover:bg-red-500/20 transition-colors">Disconnect</button>
                                        </div>
                                    ) : (
                                        <button className="flex items-center gap-1.5 px-4 py-2 bg-white/10 border border-white/10 text-white text-xs font-medium rounded-lg hover:bg-white/15 transition-colors">
                                            <Plus className="w-3 h-3" /> Connect
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* TEAM */}
                {activeTab === "team" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-display font-semibold text-white">Team Members</h3>
                                <p className="text-sm text-slate-400 mt-1">{TEAM_MEMBERS.length} members in this workspace</p>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-gold text-midnight-900 font-bold rounded-xl text-xs hover:bg-yellow-400 transition-all shadow-lg shadow-gold/20">
                                <Plus className="w-3.5 h-3.5" /> Invite Member
                            </button>
                        </div>
                        <div className="space-y-2">
                            {TEAM_MEMBERS.map((m) => (
                                <div key={m.email} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-all">
                                    <div className={`w-10 h-10 rounded-full ${m.color} flex items-center justify-center text-sm font-bold text-white`}>{m.name.charAt(0)}</div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-white">{m.name}</span>
                                            {m.role === "Owner" && <Crown className="w-3.5 h-3.5 text-gold" />}
                                            {m.status === "pending" && <span className="text-[10px] px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded">Pending</span>}
                                        </div>
                                        <span className="text-xs text-slate-500">{m.email}</span>
                                    </div>
                                    <select className="px-3 py-1.5 bg-midnight-900/50 border border-white/10 rounded-lg text-xs text-slate-300 focus:outline-none" defaultValue={m.role}>
                                        <option>Owner</option>
                                        <option>Admin</option>
                                        <option>Editor</option>
                                        <option>Viewer</option>
                                    </select>
                                    {m.role !== "Owner" && (
                                        <button className="p-2 text-slate-500 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* BILLING */}
                {activeTab === "billing" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div>
                            <h3 className="text-lg font-display font-semibold text-white">Billing & Plans</h3>
                            <p className="text-sm text-slate-400 mt-1">Manage your subscription</p>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {PLANS.map((plan) => (
                                <div key={plan.name} className={clsx(
                                    "p-5 rounded-2xl border transition-all relative",
                                    plan.current ? "bg-gold/5 border-gold/30 shadow-lg shadow-gold/10" : "bg-white/5 border-white/10 hover:border-white/20"
                                )}>
                                    {plan.current && <span className="absolute -top-2.5 right-3 px-2 py-0.5 bg-gold text-midnight-900 text-[10px] font-bold rounded-full">Current</span>}
                                    <h4 className="text-lg font-display font-bold text-white">{plan.name}</h4>
                                    <div className="mt-1">
                                        <span className="text-2xl font-bold text-gold">{plan.price}</span>
                                        <span className="text-xs text-slate-500">/month</span>
                                    </div>
                                    <ul className="mt-4 space-y-2">
                                        {plan.features.map(f => (
                                            <li key={f} className="flex items-center gap-2 text-xs text-slate-300">
                                                <Check className="w-3 h-3 text-green-400 flex-shrink-0" /> {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className={clsx(
                                        "w-full mt-4 py-2 rounded-xl text-sm font-medium transition-all",
                                        plan.current ? "bg-white/10 text-white cursor-default" : "bg-gold/10 text-gold hover:bg-gold/20 border border-gold/20"
                                    )}>
                                        {plan.current ? "Active" : "Upgrade"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* NOTIFICATIONS */}
                {activeTab === "notifications" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-lg">
                        <div>
                            <h3 className="text-lg font-display font-semibold text-white">Notification Preferences</h3>
                            <p className="text-sm text-slate-400 mt-1">Control how you receive updates</p>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: "Post approvals", desc: "When a post is approved or rejected", enabled: true },
                                { label: "Scheduled posts", desc: "When a scheduled post is published", enabled: true },
                                { label: "Comments & mentions", desc: "When someone comments or mentions you", enabled: true },
                                { label: "Publishing failures", desc: "When a post fails to publish", enabled: true },
                                { label: "Weekly analytics digest", desc: "Weekly summary of your performance", enabled: false },
                                { label: "New influencer matches", desc: "When potential collaborators match your criteria", enabled: false },
                            ].map((n) => (
                                <div key={n.label} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                                    <div>
                                        <div className="text-sm font-medium text-white">{n.label}</div>
                                        <div className="text-xs text-slate-500 mt-0.5">{n.desc}</div>
                                    </div>
                                    <button className={clsx("w-11 h-6 rounded-full transition-all relative", n.enabled ? "bg-gold" : "bg-white/10")}>
                                        <div className={clsx("w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-all", n.enabled ? "right-0.5" : "left-0.5")} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
