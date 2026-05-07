import { Link, usePage } from '@inertiajs/react';
import AppHead from '@/components/app-head';
import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { login } from '@/routes';
import type { PublicIndexTranslations } from '@/types/translations/public';
import homeImage from '../../../assets/images/index.png';

export default function Index() {
    const pageTranslations = usePage().props
        .pageTranslations as PublicIndexTranslations;

    return (
        <>
            <AppHead
                title={pageTranslations.page_title}
                description={pageTranslations.page_description}
            />
            <div className="relative min-h-svh before:absolute before:inset-0 before:z-10 before:h-full before:bg-[rgba(10,10,10,0.6)] before:content-['']">
                <img
                    src={homeImage}
                    className="absolute inset-0 h-full object-cover blur-xs"
                    alt="Welcome page image"
                />
                <div className="absolute inset-0 z-20 flex h-full flex-col items-center justify-center">
                    <div className="flex flex-col transition-[opacity,display] duration-1000 ease-in starting:opacity-0">
                        <AppLogoIcon size={60} />
                        <Button size="lg" asChild>
                            <Link href={login()}>
                                {pageTranslations.proceed_to_application}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
