export interface ActivityCard {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  labelKey: string;
  sectionId: string;
  currentBestIlvl: number | null;
  nextIlvl: number | null;
  keyItemIds?: number[];
}

export function getBest(ilvls: number[], currentIlvl: number | null) {
  if (ilvls.length === 0) return { currentBestIlvl: null, nextIlvl: null };

  const sorted = [...new Set(ilvls)].sort((a, b) => a - b);
  const maxAbsolute = sorted[sorted.length - 1];

  if (currentIlvl === null) {
    // No ilvl selected: show absolute max as next tier
    return { currentBestIlvl: null, nextIlvl: maxAbsolute };
  }

  // Find the next tier ABOVE current ilvl
  const above = sorted.filter((v) => v > currentIlvl);

  if (above.length === 0) {
    // Already at max or beyond
    return { currentBestIlvl: maxAbsolute, nextIlvl: null };
  }

  // There's a next tier to reach
  const nextIlvl = above[0]; // first tier above currentIlvl
  const currentBestIlvl = maxAbsolute; // for secondary display

  return { currentBestIlvl, nextIlvl };
}

export function computeRaidIlvls(raids: any[]): number[] {
  return raids.flatMap((r) =>
    r.difficulties.flatMap((d: any) => d.bossGroups.map((bg: any) => bg.lootIlvl))
  );
}

export function computeDungeonIlvls(dungeons: any[]): number[] {
  return dungeons
    .filter((d) => d.vaultIlvl != null)
    .map((d) => d.vaultIlvl as number);
}

export function computeDelveIlvls(bountiful: any[], maps: any[]): number[] {
  const bountifulIlvls = bountiful.map((d) => d.vaultIlvl);
  const mapIlvls = maps.map((m) => m.lootIlvl);
  return [...bountifulIlvls, ...mapIlvls];
}

export function computeTraqueIlvls(traque: any[]): number[] {
  return traque.map((r) => r.weeklyChestIlvl);
}

export function computePvpIlvls(pvp: any[]): number[] {
  return pvp.map((p) => p.ilvl);
}

export function computeCraftIlvls(craft: any[]): number[] {
  return craft.map((c) => c.maxIlvl);
}
