import connectDB from "@/lib/db.ts";
import { Board, Column } from "./models";

const DEFAULT_COLUMNS = [
  { name: "Wish List", order: 0 },
  { name: "Applied", order: 1 },
  { name: "Interviewing", order: 2 },
  { name: "Offer", order: 3 },
  { name: "Rejected", order: 4 },
];

export async function initializeUserBoard(userId: string) {
  try {
    await connectDB();

    const existingBoard = await Board.findOne({ userId, name: "Job Hunt" });

    if (existingBoard) {
      return existingBoard;
    }

    const board = await Board.create({ userId, name: "Job Hunt", columns: [] });

    const columns = await Promise.all(
      DEFAULT_COLUMNS.map(async (column) => {
        return await Column.create({
          boardId: board._id,
          jobApplications: [],
          ...column,
        });
      }),
    );

    board.columns = columns.map((col) => col._id);
    await board.save();

    return board;
  } catch (err) {
    throw err;
  }
}
