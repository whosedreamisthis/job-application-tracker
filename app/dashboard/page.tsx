import React, { Suspense } from "react";
import { getSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db.ts";
import { Board } from "@/lib/models";
import mongoose from "mongoose";
import KanbanBoard from "@/components/KanbanBoard";

async function getBoard(userId: string) {
  await connectDB();
  return _getBoard(userId);
}

async function _getBoard(userId: string) {
  "use cache";

  const board = await Board.findOne({
    userId,
  }).populate({
    path: "columns",
    populate: {
      path: "jobApplications",
      // model: "JobApplication",
    },
  });

  if (!board) return null;

  return JSON.parse(JSON.stringify(board.toObject ? board.toObject() : board));
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
