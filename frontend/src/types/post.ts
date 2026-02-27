// src/types/post.ts

export type Platform = 'instagram' | 'tiktok' | 'linkedin' | 'twitter' | 'youtube' | 'facebook';

export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed' | 'processing' | 'in_review' | 'archived';

export type FeedType = 'post' | 'story' | 'reel' | 'shorts' | 'thread' | 'carousel';

export interface Post {
    id: string;
    workspaceId: string;
    content: string;
    mediaUrls: string[];
    platforms: Platform[];
    type: FeedType;
    status: PostStatus;
    scheduledTime: string | null;
    publishedTime: string | null;
    author: {
        id: string;
        name: string;
        avatarUrl: string;
    };
    metrics?: {
        likes: number;
        comments: number;
        shares: number;
        views: number;
    };
    createdAt: string;
    updatedAt: string;
}

export interface PostFilters {
    platform?: Platform[];
    status?: PostStatus[];
    dateRange?: {
        start: string;
        end: string;
    };
}
