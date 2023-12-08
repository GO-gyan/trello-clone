"use server";

import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UpdateList } from "./schema";
import { createSafeAction } from "@/lib/create-safe-actions";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
        return {
            error: "Not authenticated"
        };
    }

    const { id, title, boardId } = data;
    let list;
    try {
        list = await db.list.update({
            where: {
                id,
                boardId,
                board: {
                    orgId
                }
            },
            data: {
                title,
            },
        });

    } catch (error) {
        console.log(error);
        return {
            error: "Failed to update."
        }

    }
    revalidatePath(`/board/${id}`);

    return {
        data: list
    };
}

export const updateList = createSafeAction(UpdateList, handler);