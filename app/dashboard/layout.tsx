import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, FileText, Sparkles, LogOut } from "lucide-react";
import { signout } from "@/app/(auth)/login/actions";
import MobileNav from "./components/MobileNav"; // <--- 1. Import this

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      {/* --- DESKTOP SIDEBAR (Hidden on mobile) --- */}
      <aside className="hidden w-64 flex-col border-r border-slate-800 bg-slate-900/50 md:flex">
        {/* Logo */}
        <div className="flex h-20 items-center px-10">
          <Link href="/dashboard">
            <Image
              src="/logo.png"
              alt="ATS-Lite Logo"
              width={180}
              height={20}
              className="h-20 w-auto object-contain object-left"
              priority
            />
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <nav className="flex-1 space-y-2 p-4">
          <SidebarLink
            href="/dashboard"
            icon={<LayoutDashboard size={22} />}
            label="Dashboard"
          />
          <SidebarLink
            href="/dashboard/applications"
            icon={<FileText size={22} />}
            label="Kanban Board"
          />
          <SidebarLink
            href="/dashboard/ai-matcher"
            icon={<Sparkles size={22} />}
            label="AI Matcher"
          />
        </nav>

        {/* Desktop Logout */}
        <div className="p-4 border-t border-slate-800">
          <form action={signout}>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-400 hover:bg-slate-800 transition-colors">
              <LogOut size={20} />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      {/* 2. ADDED 'pb-20' HERE: Pushes content up on mobile so nav doesn't cover it */}
      <main className="flex-1 flex flex-col overflow-hidden pb-20 md:pb-0">
        <div className="flex-1 overflow-auto p-4 md:p-8">{children}</div>
      </main>

      {/* --- MOBILE NAVIGATION (Visible only on mobile) --- */}
      <MobileNav />
    </div>
  );
}

// Helper for Sidebar Links (Active state logic handled by usePathname in client components,
// but for server components we keep it simple or strictly style)
function SidebarLink({ href, icon, label }: any) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
    >
      {icon}
      {label}
    </Link>
  );
}
