import { useI18n } from "@/i18n";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { IlvlText } from "../shared/IlvlText";
import { cn } from "@/lib/utils";

interface TraqueRow {
  difficultyId: string;
  difficultyName: string;
  tier: number;
  lootIlvl: number;
  weeklyChestIlvl: number;
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
