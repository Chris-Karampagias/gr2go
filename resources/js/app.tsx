import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/pages/app/layout';
import SettingsLayout from '@/pages/app/settings/layout';
import AuthLayout from '@/pages/auth/layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (pageName) => {
        switch (true) {
            case pageName === 'index':
                return null;
            case pageName.startsWith('auth/'):
                return AuthLayout;
            case pageName.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            default:
                return AppLayout;
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
        visitOptions: (_href, _options) => {
            return { viewTransition: true };
        },
    },
});

// This will set light / dark mode on load...
initializeTheme();
