export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-midnight-900 flex relative overflow-hidden">
            {/* Ambient background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-neon-rose/10 blur-[120px]" />
                <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-gold/5 blur-[100px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-30" />
            </div>
            {children}
        </div>
    );
}
