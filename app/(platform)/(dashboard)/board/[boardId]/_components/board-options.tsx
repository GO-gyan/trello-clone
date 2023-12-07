"use client";

import { MoreHorizontal, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { deleteBoard } from "@/actions/delete-board";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";

interface BoardOptionsProps {
    id: string;
}
function BoardOptions({ id }: BoardOptionsProps) {
    const { execute, isLoading } = useAction(deleteBoard, {
        onError: (error) => {
            toast.error(error);
        },
    });

    const onDelete = () => {
        execute({ id });
    };
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="transparent" className="h-auto w-auto p-2">
                    <MoreHorizontal className="w-5 h-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">Board actions</div>
                <PopoverClose asChild>
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
                        <X className="w-5 h-5" />
                    </Button>
                </PopoverClose>
                <Button
                    variant="destructive"
                    onClick={onDelete}
                    disabled={isLoading}
                    className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                >
                    Delete this board
                </Button>
            </PopoverContent>
        </Popover>
    );
}

export default BoardOptions;
