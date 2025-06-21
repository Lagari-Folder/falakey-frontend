// types/Translations.ts
export type TranslationObject = {
  [key: string]: any;
};

export type SupportedLocales = "en" | "ar";

export type Translations = Record<SupportedLocales, TranslationObject>;
