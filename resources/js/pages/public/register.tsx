import { Form, usePage } from '@inertiajs/react';
import AppHead from '@/components/app-head';
import { FormField } from '@/components/form-field';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';
import type { PublicRegisterTranslations } from '@/types/translations/public/register';

export default function Register() {
    const pageTranslations = usePage().props
        .pageTranslations as PublicRegisterTranslations;

    return (
        <>
            <AppHead
                title={pageTranslations.page_title}
                description={pageTranslations.layout.description}
            />
            <div className="flex w-full flex-col gap-6">
                <div className="flex flex-col">
                    <Form
                        {...store.form()}
                        resetOnSuccess={['password', 'password_confirmation']}
                        disableWhileProcessing
                        noValidate
                        className="flex flex-col gap-4 px-6"
                    >
                        {({ processing, errors, isDirty }) => (
                            <>
                                <FieldGroup className="gap-4">
                                    <FormField
                                        name="name"
                                        label={pageTranslations.name_label}
                                        error={errors.name}
                                    >
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            aria-label={
                                                pageTranslations.name_aria
                                            }
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            name="name"
                                            placeholder={
                                                pageTranslations.name_placeholder
                                            }
                                        />
                                    </FormField>
                                    <FormField
                                        name="email"
                                        label={pageTranslations.email_label}
                                        error={errors.email}
                                    >
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            aria-label={
                                                pageTranslations.email_aria
                                            }
                                            tabIndex={2}
                                            autoComplete="email"
                                            name="email"
                                            placeholder={
                                                pageTranslations.email_placeholder
                                            }
                                        />
                                    </FormField>
                                    <PasswordInput
                                        label={pageTranslations.password_label}
                                        id="password"
                                        name="password"
                                        required
                                        tabIndex={3}
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
                                        tabIndex={4}
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
                                    tabIndex={5}
                                    disabled={processing || !isDirty}
                                    data-test="register-user-button"
                                >
                                    {processing && <Spinner />}
                                    {pageTranslations.create_account}
                                </Button>
                            </>
                        )}
                    </Form>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 px-6 text-center text-sm text-muted-foreground">
                    <span>{pageTranslations.already_have_account}</span>
                    <TextLink href={login()} tabIndex={6}>
                        {pageTranslations.log_in}
                    </TextLink>
                </div>
            </div>
        </>
    );
}

Register.layout = ({
    pageTranslations,
}: {
    pageTranslations: PublicRegisterTranslations;
}) => {
    return {
        title: pageTranslations.layout.title,
        description: pageTranslations.layout.description,
    };
};
