"use client";

import { ListWithCards } from "@/types";
import ListForm from "./list-form";
interface ListContainerProps {
    data: ListWithCards[];
    boardId: string;
}
function ListContainer({ data, boardId }: ListContainerProps) {
    return (
        <ol>
            <ListForm />
            <div class="flex-shrink-0 w-1" />
        </ol>
    );
}

export default ListContainer;
