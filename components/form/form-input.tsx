"use client";

import { useFormStatus } from "react-dom";

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
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
            autoFocus,
            name,
            pattern,
            autoComplete,
            maxLength,
            minLength,
            readOnly,
            tabIndex,
            onChange,
            onKeyUp,
            onFocus,
            onBlur,
            ...props
        },
        ref
    ) => {
        const { pending } = useFormStatus();
        return (
            <div className="space-y-2">
                <div className="space-y-1"></div>
            </div>
        );
    }
);

FormInput.displayName = "FormInput";
