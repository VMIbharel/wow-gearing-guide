import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { useI18n } from "@/i18n";
import { CLASSES } from "@/data/classes";
import type { CharacterProfile } from "@/hooks/useCharacterProfile";
import { Button } from "@/components/ui/button";
import { NativeSelect } from "@/components/ui/native-select";
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
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// ilvl options (208–289 step 5)
// ---------------------------------------------------------------------------
const ILVL_OPTIONS: number[] = [];
for (let i = 208; i <= 289; i += 5) ILVL_OPTIONS.push(i);

// ---------------------------------------------------------------------------
// Class sprite offset mapping (30px per icon, 390x30 sprite)
// ---------------------------------------------------------------------------
const CLASS_SPRITE_X: Record<string, number> = {
  "death-knight": 0,
  "demon-hunter": 30,
  "druid": 60,
  "evoker": 90,
  "hunter": 120,
  "mage": 150,
  "monk": 180,
  "paladin": 210,
  "priest": 240,
  "rogue": 270,
  "shaman": 300,
  "warlock": 330,
  "warrior": 360,
};

// Role colors for spec badges
const ROLE_COLORS: Record<string, string> = {
  dps: "bg-red-500/20 text-red-400",
  tank: "bg-blue-500/20 text-blue-400",
  healer: "bg-green-500/20 text-green-400",
};

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
// Icon Card (for class, spec, hero talent)
// ---------------------------------------------------------------------------
interface IconCardProps {
  type: "class" | "spec" | "hero-talent";
  label: string;
  selected: boolean;
  onClick: () => void;
  classId?: string; // for class and spec cards
  roleColor?: string; // for spec cards
}

function IconCard({
  type,
  label,
  selected,
  onClick,
  classId,
  roleColor,
}: IconCardProps) {
  const offsetX = classId ? CLASS_SPRITE_X[classId] ?? 0 : 0;

  if (type === "hero-talent") {
    // Text-only card for hero talents
    return (
      <button
        onClick={onClick}
        className={cn(
          "flex items-center justify-center px-3 py-2 rounded-lg border-2 transition-all text-sm",
          selected
            ? "border-primary bg-primary/10 font-medium"
            : "border-muted-foreground/30 hover:border-muted-foreground/50"
        )}
      >
        {label}
      </button>
    );
  }

  // Icon card (class or spec)
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-0.5 p-1.5 rounded-lg border-2 transition-all shrink-0 w-20 h-20",
        selected
          ? "border-primary bg-primary/10"
          : "border-transparent hover:border-muted-foreground/40 hover:bg-muted/50"
      )}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundImage: "url('/wow-icons/class-sprite.webp')",
            backgroundPosition: `-${offsetX}px 0`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "auto",
            width: 30,
            height: 30,
          }}
        />
      </div>
      <div className="flex flex-col items-center gap-0 w-full px-1 flex-1">
        <span className="text-[9px] text-center leading-tight line-clamp-2 font-semibold text-slate-900 dark:text-slate-100">
          {label}
        </span>
      </div>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Horizontal Carousel (scroll-snap, mobile)
// ---------------------------------------------------------------------------
function HorizontalCarousel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Grid Container (desktop)
// ---------------------------------------------------------------------------
interface GridProps {
  children: React.ReactNode;
  columns?: number;
}

function Grid({ children, columns = 4 }: GridProps) {
  const gridColsMap: Record<number, string> = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
  };
  return (
    <div className={cn("grid gap-2 justify-items-center", gridColsMap[columns] || "grid-cols-5")}>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Panel content (shared between Dialog and Drawer)
// ---------------------------------------------------------------------------
interface PanelProps {
  profile: CharacterProfile;
  onApply: (profile: CharacterProfile) => void;
  onClose: () => void;
  language: "en" | "fr";
  isDesktop: boolean;
}

function CharacterForm({
  profile,
  onApply,
  onClose,
  language,
  isDesktop,
}: PanelProps) {
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
    (language === "fr" ? a.fr : a.en).localeCompare(
      language === "fr" ? b.fr : b.en
    )
  );

  const getSpecRoleColor = (role: string): string => {
    return (
      ROLE_COLORS[role as keyof typeof ROLE_COLORS] ||
      "bg-gray-500/20 text-gray-400"
    );
  };

  const getLocale = (item: { en: string; fr: string }): string => {
    return language === "fr" ? item.fr : item.en;
  };

  return (
    <div className="space-y-5 px-1">
      {/* =============== ilvl (native select) =============== */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium">
          {t("characterSelector.ilvl")}
        </label>
        <NativeSelect
          value={local.ilvl?.toString() ?? "all"}
          onChange={(e) =>
            update({
              ilvl: e.target.value === "all" ? null : Number(e.target.value),
            })
          }
        >
          <option value="all">{t("characterSelector.noFilter")}</option>
          {ILVL_OPTIONS.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </NativeSelect>
      </div>

      {/* =============== Class (carousel or grid) =============== */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          {t("characterSelector.class")}
        </label>
        {isDesktop ? (
          <Grid columns={5}>
            {sortedClasses.map((cls) => (
              <IconCard
                key={cls.id}
                type="class"
                classId={cls.id}
                label={getLocale(cls)}
                selected={local.classId === cls.id}
                onClick={() => update({ classId: cls.id })}
              />
            ))}
          </Grid>
        ) : (
          <HorizontalCarousel>
            {sortedClasses.map((cls) => (
              <div key={cls.id} className="snap-start">
                <IconCard
                  type="class"
                  classId={cls.id}
                  label={getLocale(cls)}
                  selected={local.classId === cls.id}
                  onClick={() => update({ classId: cls.id })}
                />
              </div>
            ))}
          </HorizontalCarousel>
        )}
      </div>

      {/* =============== Spec (carousel or grid) =============== */}
      {selectedClass && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/70">
            {t("characterSelector.spec")}
          </label>
          {isDesktop ? (
            <Grid columns={selectedClass.specs.length}>
              {selectedClass.specs.map((spec) => (
                <IconCard
                  key={spec.id}
                  type="spec"
                  classId={selectedClass.id}
                  label={getLocale(spec)}
                  roleColor={getSpecRoleColor(spec.role)}
                  selected={local.specId === spec.id}
                  onClick={() => update({ specId: spec.id })}
                />
              ))}
            </Grid>
          ) : (
            <HorizontalCarousel>
              {selectedClass.specs.map((spec) => (
                <div key={spec.id} className="snap-start">
                  <IconCard
                    type="spec"
                    classId={selectedClass.id}
                    label={getLocale(spec)}
                    roleColor={getSpecRoleColor(spec.role)}
                    selected={local.specId === spec.id}
                    onClick={() => update({ specId: spec.id })}
                  />
                </div>
              ))}
            </HorizontalCarousel>
          )}
        </div>
      )}

      {/* =============== Hero Talent (hidden for now) =============== */}
      {/* Disabled until hero talent icons are ready
      {selectedSpec && availableHeroTalents.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/70">
            {t("characterSelector.heroTalent")}
          </label>
          ...
        </div>
      )}
      */}

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

export function CharacterSelector({
  profile,
  onProfileUpdate,
}: CharacterSelectorProps) {
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
    isDesktop,
  };

  if (isDesktop) {
    return (
      <>
        {trigger}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-2xl">
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
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>{t("characterSelector.title")}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6 overflow-y-auto max-h-[calc(90vh-60px)]">
            <CharacterForm {...formProps} />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
