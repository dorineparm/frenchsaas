# FrenchSaaS – Mini espace d’administration

Ce pack ajoute un espace d’administration léger à ton site Netlify/GitHub.

## Ce que contient le pack

- `/admin2/` : interface d’administration type mini WordPress.
- `/admin2/assets/` : CSS et JavaScript de l’admin.
- `/admin2/data/` : données de démonstration pour les articles, leads, SEO et idées de contenu.
- `/content/blog/` : emplacement recommandé pour les articles exportés en Markdown.
- `netlify.toml` : configuration Netlify avec redirection vers l’admin.

## Installation rapide

1. Dézippe le dossier.
2. Copie tous les fichiers à la racine de ton dépôt GitHub.
3. Commit et push sur GitHub.
4. Netlify redéploiera automatiquement ton site.
5. Va sur : `https://ton-domaine.com/admin2/`

## Connexion admin

Cette première version contient une connexion locale de démonstration.

Identifiants par défaut :

- Email : `admin@frenchsaas.com`
- Mot de passe : `ChangeMe123!`

⚠️ Important : cette connexion ne remplace pas une vraie authentification serveur. Elle sert à prototyper ton espace admin et à éviter qu’il soit affiché directement. Pour une vraie protection, utilise Netlify Identity, Auth0, Clerk, Supabase Auth ou une protection par mot de passe côté hébergeur.

## Fonctionnement des articles

Tu peux :

- créer un article ;
- modifier le titre, le slug, l’extrait, la méta-description, les mots-clés et le contenu ;
- voir un aperçu direct ;
- exporter l’article en Markdown.

L’export Markdown peut ensuite être placé dans `/content/blog/`.

## SEO

L’onglet SEO contient :

- les requêtes Google importantes ;
- les pages à optimiser ;
- les problèmes SEO ;
- les opportunités de nouveaux articles.

Pour l’instant, les données viennent de `/admin2/data/seo.json`.
Plus tard, tu pourras remplacer cette source par :

- Google Search Console API ;
- Google Analytics Data API ;
- Plausible ;
- Umami ;
- Fathom.

## Leads

L’onglet Leads lit `/admin2/data/leads.json`.
Pour un vrai formulaire Netlify, ajoute un formulaire de contact avec `data-netlify="true"`, puis consulte les soumissions dans Netlify Forms ou branche une fonction Netlify.

## Prochaines évolutions recommandées

1. Brancher une vraie authentification.
2. Connecter Google Search Console.
3. Connecter Analytics ou Plausible.
4. Créer une fonction Netlify pour sauvegarder les articles directement dans GitHub via l’API GitHub.
5. Ajouter un workflow de brouillon/publication.

