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
        <div>
          <span className="font-medium text-foreground">{t("info.source")}</span>{" "}
          <ul className="mt-1 space-y-1 pl-2">
            <li>
              <a
                href="https://linktr.ee/GandalinGaming"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                Gandalin's Gearing Guide
              </a>
            </li>
            <li>
              <a
                href="https://docs.google.com/spreadsheets/d/1nvrL8vmZ4ykofgDOmub4Yc_kumzOBPaDDi0MU7DQrpI/edit?gid=0#gid=0"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                Aido_TV spreadsheet "ILVL STUFF SAISON 1 MIDNIGHT"
              </a>
            </li>
            <li>
              <a
                href="https://docs.google.com/document/d/e/2PACX-1vTGkZ2Cjr0jlv90XqW9vy9VXsVucd-yMCgHdyCvX_kQfOrexNDAC7Lf3LifuhqxrcWqJ0W3zIhvK3ii/pub"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                Larias’ Raider’s Guide for Midnight
              </a>
            </li>
          </ul>
        </div>
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
