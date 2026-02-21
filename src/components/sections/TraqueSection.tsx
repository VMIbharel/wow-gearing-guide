import { useI18n } from "@/i18n";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { CrestBadge } from "../shared/CrestBadge";
import { IlvlText } from "../shared/IlvlText";
import { cn } from "@/lib/utils";

interface TraqueRow {
  difficultyId: string;
  difficultyName: string;
  tier: number;
  lootIlvl: number;
  weeklyChestIlvl: number;
  crest?: string;
  minCrestAmount?: number;
  maxCrestAmount?: number;
  weeklyQuestCrest?: string;
  weeklyQuestCrestAmount?: number;
}

interface Props {
  traque: TraqueRow[];
  currentIlvl: number | null;
}

export function TraqueSection({ traque, currentIlvl }: Props) {
  const { t } = useI18n();

  return (
    <div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("table.tier")}</TableHead>
              <TableHead>{t("table.contract")}</TableHead>
              <TableHead>{t("table.weeklyChest")}</TableHead>
              <TableHead>{t("table.crests")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {traque.map((row) => (
              <TableRow
                key={row.difficultyId}
                className={cn(
                  currentIlvl != null && row.weeklyChestIlvl < currentIlvl && "opacity-30",
                  currentIlvl != null && row.weeklyChestIlvl >= currentIlvl && "bg-accent/50"
                )}
              >
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{row.difficultyName}</span>
                    <span className="text-xs text-muted-foreground">Palier {row.tier}</span>
                  </div>
                </TableCell>
                <TableCell><IlvlText ilvl={row.lootIlvl} /></TableCell>
                <TableCell><IlvlText ilvl={row.weeklyChestIlvl} /></TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    {row.crest && row.minCrestAmount != null && row.maxCrestAmount != null && (
                      <div className="flex gap-1 items-center">
                        <span className="text-xs font-semibold">{row.minCrestAmount}–{row.maxCrestAmount}</span>
                        <CrestBadge name={row.crest} />
                      </div>
                    )}
                    {row.weeklyQuestCrest && row.weeklyQuestCrestAmount != null && (
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-semibold">{row.weeklyQuestCrestAmount}</span>
                        <CrestBadge name={row.weeklyQuestCrest} />
                        <span className="text-xs text-muted-foreground">(hebdo)</span>
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
