# WoW Gearing Guide

Application web pour aider les joueurs de World of Warcraft a trouver l'activite la plus efficace pour monter leur item level (ilvl).

## Stack

- [Astro](https://astro.build/) v5 (site statique)
- [React](https://react.dev/) (composants interactifs)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [shadcn/ui](https://ui.shadcn.com/) (composants UI)
- TypeScript

## Fonctionnalites

- Filtre par ilvl et par classe/spec
- Support FR/EN (detection automatique de la langue)
- Theme clair/sombre avec fonds d'ecran WoW
- Tooltips Wowhead sur les items
- Sections : Dashboard, Raids, Donjons, Delves, Craft, PvP, Roadmap, …

## Developpement

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Donnees

Les donnees de gearing sont dans `src/data/` :
- `activities.json` — loot tables raids/donjons (boss groups, ilvl, crests)
- `tracks.json` — paliers de mise a niveau des items
- `season.json` — metadata de saison
- `classes.ts`, `roadmap.ts`, `specItems.ts` — donnees TypeScript (classes, roadmap, items par spec)

Modifier ces fichiers pour mettre a jour les ilvl lors d'un nouveau patch ou saison.

## Deploiement

Site statique deploye sur Vercel. Push sur `main` pour declencher le deploiement.
