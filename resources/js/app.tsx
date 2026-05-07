import { createInertiaApp } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Locale } from '@/enums/locale';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/pages/app/layout';
import SettingsLayout from '@/pages/app/settings/layout';
import RootLayout from '@/pages/layout';
import PublicLayout from '@/pages/public/layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (pageName) => {
        const layout = [RootLayout];

        switch (true) {
            case pageName === 'public/index':
                return layout;
            case pageName.startsWith('public/'):
                return layout.concat(PublicLayout);
            case pageName.startsWith('settings/'):
                return layout.concat([AppLayout, SettingsLayout]);
            default:
                return layout.concat(AppLayout);
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
    defaults: {
        visitOptions: (_href, options) => {
            return {
                viewTransition: true,
                headers: {
                    ...options.headers,
                    'Accept-Language':
                        localStorage.getItem('locale') ?? Locale.EN,
                },
            };
        },
    },
});

initializeTheme();
