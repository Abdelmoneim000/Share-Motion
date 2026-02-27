// src/components/dashboard/StatsCard.tsx
import { clsx } from "clsx";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatsCardProps {
    label: string;
    value: string;
    trend: number;
    className?: string;
}

export function StatsCard({ label, value, trend, className }: StatsCardProps) {
    const isPositive = trend >= 0;

    return (
        <div className={clsx("glass-panel p-6 flex flex-col justify-between h-32", className)}>
            <div className="flex justify-between items-start">
                <span className="text-slate-400 text-sm font-medium">{label}</span>
                <div className={clsx(
                    "flex items-center text-xs font-bold px-1.5 py-0.5 rounded",
                    isPositive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                )}>
                    {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                    {Math.abs(trend)}%
                </div>
            </div>
            <div className="text-3xl font-display font-bold text-white tracking-tight">
                {value}
            </div>
        </div>
    );
}
