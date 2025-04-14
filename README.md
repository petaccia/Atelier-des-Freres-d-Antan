# Atelier Frères d'Antan

Ce projet est structuré en plusieurs parties :

## Frontend

Le dossier `frontend/` contient l'application Next.js qui gère l'interface utilisateur du site web.

### Technologies utilisées

- Next.js
- React
- Tailwind CSS
- Framer Motion
- Swiper

### Installation et développement

```bash
cd frontend
npm install
npm run dev
```

### Déploiement

Le déploiement est géré par Vercel.

```bash
cd frontend
vercel
```

Pour déployer en production :

```bash
cd frontend
vercel --prod
```

## Structure du projet

- `frontend/` : Application Next.js
  - `src/` : Code source de l'application
  - `public/` : Fichiers statiques (images, polices, etc.)
  - Fichiers de configuration (next.config.mjs, tailwind.config.js, etc.)

## Branches Git

- `dev` : Branche de développement principale
- `feat/frontend-structure` : Restructuration du projet avec un dossier frontend dédié
- `cleanup/remove-unused-files` : Suppression des fichiers inutiles après la restructuration
