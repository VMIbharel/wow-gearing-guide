import { useState, useRef, useEffect, useLayoutEffect, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight, Swords, Map, Landmark, Pickaxe, Castle, Info } from "lucide-react";
import { I18nProvider, useI18n, useGearingData } from "@/i18n";
import { UpgradeTracksSection } from "./sections/UpgradeTracksSection";
import { RaidSection } from "./sections/RaidSection";
import { DungeonTable } from "./sections/DungeonTable";
import { DelvesSection } from "./sections/DelvesSection";
import { PvpTable } from "./sections/PvpTable";
import { AppHeader } from "./layout/AppHeader";
import { SectionNav } from "./layout/SectionNav";
import { SectionDots } from "./layout/SectionDots";
import { LoadingScreen } from "./layout/LoadingScreen";
import { InfoSection } from "./sections/InfoSection";

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
  const activeSectionRef = useRef(activeSection);
  activeSectionRef.current = activeSection;

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
    setActiveSection(index);
    container.scrollTo({ left: index * container.offsetWidth, behavior: "smooth" });
  }, []);

  // Restore scroll position before paint when data reloads (language change remounts the container at 0)
  useLayoutEffect(() => {
    if (!data) return;
    const container = scrollRef.current;
    if (!container) return;
    container.scrollLeft = activeSectionRef.current * container.offsetWidth;
  }, [data]);

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

  // Keep header visible during language change
  if (!data) {
    return (
      <div className="flex flex-col h-dvh overflow-hidden">
        <AppHeader currentIlvl={currentIlvl} onIlvlChange={setCurrentIlvl} />
        <SectionNav sections={sections} activeSection={activeSection} onSectionClick={scrollToSection} />
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      <AppHeader season={data.season} currentIlvl={currentIlvl} onIlvlChange={setCurrentIlvl} />
      <SectionNav sections={sections} activeSection={activeSection} onSectionClick={scrollToSection} />

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
            <div className="glass-panel mx-auto w-full max-w-5xl px-4 py-4 flex flex-col flex-1 min-h-0">
              <h2 className="text-xl font-semibold mb-3">{t("sections.upgradeTracks")}</h2>
              <UpgradeTracksSection tracks={data.upgradeTracks} currentIlvl={currentIlvl} />
            </div>
          </section>

          {/* Panel: Raid */}
          <section className="w-full shrink-0 snap-center overflow-y-auto">
            <div className="glass-panel mx-auto w-full max-w-5xl px-4 py-4 min-h-full">
              <h2 className="text-xl font-semibold mb-3">{t("sections.raid")}</h2>
              <RaidSection
                raids={data.raids}
                notes={data.raids[0]?.notes ?? []}
                currentIlvl={currentIlvl}
              />
            </div>
          </section>

          {/* Panel: Dungeons */}
          <section className="w-full shrink-0 snap-center overflow-y-auto">
            <div className="glass-panel mx-auto w-full max-w-5xl px-4 py-4 min-h-full">
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
            <div className="glass-panel mx-auto w-full max-w-5xl px-4 py-4 min-h-full">
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
            <div className="glass-panel mx-auto w-full max-w-5xl px-4 py-4 min-h-full">
              <h2 className="text-xl font-semibold mb-3">{t("sections.pvp")}</h2>
              <PvpTable pvp={data.pvp} currentIlvl={currentIlvl} />
            </div>
          </section>

          {/* Panel: Info */}
          <section className="w-full shrink-0 snap-center overflow-y-auto">
            <div className="glass-panel mx-auto w-full max-w-5xl px-4 py-4 min-h-full">
              <h2 className="text-xl font-semibold mb-3">{t("sections.info")}</h2>
              <InfoSection version={data.version} lastUpdated={data.lastUpdated} season={data.season} />
            </div>
          </section>
        </div>
      </div>

      <SectionDots sections={sections} activeSection={activeSection} onSectionClick={scrollToSection} />
    </div>
  );
}
