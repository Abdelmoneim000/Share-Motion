// src/app/(dashboard)/media/page.tsx
"use client";

import { useMedia } from '@/hooks/useMedia';
import { MediaCard } from '@/components/media/MediaCard';
import { Upload } from 'lucide-react';
import { useRef } from 'react';

export default function MediaPage() {
    const { assets, loading, upload } = useMedia();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            await upload(e.target.files[0]);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-display font-bold text-white">Media Library</h2>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-gold text-midnight-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors shadow-[0_0_20px_rgba(239,192,123,0.3)] flex items-center gap-2"
                >
                    <Upload className="w-4 h-4" />
                    <span>Upload New Asset</span>
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*,video/*"
                />
            </div>

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {[1, 2, 3, 4, 5].map(n => (
                        <div key={n} className="aspect-square glass-panel animate-pulse bg-white/5 rounded-xl" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {assets.map((asset) => (
                        <MediaCard key={asset.id} asset={asset} />
                    ))}
                </div>
            )}
        </div>
    );
}
