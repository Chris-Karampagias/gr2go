import { router, usePage } from '@inertiajs/react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Locale } from '@/enums/locale';

const locales = [
    { code: Locale.EL, flag: '🇬🇷' },
    { code: Locale.EN, flag: '🇬🇧' },
] as const;

export function LanguageSwitcher() {
    const {
        props: { locale },
    } = usePage();

    return (
        <Select
            defaultValue={locale}
            onValueChange={(value) => {
                localStorage.setItem('locale', value);
                router.reload({ only: ['locale', 'pageTranslations'] });
            }}
        >
            <SelectTrigger
                aria-label="Language"
                size="sm"
                className="w-fit min-w-22"
            >
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {locales.map(({ code, flag }) => (
                    <SelectItem key={code} value={code}>
                        <span aria-hidden className="text-base leading-none">
                            {flag}
                        </span>
                        {code.toUpperCase()}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
