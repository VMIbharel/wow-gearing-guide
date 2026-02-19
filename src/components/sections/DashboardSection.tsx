import { memo, useMemo } from "react";
import { Landmark, Castle, Pickaxe, Target, Swords, Hammer, ChevronRight, Map, CalendarCheck } from "lucide-react";
import { useI18n, useGearingData } from "@/i18n";
import { IlvlText } from "@/components/shared/IlvlText";
import { cn } from "@/lib/utils";
import { weeklyPhases } from "@/data/weeklyGuide";

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
  checked: Record<string, boolean>;
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
  checked,
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <RoadmapCard checked={checked} onNavigate={onNavigate} />
        <TracksCard data={data} onNavigate={onNavigate} />
      </div>
    </div>
  );
}

function RoadmapCard({ checked, onNavigate }: { checked: Record<string, boolean>; onNavigate: (sectionId: string) => void }) {
  const { t, language } = useI18n();

  const { currentPhase, done, total, pct } = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const idx = weeklyPhases.reduce((acc, phase, i) =>
      phase.startDate <= today ? i : acc, 0);
    const phase = weeklyPhases[idx];
    const doneCount = phase.items.filter((item) => checked[item.id]).length;
    const totalCount = phase.items.length;
    return {
      currentPhase: phase,
      done: doneCount,
      total: totalCount,
      pct: totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0,
    };
  }, [checked]);

  return (
    <button
      onClick={() => onNavigate("weekly")}
      className="group rounded-xl border bg-card text-left p-4 transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
        <CalendarCheck className="w-4 h-4 text-muted-foreground shrink-0" />
          <span className="text-xs font-medium text-muted-foreground truncate">
            {t("nav.weekly")}
          </span>
        </div>
        <ChevronRight className="w-3 h-3 text-muted-foreground/40 shrink-0 mt-0.5 group-hover:text-muted-foreground transition-colors" />
      </div>
      <p className="text-xs text-muted-foreground/60 mt-1 mb-3 leading-tight">
        {t("dashboard.roadmapSub")}
      </p>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground">{t("dashboard.roadmapPhase")}</span>
          <span className="text-xs font-medium text-foreground truncate max-w-[60%] text-right">
            {currentPhase.title[language as "fr" | "en"] ?? currentPhase.title.en}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground shrink-0">
            {t("dashboard.roadmapProgress")
              .replace("{done}", String(done))
              .replace("{total}", String(total))}
          </span>
        </div>
      </div>
    </button>
  );
}

function TracksCard({
  data,
  onNavigate,
}: {
  data: ReturnType<typeof useGearingData>;
  onNavigate: (sectionId: string) => void;
}) {
  const { t } = useI18n();

  return (
    <button
      onClick={() => onNavigate("tracks")}
      className="group rounded-xl border bg-card text-left p-4 transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-center gap-2 mb-1">
        <Map className="w-4 h-4 text-muted-foreground shrink-0" />
        <span className="text-xs font-medium text-muted-foreground truncate flex-1">
          {t("nav.tracks")}
        </span>
        <ChevronRight className="w-3 h-3 text-muted-foreground/40 shrink-0 group-hover:text-muted-foreground transition-colors" />
      </div>
      <p className="text-xs text-muted-foreground/60 leading-tight">
        {t("dashboard.tracksSub").replace("{count}", String(data.upgradeTracks.length))}
      </p>
    </button>
  );
}

const ActivityCardItem = memo(function ActivityCardItem({
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
});
