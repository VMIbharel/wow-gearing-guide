import { useState } from "react";
import { useI18n } from "@/i18n";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { CrestBadge } from "./CrestBadge";
import { IlvlText } from "./IlvlText";
import { cn, getIlvlTier } from "@/lib/utils";
import type { UpgradeTrack } from "./GearingGuide";

interface Props {
  tracks: UpgradeTrack[];
  currentIlvl: number | null;
}

interface AllTracksRow {
  ilvl: number;
  crestName: string | null;
  ranksByTrack: { [trackName: string]: number | null };
}

function getDefaultTrack(tracks: UpgradeTrack[], currentIlvl: number | null): string {
  if (currentIlvl === null) return "All"; // "All" par défaut

  // Trouver le track où currentIlvl est dans la range
  for (const track of tracks) {
    const minIlvl = track.ilvls[0];
    const maxIlvl = track.ilvls[track.ilvls.length - 1];
    if (currentIlvl >= minIlvl && currentIlvl <= maxIlvl) {
      return track.name;
    }
  }

  // Si trop haut, retourner Myth; si trop bas, Explorer
  return currentIlvl > tracks[tracks.length - 1].ilvls[0]
    ? tracks[tracks.length - 1].name
    : tracks[0].name;
}

function buildAllTracksData(tracks: UpgradeTrack[]): AllTracksRow[] {
  const ilvlMap = new Map<number, { crestName: string | null; ranksByTrack: { [trackName: string]: number | null } }>();

  // Parcourir tous les tracks et remplir la map
  for (const track of tracks) {
    for (let rankIndex = 0; rankIndex < track.ilvls.length; rankIndex++) {
      const rank = rankIndex + 1;
      const ilvl = track.ilvls[rankIndex];

      // Déterminer le crest basé sur le rank et les transitions
      let crestName: string | null = null;
      if (track.crestFromRank != null && rank < track.crestFromRank) {
        crestName = null;
      } else if (track.secondaryCrestFromRank != null && rank >= track.secondaryCrestFromRank) {
        crestName = track.secondaryCrest ?? null;
      } else {
        crestName = track.crest;
      }

      if (!ilvlMap.has(ilvl)) {
        ilvlMap.set(ilvl, { crestName, ranksByTrack: {} });
      }

      const entry = ilvlMap.get(ilvl)!;
      // Le crest est le même pour tous les tracks à cet ilvl, on peut le garder
      if (crestName && !entry.crestName) {
        entry.crestName = crestName;
      }
      entry.ranksByTrack[track.name] = rank;
    }
  }

  // Initialiser ranksByTrack pour tous les tracks
  for (const entry of ilvlMap.values()) {
    for (const track of tracks) {
      if (!(track.name in entry.ranksByTrack)) {
        entry.ranksByTrack[track.name] = null;
      }
    }
  }

  // Convertir en array et trier par ilvl croissant
  return Array.from(ilvlMap.entries())
    .map(([ilvl, data]) => ({ ilvl, ...data }))
    .sort((a, b) => a.ilvl - b.ilvl);
}

function getCrestForRank(track: UpgradeTrack, rank: number): string | null {
  if (track.crestFromRank != null && rank < track.crestFromRank) {
    return null;
  } else if (track.secondaryCrestFromRank != null && rank >= track.secondaryCrestFromRank) {
    return track.secondaryCrest ?? null;
  } else {
    return track.crest;
  }
}

export function UpgradeTracksSection({ tracks, currentIlvl }: Props) {
  const { t } = useI18n();
  const defaultTrack = getDefaultTrack(tracks, currentIlvl);
  const allTracksData = buildAllTracksData(tracks);
  const [activeTab, setActiveTab] = useState(defaultTrack);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1 min-h-0">
      {/* Mobile: Select */}
      <div className="md:hidden shrink-0 pb-3">
        <Select value={activeTab} onValueChange={setActiveTab}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">{t("tabs.all")}</SelectItem>
            {tracks.map((track) => (
              <SelectItem key={track.name} value={track.name}>
                <span
                  className="inline-block w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: `var(--tier-${getIlvlTier(track.ilvls[0])})` }}
                  aria-hidden="true"
                />
                {track.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop: TabsList */}
      <TabsList className="max-md:hidden w-full flex-wrap border-b shrink-0 gap-y-1 [display:flex!important] h-[auto!important]">
        <TabsTrigger value="All">
          {t("tabs.all")}
        </TabsTrigger>
        {tracks.map((track) => (
          <TabsTrigger key={track.name} value={track.name}>
            <span
              className="inline-block w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: `var(--tier-${getIlvlTier(track.ilvls[0])})` }}
              aria-hidden="true"
            />
            {track.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Onglet "All" */}
      <TabsContent value="All" className="flex-1 min-h-0">
        <div className="h-full overflow-auto scrollbar-sexy">
          <table className="w-full caption-bottom text-sm">
            <TableHeader className="table-header-sticky">
              <TableRow className="border-b">
                <TableHead>{t("table.ilvl")}</TableHead>
                <TableHead>{t("table.crests")}</TableHead>
                {tracks.map((track) => (
                  <TableHead key={track.name} className="text-center text-sm">
                    {track.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {allTracksData.map((row) => {
                const isHighlighted = currentIlvl != null && row.ilvl > currentIlvl;
                const isBelow = currentIlvl != null && row.ilvl <= currentIlvl;

                return (
                  <TableRow
                    key={row.ilvl}
                    className={cn(
                      isBelow && "opacity-30",
                      isHighlighted && "bg-accent/50 hover:bg-accent/70"
                    )}
                  >
                  <TableCell>
                    <IlvlText ilvl={row.ilvl} />
                  </TableCell>
                  <TableCell>
                    {row.crestName ? <CrestBadge name={row.crestName} /> : "—"}
                  </TableCell>
                  {tracks.map((track) => (
                    <TableCell key={track.name} className="text-center text-sm">
                      {row.ranksByTrack[track.name] !== null ? row.ranksByTrack[track.name] : ""}
                    </TableCell>
                  ))}
                </TableRow>
                );
              })}
            </TableBody>
          </table>
        </div>
      </TabsContent>

      {/* Onglets individuels par track */}
      {tracks.map((track) => (
        <TabsContent key={track.name} value={track.name} className="flex-1 min-h-0">
          <div className="h-full overflow-auto scrollbar-sexy">
            <table className="w-full caption-bottom text-sm">
              <TableHeader className="table-header-sticky">
                <TableRow className="border-b">
                  <TableHead>{t("table.ilvl")}</TableHead>
                  <TableHead>{t("table.crests")}</TableHead>
                  <TableHead>{t("table.rank")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {track.ilvls.map((ilvl, rankIndex) => {
                  const rank = rankIndex + 1;
                  const crestName = getCrestForRank(track, rank);
                  const isHighlighted = currentIlvl != null && ilvl > currentIlvl;
                  const isBelow = currentIlvl != null && ilvl <= currentIlvl;

                  return (
                    <TableRow
                      key={rank}
                      className={cn(
                        isBelow && "opacity-30",
                        isHighlighted && "bg-accent/50 hover:bg-accent/70"
                      )}
                    >
                      <TableCell>
                        <IlvlText ilvl={ilvl} />
                      </TableCell>
                      <TableCell>
                        {crestName ? <CrestBadge name={crestName} /> : "—"}
                      </TableCell>
                      <TableCell>{rank}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </table>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
