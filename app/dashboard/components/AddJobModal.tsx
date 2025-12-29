"use client";

import { useState } from "react";
import { X, Plus, Loader2 } from "lucide-react";
import { addJobApplication } from "../actions";
import { useRouter } from "next/navigation";

export default function AddJobModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    await addJobApplication(formData);
    setIsLoading(false);
    setIsOpen(false);
    router.refresh();
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
      >
        <Plus size={18} />
        <span className="hidden sm:inline">Add Application</span>
        <span className="sm:hidden">Add</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          {/* Modal Content Box */}
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col">
            {/* Header (Fixed at top of modal) */}
            <div className="flex items-center justify-between border-b border-slate-800 p-6 shrink-0">
              <h2 className="text-xl font-bold text-white">New Application</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Form Area */}
            <div className="overflow-y-auto p-6">
              <form action={handleSubmit} className="space-y-4">
                {/* Row 1 */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase">
                      Company
                    </label>
                    <input
                      name="company"
                      required
                      placeholder="e.g. Google"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase">
                      Role
                    </label>
                    <input
                      name="role"
                      required
                      placeholder="e.g. Frontend Dev"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase">
                      Location
                    </label>
                    <input
                      name="location"
                      placeholder="e.g. Remote"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase">
                      Salary
                    </label>
                    <input
                      name="salary"
                      placeholder="e.g. $120k"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase">
                      Status
                    </label>
                    <select
                      name="status"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-slate-200 focus:border-blue-500 focus:outline-none appearance-none"
                    >
                      <option value="saved">Wishlist</option>
                      <option value="applied">Applied</option>
                      <option value="interviewing">Interviewing</option>
                      <option value="offer">Offer</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* URL */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase">
                    Job URL
                  </label>
                  <input
                    name="jobUrl"
                    placeholder="https://..."
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    placeholder="Referral from..."
                    className="w-full h-20 rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-slate-200 focus:border-blue-500 focus:outline-none resize-none"
                  />
                </div>

                {/* Submit Button (Inside Form) */}
                <button
                  disabled={isLoading}
                  className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Save Application"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
