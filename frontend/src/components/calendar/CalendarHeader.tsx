
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, List, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface CalendarHeaderProps {
    currentDate: Date;
    onPrevMonth: () => void;
    onNextMonth: () => void;
    view: 'month' | 'week' | 'agenda';
    onViewChange: (view: 'month' | 'week' | 'agenda') => void;
}

export function CalendarHeader({ currentDate, onPrevMonth, onNextMonth, view, onViewChange }: CalendarHeaderProps) {
    return (
        <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
                <h2 className="text-2xl font-display font-bold text-white min-w-[180px]">
                    {format(currentDate, 'MMMM yyyy')}
                </h2>
                <div className="flex gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
                    <button onClick={onPrevMonth} className="p-1.5 hover:bg-white/5 rounded-md text-slate-400 hover:text-white transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={onNextMonth} className="p-1.5 hover:bg-white/5 rounded-md text-slate-400 hover:text-white transition-colors">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="h-8 w-px bg-white/10" />

            <div className="flex gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
                <button
                    onClick={() => onViewChange('month')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${view === 'month' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                >
                    <CalendarIcon className="w-3.5 h-3.5" /> Month
                </button>
                <button
                    onClick={() => onViewChange('week')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${view === 'week' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                >
                    <Clock className="w-3.5 h-3.5" /> Week
                </button>
                <button
                    onClick={() => onViewChange('agenda')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${view === 'agenda' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                >
                    <List className="w-3.5 h-3.5" /> Agenda
                </button>
            </div>
        </div>
    );
}
