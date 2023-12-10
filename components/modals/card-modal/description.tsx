"use client";

import FormSubmit from "@/components/form/form-submit";
import FormTextarea from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { toast } from "sonner";

interface DescriptionProps {
    data: CardWithList;
}

function Description({ data }: DescriptionProps) {
    const params = useParams();
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);

    const textareaRef = useRef<ElementRef<"textarea">>(null);
    const formRef = useRef<ElementRef<"form">>(null);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            textareaRef.current?.focus();
        });
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            event.preventDefault();
            disableEditing();
        }
    };

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    const { execute, fieldErrors } = useAction(updateCard, {
        onSuccess: (cardData) => {
            queryClient.invalidateQueries({
                queryKey: ["card", data.id],
            });
            toast.success(`Card "${data.title}" updated!`);
            disableEditing();
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const onSubmit = (formData: FormData) => {
        const description = formData.get("description") as string;
        const boardId = params.boardId as string;
        if (description === data.description) {
            return;
        }
        execute({ description, boardId, id: data.id });
    };

    return (
        <div className="flex items-start gap-x-3 w-full">
            <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
            <div className="w-full">
                <p className="font-semibold text-neutral-700 mb-2">Description</p>
                {isEditing ? (
                    <form ref={formRef} action={onSubmit} className="gap-y-2">
                        <FormTextarea
                            id="description"
                            className="w-full mt-2 mb-2"
                            placeholder="Add a more detailed description...."
                            defaultValue={data.description || undefined}
                            ref={textareaRef}
                            errors={fieldErrors}
                        />
                        <div className="flex items-center gap-y-2">
                            <FormSubmit variant="primary">Save</FormSubmit>
                            <Button type="button" size="sm" variant="ghost" onClick={disableEditing}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div
                        role="button"
                        className="min-h-[78px] text-sm font-medium rounded-md bg-neutral-200 py-3 px-3.5"
                        onClick={enableEditing}
                    >
                        {data.description || "Add a more detailed description...."}
                    </div>
                )}
            </div>
        </div>
    );
}

Description.Skeleton = function DescriptionSkeleton() {
    return (
        <div className="flex items-start gap-x-3 w-full">
            <Skeleton className="h-6 w-6 bg-neutral-200" />
            <div className="w-full">
                <Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
                <Skeleton className="h-[78px] w-full mb-2 bg-neutral-200" />
            </div>
        </div>
    );
};
export default Description;
