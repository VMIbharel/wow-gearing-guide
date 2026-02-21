import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { useI18n } from "@/i18n";
import { CLASSES } from "@/data/classes";
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
  onApply: (profile: CharacterProfile) => void;
  onClose: () => void;
  language: "en" | "fr";
}

function CharacterForm({ profile, onApply, onClose, language }: PanelProps) {
  const { t } = useI18n();
  const [local, setLocal] = useState<CharacterProfile>(profile);

  // Sync local state when the dialog opens with a new profile
  useEffect(() => {
    setLocal(profile);
  }, [profile]);

  function update(updates: Partial<CharacterProfile>) {
    setLocal((prev) => {
      const next = { ...prev, ...updates };
      if ("classId" in updates) {
        next.specId = null;
        next.heroTalentId = null;
      }
      if ("specId" in updates) {
        next.heroTalentId = null;
      }
      return next;
    });
  }

  function handleApply() {
    onApply(local);
    onClose();
  }

  const selectedClass = CLASSES.find((c) => c.id === local.classId) ?? null;

  const sortedClasses = [...CLASSES].sort((a, b) =>
    (language === "fr" ? a.fr : a.en).localeCompare(language === "fr" ? b.fr : b.en)
  );

  return (
    <div className="space-y-4 px-1">
      {/* ilvl */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium">{t("characterSelector.ilvl")}</label>
        <Select
          value={local.ilvl?.toString() ?? "all"}
          onValueChange={(v) => update({ ilvl: v === "all" ? null : Number(v) })}
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
          value={local.classId ?? "none"}
          onValueChange={(v) => update({ classId: v === "none" ? null : v })}
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
          value={local.specId ?? "none"}
          onValueChange={(v) => update({ specId: v === "none" ? null : v })}
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

      {/* Hero Talent — disabled for now */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-foreground/70">
            {t("characterSelector.heroTalent")}
          </label>
          <span className="text-xs text-muted-foreground italic">
            {t("characterSelector.comingSoon" as any)}
          </span>
        </div>
        <Select value="none" disabled>
          <SelectTrigger>
            <SelectValue placeholder="—" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">—</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Apply button */}
      <Button onClick={handleApply} className="w-full">
        {t("characterSelector.apply" as any)}
      </Button>
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

  function handleApply(updated: CharacterProfile) {
    onProfileUpdate(updated);
  }

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
    onApply: handleApply,
    onClose: () => setOpen(false),
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
