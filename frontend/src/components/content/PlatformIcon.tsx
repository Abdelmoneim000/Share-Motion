// src/components/content/PlatformIcon.tsx
import { Platform } from '@/types/post';
import { Instagram, Linkedin, Twitter, Youtube, Video } from 'lucide-react';
import { clsx } from 'clsx';

// Icon mapping must be clear and consistent
const ICONS: Record<string, { Icon: typeof Instagram; color: string }> = {
    instagram: { Icon: Instagram, color: 'text-pink-500' },
    tiktok: { Icon: Video, color: 'text-cyan-400' },
    linkedin: { Icon: Linkedin, color: 'text-blue-500' },
    twitter: { Icon: Twitter, color: 'text-sky-400' },
    youtube: { Icon: Youtube, color: 'text-red-500' },
    facebook: { Icon: Linkedin, color: 'text-blue-400' },
};

interface PlatformIconProps {
    platform: Platform;
    className?: string;
}

export function PlatformIcon({ platform, className }: PlatformIconProps) {
    // Graceful fallback if platform is unknown
    const config = ICONS[platform] || { Icon: Video, color: 'text-slate-400' };
    const { Icon, color } = config;

    return <Icon className={clsx(color, className)} />;
}
