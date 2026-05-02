import { Head } from '@inertiajs/react';

export interface AppHeadProps {
    title: string;
    description?: string;
}
export default function AppHead({ title, description }: AppHeadProps) {
    return (
        <Head>
            <title>{title}</title>
            {description ? (
                <meta
                    head-key="description"
                    name="description"
                    content={description}
                />
            ) : null}
        </Head>
    );
}
