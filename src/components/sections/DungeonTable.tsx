import { useI18n } from "@/i18n";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { CrestBadge } from "../shared/CrestBadge";
import { IlvlText } from "../shared/IlvlText";
import { cn } from "@/lib/utils";

interface Dungeon {
  level: string;
  label: string;
  lootIlvl: number;
  vaultIlvl: number;
  crest: string;
  crestAmount: number;
  affix: boolean;
}

interface Props {
  dungeons: Dungeon[];
  notes: string[];
  currentIlvl: number | null;
}

export function DungeonTable({ dungeons, notes, currentIlvl }: Props) {
  const { t } = useI18n();

  return (
    <div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("table.level")}</TableHead>
              <TableHead>{t("table.loot")}</TableHead>
              <TableHead>{t("table.vault")}</TableHead>
              <TableHead>{t("table.crests")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dungeons.map((d) => (
              <TableRow
                key={d.level}
                className={cn(
                  currentIlvl != null && d.vaultIlvl < currentIlvl && "opacity-30",
                  currentIlvl != null && d.vaultIlvl >= currentIlvl && "bg-accent/50"
                )}
              >
                <TableCell className="font-medium">
                  {d.label}{d.affix ? "*" : ""}
                </TableCell>
                <TableCell><IlvlText ilvl={d.lootIlvl} /></TableCell>
                <TableCell><IlvlText ilvl={d.vaultIlvl} /></TableCell>
                <TableCell className="flex gap-1 items-center">
                  <span className="text-xs font-semibold">{d.crestAmount}</span>
                  <CrestBadge name={d.crest} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
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
