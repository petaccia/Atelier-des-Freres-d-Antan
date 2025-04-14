#!/bin/bash

# Supprimer les fichiers inutiles
rm -rf src/ public/ .eslintrc.json .prettierignore .prettierrc.json jsconfig.json next.config.mjs postcss.config.mjs tailwind.config.js .next/ node_modules/ .vercel/ package-lock.json package.json

# Créer un commit
git add -A
git commit -m "Remove unused files after restructuring project"

# Fusionner avec la branche dev
git checkout dev
git merge cleanup/remove-unused-files

# Fusionner la branche feat/frontend-structure
git merge feat/frontend-structure

echo "Nettoyage terminé !"
