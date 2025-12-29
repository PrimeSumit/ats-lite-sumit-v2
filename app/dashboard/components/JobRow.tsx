"use client";

import { Trash2, Loader2, Calendar } from "lucide-react";
import { useState } from "react";
import { deleteJobApplication } from "../actions";
import { useRouter } from "next/navigation";

export default function JobRow({ job }: { job: any }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this application?")) return;

    setIsDeleting(true);
    await deleteJobApplication(job.id);
    setIsDeleting(false);
    router.refresh();
  }

  return (
    // CHANGED: Uses 'div' instead of 'tr' to fit the new mobile layout
    <div className="group flex flex-col gap-4 border-b border-slate-800/50 p-4 transition-colors hover:bg-slate-800/20 sm:flex-row sm:items-center sm:gap-0">
      {/* 1. Company & Role */}
      <div className="flex flex-1 items-center gap-4">
        {/* Logo Placeholder */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-800 font-bold text-sm text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200 transition-colors">
          {job.company_name?.substring(0, 2).toUpperCase() || "??"}
        </div>

        <div className="flex flex-col">
          <span className="font-semibold text-slate-200">
            {job.company_name}
          </span>
          <span className="text-sm text-slate-400">{job.position}</span>
        </div>
      </div>

      {/* 2. Status, Date, Delete */}
      <div className="flex items-center justify-between sm:w-1/2 sm:justify-end sm:gap-6">
        {/* Status Badge */}
        <div className="shrink-0">
          <Badge status={job.status} />
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <Calendar size={12} />
          {/* Fixed: ensuring date exists before formatting */}
          <span>
            {job.created_at
              ? new Date(job.created_at).toLocaleDateString("en-US")
              : "N/A"}
          </span>
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="ml-2 rounded-md p-2 text-slate-600 hover:bg-red-500/10 hover:text-red-400 transition-all disabled:opacity-50 sm:opacity-0 sm:group-hover:opacity-100"
          title="Delete Application"
        >
          {isDeleting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Trash2 size={16} />
          )}
        </button>
      </div>
    </div>
  );
}

// Badge Helper Component
function Badge({ status }: { status: string }) {
  const styles: any = {
    applied: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    interviewing: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    offer: "bg-green-500/10 text-green-400 border-green-500/20",
    rejected: "bg-red-500/10 text-red-400 border-red-500/20",
    saved: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
        styles[status] || styles.saved
      }`}
    >
      {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Saved"}
    </span>
  );
}
