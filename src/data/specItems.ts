export interface SpecKeyItem {
  wowheadId: number;
  slot: string;
  itemName?: { fr: string; en: string };
  sourceType: "dungeon" | "raid";
  sourceName: { fr: string; en: string };
  bossName?: { fr: string; en: string };
}

export interface SpecGuide {
  classId: string;
  specId: string;
  keyItems: SpecKeyItem[];
}

// Les wowheadId se trouvent dans l'URL WoWHead de l'item : wowhead.com/item=ITEMID
// Laisser keyItems vide ([]) si les données ne sont pas encore disponibles.
//
// ─── TEMPLATE — Tous les slots possibles ────────────────────────────────────
// { classId: "class-id", specId: "spec-id", keyItems: [
//   { wowheadId: 0, slot: "Head",      itemName: { fr: "...", en: "..." }, sourceType: "raid",    sourceName: { fr: "...", en: "..." }, bossName: { fr: "...", en: "..." } },
//   { wowheadId: 0, slot: "Neck",      itemName: { fr: "...", en: "..." }, sourceType: "raid",    sourceName: { fr: "...", en: "..." }, bossName: { fr: "...", en: "..." } },
//   { wowheadId: 0, slot: "Shoulders", itemName: { fr: "...", en: "..." }, sourceType: "raid",    sourceName: { fr: "...", en: "..." }, bossName: { fr: "...", en: "..." } },
//   { wowheadId: 0, slot: "Back",      itemName: { fr: "...", en: "..." }, sourceType: "dungeon", sourceName: { fr: "...", en: "..." } },
//   { wowheadId: 0, slot: "Chest",     itemName: { fr: "...", en: "..." }, sourceType: "raid",    sourceName: { fr: "...", en: "..." }, bossName: { fr: "...", en: "..." } },
//   { wowheadId: 0, slot: "Wrist",     itemName: { fr: "...", en: "..." }, sourceType: "dungeon", sourceName: { fr: "...", en: "..." } },
//   { wowheadId: 0, slot: "Hands",     itemName: { fr: "...", en: "..." }, sourceType: "raid",    sourceName: { fr: "...", en: "..." }, bossName: { fr: "...", en: "..." } },
//   { wowheadId: 0, slot: "Waist",     itemName: { fr: "...", en: "..." }, sourceType: "raid",    sourceName: { fr: "...", en: "..." }, bossName: { fr: "...", en: "..." } },
//   { wowheadId: 0, slot: "Legs",      itemName: { fr: "...", en: "..." }, sourceType: "raid",    sourceName: { fr: "...", en: "..." }, bossName: { fr: "...", en: "..." } },
//   { wowheadId: 0, slot: "Feet",      itemName: { fr: "...", en: "..." }, sourceType: "raid",    sourceName: { fr: "...", en: "..." }, bossName: { fr: "...", en: "..." } },
//   { wowheadId: 0, slot: "Ring",      itemName: { fr: "...", en: "..." }, sourceType: "raid",    sourceName: { fr: "...", en: "..." }, bossName: { fr: "...", en: "..." } },
//   { wowheadId: 0, slot: "Ring",      itemName: { fr: "...", en: "..." }, sourceType: "dungeon", sourceName: { fr: "...", en: "..." } },
//   { wowheadId: 0, slot: "Trinket",   itemName: { fr: "...", en: "..." }, sourceType: "raid",    sourceName: { fr: "...", en: "..." }, bossName: { fr: "...", en: "..." } },
//   { wowheadId: 0, slot: "Trinket",   itemName: { fr: "...", en: "..." }, sourceType: "dungeon", sourceName: { fr: "...", en: "..." } },
//   { wowheadId: 0, slot: "Main Hand", itemName: { fr: "...", en: "..." }, sourceType: "raid",    sourceName: { fr: "...", en: "..." }, bossName: { fr: "...", en: "..." } },
//   { wowheadId: 0, slot: "Off Hand",  itemName: { fr: "...", en: "..." }, sourceType: "dungeon", sourceName: { fr: "...", en: "..." } },
// ] },
// ────────────────────────────────────────────────────────────────────────────
export const SPEC_GUIDES: SpecGuide[] = [
  // ─── Death Knight ──────────────────────────────────────────────────────────
  { classId: "death-knight", specId: "blood", keyItems: [] },
  { classId: "death-knight", specId: "frost", keyItems: [] },
  { classId: "death-knight", specId: "unholy", keyItems: [] },
  // ─── Demon Hunter ──────────────────────────────────────────────────────────
  { classId: "demon-hunter", specId: "havoc", keyItems: [] },
  { classId: "demon-hunter", specId: "vengeance", keyItems: [] },
  { classId: "demon-hunter", specId: "devourer", keyItems: [] },
  // ─── Druid ─────────────────────────────────────────────────────────────────
  { classId: "druid", specId: "balance", keyItems: [] },
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
  { classId: "mage", specId: "fire", keyItems: [] },
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
  { classId: "rogue", specId: "subtlety", keyItems: [] },
  // ─── Shaman ────────────────────────────────────────────────────────────────
  { classId: "shaman", specId: "elemental", keyItems: [] },
  { classId: "shaman", specId: "enhancement", keyItems: [] },
  { classId: "shaman", specId: "restoration", keyItems: [] },
  // ─── Warlock ───────────────────────────────────────────────────────────────
  { classId: "warlock", specId: "affliction", keyItems: [] },
  { classId: "warlock", specId: "demonology", keyItems: [] },
  { classId: "warlock", specId: "destruction", keyItems: [] },
  // ─── Warrior ───────────────────────────────────────────────────────────────
  { classId: "warrior", specId: "arms", keyItems: [] },
  { classId: "warrior", specId: "fury", keyItems: [] },
  { classId: "warrior", specId: "protection", keyItems: [] },
];

export function getSpecGuide(classId: string, specId: string): SpecGuide | undefined {
  return SPEC_GUIDES.find((g) => g.classId === classId && g.specId === specId);
}
