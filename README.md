# NeuralTest AI — Autonomous Testing Platform

![NeuralTest AI Screenshot](https://i.imgur.com/your-screenshot.png) <!-- Remplacez par une capture d'écran réelle -->

**NeuralTest AI** est une interface front-end pure (Single Page Application) qui simule une plateforme de test logiciel autonome. Elle met en scène une suite d'agents spécialisés (sécurité, performance, UX) coordonnés par un orchestrateur central pour analyser, tester et valider une application cible.

Ce projet a été restructuré à partir d'un fichier monolithique pour adopter une architecture modulaire, claire et maintenable.

---

## ➤ Fonctionnalités

- **Panneau de Contrôle Orchestrateur** : Définissez la cible (URL ou description) et lancez l'analyse.
- **Modes de Test Multiples** : Choisissez entre des tests `complets`, de `sécurité`, de `performance` ou d'analyse `UX`.
- **Grille d'Agents Spécialisés** : Visualisez le statut (inactif, actif, en réflexion) de chaque agent (Analyseur de Contexte, Manager de Test, Simulateur Utilisateur, etc.).
- **Configuration par Chat** : Interagissez avec chaque agent via une fenêtre de chat modale pour affiner les paramètres de test.
- **Tableau de Bord en Temps Réel** : Suivez en direct la progression des tests avec des métriques clés (requêtes/min, latence, erreurs, couverture) et un flux de logs détaillé.
- **Graphiques Dynamiques** : Observez l'évolution de la couverture des tests (graphique radar) et la répartition des problèmes par sévérité (graphique en barres).
- **Rapports & Insights IA** : Consultez les vulnérabilités et optimisations détectées par les agents, avec des options pour télécharger les détails ou voir des suggestions de correctifs.

---

## ➤ Structure du Projet

Le projet est organisé de manière à séparer clairement la structure (HTML), la présentation (CSS) et la logique (JavaScript). Tous les scripts sont modulaires et importés dans `index.html`.

```
/neuraltest/
│
├── 📂 css/
│   └── 📄 styles.css       # Feuille de style principale
│
├── 📂 js/
│   ├── 📄 state.js          # État global de l'application (variables partagées)
│   ├── 📄 agents.js         # Logique des statuts et logs des agents
│   ├── 📄 charts.js         # Initialisation des graphiques (Chart.js)
│   ├── 📄 chat.js           # Système de chat modal avec les agents
│   ├── 📄 reports.js        # Gestion des rapports et insights
│   ├── 📄 testing.js        # Logique de simulation des tests
│   └── 📄 ui.js             # Gestion de l'UI (navigation, logs, modes, init)
│
├── 📄 index.html           # Fichier HTML principal (structure de la page)
└── 📄 README.md            # Ce fichier
```

---

## ➤ Démarrage Rapide

Ce projet est 100% front-end et ne nécessite pas de build complexe ni de backend. Vous avez seulement besoin d'un serveur web local pour servir les fichiers.

### Prérequis

- Un navigateur web moderne (Chrome, Firefox, Edge).
- [Visual Studio Code](https://code.visualstudio.com/) comme éditeur de code (recommandé).

### Installation & Lancement (avec VS Code)

1.  **Installez l'extension `Live Server`** :
    -   Ouvrez VS Code.
    -   Allez dans l'onglet Extensions (icône carrée sur la barre de gauche).
    -   Cherchez `Live Server` de Ritwick Dey.
    -   Cliquez sur **Installer**.

2.  **Lancez le projet** :
    -   Ouvrez le dossier `neuraltest` dans VS Code.
    -   Faites un clic droit sur le fichier `index.html` dans l'explorateur de fichiers.
    -   Sélectionnez **"Open with Live Server"**.

    ![Open with Live Server](https://i.imgur.com/your-live-server-screenshot.png) <!-- Remplacez par une capture d'écran réelle -->

    Votre navigateur s'ouvrira automatiquement à l'adresse `http://127.0.0.1:5500/index.html` (le port peut varier) et la plateforme sera fonctionnelle.

---

## ➤ Configuration de VS Code (Recommandations)

Pour une expérience de développement optimale, voici quelques extensions VS Code supplémentaires qui vous seront utiles :

| Extension                   | Auteur        | Utilité                                                              |
| --------------------------- | ------------- | -------------------------------------------------------------------- |
| **Live Server**             | Ritwick Dey   | **(Essentiel)** Lance un serveur de développement local avec rechargement à chaud. |
| **Tailwind CSS IntelliSense** | Tailwind Labs | Fournit l'autocomplétion pour les classes utilitaires de Tailwind CSS. |
| **Prettier - Code formatter** | Prettier      | Formate automatiquement votre code pour un style cohérent.            |
| **ESLint**                  | Microsoft     | Analyse le code JavaScript pour trouver et corriger les problèmes.     |

---

## ➤ Dépendances Externes

Ce projet utilise des bibliothèques externes via CDN pour rester léger et simple à lancer :

-   **Tailwind CSS** : Pour le framework CSS utilitaire.
-   **Chart.js** : Pour les graphiques de reporting.
-   **Google Fonts** : Pour les polices `Inter` et `JetBrains Mono`.
