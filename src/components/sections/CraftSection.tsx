import { useI18n } from "@/i18n";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { CrestBadge } from "../shared/CrestBadge";
import { IlvlText } from "../shared/IlvlText";
import { cn } from "@/lib/utils";

interface CraftRow {
  crest: string;
  crestAmount: number;
  sparks: number;
  minIlvl: number;
  maxIlvl: number;
}

interface Props {
  craft: CraftRow[];
  currentIlvl: number | null;
}

export function CraftSection({ craft, currentIlvl }: Props) {
  const { t } = useI18n();

  return (
    <div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("table.crests")}</TableHead>
              <TableHead>{t("table.sparks")}</TableHead>
              <TableHead>ilvl</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {craft.map((row) => (
              <TableRow
                key={row.crest}
                className={cn(
                  currentIlvl != null && row.maxIlvl < currentIlvl && "opacity-30",
                  currentIlvl != null && row.maxIlvl >= currentIlvl && "bg-accent/50"
                )}
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <CrestBadge name={row.crest} />
                    <span className="text-sm text-muted-foreground">×{row.crestAmount}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {row.sparks > 0 ? row.sparks : "—"}
                </TableCell>
                <TableCell>
                  <IlvlText ilvl={row.minIlvl} /> → <IlvlText ilvl={row.maxIlvl} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
