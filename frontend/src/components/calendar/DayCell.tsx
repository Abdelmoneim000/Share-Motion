// src/components/calendar/DayCell.tsx
import { Post } from '@/types/post';
import { CalendarPostCard } from './CalendarPostCard';
import { clsx } from 'clsx';
import { isToday, isSameMonth, format } from 'date-fns';

interface DayCellProps {
    date: Date;
    currentMonth: Date;
    posts: Post[];
}

export function DayCell({ date, currentMonth, posts }: DayCellProps) {
    const isCurrentMonth = isSameMonth(date, currentMonth);
    const isCurrentDay = isToday(date);

    return (
        <div className={clsx(
            "min-h-[120px] p-2 border-b border-r border-white/5 transition-colors group relative",
            !isCurrentMonth && "bg-black/20 opacity-50",
            isCurrentDay && "bg-indigo-500/5"
        )}>
            <div className="flex justify-between items-start mb-2">
                <span className={clsx(
                    "text-xs font-mono font-medium p-1 rounded-full w-6 h-6 flex items-center justify-center",
                    isCurrentDay ? "bg-gold text-midnight-900" : "text-slate-500"
                )}>
                    {format(date, 'd')}
                </span>
                <button className="text-slate-600 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity p-1 text-xs">
                    +
                </button>
            </div>

            <div className="space-y-1">
                {posts.map(post => (
                    <CalendarPostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}
