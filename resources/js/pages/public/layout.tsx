import type { ReactNode } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';

type PublicLayoutProps = {
    title?: string;
    description?: string;
    children: ReactNode;
};
export default function PublicLayout({
    title = '',
    description = '',
    children,
}: PublicLayoutProps) {
    return (
        <div className="flex flex-col gap-6 bg-background">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col items-center gap-4 px-2">
                    <AppLogoIcon size={5} />
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
