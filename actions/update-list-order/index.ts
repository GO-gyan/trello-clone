"use server";

import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UpdateListOrder } from "./schema";
import { createSafeAction } from "@/lib/create-safe-actions";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
        return {
            error: "Not authenticated"
        };
    }

    const { items, boardId } = data;
    let lists;
    try {
        const transaction = items.map((list) => db.list.update({
            where: {
                id: list.id,
                board: {
                    orgId
                }
            },
            data: {
                order: list.order
            }
        }));

        lists = await db.$transaction(transaction);
    } catch (error) {
        console.log(error);
        return {
            error: "Failed to reorder"
        }

    }
    revalidatePath(`/board/${boardId}`);

    return {
        data: lists
    };
}

export const updateListOrder = createSafeAction(UpdateListOrder, handler);