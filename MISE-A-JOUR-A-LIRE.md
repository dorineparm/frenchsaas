# Nouvelle version complète du site — comment la mettre en ligne

Ce dossier est votre dépôt COMPLET, à jour, avec vos personnalisations
conservées + les nouveautés (vignettes d'images, encart derniers
articles, site bilingue /fr/).

## Étape 1 — Téléverser (5 min)

1. Sur github.com/dorineparm/frenchsaas, restez à la RACINE du dépôt.
2. **Add file → Upload files**.
3. Ouvrez le dossier décompressé de ce zip et glissez TOUT son contenu
   (les dossiers public, src + les fichiers à la racine) dans la zone
   de dépôt GitHub. L'arborescence est conservée, les fichiers
   existants sont remplacés.
4. **Commit changes** → Netlify redéploie (~2 min).

## Étape 2 — Supprimer 3 fichiers devenus inutiles (3 min)

Le téléversement remplace mais ne supprime pas. Sur GitHub, ouvrez
chacun de ces fichiers → bouton « ⋯ » en haut à droite → Delete file
→ Commit :

1. `frenchsaas-astro.zip` (à la racine) — c'est l'ancien zip du projet,
   committé par erreur : il alourdit le dépôt pour rien.
2. `.github/workflows/webpack.yml` — un « workflow » GitHub ajouté par
   mégarde : il essaie de compiler le site avec Webpack (le mauvais
   outil) et fait échouer une croix rouge à chaque commit. Le site,
   lui, est compilé par Netlify : ce fichier ne sert à rien.
3. `src/pages/teaching.astro` — la page a été RENOMMÉE en
   `teachinglocalization.astro` pour correspondre au lien
   /teachinglocalization/ que vous aviez mis dans le menu (qui pointait
   dans le vide !). L'ancien fichier doit disparaître pour éviter le
   doublon.

## Étape 3 — Vérifier (2 min)

- Le menu « Teaching localization » fonctionne (plus de page 404).
- Le sélecteur EN / FR dans le menu bascule vers la page jumelle.
- frenchsaas.com/fr/ affiche la version française.
- L'accueil montre les 3 derniers articles.
- Dans /admin, chaque article a un champ « Image d'illustration ».

## Ce qui a été conservé de vos modifications

- Votre positionnement « SaaS, tech and games » (accueil EN + FR,
  About, description du site).
- Votre URL /teachinglocalization/ et son libellé de menu.
- Votre configuration DecapBridge (identity_url) dans config.yml.
- Votre article « SEO is not dead » et les autres contenus du blog.
- La police Inter que vous aviez ajoutée reste chargée.

## ⚠️ Un point police à trancher

Dans Base.astro, vous aviez REMPLACÉ « IBM Plex Mono » par « Inter »
dans la ligne Google Fonts. Or la feuille de style demande toujours
IBM Plex Mono pour les petits libellés techniques (menu, boutons,
codes L10N/LQA…) : ils s'affichaient donc dans une police par défaut
du navigateur. J'ai rechargé LES DEUX polices : tout est rentré dans
l'ordre, et Inter reste disponible. Si votre intention était d'utiliser
Inter quelque part (à la place de Poppins ? des libellés ?), dites-le
à Claude qui fera la modification proprement.

## Rappel

Les textes des pages françaises (src/pages/fr/) sont une première
version : relisez-les avec votre œil de professionnelle !
