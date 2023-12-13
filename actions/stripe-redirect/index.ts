"use server";

import { InputType, ReturnType } from "./types";
import { auth, currentUser } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { StripeRedirect } from "./schema";
import { createSafeAction } from "@/lib/create-safe-actions";
import { absoluteUrl } from "@/lib/utils";
import { stripe } from "@/lib/stripe";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();
    const user = await currentUser();
    if (!userId || !orgId || !user) {
        return {
            error: "Not authenticated"
        };
    }

    const settingUrl = absoluteUrl(`/organization/${orgId}`);

    let url = "";

    try {
        const orgSubscription = await db.orgSubscription.findUnique({
            where: {
                orgId
            }
        });
        if (orgSubscription && orgSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: orgSubscription.stripeCustomerId,
                return_url: settingUrl
            });
            url = stripeSession.url;
        } else {
            const stripeSession = await stripe.checkout.sessions.create({
                customer_email: user.emailAddresses[0].emailAddress,
                payment_method_types: ["card"],
                mode: "subscription",
                success_url: settingUrl,
                cancel_url: settingUrl,
                billing_address_collection: "auto",
                line_items: [
                    {
                        price_data: {
                            currency: "USD",
                            product_data: {
                                name: "Taskify Pro",
                                description: "Unlimited tasks and projects",
                            },
                            unit_amount: 2000,
                            recurring: {
                                interval: "month"
                            },
                        },
                        quantity: 1
                    }
                ],
                metadata: {
                    orgId
                }
            });
            url = stripeSession.url || "";
        }
    } catch {
        return {
            error: "Failed to create subscription"
        };
    }

    revalidatePath(`/organization/${orgId}`);
    return {
        data: url
    };
}

export const stripeRedirect = createSafeAction(StripeRedirect, handler);