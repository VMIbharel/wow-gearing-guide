import { memo, useMemo } from "react";
import { cn } from "@/lib/utils";
import type { WeeklyPhase } from "@/data/roadmap";

interface TimelineStripProps {
  phases: WeeklyPhase[];
  checked: Record<string, boolean>;
  lang: "fr" | "en";
  today: string;
  todayLabel: string;
  onPhaseClick: (phaseId: string) => void;
}

export const TimelineStrip = memo(function TimelineStrip({
  phases,
  checked,
  lang,
  today,
  todayLabel,
  onPhaseClick,
}: TimelineStripProps) {
  const currentIndex = useMemo(() => {
    const activeIndex = [...phases].reverse().findIndex((p) => p.startDate <= today);
    return activeIndex === -1 ? 0 : phases.length - 1 - activeIndex;
  }, [phases, today]);

  const phaseCounts = useMemo(
    () =>
      phases.map((phase) => {
        const done = phase.items.filter((item) => checked[item.id]).length;
        return { done, total: phase.items.length };
      }),
    [phases, checked]
  );

  return (
    <div className="pb-1">
      <div className="flex flex-wrap gap-1">
        {phases.map((phase, i) => {
          const { done, total } = phaseCounts[i];
          const pct = total > 0 ? done / total : 0;
          const isComplete = total > 0 && done === total;
          const isCurrent = i === currentIndex;
          const isPast = i < currentIndex;

          return (
            <button
              key={phase.id}
              onClick={() => onPhaseClick(phase.id)}
              title={`${phase.title[lang]} — ${done}/${total}`}
              className={cn(
                "relative flex flex-col items-center gap-1 rounded-md px-2 py-1.5 transition-colors flex-1 min-w-11",
                isCurrent
                  ? "bg-primary/10 ring-1 ring-primary/40"
                  : "bg-muted/50 hover:bg-muted"
              )}
            >
              {/* Today marker */}
              {isCurrent && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-semibold text-primary whitespace-nowrap">
                  {todayLabel}
                </span>
              )}

              {/* Short label */}
              <span
                className={cn(
                  "text-[10px] font-semibold leading-none",
                  isComplete
                    ? "text-primary"
                    : isCurrent
                      ? "text-foreground"
                      : isPast
                        ? "text-muted-foreground"
                        : "text-muted-foreground/60"
                )}
              >
                {phase.shortLabel[lang]}
              </span>

              {/* Progress bar */}
              <div className="w-full h-1 rounded-full bg-border overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    isComplete
                      ? "bg-primary"
                      : isCurrent
                        ? "bg-primary/60"
                        : isPast && pct > 0
                          ? "bg-primary/40"
                          : "bg-transparent"
                  )}
                  style={{ width: `${Math.round(pct * 100)}%` }}
                />
              </div>

              {/* Count */}
              <span className="text-[9px] text-muted-foreground leading-none tabular-nums">
                {done}/{total}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
});
