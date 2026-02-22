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

  useWowheadInit([items]);

  return (
    <div className="space-y-2">
      {showWarning && (
        <div className="flex items-start gap-2 rounded-md border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/60 px-3 py-2 text-xs text-amber-800 dark:text-amber-300">
          <span className="shrink-0 mt-0.5">⚠️</span>
          <p className="leading-snug">{t("dashboard.keyItemsWarning")}</p>
        </div>
      )}

      {items.length === 0 ? (
        <p className="text-xs text-muted-foreground italic">{t("dashboard.keyItemsComingSoon")}</p>
      ) : (
        <ul className="space-y-1.5">
          {items.map((item) => (
            <li key={item.wowheadId} className="flex items-start gap-2 text-xs">
              {/* WoWHead auto-iconizes this link and adds a tooltip on hover */}
              <a
                href={`https://www.wowhead.com/item=${item.wowheadId}`}
                data-wowhead={`item=${item.wowheadId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                {item.slot}
              </a>
              <div className="flex flex-col gap-0.5 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0 ${
                    item.sourceType === "raid"
                      ? "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300"
                      : "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                  }`}>
                    {item.sourceType === "raid" ? t("dashboard.raid") : t("nav.dungeons")}
                  </span>
                  <span className="text-muted-foreground truncate">
                    {item.sourceName[lang]}
                    {item.bossName && (
                      <> · {item.bossName[lang]}</>
                    )}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
