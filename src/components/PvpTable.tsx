import { useI18n } from "@/i18n";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { IlvlText } from "./IlvlText";
import { cn } from "@/lib/utils";

interface PvpGear {
  type: string;
  ilvl: number;
}

interface Props {
  pvp: PvpGear[];
  currentIlvl: number | null;
}

export function PvpTable({ pvp, currentIlvl }: Props) {
  const { t } = useI18n();

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("table.type")}</TableHead>
            <TableHead>{t("table.ilvl")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pvp.map((p) => (
            <TableRow
              key={p.type}
              className={cn(
                currentIlvl != null && p.ilvl < currentIlvl && "opacity-30",
                currentIlvl != null && p.ilvl >= currentIlvl && "bg-accent/50"
              )}
            >
              <TableCell className="font-medium">{p.type}</TableCell>
              <TableCell><IlvlText ilvl={p.ilvl} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
