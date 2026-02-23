import { useMemo } from "react";
import { CalendarCheck, ChevronRight } from "lucide-react";
import { useI18n } from "@/i18n";
import { weeklyPhases } from "@/data/roadmap";

export function RoadmapCard({
  checked,
  onNavigate,
}: {
  checked: Record<string, boolean>;
  onNavigate: (sectionId: string) => void;
}) {
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
