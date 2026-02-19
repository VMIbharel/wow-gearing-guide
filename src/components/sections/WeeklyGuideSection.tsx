import { useState } from "react";
import { ChevronDown, RotateCcw, AlertTriangle } from "lucide-react";
import { useI18n } from "@/i18n";
import { weeklyPhases } from "@/data/weeklyGuide";
import type { useWeeklyChecklist } from "@/hooks/useWeeklyChecklist";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TimelineStrip } from "./TimelineStrip";

type ChecklistProps = ReturnType<typeof useWeeklyChecklist>;

export function WeeklyGuideSection({ checked, toggle, resetPhase, resetAll }: ChecklistProps) {
  const { language, t } = useI18n();
  const lang = language as "fr" | "en";

  const [openPhases, setOpenPhases] = useState<Record<string, boolean>>(
    () => ({ [weeklyPhases[0].id]: true })
  );

  const togglePhase = (phaseId: string) => {
    setOpenPhases((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  const openPhase = (phaseId: string) => {
    setOpenPhases((prev) => ({ ...prev, [phaseId]: true }));
    setTimeout(() => {
      document.getElementById(`phase-${phaseId}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-3">
      {/* Timeline strip */}
      <div className="pt-5">
        <TimelineStrip
          phases={weeklyPhases}
          checked={checked}
          lang={lang}
          today={today}
          todayLabel={t("roadmap.today")}
          onPhaseClick={openPhase}
        />
      </div>

      {/* Global reset button */}
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={resetAll}
          className="shrink-0 text-muted-foreground h-7 px-2"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
          {t("roadmap.resetAll")}
        </Button>
      </div>
      {weeklyPhases.map((phase) => {
        const phaseItemIds = phase.items.map((i) => i.id);
        const checkedCount = phaseItemIds.filter((id) => checked[id]).length;
        const total = phaseItemIds.length;
        const isOpen = openPhases[phase.id] ?? false;
        const isDone = total > 0 && checkedCount === total;

        return (
          <div key={phase.id} id={`phase-${phase.id}`} className="rounded-lg border bg-card">
            {/* Phase header */}
            <button
              onClick={() => togglePhase(phase.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-left"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Progress badge */}
                <span
                  className={cn(
                    "shrink-0 text-xs font-mono px-2 py-0.5 rounded-full border",
                    isDone
                      ? "bg-primary/15 text-primary border-primary/30"
                      : "bg-muted text-muted-foreground border-transparent"
                  )}
                >
                  {checkedCount}/{total}
                </span>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm">
                      {phase.title[lang]}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {phase.date}
                    </span>
                    {phase.subtitle && (
                      <span className="text-xs italic text-muted-foreground">
                        — {phase.subtitle[lang]}
                      </span>
                    )}
                  </div>

                  {/* Show ending ilvl when collapsed */}
                  {!isOpen && phase.endingIlvl && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {phase.endingIlvl[lang]}
                    </p>
                  )}
                </div>
              </div>

              <ChevronDown
                className={cn(
                  "w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>

            {/* Expandable body */}
            {isOpen && (
              <div className="px-4 pb-4 space-y-3 border-t">
                {/* Warning banner */}
                {phase.warning && (
                  <div className="flex items-start gap-2 rounded-md bg-amber-500/10 border border-amber-500/20 px-3 py-2 text-xs text-amber-700 dark:text-amber-400 mt-3">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span className="font-medium">{phase.warning[lang]}</span>
                  </div>
                )}

                {/* Task checklist */}
                <ul className="space-y-2 mt-3">
                  {phase.items.map((item) => (
                    <li key={item.id} className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        id={item.id}
                        checked={!!checked[item.id]}
                        onChange={() => toggle(item.id)}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-primary cursor-pointer"
                      />
                      <label
                        htmlFor={item.id}
                        className={cn(
                          "text-sm cursor-pointer select-none leading-snug",
                          checked[item.id] && "line-through text-muted-foreground"
                        )}
                      >
                        {item.text[lang]}
                        {item.note && (
                          <span className="block text-xs text-muted-foreground mt-0.5 not-italic">
                            {item.note[lang]}
                          </span>
                        )}
                        {item.links && item.links.length > 0 && (
                          <span className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                            {item.links.map((link, i) => (
                              <a
                                key={i}
                                href={`https://${lang === "fr" ? "fr" : "www"}.wowhead.com/${link.path}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-primary underline hover:text-primary/80 transition-colors not-italic"
                              >
                                {link.label[lang]}
                              </a>
                            ))}
                          </span>
                        )}
                      </label>
                    </li>
                  ))}
                </ul>

                {/* Footer: crest tracking + ending ilvl + reset */}
                {(phase.crestTracking || phase.endingIlvl) && (
                  <div className="flex items-end justify-between pt-2 border-t gap-4">
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      {phase.crestTracking?.map((entry, i) => (
                        <p key={i}>{entry[lang]}</p>
                      ))}
                      {phase.endingIlvl && (
                        <p className="font-medium text-foreground">
                          {phase.endingIlvl[lang]}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => resetPhase(phaseItemIds)}
                      className="shrink-0 text-muted-foreground h-7 px-2"
                    >
                      <RotateCcw className="w-3 h-3 mr-1" />
                      {t("roadmap.reset")}
                    </Button>
                  </div>
                )}

                {/* Reset button when no footer info */}
                {!phase.crestTracking && !phase.endingIlvl && (
                  <div className="flex justify-end pt-2 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => resetPhase(phaseItemIds)}
                      className="text-muted-foreground h-7 px-2"
                    >
                      <RotateCcw className="w-3 h-3 mr-1" />
                      {t("roadmap.reset")}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
