"use server";

import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DeleteList } from "./schema";
import { createSafeAction } from "@/lib/create-safe-actions";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

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
        await createAuditLog({
            entityTitle: list.title,
            entityId: list.id,
            entityType: ENTITY_TYPE.LIST,
            action: ACTION.DELETE,
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