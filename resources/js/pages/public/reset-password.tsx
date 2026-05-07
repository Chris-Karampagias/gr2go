import { Form, usePage } from '@inertiajs/react';
import AppHead from '@/components/app-head';
import { FormField } from '@/components/form-field';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { update } from '@/routes/password';
import type { PublicPasswordResetTranslations } from '@/types/translations/public/password/reset';

type Props = {
    token: string;
    email: string;
};

export default function ResetPassword({ token, email }: Props) {
    const pageTranslations = usePage().props
        .pageTranslations as PublicPasswordResetTranslations;

    return (
        <>
            <AppHead
                title={pageTranslations.page_title}
                description={pageTranslations.layout.description}
            />

            <div className="flex w-full flex-col gap-6">
                <div className="flex flex-col">
                    <Form
                        {...update.form()}
                        disableWhileProcessing
                        transform={(data) => ({ ...data, token, email })}
                        resetOnSuccess={['password', 'password_confirmation']}
                        className="flex flex-col gap-4 px-6"
                    >
                        {({ processing, errors, isDirty }) => (
                            <>
                                <FieldGroup className="gap-4">
                                    <FormField
                                        name="email"
                                        label={pageTranslations.email_label}
                                        error={errors.email}
                                    >
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            aria-label={
                                                pageTranslations.email_aria
                                            }
                                            autoComplete="email"
                                            value={email}
                                            readOnly
                                            tabIndex={1}
                                        />
                                    </FormField>
                                    <PasswordInput
                                        label={pageTranslations.password_label}
                                        id="password"
                                        name="password"
                                        required
                                        autoFocus
                                        tabIndex={2}
                                        autoComplete="new-password"
                                        forgotPasswordLabel={
                                            pageTranslations.forgot_password_label
                                        }
                                        placeholder={
                                            pageTranslations.password_placeholder
                                        }
                                        error={errors.password}
                                    />
                                    <PasswordInput
                                        label={
                                            pageTranslations.confirm_password_label
                                        }
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        required
                                        tabIndex={3}
                                        autoComplete="new-password"
                                        placeholder={
                                            pageTranslations.confirm_password_placeholder
                                        }
                                        error={errors.password_confirmation}
                                    />
                                </FieldGroup>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    tabIndex={4}
                                    disabled={processing || !isDirty}
                                    data-test="reset-password-button"
                                >
                                    {processing && <Spinner />}
                                    {pageTranslations.reset_password}
                                </Button>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </>
    );
}

ResetPassword.layout = ({
    pageTranslations,
}: {
    pageTranslations: PublicPasswordResetTranslations;
}) => {
    return {
        title: pageTranslations.layout.title,
        description: pageTranslations.layout.description,
    };
};
