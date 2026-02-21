import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { useI18n } from "@/i18n";
import { CLASSES, HERO_TALENTS } from "@/data/classes";
import type { CharacterProfile } from "@/hooks/useCharacterProfile";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

// ---------------------------------------------------------------------------
// ilvl options (208–289 step 5)
// ---------------------------------------------------------------------------
const ILVL_OPTIONS: number[] = [];
for (let i = 208; i <= 289; i += 5) ILVL_OPTIONS.push(i);

// ---------------------------------------------------------------------------
// Responsive hook
// ---------------------------------------------------------------------------
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 768
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

// ---------------------------------------------------------------------------
// Panel content (shared between Dialog and Drawer)
// ---------------------------------------------------------------------------
interface PanelProps {
  profile: CharacterProfile;
  onUpdate: (updates: Partial<CharacterProfile>) => void;
  language: "en" | "fr";
}

function CharacterForm({ profile, onUpdate, language }: PanelProps) {
  const { t } = useI18n();

  const selectedClass = CLASSES.find((c) => c.id === profile.classId) ?? null;
  const selectedSpec = selectedClass?.specs.find((s) => s.id === profile.specId) ?? null;

  const sortedClasses = [...CLASSES].sort((a, b) =>
    (language === "fr" ? a.fr : a.en).localeCompare(language === "fr" ? b.fr : b.en)
  );

  return (
    <div className="space-y-4 px-1">
      {/* ilvl */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium">{t("characterSelector.ilvl")}</label>
        <Select
          value={profile.ilvl?.toString() ?? "all"}
          onValueChange={(v) => onUpdate({ ilvl: v === "all" ? null : Number(v) })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("characterSelector.noFilter")}</SelectItem>
            {ILVL_OPTIONS.map((ilvl) => (
              <SelectItem key={ilvl} value={ilvl.toString()}>
                {ilvl}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Class */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium">{t("characterSelector.class")}</label>
        <Select
          value={profile.classId ?? "none"}
          onValueChange={(v) => onUpdate({ classId: v === "none" ? null : v })}
        >
          <SelectTrigger>
            <SelectValue placeholder="—" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">—</SelectItem>
            {sortedClasses.map((cls) => (
              <SelectItem key={cls.id} value={cls.id}>
                {language === "fr" ? cls.fr : cls.en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Spec */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground/70">
          {t("characterSelector.spec")}
        </label>
        <Select
          value={profile.specId ?? "none"}
          onValueChange={(v) => onUpdate({ specId: v === "none" ? null : v })}
          disabled={!selectedClass}
        >
          <SelectTrigger>
            <SelectValue placeholder="—" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">—</SelectItem>
            {selectedClass?.specs.map((spec) => (
              <SelectItem key={spec.id} value={spec.id}>
                {language === "fr" ? spec.fr : spec.en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Hero Talent */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground/70">
          {t("characterSelector.heroTalent")}
        </label>
        <Select
          value={profile.heroTalentId ?? "none"}
          onValueChange={(v) => onUpdate({ heroTalentId: v === "none" ? null : v })}
          disabled={!selectedSpec}
        >
          <SelectTrigger>
            <SelectValue placeholder="—" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">—</SelectItem>
            {selectedSpec?.heroTalents.map((htId) => {
              const ht = HERO_TALENTS[htId];
              if (!ht) return null;
              return (
                <SelectItem key={ht.id} value={ht.id}>
                  {language === "fr" ? ht.fr : ht.en}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
interface CharacterSelectorProps {
  profile: CharacterProfile;
  onProfileUpdate: (updates: Partial<CharacterProfile>) => void;
}

export function CharacterSelector({ profile, onProfileUpdate }: CharacterSelectorProps) {
  const { t, language } = useI18n();
  const [open, setOpen] = useState(false);
  const isDesktop = useIsDesktop();

  const trigger = (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setOpen(true)}
      aria-label={t("aria.openCharacterSelector")}
      className="relative"
    >
      <User className="h-5 w-5" />
      {profile.ilvl !== null && (
        <span className="absolute -bottom-0.5 -right-0.5 text-[9px] font-bold leading-none bg-primary text-primary-foreground rounded px-0.5">
          {profile.ilvl}
        </span>
      )}
    </Button>
  );

  const formProps: PanelProps = {
    profile,
    onUpdate: onProfileUpdate,
    language: language as "en" | "fr",
  };

  if (isDesktop) {
    return (
      <>
        {trigger}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>{t("characterSelector.title")}</DialogTitle>
            </DialogHeader>
            <CharacterForm {...formProps} />
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      {trigger}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t("characterSelector.title")}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6">
            <CharacterForm {...formProps} />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
