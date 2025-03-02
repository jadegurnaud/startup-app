# Voyco

Ce projet est réalisé dans le cadre de la startup qui se déroule tout au long de l'année.

Voyco est une Progressive web app (PWA) dédiée à la création et au partage de guides de voyage.
Elle permet aux voyageurs de créer des guides de voyage grâce à leurs expériences et de les partager avec la communauté.
Les utilisateurs peuvent également consulter les guides de voyage créés par d'autres utilisateurs et les enregistrer pour les consulter.

## Fonctionnalités actuelles

### Accès sans compte

- Consultation de la page d'accueil avec des guides recommandés

- visualisation des détails d'un guide

### Accès avec compte

- Création d'un guide

- Accès à toutes les fonctionnalités de l'application

## Technologies utilisées

- Frontend : React.js

- PWA : Service workers pour le fonctionnement hors ligne

- Redux: Pour gérer l'état de nos données dans l'application

## Architecture

Le projet suit une architecture en Atomic Design.

## Installation

```bash
# Cloner le projet
git clone https://github.com/jadegurnaud/startup-app.git

# Commande utilisée pour créer le projet
npx create-react-app startup-app --template cra-template-pwa

# Accéder au dossier
cd startup-app

# Installer les dépendances
npm install

# Lancer l'application
npm run start

# Builder l'application pour tester le mode hors ligne
npm run build
serve -s build
```

## Configuration des variables d'environnement

Le projet utilise un fichier `.env` pour stocker les variables d'environnement.
Un fichier .env.example est fourni comme modèle.

Créer un fichier `.env` à la racine du projet et copier le contenu du fichier `.env.example` dans le fichier `.env`.
