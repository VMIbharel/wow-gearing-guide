import { useState, useCallback } from "react";

const STORAGE_KEY = "weeklyGuide.checklist";

type ChecklistState = Record<string, boolean>;

function loadFromStorage(): ChecklistState {
  if (typeof localStorage === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ChecklistState) : {};
  } catch {
    return {};
  }
}

function saveToStorage(state: ChecklistState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full or blocked — silent fail
  }
}

export function useWeeklyChecklist() {
  const [checked, setChecked] = useState<ChecklistState>(loadFromStorage);

  const toggle = useCallback((id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      saveToStorage(next);
      return next;
    });
  }, []);

  const resetPhase = useCallback((phaseItemIds: string[]) => {
    setChecked((prev) => {
      const next = { ...prev };
      for (const id of phaseItemIds) delete next[id];
      saveToStorage(next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    setChecked({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // silent
    }
  }, []);

  return { checked, toggle, resetPhase, resetAll };
}
