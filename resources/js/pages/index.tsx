import { Link } from '@inertiajs/react';
import AppHead from '@/components/app-head';
import { Button } from '@/components/ui/button';
import { login } from '@/routes';
import gr2goLogo from '../../assets/images/gr2go-logo-transparent.png';
import homeImage from '../../assets/images/index.png';

export default function Index() {
    return (
        <>
            <AppHead title="Index" description="Index to gr2go" />
            <div className="relative min-h-svh before:absolute before:inset-0 before:z-10 before:h-full before:bg-[rgba(10,10,10,0.6)] before:content-['']">
                <img
                    src={homeImage}
                    className="absolute inset-0 h-full object-cover blur-xs"
                    alt="Welcome page image"
                />
                <div className="absolute inset-0 z-20 flex h-full flex-col items-center justify-center">
                    <div className="flex flex-col transition-[opacity,display] duration-1000 ease-in starting:opacity-0">
                        <img
                            src={gr2goLogo}
                            alt="gr2go logo"
                            className="size-60 object-contain"
                        />
                        <Button
                            size="lg"
                            className="animate-[bounce_1.2s_ease-in-out_1.2s_2.5]"
                            asChild
                        >
                            <Link href={login()}>Είσοδος στην εφαρμογή</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
