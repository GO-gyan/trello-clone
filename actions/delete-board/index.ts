"use server";

import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DeleteBoard } from "./schema";
import { createSafeAction } from "@/lib/create-safe-actions";
import { redirect } from "next/navigation";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
        return {
            error: "Not authenticated"
        };
    }

    const { id } = data;
    try {
        await db.board.delete({
            where: {
                id,
                orgId,
            },
        });

    } catch (error) {
        return {
            error: "Failed to delete the board"
        }

    }
    revalidatePath(`/organization/${orgId}`);
    redirect(`/organization/${orgId}`);
}

export const deleteBoard = createSafeAction(DeleteBoard, handler);