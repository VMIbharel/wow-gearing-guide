import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight, Swords, Map, Landmark, Pickaxe, Castle, Info } from "lucide-react";
import { I18nProvider, useI18n, useGearingData } from "@/i18n";
import { IlvlFilter } from "./IlvlFilter";
import { UpgradeTracksSection } from "./UpgradeTracksSection";
import { RaidSection } from "./RaidSection";
import { DungeonTable } from "./DungeonTable";
import { DelvesSection } from "./DelvesSection";
import { PvpTable } from "./PvpTable";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelector } from "./LanguageSelector";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

export interface UpgradeTrack {
  name: string;
  ranks: number;
  ilvls: number[];
  crest: string | null;
  crestFromRank?: number;
  secondaryCrest?: string;
  secondaryCrestFromRank?: number;
}

export function GearingGuide() {
  return (
    <I18nProvider>
      <GearingGuideContent />
    </I18nProvider>
  );
}

function GearingGuideContent() {
  const { t } = useI18n();
  const data = useGearingData();
  const [currentIlvl, setCurrentIlvl] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sections = useMemo(() => [
    { id: "tracks", label: t("nav.tracks"), icon: Map },
    { id: "raid", label: t("nav.raid"), icon: Landmark },
    { id: "dungeons", label: t("nav.dungeons"), icon: Castle },
    { id: "delves", label: t("nav.delves"), icon: Pickaxe },
    { id: "pvp", label: t("nav.pvp"), icon: Swords },
    { id: "info", label: t("nav.info"), icon: Info },
  ] as const, [t]);

  const scrollToSection = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTo({ left: index * container.offsetWidth, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const index = Math.round(container.scrollLeft / container.offsetWidth);
      setActiveSection(index);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [data]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight" && activeSection < sections.length - 1) {
        scrollToSection(activeSection + 1);
      } else if (e.key === "ArrowLeft" && activeSection > 0) {
        scrollToSection(activeSection - 1);
      }
    },
    [activeSection, scrollToSection, sections.length]
  );

  // Early return while data loads
  if (!data) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      {/* Sticky header */}
      <header className="shrink-0 bg-background/95 backdrop-blur border-b z-10">
        <div className="mx-auto max-w-5xl px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 min-w-0">
              <Logo />
              <div className="hidden sm:block">
                <h1 className="text-sm font-semibold truncate">{t("app.title")}</h1>
                <p className="text-xs text-muted-foreground truncate">
                  {data.season}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <IlvlFilter value={currentIlvl} onChange={setCurrentIlvl} />
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Section nav bar */}
      <nav className="shrink-0 bg-background/95 backdrop-blur border-b z-10">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex">
            {sections.map((s, i) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(i)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors flex-1 justify-center",
                    activeSection === i
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Horizontal scroll container */}
      <div className="relative flex-1 min-h-0">
        {/* Desktop arrows */}
        {activeSection > 0 && (
          <button
            onClick={() => scrollToSection(activeSection - 1)}
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-background/80 backdrop-blur border shadow-sm hover:bg-accent transition-colors"
            aria-label={t("aria.prevSection")}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {activeSection < sections.length - 1 && (
          <button
            onClick={() => scrollToSection(activeSection + 1)}
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-background/80 backdrop-blur border shadow-sm hover:bg-accent transition-colors"
            aria-label={t("aria.nextSection")}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex h-full overflow-x-auto snap-x snap-mandatory scrollbar-hidden"
          style={{ scrollBehavior: "auto" }}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {/* Panel: Upgrade Tracks */}
          <section className="w-full shrink-0 snap-center flex flex-col">
            <div className="mx-auto w-full max-w-4xl px-4 flex flex-col flex-1 min-h-0">
              <h2 className="text-xl font-semibold py-3 mb-3 border-b">{t("sections.upgradeTracks")}</h2>
              <UpgradeTracksSection tracks={data.upgradeTracks} currentIlvl={currentIlvl} />
            </div>
          </section>

          {/* Panel: Raid */}
          <section className="w-full shrink-0 snap-center overflow-y-auto">
            <div className="mx-auto max-w-4xl px-4 py-4">
              <h2 className="text-xl font-semibold mb-3">{t("sections.raid").replace("{name}", data.raid.name)}</h2>
              <RaidSection
                difficulties={data.raid.difficulties}
                notes={data.raid.notes}
                currentIlvl={currentIlvl}
              />
            </div>
          </section>

          {/* Panel: Dungeons */}
          <section className="w-full shrink-0 snap-center overflow-y-auto">
            <div className="mx-auto max-w-4xl px-4 py-4">
              <h2 className="text-xl font-semibold mb-3">{t("sections.dungeons")}</h2>
              <DungeonTable
                dungeons={data.dungeons}
                notes={data.dungeonNotes}
                currentIlvl={currentIlvl}
              />
            </div>
          </section>

          {/* Panel: Delves */}
          <section className="w-full shrink-0 snap-center overflow-y-auto">
            <div className="mx-auto max-w-4xl px-4 py-4">
              <h2 className="text-xl font-semibold mb-3">{t("sections.delves")}</h2>
              <DelvesSection
                bountifulDelves={data.bountifulDelves}
                bountyMaps={data.delversBountyMaps}
                notes={data.delveNotes}
                currentIlvl={currentIlvl}
              />
            </div>
          </section>

          {/* Panel: PvP */}
          <section className="w-full shrink-0 snap-center overflow-y-auto">
            <div className="mx-auto max-w-4xl px-4 py-4">
              <h2 className="text-xl font-semibold mb-3">{t("sections.pvp")}</h2>
              <PvpTable pvp={data.pvp} currentIlvl={currentIlvl} />
            </div>
          </section>

          {/* Panel: Info */}
          <section className="w-full shrink-0 snap-center overflow-y-auto">
            <div className="mx-auto max-w-4xl px-4 py-4">
              <h2 className="text-xl font-semibold mb-3">{t("sections.info")}</h2>
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
                    {data.version}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">{t("info.lastUpdated")}</span>{" "}
                    {data.lastUpdated}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">{t("info.season")}</span>{" "}
                    {data.season}
                  </p>
                </div>
                <p className="text-xs">
                  {t("info.disclaimer")}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="shrink-0 flex justify-center gap-2 py-2 bg-background border-t">
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => scrollToSection(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-200",
              activeSection === i
                ? "w-6 bg-primary"
                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            )}
            aria-label={s.label}
          />
        ))}
      </div>
    </div>
  );
}
