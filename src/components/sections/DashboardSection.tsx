import { useMemo } from "react";
import { Landmark, Castle, Pickaxe, Target, Swords, Hammer, ChevronRight } from "lucide-react";
import { useI18n, useGearingData } from "@/i18n";
import { IlvlText } from "@/components/shared/IlvlText";
import { cn } from "@/lib/utils";

interface ActivityCard {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  labelKey: string;
  sectionId: string;
  currentBestIlvl: number | null;
  nextIlvl: number | null;
}

interface DashboardSectionProps {
  currentIlvl: number | null;
  data: ReturnType<typeof useGearingData>;
  onNavigate: (sectionId: string) => void;
}

function getBest(ilvls: number[], currentIlvl: number | null) {
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

function computeRaidIlvls(raids: any[]): number[] {
  return raids.flatMap((r) =>
    r.difficulties.flatMap((d: any) => d.bossGroups.map((bg: any) => bg.lootIlvl))
  );
}

function computeDungeonIlvls(dungeons: any[]): number[] {
  return dungeons
    .filter((d) => d.vaultIlvl != null)
    .map((d) => d.vaultIlvl as number);
}

function computeDelveIlvls(bountiful: any[], maps: any[]): number[] {
  const bountifulIlvls = bountiful.map((d) => d.vaultIlvl);
  const mapIlvls = maps.map((m) => m.lootIlvl);
  return [...bountifulIlvls, ...mapIlvls];
}

function computeTraqueIlvls(traque: any[]): number[] {
  return traque.map((r) => r.weeklyChestIlvl);
}

function computePvpIlvls(pvp: any[]): number[] {
  return pvp.map((p) => p.ilvl);
}

function computeCraftIlvls(craft: any[]): number[] {
  return craft.map((c) => c.maxIlvl);
}

export function DashboardSection({
  currentIlvl,
  data,
  onNavigate,
}: DashboardSectionProps) {
  const { t } = useI18n();

  const maxIlvl = useMemo(() => {
    const lastTrack = data.upgradeTracks.at(-1);
    return lastTrack?.ilvls.at(-1) ?? null;
  }, [data.upgradeTracks]);

  const cards: ActivityCard[] = useMemo(() => {
    const raid = getBest(computeRaidIlvls(data.raids), currentIlvl);
    const dungeons = getBest(computeDungeonIlvls(data.dungeons), currentIlvl);
    const delves = getBest(
      computeDelveIlvls(data.bountifulDelves, data.delversBountyMaps),
      currentIlvl
    );
    const traque = getBest(computeTraqueIlvls(data.traque), currentIlvl);
    const pvp = getBest(computePvpIlvls(data.pvp), currentIlvl);
    const craft = getBest(computeCraftIlvls(data.craft), currentIlvl);

    return [
      {
        id: "raid",
        icon: Landmark,
        labelKey: "dashboard.raid",
        sectionId: "raid",
        currentBestIlvl: raid.currentBestIlvl,
        nextIlvl: raid.nextIlvl,
      },
      {
        id: "dungeons",
        icon: Castle,
        labelKey: "dashboard.dungeons",
        sectionId: "dungeons",
        currentBestIlvl: dungeons.currentBestIlvl,
        nextIlvl: dungeons.nextIlvl,
      },
      {
        id: "delves",
        icon: Pickaxe,
        labelKey: "dashboard.delves",
        sectionId: "delves",
        currentBestIlvl: delves.currentBestIlvl,
        nextIlvl: delves.nextIlvl,
      },
      {
        id: "traque",
        icon: Target,
        labelKey: "dashboard.traque",
        sectionId: "traque",
        currentBestIlvl: traque.currentBestIlvl,
        nextIlvl: traque.nextIlvl,
      },
      {
        id: "pvp",
        icon: Swords,
        labelKey: "dashboard.pvp",
        sectionId: "pvp",
        currentBestIlvl: pvp.currentBestIlvl,
        nextIlvl: pvp.nextIlvl,
      },
      {
        id: "craft",
        icon: Hammer,
        labelKey: "dashboard.craft",
        sectionId: "craft",
        currentBestIlvl: craft.currentBestIlvl,
        nextIlvl: craft.nextIlvl,
      },
    ];
  }, [currentIlvl, data]);

  const seasonStats = useMemo(() => [
    { label: t("dashboard.statMaxIlvl"), value: maxIlvl ?? "—" },
    { label: t("dashboard.statRaids"), value: data.raids.length },
    { label: t("dashboard.statTracks"), value: data.upgradeTracks.length },
    { label: t("dashboard.statActivities"), value: 6 },
  ], [t, maxIlvl, data.raids.length, data.upgradeTracks.length]);

  return (
    <div className="space-y-4">
      {/* Intro */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {t("dashboard.intro")}
      </p>

      {/* Season stats */}
      <div className="flex flex-wrap gap-2">
        {seasonStats.map(({ label, value }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
          >
            <span className="font-bold text-foreground">{value}</span>
            <span className="text-muted-foreground">{label}</span>
          </span>
        ))}
      </div>

      {currentIlvl === null && (
        <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950 px-4 py-3 text-sm text-amber-900 dark:text-amber-200 text-center">
          {t("dashboard.prompt")}
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {cards.map((card) => (
          <ActivityCardItem
            key={card.id}
            card={card}
            currentIlvl={currentIlvl}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
}

function ActivityCardItem({
  card,
  currentIlvl,
  onNavigate,
}: {
  card: ActivityCard;
  currentIlvl: number | null;
  onNavigate: (sectionId: string) => void;
}) {
  const { t } = useI18n();
  const hasAccess = card.currentBestIlvl !== null;
  const gap =
    card.nextIlvl != null && currentIlvl != null
      ? card.nextIlvl - currentIlvl
      : null;
  const Icon = card.icon;

  return (
    <button
      onClick={() => onNavigate(card.sectionId)}
      className={cn(
        "group rounded-xl border bg-card text-left p-4 transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        !hasAccess && currentIlvl !== null && "opacity-50"
      )}
    >
      {/* Header row: icon + activity name + chevron */}
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
        <span className="text-xs font-medium text-muted-foreground truncate flex-1">
          {t(card.labelKey as any)}
        </span>
        <ChevronRight className="w-3 h-3 text-muted-foreground/40 shrink-0 group-hover:text-muted-foreground transition-colors" />
      </div>
      {/* Subtitle */}
      <p className="text-xs text-muted-foreground/60 mb-3 leading-tight">
        {t(`dashboard.${card.id}Sub` as any)}
      </p>

      {/* Next tier to accomplish — large and colored */}
      <div className="mb-2">
        <p className="text-xs text-muted-foreground mb-0.5">
          {currentIlvl === null ? t("dashboard.maxAvailable") : t("dashboard.nextTier")}
        </p>
        {card.nextIlvl !== null ? (
          <>
            <IlvlText
              ilvl={card.nextIlvl}
              className="text-2xl font-mono font-bold"
            />
            {gap !== null && gap > 0 && (
              <p className="text-xs text-muted-foreground/70 mt-0.5">
                {t("dashboard.gap").replace("{gap}", String(gap))}
              </p>
            )}
          </>
        ) : (
          <span className="text-2xl font-mono font-bold text-primary">
            {t("dashboard.maxReached")}
          </span>
        )}
      </div>

      {/* Current best (secondary info) */}
      {hasAccess && card.nextIlvl !== null && (
        <div className="text-xs text-muted-foreground">
          <p className="mb-0.5">{t("dashboard.currentBest")}</p>
          <IlvlText ilvl={card.currentBestIlvl!} className="font-mono" />
        </div>
      )}
    </button>
  );
}
