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

interface BountyMap {
  tier: number;
  lootIlvl: number;
  crest: string;
  crestAmount: number | null;
}

interface Props {
  bountifulDelves: BountifulDelve[];
  bountyMaps: BountyMap[];
  notes: string[];
  currentIlvl: number | null;
}

export function DelvesSection({ bountifulDelves, bountyMaps, notes, currentIlvl }: Props) {
  const { t } = useI18n();

  return (
    <div>
      <Tabs defaultValue="bountiful">
        <TabsList>
          <TabsTrigger value="bountiful">{t("tabs.bountifulDelves")}</TabsTrigger>
          <TabsTrigger value="maps">{t("tabs.bountyMaps")}</TabsTrigger>
        </TabsList>

        <TabsContent value="bountiful">
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
                  <TableRow
                    key={d.tier}
                    className={cn(
                      currentIlvl != null && d.vaultIlvl < currentIlvl && "opacity-30",
                      currentIlvl != null && d.vaultIlvl >= currentIlvl && "bg-accent/50"
                    )}
                  >
                    <TableCell className="font-medium">T{d.tier}</TableCell>
                    <TableCell><IlvlText ilvl={d.lootIlvl} /></TableCell>
                    <TableCell><IlvlText ilvl={d.vaultIlvl} /></TableCell>
                    <TableCell>
                      {d.crest ? <CrestBadge name={d.crest} /> : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="maps">
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
                  <TableRow
                    key={m.tier}
                    className={cn(
                      currentIlvl != null && m.lootIlvl < currentIlvl && "opacity-30",
                      currentIlvl != null && m.lootIlvl >= currentIlvl && "bg-accent/50"
                    )}
                  >
                    <TableCell className="font-medium">T{m.tier}</TableCell>
                    <TableCell><IlvlText ilvl={m.lootIlvl} /></TableCell>
                    <TableCell>
                      <CrestBadge name={m.crest} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
