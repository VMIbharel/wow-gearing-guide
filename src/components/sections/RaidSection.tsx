import { useMemo } from "react";
import { useI18n } from "@/i18n";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { CrestBadge } from "../shared/CrestBadge";
import { IlvlText } from "../shared/IlvlText";
import { cn } from "@/lib/utils";

interface BossGroup {
  bosses: string;
  lootIlvl: number;
  crest: string | null;
  crestAmount: number | null;
  secondaryCrest?: string;
  secondaryCrestAmount?: number;
}

interface Difficulty {
  name: string;
  bossGroups: BossGroup[];
}

interface Raid {
  raidId: string;
  name: string;
  difficulties: Difficulty[];
  notes: string[];
}

interface Props {
  difficulties?: Difficulty[];
  raids?: Raid[];
  notes: string[];
  currentIlvl: number | null;
}

export function RaidSection({ difficulties, raids, notes, currentIlvl }: Props) {
  const { t } = useI18n();

  // Pre-sort boss groups once — raids data is static, sort never changes
  const sortedRaids = useMemo(() =>
    raids?.map((raid) => ({
      ...raid,
      difficulties: raid.difficulties.map((diff) => ({
        ...diff,
        normalBosses: diff.bossGroups
          .filter((bg) => bg.bosses !== "Very Rare")
          .sort((a, b) => a.lootIlvl - b.lootIlvl),
        veryRare: diff.bossGroups.find((bg) => bg.bosses === "Very Rare"),
      })),
    })),
  [raids]);

  // If raids are provided, create tabs by difficulty
  if (raids && sortedRaids) {
    // Extract unique difficulties from all raids
    const allDifficulties = raids[0]?.difficulties ?? [];

    return (
      <div>
        <Tabs defaultValue={allDifficulties[1]?.name ?? allDifficulties[0]?.name}>
          <TabsList>
            {allDifficulties.map((d) => (
              <TabsTrigger key={d.name} value={d.name}>
                {d.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {allDifficulties.map((difficulty) => (
            <TabsContent key={difficulty.name} value={difficulty.name}>
              <div className="h-full overflow-auto">
                {sortedRaids.map((raid) => {
                  const raidDiff = raid.difficulties.find(d => d.name === difficulty.name);
                  const normalBosses = raidDiff?.normalBosses ?? [];
                  const veryRare = raidDiff?.veryRare;

                  return (
                    <div key={raid.raidId}>
                      <h3 className="text-lg font-semibold mb-3">{raid.name}</h3>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>{t("table.bosses")}</TableHead>
                              <TableHead>{t("table.loot")}</TableHead>
                              <TableHead>{t("table.crests")}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {normalBosses.map((bg) => (
                                <TableRow
                                  key={`${raid.raidId}-${difficulty.name}-${bg.bosses}`}
                                  className={cn(
                                    currentIlvl != null && bg.lootIlvl < currentIlvl && "opacity-30",
                                    currentIlvl != null && bg.lootIlvl >= currentIlvl && "bg-accent/50"
                                  )}
                                >
                                  <TableCell className="font-medium">{bg.bosses}</TableCell>
                                  <TableCell><IlvlText ilvl={bg.lootIlvl} /></TableCell>
                                  <TableCell className="flex gap-1 flex-wrap items-center">
                                    {bg.crest && (
                                      <>
                                        <span className="text-xs font-semibold">{bg.crestAmount}</span>
                                        <CrestBadge name={bg.crest} />
                                      </>
                                    )}
                                    {bg.secondaryCrest && (
                                      <>
                                        <span className="text-xs font-semibold">{bg.secondaryCrestAmount}</span>
                                        <CrestBadge name={bg.secondaryCrest} />
                                      </>
                                    )}
                                    {!bg.crest && !bg.secondaryCrest && "—"}
                                  </TableCell>
                                </TableRow>
                              ))}
                            {veryRare && (
                              <TableRow
                                className={cn(
                                  currentIlvl != null && veryRare.lootIlvl < currentIlvl && "opacity-30",
                                  currentIlvl != null && veryRare.lootIlvl >= currentIlvl && "bg-accent/50"
                                )}
                              >
                                <TableCell className="font-medium">{veryRare.bosses}</TableCell>
                                <TableCell><IlvlText ilvl={veryRare.lootIlvl} /></TableCell>
                                <TableCell className="flex gap-1 flex-wrap items-center">
                                  {veryRare.crest && (
                                    <>
                                      <span className="text-xs font-semibold">{veryRare.crestAmount}</span>
                                      <CrestBadge name={veryRare.crest} />
                                    </>
                                  )}
                                  {veryRare.secondaryCrest && (
                                    <>
                                      <span className="text-xs font-semibold">{veryRare.secondaryCrestAmount}</span>
                                      <CrestBadge name={veryRare.secondaryCrest} />
                                    </>
                                  )}
                                  {!veryRare.crest && !veryRare.secondaryCrest && "—"}
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        {notes.length > 0 && (
          <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
            {notes.map((note, i) => (
              <li key={i}>• {note}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  // Original behavior with difficulties tabs
  return (
    <div>
      <Tabs defaultValue={difficulties![1]?.name ?? difficulties![0]?.name}>
        <TabsList>
          {difficulties!.map((d) => (
            <TabsTrigger key={d.name} value={d.name}>
              {d.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {difficulties!.map((diff) => (
          <TabsContent key={diff.name} value={diff.name}>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("table.bosses")}</TableHead>
                    <TableHead>{t("table.loot")}</TableHead>
                    <TableHead>{t("table.crests")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {diff.bossGroups.map((bg) => (
                    <TableRow
                      key={bg.bosses}
                      className={cn(
                        currentIlvl != null && bg.lootIlvl < currentIlvl && "opacity-30",
                        currentIlvl != null && bg.lootIlvl >= currentIlvl && "bg-accent/50"
                      )}
                    >
                      <TableCell className="font-medium">{bg.bosses}</TableCell>
                      <TableCell><IlvlText ilvl={bg.lootIlvl} /></TableCell>
                      <TableCell className="flex gap-1 flex-wrap items-center">
                        {bg.crest && (
                          <>
                            <span className="text-xs font-semibold">{bg.crestAmount}</span>
                            <CrestBadge name={bg.crest} />
                          </>
                        )}
                        {bg.secondaryCrest && (
                          <>
                            <span className="text-xs font-semibold">{bg.secondaryCrestAmount}</span>
                            <CrestBadge name={bg.secondaryCrest} />
                          </>
                        )}
                        {!bg.crest && !bg.secondaryCrest && "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      {notes.length > 0 && (
        <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
          {notes.map((note, i) => (
            <li key={i}>• {note}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
