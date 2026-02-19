import { ui, defaultLang, showDefaultLang } from './ui';

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
    return function t(key: keyof typeof ui[typeof defaultLang]) {
        return ui[lang][key] || ui[defaultLang][key];
    }
}

export function useTranslatedPath(lang: keyof typeof ui) {
    return function translatePath(path: string, l: string = lang) {
        const pathName = path.startsWith('/') ? path : `/${path}`;

        // If the path is just /, handle specially
        if (pathName === '/') {
            return !showDefaultLang && l === defaultLang ? '/' : `/${l}/`;
        }

        if (!showDefaultLang && l === defaultLang) {
            return pathName;
        }

        return `/${l}${pathName}`;
    }
}
