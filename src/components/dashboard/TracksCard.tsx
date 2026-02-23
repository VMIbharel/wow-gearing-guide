import { Map, ChevronRight } from "lucide-react";
import { useI18n, useGearingData } from "@/i18n";

export function TracksCard({
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
