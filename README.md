# Atelier Frères d'Antan

## Prérequis

- Node.js (version spécifiée dans `.nvmrc`)
- npm (inclus avec Node.js)
- PostgreSQL

## Installation

1. Cloner le projet
```bash
git clone <url-du-projet>
cd atelier-freres-dantan
```

2. Installer les dépendances (frontend et backend)
```bash
npm run install:all
```

3. Configurer les variables d'environnement
- Copier `.env.example` vers `.env` dans le dossier `backend`
- Copier `.env.example` vers `.env.local` dans le dossier `frontend`
- Ajuster les variables selon votre environnement

## Développement

Pour lancer le frontend (Next.js) et le backend (NestJS) simultanément :
```bash
npm run dev
```

Les serveurs seront disponibles sur :
- Frontend : http://localhost:3000
- Backend : http://localhost:5000

Pour lancer les serveurs séparément :
```bash
# Frontend uniquement
npm run dev:frontend

# Backend uniquement
npm run dev:backend
```

## Scripts disponibles

- `npm run install:all` : Installe les dépendances du frontend et du backend
- `npm run dev` : Lance les serveurs de développement (frontend + backend)
- `npm run build` : Build les applications frontend et backend
- `npm run start` : Lance les applications en mode production
- `npm run lint` : Exécute le linting sur les deux projets
- `npm run format` : Formate le code des deux projets

