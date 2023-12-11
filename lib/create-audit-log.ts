import { auth, currentUser } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";

interface Props {
    action: ACTION
    entityType: ENTITY_TYPE
    entityId: string
    entityTitle: string
};

export const createAuditLog = async (props: Props) => {
    try {
        const { orgId } = auth();
        const user = await currentUser();

        if (!orgId || !user) {
            throw new Error("User not found!");
        }

        const { entityType, entityId, entityTitle, action } = props;

        await db.auditLog.create({
            data: {
                action,
                entityType,
                entityId,
                entityTitle,
                userId: user.id,
                orgId,
                useImage: user?.imageUrl,
                userName: user?.firstName + " " + user?.lastName
            }
        });
    } catch (error) {
        console.log("[AUDIT_LOG_ERROR]", error);
    }
}