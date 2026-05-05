import type { ReactNode } from 'react';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from '@/components/ui/field';

type FormFieldProps = {
    name: string;
    label: string;
    description?: string;
    error?: string;
    orientation?: 'horizontal' | 'vertical';
    className?: string;
    children: ReactNode;
};
export function FormField({
    name,
    label,
    error,
    description,
    children,
    orientation = 'vertical',
    className,
}: FormFieldProps) {
    return (
        <Field className={className} orientation={orientation}>
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
            {children}
            {description && <FieldDescription>{description}</FieldDescription>}
            <FieldError>{error}</FieldError>
        </Field>
    );
}
