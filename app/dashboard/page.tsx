import { createClient } from "@/utils/supabase/server";
import { BarChart3, TrendingUp, CheckCircle, XCircle } from "lucide-react";
import DashboardCharts from "./components/DashboardCharts";
import AddJobModal from "./components/AddJobModal";
import JobRow from "./components/JobRow";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: jobs } = await supabase
    .from("job_applications")
    .select("*")
    .order("created_at", { ascending: false });

  const safeJobs = jobs || [];
  const totalApplied = safeJobs.filter((j) => j.status !== "saved").length;
  const interviewing = safeJobs.filter(
    (j) => j.status === "interviewing"
  ).length;
  const offers = safeJobs.filter((j) => j.status === "offer").length;
  const rejected = safeJobs.filter((j) => j.status === "rejected").length;

  const userName = user?.user_metadata?.full_name?.split(" ")[0] || "Hunter";

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 shadow-2xl">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"></div>
        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Let's get you hired,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {userName}
              </span>
              ! 🚀
            </h1>
            <p className="mt-2 text-lg text-slate-400">
              You have{" "}
              <span className="font-bold text-white">
                {interviewing} active interviews
              </span>
              .
            </p>
          </div>
          <div className="flex items-center gap-3">
            <AddJobModal />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Applied"
          value={totalApplied}
          icon={<BarChart3 className="text-blue-400" />}
          color="blue"
        />
        <StatCard
          label="Interviewing"
          value={interviewing}
          icon={<TrendingUp className="text-purple-400" />}
          color="purple"
        />
        <StatCard
          label="Offers"
          value={offers}
          icon={<CheckCircle className="text-green-400" />}
          color="green"
        />
        <StatCard
          label="Rejections"
          value={rejected}
          icon={<XCircle className="text-red-400" />}
          color="red"
        />
      </div>

      {/* Charts */}
      <DashboardCharts jobs={safeJobs} />

      {/* Recent Updates (DIV structure - Safe for Mobile & Desktop) */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800/50 bg-slate-900/50 p-4">
          <h3 className="font-semibold text-white">Recent Updates</h3>
          <span className="text-xs text-slate-500">Last 10 activities</span>
        </div>
        <div className="flex flex-col">
          {safeJobs.slice(0, 10).map((job) => (
            <JobRow key={job.id} job={job} />
          ))}
          {safeJobs.length === 0 && (
            <div className="py-12 text-center text-slate-500 italic">
              No applications yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }: any) {
  const borderColors: any = {
    blue: "hover:border-blue-500/50",
    purple: "hover:border-purple-500/50",
    green: "hover:border-green-500/50",
    red: "hover:border-red-500/50",
  };
  return (
    <div
      className={`rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:shadow-lg ${borderColors[color]}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-400">{label}</p>
          <h3 className="mt-2 text-3xl font-bold text-white">{value}</h3>
        </div>
        <div className="rounded-lg bg-slate-950 p-3 ring-1 ring-white/5 shadow-inner">
          {icon}
        </div>
      </div>
    </div>
  );
}
