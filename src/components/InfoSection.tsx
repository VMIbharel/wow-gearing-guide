import { useI18n } from "@/i18n";

interface InfoSectionProps {
  version: string;
  lastUpdated: string;
  season: string;
}

export function InfoSection({ version, lastUpdated, season }: InfoSectionProps) {
  const { t } = useI18n();

  return (
    <div className="space-y-4 text-sm text-muted-foreground">
      <div className="rounded-lg border bg-card p-4 space-y-2">
        <p>
          <span className="font-medium text-foreground">{t("info.source")}</span>{" "}
          <a
            href="https://linktr.ee/GandalinGaming"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            Gandalin's Gearing Guide
          </a>
        </p>
        <p>
          <span className="font-medium text-foreground">{t("info.version")}</span>{" "}
          {version}
        </p>
        <p>
          <span className="font-medium text-foreground">{t("info.lastUpdated")}</span>{" "}
          {lastUpdated}
        </p>
        <p>
          <span className="font-medium text-foreground">{t("info.season")}</span>{" "}
          {season}
        </p>
      </div>
      <p className="text-xs">{t("info.disclaimer")}</p>
    </div>
  );
}
