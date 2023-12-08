"use client";

import FormSubmit from "@/components/form/form-submit";
import FormTextarea from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { forwardRef, useRef, ElementRef, KeyboardEventHandler } from "react";
import { useParams } from "next/navigation";

import { useAction } from "@/hooks/use-action";
import { createCard } from "@/actions/create-card";
import { useOnClickOutside, useEventListener } from "usehooks-ts";
import { toast } from "sonner";

interface CardFormProps {
    listId: string;
    isEditing: boolean;
    enableEditing: () => void;
    disableEditing: () => void;
}

const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
    ({ listId, isEditing, enableEditing, disableEditing }, ref) => {
        const params = useParams();
        const formRef = useRef<ElementRef<"form">>(null);

        const { execute, fieldErrors } = useAction(createCard, {
            onSuccess: (data) => {
                toast.success(`Card "${data.title}" created!`);
                formRef.current?.reset();
            },
            onError: (error) => {
                toast.error(error);
            },
        });

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                disableEditing();
            }
        };

        useOnClickOutside(formRef, disableEditing);
        useEventListener("keydown", onKeyDown);

        const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                formRef.current?.requestSubmit();
            }
        };

        const onSubmit = (formData: FormData) => {
            const title = formData.get("title") as string;
            const listId = formData.get("listId") as string;
            const boardId = formData.get("boardId") as string;

            execute({
                title,
                listId,
                boardId,
            });
        };

        if (isEditing) {
            return (
                <form className="m-1 py-0.5 px-1 space-y-4" ref={formRef} action={onSubmit}>
                    <FormTextarea
                        id="title"
                        ref={ref}
                        placeholder="Enter a title for this card..."
                        onKeyDown={onTextareaKeyDown}
                        errors={fieldErrors}
                    />
                    <input hidden id="listId" name="listId" value={listId} />
                    <input hidden id="boardId" name="boardId" value={listId} />
                    <div className="flex items-center gap-x-1">
                        <FormSubmit variant="primary">Add card</FormSubmit>
                        <Button onClick={disableEditing} size="sm" variant="ghost">
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                </form>
            );
        }
        return (
            <div className="pt-2 px-2">
                <Button
                    onClick={enableEditing}
                    className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
                    size="sm"
                    variant="ghost"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add a card
                </Button>
            </div>
        );
    }
);

CardForm.displayName = "CardForm";

export default CardForm;
