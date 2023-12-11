"use server";

import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DeleteCard } from "./schema";
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

    let card;

    const { id, boardId } = data;
    try {
        card = await db.card.delete({
            where: {
                id,
                list: {
                    board: {
                        orgId
                    },
                },
            },
        });
        await createAuditLog({
            entityTitle: card.title,
            entityId: card.id,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.DELETE,
        });
    } catch (error) {
        return {
            error: "Failed to delete."
        }

    }
    revalidatePath(`/board/${boardId}`);
    return {
        data: card
    };
}

export const deleteCard = createSafeAction(DeleteCard, handler);