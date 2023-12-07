"use client";

import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import FormErrors from "./form-errors";

interface FormInputProps {
    id: string;
    label?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>;
    className?: string;
    defaultValue?: string;
    autoFocus?: boolean;
    name?: string;
    pattern?: string;
    autoComplete?: string;
    maxLength?: number;
    minLength?: number;
    readOnly?: boolean;
    tabIndex?: number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    (
        {
            id,
            label,
            type = "text",
            placeholder,
            required,
            disabled,
            errors,
            className,
            defaultValue = "",
            onBlur,
            ...props
        },
        ref
    ) => {
        const { pending } = useFormStatus();
        return (
            <div className="space-y-2">
                <div className="space-y-1">
                    {label ? (
                        <Label htmlFor={id} className="text-xs font-semibold text-neutral-700">
                            {label}
                        </Label>
                    ) : null}
                    <Input
                        onBlur={onBlur}
                        defaultValue={defaultValue}
                        ref={ref}
                        id={id}
                        type={type}
                        name={id}
                        placeholder={placeholder}
                        required={required}
                        disabled={disabled || pending}
                        className={cn("text-sm px-2 py-1 h-7", className)}
                        aria-describedby={`${id}-error`}
                        {...props}
                    />
                </div>
                <FormErrors id={id} errors={errors} />
            </div>
        );
    }
);

FormInput.displayName = "FormInput";
