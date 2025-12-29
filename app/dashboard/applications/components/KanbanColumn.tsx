"use client";

import { Droppable } from "@hello-pangea/dnd";
import KanbanCard from "./KanbanCard";

interface Props {
  id: string;
  title: string;
  color: string;
  jobs: any[];
  removeJob: (id: string) => void;
}

export default function KanbanColumn({
  id,
  title,
  color,
  jobs,
  removeJob,
}: Props) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-800/50 bg-slate-950/30 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800/50">
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              color.split(" ")[0]
            } shadow-[0_0_8px_currentColor]`}
          />
          <h3 className="font-bold text-slate-200 text-sm">{title}</h3>
        </div>
        <span className="rounded-md bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-400">
          {jobs.length}
        </span>
      </div>

      {/* Drop Zone */}
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            // ADDED: [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
            className={`flex-1 flex flex-col gap-3 overflow-y-auto p-3 transition-colors min-h-[150px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
              snapshot.isDraggingOver
                ? "bg-slate-900/50 ring-1 ring-blue-500/20"
                : ""
            }`}
          >
            {jobs.map((job, index) => (
              <KanbanCard
                key={job.id}
                job={job}
                index={index}
                removeJob={removeJob}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
