import type { ThemeDefinition } from 'vuetify';

export interface NamedThemeDefinition extends ThemeDefinition {
    name: string;
}

export function id(meta: {url: string}) {
    return meta.url.split('/').slice(-1)[0].split('.')[0];
}

export function name(meta: {url: string}) {
    const name = id(meta).replace(/([A-Z])/g, " $1");
    return name.charAt(0).toUpperCase() + name.slice(1);
}

export function isDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function defaultTheme() {
    return isDarkMode() ? 'dark' : 'light';
}