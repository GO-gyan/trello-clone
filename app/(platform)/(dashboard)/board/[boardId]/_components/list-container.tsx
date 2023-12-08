"use client";

import { useState, useEffect } from "react";
import { ListWithCards } from "@/types";
import ListForm from "./list-form";
import ListItem from "./list-item";
interface ListContainerProps {
    data: ListWithCards[];
    boardId: string;
}
function ListContainer({ data, boardId }: ListContainerProps) {
    const [orderedData, setOrderedData] = useState(data);

    useEffect(() => {
        setOrderedData(data);
    }, [data]);
    return (
        <ol className="flex gap-x-3 h-full">
            {orderedData.map((list, index) => (
                <ListItem key={list.id} data={list} index={index} />
            ))}
            <ListForm />
            <div class="flex-shrink-0 w-1" />
        </ol>
    );
}

export default ListContainer;
