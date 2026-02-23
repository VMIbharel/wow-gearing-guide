import { ExternalLink } from "lucide-react";
import { useI18n } from "@/i18n";
import { useWowheadInit } from "@/hooks/useWowheadInit";
import type { SpecKeyItem } from "@/data/specItems";

interface SpecItemsCardProps {
  items: SpecKeyItem[];
  showWarning?: boolean;
}

export function SpecItemsCard({ items, showWarning = false }: SpecItemsCardProps) {
  const { t, language } = useI18n();
  const lang = language as "fr" | "en";
  const wowheadDomain = language === "fr" ? "fr.wowhead.com" : "www.wowhead.com";

  useWowheadInit([items]);

  return (
    <div className="space-y-2">
      {showWarning && (
        <div className="flex items-start gap-2 rounded-md border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/60 px-3 py-2 text-xs text-amber-800 dark:text-amber-300">
          <span className="shrink-0 mt-0.5">⚠️</span>
          <p className="leading-snug">{t("dashboard.keyItemsWarning")}</p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-1.5 px-2 font-medium text-muted-foreground whitespace-nowrap">Slot</th>
              <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">
                <span className="flex items-center gap-1">
                  <ExternalLink className="w-3 h-3 shrink-0" />
                  Item
                </span>
              </th>
              <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Source</th>
              <th className="text-left py-1.5 px-2 font-medium text-muted-foreground">Boss</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-3 px-2 text-muted-foreground italic text-center">
                  {t("dashboard.keyItemsComingSoon")}
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.wowheadId} className="border-b border-border/40 last:border-0">
                  {/* Slot en gras */}
                  <td className="py-1.5 px-2 font-bold whitespace-nowrap">{item.slot}</td>

                  {/* Lien WoWHead — iconizeLinks préfixe l'icône, colorLinks colore par rareté */}
                  <td className="py-1.5 px-2">
                    <a
                      href={`https://${wowheadDomain}/item=${item.wowheadId}`}
                      data-wowhead={`item=${item.wowheadId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.itemName?.[lang] ?? ""}
                    </a>
                  </td>

                  {/* Badge type + nom source */}
                  <td className="py-1.5 px-2 whitespace-nowrap">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium mr-1 ${
                      item.sourceType === "raid"
                        ? "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300"
                        : "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                    }`}>
                      {item.sourceType === "raid" ? t("dashboard.raid") : t("nav.dungeons")}
                    </span>
                    <span className="text-muted-foreground">{item.sourceName[lang]}</span>
                  </td>

                  {/* Boss */}
                  <td className="py-1.5 px-2 text-muted-foreground whitespace-nowrap">
                    {item.bossName?.[lang] ?? "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
