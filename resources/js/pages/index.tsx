import { Head, Link, usePage } from '@inertiajs/react';
import AppHead from '@/components/app-head';
import { dashboard, login, register } from '@/routes';

export default function Index({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const {
        props: { auth },
    } = usePage();

    return (
        <>
            <AppHead title="Index" description="Index to gr2go" />
        </>
    );
}
