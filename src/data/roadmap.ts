export interface WeeklyItem {
  id: string;
  text: { fr: string; en: string };
  note?: { fr: string; en: string };
  links?: { label: { fr: string; en: string }; path: string }[];
}

export interface WeeklyPhase {
  id: string;
  title: { fr: string; en: string };
  shortLabel: { fr: string; en: string };
  date: string;
  startDate: string;
  subtitle?: { fr: string; en: string };
  warning?: { fr: string; en: string };
  items: WeeklyItem[];
  crestTracking?: { fr: string; en: string }[];
  endingIlvl?: { fr: string; en: string };
}

export const weeklyPhases: WeeklyPhase[] = [
  {
    id: "pre-launch",
    title: { fr: "Préparation", en: "Preparation" },
    shortLabel: { fr: "Prép.", en: "Prep." },
    date: "Avant le 27 fév",
    startDate: "2026-01-01",
    items: [
      {
        id: "pl-potions",
        text: {
          fr: "Stocker des potions, flasques et runes",
          en: "Stock up on potions, flasks and runes",
        },
      },
      {
        id: "pl-mounts",
        text: {
          fr: "Avoir une monture Mammouth, Yack de Grand Voyage ou Brutosaure — accès instantané aux marchands sans retour en ville",
          en: "Have a Mammoth, Grand Expedition Yak or Brutosaur mount — instant vendor access without returning to town",
        },
      },
      {
        id: "pl-pistobottes",
        text: {
          fr: "Préparer des Pisto-Bottes (boost de vitesse utile pour la montée en niveau)",
          en: "Prepare Rocket Boots (speed boost useful during leveling)",
        },
      },
      {
        id: "pl-bags",
        text: {
          fr: "Libérer de l'espace dans les sacs",
          en: "Free up bag space",
        },
      },
      {
        id: "pl-quest-log",
        text: {
          fr: "Nettoyer son journal de quêtes",
          en: "Clean your quest log",
        },
      },
      {
        id: "pl-aoe-build",
        text: {
          fr: "Prévoir un build orienté AOE pour tuer les mobs rapidement",
          en: "Prepare an AOE-oriented build for fast mob clearing",
        },
      },
    ],
  },
  {
    id: "early-access",
    title: { fr: "Accès Anticipé", en: "Early Access" },
    shortLabel: { fr: "EA", en: "EA" },
    date: "27 fév – 3 mars",
    startDate: "2026-02-27",
    subtitle: { fr: "Pay to Win", en: "Pay to Win" },
    warning: {
      fr: "Ne pas dépenser d'écus",
      en: "Do not spend any Crests",
    },
    items: [
      {
        id: "ea-quest-profession",
        text: {
          fr: "Rendre les quêtes de Métier à la capitale et à Dornogal — récompenses : connaissance de métier et Acuités d'Artisan",
          en: "Turn in Profession quests at the capital city and Dornogal — rewards: profession knowledge and Artisan's Acuity",
        },
        links: [
          { label: { fr: "Kala Clayhoof (Dornogal)", en: "Kala Clayhoof (Dornogal)" }, path: "npc=228177/kala-clayhoof" },
        ],
      },
      {
        id: "ea-quest-fishing-cooking",
        text: {
          fr: "Rendre les quêtes journalières de Pêche et Cuisine à Hurlevent ou Orgrimmar",
          en: "Turn in Fishing and Cooking daily quests in Stormwind or Orgrimmar",
        },
        links: [
          { label: { fr: "Catherine Leland (Hurlevent – Pêche)", en: "Catherine Leland (Stormwind – Fishing)" }, path: "npc=5494/catherine-leland" },
          { label: { fr: "Razgar (Orgrimmar – Pêche)", en: "Razgar (Orgrimmar – Fishing)" }, path: "npc=43239/razgar" },
          { label: { fr: "Robby Flay (Hurlevent – Cuisine)", en: "Robby Flay (Stormwind – Cooking)" }, path: "npc=42288/robby-flay" },
          { label: { fr: "Marogg (Orgrimmar – Cuisine)", en: "Marogg (Orgrimmar – Cooking)" }, path: "npc=42506/marogg" },
        ],
      },
      {
        id: "ea-quest-balloon",
        text: {
          fr: "Rendre la quête du Ballon (\"Emporté par le vent\") à Hurlevent ou Orgrimmar — collectez 5 ballons dans la capitale",
          en: "Turn in Balloon quest (\"Blown Away\") in Stormwind or Orgrimmar — collect 5 balloons around the capital",
        },
        links: [
          { label: { fr: "Vin (Hurlevent – Alliance)", en: "Vin (Stormwind – Alliance)" }, path: "npc=54117/vin" },
          { label: { fr: "Jaga (Orgrimmar – Horde)", en: "Jaga (Orgrimmar – Horde)" }, path: "npc=54004/jaga" },
        ],
      },
      {
        id: "ea-quest-delves",
        text: {
          fr: "Rendre les quêtes de Gouffres obtenues lors des sessions de Gouffres",
          en: "Turn in Delve quests obtained while running Delves",
        },
      },
      {
        id: "ea-choose-professions",
        text: {
          fr: "Choisir ses métiers dès que possible",
          en: "Choose your professions as soon as possible",
        },
      },
      {
        id: "ea-level-chars",
        text: {
          fr: "Monter vos personnages au niveau maximum avant le reset hebdomadaire (le HM sera disponibles à ce moment)",
          en: "Level your characters to max before the weekly reset (HM become available then)",
        },
      },
      {
        id: "ea-rested-xp",
        text: {
          fr: "Se déconnecter dans une auberge entre les sessions pour accumuler de l'XP de repos",
          en: "Log out in an inn between sessions to accumulate rested XP",
        },
      },
      {
        id: "ea-warmode",
        text: {
          fr: "Activer le Mode Guerre pour un bonus d'XP supplémentaire pendant la montée en niveau",
          en: "Enable Warmode for an additional XP bonus while leveling",
        },
      },
      {
        id: "ea-rares-treasures",
        text: {
          fr: "Tuer les rares et collecter les trésors des zones pour progresser la Renommée",
          en: "Kill zone rares and collect treasures to progress Renown",
        },
      },
      {
        id: "ea-guild-banner",
        text: {
          fr: "Si vous jouez en guilde : achetez la Bannière de coopération chez le vendeur de guilde (Orgrimmar ou Hurlevent) — posez-la au sol pour donner +5% XP/réputation aux membres de guilde à moins de 100m pendant 15 min",
          en: "If in a guild: buy the Banner of Cooperation from the guild vendor (Orgrimmar or Stormwind) — place on ground to give +5% XP/reputation to guild members within 100 yards for 15 min",
        },
        links: [
          { label: { fr: "Goram (Orgrimmar – Horde)", en: "Goram (Orgrimmar – Horde)" }, path: "npc=44566/goram" },
          { label: { fr: "Bannière de coopération (Wowhead)", en: "Banner of Cooperation (Wowhead)" }, path: "item=63359/banner-of-cooperation" },
        ],
      },
      {
        id: "ea-weekly-events",
        text: {
          fr: "Compléter les événements de zone disponibles : Soirée de Saltheril, Événement d'Abondance, Légendes des Haranir, Assaut de Stormarion",
          en: "Complete weekly zone events: Saltheril's Soiree, Abundance Event, Legends of the Haranir, Stormarion Assault",
        },
      },
      {
        id: "ea-prey",
        text: {
          fr: "Effectuer les Traques si elles donnent de bonnes récompenses",
          en: "Level Prey if possible (Nightmare Prey may give Champion items)",
        },
      },
    ],
  },
  {
    id: "pre-season-week-1",
    title: { fr: "Pré-saison – Semaine 1", en: "Pre-Season Week 1" },
    shortLabel: { fr: "PS1", en: "PS1" },
    date: "4 mars",
    startDate: "2026-03-04",
    subtitle: { fr: "HM disponibles", en: "HM available" },
    warning: {
      fr: "Ne pas dépenser d'écus",
      en: "Do not spend any Crests",
    },
    items: [
      {
        id: "ps1-choose-professions",
        text: {
          fr: "Si ce n'est pas encore fait : choisir ses métiers dès que possible",
          en: "If not already done: choose your professions as soon as possible",
        },
      },
      {
        id: "ps1-guild-banner",
        text: {
          fr: "Si vous jouez en guilde : utilisez la Bannière de coopération (+5% XP/réputation pour les membres de guilde à portée) pour accélérer la montée en Renommée",
          en: "If in a guild: use the Banner of Cooperation (+5% XP/reputation for nearby guild members) to speed up Renown grinding",
        },
        links: [
          { label: { fr: "Bannière de coopération (Wowhead)", en: "Banner of Cooperation (Wowhead)" }, path: "item=63359/banner-of-cooperation" },
        ],
      },
      {
        id: "ps1-voidspire-renown",
        text: {
          fr: "Monter la Renommée de La Singularité à rang 7 → trinket Champion 1/6 gratuit",
          en: "The Singularity renown to rank 7 → free 1/6 Champion trinket",
        },
      },
      {
        id: "ps1-harati-renown",
        text: {
          fr: "Monter la Renommée Hara'ti à rang 8 → ceinture Champion 1/6 gratuite",
          en: "Raise Hara'ti renown to rank 8 → free 1/6 Champion belt",
        },
      },
      {
        id: "ps1-silvermoon-renown",
        text: {
          fr: "Monter la Renommée Lune-d'Argent à rang 9 → casque Champion 1/6 gratuit",
          en: "Raise Silvermoon renown to rank 9 → free 1/6 Champion helm",
        },
      },
      {
        id: "ps1-amani-renown",
        text: {
          fr: "Monter la Renommée Tribu Amani à rang 9 → collier Champion 1/6 gratuit",
          en: "Raise Amani Tribe renown to rank 9 → free 1/6 Champion necklace",
        },
      },
      {
        id: "ps1-delves",
        text: {
          fr: "Débloquer les Gouffres jusqu'au palier 8 (11 si disponible) pour du stuff et des écus",
          en: "Unlock Delves through tier 8 (11 if available) for gear and crests",
        },
      },
      {
        id: "ps1-weekly-events",
        text: {
          fr: "Compléter les événements hebdomadaires disponibles",
          en: "Complete weekly events if available",
        },
      },
      {
        id: "ps1-prey",
        text: {
          fr: "Effectuer les Traques si elles donnent de bonnes récompenses",
          en: "If Prey gives useful rewards, do Prey",
        },
      },
      {
        id: "ps1-world-quests",
        text: {
          fr: "Faire les quêtes mondiales qui donnent des améliorations d'équipement",
          en: "Do world quests that give gear upgrades",
        },
      },
      {
        id: "ps1-m0-tour",
        text: {
          fr: "Compléter une fois tous les donjons HM — butin au rang Vétéran (240 ilvl). Ne pas améliorer avec des Ecus",
          en: "Complete a World Tour of HM dungeons — loot at Veteran rank (240 ilvl). Do not upgrade with Crests",
        },
      },
      {
        id: "ps1-heroic-dungeons",
        text: {
          fr: "Faire des donjons Héroïques pour remplir les emplacements restants du coffre hebdomadaire",
          en: "Queue for Heroic Dungeons for remaining slots of the weekly chest",
        },
      },
    ],
  },
  {
    id: "pre-season-week-2",
    title: { fr: "Pré-saison – Semaine 2", en: "Pre-Season Week 2" },
    shortLabel: { fr: "PS2", en: "PS2" },
    date: "11 mars",
    startDate: "2026-03-11",
    subtitle: { fr: "HM disponibles", en: "HM available" },
    warning: {
      fr: "Ne pas dépenser d'écus",
      en: "Do not spend any Crests",
    },
    items: [
      {
        id: "ps2-delves",
        text: {
          fr: "Débloquer les Gouffres jusqu'au palier 8 (11 si disponible) pour du stuff et des écus",
          en: "Unlock Delves through tier 8 (11 if available) for gear and crests",
        },
      },
      {
        id: "ps2-weekly-events",
        text: {
          fr: "Compléter les événements hebdomadaires disponibles",
          en: "Complete weekly events if available",
        },
      },
      {
        id: "ps2-prey",
        text: {
          fr: "Effectuer les Traques si elles donnent de bonnes récompenses",
          en: "If Prey gives useful rewards, do Prey",
        },
      },
      {
        id: "ps2-world-quests",
        text: {
          fr: "Faire les quêtes mondiales qui donnent des améliorations d'équipement",
          en: "Do world quests that give gear upgrades",
        },
      },
      {
        id: "ps2-m0-tour",
        text: {
          fr: "Compléter une fois tous les donjons HM — butin au rang Vétéran (240 ilvl). Ne pas améliorer avec des écus",
          en: "Complete a World Tour of HM dungeons — Veteran rank loot (240 ilvl). Do not upgrade with Crests",
        },
      },
      {
        id: "ps2-heroic-dungeons",
        text: {
          fr: "Faire des donjons Héroïques pour remplir les emplacements restants du coffre hebdomadaire",
          en: "Queue for Heroic Dungeons for remaining slots of the weekly chest",
        },
      },
      {
        id: "ps2-craft",
        text: {
          fr: "Si vous raidez le mardi 17 : craftez 3 à 5 pièces en 246 ilvl (60 écus Vétéran chacune) — bracelet/ceinture/bottes avec 2 Embelllissements. Sinon, attendez",
          en: "If you raid Tuesday the 17th: craft 3-5 pieces at 246 ilvl (60 Veteran Crests each) — bracers/belt/boots with 2 Embellishments. Otherwise, hold off",
        },
      },
    ],
  },
  {
    id: "season-week-1",
    title: { fr: "Saison 1 – Semaine 1", en: "Season 1 Week 1" },
    shortLabel: { fr: "S1", en: "S1" },
    date: "18 mars",
    startDate: "2026-03-18",
    subtitle: { fr: "Semaine Héroïque", en: "Heroic Week" },
    warning: {
      fr: "Ne pas dépenser d'écus Héroïques ou Mythiques",
      en: "Do NOT spend Heroic or Mythic crests",
    },
    items: [
      {
        id: "s1w1-lfr",
        text: {
          fr: "Faire le LFR pour obtenir des pièces de set (les bonus de set sont très forts en début de saison)",
          en: "Do LFR for tier pieces (tier set bonuses are very strong early season)",
        },
      },
      {
        id: "s1w1-m0-tour",
        text: {
          fr: "Compléter une fois tous les donjons M0 — les pièces tombent maintenant au rang Champion 1/6 (246 ilvl)",
          en: "Complete a World Tour of M0 dungeons — loot now drops at Champion 1/6 (246 ilvl)",
        },
      },
      {
        id: "s1w1-world-boss",
        text: {
          fr: "Tuer le Boss Mondial pour une pièce Champion 2/6 (250 ilvl)",
          en: "Kill World Boss for a Champion 2/6 item (250 ilvl)",
        },
      },
      {
        id: "s1w1-delves",
        text: {
          fr: "Faire des Gouffres Abondants de haut niveau avec des clés, utilisez une carte si possible",
          en: "Do high level Bountiful Delves with coffer keys, use map if possible",
        },
      },
      {
        id: "s1w1-prey",
        text: {
          fr: "Effectuer les Traques si elles donnent de bonnes récompenses",
          en: "If Prey gives useful rewards, do Prey",
        },
      },
      {
        id: "s1w1-pvp-quest",
        text: {
          fr: "Faire la quête JcJ pour un collier ou anneau Héros garanti (ne pas l'améliorer)",
          en: "Do PvP quest for guaranteed Hero track neck or ring (don't upgrade it)",
        },
        note: {
          fr: "Note : cette quête avait disparu en bêta, à confirmer au lancement",
          en: "Note: this quest disappeared from beta — confirm at launch",
        },
      },
      {
        id: "s1w1-craft-veteran",
        text: {
          fr: "Avant le raid : crafter 2 pièces à 246 ilvl avec 2 Embellissements (160 écus Vétéran au total)",
          en: "Before raid: craft 2 pieces at 246 ilvl with 2 Embellishments (160 Veteran Crests total)",
        },
      },
      {
        id: "s1w1-spend-vet-champ-crests",
        text: {
          fr: "Avant le raid : dépenser tous vos écus Vétéran et Champion restants pour améliorer votre équipement",
          en: "Before raid: spend all remaining Veteran and Champion Crests on gear upgrades",
        },
      },
      {
        id: "s1w1-raid",
        text: {
          fr: "Terminer autant que possible du Normal et de l'Héroïque",
          en: "Clear as much of Normal and Heroic as you can",
        },
      },
    ],
    crestTracking: [
      { fr: "0/100 Héroïques dépensées", en: "0/100 Heroic spent" },
      { fr: "0/100 Mythiques dépensées", en: "0/100 Mythic spent" },
    ],
    endingIlvl: { fr: "Objectif : 4× 266 · 11× 269", en: "Target: 4× 266 · 11× 269" },
  },
  {
    id: "season-week-2",
    title: { fr: "Semaine 2", en: "Week 2" },
    shortLabel: { fr: "S2", en: "S2" },
    date: "25 mars",
    startDate: "2026-03-25",
    subtitle: { fr: "Semaine Mythique – M+ ouvre", en: "Mythic Week – M+ opens" },
    items: [
      {
        id: "s1w2-lfr",
        text: { fr: "Faire le LFR pour des pièces de set", en: "Do LFR for tier pieces" },
      },
      {
        id: "s1w2-world-boss",
        text: { fr: "Tuer le Boss Mondial pour une pièce Champion 2/6 (250 ilvl)", en: "Kill World Boss for a Champion 2/6 item (250 ilvl)" },
      },
      {
        id: "s1w2-delves",
        text: { fr: "Faire des Gouffres Abondants de haut niveau avec des clés (faire au moins un palier 11 pour la quête Clé Brisée)", en: "Do high level Bountiful Delves with coffer keys (do at least one t11 for the Cracked Keystone quest)" },
      },
      {
        id: "s1w2-prey",
        text: { fr: "Effectuer les Traques si elles donnent de bonnes récompenses", en: "If Prey gives useful rewards, do Prey" },
      },
      {
        id: "s1w2-m-plus",
        text: {
          fr: "Farmer des +10 pour des pièces Héros 3/6 (266 ilvl), des slots de Chambre Forte et des écus. À défaut, faire des +8 minimum",
          en: "Farm +10s for Hero 3/6 (266 ilvl) gear, vault slots, and Crests. At minimum, do +8s for Hero 2/6 gear",
        },
      },
      {
        id: "s1w2-hero-upgrades",
        text: {
          fr: "Avant la progression Mythique : améliorer vos 11 items Héros 3/6 une fois chacun (266 → 269 ilvl) — 220 écus Héroïques au total",
          en: "Before Mythic progression: upgrade all 11 Hero 3/6 items once each (266 → 269 ilvl) — 220 Heroic Crests total",
        },
      },
      {
        id: "s1w2-raid",
        text: { fr: "Full clear Normal, Héroïque, et commencez la progression Mythique", en: "Full clear Normal, Heroic, and begin Mythic progression" },
      },
      {
        id: "s1w2-mythic-drop",
        text: {
          fr: "Si vous obtenez un item Mythique par chance, passez directement aux conseils d'amélioration de la semaine suivante",
          en: "If lucky enough to get a Mythic item from raid, skip to next week's upgrade advice for it",
        },
      },
    ],
    crestTracking: [
      { fr: "220/220 Héroïques dépensées", en: "220/220 Heroic spent" },
      { fr: "0/220 Mythiques dépensées", en: "0/220 Mythic spent" },
    ],
    endingIlvl: { fr: "Objectif : 4× 266 · 11× 269", en: "Target: 4× 266 · 11× 269" },
  },
  {
    id: "season-week-3",
    title: { fr: "Semaine 3", en: "Week 3" },
    shortLabel: { fr: "S3", en: "S3" },
    date: "1 avr",
    startDate: "2026-04-01",
    subtitle: { fr: "Dernier Raid disponible", en: "Final Raid opens" },
    warning: {
      fr: "Ouvrir la Chambre Forte et crafter avant de dépenser des écus",
      en: "Open vault and craft before spending Crests",
    },
    items: [
      {
        id: "s1w3-vault",
        text: {
          fr: "Ouvrir la Chambre Forte pour un item Mythique 1/6 (272+ ilvl) — l'améliorer APRÈS avoir crafté",
          en: "Open vault for a Myth track 1/6 item (272+ ilvl) — upgrade it AFTER crafting",
        },
      },
      {
        id: "s1w3-craft-weapon",
        text: {
          fr: "Crafter une arme 2M Mythique (5/6 285) avec 2 éclats et 80 écus Mythiques",
          en: "Craft a 2H Mythic weapon (5/6 285) using 2 sparks and 80 Mythic Crests",
        },
      },
      {
        id: "s1w3-lfr",
        text: { fr: "Si pas de 4 pièces de set : faire le LFR", en: "If no 4-piece set: do LFR for tier pieces" },
      },
      {
        id: "s1w3-m-plus",
        text: { fr: "Farmer des +12 pour les slots de Chambre Forte et les écus", en: "Farm +12s for vault slots and Crests" },
      },
      {
        id: "s1w3-heroic-upgrades",
        text: {
          fr: "Héroïque : améliorer 2 items 4/6 269 → 6/6 276 (80 écus Héroïques)",
          en: "Heroic: upgrade 2 of your 4/6 269 items to 6/6 276 (80 Heroic Crests)",
        },
      },
      {
        id: "s1w3-raid",
        text: { fr: "Full clear Normal, Héroïque, et progress Mythique", en: "Full clear Normal, Heroic, and do Mythic progression" },
      },
      {
        id: "s1w3-myth-vault-upgrade",
        text: {
          fr: "Mythique (si item Chambre Forte 1/6) : améliorez d'abord son équivalent Héroïque à 6/6 276 (20 écus Héroïques), puis améliorez le 1/6 272 → 6/6 289 (80 écus Mythiques)",
          en: "Mythic (if vault item is 1/6): first upgrade its Heroic counterpart to 6/6 276 (20 Heroic Crests), then upgrade the 1/6 272 → 6/6 289 (80 Mythic Crests)",
        },
      },
      {
        id: "s1w3-myth-raid-upgrade",
        text: {
          fr: "Mythique : améliorer la pièce de raid 2/6 275 → 6/6 289 (80 écus Mythiques)",
          en: "Mythic: upgrade your 2/6 275 Myth raid drop → 6/6 289 (80 Mythic Crests)",
        },
        note: {
          fr: "En supposant que vous obtenez une pièce Mythique de raid lors des semaines 1-2",
          en: "Assuming 1 Mythic raid piece obtained in weeks 1-2",
        },
      },
    ],
    crestTracking: [
      { fr: "320/320 Héroïques dépensées", en: "320/320 Heroic spent" },
      { fr: "160/320 Mythiques dépensées", en: "160/320 Mythic spent" },
    ],
    endingIlvl: { fr: "Objectif : 3× 266 · 8× 269 · 2× 276h · 1× 285 (crafté) · 1× 289", en: "Target: 3× 266 · 8× 269 · 2× 276h · 1× 285 (crafted) · 1× 289" },
  },
  {
    id: "season-week-4",
    title: { fr: "Semaine 4", en: "Week 4" },
    shortLabel: { fr: "S4", en: "S4" },
    date: "8 avr",
    startDate: "2026-04-08",
    items: [
      {
        id: "s1w4-vault",
        text: { fr: "Ouvrir la Chambre Forte (item Mythique 272+ ilvl)", en: "Open vault for a Myth track 272+ item" },
      },
      {
        id: "s1w4-m-plus",
        text: { fr: "Farmer des +12 pour les slots de Chambre Forte et les écus", en: "Farm +12s for vault slots and Crests" },
      },
      {
        id: "s1w4-heroic-upgrades",
        text: {
          fr: "Héroïque : améliorer 2 items 4/6 269 → 6/6 276 (80 écus Héroïques)",
          en: "Heroic: upgrade 2 of your 4/6 269 items to 6/6 276 (80 Heroic Crests)",
        },
      },
      {
        id: "s1w4-myth-vault-upgrade",
        text: {
          fr: "Mythique (si item Chambre Forte 1/6) : améliorez d'abord son équivalent Héroïque à 6/6 276 (20 écus Héroïques), puis améliorez le 1/6 272 → 6/6 289 (80 écus Mythiques)",
          en: "Mythic (if vault item is 1/6): first upgrade its Heroic counterpart to 6/6 276 (20 Heroic Crests), then upgrade the 1/6 272 → 6/6 289 (80 Mythic Crests)",
        },
      },
      {
        id: "s1w4-myth-raid-upgrade",
        text: {
          fr: "Mythique : améliorer la pièce de raid 2/6 275 → 6/6 289 (80 écus Mythiques)",
          en: "Mythic: upgrade your 2/6 275 Myth raid drop → 6/6 289 (80 Mythic Crests)",
        },
      },
    ],
    crestTracking: [
      { fr: "420/400 Héroïques dépensées", en: "420/400 Heroic spent" },
      { fr: "320/420 Mythiques dépensées", en: "320/420 Mythic spent" },
    ],
    endingIlvl: { fr: "Objectif : 2× 266 · 5× 269 · 4× 276h · 1× 285 (crafté) · 3× 289", en: "Target: 2× 266 · 5× 269 · 4× 276h · 1× 285 (crafted) · 3× 289" },
  },
  {
    id: "season-week-5",
    title: { fr: "Semaine 5", en: "Week 5" },
    shortLabel: { fr: "S5", en: "S5" },
    date: "15 avr",
    startDate: "2026-04-15",
    items: [
      {
        id: "s1w5-vault",
        text: { fr: "Ouvrir la Chambre Forte (item Mythique 272+ ilvl)", en: "Open vault for a Myth track 272+ item" },
      },
      {
        id: "s1w5-m-plus",
        text: { fr: "Farmer des +12 pour les slots de Chambre Forte et les écus", en: "Farm +12s for vault slots and Crests" },
      },
      {
        id: "s1w5-craft",
        text: {
          fr: "Crafter un deuxième Embellissement à 285 ilvl Mythique (80 écus Mythiques)",
          en: "Craft 2nd embellishment at 285 ilvl Mythic (80 Mythic Crests)",
        },
      },
      {
        id: "s1w5-heroic-upgrades",
        text: {
          fr: "Héroïque : améliorer 2 items 4/6 269 → 6/6 276 (80 écus Héroïques)",
          en: "Heroic: upgrade 2 of your 4/6 269 items to 6/6 276 (80 Heroic Crests)",
        },
      },
      {
        id: "s1w5-myth-vault-upgrade",
        text: {
          fr: "Mythique (si item Chambre Forte 1/6) : améliorez d'abord son équivalent Héroïque à 6/6 276 (20 écus Héroïques), puis améliorez le 1/6 272 → 6/6 289 (80 écus Mythiques)",
          en: "Mythic (if vault item is 1/6): first upgrade its Heroic counterpart to 6/6 276 (20 Heroic Crests), then upgrade the 1/6 272 → 6/6 289 (80 Mythic Crests)",
        },
      },
    ],
    crestTracking: [
      { fr: "520/520 Héroïques dépensées", en: "520/520 Heroic spent" },
      { fr: "480/520 Mythiques dépensées", en: "480/520 Mythic spent" },
    ],
    endingIlvl: { fr: "Objectif : 1× 266 · 2× 269 · 6× 276h · 2× 285 (craftés) · 4× 289", en: "Target: 1× 266 · 2× 269 · 6× 276h · 2× 285 (crafted) · 4× 289" },
  },
  {
    id: "season-week-6",
    title: { fr: "Semaine 6", en: "Week 6" },
    shortLabel: { fr: "S6", en: "S6" },
    date: "22 avr",
    startDate: "2026-04-22",
    subtitle: { fr: "Fin des écus Héroïques", en: "Done with Heroic Crests" },
    items: [
      {
        id: "s1w6-vault",
        text: { fr: "Ouvrir la Chambre Forte (item Mythique 272+ ilvl)", en: "Open vault for a Myth track 272+ item" },
      },
      {
        id: "s1w6-m-plus",
        text: { fr: "Farmer des +12 pour les slots de Chambre Forte et les écus", en: "Farm +12s for vault slots and Crests" },
      },
      {
        id: "s1w6-heroic-last",
        text: {
          fr: "Héroïque : améliorer votre dernier item 4/6 269 → 6/6 276 (40 écus Héroïques) — vous avez maintenant terminé les écus Héroïques",
          en: "Heroic: upgrade your last 4/6 269 item to 6/6 276 (40 Heroic Crests) — you are now done with Heroic Crests",
        },
      },
      {
        id: "s1w6-myth-vault-upgrade",
        text: {
          fr: "Mythique (si item Chambre Forte 1/6) : améliorez d'abord son équivalent Héroïque à 6/6 276 (20 écus Héroïques), puis améliorez le 1/6 272 → 6/6 289 (80 écus Mythiques)",
          en: "Mythic (if vault item is 1/6): first upgrade its Heroic counterpart to 6/6 276 (20 Heroic Crests), then upgrade the 1/6 272 → 6/6 289 (80 Mythic Crests)",
        },
      },
      {
        id: "s1w6-myth-raid-upgrade",
        text: {
          fr: "Mythique : améliorer la pièce de raid 2/6 275 → 6/6 289 (80 écus Mythiques)",
          en: "Mythic: upgrade your 2/6 275 Myth raid drop → 6/6 289 (80 Mythic Crests)",
        },
      },
    ],
    crestTracking: [
      { fr: "560/620 Héroïques dépensées — TERMINÉ", en: "560/620 Heroic spent — DONE" },
      { fr: "620/620 Mythiques dépensées", en: "620/620 Mythic spent" },
    ],
    endingIlvl: { fr: "Objectif : 7× 276h · 2× 285 (craftés) · 1× 285 · 5× 289", en: "Target: 7× 276h · 2× 285 (crafted) · 1× 285 · 5× 289" },
  },
  {
    id: "season-week-7plus",
    title: { fr: "Semaine 7+", en: "Week 7+" },
    shortLabel: { fr: "S7+", en: "S7+" },
    date: "29 avr+",
    startDate: "2026-04-29",
    items: [
      {
        id: "s1w7-vault",
        text: { fr: "Ouvrir la Chambre Forte (item Mythique 272+ ilvl)", en: "Open vault for a Myth track 272+ item" },
      },
      {
        id: "s1w7-m-plus",
        text: { fr: "Farmer des +12 pour les slots de Chambre Forte et les écus", en: "Farm +12s for vault slots and Crests" },
      },
      {
        id: "s1w7-myth-upgrade",
        text: {
          fr: "Améliorer les items Mythiques dès que vous les obtenez, en visant directement 6/6 289 pour le saut de +4 ilvl",
          en: "Upgrade Mythic items as you get them, preferring to jump them directly to 6/6 289 for the +4 ilvl jump",
        },
      },
      {
        id: "s1w7-no-craft",
        text: {
          fr: "Ne craftez pas si vous pouvez obtenir des items de Chambre Forte à plus de 1/6 — priorisez les upgrades directs",
          en: "Do not craft if you can get vault items higher than 1/6 — prioritize direct upgrades instead",
        },
      },
      {
        id: "s1w7-sim",
        text: {
          fr: "Simuler votre personnage chaque semaine avant de dépenser des écus",
          en: "Sim your character weekly before spending Crests",
        },
      },
      {
        id: "s1w7-1h-swap",
        text: {
          fr: "Envisager le swap vers 1H + bouclier/OH crafté si vos sims le recommandent",
          en: "Consider swapping to 1H + crafted OH if sims recommend it",
        },
      },
    ],
  },
];
