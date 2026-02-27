// src/services/mock/analytics.mock.ts

export interface DailyMetric {
    date: string;
    views: number;
    likes: number;
    comments: number;
    shares: number;
}

export interface OverviewStats {
    totalReach: number;
    totalEngagement: number;
    growthRate: number;
    activeFollowers: number;
}

const generateDailyData = (days: number): DailyMetric[] => {
    const data: DailyMetric[] = [];
    const today = new Date();
    for (let i = days; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        data.push({
            date: date.toISOString().split('T')[0],
            views: Math.floor(Math.random() * 5000) + 1000,
            likes: Math.floor(Math.random() * 800) + 50,
            comments: Math.floor(Math.random() * 100) + 5,
            shares: Math.floor(Math.random() * 50) + 2,
        });
    }
    return data;
};

export const MockAnalyticsService = {
    async getDailyEngagement(days = 30): Promise<DailyMetric[]> {
        await new Promise(resolve => setTimeout(resolve, 800));
        return generateDailyData(days);
    },

    async getOverviewStats(): Promise<OverviewStats> {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            totalReach: 1250000,
            totalEngagement: 85000,
            growthRate: 12.5,
            activeFollowers: 45000,
        };
    }
};
