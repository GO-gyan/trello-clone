import { z } from "zod";

export const UpdateCard = z.object({
    boardId: z.string(),
    description: z.optional(
        z.string({
            required_error: "Title is required",
            invalid_type_error: "Description must be a string",
        }).min(3, {
            message: "Description is too short."
        })
    ),
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string",
    }).min(3, { message: "Title is too short" }),
    id: z.string()
})