"use server";

import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CopyCard } from "./schema";
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
        const cardToCopy = await db.card.findUnique({
            where: {
                id,
                list: {
                    board: {
                        orgId
                    }
                }
            },
        });

        if (!cardToCopy) {
            return {
                error: "Card not found"
            };
        }

        const lastCard = await db.card.findFirst({
            where: {
                listId: cardToCopy.listId
            },
            orderBy: {
                order: "desc"
            },
            select: {
                order: true
            }
        });

        const newOrder = lastCard ? lastCard.order + 1 : 1;

        card = await db.card.create({
            data: {
                title: `${cardToCopy.title} - Copy`,
                description: cardToCopy.description,
                listId: cardToCopy.listId,
                order: newOrder
            }
        });
        await createAuditLog({
            entityTitle: card.title,
            entityId: card.id,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.CREATE,
        });
    } catch (error) {
        return {
            error: "Failed to copy."
        }

    }
    revalidatePath(`/board/${boardId}`);
    return {
        data: card
    };
}

export const copyCard = createSafeAction(CopyCard, handler);