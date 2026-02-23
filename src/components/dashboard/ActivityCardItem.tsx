import { memo } from "react";
import { ChevronRight } from "lucide-react";
import { useI18n } from "@/i18n";
import { IlvlText } from "@/components/shared/IlvlText";
import { cn } from "@/lib/utils";
import { useWowheadInit } from "@/hooks/useWowheadInit";
import type { ActivityCard } from "@/lib/dashboard-utils";

export const ActivityCardItem = memo(function ActivityCardItem({
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

  useWowheadInit([card.keyItemIds]);

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

      {/* Key item icons — shown when spec items are available for this activity */}
      {card.keyItemIds && card.keyItemIds.length > 0 && (
        <div className="flex items-center gap-1 mt-2 pt-2 border-t border-border/50">
          {card.keyItemIds.map((id) => (
            <a
              key={id}
              href={`https://www.wowhead.com/item=${id}`}
              data-wowhead={`item=${id}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 text-[0px]"
            >
              {id}
            </a>
          ))}
        </div>
      )}
    </button>
  );
});
