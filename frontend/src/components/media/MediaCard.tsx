// src/components/media/MediaCard.tsx
import { MediaAsset } from '@/types/media';
import { Play, Image as ImageIcon, Trash2, Maximize2 } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

export function MediaCard({ asset }: { asset: MediaAsset }) {
    return (
        <motion.div
            layoutId={`media-${asset.id}`}
            whileHover={{ y: -4 }}
            className="group relative aspect-square glass-panel rounded-xl overflow-hidden cursor-pointer bg-midnight-800"
        >
            {/* Thumbnail */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${asset.thumbnailUrl})` }}
            />

            {/* Type Indicator */}
            <div className="absolute top-2 right-2 p-1.5 bg-black/60 backdrop-blur rounded-lg text-white">
                {asset.type === 'video' ? <Play className="w-3 h-3 fill-white" /> : <ImageIcon className="w-3 h-3" />}
            </div>

            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <div className="flex gap-2 justify-center mb-auto pt-10 translate-y-4 group-hover:translate-y-0 transition-transform">
                    <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur">
                        <Maximize2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-200 rounded-full backdrop-blur">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>

                <div>
                    <div className="text-white text-sm font-medium truncate">{asset.filename}</div>
                    <div className="text-slate-400 text-xs">{(asset.size / 1024 / 1024).toFixed(1)} MB</div>
                </div>
            </div>
        </motion.div>
    );
}
