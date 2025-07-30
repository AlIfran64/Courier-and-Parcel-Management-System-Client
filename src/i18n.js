import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./locales/en/translation.json";
import translationBN from "./locales/bn/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      bn: { translation: translationBN },
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
