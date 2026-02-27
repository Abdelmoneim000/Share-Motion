// src/hooks/useMedia.ts
"use client";

import { useState, useEffect } from 'react';
import { MediaAsset } from '@/types/media';
import { MockMediaService } from '@/services/mock/media.mock';

export function useMedia() {
    const [assets, setAssets] = useState<MediaAsset[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const data = await MockMediaService.getAll();
                setAssets(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const upload = async (file: File) => {
        const asset = await MockMediaService.upload(file);
        setAssets(prev => [asset, ...prev]);
        return asset;
    };

    return { assets, loading, upload };
}
