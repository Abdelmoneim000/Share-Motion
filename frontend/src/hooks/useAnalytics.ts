// src/hooks/useAnalytics.ts
"use client";

import { useState, useEffect } from 'react';
import { DailyMetric, OverviewStats, MockAnalyticsService } from '@/services/mock/analytics.mock';

export function useAnalytics() {
    const [dailyData, setDailyData] = useState<DailyMetric[]>([]);
    const [stats, setStats] = useState<OverviewStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const [daily, overview] = await Promise.all([
                    MockAnalyticsService.getDailyEngagement(),
                    MockAnalyticsService.getOverviewStats()
                ]);
                setDailyData(daily);
                setStats(overview);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    return { dailyData, stats, loading };
}
