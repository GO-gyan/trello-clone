"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { useAction } from "@/hooks/use-action";
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useCardModal } from "@/hooks/use-card-modal";

interface ActionsProps {
    data: CardWithList;
}

function Actions({ data }: ActionsProps) {
    const params = useParams();
    const cardModal = useCardModal();
    const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(copyCard, {
        onSuccess: (copyData) => {
            toast.success(`Card "${copyData.title}"copied!`);
            cardModal.onClose();
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(deleteCard, {
        onSuccess: (deleteData) => {
            toast.success(`Card "${deleteData.title}" deleted!`);
            cardModal.onClose();
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const onCopy = () => {
        const boardId = params.boardId as string;
        executeCopyCard({ boardId, id: data.id });
    };
    const onDelete = () => {
        const boardId = params.boardId as string;
        executeDeleteCard({ boardId, id: data.id });
    };
    return (
        <div className="space-y-2 mt-2">
            <p className="text-xs font-semibold">Actions</p>
            <Button
                variant="gray"
                size="inline"
                className="w-full justify-start"
                onClick={onCopy}
                disabled={isLoadingCopy}
            >
                <Copy className="h-4 w-4 mr-2" />
                Copy
            </Button>
            <Button
                variant="gray"
                size="inline"
                className="w-full justify-start"
                onClick={onDelete}
                disabled={isLoadingDelete}
            >
                <Trash className="h-4 w-4 mr-2" />
                Delete
            </Button>
        </div>
    );
}

Actions.Skeleton = function ActionsSkeleton() {
    return (
        <div className="space-y-2 mt-2">
            <Skeleton className="w-20 h-4 bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
        </div>
    );
};
export default Actions;
