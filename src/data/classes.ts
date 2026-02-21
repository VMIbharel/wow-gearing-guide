// WoW: Midnight — Classes, Specializations, Hero Talent Trees, Stat Priorities
// Source: Icy Veins Midnight Pre-Patch (12.0.1) guides, Wowhead hero talent guide

export type PrimaryStat = "strength" | "agility" | "intellect";
export type SecondaryStat = "haste" | "crit" | "mastery" | "versatility";

export interface HeroTalent {
  id: string;
  en: string;
  fr: string;
}

export interface WowSpec {
  id: string;
  en: string;
  fr: string;
  role: "dps" | "tank" | "healer";
  primaryStat: PrimaryStat;
  /** Secondary stats in priority order (primary stat is always first) */
  statPriority: SecondaryStat[];
  /** IDs of available hero talent trees for this spec */
  heroTalents: string[];
}

export interface WowClass {
  id: string;
  en: string;
  fr: string;
  specs: WowSpec[];
}

// ---------------------------------------------------------------------------
// Hero Talent Trees
// ---------------------------------------------------------------------------

export const HERO_TALENTS: Record<string, HeroTalent> = {
  // Death Knight
  "deathbringer": { id: "deathbringer", en: "Deathbringer", fr: "Porteur de mort" },
  "san-layn": { id: "san-layn", en: "San'layn", fr: "San'layn" },
  "rider-of-the-apocalypse": { id: "rider-of-the-apocalypse", en: "Rider of the Apocalypse", fr: "Cavalier de l'Apocalypse" },
  // Demon Hunter
  "aldrachi-reaver": { id: "aldrachi-reaver", en: "Aldrachi Reaver", fr: "Profanateur Aldrachi" },
  "fel-scarred": { id: "fel-scarred", en: "Fel-Scarred", fr: "Marqué du Gangrel" },
  "void-scarred": { id: "void-scarred", en: "Void-Scarred", fr: "Marqué du Vide" },
  "annihilator": { id: "annihilator", en: "Annihilator", fr: "Annihilateur" },
  // Druid
  "druid-of-the-claw": { id: "druid-of-the-claw", en: "Druid of the Claw", fr: "Druide de la griffe" },
  "elunes-chosen": { id: "elunes-chosen", en: "Elune's Chosen", fr: "Élu d'Elune" },
  "keeper-of-the-grove": { id: "keeper-of-the-grove", en: "Keeper of the Grove", fr: "Gardien du bois" },
  "wildstalker": { id: "wildstalker", en: "Wildstalker", fr: "Traqueur sauvage" },
  // Evoker
  "chronowarden": { id: "chronowarden", en: "Chronowarden", fr: "Gardien du temps" },
  "scalecommander": { id: "scalecommander", en: "Scalecommander", fr: "Commandant des écailles" },
  "flameshaper": { id: "flameshaper", en: "Flameshaper", fr: "Façonneur de flammes" },
  // Hunter
  "dark-ranger": { id: "dark-ranger", en: "Dark Ranger", fr: "Ranger des ombres" },
  "pack-leader": { id: "pack-leader", en: "Pack Leader", fr: "Meneur de meute" },
  "sentinel": { id: "sentinel", en: "Sentinel", fr: "Sentinelle" },
  // Mage
  "spellslinger": { id: "spellslinger", en: "Spellslinger", fr: "Archimage duelliste" },
  "sunfury": { id: "sunfury", en: "Sunfury", fr: "Courroux solaire" },
  "frostfire": { id: "frostfire", en: "Frostfire", fr: "Givre ardent" },
  // Monk
  "master-of-harmony": { id: "master-of-harmony", en: "Master of Harmony", fr: "Maître de l'harmonie" },
  "shado-pan": { id: "shado-pan", en: "Shado-Pan", fr: "Shado-pan" },
  "conduit-of-the-celestials": { id: "conduit-of-the-celestials", en: "Conduit of the Celestials", fr: "Conducteur des Célestes" },
  // Paladin
  "herald-of-the-sun": { id: "herald-of-the-sun", en: "Herald of the Sun", fr: "Héraut du soleil" },
  "lightsmith": { id: "lightsmith", en: "Lightsmith", fr: "Forgeron de la lumière" },
  "templar": { id: "templar", en: "Templar", fr: "Templier" },
  // Priest
  "oracle": { id: "oracle", en: "Oracle", fr: "Oracle" },
  "voidweaver": { id: "voidweaver", en: "Voidweaver", fr: "Tisserand du Vide" },
  "archon": { id: "archon", en: "Archon", fr: "Archonte" },
  // Rogue
  "deathstalker": { id: "deathstalker", en: "Deathstalker", fr: "Chasseur de mort" },
  "fatebound": { id: "fatebound", en: "Fatebound", fr: "Lié au destin" },
  "trickster": { id: "trickster", en: "Trickster", fr: "Trompeur" },
  // Shaman
  "farseer": { id: "farseer", en: "Farseer", fr: "Grand Voyant" },
  "stormbringer": { id: "stormbringer", en: "Stormbringer", fr: "Porteur de tempête" },
  "totemic": { id: "totemic", en: "Totemic", fr: "Totémique" },
  // Warlock
  "hellcaller": { id: "hellcaller", en: "Hellcaller", fr: "Invocateur des Enfers" },
  "soul-harvester": { id: "soul-harvester", en: "Soul Harvester", fr: "Moissonneur d'âmes" },
  "diabolist": { id: "diabolist", en: "Diabolist", fr: "Diaboliste" },
  // Warrior
  "colossus": { id: "colossus", en: "Colossus", fr: "Colosse" },
  "slayer": { id: "slayer", en: "Slayer", fr: "Massacreur" },
  "mountain-thane": { id: "mountain-thane", en: "Mountain Thane", fr: "Seigneur de la montagne" },
};

// ---------------------------------------------------------------------------
// Classes & Specializations
// ---------------------------------------------------------------------------

export const CLASSES: WowClass[] = [
  {
    id: "death-knight",
    en: "Death Knight",
    fr: "Chevalier de la mort",
    specs: [
      {
        id: "blood",
        en: "Blood",
        fr: "Sang",
        role: "tank",
        primaryStat: "strength",
        statPriority: ["mastery", "versatility", "haste", "crit"],
        heroTalents: ["deathbringer", "san-layn"],
      },
      {
        id: "frost",
        en: "Frost",
        fr: "Givre",
        role: "dps",
        primaryStat: "strength",
        statPriority: ["haste", "mastery", "crit", "versatility"],
        heroTalents: ["deathbringer", "rider-of-the-apocalypse"],
      },
      {
        id: "unholy",
        en: "Unholy",
        fr: "Impie",
        role: "dps",
        primaryStat: "strength",
        statPriority: ["mastery", "haste", "crit", "versatility"],
        heroTalents: ["rider-of-the-apocalypse", "san-layn"],
      },
    ],
  },
  {
    id: "demon-hunter",
    en: "Demon Hunter",
    fr: "Chasseur de démons",
    specs: [
      {
        id: "havoc",
        en: "Havoc",
        fr: "Dévastation",
        role: "dps",
        primaryStat: "agility",
        statPriority: ["haste", "crit", "versatility", "mastery"],
        heroTalents: ["aldrachi-reaver", "fel-scarred"],
      },
      {
        id: "vengeance",
        en: "Vengeance",
        fr: "Vengeance",
        role: "tank",
        primaryStat: "agility",
        statPriority: ["versatility", "mastery", "haste", "crit"],
        heroTalents: ["aldrachi-reaver", "fel-scarred"],
      },
      {
        id: "devourer",
        en: "Devourer",
        fr: "Dévoreur",
        role: "dps",
        primaryStat: "agility",
        statPriority: ["haste", "mastery", "crit", "versatility"],
        heroTalents: ["void-scarred", "annihilator"],
      },
    ],
  },
  {
    id: "druid",
    en: "Druid",
    fr: "Druide",
    specs: [
      {
        id: "balance",
        en: "Balance",
        fr: "Équilibre",
        role: "dps",
        primaryStat: "intellect",
        statPriority: ["mastery", "haste", "crit", "versatility"],
        heroTalents: ["elunes-chosen", "keeper-of-the-grove"],
      },
      {
        id: "feral",
        en: "Feral",
        fr: "Farouche",
        role: "dps",
        primaryStat: "agility",
        statPriority: ["mastery", "crit", "haste", "versatility"],
        heroTalents: ["druid-of-the-claw", "wildstalker"],
      },
      {
        id: "guardian",
        en: "Guardian",
        fr: "Gardien",
        role: "tank",
        primaryStat: "agility",
        statPriority: ["mastery", "versatility", "haste", "crit"],
        heroTalents: ["druid-of-the-claw", "elunes-chosen"],
      },
      {
        id: "restoration",
        en: "Restoration",
        fr: "Restauration",
        role: "healer",
        primaryStat: "intellect",
        statPriority: ["haste", "mastery", "crit", "versatility"],
        heroTalents: ["keeper-of-the-grove", "wildstalker"],
      },
    ],
  },
  {
    id: "evoker",
    en: "Evoker",
    fr: "Évocateur",
    specs: [
      {
        id: "augmentation",
        en: "Augmentation",
        fr: "Augmentation",
        role: "dps",
        primaryStat: "intellect",
        statPriority: ["mastery", "haste", "crit", "versatility"],
        heroTalents: ["chronowarden", "scalecommander"],
      },
      {
        id: "devastation",
        en: "Devastation",
        fr: "Dévastation",
        role: "dps",
        primaryStat: "intellect",
        statPriority: ["haste", "mastery", "crit", "versatility"],
        heroTalents: ["scalecommander", "flameshaper"],
      },
      {
        id: "preservation",
        en: "Preservation",
        fr: "Préservation",
        role: "healer",
        primaryStat: "intellect",
        statPriority: ["haste", "mastery", "crit", "versatility"],
        heroTalents: ["chronowarden", "flameshaper"],
      },
    ],
  },
  {
    id: "hunter",
    en: "Hunter",
    fr: "Chasseur",
    specs: [
      {
        id: "beast-mastery",
        en: "Beast Mastery",
        fr: "Maîtrise des bêtes",
        role: "dps",
        primaryStat: "agility",
        statPriority: ["crit", "haste", "versatility", "mastery"],
        heroTalents: ["dark-ranger", "pack-leader"],
      },
      {
        id: "marksmanship",
        en: "Marksmanship",
        fr: "Tir",
        role: "dps",
        primaryStat: "agility",
        statPriority: ["haste", "crit", "mastery", "versatility"],
        heroTalents: ["dark-ranger", "sentinel"],
      },
      {
        id: "survival",
        en: "Survival",
        fr: "Survie",
        role: "dps",
        primaryStat: "agility",
        statPriority: ["haste", "crit", "mastery", "versatility"],
        heroTalents: ["pack-leader", "sentinel"],
      },
    ],
  },
  {
    id: "mage",
    en: "Mage",
    fr: "Mage",
    specs: [
      {
        id: "arcane",
        en: "Arcane",
        fr: "Arcane",
        role: "dps",
        primaryStat: "intellect",
        statPriority: ["mastery", "haste", "crit", "versatility"],
        heroTalents: ["spellslinger", "sunfury"],
      },
      {
        id: "fire",
        en: "Fire",
        fr: "Feu",
        role: "dps",
        primaryStat: "intellect",
        statPriority: ["crit", "haste", "mastery", "versatility"],
        heroTalents: ["frostfire", "sunfury"],
      },
      {
        id: "frost",
        en: "Frost",
        fr: "Givre",
        role: "dps",
        primaryStat: "intellect",
        statPriority: ["haste", "crit", "mastery", "versatility"],
        heroTalents: ["frostfire", "spellslinger"],
      },
    ],
  },
  {
    id: "monk",
    en: "Monk",
    fr: "Moine",
    specs: [
      {
        id: "brewmaster",
        en: "Brewmaster",
        fr: "Maître brasseur",
        role: "tank",
        primaryStat: "agility",
        statPriority: ["mastery", "versatility", "haste", "crit"],
        heroTalents: ["master-of-harmony", "shado-pan"],
      },
      {
        id: "mistweaver",
        en: "Mistweaver",
        fr: "Tissevent",
        role: "healer",
        primaryStat: "intellect",
        statPriority: ["haste", "mastery", "crit", "versatility"],
        heroTalents: ["conduit-of-the-celestials", "master-of-harmony"],
      },
      {
        id: "windwalker",
        en: "Windwalker",
        fr: "Marche du vent",
        role: "dps",
        primaryStat: "agility",
        statPriority: ["haste", "crit", "mastery", "versatility"],
        heroTalents: ["conduit-of-the-celestials", "shado-pan"],
      },
    ],
  },
  {
    id: "paladin",
    en: "Paladin",
    fr: "Paladin",
    specs: [
      {
        id: "holy",
        en: "Holy",
        fr: "Sacré",
        role: "healer",
        primaryStat: "intellect",
        statPriority: ["haste", "mastery", "crit", "versatility"],
        heroTalents: ["herald-of-the-sun", "lightsmith"],
      },
      {
        id: "protection",
        en: "Protection",
        fr: "Protection",
        role: "tank",
        primaryStat: "strength",
        statPriority: ["mastery", "versatility", "haste", "crit"],
        heroTalents: ["lightsmith", "templar"],
      },
      {
        id: "retribution",
        en: "Retribution",
        fr: "Vindicte",
        role: "dps",
        primaryStat: "strength",
        statPriority: ["haste", "crit", "mastery", "versatility"],
        heroTalents: ["herald-of-the-sun", "templar"],
      },
    ],
  },
  {
    id: "priest",
    en: "Priest",
    fr: "Prêtre",
    specs: [
      {
        id: "discipline",
        en: "Discipline",
        fr: "Discipline",
        role: "healer",
        primaryStat: "intellect",
        statPriority: ["haste", "mastery", "crit", "versatility"],
        heroTalents: ["oracle", "voidweaver"],
      },
      {
        id: "holy",
        en: "Holy",
        fr: "Sacré",
        role: "healer",
        primaryStat: "intellect",
        statPriority: ["haste", "mastery", "crit", "versatility"],
        heroTalents: ["archon", "oracle"],
      },
      {
        id: "shadow",
        en: "Shadow",
        fr: "Ombre",
        role: "dps",
        primaryStat: "intellect",
        statPriority: ["haste", "mastery", "crit", "versatility"],
        heroTalents: ["archon", "voidweaver"],
      },
    ],
  },
  {
    id: "rogue",
    en: "Rogue",
    fr: "Voleur",
    specs: [
      {
        id: "assassination",
        en: "Assassination",
        fr: "Assassinat",
        role: "dps",
        primaryStat: "agility",
        statPriority: ["haste", "mastery", "crit", "versatility"],
        heroTalents: ["deathstalker", "fatebound"],
      },
      {
        id: "outlaw",
        en: "Outlaw",
        fr: "Hors-la-loi",
        role: "dps",
        primaryStat: "agility",
        statPriority: ["haste", "crit", "versatility", "mastery"],
        heroTalents: ["fatebound", "trickster"],
      },
      {
        id: "subtlety",
        en: "Subtlety",
        fr: "Subtilité",
        role: "dps",
        primaryStat: "agility",
        statPriority: ["mastery", "haste", "crit", "versatility"],
        heroTalents: ["deathstalker", "trickster"],
      },
    ],
  },
  {
    id: "shaman",
    en: "Shaman",
    fr: "Chaman",
    specs: [
      {
        id: "elemental",
        en: "Elemental",
        fr: "Élémentaire",
        role: "dps",
        primaryStat: "intellect",
        statPriority: ["haste", "mastery", "crit", "versatility"],
        heroTalents: ["farseer", "stormbringer"],
      },
      {
        id: "enhancement",
        en: "Enhancement",
        fr: "Amélioration",
        role: "dps",
        primaryStat: "agility",
        statPriority: ["haste", "mastery", "crit", "versatility"],
        heroTalents: ["stormbringer", "totemic"],
      },
      {
        id: "restoration",
        en: "Restoration",
        fr: "Restauration",
        role: "healer",
        primaryStat: "intellect",
        statPriority: ["haste", "mastery", "crit", "versatility"],
        heroTalents: ["farseer", "totemic"],
      },
    ],
  },
  {
    id: "warlock",
    en: "Warlock",
    fr: "Démoniste",
    specs: [
      {
        id: "affliction",
        en: "Affliction",
        fr: "Affliction",
        role: "dps",
        primaryStat: "intellect",
        statPriority: ["haste", "mastery", "crit", "versatility"],
        heroTalents: ["hellcaller", "soul-harvester"],
      },
      {
        id: "demonology",
        en: "Demonology",
        fr: "Démonologie",
        role: "dps",
        primaryStat: "intellect",
        statPriority: ["haste", "mastery", "crit", "versatility"],
        heroTalents: ["diabolist", "soul-harvester"],
      },
      {
        id: "destruction",
        en: "Destruction",
        fr: "Destruction",
        role: "dps",
        primaryStat: "intellect",
        statPriority: ["haste", "mastery", "crit", "versatility"],
        heroTalents: ["diabolist", "hellcaller"],
      },
    ],
  },
  {
    id: "warrior",
    en: "Warrior",
    fr: "Guerrier",
    specs: [
      {
        id: "arms",
        en: "Arms",
        fr: "Armes",
        role: "dps",
        primaryStat: "strength",
        statPriority: ["haste", "mastery", "versatility", "crit"],
        heroTalents: ["colossus", "slayer"],
      },
      {
        id: "fury",
        en: "Fury",
        fr: "Fureur",
        role: "dps",
        primaryStat: "strength",
        statPriority: ["mastery", "haste", "versatility", "crit"],
        heroTalents: ["mountain-thane", "slayer"],
      },
      {
        id: "protection",
        en: "Protection",
        fr: "Protection",
        role: "tank",
        primaryStat: "strength",
        statPriority: ["mastery", "versatility", "haste", "crit"],
        heroTalents: ["colossus", "mountain-thane"],
      },
    ],
  },
];
