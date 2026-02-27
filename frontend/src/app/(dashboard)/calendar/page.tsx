"use client";

import { useState } from 'react';
import { usePosts } from '@/hooks/usePosts';
import { CalendarHeader } from '@/components/calendar/CalendarHeader';
import { DayCell } from '@/components/calendar/DayCell';
import {
    startOfMonth, endOfMonth, startOfWeek, endOfWeek,
    eachDayOfInterval, addMonths, subMonths, isSameDay, format
} from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, FileText, ChevronRight, GripVertical } from 'lucide-react';

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState<'month' | 'week' | 'agenda'>('month');
    const [showDrafts, setShowDrafts] = useState(true);
    const { posts, loading } = usePosts();

    const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

    // Calendar logic
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({
        start: calendarStart,
        end: calendarEnd
    });

    const drafts = posts.filter(p => p.status === 'draft');

    return (
        <div className="flex gap-6 h-[calc(100vh-8rem)]">
            {/* Main Calendar Area */}
            <div className="flex-1 flex flex-col glass-panel rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-6 pb-0">
                    <div className="flex items-center justify-between mb-6">
                        <CalendarHeader
                            currentDate={currentDate}
                            onPrevMonth={handlePrevMonth}
                            onNextMonth={handleNextMonth}
                            view={view}
                            onViewChange={setView}
                        />
                        <button onClick={() => setShowDrafts(!showDrafts)} className="text-xs text-gold hover:text-white transition-colors">
                            {showDrafts ? 'Hide Drafts' : 'Show Drafts'}
                        </button>
                    </div>

                    {/* Weekday Headers */}
                    <div className="grid grid-cols-7 border-b border-white/10 bg-midnight-900/30">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                {day}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex-1 bg-white/5 animate-pulse" />
                ) : (
                    <div className="flex-1 grid grid-cols-7 auto-rows-fr bg-midnight-900/30 overflow-y-auto">
                        {calendarDays.map((day) => {
                            const dayPosts = posts.filter(post => {
                                const postDate = post.scheduledTime ? new Date(post.scheduledTime) : new Date(post.createdAt);
                                return isSameDay(postDate, day) && post.status !== 'draft';
                            });

                            return (
                                <DayCell
                                    key={day.toISOString()}
                                    date={day}
                                    currentMonth={currentDate}
                                    posts={dayPosts}
                                />
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Drafts Sidebar */}
            <AnimatePresence>
                {showDrafts && (
                    <motion.div
                        initial={{ opacity: 0, width: 0, x: 20 }}
                        animate={{ opacity: 1, width: 320, x: 0 }}
                        exit={{ opacity: 0, width: 0, x: 20 }}
                        className="flex-shrink-0 glass-panel rounded-2xl border border-white/10 flex flex-col"
                    >
                        <div className="p-4 border-b border-white/5 flex items-center justify-between">
                            <h3 className="font-display font-semibold text-white flex items-center gap-2">
                                <FileText className="w-4 h-4 text-slate-400" />
                                Drafts
                            </h3>
                            <button className="p-1.5 hover:bg-white/5 rounded-lg text-gold transition-colors">
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-3 space-y-2">
                            {drafts.map((draft) => (
                                <div key={draft.id} className="p-3 bg-white/5 border border-white/5 rounded-xl hover:border-gold/30 cursor-grab active:cursor-grabbing group transition-all">
                                    <div className="flex items-start gap-2">
                                        <GripVertical className="w-4 h-4 text-slate-600 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-slate-300 line-clamp-2 mb-2">{draft.content}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex gap-1">
                                                    {draft.platforms.map(p => (
                                                        <span key={p} className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded text-slate-400 uppercase">{p}</span>
                                                    ))}
                                                </div>
                                                <span className="text-[10px] text-slate-500">{format(new Date(draft.updatedAt), 'MMM d')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {drafts.length === 0 && (
                                <div className="text-center py-10 text-slate-500">
                                    <p className="text-sm">No drafts found</p>
                                    <button className="text-xs text-gold mt-2 hover:underline">Create new</button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
