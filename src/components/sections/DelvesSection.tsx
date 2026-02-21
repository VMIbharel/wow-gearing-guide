import { memo, useState } from "react";
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
import { IlvlText } from "../shared/IlvlText";
import { cn } from "@/lib/utils";

interface BountifulDelve {
  tier: number;
  lootIlvl: number | null;
  vaultIlvl: number | null;
  crest: string | null;
  crestAmount: number | null;
  bonusCrest?: string;
  bonusAmount?: number;
  secondaryCrest?: string;
  secondaryAmount?: number;
}

interface ClassicDelve {
  tier: number;
  lootIlvl: number | null;
  vaultIlvl: number | null;
  crest: string | null;
  crestAmount: number | null;
}

interface BountyMap {
  tier: number;
  lootIlvl: number | null;
  crest: string | null;
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

function getIlvlStatus(rowIlvl: number | null, currentIlvl: number | null): IlvlStatus {
  if (rowIlvl == null || currentIlvl == null) return "none";
  return rowIlvl < currentIlvl ? "below" : "above";
}

const BountifulDelveRow = memo(
  function BountifulDelveRow({ d, currentIlvl }: { d: BountifulDelve; currentIlvl: number | null }) {
    return (
      <TableRow
        className={cn(
          currentIlvl != null && d.vaultIlvl != null && d.vaultIlvl < currentIlvl && "opacity-30",
          currentIlvl != null && d.vaultIlvl != null && d.vaultIlvl >= currentIlvl && "bg-accent/50"
        )}
      >
        <TableCell className="font-medium" style={{ width: "12%" }}>T{d.tier}</TableCell>
        <TableCell style={{ width: "29%" }}>{d.lootIlvl != null ? <IlvlText ilvl={d.lootIlvl} /> : "—"}</TableCell>
        <TableCell style={{ width: "29%" }}>{d.vaultIlvl != null ? <IlvlText ilvl={d.vaultIlvl} /> : "—"}</TableCell>
        <TableCell className="flex gap-1 items-center" style={{ width: "30%" }}>
          {d.crest && d.crestAmount != null ? (
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
        <TableCell className="font-medium" style={{ width: "12%" }}>T{d.tier}</TableCell>
        <TableCell style={{ width: "29%" }}>{d.lootIlvl != null ? <IlvlText ilvl={d.lootIlvl} /> : "—"}</TableCell>
        <TableCell style={{ width: "29%" }}>{d.vaultIlvl != null ? <IlvlText ilvl={d.vaultIlvl} /> : "—"}</TableCell>
        <TableCell className="flex gap-1 items-center" style={{ width: "30%" }}>
          {d.crest && d.crestAmount != null ? (
            <>
              <span className="text-xs font-semibold">{d.crestAmount}</span>
              <CrestBadge name={d.crest} />
            </>
          ) : "—"}
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
          currentIlvl != null && m.lootIlvl != null && m.lootIlvl < currentIlvl && "opacity-30",
          currentIlvl != null && m.lootIlvl != null && m.lootIlvl >= currentIlvl && "bg-accent/50"
        )}
      >
        <TableCell className="font-medium" style={{ width: "12%" }}>T{m.tier}</TableCell>
        <TableCell style={{ width: "29%" }}>{m.lootIlvl != null ? <IlvlText ilvl={m.lootIlvl} /> : "—"}</TableCell>
        <TableCell style={{ width: "29%" }}>N/A</TableCell>
        <TableCell style={{ width: "30%" }}>
          <div className="flex gap-1 flex-wrap items-center">
            {m.crest && m.crestAmount != null && m.crestAmount > 0 && (
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
            {(!m.crest || m.crestAmount == null || m.crestAmount === 0) && !m.secondaryCrest && "—"}
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
  const [activeTab, setActiveTab] = useState("classic");

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Mobile: Select */}
        <div className="md:hidden shrink-0 pb-3">
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="classic">{t("tabs.classicDelves")}</SelectItem>
              <SelectItem value="bountiful">{t("tabs.bountifulDelves")}</SelectItem>
              <SelectItem value="maps">{t("tabs.bountyMaps")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Desktop: TabsList */}
        <TabsList className="max-md:hidden w-full flex-wrap border-b shrink-0 gap-y-1 [display:flex!important] h-[auto!important]">
          <TabsTrigger value="classic">{t("tabs.classicDelves")}</TabsTrigger>
          <TabsTrigger value="bountiful">{t("tabs.bountifulDelves")}</TabsTrigger>
          <TabsTrigger value="maps">{t("tabs.bountyMaps")}</TabsTrigger>
        </TabsList>

        <TabsContent value="classic">
          <div className="h-full overflow-auto">
            <div className="overflow-x-auto w-full">
              <Table className="w-full" style={{ tableLayout: "fixed" }}>
                <TableHeader>
                  <TableRow>
                    <TableHead style={{ width: "12%" }}>{t("table.tier")}</TableHead>
                    <TableHead style={{ width: "29%" }}>{t("table.loot")}</TableHead>
                    <TableHead style={{ width: "29%" }}>{t("table.vault")}</TableHead>
                    <TableHead style={{ width: "30%" }}>{t("table.crests")}</TableHead>
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
            <div className="overflow-x-auto w-full">
              <Table className="w-full" style={{ tableLayout: "fixed" }}>
                <TableHeader>
                  <TableRow>
                    <TableHead style={{ width: "12%" }}>{t("table.tier")}</TableHead>
                    <TableHead style={{ width: "29%" }}>{t("table.loot")}</TableHead>
                    <TableHead style={{ width: "29%" }}>{t("table.vault")}</TableHead>
                    <TableHead style={{ width: "30%" }}>{t("table.crests")}</TableHead>
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
            <div className="overflow-x-auto w-full">
              <Table className="w-full" style={{ tableLayout: "fixed" }}>
                <TableHeader>
                  <TableRow>
                    <TableHead style={{ width: "12%" }}>{t("table.tier")}</TableHead>
                    <TableHead style={{ width: "29%" }}>{t("table.loot")}</TableHead>
                    <TableHead style={{ width: "29%" }}>{t("table.vault")}</TableHead>
                    <TableHead style={{ width: "30%" }}>{t("table.crests")}</TableHead>
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
