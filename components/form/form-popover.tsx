"use client";

import { X } from "lucide-react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { FormInput } from "./form-input";
import FormSubmit from "./form-submit";

interface FormPopoverProps {
    children: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    sideOffset?: number;
}

function FormPopover({ children, side = "bottom", align, sideOffset = 0 }: FormPopoverProps) {
    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess: (data) => {
            console.log(data);
            toast.success("Board created successfully");
        },
        onError: (error) => {
            console.log(error);
            toast.error("Board creation failed");
        },
    });
    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;

        execute({ title });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent side={side} align={align} sideOffset={sideOffset} className="w-80 pt-3">
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">Create board</div>
                <PopoverClose asChild>
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <form action={onSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <FormInput
                            id="title"
                            label="Board title"
                            placeholder="Enetr board title"
                            type="text"
                            errors={fieldErrors}
                        />
                    </div>
                    <FormSubmit className="w-full" variant="primary">
                        Create
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    );
}

export default FormPopover;
