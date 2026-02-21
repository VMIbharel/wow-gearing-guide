import { useState, useCallback } from "react";

export interface CharacterProfile {
  ilvl: number | null;
  classId: string | null;
  specId: string | null;
  heroTalentId: string | null;
}

const STORAGE_KEY = "characterProfile";
const LEGACY_ILVL_KEY = "ilvlFilter.ilvl";

const DEFAULT_PROFILE: CharacterProfile = {
  ilvl: null,
  classId: null,
  specId: null,
  heroTalentId: null,
};

function loadProfile(): CharacterProfile {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...DEFAULT_PROFILE, ...JSON.parse(stored) };
    // Migrate legacy ilvl key
    const legacyIlvl = localStorage.getItem(LEGACY_ILVL_KEY);
    if (legacyIlvl) {
      localStorage.removeItem(LEGACY_ILVL_KEY);
      return { ...DEFAULT_PROFILE, ilvl: Number(legacyIlvl) };
    }
  } catch {
    // storage unavailable — silent fail
  }
  return DEFAULT_PROFILE;
}

export function useCharacterProfile() {
  const [profile, setProfile] = useState<CharacterProfile>(loadProfile);

  const updateProfile = useCallback((updates: Partial<CharacterProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      // Cascade resets only for individual field changes, not full profile replacements
      const isFullReplace = "ilvl" in updates && "classId" in updates && "specId" in updates;
      if (!isFullReplace) {
        if ("classId" in updates) {
          next.specId = null;
          next.heroTalentId = null;
        }
        if ("specId" in updates) {
          next.heroTalentId = null;
        }
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // silent
      }
      return next;
    });
  }, []);

  return { profile, updateProfile };
}
