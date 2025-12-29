"use client";

import { useState } from "react";
import { X, Loader2, Save } from "lucide-react";
import { updateJobApplication } from "../actions";
import { useRouter } from "next/navigation";

interface EditJobModalProps {
  job: any;
  isOpen: boolean; // <--- Controlled by parent
  onClose: () => void; // <--- Controlled by parent
}

export default function EditJobModal({
  job,
  isOpen,
  onClose,
}: EditJobModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (!isOpen) return null; // Don't render if closed

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    formData.append("id", job.id);

    await updateJobApplication(formData);

    setIsLoading(false);
    onClose(); // Close modal on success
    router.refresh();
  }

  return (
    // Stop propagation so clicking the modal doesn't drag the card
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200 cursor-default"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-6 shrink-0">
          <h2 className="text-xl font-bold text-white">Edit Application</h2>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div
          className="overflow-y-auto p-6"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <form action={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase">
                  Company
                </label>
                <input
                  name="company"
                  defaultValue={job.company_name}
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase">
                  Role
                </label>
                <input
                  name="role"
                  defaultValue={job.position}
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase">
                  Location
                </label>
                <input
                  name="location"
                  defaultValue={job.location}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase">
                  Salary
                </label>
                <input
                  name="salary"
                  defaultValue={job.salary_range}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase">
                Job URL
              </label>
              <input
                name="jobUrl"
                defaultValue={job.job_url}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase">
                Notes
              </label>
              <textarea
                name="notes"
                defaultValue={job.notes}
                className="w-full h-20 rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-slate-200 focus:border-blue-500 focus:outline-none resize-none"
              />
            </div>

            <button
              disabled={isLoading}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Save size={18} /> Save Changes
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
