import { memo } from "react";
import { useI18n } from "@/i18n";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { CrestBadge } from "../shared/CrestBadge";
import { IlvlText } from "../shared/IlvlText";
import { cn } from "@/lib/utils";

interface BountifulDelve {
  tier: number;
  lootIlvl: number;
  vaultIlvl: number;
  crest: string | null;
  crestAmount: number;
  bonusCrest?: string;
  bonusAmount?: number;
  secondaryCrest?: string;
  secondaryAmount?: number;
}

interface ClassicDelve {
  tier: number;
  crest: string;
  crestAmount: number;
}

interface BountyMap {
  tier: number;
  lootIlvl: number;
  crest: string;
  crestAmount: number | null;
  secondaryCrest?: string;
  secondaryAmount?: number;
}

interface Props {
  bountifulDelves: BountifulDelve[];
  classicDelves: ClassicDelve[];
  bountyMaps: BountyMap[];
  notes: string[];
  currentIlvl: number | null;
}

type IlvlStatus = "below" | "above" | "none";

function getIlvlStatus(rowIlvl: number, currentIlvl: number | null): IlvlStatus {
  if (currentIlvl == null) return "none";
  return rowIlvl < currentIlvl ? "below" : "above";
}

const BountifulDelveRow = memo(
  function BountifulDelveRow({ d, currentIlvl }: { d: BountifulDelve; currentIlvl: number | null }) {
    return (
      <TableRow
        className={cn(
          currentIlvl != null && d.vaultIlvl < currentIlvl && "opacity-30",
          currentIlvl != null && d.vaultIlvl >= currentIlvl && "bg-accent/50"
        )}
      >
        <TableCell className="font-medium">T{d.tier}</TableCell>
        <TableCell><IlvlText ilvl={d.lootIlvl} /></TableCell>
        <TableCell><IlvlText ilvl={d.vaultIlvl} /></TableCell>
        <TableCell className="flex gap-1 items-center">
          {d.crest ? (
            <>
              <span className="text-xs font-semibold">{d.crestAmount}</span>
              <CrestBadge name={d.crest} />
            </>
          ) : "—"}
        </TableCell>
      </TableRow>
    );
  },
  (prev, next) =>
    getIlvlStatus(prev.d.vaultIlvl, prev.currentIlvl) ===
    getIlvlStatus(next.d.vaultIlvl, next.currentIlvl)
);

const ClassicDelveRow = memo(
  function ClassicDelveRow({ d }: { d: ClassicDelve }) {
    return (
      <TableRow>
        <TableCell className="font-medium">T{d.tier}</TableCell>
        <TableCell className="flex gap-1 items-center">
          <span className="text-xs font-semibold">{d.crestAmount}</span>
          <CrestBadge name={d.crest} />
        </TableCell>
      </TableRow>
    );
  }
);

const BountyMapRow = memo(
  function BountyMapRow({ m, currentIlvl }: { m: BountyMap; currentIlvl: number | null }) {
    return (
      <TableRow
        className={cn(
          currentIlvl != null && m.lootIlvl < currentIlvl && "opacity-30",
          currentIlvl != null && m.lootIlvl >= currentIlvl && "bg-accent/50"
        )}
      >
        <TableCell className="font-medium">T{m.tier}</TableCell>
        <TableCell><IlvlText ilvl={m.lootIlvl} /></TableCell>
        <TableCell>
          <div className="flex gap-1 flex-wrap items-center">
            {m.crestAmount != null && m.crestAmount > 0 && (
              <>
                <span className="text-xs font-semibold">{m.crestAmount}</span>
                <CrestBadge name={m.crest} />
              </>
            )}
            {m.secondaryCrest && m.secondaryAmount != null && m.secondaryAmount > 0 && (
              <>
                <span className="text-xs font-semibold">{m.secondaryAmount}</span>
                <CrestBadge name={m.secondaryCrest} />
              </>
            )}
            {(m.crestAmount == null || m.crestAmount === 0) && !m.secondaryCrest && "—"}
          </div>
        </TableCell>
      </TableRow>
    );
  },
  (prev, next) =>
    getIlvlStatus(prev.m.lootIlvl, prev.currentIlvl) ===
    getIlvlStatus(next.m.lootIlvl, next.currentIlvl)
);

export function DelvesSection({ classicDelves, bountifulDelves,  bountyMaps, notes, currentIlvl }: Props) {
  const { t } = useI18n();

  return (
    <div>
      <Tabs defaultValue="classic">
        <TabsList>
          <TabsTrigger value="classic">{t("tabs.classicDelves")}</TabsTrigger>
          <TabsTrigger value="bountiful">{t("tabs.bountifulDelves")}</TabsTrigger>
          <TabsTrigger value="maps">{t("tabs.bountyMaps")}</TabsTrigger>
        </TabsList>

        <TabsContent value="classic">
          <div className="h-full overflow-auto">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("table.tier")}</TableHead>
                    <TableHead>{t("table.crests")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classicDelves.map((d) => (
                    <ClassicDelveRow key={d.tier} d={d} />
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bountiful">
          <div className="h-full overflow-auto">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("table.tier")}</TableHead>
                    <TableHead>{t("table.loot")}</TableHead>
                    <TableHead>{t("table.vault")}</TableHead>
                    <TableHead>{t("table.crests")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bountifulDelves.map((d) => (
                    <BountifulDelveRow key={d.tier} d={d} currentIlvl={currentIlvl} />
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="maps">
          <div className="h-full overflow-auto">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("table.tier")}</TableHead>
                    <TableHead>{t("table.loot")}</TableHead>
                    <TableHead>{t("table.crests")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bountyMaps.map((m) => (
                    <BountyMapRow key={m.tier} m={m} currentIlvl={currentIlvl} />
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
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
