import { usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { LanguageSwitcher } from '@/components/language-switcher';

export default function RootLayout({ children }: { children: ReactNode }) {
    const { locale } = usePage().props;

    useEffect(() => {
        const localeFromLocalStorage = localStorage.getItem('locale');

        if (!localeFromLocalStorage || localeFromLocalStorage !== locale) {
            localStorage.setItem('locale', locale);
        }
    }, [locale]);

    return (
        <>
            <div className="flex min-h-svh flex-col py-2">
                <div className="ml-auto pr-2">
                    <LanguageSwitcher />
                </div>
                {children}
            </div>
        </>
    );
}
