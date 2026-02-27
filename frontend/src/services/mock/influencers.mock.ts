// src/services/mock/influencers.mock.ts

export interface Influencer {
    id: string;
    name: string;
    niche: string;
    reach: number;
    engagementRate: number;
    startRate: number;
    avatarColor: string; // simulating an image or aura
    platforms: string[];
}

const MOCK_INFLUENCERS: Influencer[] = [
    { id: '1', name: 'Alex Creator', niche: 'Lifestyle', reach: 1200000, engagementRate: 4.8, startRate: 500, avatarColor: 'bg-indigo-500', platforms: ['instagram', 'tiktok'] },
    { id: '2', name: 'Tech Savvy', niche: 'Technology', reach: 850000, engagementRate: 6.2, startRate: 1200, avatarColor: 'bg-cyan-500', platforms: ['youtube', 'twitter'] },
    { id: '3', name: 'Fit Fam', niche: 'Health & Fitness', reach: 2500000, engagementRate: 3.5, startRate: 2000, avatarColor: 'bg-green-500', platforms: ['instagram', 'youtube'] },
    { id: '4', name: 'Travel Bug', niche: 'Travel', reach: 500000, engagementRate: 5.5, startRate: 800, avatarColor: 'bg-orange-500', platforms: ['instagram', 'tiktok'] },
    { id: '5', name: 'Gamer Pro', niche: 'Gaming', reach: 3000000, engagementRate: 7.1, startRate: 2500, avatarColor: 'bg-purple-500', platforms: ['twitch', 'youtube', 'twitter'] },
    { id: '6', name: 'Foodie Life', niche: 'Food', reach: 900000, engagementRate: 4.2, startRate: 600, avatarColor: 'bg-red-500', platforms: ['instagram', 'tiktok'] },
];

export const MockInfluencerService = {
    async getAll(): Promise<Influencer[]> {
        await new Promise(resolve => setTimeout(resolve, 600));
        return [...MOCK_INFLUENCERS];
    }
};
