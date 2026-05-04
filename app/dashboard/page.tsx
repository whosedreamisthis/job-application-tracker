import React, { Suspense } from "react";
import { getSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db.ts";
import { Board } from "@/lib/models";
import mongoose from "mongoose";
import KanbanBoard from "@/components/KanbanBoard";

async function getBoard(userId: string) {
  "use cache";

  await connectDB();

  const board = await Board.findOne({
    userId,
  })
    .populate({
      path: "columns",
      populate: {
        path: "jobApplications",
        // model: "JobApplication",
      },
    })
    .lean();

  if (!board) return null;

  return {
    ...board,
    _id: board._id.toString(),
    columns: board.columns.map((col: any) => ({
      ...col,
      _id: col._id.toString(),
      boardId: col.boardId.toString(),
      jobApplications: col.jobApplications.map((job: any) => ({
        ...job,
        _id: job._id.toString(),
        columnId: job.columnId.toString(),
        boardId: job.boardId.toString(),
        // Convert Dates to strings
        createdAt: job.createdAt?.toISOString(),
        updatedAt: job.updatedAt?.toISOString(),
      })),
    })),
  };
}

async function DashboardPage() {
  const session = await getSession();
  const board = await getBoard(session?.user.id ?? "");

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black">{board.name}</h1>
          <p className="text-gray-600">Track your job applications</p>
        </div>
        <KanbanBoard
          board={JSON.parse(JSON.stringify(board))}
          userId={session.user.id}
        />
      </div>
    </div>
  );
}

const Dashboard = async () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DashboardPage />
    </Suspense>
  );
};

export default Dashboard;
