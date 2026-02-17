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

interface Props {
  difficulties: Difficulty[];
  notes: string[];
  currentIlvl: number | null;
}

export function RaidSection({ difficulties, notes, currentIlvl }: Props) {
  const { t } = useI18n();

  return (
    <div>
      <Tabs defaultValue={difficulties[1]?.name ?? difficulties[0]?.name}>
        <TabsList>
          {difficulties.map((d) => (
            <TabsTrigger key={d.name} value={d.name}>
              {d.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {difficulties.map((diff) => (
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
                        {bg.crest && bg.secondaryCrest && bg.crestAmount && !bg.secondaryCrestAmount ? (
                          <>
                            <span className="text-xs font-semibold">{bg.crestAmount}</span>
                            <span className="text-xs text-muted-foreground">(</span>
                            <CrestBadge name={bg.crest} />
                            <span className="text-xs text-muted-foreground">/</span>
                            <CrestBadge name={bg.secondaryCrest} />
                            <span className="text-xs text-muted-foreground">)</span>
                          </>
                        ) : (
                          <>
                            {bg.crest && (
                              <>
                                {bg.crestAmount && <span className="text-xs font-semibold mr-1">{bg.crestAmount}</span>}
                                <CrestBadge name={bg.crest} />
                              </>
                            )}
                            {bg.secondaryCrest && (
                              <>
                                {bg.secondaryCrestAmount && <span className="text-xs font-semibold mr-1">{bg.secondaryCrestAmount}</span>}
                                <CrestBadge name={bg.secondaryCrest} />
                              </>
                            )}
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
