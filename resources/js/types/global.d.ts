import type { Auth } from '@/types/auth';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            locale: Locale;
            pageTranslations:
                | Record<string, string>
                | Record<'layout', Record<string, string>>;
            [key: string]: unknown;
        };
    }
}
