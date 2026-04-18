# Epolia — maquette front mobile PWA

Maquette **mobile-first** en **React + Vite + Tailwind + React Router** avec configuration **PWA**.

## Ce qui est inclus

- écran d'accueil avec cartes profils mockées
- écran de connexion
- écran de choix de profil à l'inscription
- écran d'inscription **Particulier**
- aperçu du futur parcours **Étudiant** multi-étapes
- profil particulier mocké
- messagerie mockée
- manifest PWA + icônes
- structure propre pour extension dans VS Code / Codex

## Lancer le projet

```bash
cd epolia-maquette
npm install
npm run dev
```

## Stack

- React
- Vite
- Tailwind CSS
- React Router v6
- vite-plugin-pwa

## Structure

```bash
src/
  components/
  contexts/
  data/
  pages/
  App.jsx
  main.jsx
```

## Notes

- tout est mocké
- aucun backend
- aucune API réelle
- design centré sur un viewport mobile max 430px

## Suite logique

1. adapter la direction artistique finale
2. développer le parcours étudiant complet multi-step
3. brancher missions, paiement séquestré, notifications
4. ajouter un vrai store global si la maquette grossit
