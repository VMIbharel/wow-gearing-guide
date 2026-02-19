import { useState, useTransition, useEffect } from "react";
import { useI18n } from "@/i18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IlvlFilterProps {
  value: number | null;
  onChange: (ilvl: number | null) => void;
}

// Générer une liste d'ilvls par pas de 5
const generateIlvlOptions = () => {
  const options: number[] = [];
  for (let i = 208; i <= 289; i += 5) {
    options.push(i);
  }
  return options;
};

const ilvlOptions = generateIlvlOptions();

export function IlvlFilter({ value, onChange }: IlvlFilterProps) {
  const { t } = useI18n();
  const [, startTransition] = useTransition();
  // Local display value — updates immediately so the Select closes and shows
  // the new value on the first paint, while the expensive parent re-render
  // is deferred via startTransition.
  const [displayValue, setDisplayValue] = useState<string>(value?.toString() ?? "all");

  // Sync when parent value changes externally (e.g., language change resets data)
  useEffect(() => {
    setDisplayValue(value?.toString() ?? "all");
  }, [value]);

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium whitespace-nowrap" htmlFor="ilvl-select">
        {t("ilvlFilter.label")}
      </label>
      <Select
        value={displayValue}
        onValueChange={(v) => {
          setDisplayValue(v);
          startTransition(() => {
            onChange(v === "all" ? null : Number(v));
          });
        }}
      >
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("ilvlFilter.all")}</SelectItem>
          {ilvlOptions.map((ilvl) => (
            <SelectItem key={ilvl} value={ilvl.toString()}>
              {ilvl}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
