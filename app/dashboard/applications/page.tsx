import { createClient } from "@/utils/supabase/server";
import KanbanBoard from "./components/KanbanBoard";
import AddJobModal from "../components/AddJobModal";

export default async function ApplicationsPage() {
  const supabase = await createClient();

  // Fetch jobs sorted by newest
  const { data: jobs } = await supabase
    .from("job_applications")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Applications Board
          </h1>
          <p className="text-slate-400 text-sm hidden sm:block">
            Drag cards to update status.
          </p>
        </div>
        <AddJobModal />
      </div>

      {/* The Board Area */}
      <div className="flex-1 overflow-hidden">
        <KanbanBoard initialJobs={jobs || []} />
      </div>
    </div>
  );
}
