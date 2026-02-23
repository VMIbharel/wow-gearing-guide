import { Signpost, Package, BookOpen } from "lucide-react";
import { useI18n } from "@/i18n";
import { CLASSES } from "@/data/classes";
import { getSpecGuide } from "@/data/specItems";
import { SpecItemsCard } from "@/components/ui/SpecItemsCard";

export function SpecRecommendationCard({
  classId,
  specId,
}: {
  classId: string;
  specId: string;
}) {
  const { t, language } = useI18n();

  const cls = CLASSES.find((c) => c.id === classId);
  const spec = cls?.specs.find((s) => s.id === specId);
  if (!cls || !spec) return null;

  const lang = language as "en" | "fr";
  const primaryKey = `stats.${spec.primaryStat}` as const;
  const statKeys = [primaryKey, ...spec.statPriority.map((s) => `stats.${s}` as const)];
  const wowheadUrl = `https://www.wowhead.com/guide/classes/${classId}/${specId}/overview`;
  const icyVeinsRole = spec.role === "healer" ? "healing" : spec.role;
  const icyVeinsUrl = `https://www.icy-veins.com/wow/${specId}-${classId}-pve-${icyVeinsRole}-guide`;
  const archonUrl = `https://www.archon.gg/wow/builds/${specId}/${classId}/mythic-plus/overview/10/all-dungeons/this-week`;
  const specGuide = getSpecGuide(classId, specId);

  return (
    <div className="rounded-lg border bg-card px-4 py-3 text-sm space-y-4">
      <p className="text-xs text-muted-foreground/60 leading-tight">
        {lang === "fr" ? cls.fr : cls.en}
        {" · "}
        {lang === "fr" ? spec.fr : spec.en}
      </p>

      {/* Sous-section : Stats priority */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <Signpost className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <span className="text-xs font-semibold text-foreground">{t("dashboard.statPriority")}</span>
        </div>
        {/* Mobile : liste numérotée */}
        <ol className="space-y-1 sm:hidden pl-5">
          {statKeys.map((k, i) => (
            <li key={k} className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground w-4 shrink-0 text-right">{i + 1}.</span>
              <span className={i === 0 ? "font-semibold text-primary" : "text-foreground"}>
                {t(k as any)}
              </span>
            </li>
          ))}
        </ol>
        {/* Desktop : ligne avec ">" */}
        <p className="hidden sm:block font-mono text-xs text-foreground/80 tracking-wide pl-5">
          {statKeys.map((k, i) => (
            <span key={k}>
              <span className={i === 0 ? "text-primary font-semibold" : ""}>
                {t(k as any)}
              </span>
              {i < statKeys.length - 1 && (
                <span className="text-muted-foreground mx-1">{">"}</span>
              )}
            </span>
          ))}
        </p>
      </div>

      {/* Sous-section : Items clés */}
      {specGuide && (
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Package className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <span className="text-xs font-semibold text-foreground">{t("dashboard.keyItems")}</span>
          </div>
          <div className="pl-5">
            <SpecItemsCard items={specGuide.keyItems} showWarning />
          </div>
        </div>
      )}

      {/* Sous-section : Guides */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <span className="text-xs font-semibold text-foreground">{t("dashboard.guides")}</span>
        </div>
        <div className="flex gap-3 text-xs pl-5">
          <a href={wowheadUrl} target="_blank" rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground underline underline-offset-2">
            WoWHead
          </a>
          <a href={icyVeinsUrl} target="_blank" rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground underline underline-offset-2">
            Icy Veins
          </a>
          <a href={archonUrl} target="_blank" rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground underline underline-offset-2">
            Archon
          </a>
        </div>
      </div>
    </div>
  );
}
