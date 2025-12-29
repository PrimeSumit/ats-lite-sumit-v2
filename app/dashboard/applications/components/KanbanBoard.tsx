"use client";

import { useState, useEffect } from "react"; // <--- Import useEffect
import { DragDropContext } from "@hello-pangea/dnd";
import KanbanColumn from "./KanbanColumn";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const COLUMNS = [
  { id: "saved", title: "Wishlist", color: "bg-slate-500 text-slate-500" },
  { id: "applied", title: "Applied", color: "bg-blue-500 text-blue-500" },
  {
    id: "interviewing",
    title: "Interviewing",
    color: "bg-purple-500 text-purple-500",
  },
  { id: "offer", title: "Offer", color: "bg-green-500 text-green-500" },
  { id: "rejected", title: "Rejected", color: "bg-red-500 text-red-500" },
];

export default function KanbanBoard({ initialJobs }: { initialJobs: any[] }) {
  const [jobs, setJobs] = useState(initialJobs);
  const router = useRouter();
  const supabase = createClient();

  // FIX 1: Sync state when server data changes (Solves the "Need to Reload" issue)
  useEffect(() => {
    setJobs(initialJobs);
  }, [initialJobs]);

  // FIX 2: Instant Delete Handler
  const removeJob = (jobId: string) => {
    setJobs((currentJobs) => currentJobs.filter((job) => job.id !== jobId));
  };

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // Optimistic Update
    const newStatus = destination.droppableId;
    const updatedJobs = jobs.map((job) =>
      job.id === draggableId ? { ...job, status: newStatus } : job
    );
    setJobs(updatedJobs);

    // DB Update
    const { error } = await supabase
      .from("job_applications")
      .update({ status: newStatus })
      .eq("id", draggableId);

    if (error) {
      console.error("Update failed:", error);
      setJobs(initialJobs);
    } else {
      router.refresh();
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-full gap-4 overflow-x-auto pb-4 sm:gap-6 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {COLUMNS.map((col) => (
          <div key={col.id} className="min-w-[85vw] flex-1 md:min-w-[320px]">
            <KanbanColumn
              id={col.id}
              title={col.title}
              color={col.color}
              jobs={jobs.filter((j) => j.status === col.id)}
              removeJob={removeJob} // <--- Pass the function down
            />
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
