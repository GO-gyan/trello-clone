"use client";

import { useQuery } from "@tanstack/react-query";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";

import React from "react";
import { CardWithList } from "@/types";
import { fetcher } from "@/lib/fetcher";
import CardModalHeader from "./header";

function CardModal() {
    const id = useCardModal((state) => state.id);
    const isOpen = useCardModal((state) => state.isOpen);
    const onClose = useCardModal((state) => state.onClose);

    const { data: cardData } = useQuery<CardWithList>({
        queryKey: ["card", id],
        queryFn: () => fetcher(`/api/cards/${id}`),
    });
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                {!cardData ? <CardModalHeader.Skeleton /> : <CardModalHeader data={cardData} />}
            </DialogContent>
        </Dialog>
    );
}

export default CardModal;
