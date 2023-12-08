"use client";

import { ElementRef, useRef, useState } from "react";
import { ListWithCards } from "@/types";
import ListHeader from "./list-header";
import CardForm from "./card-form";

interface ListItemProps {
    data: ListWithCards;
    index: number;
}
function ListItem({ data, index }: ListItemProps) {
    const textareaRef = useRef<ElementRef<"textarea">>(null);

    const [isEditing, setIsEditing] = useState(false);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            textareaRef.current?.focus();
        }, 0);
    };
    const disableEditing = () => {
        setIsEditing(false);
    };
    return (
        <li className="shrink-0 h-full w-[272px] select-none">
            <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
                <ListHeader onAddCard={enableEditing} data={data} />
                <CardForm
                    ref={textareaRef}
                    listId={data.id}
                    isEditing={isEditing}
                    disableEditing={disableEditing}
                    enableEditing={enableEditing}
                />
            </div>
        </li>
    );
}

export default ListItem;
