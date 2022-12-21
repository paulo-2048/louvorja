import DevTools from "./DevTools";

export function change(lang) {
    let lang_tag = lang;
    if (lang == "pt") {
        lang_tag = "pt-BR";
    }
    document.documentElement.setAttribute('lang', lang_tag);
    localStorage.setItem("lang", lang);
    DevTools.write("Selectec language:", lang);

    return lang;
}

export function flag(lang) {
    if (lang === "pt") {
        return "br";
    } else {
        return lang;
    }
}

export default {
    change,
    flag
}