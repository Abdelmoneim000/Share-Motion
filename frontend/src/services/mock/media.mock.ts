// src/services/mock/media.mock.ts
import { MediaAsset } from '@/types/media';

const MOCK_MEDIA: MediaAsset[] = [
    {
        id: 'm-1',
        workspaceId: 'ws-1',
        url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=200&q=80',
        type: 'image',
        source: 'upload',
        filename: 'summer-campaign-01.jpg',
        size: 1024000,
        dimensions: { width: 1920, height: 1080 },
        tags: ['summer', 'fashion'],
        createdAt: '2023-10-20T10:00:00Z',
    },
    {
        id: 'm-2',
        workspaceId: 'ws-1',
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        type: 'image',
        source: 'ai_generated',
        filename: 'ai-generated-portrait.png',
        size: 512000,
        dimensions: { width: 1024, height: 1024 },
        tags: ['portrait', 'ai'],
        createdAt: '2023-10-22T14:30:00Z',
    },
    {
        id: 'm-3',
        workspaceId: 'ws-1',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=200&q=80', // Placeholder thumb
        type: 'video',
        source: 'stock',
        filename: 'neon-city-vibe.mp4',
        size: 15400000,
        duration: 15,
        tags: ['neon', 'city', 'night'],
        createdAt: '2023-10-25T09:15:00Z',
    },
];

export const MockMediaService = {
    async getAll(): Promise<MediaAsset[]> {
        await new Promise(resolve => setTimeout(resolve, 600));
        return [...MOCK_MEDIA];
    },

    async upload(file: File): Promise<MediaAsset> {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const newAsset: MediaAsset = {
            id: Math.random().toString(36).substr(2, 9),
            workspaceId: 'ws-1',
            url: URL.createObjectURL(file),
            thumbnailUrl: URL.createObjectURL(file),
            type: file.type.startsWith('video') ? 'video' : 'image',
            source: 'upload',
            filename: file.name,
            size: file.size,
            tags: [],
            createdAt: new Date().toISOString(),
        };
        MOCK_MEDIA.unshift(newAsset);
        return newAsset;
    }
};
