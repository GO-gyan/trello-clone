"use server";

import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UpdateBoard } from "./schema";
import { createSafeAction } from "@/lib/create-safe-actions";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
        return {
            error: "Not authenticated"
        };
    }

    const { id, title } = data;
    let board;
    try {
        board = await db.board.update({
            where: {
                id,
                orgId,
            },
            data: {
                title,
            },
        });

    } catch (error) {
        console.log(error);
        return {
            error: "Failed to update board"
        }

    }
    revalidatePath(`/board/${id}`);

    return {
        data: board
    };
}

export const updateBoard = createSafeAction(UpdateBoard, handler);