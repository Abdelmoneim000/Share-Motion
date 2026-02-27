// src/components/content/PostStatusBadge.tsx
import { clsx } from 'clsx';
import { PostStatus } from '@/types/post';

const STATUS_Map: Record<PostStatus, { label: string; className: string }> = {
    draft: { label: 'Draft', className: 'bg-slate-500/20 text-slate-300 border-slate-500/30' },
    scheduled: { label: 'Scheduled', className: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    published: { label: 'Published', className: 'bg-green-500/20 text-green-300 border-green-500/30' },
    failed: { label: 'Failed', className: 'bg-red-500/20 text-red-300 border-red-500/30' },
    processing: { label: 'Generating', className: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30 animate-pulse' },
    in_review: { label: 'In Review', className: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    archived: { label: 'Archived', className: 'bg-slate-600/20 text-slate-400 border-slate-600/30' },
};

export function PostStatusBadge({ status }: { status: PostStatus }) {
    const config = STATUS_Map[status];
    return (
        <span className={clsx("px-2 py-0.5 rounded-full text-xs font-medium border", config.className)}>
            {config.label}
        </span>
    );
}
