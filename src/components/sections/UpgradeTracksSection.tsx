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
import { CrestBadge } from "../shared/CrestBadge";
import { IlvlText } from "../shared/IlvlText";
import { cn, getIlvlTier } from "@/lib/utils";
import type { UpgradeTrack } from "../GearingGuide";

interface Props {
  tracks: UpgradeTrack[];
  currentIlvl: number | null;
}

interface AllTracksRow {
  ilvl: number;
  crestNames: string[];
  ranksByTrack: { [trackName: string]: number | null };
}

function getDefaultTrack(tracks: UpgradeTrack[], currentIlvl: number | null): string {
  if (currentIlvl === null) return "All";

  for (const track of tracks) {
    const minIlvl = track.ilvls[0];
    const maxIlvl = track.ilvls[track.ilvls.length - 1];
    if (currentIlvl >= minIlvl && currentIlvl <= maxIlvl) {
      return track.name;
    }
  }

  return currentIlvl > tracks[tracks.length - 1].ilvls[0]
    ? tracks[tracks.length - 1].name
    : tracks[0].name;
}

function getCrestsForRank(track: UpgradeTrack, rank: number): string[] {
  if (track.crestFromRank != null && rank < track.crestFromRank) {
    return [];
  } else if (track.secondaryCrestFromRank != null && rank >= track.secondaryCrestFromRank) {
    const crests: string[] = [];
    if (track.crest) crests.push(track.crest);
    if (track.secondaryCrest) crests.push(track.secondaryCrest);
    return crests;
  } else {
    return track.crest ? [track.crest] : [];
  }
}

function buildAllTracksData(tracks: UpgradeTrack[]): AllTracksRow[] {
  const ilvlMap = new Map<number, { crestNames: string[]; ranksByTrack: { [trackName: string]: number | null } }>();

  for (const track of tracks) {
    for (let rankIndex = 0; rankIndex < track.ilvls.length; rankIndex++) {
      const rank = rankIndex + 1;
      const ilvl = track.ilvls[rankIndex];
      const crests = getCrestsForRank(track, rank);

      if (!ilvlMap.has(ilvl)) {
        ilvlMap.set(ilvl, { crestNames: [], ranksByTrack: {} });
      }

      const entry = ilvlMap.get(ilvl)!;
      for (const crest of crests) {
        if (!entry.crestNames.includes(crest)) {
          entry.crestNames.push(crest);
        }
      }
      entry.ranksByTrack[track.name] = rank;
    }
  }

  for (const entry of ilvlMap.values()) {
    for (const track of tracks) {
      if (!(track.name in entry.ranksByTrack)) {
        entry.ranksByTrack[track.name] = null;
      }
    }
  }

  return Array.from(ilvlMap.entries())
    .map(([ilvl, data]) => ({ ilvl, ...data }))
    .sort((a, b) => a.ilvl - b.ilvl);
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
        <div className="h-full overflow-auto">
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
                    {row.crestNames.length > 0 ? (
                      <div className="flex gap-1 flex-wrap">
                        {row.crestNames.map((c) => <CrestBadge key={c} name={c} />)}
                      </div>
                    ) : "—"}
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
                  const crests = getCrestsForRank(track, rank);
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
                        {crests.length > 0 ? (
                          <div className="flex gap-1 flex-wrap">
                            {crests.map((c) => <CrestBadge key={c} name={c} />)}
                          </div>
                        ) : "—"}
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
