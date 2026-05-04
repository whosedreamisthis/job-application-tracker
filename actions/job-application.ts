"use server";

import JobApplication from "@/lib/models/job-application";
import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db.ts";
import { Board, Column } from "@/lib/models";
import { revalidatePath } from "next/cache";

interface JobApplicationData {
  columnId: string;
  boardId: string;
  tags?: string[];
  company: string;
  position: string;
  location?: string;
  notes?: string;
  salary?: string;
  jobUrl?: string;

  description: string;
}
export const createJobApplication = async (data: JobApplicationData) => {
  const session = await getSession();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  await connectDB();

  const {
    columnId,
    boardId,
    tags,
    company,
    position,
    location,
    notes,
    salary,
    jobUrl,
    description,
  } = data;

  if (!company || !position || !columnId || !boardId) {
    return { error: "Missing required fields" };
  }

  const board = await Board.findOne({
    _id: boardId,
    userId: session.user.id,
  });

  if (!board) {
    return { error: "Board not found" };
  }

  const column = await Column.findOne({
    _id: columnId,
    boardId: boardId,
  });

  if (!column) {
    return { error: "Column not found" };
  }

  const maxOrder = (await JobApplication.findOne({ columnId })
    .sort({ order: -1 })
    .select("order")
    .lean()) as { order: number } | null;

  const jobApplication = await JobApplication.create({
    userId: session.user.id,
    columnId,
    boardId,
    tags: tags || [],
    company,
    position,
    location,
    notes,
    salary,
    jobUrl,
    description,
    status: "applied",
    order: maxOrder ? maxOrder.order + 1 : 0,
  });

  const updatedColumn = await Column.findByIdAndUpdate(
    columnId,
    { $push: { jobApplications: jobApplication._id } },
    { new: true }, // This ensures the operation waits for the update to complete
  );

  if (!updatedColumn) {
    console.error("Column update failed - record not found");
  }

  // revalidatePath();
  return { data: JSON.parse(JSON.stringify(jobApplication)) };
};
