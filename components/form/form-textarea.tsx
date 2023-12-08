"use client";

import { useFormStatus } from "react-dom";
import { KeyboardEventHandler, forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";
import FormErrors from "./form-errors";

interface FormTextareaProps {
    id: string;
    label?: string;
    placeholder?: string;
    defaultValue?: string;
    onBlur?: () => void;
    onClick?: () => void;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>;
    className?: string;
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
    (
        { id, label, placeholder, defaultValue, onBlur, onClick, required, disabled, errors, className, onKeyDown },
        ref
    ) => {
        const { pending } = useFormStatus();
        return (
            <div className="space-y-2 w-full">
                <div className="space-y-1 w-full">
                    {label ? (
                        <Label htmlFor={id} className="text-xs font-semibold text-neutral-700">
                            {label}
                        </Label>
                    ) : null}
                    <Textarea
                        onKeyDown={onKeyDown}
                        onBlur={onBlur}
                        onClick={onClick}
                        name={id}
                        id={id}
                        ref={ref}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        required={required}
                        disabled={pending || disabled}
                        aria-describedby={`${id}-error`}
                        className={cn(
                            "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm",
                            className
                        )}
                    />
                </div>
                <FormErrors id={id} errors={errors} />
            </div>
        );
    }
);

FormTextarea.displayName = "FormTextarea";

export default FormTextarea;
