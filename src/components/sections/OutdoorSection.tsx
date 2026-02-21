import { memo } from "react";
import { useI18n } from "@/i18n";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { CrestBadge } from "../shared/CrestBadge";

interface OutdoorActivity {
  typeId: string;
  label: string;
  crest: string;
  crestAmount?: number;
  minCrestAmount?: number;
  maxCrestAmount?: number;
}

interface Props {
  outdoor: OutdoorActivity[];
  notes: string[];
}

const OutdoorRow = memo(function OutdoorRow({ item }: { item: OutdoorActivity }) {
  const crestDisplay = item.crestAmount != null
    ? item.crestAmount
    : item.minCrestAmount != null && item.maxCrestAmount != null
      ? `${item.minCrestAmount}–${item.maxCrestAmount}`
      : null;

  return (
    <TableRow>
      <TableCell className="font-medium">{item.label}</TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          {crestDisplay != null && (
            <span className="text-xs font-semibold">{crestDisplay}</span>
          )}
          <CrestBadge name={item.crest} />
        </div>
      </TableCell>
    </TableRow>
  );
});

export function OutdoorSection({ outdoor, notes }: Props) {
  const { t } = useI18n();

  return (
    <div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("table.activity")}</TableHead>
              <TableHead>{t("table.crests")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {outdoor.map((item) => (
              <OutdoorRow key={item.typeId} item={item} />
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
