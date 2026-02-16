# WoW Gearing Guide

Application web pour aider les joueurs de World of Warcraft a trouver l'activite la plus efficace pour monter leur item level (ilvl).

## Stack

- [Astro](https://astro.build/) v5 (site statique)
- [React](https://react.dev/) (composants interactifs)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [shadcn/ui](https://ui.shadcn.com/) (composants UI)
- TypeScript

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

Les donnees de gearing sont dans `src/data/gearing.json`. Modifier ce fichier pour mettre a jour les ilvl lors d'un nouveau patch ou saison.

## Deploiement

Site statique deploye sur Vercel. Push sur `main` pour declencher le deploiement.
