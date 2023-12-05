"use client";
import { createBoard } from "@/actions/create-board";
import { useAction } from "@/hooks/use-action";

import FormInput from "./form-input";
import FormButton from "./form-button";

function Form() {
    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess: (data) => {
            console.log("success", data);
        },
        onError: (error) => {
            console.log(error);
        },
    });
    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        execute({ title });
    };
    return (
        <form action={onSubmit}>
            <div className="flex flex-col space-y-2">
                <FormInput errors={fieldErrors} />
            </div>
            <FormButton />
        </form>
    );
}

export default Form;
