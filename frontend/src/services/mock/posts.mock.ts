// src/services/mock/posts.mock.ts
import { Post } from '@/types/post';

const MOCK_POSTS: Post[] = [
    {
        id: '1',
        workspaceId: 'ws-1',
        content: 'Launching our new summer collection! 🌞 Step into the season with bold colors and timeless designs. #summer #fashion #newcollection',
        mediaUrls: ['https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80'],
        platforms: ['instagram', 'facebook'],
        type: 'carousel',
        status: 'published',
        scheduledTime: '2023-10-25T10:00:00Z',
        publishedTime: '2023-10-25T10:00:00Z',
        author: { id: 'u-1', name: 'Sarah Mitchell', avatarUrl: '' },
        metrics: { likes: 1240, comments: 45, shares: 12, views: 5000 },
        createdAt: '2023-10-20T14:00:00Z',
        updatedAt: '2023-10-25T10:00:00Z',
    },
    {
        id: '2',
        workspaceId: 'ws-1',
        content: 'Check out these behind-the-scenes clips from our latest shoot 🎬 The team crushed it!',
        mediaUrls: [],
        platforms: ['tiktok', 'instagram'],
        type: 'reel',
        status: 'scheduled',
        scheduledTime: new Date(Date.now() + 86400000 * 2).toISOString(),
        publishedTime: null,
        author: { id: 'u-2', name: 'Emily Chen', avatarUrl: '' },
        createdAt: '2023-10-26T09:00:00Z',
        updatedAt: '2023-10-26T09:00:00Z',
    },
    {
        id: '3',
        workspaceId: 'ws-1',
        content: 'We are thrilled to announce our Series B funding round led by top investors. This milestone brings us closer to our mission of democratizing content creation for every brand.',
        mediaUrls: [],
        platforms: ['linkedin'],
        type: 'post',
        status: 'draft',
        scheduledTime: null,
        publishedTime: null,
        author: { id: 'u-1', name: 'Sarah Mitchell', avatarUrl: '' },
        createdAt: '2023-10-27T11:00:00Z',
        updatedAt: '2023-10-27T11:30:00Z',
    },
    {
        id: '4',
        workspaceId: 'ws-1',
        content: '5 tips for better productivity 🚀\n\n1. Sleep 7-8 hours\n2. Time-block your day\n3. Eliminate distractions\n4. Use the 80/20 rule\n5. Review & reflect weekly',
        mediaUrls: [],
        platforms: ['twitter', 'linkedin'],
        type: 'thread',
        status: 'in_review',
        scheduledTime: null,
        publishedTime: null,
        author: { id: 'u-3', name: 'Alex Johnson', avatarUrl: '' },
        createdAt: '2023-10-28T15:00:00Z',
        updatedAt: '2023-10-28T15:05:00Z',
    },
    {
        id: '5',
        workspaceId: 'ws-1',
        content: 'How we grew from 0 to 10K followers in 30 days — a complete breakdown with real numbers and screenshots 📊',
        mediaUrls: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'],
        platforms: ['youtube'],
        type: 'post',
        status: 'published',
        scheduledTime: '2023-10-22T14:00:00Z',
        publishedTime: '2023-10-22T14:00:00Z',
        author: { id: 'u-1', name: 'Sarah Mitchell', avatarUrl: '' },
        metrics: { likes: 892, comments: 134, shares: 67, views: 15200 },
        createdAt: '2023-10-18T09:00:00Z',
        updatedAt: '2023-10-22T14:00:00Z',
    },
    {
        id: '6',
        workspaceId: 'ws-1',
        content: 'Monday motivation: "The best time to start was yesterday. The second-best time is now." 💪 What are you working on this week?',
        mediaUrls: [],
        platforms: ['instagram', 'twitter'],
        type: 'post',
        status: 'published',
        scheduledTime: '2023-10-23T09:00:00Z',
        publishedTime: '2023-10-23T09:00:00Z',
        author: { id: 'u-2', name: 'Emily Chen', avatarUrl: '' },
        metrics: { likes: 2340, comments: 89, shares: 45, views: 8900 },
        createdAt: '2023-10-22T16:00:00Z',
        updatedAt: '2023-10-23T09:00:00Z',
    },
    {
        id: '7',
        workspaceId: 'ws-1',
        content: 'NEW PRODUCT ALERT 🔥 Introducing our premium creator toolkit — everything you need in one place. Early bird pricing available for the next 48 hours!',
        mediaUrls: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'],
        platforms: ['instagram', 'tiktok', 'facebook'],
        type: 'reel',
        status: 'scheduled',
        scheduledTime: new Date(Date.now() + 86400000 * 5).toISOString(),
        publishedTime: null,
        author: { id: 'u-1', name: 'Sarah Mitchell', avatarUrl: '' },
        createdAt: '2023-10-29T10:00:00Z',
        updatedAt: '2023-10-29T10:00:00Z',
    },
    {
        id: '8',
        workspaceId: 'ws-1',
        content: 'Our Q3 results are in and the numbers speak for themselves. 340% increase in user engagement, 2x content output, and 98% client satisfaction.',
        mediaUrls: [],
        platforms: ['linkedin', 'twitter'],
        type: 'post',
        status: 'draft',
        scheduledTime: null,
        publishedTime: null,
        author: { id: 'u-3', name: 'Alex Johnson', avatarUrl: '' },
        createdAt: '2023-10-29T14:00:00Z',
        updatedAt: '2023-10-29T14:00:00Z',
    },
    {
        id: '9',
        workspaceId: 'ws-1',
        content: 'Day in the life of a content creator ☕ Watch how we plan, create, and schedule a week\'s worth of content in just one morning.',
        mediaUrls: [],
        platforms: ['tiktok', 'youtube'],
        type: 'reel',
        status: 'failed',
        scheduledTime: '2023-10-24T08:00:00Z',
        publishedTime: null,
        author: { id: 'u-2', name: 'Emily Chen', avatarUrl: '' },
        createdAt: '2023-10-23T20:00:00Z',
        updatedAt: '2023-10-24T08:01:00Z',
    },
];

export const MockPostsService = {
    async getAll(): Promise<Post[]> {
        await new Promise(resolve => setTimeout(resolve, 800));
        return [...MOCK_POSTS];
    },

    async getById(id: string): Promise<Post | undefined> {
        await new Promise(resolve => setTimeout(resolve, 400));
        return MOCK_POSTS.find(p => p.id === id);
    },

    async create(post: Partial<Post>): Promise<Post> {
        await new Promise(resolve => setTimeout(resolve, 600));
        const newPost = {
            ...post,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        } as Post;
        MOCK_POSTS.unshift(newPost);
        return newPost;
    }
};
