import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");

  return (
    <div className="flex h-screen items-center justify-center bg-midnight-900 text-white">
      <div className="animate-pulse">Loading Share Motion...</div>
    </div>
  );
}
