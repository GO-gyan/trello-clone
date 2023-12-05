"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FormSubmitProps {
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "primary";
}

function FormSubmit({ children, disabled, className, variant }: FormSubmitProps) {
    const { pending } = useFormStatus();
    return (
        <Button disabled={disabled || pending} className={cn(className)} type="submit" variant={variant} size="sm">
            {children}
        </Button>
    );
}

export default FormSubmit;
