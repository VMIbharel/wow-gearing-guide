import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Language, NestedKeyOf } from "./types";

// Import translations
import enTranslations from "./translations/en.json";
import frTranslations from "./translations/fr.json";

// Import gearing data (split into logical files)
import rawSeason from "@/data/season.json";
import rawTracks from "@/data/tracks.json";
import rawActivities from "@/data/activities.json";

const translations = {
  en: enTranslations,
  fr: frTranslations,
};

// Type for translation keys based on the English translation structure
export type TranslationKey = NestedKeyOf<typeof enTranslations>;

interface I18nContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps): React.JSX.Element {
  const [language, setLanguageState] = useState<Language>("en");

  // Initialize from localStorage or browser language
  useEffect(() => {
    const stored = localStorage.getItem("language") as Language | null;
    if (stored && (stored === "en" || stored === "fr")) {
      setLanguageState(stored);
      document.documentElement.lang = stored;
    } else {
      // Detect browser language
      const browserLang = navigator.language.toLowerCase();
      const detected = browserLang.startsWith("fr") ? "fr" : "en";
      setLanguageState(detected);
      document.documentElement.lang = detected;
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
  };

  // Translation function with nested key support
  const t = (key: TranslationKey): string => {
    const keys = (key as string).split(".");
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }

    // Fallback to English if translation missing
    if (value === undefined) {
      value = enTranslations;
      for (const k of keys) {
        value = value?.[k];
        if (value === undefined) break;
      }
    }

    return value ?? key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}

// Pure function: merges raw JSON data with current translations
function buildTranslatedData(t: (key: TranslationKey) => string) {
  return {
    version: rawSeason.version,
    lastUpdated: rawSeason.lastUpdated,
    season: t("game.season.full"),
    seasonShort: t("game.season.short"),

    upgradeTracks: rawTracks.upgradeTracks.map((track: any) => ({
      ...track,
      name: t(`game.tracks.${track.trackId}` as TranslationKey),
    })),

    raids: rawActivities.raids.map((raid: any) => ({
      ...raid,
      name: t(`game.raids.${raid.raidId}` as TranslationKey),
      difficulties: raid.difficulties.map((diff: any) => ({
        ...diff,
        name: t(`game.difficulties.${diff.difficultyId}` as TranslationKey),
      })),
      notes: t("game.notes.raid" as TranslationKey) as unknown as string[],
    })),

    dungeons: rawActivities.dungeons.map((dungeon: any) => ({
      ...dungeon,
      label: t(`game.dungeonLabels.${dungeon.levelId}` as TranslationKey),
    })),
    dungeonNotes: t("game.notes.dungeons" as TranslationKey) as unknown as string[],

    bountifulDelves: rawActivities.bountifulDelves,
    delversBountyMaps: rawActivities.delversBountyMaps,
    delveNotes: t("game.notes.delves" as TranslationKey) as unknown as string[],

    craft: rawActivities.craft,

    traque: rawActivities.traque.map((item: any) => ({
      ...item,
      difficultyName: t(`game.traqueDifficulties.${item.difficultyId}` as TranslationKey),
    })),
    traqueNotes: t("game.notes.traque" as TranslationKey) as unknown as string[],

    pvp: rawActivities.pvp.map((item: any) => ({
      ...item,
      type: t(`game.pvpTypes.${item.typeId}` as TranslationKey),
    })),

    crests: rawSeason.crests,
  };
}

// Hook for loading translated game data
export function useGearingData() {
  const { language, t } = useI18n();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Reset to show loading state while translations update
    setData(null);
    setData(buildTranslatedData(t));
  }, [language, t]);

  return data;
}
