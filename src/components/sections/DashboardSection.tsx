import { useMemo } from "react";
import { Landmark, Castle, Pickaxe, Target, Swords, Hammer } from "lucide-react";
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

  if (currentIlvl === null) {
    // Reference mode: show absolute max
    return { currentBestIlvl: sorted[sorted.length - 1], nextIlvl: null };
  }

  const accessible = sorted.filter((v) => v >= currentIlvl);
  if (accessible.length === 0) {
    // Nothing accessible: show the lowest value as "next"
    return { currentBestIlvl: null, nextIlvl: sorted[0] };
  }

  const currentBestIlvl = accessible[accessible.length - 1]; // highest accessible
  const above = sorted.filter((v) => v > currentBestIlvl);
  const nextIlvl = above.length > 0 ? above[0] : null;

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

  return (
    <div className="space-y-4">
      {currentIlvl === null && (
        <div className="rounded-lg border bg-muted/50 px-4 py-3 text-sm text-muted-foreground text-center">
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
  const isMaxed = hasAccess && card.nextIlvl === null;
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
      {/* Header row: icon + activity name */}
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
        <span className="text-xs font-medium text-muted-foreground truncate">
          {t(card.labelKey as any)}
        </span>
      </div>

      {/* Best accessible ilvl — large and colored */}
      <div className="mb-2">
        <p className="text-xs text-muted-foreground mb-0.5">
          {t("dashboard.currentBest")}
        </p>
        {hasAccess ? (
          <IlvlText
            ilvl={card.currentBestIlvl!}
            className="text-2xl font-mono font-bold"
          />
        ) : (
          <span className="text-2xl font-mono font-bold text-muted-foreground/50">
            —
          </span>
        )}
      </div>

      {/* Next tier / gap / maxed */}
      <div className="text-xs text-muted-foreground space-y-0.5">
        {isMaxed && (
          <span className="text-primary font-medium">
            {t("dashboard.maxReached")}
          </span>
        )}
        {!isMaxed && card.nextIlvl !== null && (
          <>
            <div>
              <span className="text-muted-foreground">
                {t("dashboard.nextTier")}
              </span>
              <div>
                <IlvlText
                  ilvl={card.nextIlvl}
                  className="font-mono font-semibold"
                />
              </div>
            </div>
            {gap !== null && gap > 0 && (
              <span className="block text-muted-foreground/70">
                {t("dashboard.gap").replace("{gap}", String(gap))}
              </span>
            )}
          </>
        )}
        {!hasAccess && currentIlvl !== null && card.nextIlvl !== null && (
          <div>
            <span className="text-muted-foreground">
              {t("dashboard.nextTier")}
            </span>
            <div>
              <IlvlText ilvl={card.nextIlvl} className="font-mono" />
            </div>
          </div>
        )}
      </div>
    </button>
  );
}
