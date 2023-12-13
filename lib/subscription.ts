import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
    const { orgId } = auth();
    if (!orgId) {
        return false;
    }

    const orgSubscription = await db.orgSubscription.findUnique({
        where: {
            orgId
        },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEndDate: true,
            stripeCustomerId: true,
            stripePriceId: true
        }
    });

    if (!orgSubscription) {
        return false;
    }

    const isValid = orgSubscription.stripePriceId && orgSubscription.stripeCurrentPeriodEndDate?.getTime()! + DAY_IN_MS > Date.now();
    return !!isValid;
}