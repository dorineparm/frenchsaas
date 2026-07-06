# FrenchSaaS Admin2 CMS

Mini CMS sur mesure pour un site statique hébergé sur GitHub + Netlify.

## Ce que contient cette V1

- `/admin2/` : interface d’administration.
- Connexion via Netlify Identity.
- Protection côté Netlify Functions avec rôle `admin`.
- Création, modification et suppression d’articles Markdown dans `content/blog/`.
- Aperçu Markdown en direct.
- Sauvegarde directe dans le dépôt GitHub via l’API GitHub.
- Gestion simple des leads dans `data/leads.json`.
- Gestion simple des idées de contenu dans `data/ideas.json`.
- Page SEO prête pour intégrer Search Console et GA4.

## Installation rapide

1. Dézippe ce pack.
2. Copie tous les dossiers/fichiers à la racine de ton dépôt GitHub existant :
   - `admin2/`
   - `netlify/`
   - `content/`
   - `data/`
   - `netlify.toml`
   - éventuellement `package.json`
3. Commit + push sur GitHub.
4. Attends le redéploiement Netlify.
5. Ouvre `https://ton-domaine.com/admin2/`.

## Configuration Netlify Identity

Dans Netlify :

1. Va dans **Site configuration → Identity**.
2. Active Identity.
3. Mets les inscriptions sur **Invite only**.
4. Invite ton adresse e-mail.
5. Dans l’utilisateur Netlify Identity, ajoute le rôle :

```txt
admin
```

Sans ce rôle, les fonctions refuseront l’accès.

## Configuration GitHub

Crée un token GitHub personnel avec les droits d’écriture sur le dépôt.

Dans Netlify → **Site configuration → Environment variables**, ajoute :

```txt
GITHUB_TOKEN=ton_token_github
GITHUB_OWNER=ton_user_ou_organisation
GITHUB_REPO=nom_du_repo
GITHUB_BRANCH=main
```

Le token reste côté serveur dans les Netlify Functions. Il n’est pas exposé dans le navigateur.

## SEO / Search Console / GA4

La page SEO est prête, mais les vrais appels Google API ne sont pas encore activés dans cette V1. Pour préparer l’intégration, tu pourras ajouter :

```txt
GOOGLE_SERVICE_ACCOUNT_JSON=contenu_json_du_compte_service
GSC_SITE_URL=https://frenchsaas.com/
GA4_PROPERTY_ID=123456789
```

Ensuite, la fonction `netlify/functions/seo.js` pourra être complétée pour appeler les API Google Search Console et Google Analytics Data API.

## Format des articles

Les articles sont stockés dans `content/blog/` en Markdown avec frontmatter :

```md
---
title: "Titre"
slug: "slug"
date: "2026-07-06"
status: "draft"
category: "SaaS"
keywords: "mot-clé 1, mot-clé 2"
metaTitle: "Titre SEO"
metaDescription: "Description SEO"
---

# Contenu
```

## Important

Cette V1 est un socle fonctionnel et propre. Elle n’impose pas de framework lourd et peut être ajoutée à un site statique existant. La prochaine étape logique serait :

- éditeur plus riche ;
- upload d’images ;
- vraie intégration Search Console/GA4 ;
- génération automatique de suggestions à partir des requêtes Google ;
- formulaire de contact relié automatiquement aux leads ;
- publication planifiée.
