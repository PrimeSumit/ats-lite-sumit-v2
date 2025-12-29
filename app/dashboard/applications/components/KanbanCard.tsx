"use client";

import { Draggable } from "@hello-pangea/dnd";
import { formatDistanceToNow } from "date-fns";
import {
  GripVertical,
  Building2,
  MapPin,
  DollarSign,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import EditJobModal from "../../components/EditJobModal";
import { deleteJobApplication } from "@/app/dashboard/actions";
import { useRouter } from "next/navigation";

// Accept removeJob prop
export default function KanbanCard({
  job,
  index,
  removeJob,
}: {
  job: any;
  index: number;
  removeJob: (id: string) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (confirm("Are you sure you want to delete this application?")) {
      setIsMenuOpen(false);

      // 1. INSTANTLY REMOVE FROM UI (Optimistic Update)
      removeJob(job.id);

      try {
        // 2. Background Server Delete
        await deleteJobApplication(job.id);
        router.refresh();
      } catch (error) {
        console.error("Delete failed", error);
        alert("Failed to delete from server.");
      }
    }
  }

  return (
    <>
      <Draggable draggableId={job.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              cursor: snapshot.isDragging ? "grabbing" : "grab",
              zIndex: snapshot.isDragging ? 9999 : "auto",
            }}
            className="mb-0 outline-none"
            onClick={() => setIsMenuOpen(false)}
          >
            <div
              className={`group relative flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-900 p-4 shadow-sm transition-all hover:border-slate-700 hover:shadow-md ${
                snapshot.isDragging
                  ? "shadow-2xl ring-2 ring-blue-500/50 bg-slate-800"
                  : ""
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-800 font-bold text-slate-300 ring-1 ring-white/5">
                    {job.company_name?.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200 line-clamp-1 text-sm">
                      {job.position}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                      <Building2 size={10} />
                      <span>{job.company_name}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-wrap gap-2 mt-1">
                {job.salary_range && (
                  <div className="flex items-center gap-1 rounded bg-slate-800/50 px-2 py-1 text-[10px] font-medium text-green-400 border border-slate-800">
                    <DollarSign size={10} /> {job.salary_range}
                  </div>
                )}
                {job.location && (
                  <div className="flex items-center gap-1 rounded bg-slate-800/50 px-2 py-1 text-[10px] font-medium text-slate-400 border border-slate-800">
                    <MapPin size={10} /> {job.location}
                  </div>
                )}
              </div>

              {/* Footer with Menu Logic */}
              <div className="mt-2 flex items-center justify-between border-t border-slate-800 pt-3 relative">
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMenuOpen(!isMenuOpen);
                    }}
                    className="flex items-center gap-1 text-slate-600 hover:text-slate-300 transition-colors p-1 rounded hover:bg-slate-800"
                  >
                    <GripVertical size={14} />
                  </button>

                  {isMenuOpen && (
                    <div className="absolute bottom-full left-0 mb-2 w-32 overflow-hidden rounded-lg border border-slate-700 bg-slate-900 shadow-xl z-[100] animate-in zoom-in-95 duration-100">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsEditOpen(true);
                          setIsMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-left"
                      >
                        <Pencil size={12} /> Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete();
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-left"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-slate-500">
                  {job.created_at
                    ? formatDistanceToNow(new Date(job.created_at)) + " ago"
                    : "Just now"}
                </p>
              </div>
            </div>
          </div>
        )}
      </Draggable>

      <EditJobModal
        job={job}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />
    </>
  );
}
