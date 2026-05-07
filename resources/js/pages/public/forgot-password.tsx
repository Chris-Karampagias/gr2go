import { Form, usePage } from '@inertiajs/react';
import AppHead from '@/components/app-head';
import { FormField } from '@/components/form-field';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { email } from '@/routes/password';
import type { PublicPasswordRequestTranslations } from '@/types/translations/public/password/request';

type Props = {
    status?: string;
};

export default function ForgotPassword({ status }: Props) {
    const pageTranslations = usePage().props
        .pageTranslations as PublicPasswordRequestTranslations;

    return (
        <>
            <AppHead
                title={pageTranslations.page_title}
                description={pageTranslations.layout.description}
            />

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="flex w-full flex-col gap-6">
                <div className="flex flex-col">
                    <Form
                        {...email.form()}
                        disableWhileProcessing
                        noValidate
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
                                            required
                                            aria-label={
                                                pageTranslations.email_aria
                                            }
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            placeholder={
                                                pageTranslations.email_placeholder
                                            }
                                        />
                                    </FormField>
                                </FieldGroup>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    tabIndex={2}
                                    disabled={processing || !isDirty}
                                    data-test="email-password-reset-link-button"
                                >
                                    {processing && <Spinner />}
                                    {pageTranslations.email_password_reset_link}
                                </Button>
                            </>
                        )}
                    </Form>
                </div>

                <div className="flex items-center justify-center gap-2 px-6 text-sm text-muted-foreground">
                    <span>{pageTranslations.return_or_prefix}</span>
                    <TextLink href={login()}>
                        {pageTranslations.log_in}
                    </TextLink>
                </div>
            </div>
        </>
    );
}

ForgotPassword.layout = ({
    pageTranslations,
}: {
    pageTranslations: PublicPasswordRequestTranslations;
}) => {
    return {
        title: pageTranslations.layout.title,
        description: pageTranslations.layout.description,
    };
};
