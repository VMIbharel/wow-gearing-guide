import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SectionDotsProps {
  sections: readonly Section[];
  activeSection: number;
  onSectionClick: (index: number) => void;
}

export function SectionDots({ sections, activeSection, onSectionClick }: SectionDotsProps) {
  return (
    <div className="shrink-0 flex justify-center gap-2 py-2 bg-background border-t">
      {sections.map((s, i) => (
        <button
          key={s.id}
          onClick={() => onSectionClick(i)}
          className={cn(
            "h-2 rounded-full transition-all duration-200",
            activeSection === i
              ? "w-6 bg-primary"
              : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
          )}
          aria-label={s.label}
        />
      ))}
    </div>
  );
}
