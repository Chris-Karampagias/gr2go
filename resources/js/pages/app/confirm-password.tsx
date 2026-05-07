import { Form, Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { confirm } from '@/routes/password';
import { store } from '@/routes/password/confirm';

export default function ConfirmPassword() {
    return (
        <>
            <Head title="Confirm password" />

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Confirm your password"
                    description="This is a secure area of the application. Please confirm your password before continuing."
                />

                <Form {...store.form()} resetOnSuccess={['password']}>
                    {({ processing, errors }) => (
                        <div className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    autoFocus
                                />

                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center">
                                <Button
                                    className="w-full"
                                    disabled={processing}
                                    data-test="confirm-password-button"
                                >
                                    {processing && <Spinner />}
                                    Confirm password
                                </Button>
                            </div>
                        </div>
                    )}
                </Form>
            </div>
        </>
    );
}

ConfirmPassword.layout = {
    breadcrumbs: [
        {
            title: 'Confirm password',
            href: confirm(),
        },
    ],
};
