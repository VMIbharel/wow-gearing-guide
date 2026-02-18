export interface WeeklyItem {
  id: string;
  text: { fr: string; en: string };
  note?: { fr: string; en: string };
}

export interface WeeklyPhase {
  id: string;
  title: { fr: string; en: string };
  date: string;
  subtitle?: { fr: string; en: string };
  warning?: { fr: string; en: string };
  items: WeeklyItem[];
  crestTracking?: { fr: string; en: string }[];
  endingIlvl?: { fr: string; en: string };
}

export const weeklyPhases: WeeklyPhase[] = [
  {
    id: "early-access",
    title: { fr: "Accès Anticipé", en: "Early Access" },
    date: "26 fév – 2 mars",
    subtitle: { fr: "Pay to Win", en: "Pay to Win" },
    warning: {
      fr: "Ne pas dépenser d'écus",
      en: "Do not spend any Crests",
    },
    items: [
      {
        id: "ea-level-chars",
        text: {
          fr: "Monter vos personnages au niveau maximum avant le reset hebdomadaire (les M0 seront disponibles à ce moment)",
          en: "Level your characters to max before the weekly reset (M0s become available then)",
        },
      },
      {
        id: "ea-dmf-exp",
        text: {
          fr: "Foire de SombreLune ouvre dimanche : +10% d'expérience. Profitez-en pour monter en niveau plus vite",
          en: "Darkmoon Faire opens Sunday for 10% more XP. Use the buff to level faster",
        },
      },
      {
        id: "ea-weekly-events",
        text: {
          fr: "Compléter les événements hebdomadaires disponibles",
          en: "Complete weekly events if available",
        },
      },
      {
        id: "ea-prey",
        text: {
          fr: "Effectuer les Traques si elles donnent de bonnes récompenses",
          en: "Level Prey if possible (Nightmare Prey may give Champion items)",
        },
      },
      {
        id: "ea-renown-craft",
        text: {
          fr: "Artisans : minimisez les quêtes secondaires avant dimanche pour profiter du bonus de +10% de Renommée de la Foire de SombreLune",
          en: "Crafters/min-maxers: minimize side quests before Sunday to gain DMF's 10% Renown bonus",
        },
      },
    ],
  },
  {
    id: "pre-season-week-1",
    title: { fr: "Pré-saison – Semaine 1", en: "Pre-Season Week 1" },
    date: "3 mars",
    subtitle: { fr: "M0 disponibles (ilvl réduit)", en: "M0s available at reduced item level" },
    warning: {
      fr: "Ne pas dépenser d'écus",
      en: "Do not spend any Crests",
    },
    items: [
      {
        id: "ps1-voidspire-renown",
        text: {
          fr: "Monter la Renommée de La Singularité à rang 7 → trinket Champion 1/6 gratuit",
          en: "The Singularity renown to rank 7 → free 1/6 Champion trinket",
        },
        note: {
          fr: "Utilisez le buff de la Foire de SombreLune pour aller plus vite",
          en: "Use Darkmoon Faire buff to speed this up",
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
          fr: "Compléter une fois tous les donjons M0 — butin au rang Vétéran (240 ilvl). Ne pas améliorer avec des Ecus",
          en: "Complete a World Tour of M0 dungeons — loot at Veteran rank (240 ilvl). Do not upgrade with Crests",
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
    date: "10 mars",
    subtitle: { fr: "M0 disponibles (ilvl réduit)", en: "M0s available at reduced item level" },
    warning: {
      fr: "Ne pas dépenser d'écus",
      en: "Do not spend any Crests",
    },
    items: [
      {
        id: "ps2-dmf-renown",
        text: {
          fr: "Profitez du buff de la Foire de SombreLune pour améliorer la Renommée si vous êtes artisan",
          en: "Use Darkmoon Faire buff to raise Renown if you're a crafter",
        },
      },
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
          fr: "Compléter une fois tous les donjons M0 — butin au rang Vétéran (240 ilvl). Ne pas améliorer avec des écus",
          en: "Complete a World Tour of M0 dungeons — Veteran rank loot (240 ilvl). Do not upgrade with Crests",
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
    date: "17 mars",
    subtitle: { fr: "Semaine Héroïque – pas de M+", en: "Heroic Week – no M+" },
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
          fr: "Avant le raid : crafter 3 à 5 pièces en 246 ilvl (60 écus Vétéran chacune) — bracelet/ceinture/bottes avec 2 Embellissements",
          en: "Before raid: craft 3-5 pieces at 246 ilvl (60 Veteran Crests each) — bracers/belt/boots with 2 Embellishments",
        },
      },
      {
        id: "s1w1-craft-adventurer",
        text: {
          fr: "Avant le raid : crafter les emplacements restants en 233 ilvl (60 écus Aventurier chacune)",
          en: "Before raid: craft remaining slots at 233 ilvl (60 Adventurer Crests each)",
        },
      },
      {
        id: "s1w1-spend-normal-crests",
        text: {
          fr: "Dépenser les écus Normal et inférieures pour des améliorations temporaires (préférez les trinkets que vous remplacerez dans quelques semaines)",
          en: "Spend any Normal difficulty or below crests on temporary upgrades (prefer trinkets)",
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
    ],
  },
  {
    id: "season-week-2",
    title: { fr: "Semaine 2", en: "Week 2" },
    date: "24 mars",
    subtitle: { fr: "Semaine Mythique – M+ ouvre", en: "Mythic Week – M+ opens" },
    warning: {
      fr: "Ne pas dépenser d'écus Héroïques ou Mythiques",
      en: "Do NOT spend Heroic or Mythic Crests",
    },
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
        text: { fr: "Faire des Gouffres Abondants de haut niveau avec des clés", en: "Do high level Bountiful Delves with coffer keys, use map if possible" },
      },
      {
        id: "s1w2-prey",
        text: { fr: "Effectuer les Traques si elles donnent de bonnes récompenses", en: "If Prey gives useful rewards, do Prey" },
      },
      {
        id: "s1w2-spend-normal-crests",
        text: { fr: "Dépenser les écus Normal et inférieures pour des améliorations temporaires", en: "Spend Normal and below crests on temporary upgrades" },
      },
      {
        id: "s1w2-m-plus",
        text: {
          fr: "Farmer des +10 pour des pièces Héros 3/6 (266 ilvl), des slots de Chambre Forte et des écus. À défaut, faire des +8 minimum",
          en: "Farm +10s for Hero 3/6 (266 ilvl) gear, vault slots, and Crests. At minimum, do +8s for Hero 2/6 gear",
        },
      },
      {
        id: "s1w2-raid",
        text: { fr: "Full clear Normal, Héroïque, et commencez la progression Mythique", en: "Full clear Normal, Heroic, and begin Mythic progression" },
      },
      {
        id: "s1w2-mythic-drop",
        text: {
          fr: "Si vous obtenez un item Mythique par chance, vous pouvez l'améliorer deux fois sans impacter la suite",
          en: "If lucky enough to get a Mythic item from raid, you can upgrade it twice without affecting advice below",
        },
      },
    ],
    crestTracking: [
      { fr: "0/200 Héroïques dépensées", en: "0/200 Heroic spent" },
      { fr: "0/100 Dorées dépensées", en: "0/100 Gilded spent" },
    ],
    endingIlvl: { fr: "Objectif : 15× 266 ilvl", en: "Target: 15× 266 ilvl" },
  },
  {
    id: "season-week-3",
    title: { fr: "Semaine 3", en: "Week 3" },
    date: "31 mars",
    subtitle: { fr: "Dernier Raid disponible", en: "Final Raid opens" },
    warning: {
      fr: "Ne pas dépenser d'écus Héroïques avant le reset du raid",
      en: "Do NOT spend Heroic crests until after reclear",
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
          fr: "Crafter une arme Mythique 2M (5/6 285) avec 60 écus Mythique",
          en: "Craft a 2H Mythic weapon (5/6 285) for 60 Myth Crests",
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
          fr: "Avant la prog Mythique : améliorer autant de pièces Héroïques de 3/6 266 à 4/6 269 que possible (300 écus Héroïques – 30 par amélioration). Laisser un anneau, un trinket, ses slot seront à crafter dans 2 semaines",
          en: "Before Mythic prog: upgrade as many Heroic items from 3/6 266 to 4/6 269 as possible (300 Heroic Crests – 30 each). Leave one ring, trinket, and the slot you'll craft in 2 weeks",
        },
      },
      {
        id: "s1w3-raid",
        text: { fr: "Full clear Normal, Héroïque, et progress Mythique", en: "Full clear Normal, Heroic, and do Mythic progression" },
      },
      {
        id: "s1w3-vault-upgrade",
        text: {
          fr: "Améliorer l'item Mythique de la Chambre Forte trois fois, à 4/6 282 (60 écus Dorées)",
          en: "Upgrade vault Myth item three times, to 4/6 282 (60 Gilded Crests)",
        },
      },
    ],
    crestTracking: [
      { fr: "300/300 Héroïques dépensées", en: "300/300 Heroic spent" },
      { fr: "120/200 Dorées dépensées", en: "120/200 Gilded spent" },
    ],
    endingIlvl: { fr: "Objectif : 3× 266 · 10× 269 · 1× 282 · 1× 285 (crafté)", en: "Target: 3× 266 · 10× 269 · 1× 282 · 1× 285 (crafted)" },
  },
  {
    id: "season-week-4",
    title: { fr: "Semaine 4", en: "Week 4" },
    date: "7 avr",
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
        id: "s1w4-heroic-266-269",
        text: {
          fr: "Héroïque : améliorer 2 pièces de 3/6 266 → 4/6 269 (60 écus). Préférer trinkets/anneaux difficiles à remplacer",
          en: "Heroic: upgrade 2 items from 3/6 266 → 4/6 269 (60 Crests). Prefer trinkets/rings hard to replace",
        },
      },
      {
        id: "s1w4-heroic-269-272",
        text: {
          fr: "Héroïque : améliorer un item 4/6 269 → 5/6 272 (40 écus). Préférer trinket/anneau peu susceptible d'être remplacé",
          en: "Heroic: upgrade one 4/6 269 item → 5/6 272 (40 Crests). Prefer trinket/ring unlikely to be replaced",
        },
      },
      {
        id: "s1w4-myth-upgrade-vault",
        text: {
          fr: "Améliorer l'item Mythique de la Chambre Forte à 4/6 282 (60 écus Dorées)",
          en: "Upgrade new vault Myth item to 4/6 282 (60 Gilded Crests)",
        },
      },
      {
        id: "s1w4-myth-upgrade-276",
        text: {
          fr: "Améliorer l'item Mythique de raid 2/6 276 à 4/6 282 (50 écus Dorées)",
          en: "Upgrade 2/6 276 Myth raid item to 4/6 282 (50 Gilded Crests)",
        },
        note: {
          fr: "En supposant que vous obtenez une pièce Mythique de raid lors des semaines 1-2",
          en: "Assuming 1 Mythic raid piece obtained in weeks 1-2",
        },
      },
      {
        id: "s1w4-myth-upgrade-285",
        text: {
          fr: "Améliorer le meilleur item Mythique 4/6 → 5/6 285 (50 écus Dorées) uniquement s'il n'y a pas d'autres items à améliorer",
          en: "Upgrade best Myth 4/6 → 5/6 285 (50 Gilded Crests) only if no other items to upgrade",
        },
      },
    ],
    crestTracking: [
      { fr: "400/400 Héroïques dépensées", en: "400/400 Heroic spent" },
      { fr: "280/300 Dorées dépensées", en: "280/300 Gilded spent" },
    ],
    endingIlvl: { fr: "Objectif : 1× 266 · 10× 269 · 2× 282 · 1× 285 · 1× 285 (crafté)", en: "Target: 1× 266 · 10× 269 · 2× 282 · 1× 285 · 1× 285 (crafted)" },
  },
  {
    id: "season-week-5",
    title: { fr: "Semaine 5", en: "Week 5" },
    date: "14 avr",
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
          fr: "Crafter un deuxième item Mythique 5/6 285 (60 écus Mythique). Privilégiez un slot avec un item Héroïque",
          en: "Craft second Mythic item at 5/6 285 (60 Myth Crests). Prefer a slot with a Heroic item",
        },
      },
      {
        id: "s1w5-heroic-upgrades",
        text: {
          fr: "Héroïque : améliorer deux items 4/6 269 → 5/6 272 (80 écus). Évitez les slots à remplacer prochainement",
          en: "Heroic: upgrade two 4/6 269 items → 5/6 272 (80 Crests). Avoid slots likely to be replaced in vault",
        },
      },
      {
        id: "s1w5-myth-vault-upgrade",
        text: {
          fr: "Améliorer l'item Mythique de la Chambre Forte à 4/6 282 (60 écus Dorées)",
          en: "Upgrade new vault Myth item to 4/6 282 (60 Gilded Crests)",
        },
      },
    ],
    crestTracking: [
      { fr: "480/500 Héroïques dépensées", en: "480/500 Heroic spent" },
      { fr: "400/400 Dorées dépensées", en: "400/400 Gilded spent" },
    ],
    endingIlvl: { fr: "Objectif : 7× 269 · 2× 272h · 3× 282 · 1× 285 · 2× 285 (craftés)", en: "Target: 7× 269 · 2× 272h · 3× 282 · 1× 285 · 2× 285 (crafted)" },
  },
  {
    id: "season-week-6",
    title: { fr: "Semaine 6", en: "Week 6" },
    date: "21 avr",
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
        id: "s1w6-heroic-upgrades",
        text: {
          fr: "Héroïque : améliorer trois items 4/6 269 → 5/6 272 (120 écus). Évitez les slots à remplacer",
          en: "Heroic: upgrade three 4/6 269 items → 5/6 272 (120 Crests). Avoid slots likely to be replaced",
        },
      },
      {
        id: "s1w6-myth-vault-upgrade",
        text: {
          fr: "Améliorer l'item Mythique de la Chambre Forte à 4/6 282 (30 écus Dorées)",
          en: "Upgrade new vault Myth item to 4/6 282 (30 Gilded Crests)",
        },
      },
      {
        id: "s1w6-myth-raid-upgrade",
        text: {
          fr: "Améliorer l'item Mythique de raid 3/6 279 à 4/6 282 (30 écus Dorées)",
          en: "Upgrade 3/6 279 Myth raid item to 4/6 282 (30 Gilded Crests)",
        },
        note: {
          fr: "En supposant que vous obtenez une pièce Mythique de raid 3/6 lors des 2 dernières semaines",
          en: "Assuming 1 Mythic raid piece at 3/6 279 from the last 2 raid weeks",
        },
      },
    ],
    crestTracking: [
      { fr: "600/600 Héroïques dépensées", en: "600/600 Heroic spent" },
      { fr: "490/500 Dorées dépensées", en: "490/500 Gilded spent" },
    ],
    endingIlvl: { fr: "Objectif : 2× 269 · 5× 272h · 6× 282 · 2× 285 (craftés)", en: "Target: 2× 269 · 5× 272h · 6× 282 · 2× 285 (crafted)" },
  },
  {
    id: "season-week-7",
    title: { fr: "Semaine 7", en: "Week 7" },
    date: "28 avr",
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
        id: "s1w7-craft",
        text: {
          fr: "Crafter un troisième item Mythique 5/6 285 (60 écus Mythique). Préférez un slot avec un item Héroïque",
          en: "Craft third Mythic item at 5/6 285 (60 Myth Crests). Prefer a slot with a Heroic item",
        },
      },
      {
        id: "s1w7-heroic-last",
        text: {
          fr: "Héroïque : améliorer les 2 derniers items 4/6 269 → 5/6 272 (80 écus), ou 1 item à 276 si vous êtes sûr qu'il ne sera pas remplacé",
          en: "Heroic: upgrade last two 4/6 269 items → 5/6 272 (80 Crests), or 1 item to 276 if it won't be replaced",
        },
      },
      {
        id: "s1w7-myth-upgrade",
        text: {
          fr: "Améliorer l'item Mythique de la Chambre Forte deux fois, à 3/6 279 (30 écus Dorées)",
          en: "Upgrade vault Myth item two times, to 3/6 279 (30 Gilded Crests)",
        },
      },
    ],
    crestTracking: [
      { fr: "680/700 Héroïques dépensées", en: "680/700 Heroic spent" },
      { fr: "580/600 Dorées dépensées", en: "580/600 Gilded spent" },
    ],
    endingIlvl: { fr: "Objectif : 5× 272h · 1× 279 · 6× 282 · 3× 285 (craftés)", en: "Target: 5× 272h · 1× 279 · 6× 282 · 3× 285 (crafted)" },
  },
  {
    id: "season-week-8",
    title: { fr: "Semaine 8", en: "Week 8" },
    date: "5 mai",
    subtitle: { fr: "Fin des écus Héroïques", en: "Done with Heroic Crests" },
    items: [
      {
        id: "s1w8-vault",
        text: { fr: "Ouvrir la Chambre Forte (item Mythique 272+ ilvl)", en: "Open vault for a Myth track 272+ item" },
      },
      {
        id: "s1w8-m-plus",
        text: { fr: "Farmer des +12 pour les slots de Chambre Forte et les écus", en: "Farm +12s for vault slots and Crests" },
      },
      {
        id: "s1w8-heroic-last",
        text: {
          fr: "Héroïque : améliorer les 2 derniers items 5/6 272 → 6/6 276 (100 écus). Vous avez maintenant terminé les écus Héroïques",
          en: "Heroic: upgrade last two 5/6 272 items → 6/6 276 (100 Crests). You are now done with Heroic Crests",
        },
        note: {
          fr: "Certains joueurs finiront semaine 7, d'autres semaine 9 selon la RNG",
          en: "Some players may finish on week 7 or 9 depending on RNG",
        },
      },
      {
        id: "s1w8-myth-upgrade-new",
        text: {
          fr: "Améliorer l'item Mythique de la Chambre Forte à 2/6 276 (10 écus Dorées)",
          en: "Upgrade vault Myth item to 2/6 276 (10 Gilded Crests)",
        },
      },
      {
        id: "s1w8-myth-upgrade-279",
        text: {
          fr: "Améliorer trois items Mythique 2/6 276 à 3/6 279 (60 écus Dorées au total)",
          en: "Upgrade three Myth 2/6 276 items to 3/6 279 (60 Gilded Crests total)",
        },
      },
      {
        id: "s1w8-myth-upgrade-282",
        text: {
          fr: "Améliorer un item Mythique 3/6 279 à 4/6 282 (30 écus Dorées)",
          en: "Upgrade one Myth 3/6 279 item to 4/6 282 (30 Gilded Crests)",
        },
      },
    ],
    crestTracking: [
      { fr: "780/800 Héroïques dépensées — TERMINÉ", en: "780/800 Heroic spent — DONE" },
      { fr: "680/700 Dorées dépensées", en: "680/700 Gilded spent" },
    ],
    endingIlvl: { fr: "Objectif : 2× 276h · 3× 279 · 7× 282 · 3× 285 (craftés)", en: "Target: 2× 276h · 3× 279 · 7× 282 · 3× 285 (crafted)" },
  },
  {
    id: "season-weeks-9plus",
    title: { fr: "Semaine 9+", en: "Weeks 9+" },
    date: "12 mai+",
    items: [
      {
        id: "s1w9-craft-slots",
        text: {
          fr: "Crafter des emplacements en 5/6m toutes les deux semaines si ça économise des écus",
          en: "Craft slots at 5/6m every other week if it saves Crests",
        },
      },
      {
        id: "s1w9-get-282",
        text: {
          fr: "Amener tous les emplacements non-craftés à 4/6 282 avant de passer à la suite",
          en: "Get all non-crafted slots to 4/6 282 before upgrading further",
        },
      },
      {
        id: "s1w9-upgrade-289",
        text: {
          fr: "Améliorer un item par semaine vers 6/6 289 (le saut de +4 ilvl de 5/6 à 6/6 est très intéressant)",
          en: "Upgrade one item per week toward 6/6 289 (the +4 ilvl jump from 5/6 to 6/6 is very worthwhile)",
        },
      },
      {
        id: "s1w9-sim",
        text: {
          fr: "Simuler votre personnage chaque semaine avant de dépenser des écus",
          en: "Sim your character weekly before spending Crests",
        },
      },
      {
        id: "s1w9-1h-swap",
        text: {
          fr: "Envisager le swap vers 1H + OH crafté si vos sims le recommandent (coûte une semaine complète de écus)",
          en: "Consider swapping to 1H + crafted OH if sims recommend it (costs a full week of Crests)",
        },
      },
      {
        id: "s1w9-turbo",
        text: {
          fr: "Se préparer à d'éventuels Turbo Boost (7/8 et 8/8) comme dans les saisons précédentes de TWW",
          en: "Prepare for potential Turbo Boost upgrades (7/8 and 8/8) like in previous TWW seasons",
        },
      },
    ],
  },
];
