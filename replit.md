# Franck Nathie — Guide complet pour le nouvel agent

> Ce fichier est la référence absolue du projet. Lis-le intégralement avant de toucher quoi que ce soit.

---

## 1. C'est quoi ce projet ?

Un **site web professionnel** pour **Franck Nathie**, thérapeute spécialisé en **DPEC** (Déprogrammation Psycho-Émotionnelle et Comportementale). Le site présente sa méthode, son parcours, ses articles et sa boutique de ressources thérapeutiques (stages, jeux, posters, thérapie en ligne).

Le site est construit en **React + Vite + TypeScript + Tailwind CSS** dans un monorepo pnpm.

---

## 2. Règles ABSOLUES — à ne jamais enfreindre

### 2.1 Le texte de Franck est sacré
- **Ne jamais reformuler, réécrire, paraphraser ou "améliorer" le texte de Franck.**
- Conserver absolument : le style oral, les "???", les "☺", les "Haaaa", les tournures informelles, les répétitions intentionnelles.
- Corriger **uniquement** les fautes d'orthographe/grammaire flagrantes, rien d'autre.
- Si Franck écrit "j'ai fais" ou "tu va" → corriger. Si Franck écrit une phrase étrange mais intentionnelle → laisser.

### 2.2 Toujours prendre une capture d'écran après chaque modification
- Après chaque changement visuel, prendre un screenshot de la page modifiée.
- Comparer avec les captures de référence (dossier `screenshots/`) pour vérifier qu'on n'a rien cassé.

### 2.3 Toujours régénérer le ZIP après chaque modification du site
- Commande : `node scripts/capture-html-pages.mjs`
- Ce script génère des pages HTML statiques + un ZIP téléchargeable.
- Le ZIP se trouve dans `artifacts/franck-nathie/public/franck-nathie-pages.zip`
- **Ne jamais livrer sans avoir régénéré le ZIP.**

### 2.4 DPEC vs DPAE
- L'acronyme correct est **DPEC** (Déprogrammation Psycho-Émotionnelle et Comportementale).
- Les noms de fichiers `.tsx` et les URL utilisent encore `/dpae` (ancien nom) → **ne pas renommer** pour éviter les régressions de routing.

---

## 3. Stack technique

| Outil | Version | Rôle |
|-------|---------|------|
| pnpm workspaces | — | Monorepo |
| Node.js | 24 | Runtime |
| React | 18 | UI |
| Vite | 5 | Dev server + build |
| TypeScript | 5.9 | Typage |
| Tailwind CSS | 3 | Styles |
| Wouter | 3 | Routing côté client |
| Lucide React | — | Icônes |

---

## 4. Structure du projet

```
workspace/
├── artifacts/
│   ├── franck-nathie/          ← LE SITE (tout le travail est ici)
│   │   ├── src/
│   │   │   ├── App.tsx                  ← Routes principales
│   │   │   ├── main.tsx                 ← Point d'entrée React
│   │   │   ├── components/
│   │   │   │   ├── layout/
│   │   │   │   │   ├── Navbar.tsx       ← Header + menu déroulant + mobile
│   │   │   │   │   ├── Footer.tsx       ← Footer + newsletter
│   │   │   │   │   └── TopBar.tsx       ← Barre orange en haut (tél + email)
│   │   │   │   └── sections/            ← Sections de la page d'accueil
│   │   │   │       ├── Hero.tsx         ← Section hero avec photo Franck
│   │   │   │       ├── WhyTherapy.tsx
│   │   │   │       ├── InnerWound.tsx
│   │   │   │       ├── HealingProcess.tsx
│   │   │   │       ├── DPAETherapy.tsx
│   │   │   │       ├── MoiVsSoi.tsx
│   │   │   │       ├── TransitionIllustration.tsx
│   │   │   │       └── ArticlesPreview.tsx
│   │   │   ├── pages/
│   │   │   │   ├── Home.tsx             ← Page d'accueil (assemblage des sections)
│   │   │   │   ├── QuiSuisJe.tsx        ← Page "Qui suis-je ?"
│   │   │   │   ├── DPAEPage.tsx         ← Page "La DPEC c'est quoi ?"
│   │   │   │   ├── ArticleBlessures.tsx ← Article "12 blessures existentielles"
│   │   │   │   ├── ShopPage.tsx         ← Page Boutique (listing produits)
│   │   │   │   ├── ProductPage.tsx      ← Page produit individuel
│   │   │   │   ├── ComingSoon.tsx       ← Page "bientôt disponible"
│   │   │   │   └── not-found.tsx        ← Page 404
│   │   │   └── data/
│   │   │       ├── products.ts          ← Données des 7 produits de la boutique
│   │   │       └── woocommerce-snippets.md ← CSS WordPress/WooCommerce équivalent
│   │   ├── public/
│   │   │   └── franck-nathie-pages.zip  ← ZIP des pages HTML statiques (généré)
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   └── api-server/                      ← Serveur Express (pas utilisé pour le site)
├── attached_assets/                     ← Toutes les images fournies par Franck
├── scripts/
│   ├── capture-html-pages.mjs           ← Génère les HTML statiques + ZIP
│   └── post-merge.sh
└── screenshots/                         ← Captures de référence de chaque page
    ├── page-accueil.jpg
    ├── page-qui-suis-je.jpg
    ├── page-dpec.jpg
    ├── page-boutique.jpg
    ├── page-produit.jpg
    └── page-article-blessures.jpg
```

---

## 5. Design system — couleurs, typographie, espacements

### Couleurs
| Nom | Valeur | Usage |
|-----|--------|-------|
| Orange principal | `#E86B0A` | CTAs, badges, accents, soulignements |
| Orange foncé (hover) | `#d05e08` | Hover sur boutons orange |
| Crème | `#f0ede8` | Fond des placeholders d'image, sections neutres |
| Gris foncé | `#1e2a3a` | Titres principaux |
| Gris moyen | `#4b5563` | Texte courant |
| Blanc | `#ffffff` | Fonds de sections, cartes |
| Gris très clair | `#f9fafb` | Fonds alternés |

### Typographie
- **Police principale** : `Atma` (Google Fonts) — utilisée pour tous les titres et le logo
- **Police texte** : système (sans-serif par défaut de Tailwind)
- Charger via `index.html` : `<link href="https://fonts.googleapis.com/css2?family=Atma:wght@400;500;600;700&display=swap">`
- En CSS : `fontFamily: "Atma, sans-serif"` (inline sur les éléments titres)

### Alias Vite pour les images
```typescript
// vite.config.ts
resolve: {
  alias: {
    "@assets": "../../attached_assets",
    "@": "./src"
  }
}
```
Pour importer une image : `import monImage from "@assets/nom-du-fichier.png"`

---

## 6. Comment démarrer le projet (depuis zéro)

### 6.1 Installer les dépendances
```bash
pnpm install
```

### 6.2 Lancer le dev server
Le workflow `artifacts/franck-nathie: web` doit être actif. Il exécute :
```bash
pnpm --filter @workspace/franck-nathie run dev
```
Le port est assigné automatiquement via la variable d'environnement `PORT`. **Ne jamais hardcoder un port dans vite.config.ts.**

### 6.3 Vérifier que le site tourne
```bash
curl localhost:$PORT
```

### 6.4 Builder pour la production / générer le ZIP
```bash
# Build CSS/JS
PORT=22690 BASE_PATH=/franck-nathie pnpm --filter @workspace/franck-nathie build

# Générer les HTML statiques + ZIP
node scripts/capture-html-pages.mjs
```

### 6.5 Si Chromium ou zip ne sont pas disponibles (après reset d'environnement)
```bash
nix-env -iA nixpkgs.chromium nixpkgs.zip
```

---

## 7. Routing — pages existantes et routes actives

Le routing est géré par **Wouter** dans `App.tsx`.

| URL | Composant | Statut |
|-----|-----------|--------|
| `/` | `Home.tsx` | ✅ Live |
| `/qui-suis-je` | `QuiSuisJe.tsx` | ✅ Live |
| `/dpae` | `DPAEPage.tsx` | ✅ Live (URL garde l'ancien nom) |
| `/articles/blessures` | `ArticleBlessures.tsx` | ✅ Live |
| `/boutique` | `ShopPage.tsx` | ✅ Live |
| `/boutique/:sub` | `ProductPage.tsx` | ✅ Live |
| `/coming-soon` | `ComingSoon.tsx` | ✅ Placeholder |
| `/articles/karpman` | → `/coming-soon` | 🔜 À créer |
| `/articles/soi-moi` | → `/coming-soon` | 🔜 À créer |
| etc. | → `/coming-soon` | 🔜 À créer |

### Routes actives dans le Navbar (LIVE_ROUTES)
Dans `Navbar.tsx`, la constante `LIVE_ROUTES` liste toutes les routes "vivantes". Les liens dropdown qui ne sont PAS dans cette liste redirigent vers `/coming-soon`. Mettre à jour cette liste quand une nouvelle page est créée.

```typescript
const LIVE_ROUTES = new Set([
  "/articles/blessures",
  "/qui-suis-je",
  "/dpae",
  "/boutique",
  "/boutique/stage-guerison",
  "/boutique/stage-capt",
  // ... etc
]);
```

---

## 8. La Boutique — architecture

### Fichier de données : `src/data/products.ts`

Contient un tableau `PRODUCTS` avec 7 produits. Chaque produit a la structure :

```typescript
type Product = {
  slug: string;               // URL-friendly, ex: "stage-guerison"
  titre: string;              // Titre affiché
  categorie: "stages" | "therapie" | "jeux" | "posters";
  categorieLabel: string;     // Label affiché ex: "Stage"
  prix: string;               // Texte affiché, ex: "Sur devis" ou "À partir de 35 €"
  prixNum: number;            // Nombre pour le tri (0 si sur devis)
  image: string;              // URL de l'image (vide "" si pas encore d'image)
  descriptionCourte: string;  // 1-2 phrases
  descriptionLongue: string[];// Plusieurs paragraphes
  pourQui: string[];          // Liste de bullet points "Ce produit est fait pour vous si..."
  produitsSimilaires: string[];// Slugs des produits liés
};
```

Les 7 slugs : `stage-guerison`, `stage-capt`, `therapie-ligne`, `jeu-gai-rire`, `jeu-cartes`, `poster-gai-rire`, `poster-capt`

### Page listing : `ShopPage.tsx`
- Hero crème `#f0ede8` avec titre
- Pills de filtrage par catégorie
- Grille 3 colonnes desktop, 2 tablette, 1 mobile
- Bande de réassurance en bas (paiement sécurisé, livraison, retours)
- Placeholder image = fond crème `#f0ede8` avec texte "Image à venir"

### Page produit : `ProductPage.tsx`
- Breadcrumb : Accueil > Boutique > Nom produit
- Layout 2 colonnes (image à gauche, infos à droite) sur desktop
- Badge catégorie orange, étoiles, prix en orange, description courte
- 2 CTAs : "Ajouter au panier" (plein orange) + "Contacter Franck" (outline orange) → les deux ouvrent `mailto:Contact@Franck-Nathie.com`
- Onglets animés (Description / Pour qui ? / Avis) avec indicateur coulissant
- Section "Vous aimerez aussi" avec les produits similaires

---

## 9. Composants de layout

### TopBar (`TopBar.tsx`)
Barre orange tout en haut. Contient :
- Téléphones : `02 43 58 66 41 / 07 88 83 58 53`
- Email : `Contact@Franck-Nathie.com`

### Navbar (`Navbar.tsx`)
- Sticky (reste en haut au scroll)
- Logo "Franck Nathie" (police Atma, lie vers `/`)
- Liens desktop avec dropdown pour "Boutique" et "Article"
- Menu hamburger mobile (breakpoint `lg`)
- Bouton CTA "Prendre contact" → `mailto:Contact@Franck-Nathie.com`

### Footer (`Footer.tsx`)
- Bande newsletter (email + bouton "S'inscrire" + checkbox consentement)
- 3 colonnes : Brand / Navigation / Contact
- Liens navigation : Accueil, Qui suis-je, La DPEC c'est quoi, Boutique, Article
- Email et téléphones de contact

---

## 10. Captures de référence — ce à quoi doit ressembler chaque page

Après avoir reconstitué le projet, prends un screenshot de chaque page et compare avec les images dans `screenshots/`. Les pages doivent correspondre visuellement.

### Page d'accueil (`/`)
- **Fichier référence** : `screenshots/page-accueil.jpg`
- TopBar orange en haut avec tél + email
- Navbar blanche avec logo "Franck Nathie" et liens de navigation
- Hero : photo de Franck en fond, titre "Déprogrammation Psycho-Émotionnelle et Comportementale" avec D/P/C en orange, sous-titre "Retrouvez la liberté d'être vous-même"
- Boutons : "Découvrir la thérapie DPEC" (orange) + "Prendre contact" (transparent bordé)
- Puis plusieurs sections qui se succèdent (WhyTherapy, InnerWound, HealingProcess, etc.)

### Page "Qui suis-je ?" (`/qui-suis-je`)
- **Fichier référence** : `screenshots/page-qui-suis-je.jpg`
- Hero orange avec titre "Qui suis-je ?"
- Layout 2 colonnes : photo de Franck à gauche, texte biographique à droite
- Texte de Franck tel quel, non reformulé

### Page "La DPEC c'est quoi ?" (`/dpae`)
- **Fichier référence** : `screenshots/page-dpec.jpg`
- Hero orange avec titre "La DPEC, c'est quoi ?"
- Sections expliquant l'origine, les composantes, la méthode

### Page Boutique (`/boutique`)
- **Fichier référence** : `screenshots/page-boutique.jpg`
- Hero crème `#f0ede8` avec badge "NOS RESSOURCES THÉRAPEUTIQUES" et titre "La Boutique"
- Pills de filtre : Tous / Stages / Thérapie / Jeux / Posters
- Grille de cartes produit avec fond crème pour les images, badges orange pour les catégories

### Page produit (`/boutique/stage-guerison` par exemple)
- **Fichier référence** : `screenshots/page-produit.jpg`
- Breadcrumb orange
- Image placeholder crème avec "IMAGE À VENIR"
- Badge catégorie, titre, étoiles, prix en orange
- Boutons sans emoji : "Ajouter au panier" et "Contacter Franck"
- Onglets avec indicateur coulissant orange

### Article "12 blessures" (`/articles/blessures`)
- **Fichier référence** : `screenshots/page-article-blessures.jpg`
- Hero orange avec titre "Les 12 blessures existentielles"
- Contenu riche avec images illustrant les blessures

---

## 11. Images et assets

### Où sont les images
Toutes les images fournies par Franck sont dans `attached_assets/`. Elles sont trackées via **Git LFS**.

### Comment utiliser une image dans le code
```tsx
import monImage from "@assets/nom-exact-du-fichier.png";
// puis dans le JSX :
<img src={monImage} alt="description" />
```

### Images clés connues
- `franck-background-section-hero-accueil-_1774981141061.jpg` → Photo hero page d'accueil
- `trombine_franck_rt_1775432409703.jpg` → Portrait Franck (page Qui suis-je)
- `LIONNEL_ET_FRANCK_3_1775432412430.jpg` → Franck et Lionel Santucci
- `triangle-karpman_1774979777252.png` → Triangle de Karpman (article)
- Les images `les_blessures_*` → Illustrations des blessures existentielles
- Les images `les_parts_*` → Schémas des "parts" (Moi/Soi)

---

## 12. Erreurs passées à ne pas répéter

1. **Ne pas hardcoder le port** dans `vite.config.ts`. Toujours lire `process.env.PORT`.

2. **Ne jamais mettre d'emojis dans les boutons CTA** ("🛒 Ajouter" → interdit, utiliser "Ajouter au panier").

3. **Ne pas utiliser des backgrounds colorés par catégorie** pour les placeholders d'image produit. Utiliser toujours le fond crème `#f0ede8`.

4. **Ne pas oublier de mettre à jour `LIVE_ROUTES` dans Navbar.tsx** quand une nouvelle page est créée, sinon ses liens redirigent vers `/coming-soon`.

5. **Ne pas oublier de mettre à jour les liens du Footer** quand une nouvelle page est créée (`footerLinks` dans `Footer.tsx`).

6. **Ne jamais reformuler le texte de Franck**, même si ça semble "mieux écrit". C'est une règle non négociable.

7. **Toujours régénérer le ZIP** après chaque modification du site (sinon le ZIP téléchargeable est obsolète).

8. **Le champ `image` dans les produits** doit exister sur tous les produits (même vide `""`). Sans ce champ, TypeScript rejette le build.

9. **Les noms de fichiers `.tsx` et les URLs utilisent `/dpae`** (ancien nom) même si l'acronyme correct est DPEC → ne pas renommer.

10. **Sur la page produit, les CTAs utilisent Tailwind pour les hover** (`hover:bg-[#d05e08]`, `hover:bg-[#E86B0A]`, `hover:text-white`) et non des handlers JS `onMouseEnter`/`onMouseLeave`.

---

## 13. Commandes utiles

```bash
# Lancer le site en développement
pnpm --filter @workspace/franck-nathie run dev

# Builder le site
PORT=22690 BASE_PATH=/franck-nathie pnpm --filter @workspace/franck-nathie build

# Générer les HTML statiques + ZIP
node scripts/capture-html-pages.mjs

# Installer chromium et zip si absents (après reset environnement)
nix-env -iA nixpkgs.chromium nixpkgs.zip

# Pousser vers GitHub (token nécessaire)
git push https://USERNAME:TOKEN@github.com/Kalicha0/Site-Franck.git HEAD:main
```

---

## 14. Monorepo — informations générales

```text
workspace/
├── artifacts/              ← Applications déployables
│   ├── franck-nathie/      ← LE SITE
│   └── api-server/         ← Serveur Express (pas utilisé pour le site front)
├── lib/                    ← Librairies partagées (API, DB, etc.)
├── scripts/                ← Scripts utilitaires
└── pnpm-workspace.yaml
```

Chaque package a son propre `package.json`. Les dépendances inter-packages sont gérées par pnpm workspaces. Ne jamais installer des dépendances à la racine sans raison — toujours dans le package concerné :
```bash
pnpm --filter @workspace/franck-nathie add nom-du-package
```

---

## 15. Contact du client

- **Nom** : Franck Nathie
- **Email** : Contact@Franck-Nathie.com
- **Téléphones** : 02 43 58 66 41 / 07 88 83 58 53
- **Spécialité** : DPEC — Déprogrammation Psycho-Émotionnelle et Comportementale
- **Méthode associée** : CAPT (Communication Authentique, Profonde et Transformative)
- **Partenaire mentionné** : Lionel Santucci (communication transformative)

---

## 16. Ce qui reste à faire (pages non encore créées)

Les liens suivants redirigent pour l'instant vers `/coming-soon` :
- `/articles/karpman` — Trilogie de Karpman
- `/articles/soi-moi` — Différence entre le soi et le moi
- `/articles/ifs` — L'IFS c'est quoi
- `/articles/parts-blessees` — Les parts blessées
- `/articles/parts-protectrices` — Les parts protectrices
- `/articles/communication` — La communication Transformative

La boutique est fonctionnelle mais les images produit (`image: ""`) sont encore vides — Franck doit fournir les photos de ses produits.

---

*Ce fichier a été rédigé le 12 avril 2026 pour permettre la continuité du projet sur un nouveau compte Replit.*
