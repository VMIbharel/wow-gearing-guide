import { Badge } from "@/components/ui/badge";
import { useI18n, type TranslationKey } from "@/i18n";
import type { IlvlTier } from "@/lib/utils";

const CREST_TIER: Record<string, IlvlTier> = {
  weathered: "blue",
  carved: "purple",
  runed: "orange",
  gilded: "gold",
};

interface CrestBadgeProps {
  name: string;
}

export function CrestBadge({ name }: CrestBadgeProps) {
  const { t } = useI18n();
  const tier = CREST_TIER[name];
  if (!tier) return null;

  const translatedName = t(`game.crests.${name}` as TranslationKey);

  return (
    <Badge
      variant="outline"
      className="border-0 text-xs"
      style={{
        backgroundColor: `var(--tier-${tier}-bg)`,
        color: `var(--tier-${tier})`,
      }}
    >
      {translatedName}
    </Badge>
  );
}
