import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import rawTranslations from "../assets/translations.json";
import { SupportedLocales, Translations } from "@/types/Translations";

const translations: Translations = rawTranslations;

const getNestedTranslation = (obj: any, path: string): string | null => {
  return path.split(".").reduce((acc, part) => {
    if (acc && acc[part] !== undefined) return acc[part];
    return null;
  }, obj);
};

export const useTrans = () => {
  const { local } = useSelector((state: RootState) => state.translation);

  const t = (key: string): string => {
    const value = getNestedTranslation(
      translations[local as SupportedLocales],
      key
    );
    return value || key;
  };

  return { t };
};
