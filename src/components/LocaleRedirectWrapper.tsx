import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import type { RootState } from "@/lib/store";

// 🌍 Supported locales
const SUPPORTED_LOCALES = ["en", "ar"];

export default function LocaleRedirectWrapper() {
  const location = useLocation();
  const navigate = useNavigate();

  const { local: currentLocale } = useSelector(
    (state: RootState) => state.translation
  );

  // Fallback to cookie or browser lang
  const savedLocale = Cookies.get("locale");
  const browserLang = navigator.language.split("-")[0];
  const defaultLocale =
    savedLocale ||
    (SUPPORTED_LOCALES.includes(browserLang) ? browserLang : "ar");

  const finalLocale = currentLocale || defaultLocale;

  useEffect(() => {
    const pathSegments = location.pathname
      .split("/")
      .filter((seg) => seg !== "");

    // Check if first segment is a locale
    const hasLocalePrefix =
      pathSegments.length > 0 && SUPPORTED_LOCALES.includes(pathSegments[0]);

    if (!hasLocalePrefix) {
      // Prepend locale and redirect
      const newPath = `/${finalLocale}${location.pathname}`;
      navigate(`${newPath}${location.search}`, { replace: true });
    }
  }, [location, navigate, finalLocale]);

  return null;
}
