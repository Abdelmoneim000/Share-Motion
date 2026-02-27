// src/components/content/PostCard.tsx
"use client";

import { Post } from '@/types/post';
import { PlatformIcon } from './PlatformIcon';
import { PostStatusBadge } from './PostStatusBadge';
import { MoreVertical, Heart, MessageCircle, Share2, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export function PostCard({ post }: { post: Post }) {
    const hasMedia = post.mediaUrls && post.mediaUrls.length > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="glass-panel group flex flex-col h-full overflow-hidden hover:border-white/20 hover:shadow-2xl transition-all"
        >
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden relative border border-white/10">
                        {/* Using placeholder for author avatar if needed */}
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-400">
                            {post.author.name.charAt(0)}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-white truncate max-w-[120px]">{post.author.name}</span>
                            <PlatformIcon platform={post.platforms[0]} className="w-3 h-3" />
                        </div>
                        <div className="text-xs text-slate-500">
                            {format(new Date(post.createdAt), 'MMM d, h:mm a')}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <PostStatusBadge status={post.status} />
                    <button className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Media Preview (if exists) */}
            {hasMedia && (
                <div className="aspect-video bg-slate-800 relative overflow-hidden">
                    {/* In a real app, use Next.js Image component here */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${post.mediaUrls[0]})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            )}

            {/* Content Body */}
            <div className="p-4 flex-1">
                <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed">
                    {post.content}
                </p>
            </div>

            {/* Footer / Metrics */}
            <div className="p-4 pt-0 border-t border-white/5 mt-auto bg-white/[0.02] flex items-center justify-between text-slate-500 text-xs">
                <div className="flex gap-4 py-3">
                    <span className="flex items-center gap-1 hover:text-rose-400 transition-colors cursor-pointer">
                        <Heart className="w-3 h-3" /> {post.metrics?.likes || 0}
                    </span>
                    <span className="flex items-center gap-1 hover:text-blue-400 transition-colors cursor-pointer">
                        <MessageCircle className="w-3 h-3" /> {post.metrics?.comments || 0}
                    </span>
                    <span className="flex items-center gap-1 hover:text-green-400 transition-colors cursor-pointer">
                        <Share2 className="w-3 h-3" /> {post.metrics?.shares || 0}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {post.metrics?.views || 0}
                </div>
            </div>
        </motion.div>
    );
}
