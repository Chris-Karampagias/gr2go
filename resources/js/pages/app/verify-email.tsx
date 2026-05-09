import { Form, usePage } from '@inertiajs/react';
import AppHead from '@/components/app-head';
import Heading from '@/components/heading';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { logout } from '@/routes';
import { notice, send } from '@/routes/verification';
import type { AppVerificationNoticeTranslations } from '@/types/translations/app/verification/notice';

type Props = {
    status?: string;
};

export default function VerifyEmail({ status }: Props) {
    const pageTranslations = usePage().props
        .pageTranslations as AppVerificationNoticeTranslations;

    return (
        <>
            <AppHead
                title={pageTranslations.page_title}
                description={pageTranslations.heading_description}
            />

            <div className="flex flex-col gap-6">
                <Heading
                    variant="small"
                    title={pageTranslations.heading_title}
                    description={pageTranslations.heading_description}
                />

                {status === 'verification-link-sent' && (
                    <div className="mb-4 text-center text-sm font-medium text-green-600">
                        {pageTranslations.status_verification_link_sent}
                    </div>
                )}

                <Form
                    {...send.form()}
                    className="flex flex-col gap-6 text-center"
                >
                    {({ processing }) => (
                        <>
                            <Button disabled={processing} variant="secondary">
                                {processing && <Spinner />}
                                {pageTranslations.resend_verification_email}
                            </Button>

                            <TextLink
                                href={logout()}
                                className="mx-auto block text-sm"
                            >
                                {pageTranslations.log_out}
                            </TextLink>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

VerifyEmail.layout = ({
    pageTranslations,
}: {
    pageTranslations: AppVerificationNoticeTranslations;
}) => ({
    breadcrumbs: [
        {
            title: pageTranslations.breadcrumb_title,
            href: notice(),
        },
    ],
});
