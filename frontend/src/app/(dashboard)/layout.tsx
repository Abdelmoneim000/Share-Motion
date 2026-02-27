import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-midnight-900 font-body text-white selection:bg-gold/30">
            <Sidebar />
            <div className="flex-1 flex flex-col ml-64 min-h-screen relative">
                <TopBar />
                <main className="flex-1 p-8 relative isolate">
                    {/* Background Pattern Layer */}
                    <div
                        className="absolute inset-0 -z-10 pointer-events-none opacity-40 bg-[url('/grid.svg')] bg-repeat"
                        aria-hidden="true"
                    />
                    {/* Radial Gradient for depth */}
                    <div
                        className="absolute top-0 right-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-midnight-900/0 to-transparent blur-3xl"
                    />

                    <div className="relative z-10 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
