"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles, Image as ImageIcon, Video, Type, Scissors, Upload,
    Wand2, Loader2, Download, Calendar, ChevronRight, RotateCcw,
    Maximize2, Palette, Layers, Zap, Clock, Star, Copy, Send,
    ImagePlus
} from "lucide-react";
import { clsx } from "clsx";

type Tab = "image" | "video" | "caption" | "clipper" | "upload";

interface GeneratedAsset {
    id: string;
    type: "image" | "video";
    url: string;
    prompt: string;
    timestamp: Date;
}

const STYLE_PRESETS = [
    { id: "photorealistic", label: "Photorealistic", emoji: "📷" },
    { id: "cinematic", label: "Cinematic", emoji: "🎬" },
    { id: "anime", label: "Anime", emoji: "🎨" },
    { id: "3d", label: "3D Render", emoji: "🧊" },
    { id: "watercolor", label: "Watercolor", emoji: "🖌️" },
    { id: "pop-art", label: "Pop Art", emoji: "🎪" },
    { id: "minimal", label: "Minimal", emoji: "⬜" },
    { id: "vintage", label: "Vintage", emoji: "📼" },
];

const ASPECT_RATIOS = [
    { id: "1:1", label: "1:1", desc: "Square", w: "w-10", h: "h-10" },
    { id: "4:5", label: "4:5", desc: "Portrait", w: "w-8", h: "h-10" },
    { id: "9:16", label: "9:16", desc: "Story/Reel", w: "w-6", h: "h-10" },
    { id: "16:9", label: "16:9", desc: "Landscape", w: "w-12", h: "h-7" },
];

const CAPTION_TONES = ["Professional", "Casual", "Witty", "Inspirational", "Bold", "Storytelling"];

const PROMPT_SUGGESTIONS = [
    "A flat-lay of luxury skincare products on marble surface, soft natural light",
    "Aerial drone shot of a tropical beach resort at golden hour",
    "Modern office space with team collaboration, candid and warm",
    "Fitness athlete in motion, dynamic urban background, high contrast",
];

const MOCK_IMAGES = [
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
];

export default function CreatePage() {
    const [activeTab, setActiveTab] = useState<Tab>("image");
    const [prompt, setPrompt] = useState("");
    const [style, setStyle] = useState("photorealistic");
    const [aspectRatio, setAspectRatio] = useState("1:1");
    const [variations, setVariations] = useState(4);
    const [generating, setGenerating] = useState(false);
    const [generatedAssets, setGeneratedAssets] = useState<GeneratedAsset[]>([]);
    const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

    // Caption state
    const [captionTone, setCaptionTone] = useState("Professional");
    const [captionContext, setCaptionContext] = useState("");
    const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([]);
    const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);

    // Video state
    const [videoDuration, setVideoDuration] = useState("15");
    const [videoFormat, setVideoFormat] = useState("portrait");

    const tabs = [
        { id: "image" as Tab, label: "AI Image", icon: Sparkles },
        { id: "video" as Tab, label: "AI Video", icon: Video },
        { id: "caption" as Tab, label: "Captions & Tags", icon: Type },
        { id: "clipper" as Tab, label: "Video Clipper", icon: Scissors },
        { id: "upload" as Tab, label: "Upload", icon: Upload },
    ];

    const handleGenerate = async () => {
        setGenerating(true);
        await new Promise((r) => setTimeout(r, 3000));
        const newAssets: GeneratedAsset[] = Array.from({ length: variations }, (_, i) => ({
            id: `gen-${Date.now()}-${i}`,
            type: activeTab === "video" ? "video" : "image",
            url: MOCK_IMAGES[i % MOCK_IMAGES.length],
            prompt,
            timestamp: new Date(),
        }));
        setGeneratedAssets(newAssets);
        setSelectedAsset(newAssets[0].id);
        setGenerating(false);
    };

    const handleGenerateCaptions = async () => {
        setGenerating(true);
        await new Promise((r) => setTimeout(r, 2000));
        setGeneratedCaptions([
            `✨ ${captionContext || "Elevate your brand"} with a touch of brilliance. Every detail matters when you're building something extraordinary. #${captionTone.toLowerCase()}`,
            `🚀 Ready to take your ${captionContext || "content"} to the next level? We've been working behind the scenes on something incredible—stay tuned.`,
            `💡 The secret to standing out? Authenticity + consistency. Here's how we're making ${captionContext || "every post"} count this season.`,
        ]);
        setGeneratedHashtags([
            "#ContentCreation", "#SocialMedia", "#BrandStrategy", "#DigitalMarketing",
            "#CreativeContent", "#MarketingTips", "#GrowthHacking", "#SocialStrategy",
            "#InfluencerLife", "#ContentIsKing", "#ViralContent", "#Engagement",
        ]);
        setGenerating(false);
    };

    return (
        <div className="flex gap-6 h-[calc(100vh-8rem)]">
            {/* Left Panel — Controls */}
            <div className="w-[420px] flex flex-col glass-panel rounded-2xl border border-white/10 overflow-hidden flex-shrink-0">
                {/* Tabs */}
                <div className="flex border-b border-white/5 bg-midnight-900/40 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setGeneratedAssets([]); }}
                            className={clsx(
                                "flex items-center gap-2 px-4 py-3 text-xs font-medium whitespace-nowrap transition-all border-b-2 flex-1",
                                activeTab === tab.id
                                    ? "text-gold border-gold bg-gold/5"
                                    : "text-slate-500 border-transparent hover:text-white hover:bg-white/5"
                            )}
                        >
                            <tab.icon className="w-3.5 h-3.5" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto p-5 space-y-5">
                    {/* IMAGE TAB */}
                    {activeTab === "image" && (
                        <>
                            {/* Prompt */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-white">
                                    <Wand2 className="w-4 h-4 text-gold" /> Describe your image
                                </label>
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-midnight-900/60 border border-white/10 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 resize-none transition-all"
                                    placeholder="A flat-lay of luxury skincare products on marble..."
                                />
                                <div className="flex flex-wrap gap-1.5">
                                    {PROMPT_SUGGESTIONS.slice(0, 2).map((s, i) => (
                                        <button key={i} onClick={() => setPrompt(s)} className="text-[10px] text-slate-500 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg transition-all hover:text-slate-300 truncate max-w-[200px]">
                                            💡 {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Style */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-white">
                                    <Palette className="w-4 h-4 text-gold" /> Style
                                </label>
                                <div className="grid grid-cols-4 gap-1.5">
                                    {STYLE_PRESETS.map((s) => (
                                        <button
                                            key={s.id}
                                            onClick={() => setStyle(s.id)}
                                            className={clsx(
                                                "p-2 rounded-xl text-center transition-all",
                                                style === s.id
                                                    ? "bg-gold/15 border border-gold/40 text-white ring-1 ring-gold/20"
                                                    : "bg-white/5 border border-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                                            )}
                                        >
                                            <div className="text-lg mb-0.5">{s.emoji}</div>
                                            <div className="text-[10px] font-medium">{s.label}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Aspect Ratio */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-white">
                                    <Maximize2 className="w-4 h-4 text-gold" /> Aspect Ratio
                                </label>
                                <div className="flex gap-2">
                                    {ASPECT_RATIOS.map((ar) => (
                                        <button
                                            key={ar.id}
                                            onClick={() => setAspectRatio(ar.id)}
                                            className={clsx(
                                                "flex-1 flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all",
                                                aspectRatio === ar.id
                                                    ? "bg-gold/15 border border-gold/40 text-white"
                                                    : "bg-white/5 border border-white/5 text-slate-400 hover:bg-white/10"
                                            )}
                                        >
                                            <div className={clsx("border-2 rounded-sm", aspectRatio === ar.id ? "border-gold" : "border-slate-600", ar.w, ar.h)} />
                                            <div className="text-[10px] font-medium">{ar.label}</div>
                                            <div className="text-[9px] text-slate-500">{ar.desc}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Variations */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-white">
                                    <Layers className="w-4 h-4 text-gold" /> Variations: {variations}
                                </label>
                                <input
                                    type="range"
                                    min={1}
                                    max={4}
                                    value={variations}
                                    onChange={(e) => setVariations(Number(e.target.value))}
                                    className="w-full accent-gold"
                                />
                            </div>
                        </>
                    )}

                    {/* VIDEO TAB */}
                    {activeTab === "video" && (
                        <>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-white">
                                    <Wand2 className="w-4 h-4 text-gold" /> Describe your video
                                </label>
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-midnight-900/60 border border-white/10 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-gold/50 resize-none transition-all"
                                    placeholder="A cinematic brand intro with logo reveal..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-white">
                                    <Clock className="w-4 h-4 text-gold" /> Duration
                                </label>
                                <div className="grid grid-cols-4 gap-2">
                                    {["5", "15", "30", "60"].map((d) => (
                                        <button key={d} onClick={() => setVideoDuration(d)} className={clsx(
                                            "py-2.5 rounded-xl text-sm font-medium transition-all",
                                            videoDuration === d ? "bg-gold/15 border border-gold/40 text-gold" : "bg-white/5 border border-white/5 text-slate-400 hover:bg-white/10"
                                        )}>
                                            {d}s
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-white">
                                    <Maximize2 className="w-4 h-4 text-gold" /> Format
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[{ id: "portrait", label: "9:16 Reel" }, { id: "square", label: "1:1 Square" }, { id: "landscape", label: "16:9 Wide" }].map((f) => (
                                        <button key={f.id} onClick={() => setVideoFormat(f.id)} className={clsx(
                                            "py-2.5 rounded-xl text-xs font-medium transition-all",
                                            videoFormat === f.id ? "bg-gold/15 border border-gold/40 text-gold" : "bg-white/5 border border-white/5 text-slate-400 hover:bg-white/10"
                                        )}>
                                            {f.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-1.5">
                                {STYLE_PRESETS.slice(0, 4).map((s) => (
                                    <button key={s.id} onClick={() => setStyle(s.id)} className={clsx(
                                        "p-2 rounded-xl text-center transition-all",
                                        style === s.id ? "bg-gold/15 border border-gold/40 text-white" : "bg-white/5 border border-white/5 text-slate-400 hover:bg-white/10"
                                    )}>
                                        <div className="text-lg mb-0.5">{s.emoji}</div>
                                        <div className="text-[10px] font-medium">{s.label}</div>
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                    {/* CAPTION TAB */}
                    {activeTab === "caption" && (
                        <>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-white">
                                    <Type className="w-4 h-4 text-gold" /> What&apos;s this post about?
                                </label>
                                <textarea
                                    value={captionContext}
                                    onChange={(e) => setCaptionContext(e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-3 bg-midnight-900/60 border border-white/10 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-gold/50 resize-none transition-all"
                                    placeholder="New product launch, summer sale, behind the scenes..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Tone of voice</label>
                                <div className="flex flex-wrap gap-2">
                                    {CAPTION_TONES.map((t) => (
                                        <button key={t} onClick={() => setCaptionTone(t)} className={clsx(
                                            "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                                            captionTone === t ? "bg-gold text-midnight-900" : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
                                        )}>
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Platform</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {["Instagram", "TikTok", "LinkedIn"].map((p) => (
                                        <button key={p} className="py-2 rounded-xl text-xs font-medium bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 transition-all">
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* CLIPPER TAB */}
                    {activeTab === "clipper" && (
                        <>
                            <div className="text-center py-8">
                                <div className="w-20 h-20 mx-auto rounded-2xl bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center mb-4 hover:border-gold/30 transition-colors cursor-pointer">
                                    <Upload className="w-8 h-8 text-slate-600" />
                                </div>
                                <h3 className="text-white font-medium mb-1">Upload a long-form video</h3>
                                <p className="text-xs text-slate-500">AI will detect highlights and create short clips</p>
                            </div>

                            <div className="text-center text-xs text-slate-600">— or paste a video URL —</div>

                            <input
                                type="text"
                                className="w-full px-4 py-3 bg-midnight-900/60 border border-white/10 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-gold/50 transition-all"
                                placeholder="https://youtube.com/watch?v=..."
                            />

                            <div className="space-y-2 pt-4">
                                <h4 className="text-sm font-medium text-white">Subtitle Settings</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-slate-500 uppercase tracking-wider">Font</label>
                                        <select className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none">
                                            <option>Inter Bold</option>
                                            <option>Space Grotesk</option>
                                            <option>Montserrat</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-slate-500 uppercase tracking-wider">Position</label>
                                        <select className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none">
                                            <option>Bottom</option>
                                            <option>Center</option>
                                            <option>Top</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {["#FFFFFF", "#FFD700", "#FF6B6B", "#00D2FF"].map((c) => (
                                        <button key={c} className="w-8 h-8 rounded-lg border-2 border-white/10 hover:border-white/40 transition-colors" style={{ backgroundColor: c }} />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* UPLOAD TAB */}
                    {activeTab === "upload" && (
                        <>
                            <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 text-center hover:border-gold/30 transition-colors cursor-pointer group">
                                <ImagePlus className="w-12 h-12 mx-auto text-slate-600 group-hover:text-gold/60 transition-colors mb-4" />
                                <h3 className="text-white font-medium mb-1">Drop files here</h3>
                                <p className="text-xs text-slate-500 mb-4">Images, videos, or clips • Max 500MB</p>
                                <button className="px-4 py-2 bg-white/10 hover:bg-white/15 rounded-xl text-sm text-white font-medium transition-all">
                                    Browse Files
                                </button>
                            </div>

                            <div className="space-y-3 pt-2">
                                <h4 className="text-sm font-medium text-white flex items-center gap-2">
                                    <Wand2 className="w-4 h-4 text-gold" /> AI Enhancement (Optional)
                                </h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {["Auto enhance", "Background removal", "Color grade", "Upscale 4K"].map((action) => (
                                        <button key={action} className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-400 hover:bg-white/10 hover:text-white transition-all text-left">
                                            {action}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Generate Button */}
                <div className="p-4 border-t border-white/5 bg-midnight-900/60">
                    <button
                        onClick={activeTab === "caption" ? handleGenerateCaptions : handleGenerate}
                        disabled={generating || (!prompt && activeTab !== "caption" && activeTab !== "clipper" && activeTab !== "upload")}
                        className="w-full py-3.5 bg-gradient-to-r from-gold to-orange-500 text-midnight-900 font-bold rounded-xl shadow-lg shadow-gold/25 hover:shadow-gold/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
                    >
                        {generating ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Generating...</span>
                            </>
                        ) : (
                            <>
                                <Zap className="w-5 h-5" />
                                <span>{activeTab === "caption" ? "Generate Captions" : activeTab === "clipper" ? "Detect Highlights" : "Generate"}</span>
                            </>
                        )}
                    </button>
                    {generating && (
                        <div className="mt-3">
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-gold to-orange-500 rounded-full"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 3, ease: "linear" }}
                                />
                            </div>
                            <p className="text-[10px] text-slate-500 mt-1.5 text-center">AI is crafting your content...</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Panel — Preview */}
            <div className="flex-1 flex flex-col glass-panel rounded-2xl border border-white/10 overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-white/5">
                    <h3 className="text-sm font-display font-semibold text-white">Preview</h3>
                    {generatedAssets.length > 0 && (
                        <div className="flex gap-2">
                            <button onClick={() => { setGeneratedAssets([]); }} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-white/5 rounded-lg transition-colors">
                                <RotateCcw className="w-3 h-3" /> Regenerate
                            </button>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gold bg-gold/10 rounded-lg hover:bg-gold/20 transition-colors">
                                <Download className="w-3 h-3" /> Save to Library
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto p-5">
                    {activeTab === "caption" && generatedCaptions.length > 0 ? (
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium text-white mb-3">Generated Captions</h4>
                            {generatedCaptions.map((caption, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.15 }}
                                    className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-gold/20 transition-all group"
                                >
                                    <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{caption}</p>
                                    <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="flex items-center gap-1 px-2.5 py-1 text-[10px] text-gold bg-gold/10 rounded-lg"><Copy className="w-3 h-3" /> Copy</button>
                                        <button className="flex items-center gap-1 px-2.5 py-1 text-[10px] text-slate-400 bg-white/5 rounded-lg"><Star className="w-3 h-3" /> Save</button>
                                        <button className="flex items-center gap-1 px-2.5 py-1 text-[10px] text-slate-400 bg-white/5 rounded-lg"><Send className="w-3 h-3" /> Use in Post</button>
                                    </div>
                                </motion.div>
                            ))}

                            <div className="mt-6">
                                <h4 className="text-sm font-medium text-white mb-3">Suggested Hashtags</h4>
                                <div className="flex flex-wrap gap-2">
                                    {generatedHashtags.map((tag, i) => (
                                        <motion.button
                                            key={tag}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.5 + i * 0.05 }}
                                            className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs rounded-lg hover:bg-indigo-500/20 transition-all cursor-pointer"
                                        >
                                            {tag}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : generatedAssets.length > 0 ? (
                        <div className="space-y-4">
                            {/* Main Preview */}
                            <div className="relative aspect-square max-w-md mx-auto rounded-2xl overflow-hidden border border-white/10 bg-midnight-800">
                                <img
                                    src={generatedAssets.find(a => a.id === selectedAsset)?.url || generatedAssets[0].url}
                                    alt="Generated"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-3 right-3 flex gap-2">
                                    <button className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-white hover:bg-black/80 transition-colors">
                                        <Download className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-white hover:bg-black/80 transition-colors">
                                        <Calendar className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Variations */}
                            <div className="flex gap-3 justify-center">
                                {generatedAssets.map((asset) => (
                                    <button
                                        key={asset.id}
                                        onClick={() => setSelectedAsset(asset.id)}
                                        className={clsx(
                                            "w-16 h-16 rounded-xl overflow-hidden border-2 transition-all",
                                            selectedAsset === asset.id ? "border-gold shadow-lg shadow-gold/20 scale-110" : "border-white/10 opacity-60 hover:opacity-100"
                                        )}
                                    >
                                        <img src={asset.url} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-2 justify-center pt-2">
                                <button className="flex items-center gap-2 px-4 py-2 bg-gold text-midnight-900 font-semibold rounded-xl text-sm hover:bg-yellow-400 transition-all shadow-lg shadow-gold/20">
                                    <Calendar className="w-4 h-4" /> Schedule Post
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-xl text-sm hover:bg-white/15 transition-all">
                                    <Download className="w-4 h-4" /> Save to Library
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 text-slate-400 rounded-xl text-sm hover:bg-white/10 transition-all">
                                    <Send className="w-4 h-4" /> Share
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center h-full">
                            <div className="text-center max-w-sm">
                                <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-gold/10 to-orange-500/10 border border-gold/10 flex items-center justify-center mb-6">
                                    <Sparkles className="w-10 h-10 text-gold/40" />
                                </div>
                                <h3 className="text-lg font-display font-semibold text-white mb-2">
                                    {activeTab === "image" ? "Generate AI Images" : activeTab === "video" ? "Generate AI Videos" : activeTab === "caption" ? "AI Captions & Hashtags" : activeTab === "clipper" ? "Smart Video Clipper" : "Upload Your Media"}
                                </h3>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    {activeTab === "image"
                                        ? "Describe your vision and AI will create stunning visuals ready for social media."
                                        : activeTab === "video"
                                            ? "Create engaging video content from text descriptions in seconds."
                                            : activeTab === "caption"
                                                ? "Generate platform-optimized captions and trending hashtag sets."
                                                : activeTab === "clipper"
                                                    ? "Upload a long video and AI will find the best moments for short-form clips."
                                                    : "Drag and drop your images or videos to get started."}
                                </p>
                                {(activeTab === "image" || activeTab === "video") && (
                                    <div className="mt-6 space-y-2">
                                        <p className="text-[10px] text-slate-600 uppercase tracking-widest">Try a prompt</p>
                                        {PROMPT_SUGGESTIONS.map((s, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setPrompt(s)}
                                                className="flex items-center gap-2 w-full px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs text-slate-400 text-left hover:text-white transition-all group"
                                            >
                                                <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-gold transition-colors flex-shrink-0" />
                                                <span className="truncate">{s}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
