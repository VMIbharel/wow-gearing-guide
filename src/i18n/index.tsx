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

// Hook for loading translated game data
export function useGearingData() {
  const { language, t } = useI18n();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Reset data when language changes
    setData(null);

    // Import the single data file
    import("@/data/gearing.json")
      .then((module) => {
        const rawData = module.default;

        // Merge data with translations
        const translatedData = {
          version: rawData.version,
          lastUpdated: rawData.lastUpdated,
          season: t("game.season.full"),
          seasonShort: t("game.season.short"),

          upgradeTracks: rawData.upgradeTracks.map((track: any) => ({
            ...track,
            name: t(`game.tracks.${track.trackId}` as TranslationKey),
          })),

          raid: {
            ...rawData.raid,
            name: t(`game.raids.${rawData.raid.raidId}` as TranslationKey),
            difficulties: rawData.raid.difficulties.map((diff: any) => ({
              ...diff,
              name: t(`game.difficulties.${diff.difficultyId}` as TranslationKey),
            })),
            notes: t("game.notes.raid" as TranslationKey) as unknown as string[],
          },

          dungeons: rawData.dungeons.map((dungeon: any) => ({
            ...dungeon,
            label: t(`game.dungeonLabels.${dungeon.levelId}` as TranslationKey),
          })),
          dungeonNotes: t("game.notes.dungeons" as TranslationKey) as unknown as string[],

          bountifulDelves: rawData.bountifulDelves,
          delversBountyMaps: rawData.delversBountyMaps,
          delveNotes: t("game.notes.delves" as TranslationKey) as unknown as string[],

          pvp: rawData.pvp.map((item: any) => ({
            ...item,
            type: t(`game.pvpTypes.${item.typeId}` as TranslationKey),
          })),

          crests: rawData.crests,
        };

        setData(translatedData);
      })
      .catch((error) => {
        console.error("Failed to load gearing data:", error);
      });
  }, [language, t]);

  return data;
}
