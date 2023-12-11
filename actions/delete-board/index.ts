"use server";

import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DeleteBoard } from "./schema";
import { createSafeAction } from "@/lib/create-safe-actions";
import { redirect } from "next/navigation";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
        return {
            error: "Not authenticated"
        };
    }

    const { id } = data;
    let board;
    try {
        board = await db.board.delete({
            where: {
                id,
                orgId,
            },
        });
        await createAuditLog({
            entityTitle: board.title,
            entityId: board.id,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.DELETE,
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