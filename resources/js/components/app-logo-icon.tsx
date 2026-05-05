import { cn } from '@/lib/utils';
import gr2goLogo from '../../assets/images/gr2go-logo-transparent.png';

export default function AppLogoIcon({
    size,
    className = '',
}: {
    size: number;
    className?: string;
}) {
    return (
        <img
            alt="gr2go logo"
            src={gr2goLogo}
            className={'object-contain ' + cn(className, `size-${size}`)}
        />
    );
}
