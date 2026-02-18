import { useState, useEffect, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/i18n";
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
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  const handleSectionClick = (index: number) => {
    setMenuOpen(false);
    onSectionClick(index);
  };

  const ActiveSection = sections[activeSection];
  const ActiveIcon = ActiveSection?.icon;

  return (
    <nav ref={navRef} className="shrink-0 bg-background/95 backdrop-blur border-b z-10 relative">
      <div className="mx-auto max-w-5xl px-4">

        {/* Mobile bar (< md): active section + hamburger button */}
        <div className="flex md:hidden items-center justify-between py-2">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            {ActiveIcon && <ActiveIcon className="w-4 h-4" />}
            <span>{ActiveSection?.label}</span>
          </div>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-accent transition-colors"
            aria-label={menuOpen ? t("aria.closeMenu") : t("aria.openMenu")}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Desktop bar (md+): horizontal tabs */}
        <div className="hidden md:flex">
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
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full bg-background/95 backdrop-blur border-b z-20 shadow-lg">
          <div className="mx-auto max-w-5xl px-4 py-2">
            {sections.map((s, i) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => handleSectionClick(i)}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                    activeSection === i
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
