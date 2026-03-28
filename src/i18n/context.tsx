"use client";

import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useSyncExternalStore,
  useEffect,
  type ReactNode,
} from "react";
import type { Locale, Translations } from "./translations";
import { en } from "./en";
import { fr } from "./fr";
import { zh } from "./zh";

const DICTIONARIES: Record<Locale, Translations> = { en, fr, zh };

const STORAGE_KEY = "dojops-locale";

/** Default locale — English unless user explicitly switches via the language picker. */
function detectLocale(): Locale {
  return "en";
}

// ── External store for locale (avoids setState-in-effect) ──
let _cached: Locale | undefined;
const _listeners = new Set<() => void>();

function getSnapshot(): Locale {
  if (_cached === undefined) {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    _cached = saved && saved in DICTIONARIES ? saved : detectLocale();
  }
  return _cached;
}

function getServerSnapshot(): Locale {
  return "en";
}

function subscribe(cb: () => void) {
  _listeners.add(cb);
  return () => {
    _listeners.delete(cb);
  };
}

interface I18nContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (l: Locale) => void;
}

const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  t: en,
  setLocale: () => {},
});

export function I18nProvider({ children }: Readonly<{ children: ReactNode }>) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLocale = useCallback((l: Locale) => {
    _cached = l;
    localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l === "zh" ? "zh-CN" : l;
    _listeners.forEach((cb) => cb());
  }, []);

  // Sync html lang attribute on first client render
  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : locale;
  }, [locale]);

  const value = useMemo(
    () => ({ locale, t: DICTIONARIES[locale], setLocale }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  return useContext(I18nContext);
}
