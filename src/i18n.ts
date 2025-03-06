import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./locales/en.json";
import esTranslation from "./locales/es.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      es: { translation: esTranslation },
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    detection: {
      order: ["navigator", "localStorage", "sessionStorage", "cookie"],
      caches: ["localStorage", "cookie"],
    },
  });

const userLanguage = i18n.language || navigator.language || "en";
if (!userLanguage.startsWith("es")) {
  i18n.changeLanguage("en");
} else {
  i18n.changeLanguage("es");
}

export default i18n;
