import type { ReactNode } from 'react';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useLocale } from '@/hooks/use-locale';

export default function RootLayout({ children }: { children: ReactNode }) {
    useLocale();

    return (
        <>
            <div className="flex flex-col py-2">
                <div className="ml-auto">
                    <LanguageSwitcher />
                </div>
                {children}
            </div>
        </>
    );
}
