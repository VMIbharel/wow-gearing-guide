import { useMemo } from "react";
import { Landmark, Castle, Pickaxe, Target, Swords, Hammer } from "lucide-react";
import { useI18n, useGearingData } from "@/i18n";
import {
  type ActivityCard,
  getBest,
  computeRaidIlvls,
  computeDungeonIlvls,
  computeDelveIlvls,
  computeTraqueIlvls,
  computePvpIlvls,
  computeCraftIlvls,
} from "@/lib/dashboard-utils";
import { getSpecGuide } from "@/data/specItems";
import { ActivityCardItem } from "@/components/dashboard/ActivityCardItem";
import { RoadmapCard } from "@/components/dashboard/RoadmapCard";
import { TracksCard } from "@/components/dashboard/TracksCard";
import { SpecRecommendationCard } from "@/components/dashboard/SpecRecommendationCard";

interface DashboardSectionProps {
  currentIlvl: number | null;
  data: ReturnType<typeof useGearingData>;
  onNavigate: (sectionId: string) => void;
  checked: Record<string, boolean>;
  classId?: string | null;
  specId?: string | null;
}

export function DashboardSection({
  currentIlvl,
  data,
  onNavigate,
  checked,
  classId,
  specId,
}: DashboardSectionProps) {
  const { t } = useI18n();

  const maxIlvl = useMemo(() => {
    const lastTrack = data.upgradeTracks.at(-1);
    return lastTrack?.ilvls.at(-1) ?? null;
  }, [data.upgradeTracks]);

  const specGuide = useMemo(() =>
    classId && specId ? getSpecGuide(classId, specId) : undefined,
  [classId, specId]);

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

    const raidItemIds = specGuide?.keyItems
      .filter((i) => i.sourceType === "raid")
      .slice(0, 3)
      .map((i) => i.wowheadId);
    const dungeonItemIds = specGuide?.keyItems
      .filter((i) => i.sourceType === "dungeon")
      .slice(0, 3)
      .map((i) => i.wowheadId);

    return [
      { id: "raid", icon: Landmark, labelKey: "dashboard.raid", sectionId: "raid", ...raid, keyItemIds: raidItemIds },
      { id: "dungeons", icon: Castle, labelKey: "dashboard.dungeons", sectionId: "dungeons", ...dungeons, keyItemIds: dungeonItemIds },
      { id: "delves", icon: Pickaxe, labelKey: "dashboard.delves", sectionId: "delves", ...delves },
      { id: "traque", icon: Target, labelKey: "dashboard.traque", sectionId: "traque", ...traque },
      { id: "pvp", icon: Swords, labelKey: "dashboard.pvp", sectionId: "pvp", ...pvp },
      { id: "craft", icon: Hammer, labelKey: "dashboard.craft", sectionId: "craft", ...craft },
    ];
  }, [currentIlvl, data, specGuide]);

  const seasonStats = useMemo(() => [
    { label: t("dashboard.statMaxIlvl"), value: maxIlvl ?? "—" },
    { label: t("dashboard.statRaids"), value: data.raids.length },
    { label: t("dashboard.statTracks"), value: data.upgradeTracks.length },
    { label: t("dashboard.statActivities"), value: 6 },
  ], [t, maxIlvl, data.raids.length, data.upgradeTracks.length]);

  const isProfileIncomplete = !classId || !specId;

  return (
    <div className="space-y-4">
      {/* Intro */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {t("dashboard.intro")}
      </p>

      {/* Recommandation — shown when class + spec are selected */}
      {classId && specId && (
        <SpecRecommendationCard classId={classId} specId={specId} />
      )}

      {isProfileIncomplete && (
        <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950 px-4 py-3 text-sm text-amber-900 dark:text-amber-200 text-center">
          {t("dashboard.completeProfile")}
        </div>
      )}

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
