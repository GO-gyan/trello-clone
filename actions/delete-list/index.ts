"use server";

import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DeleteList } from "./schema";
import { createSafeAction } from "@/lib/create-safe-actions";
import { redirect } from "next/navigation";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
        return {
            error: "Not authenticated"
        };
    }

    let list;

    const { id, boardId } = data;
    try {
        list = await db.list.delete({
            where: {
                id,
                boardId,
                board: {
                    orgId
                }
            },
        });

    } catch (error) {
        return {
            error: "Failed to delete."
        }

    }
    revalidatePath(`/board/${boardId}`);
    return {
        data: list
    };
}

export const deleteList = createSafeAction(DeleteList, handler);