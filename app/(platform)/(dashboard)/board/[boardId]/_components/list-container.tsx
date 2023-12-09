"use client";

import { useState, useEffect } from "react";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { updateCardOrder } from "@/actions/update-card-order";
import { ListWithCards } from "@/types";

import ListForm from "./list-form";
import ListItem from "./list-item";
import { toast } from "sonner";
interface ListContainerProps {
    data: ListWithCards[];
    boardId: string;
}

function reorder<T>(list: T[], startIdex: number, endIdex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIdex, 1);
    result.splice(endIdex, 0, removed);
    return result;
}

function ListContainer({ data, boardId }: ListContainerProps) {
    const [orderedData, setOrderedData] = useState(data);

    const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
        onSuccess: () => {
            toast.success("List reordered!");
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
        onSuccess: () => {
            toast.success("Card reordered!");
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    useEffect(() => {
        setOrderedData(data);
    }, [data]);

    const onDragEnd = (result: any) => {
        const { source, destination, type } = result;
        if (!destination) {
            return;
        }
        // if dropped in the same position
        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return;
        }
        //if user moves a list
        if (type === "list") {
            const newLists = reorder(orderedData, source.index, destination.index).map((item, index) => ({
                ...item,
                order: index,
            }));
            setOrderedData(newLists);
            executeUpdateListOrder({
                boardId,
                items: newLists,
            });
        }

        // if user move a card
        if (type === "card") {
            let newOrderedData = [...orderedData];
            const sourceList = newOrderedData.find((list) => list.id === source.droppableId);
            const destinationList = newOrderedData.find((list) => list.id === destination.droppableId);

            if (!sourceList || !destinationList) {
                return;
            }
            // check if the cards exists on the source list
            if (!sourceList.cards) {
                sourceList.cards = [];
            }

            //check if cards list exists on the destination list
            if (!destinationList.cards) {
                destinationList.cards = [];
            }

            // Moving the card in the same list
            if (source.droppableId === destination.droppableId) {
                const newCards = reorder(sourceList.cards, source.index, destination.index);
                newCards.forEach((card, index) => {
                    card.order = index;
                });
                sourceList.cards = newCards;
                setOrderedData(newOrderedData);
                executeUpdateCardOrder({
                    boardId,
                    items: newCards,
                });
            } else {
                // Moving the card from one list to another
                const [removedCard] = sourceList.cards.splice(source.index, 1);

                removedCard.listId = destination.droppableId;
                destinationList.cards.splice(destination.index, 0, removedCard);

                sourceList.cards.forEach((card, index) => {
                    card.order = index;
                });
                destinationList.cards.forEach((card, index) => {
                    card.order = index;
                });
                setOrderedData(newOrderedData);
                executeUpdateCardOrder({
                    boardId,
                    items: destinationList.cards,
                });
            }
        }
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="lists" type="list" direction="horizontal">
                {(provided) => (
                    <ol {...provided.droppableProps} ref={provided.innerRef} className="flex gap-x-3 h-full">
                        {orderedData.map((list, index) => (
                            <ListItem key={list.id} data={list} index={index} />
                        ))}
                        {provided.placeholder}
                        <ListForm />
                        <div className="flex-shrink-0 w-1" />
                    </ol>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default ListContainer;
