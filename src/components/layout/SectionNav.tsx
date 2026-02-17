import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SectionNavProps {
  sections: readonly Section[];
  activeSection: number;
  onSectionClick: (index: number) => void;
}

export function SectionNav({ sections, activeSection, onSectionClick }: SectionNavProps) {
  return (
    <nav className="shrink-0 bg-background/95 backdrop-blur border-b z-10">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex">
          {sections.map((s, i) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => onSectionClick(i)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors flex-1 justify-center",
                  activeSection === i
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
