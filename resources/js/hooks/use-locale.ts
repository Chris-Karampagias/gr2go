import { usePage } from '@inertiajs/react';

export function useLocale() {
    const {
        props: { locale },
    } = usePage();
    const localeFromLocalStorage = localStorage.getItem('locale');

    if (!localeFromLocalStorage || localeFromLocalStorage !== locale) {
        localStorage.setItem('locale', locale);
    }

    return locale;
}
