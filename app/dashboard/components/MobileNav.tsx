"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileText, Sparkles, LogOut } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  // Helper to check if a link is active
  const isActive = (path: string) => pathname === path;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-950/90 backdrop-blur-lg px-6 py-3 md:hidden transition-all duration-300">
      <div className="flex items-center justify-between">
        {/* Dashboard (Home) */}
        <Link
          href="/dashboard"
          className={`flex flex-col items-center gap-1 transition-colors ${
            isActive("/dashboard")
              ? "text-blue-500"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <LayoutDashboard
            size={24}
            strokeWidth={isActive("/dashboard") ? 2.5 : 2}
          />
          <span className="text-[10px] font-medium">Home</span>
        </Link>

        {/* Board (Kanban) */}
        <Link
          href="/dashboard/applications"
          className={`flex flex-col items-center gap-1 transition-colors ${
            isActive("/dashboard/applications")
              ? "text-blue-500"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <FileText
            size={24}
            strokeWidth={isActive("/dashboard/applications") ? 2.5 : 2}
          />
          <span className="text-[10px] font-medium">Board</span>
        </Link>

        {/* AI Matcher */}
        <Link
          href="/dashboard/ai-matcher"
          className={`flex flex-col items-center gap-1 transition-colors ${
            isActive("/dashboard/ai-matcher")
              ? "text-blue-500"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <Sparkles
            size={24}
            strokeWidth={isActive("/dashboard/ai-matcher") ? 2.5 : 2}
          />
          <span className="text-[10px] font-medium">AI</span>
        </Link>

        {/* Logout */}
        <button
          onClick={handleSignOut}
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-red-400 transition-colors"
        >
          <LogOut size={24} />
          <span className="text-[10px] font-medium">Exit</span>
        </button>
      </div>
    </div>
  );
}
