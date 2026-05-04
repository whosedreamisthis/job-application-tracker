"use client";
import React from "react";
import { Board } from "@/lib/models/models.types";
import {
  Award,
  Calendar,
  CheckCircle2,
  Mic,
  MoreVertical,
  Trash2,
  XCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Column } from "@/lib/models/models.types";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import board from "@/lib/models/board.ts";
import CreateJobApplicationDialog from "@/components/CreateJobDialog.tsx";
import JobApplication from "@/lib/models/models.types.ts";
import JobApplicationCard from "@/components/JobApplicationCard.tsx";

interface KanbanBoardProps {
  board: Board;
  userId: string;
}

interface ColConfig {
  color: string;
  icon: React.ReactNode;
}

const COLUMN_CONFIG: Array<ColConfig> = [
  {
    color: "bg-cyan-500",
    icon: <Calendar className="w-4 h-4" />,
  },
  {
    color: "bg-purple-500",
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
  {
    color: "bg-green-500",
    icon: <Mic className="w-4 h-4" />,
  },
  {
    color: "bg-yellow-500",
    icon: <Award className="w-4 h-4" />,
  },
  {
    color: "bg-red-500",
    icon: <XCircle className="w-4 h-4" />,
  },
];

function DroppableColumn({
  column,
  config,
  boardId,
  sortedColumns,
}: {
  column: Column;
  config: ColConfig;
  boardId: string;
  sortedColumns: Column[];
}) {
  const sortedJobs =
    column.jobApplications.sort((a, b) => a.order - b.order) || [];
  return (
    <Card className="overflow-hidden min-w-75 shrink-0  rounded-none rounded-t-lg border-none shadow-md p-0 mb-10">
      {/* The color class should be on the Header itself */}
      <CardHeader className={`${config.color}  rounded-none text-white  py-3`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Ensure the icon has a set size so it doesn't distort */}
            {config.icon}
            <CardTitle className="text-white text-base font-semibold">
              {column.name}
            </CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                className="bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 border-none cursor-pointer h-6 w-6 text-white hover:text-white/20"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-max px-2">
              <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                <Trash2 className="mr-2 h-4 w-4" /> <span>Delete Column</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 pt-4 bg-gray-50/50 min-h-100 rounded-b-lg">
        {sortedJobs.map((job) => (
          <SortableJobCard
            key={job._id}
            job={{ ...job, columnId: job.columnId || column._id }}
            columns={sortedColumns}
          />
        ))}
        <CreateJobApplicationDialog columnId={column._id} boardId={boardId} />
      </CardContent>

      {/* If config.color is a light color, change text-white to text-slate-900 */}
    </Card>
  );
}

function SortableJobCard({
  job,
  columns,
}: {
  job: JobApplication;
  columns: Column[];
}) {
  return (
    <div>
      <JobApplicationCard job={job} columns={columns} />
    </div>
  );
}

const KanbanBoard = ({ board, userId }: KanbanBoardProps) => {
  const columns = board.columns;
  const sortedColumns = columns?.sort((a, b) => a.order - b.order) || [];

  return (
    <>
      <div>
        <div>
          {columns.map((column, key) => {
            const config = COLUMN_CONFIG[key] || {
              color: "bg-gray-500",
              icon: <Calendar className="w-4 h-4" />,
            };
            return (
              <DroppableColumn
                key={key}
                column={column}
                config={config}
                boardId={board._id}
                sortedColumns={sortedColumns}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default KanbanBoard;
