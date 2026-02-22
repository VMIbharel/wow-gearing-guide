import { useEffect } from "react";

declare global {
  interface Window {
    WH?: { init?: () => void };
    whTooltips?: Record<string, unknown>;
  }
}

export function useWowheadInit(deps: unknown[]) {
  useEffect(() => {
    window.WH?.init?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
