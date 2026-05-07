import { Eye, EyeOff } from 'lucide-react';
import type { ComponentProps, Ref } from 'react';
import { useState } from 'react';
import TextLink from '@/components/text-link';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { request } from '@/routes/password';

export default function PasswordInput({
    className,
    ref,
    canReset = false,
    error,
    label,
    id,
    forgotPasswordLabel,
    ...props
}: Omit<ComponentProps<'input'>, 'type'> & {
    ref?: Ref<HTMLInputElement>;
    canReset?: boolean;
    error?: string;
    label?: string;
    forgotPasswordLabel?: string;
}) {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id ?? 'password';
    const displayLabel = label ?? 'Password';

    return (
        <Field>
            <div className="flex justify-between">
                <FieldLabel htmlFor={inputId}>{displayLabel}</FieldLabel>
                {canReset && (
                    <TextLink href={request()} className="text-sm" tabIndex={5}>
                        {forgotPasswordLabel ?? 'Forgot password?'}
                    </TextLink>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <div className="relative">
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        className={cn('pr-10', className)}
                        aria-label={displayLabel}
                        id={inputId}
                        ref={ref}
                        {...props}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-3 text-muted-foreground hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:outline-none"
                        aria-label={
                            showPassword ? 'Hide password' : 'Show password'
                        }
                        tabIndex={-1}
                    >
                        {showPassword ? (
                            <EyeOff className="size-4" />
                        ) : (
                            <Eye className="size-4" />
                        )}
                    </button>
                </div>
                <FieldError>{error}</FieldError>
            </div>
        </Field>
    );
}
