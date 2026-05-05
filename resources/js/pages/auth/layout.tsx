import type { ReactNode } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';

type AuthLayoutProps = {
    title?: string;
    description?: string;
    children: ReactNode;
};
export default function AuthLayout({
    title = '',
    description = '',
    children,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-svh flex-col gap-6 bg-background py-5">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col items-center gap-4">
                    <AppLogoIcon size={30} />
                    <div className="space-y-2 text-center">
                        <h1 className="text-xl font-medium">{title}</h1>
                        <p className="text-center text-sm text-muted-foreground">
                            {description}
                        </p>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}
