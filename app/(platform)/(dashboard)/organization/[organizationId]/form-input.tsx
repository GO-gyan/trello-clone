"use client";

import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";

interface FormInputProps {
    errors?: {
        title?: string[];
    };
}
function FormInput({ errors }: FormInputProps) {
    const { pending } = useFormStatus();
    return (
        <div>
            <Input id="title" name="title" placeholder="Enter a board title" required autoFocus disabled={pending} />
            {errors?.title ? (
                <div>
                    {errors.title.map((error) => (
                        <p key={error} className="text-red-500">
                            {error}
                        </p>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

export default FormInput;
