import { useState, useMemo } from "react";
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
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { CrestBadge } from "../shared/CrestBadge";
import { CurrencyIcon } from "../shared/CurrencyIcon";
import { IlvlText } from "../shared/IlvlText";
import { cn, getIlvlTier } from "@/lib/utils";
import type { UpgradeTrack } from "../GearingGuide";

interface Props {
  tracks: UpgradeTrack[];
  currentIlvl: number | null;
}

interface AllTracksRow {
  ilvl: number;
  ranksByTrack: { [trackId: string]: number | null };
}

function getDefaultTrack(tracks: UpgradeTrack[], currentIlvl: number | null): string {
  if (currentIlvl === null) return "all";

  for (const track of tracks) {
    const minIlvl = track.ilvls[0];
    const maxIlvl = track.ilvls[track.ilvls.length - 1];
    if (currentIlvl >= minIlvl && currentIlvl <= maxIlvl) {
      return track.trackId;
    }
  }

  return currentIlvl > tracks[tracks.length - 1].ilvls[0]
    ? tracks[tracks.length - 1].trackId
    : tracks[0].trackId;
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
  const ilvlMap = new Map<number, { [trackId: string]: number | null }>();

  for (const track of tracks) {
    for (let i = 0; i < track.ilvls.length; i++) {
      const ilvl = track.ilvls[i];
      const rank = i + 1;
      if (!ilvlMap.has(ilvl)) {
        ilvlMap.set(ilvl, {});
      }
      ilvlMap.get(ilvl)![track.trackId] = rank;
    }
  }

  for (const entry of ilvlMap.values()) {
    for (const track of tracks) {
      if (!(track.trackId in entry)) {
        entry[track.trackId] = null;
      }
    }
  }

  return Array.from(ilvlMap.entries())
    .map(([ilvl, ranksByTrack]) => ({ ilvl, ranksByTrack }))
    .sort((a, b) => a.ilvl - b.ilvl);
}

export function UpgradeTracksSection({ tracks, currentIlvl }: Props) {
  const { t } = useI18n();
  const defaultTrack = getDefaultTrack(tracks, currentIlvl);
  const allTracksData = useMemo(() => buildAllTracksData(tracks), [tracks]);
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
            <SelectItem value="all">{t("tabs.all")}</SelectItem>
            {tracks.map((track) => (
              <SelectItem key={track.trackId} value={track.trackId}>
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
        <TabsTrigger value="all">
          {t("tabs.all")}
        </TabsTrigger>
        {tracks.map((track) => (
          <TabsTrigger key={track.trackId} value={track.trackId}>
            <span
              className="inline-block w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: `var(--tier-${getIlvlTier(track.ilvls[0])})` }}
              aria-hidden="true"
            />
            {track.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* "All" tab — tableau sans colonne Écus partagée */}
      <TabsContent value="all" className="flex-1 min-h-0">
        <div className="h-full overflow-auto">
          <Table>
            <TableHeader className="table-header-sticky">
              <TableRow className="border-b">
                <TableHead>{t("table.ilvl")}</TableHead>
                {tracks.map((track) => (
                  <TableHead key={track.trackId} className="text-center text-sm">
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
                    {tracks.map((track) => {
                      const rank = row.ranksByTrack[track.trackId];
                      if (rank === null) {
                        return <TableCell key={track.trackId} />;
                      }
                      const crests = getCrestsForRank(track, rank);
                      const hasGold = track.goldPerRank != null && track.goldPerRank > 0;
                      return (
                        <TableCell key={track.trackId} className="text-center">
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-sm font-bold">{rank}</span>
                            {hasGold && (
                              <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                                {track.goldPerRank} <CurrencyIcon type="gold" />
                              </span>
                            )}
                            {crests.length > 0 && (
                              <div className="flex gap-0.5 flex-wrap justify-center items-center">
                                {crests.map((c) => (
                                  <CrestBadge key={c} name={c} amount={track.crestPerRank ?? undefined} />
                                ))}
                              </div>
                            )}
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      {/* Onglets individuels par track */}
      {tracks.map((track) => (
        <TabsContent key={track.trackId} value={track.trackId} className="flex-1 min-h-0 flex flex-col">
          {(track.crestPerRank != null && track.crestPerRank > 0) || (track.goldPerRank != null && track.goldPerRank > 0) ? (
            <p className="text-xs text-muted-foreground mb-2 shrink-0 flex items-center gap-1 flex-wrap">
              {track.crestPerRank ?? 0} {t("game.tracks.costNoteCrests" as any)}
              {" + "}
              {track.goldPerRank ?? 0} <CurrencyIcon type="gold" /> {t("game.tracks.costNotePerUpgrade" as any)}
            </p>
          ) : null}
          <div className="flex-1 min-h-0 overflow-auto scrollbar-sexy">
            <Table>
              <TableHeader className="table-header-sticky">
                <TableRow className="border-b">
                  <TableHead>{t("table.ilvl")}</TableHead>
                  <TableHead>{t("table.crests")}</TableHead>
                  <TableHead>{t("table.gold")}</TableHead>
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
                          <div className="flex gap-1 flex-wrap items-center">
                            {crests.map((c) => (
                              <div key={c} className="flex gap-1 items-center">
                                {track.crestPerRank != null && <span className="text-xs font-semibold">{track.crestPerRank}</span>}
                                <CrestBadge name={c} />
                              </div>
                            ))}
                          </div>
                        ) : "—"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {track.goldPerRank != null && track.goldPerRank > 0 ? (
                          <span className="flex items-center gap-0.5">
                            {track.goldPerRank} <CurrencyIcon type="gold" />
                          </span>
                        ) : "—"}
                      </TableCell>
                      <TableCell>{rank}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
