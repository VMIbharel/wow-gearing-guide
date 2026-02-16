import { getIlvlTier } from "@/lib/utils";

interface Props {
  ilvl: number;
  className?: string;
}

export function IlvlText({ ilvl, className = "font-mono font-bold" }: Props) {
  const tier = getIlvlTier(ilvl);
  return (
    <span
      className={className}
      style={{ color: `var(--tier-${tier})` }}
    >
      {ilvl}
    </span>
  );
}
