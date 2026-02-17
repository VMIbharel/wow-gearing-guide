import { useI18n } from "@/i18n";
import type { Language } from "@/i18n/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LANGUAGES: Record<Language, string> = {
  en: "EN",
  fr: "FR",
};

export function LanguageSelector() {
  const { language, setLanguage, t } = useI18n();

  return (
    <Select
      value={language}
      onValueChange={(v) => setLanguage(v as Language)}
    >
      <SelectTrigger className="w-20" aria-label={t("aria.selectLanguage")}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(LANGUAGES).map(([code, label]) => (
          <SelectItem key={code} value={code}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
