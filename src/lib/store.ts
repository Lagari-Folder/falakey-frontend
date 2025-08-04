import { configureStore } from "@reduxjs/toolkit";
import authSlice, { login } from "./slices/authSlice";
import searchSlice from "./slices/searchSlice";
import transSlice from "./slices/transSlice";
import Cookies from "js-cookie";
import { apiRequest } from "@/utils/apiRequest";
import { useSearchParams } from "react-router-dom";

const KNOWN_LOCALES = ["en", "ar"];
const FALLBACK_LOCALE = "ar";

// ✅ Get locale from URL if valid
const getLocaleFromUrlPath = (): string | null => {
  const path = window.location.pathname;
  const segments = path.split("/").filter(Boolean); // remove empty
  const candidate = segments[0];
  return KNOWN_LOCALES.includes(candidate) ? candidate : null;
};

// ✅ Get valid locale from cookies or fallback
const getLocaleFromCookies = (): string => {
  const saved = Cookies.get("locale");
  return KNOWN_LOCALES.includes(saved || "") ? saved! : FALLBACK_LOCALE;
};

// 💾 Save locale to cookies
const saveLocaleToCookies = (locale: string, dir: string) => {
  Cookies.set("locale", locale, { expires: 30 });
  Cookies.set("dir", dir, { expires: 30 });
};

// 🔁 Ensure URL has valid locale
const ensureLocaleInUrl = (newLocale: string) => {
  const url = new URL(window.location.href);
  const pathSegments = url.pathname.split("/").filter(Boolean);

  if (KNOWN_LOCALES.includes(pathSegments[0])) {
    pathSegments[0] = newLocale;
  } else {
    pathSegments.unshift(newLocale);
  }

  url.pathname = `/${pathSegments.join("/")}`;
  window.history.replaceState({}, "", url.toString());
};

// 🧠 Load state
const loadState = () => {
  const authSession = Cookies.get("user");
  const jsonResponse = authSession ? JSON.parse(authSession) : null;

  const authState =
    jsonResponse?.user && jsonResponse?.token
      ? { auth: jsonResponse }
      : { auth: { user: null, isLoggedIn: false, token: null } };

  const pathLocale = getLocaleFromUrlPath(); // "en" or "ar" or null
  const savedLocale = getLocaleFromCookies(); // always "en" or "ar"

  const finalLocale = pathLocale || savedLocale;
  const finalDir = finalLocale === "ar" ? "rtl" : "ltr";

  if (pathLocale && pathLocale !== savedLocale) {
    saveLocaleToCookies(pathLocale, finalDir);
  }

  ensureLocaleInUrl(finalLocale);

  return {
    ...authState,
    translation: { local: finalLocale, dir: finalDir },
  };
};

// 💾 Save auth to cookies
const saveAuthStateToCookies = (state: RootState) => {
  const auth = JSON.stringify(state.auth);
  Cookies.set("user", auth, { expires: 7 });
};

// ⚙️ Store setup
const store = configureStore({
  reducer: {
    auth: authSlice,
    search: searchSlice,
    translation: transSlice,
  },
  preloadedState: loadState(),
});

// 🔁 Sync
let currentAuth = store.getState().auth;
let currentLocale = store.getState().translation.local;
let currentDir = store.getState().translation.dir;

store.subscribe(() => {
  const previousAuth = currentAuth;
  const previousLocale = currentLocale;

  const state = store.getState();
  currentAuth = state.auth;
  currentLocale = state.translation.local;
  currentDir = state.translation.dir;

  if (previousAuth !== currentAuth) {
    saveAuthStateToCookies(state);
  }

  if (previousLocale !== currentLocale) {
    saveLocaleToCookies(currentLocale, currentDir);
    ensureLocaleInUrl(currentLocale);
  }
});

// 👤 Auto-login if token exists
(async () => {
  const state = store.getState();
  const token = state.auth.token;

  if (token) {
    const result = await apiRequest({
      method: "GET",
      url: "users/profile/private",
      token: token,
    });
    if (result["success"]) {
      store.dispatch(
        login({
          user: result["data"]["data"],
          isLoggedIn: true,
          token,
        })
      );
      Cookies.set("user", JSON.stringify({ user: result, token }), {
        expires: 7,
      });
    }
  }
})();

export type RootState = ReturnType<typeof store.getState>;
export default store;
