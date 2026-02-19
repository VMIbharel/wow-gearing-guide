import { useI18n } from "@/i18n";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Logo() {
  const { t } = useI18n();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            aria-label={t("app.title")}
            className="w-8 h-8 flex items-center justify-center hover:opacity-75 transition-opacity"
          >
            <img
              src="/logo.png"
              alt={t("app.title")}
              className="w-full h-full object-contain dark:brightness-0 dark:invert"
            />
          </button>
        </TooltipTrigger>
        <TooltipContent>{t("app.title")}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
