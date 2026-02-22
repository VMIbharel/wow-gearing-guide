export interface SpecKeyItem {
  wowheadId: number;
  slot: string;
  sourceType: "dungeon" | "raid";
  sourceName: { fr: string; en: string };
  bossName?: { fr: string; en: string };
}

export interface SpecGuide {
  classId: string;
  specId: string;
  keyItems: SpecKeyItem[];
}

// Données issues des guides BiS Wowhead "Midnight Pre-Patch 12.0.1" (béta pré-lancement).
// Mapping raid : "Manaforge Omega" (nom béta Wowhead) = "The Voidspire" (nom final du jeu).
// Les wowheadId se trouvent dans l'URL WoWHead de l'item : wowhead.com/item=ITEMID
// Laisser keyItems vide ([]) si les données ne sont pas encore disponibles.
export const SPEC_GUIDES: SpecGuide[] = [
  // ─── Death Knight ──────────────────────────────────────────────────────────
  { classId: "death-knight", specId: "blood", keyItems: [] },
  { classId: "death-knight", specId: "frost", keyItems: [] },
  { classId: "death-knight", specId: "unholy", keyItems: [] },
  // ─── Demon Hunter ──────────────────────────────────────────────────────────
  {
    classId: "demon-hunter",
    specId: "havoc",
    keyItems: [
      { wowheadId: 237727, slot: "Main Hand", sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "The Soul Hunters", en: "The Soul Hunters" } },
      { wowheadId: 237691, slot: "Head",      sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" } },
      { wowheadId: 242395, slot: "Trinket",   sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "Loom'ithar", en: "Loom'ithar" } },
      { wowheadId: 242397, slot: "Trinket",   sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "The Soul Hunters", en: "The Soul Hunters" } },
      { wowheadId: 243306, slot: "Boots",     sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "The Soul Hunters", en: "The Soul Hunters" } },
      { wowheadId: 242406, slot: "Neck",      sourceType: "raid", sourceName: { fr: "March on Quel'Danas", en: "March on Quel'Danas" }, bossName: { fr: "Nexus-King Salhadaar", en: "Nexus-King Salhadaar" } },
      { wowheadId: 237533, slot: "Belt",      sourceType: "raid", sourceName: { fr: "March on Quel'Danas", en: "March on Quel'Danas" }, bossName: { fr: "Plexus Sentinel", en: "Plexus Sentinel" } },
      { wowheadId: 237567, slot: "Ring",      sourceType: "raid", sourceName: { fr: "March on Quel'Danas", en: "March on Quel'Danas" }, bossName: { fr: "Plexus Sentinel", en: "Plexus Sentinel" } },
    ],
  },
  { classId: "demon-hunter", specId: "vengeance", keyItems: [] },
  { classId: "demon-hunter", specId: "devourer", keyItems: [] },
  // ─── Druid ─────────────────────────────────────────────────────────────────
  {
    classId: "druid",
    specId: "balance",
    keyItems: [
      { wowheadId: 237682, slot: "Head",      sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "Forgeweaver Araz", en: "Forgeweaver Araz" } },
      { wowheadId: 237685, slot: "Chest",     sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "Fractillus", en: "Fractillus" } },
      { wowheadId: 237683, slot: "Gloves",    sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "Soulbinder Naazindhri", en: "Soulbinder Naazindhri" } },
      { wowheadId: 243306, slot: "Boots",     sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "The Soul Hunters", en: "The Soul Hunters" } },
      { wowheadId: 237570, slot: "Ring",      sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "Forgeweaver Araz", en: "Forgeweaver Araz" } },
      { wowheadId: 242402, slot: "Trinket",   sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "Forgeweaver Araz", en: "Forgeweaver Araz" } },
      { wowheadId: 242395, slot: "Trinket",   sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "Loom'ithar", en: "Loom'ithar" } },
      { wowheadId: 237728, slot: "Main Hand", sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "Fractillus", en: "Fractillus" } },
    ],
  },
  { classId: "druid", specId: "feral", keyItems: [] },
  { classId: "druid", specId: "guardian", keyItems: [] },
  { classId: "druid", specId: "restoration", keyItems: [] },
  // ─── Evoker ────────────────────────────────────────────────────────────────
  { classId: "evoker", specId: "devastation", keyItems: [] },
  { classId: "evoker", specId: "preservation", keyItems: [] },
  { classId: "evoker", specId: "augmentation", keyItems: [] },
  // ─── Hunter ────────────────────────────────────────────────────────────────
  { classId: "hunter", specId: "beast-mastery", keyItems: [] },
  { classId: "hunter", specId: "marksmanship", keyItems: [] },
  { classId: "hunter", specId: "survival", keyItems: [] },
  // ─── Mage ──────────────────────────────────────────────────────────────────
  { classId: "mage", specId: "arcane", keyItems: [] },
  {
    classId: "mage",
    specId: "fire",
    keyItems: [
      { wowheadId: 237569, slot: "Neck",      sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "The Soul Hunters", en: "The Soul Hunters" } },
      { wowheadId: 237559, slot: "Belt",      sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "Dimensius", en: "Dimensius" } },
      { wowheadId: 243305, slot: "Boots",     sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "The Soul Hunters", en: "The Soul Hunters" } },
      { wowheadId: 242405, slot: "Ring",      sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "Dimensius", en: "Dimensius" } },
      { wowheadId: 242399, slot: "Trinket",   sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "Dimensius", en: "Dimensius" } },
      { wowheadId: 242392, slot: "Trinket",   sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "Fractillus", en: "Fractillus" } },
      { wowheadId: 237735, slot: "Main Hand", sourceType: "raid", sourceName: { fr: "March on Quel'Danas", en: "March on Quel'Danas" }, bossName: { fr: "Nexus-King Salhadaar", en: "Nexus-King Salhadaar" } },
    ],
  },
  { classId: "mage", specId: "frost", keyItems: [] },
  // ─── Monk ──────────────────────────────────────────────────────────────────
  { classId: "monk", specId: "brewmaster", keyItems: [] },
  { classId: "monk", specId: "mistweaver", keyItems: [] },
  { classId: "monk", specId: "windwalker", keyItems: [] },
  // ─── Paladin ───────────────────────────────────────────────────────────────
  { classId: "paladin", specId: "holy", keyItems: [] },
  { classId: "paladin", specId: "protection", keyItems: [] },
  { classId: "paladin", specId: "retribution", keyItems: [] },
  // ─── Priest ────────────────────────────────────────────────────────────────
  { classId: "priest", specId: "discipline", keyItems: [] },
  { classId: "priest", specId: "holy", keyItems: [] },
  { classId: "priest", specId: "shadow", keyItems: [] },
  // ─── Rogue ─────────────────────────────────────────────────────────────────
  { classId: "rogue", specId: "assassination", keyItems: [] },
  { classId: "rogue", specId: "outlaw", keyItems: [] },
  {
    classId: "rogue",
    specId: "subtlety",
    keyItems: [
      { wowheadId: 237664, slot: "Head",      sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" } },
      { wowheadId: 237665, slot: "Gloves",    sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" } },
      { wowheadId: 237729, slot: "Main Hand", sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "Loom'ithar", en: "Loom'ithar" } },
      { wowheadId: 243306, slot: "Boots",     sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "The Soul Hunters", en: "The Soul Hunters" } },
      { wowheadId: 242399, slot: "Trinket",   sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "Dimensius", en: "Dimensius" } },
      { wowheadId: 242405, slot: "Ring",      sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "Dimensius", en: "Dimensius" } },
      { wowheadId: 237531, slot: "Legs",      sourceType: "raid", sourceName: { fr: "March on Quel'Danas", en: "March on Quel'Danas" }, bossName: { fr: "Nexus-King Salhadaar", en: "Nexus-King Salhadaar" } },
      { wowheadId: 237567, slot: "Ring",      sourceType: "raid", sourceName: { fr: "March on Quel'Danas", en: "March on Quel'Danas" }, bossName: { fr: "Plexus Sentinel", en: "Plexus Sentinel" } },
    ],
  },
  // ─── Shaman ────────────────────────────────────────────────────────────────
  { classId: "shaman", specId: "elemental", keyItems: [] },
  {
    classId: "shaman",
    specId: "enhancement",
    keyItems: [
      { wowheadId: 237738, slot: "Main Hand", sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "Soulbinder Naazindhri", en: "Soulbinder Naazindhri" } },
      { wowheadId: 237637, slot: "Head",      sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" } },
      { wowheadId: 237529, slot: "Chest",     sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "Forgeweaver Araz", en: "Forgeweaver Araz" } },
      { wowheadId: 237554, slot: "Belt",      sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "The Soul Hunters", en: "The Soul Hunters" } },
      { wowheadId: 243308, slot: "Boots",     sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "The Soul Hunters", en: "The Soul Hunters" } },
      { wowheadId: 237570, slot: "Ring",      sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "Forgeweaver Araz", en: "Forgeweaver Araz" } },
      { wowheadId: 242402, slot: "Trinket",   sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "Forgeweaver Araz", en: "Forgeweaver Araz" } },
      { wowheadId: 242406, slot: "Neck",      sourceType: "raid", sourceName: { fr: "March on Quel'Danas", en: "March on Quel'Danas" }, bossName: { fr: "Nexus-King Salhadaar", en: "Nexus-King Salhadaar" } },
    ],
  },
  { classId: "shaman", specId: "restoration", keyItems: [] },
  // ─── Warlock ───────────────────────────────────────────────────────────────
  { classId: "warlock", specId: "affliction", keyItems: [] },
  { classId: "warlock", specId: "demonology", keyItems: [] },
  { classId: "warlock", specId: "destruction", keyItems: [] },
  // ─── Warrior ───────────────────────────────────────────────────────────────
  {
    classId: "warrior",
    specId: "arms",
    keyItems: [
      { wowheadId: 237610, slot: "Head",      sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "Forgeweaver Araz", en: "Forgeweaver Araz" } },
      { wowheadId: 237613, slot: "Chest",     sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "Fractillus", en: "Fractillus" } },
      { wowheadId: 237609, slot: "Legs",      sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "Loom'ithar", en: "Loom'ithar" } },
      { wowheadId: 243307, slot: "Boots",     sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "The Soul Hunters", en: "The Soul Hunters" } },
      { wowheadId: 242395, slot: "Trinket",   sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "Loom'ithar", en: "Loom'ithar" } },
      { wowheadId: 242399, slot: "Trinket",   sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "Dimensius", en: "Dimensius" } },
      { wowheadId: 242405, slot: "Ring",      sourceType: "raid", sourceName: { fr: "The Voidspire", en: "The Voidspire" }, bossName: { fr: "Dimensius", en: "Dimensius" } },
      { wowheadId: 242406, slot: "Neck",      sourceType: "raid", sourceName: { fr: "March on Quel'Danas", en: "March on Quel'Danas" }, bossName: { fr: "Nexus-King Salhadaar", en: "Nexus-King Salhadaar" } },
      { wowheadId: 243365, slot: "Main Hand", sourceType: "raid", sourceName: { fr: "March on Quel'Danas", en: "March on Quel'Danas" }, bossName: { fr: "Nexus-King Salhadaar", en: "Nexus-King Salhadaar" } },
    ],
  },
  { classId: "warrior", specId: "fury", keyItems: [] },
  { classId: "warrior", specId: "protection", keyItems: [] },
];

export function getSpecGuide(classId: string, specId: string): SpecGuide | undefined {
  return SPEC_GUIDES.find((g) => g.classId === classId && g.specId === specId);
}
