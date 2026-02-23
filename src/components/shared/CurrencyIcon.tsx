import { cn } from "@/lib/utils";

type CurrencyType = "gold" | "silver" | "bronze";

interface Props {
  type: CurrencyType;
  className?: string;
}

export function CurrencyIcon({ type, className }: Props) {
  return (
    <span
      className={cn("inline-block w-2.5 h-2.5 rounded-full align-middle shrink-0", className)}
      style={{ backgroundColor: `var(--currency-${type})` }}
      aria-label={type}
    />
  );
}
