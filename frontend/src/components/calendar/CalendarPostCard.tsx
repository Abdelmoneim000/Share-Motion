// src/components/calendar/CalendarPostCard.tsx
import { Post } from '@/types/post';
import { PlatformIcon } from '@/components/content/PlatformIcon';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

export function CalendarPostCard({ post }: { post: Post }) {
    const statusColors: Record<string, string> = {
        draft: 'bg-slate-500/20 border-slate-500/30 text-slate-300',
        scheduled: 'bg-blue-500/20 border-blue-500/30 text-blue-100',
        published: 'bg-green-500/20 border-green-500/30 text-green-100',
        failed: 'bg-red-500/20 border-red-500/30 text-red-100',
        processing: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-100',
        in_review: 'bg-amber-500/20 border-amber-500/30 text-amber-100',
        archived: 'bg-slate-600/20 border-slate-600/30 text-slate-400',
    };

    return (
        <motion.div
            layoutId={`post-${post.id}`}
            whileHover={{ scale: 1.02 }}
            className={clsx(
                "p-1.5 rounded text-xs border truncate cursor-pointer flex items-center gap-1.5 mb-1 last:mb-0",
                statusColors[post.status] || statusColors.draft
            )}
        >
            <PlatformIcon platform={post.platforms[0]} className="w-3 h-3 flex-shrink-0" />
            <span className="truncate flex-1 font-medium">{post.content}</span>
        </motion.div>
    );
}
