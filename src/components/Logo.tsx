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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 200 200"
              className="w-full h-full text-foreground"
            >
              {/* Shield */}
              <path
                d="M100 20 L150 45 L150 110 C150 145 100 175 100 175 C100 175 50 145 50 110 L50 45 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinejoin="round"
              />

              {/* Sword */}
              <g>
                {/* Blade */}
                <rect x="95" y="50" width="10" height="95" fill="currentColor" />
                {/* Crossguard */}
                <rect x="80" y="142" width="40" height="6" fill="currentColor" />
                {/* Pommel */}
                <circle cx="100" cy="162" r="5" fill="currentColor" />
              </g>
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent>{t("app.title")}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
