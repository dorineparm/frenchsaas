# FrenchSaaS.com — Site Astro + Decap CMS

Site statique professionnel pour FrenchSaaS.com : accueil, Services, About, Contact,
Blog administrable depuis `/admin` (Decap CMS), prêt à déployer sur Netlify.

## Structure du projet

```
frenchsaas/
├── public/
│   ├── admin/
│   │   ├── index.html        ← interface d'administration (/admin)
│   │   └── config.yml        ← configuration Decap CMS
│   ├── images/uploads/       ← images téléversées depuis le CMS
│   ├── favicon.svg
│   └── site.js               ← effets (parallaxe, reveals, toggle EN/FR)
├── src/
│   ├── components/           ← Header, Footer
│   ├── layouts/Base.astro    ← gabarit commun à toutes les pages
│   ├── content/
│   │   ├── config.ts         ← schéma des articles (titre, date, tag…)
│   │   └── blog/             ← LES ARTICLES (fichiers .md) — c'est ici
│   │                            que Decap CMS écrit quand vous publiez
│   ├── pages/
│   │   ├── index.astro       ← accueil
│   │   ├── services.astro
│   │   ├── about.astro
│   │   ├── contact.astro     ← formulaire Netlify Forms
│   │   ├── thanks.astro      ← page « merci » après envoi du formulaire
│   │   └── blog/
│   │       ├── index.astro   ← liste des articles
│   │       └── [slug].astro  ← gabarit d'un article
│   └── styles/global.css     ← identité visuelle (violet #534AB7)
├── astro.config.mjs
├── netlify.toml              ← build préconfiguré pour Netlify
└── package.json
```

## 1. Tester en local (facultatif)

Prérequis : [Node.js](https://nodejs.org) version 18 ou plus.

```bash
npm install
npm run dev
```

Le site est visible sur http://localhost:4321

Pour tester le CMS en local : décommentez `local_backend: true` dans
`public/admin/config.yml`, puis lancez dans deux terminaux :

```bash
npm run cms    # terminal 1 — petit serveur pour le CMS
npm run dev    # terminal 2 — le site
```

→ http://localhost:4321/admin (⚠️ recommentez `local_backend` avant de déployer).

## 2. Mettre le projet sur GitHub

1. Créez un compte sur https://github.com si besoin.
2. Créez un **nouveau dépôt** (bouton « New repository »), nommez-le
   par ex. `frenchsaas`, laissez-le **vide** (pas de README auto).
3. Dans le dossier du projet, lancez :

```bash
git init
git add .
git commit -m "Site FrenchSaaS initial"
git branch -M main
git remote add origin https://github.com/VOTRE-PSEUDO/frenchsaas.git
git push -u origin main
```

## 3. Déployer sur Netlify

1. Créez un compte sur https://app.netlify.com (connexion avec GitHub, c'est le plus simple).
2. Cliquez sur **« Add new site » → « Import an existing project »**.
3. Choisissez **GitHub**, autorisez Netlify, puis sélectionnez le dépôt `frenchsaas`.
4. Netlify détecte Astro automatiquement (grâce à `netlify.toml`) :
   - Build command : `npm run build`
   - Publish directory : `dist`
5. Cliquez sur **« Deploy site »**. Après 1–2 minutes, votre site est en ligne
   sur une URL du type `https://quelque-chose.netlify.app`.

### Brancher le domaine FrenchSaaS.com

Dans Netlify : **Domain management → Add a domain → frenchsaas.com**, puis
suivez les instructions DNS affichées (chez votre registrar, faites pointer
le domaine vers Netlify). Netlify active le HTTPS automatiquement.

## 4. Activer le CMS (/admin) — étape indispensable

Le CMS a besoin de deux services Netlify (gratuits) :

1. Dans votre site Netlify : **Site configuration → Identity → Enable Identity**.
2. Toujours dans Identity : **Registration → Invite only** (pour que
   personne d'autre ne puisse créer un compte).
3. Puis **Services → Git Gateway → Enable Git Gateway**
   (c'est ce qui permet au CMS d'écrire dans votre dépôt GitHub).
4. Onglet **Identity → Invite users** : invitez **votre propre adresse email**.
5. Ouvrez l'email d'invitation, cliquez sur le lien : vous arrivez sur votre
   site, choisissez un mot de passe.

⚠️ Si votre dépôt GitHub utilise la branche `master` au lieu de `main`,
changez `branch: main` dans `public/admin/config.yml`.

## 5. Publier un article ✍️

1. Allez sur `https://votre-site.netlify.app/admin/` (ou frenchsaas.com/admin/).
2. Connectez-vous avec votre email + mot de passe.
3. Cliquez sur **« Articles de blog » → « New Articles de blog »**.
4. Remplissez Titre, Description, Date, Tag, et rédigez le contenu.
5. Cliquez sur **« Publish » → « Publish now »**.

Ce qui se passe ensuite, automatiquement :
- Decap CMS crée un fichier `.md` dans `src/content/blog/` et le pousse sur GitHub ;
- GitHub prévient Netlify, qui reconstruit le site (~1–2 min) ;
- l'article apparaît sur la page **/blog** du site. C'est tout !

## 6. Le formulaire de contact

Le formulaire utilise **Netlify Forms** : aucune configuration nécessaire.
Les messages arrivent dans Netlify → onglet **Forms**. Vous pouvez y activer
une notification par email (**Forms → Form notifications**).

Pensez aussi à remplacer `hello@frenchsaas.com` dans
`src/pages/contact.astro` par votre vraie adresse.

## Personnalisation rapide

- **Couleurs / typographies** : variables en haut de `src/styles/global.css`.
- **Textes des pages** : fichiers dans `src/pages/`.
- **Articles d'exemple** : supprimez les 3 fichiers de `src/content/blog/`
  (ou depuis /admin) quand vous publiez les vôtres.
