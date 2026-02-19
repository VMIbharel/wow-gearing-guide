import { useI18n } from "@/i18n";
import { IlvlFilter } from "./IlvlFilter";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";
import { Badge } from "@/components/ui/badge";

interface AppHeaderProps {
  season?: string;
  currentIlvl: number | null;
  onIlvlChange: (val: number | null) => void;
}

export function AppHeader({ season, currentIlvl, onIlvlChange }: AppHeaderProps) {
  const { t } = useI18n();

  return (
    <header className="shrink-0 bg-background/95 backdrop-blur border-b z-10">
      <div className="mx-auto max-w-5xl px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <Logo />
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 h-4 border-amber-500/50 text-amber-600 dark:text-amber-400 font-semibold shrink-0"
            >
              Beta
            </Badge>
            <div className="hidden sm:flex sm:flex-col sm:min-w-0">
              <img
                src="/title.webp"
                alt={t("app.title")}
                className="h-6 w-auto object-contain object-left dark:brightness-0 dark:invert"
              />
              {season && (
                <p className="text-xs text-muted-foreground truncate">{season}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <IlvlFilter value={currentIlvl} onChange={onIlvlChange} />
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
