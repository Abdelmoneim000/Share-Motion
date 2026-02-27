// src/types/media.ts

export type MediaType = 'image' | 'video';
export type MediaSource = 'upload' | 'ai_generated' | 'stock';

export interface MediaAsset {
    id: string;
    workspaceId: string;
    url: string;
    thumbnailUrl: string;
    type: MediaType;
    source: MediaSource;
    filename: string;
    size: number; // in bytes
    dimensions?: {
        width: number;
        height: number;
    };
    duration?: number; // in seconds, for videos
    tags: string[];
    createdAt: string;
}
