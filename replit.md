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
- Chargée via `index.html` : `<link href="https://fonts.googleapis.com/css2?family=Atma:wght@400;500;600;700&display=swap">`
- En CSS inline : `fontFamily: "Atma, sans-serif"` sur les éléments titres

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

### 6.2.1 Port critique — ne jamais modifier

> ⚠️ **Règle absolue : le port de ce site est `22690` et ne doit jamais être changé.**

Ce port a été assigné par Replit lors de la création de l'artifact. Il est câblé dans le système de proxy interne de Replit et c'est le seul port que le système de détection de workflow peut surveiller pour cet artifact.

**Pourquoi les autres ports ne fonctionnent pas ici :**
Dans l'environnement Replit, les outils de détection standard (`ss`, `/proc/net/tcp`) ne voient pas les ports liés par Vite (ex : 3000, 5000, 5173) à cause du namespace réseau. `curl localhost:3000` peut renvoyer HTTP 200, mais le workflow déclare quand même `DIDNT_OPEN_A_PORT` et échoue.

**Ce qui doit rester intact dans `artifacts/franck-nathie/.replit-artifact/artifact.toml` :**
```toml
[[services]]
name = "web"
localPort = 22690

[services.env]
PORT = "22690"
BASE_PATH = "/"
```

Si le workflow `artifacts/franck-nathie: web` est en état `FAILED` avec l'erreur `DIDNT_OPEN_A_PORT`, **vérifier en priorité que `localPort` et `PORT` valent bien `22690`** dans ce fichier `artifact.toml`.

### 6.3 Vérifier que le site tourne
```bash
curl localhost:22690
```

### 6.4 Builder pour la production / générer le ZIP
```bash
# Build CSS/JS
PORT=22690 BASE_PATH=/ pnpm --filter @workspace/franck-nathie build

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
| `/articles/karpman` | → `/coming-soon` | À créer |
| `/articles/soi-moi` | → `/coming-soon` | À créer |
| etc. | → `/coming-soon` | À créer |

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
  "/boutique/therapie-ligne",
  "/boutique/jeu-gai-rire",
  "/boutique/jeu-cartes",
  "/boutique/poster-gai-rire",
  "/boutique/poster-capt",
]);
```

---

## 8. Images — guide complet de placement

> **Information critique** : Les images sont importées directement par leur nom de fichier exact dans le code. Elles **n'ont pas besoin d'être replacées manuellement** — tant que le dossier `attached_assets/` est présent (il l'est via Git LFS), tout se reconstituera automatiquement. Ce guide sert uniquement de référence en cas de problème ou d'image manquante.

### Comment les images sont utilisées dans le code
```tsx
// Exemple dans Hero.tsx
import heroBg from "@assets/franck-background-section-hero-accueil-_1774981141061.jpg";

// Puis dans le JSX :
<img src={heroBg} alt="Franck Nathie" />
```

L'alias `@assets` pointe vers `../../attached_assets` (configuré dans `vite.config.ts`).

### Mapping complet : image → fichier → rôle visuel

#### `Hero.tsx` — Section hero de la page d'accueil
| Fichier image | Rôle |
|---|---|
| `franck-background-section-hero-accueil-_1774981141061.jpg` | Photo de Franck en arrière-plan du hero |

#### `QuiSuisJe.tsx` — Page "Qui suis-je ?"
| Fichier image | Rôle |
|---|---|
| `trombine_franck_rt_1775432409703.jpg` | Portrait de Franck (colonne gauche) |
| `LIONNEL_ET_FRANCK_3_1775432412430.jpg` | Franck et Lionel Santucci |

#### `WhyTherapy.tsx` — Section "Pourquoi une thérapie ?"
| Fichier image | Rôle |
|---|---|
| `les_parts_éxilé_-_l_enfant_onfuse_rg_1774979777268.png` | Illustration de l'enfant blessé |

#### `InnerWound.tsx` — Section "La blessure intérieure"
| Fichier image | Rôle |
|---|---|
| `2_les_blessures_-_Rejet_1774979777263.png` | Illustration blessure Rejet |
| `les_parts_exilé_blessé_-la_violé2_1774979777259.png` | Illustration part blessée |
| `6_les_blessures_-_Humiliation_1774979777264.png` | Illustration blessure Humiliation |

#### `HealingProcess.tsx` — Section "Comment guérir ?"
| Fichier image | Rôle |
|---|---|
| `Les_parts_3_types_porte_textes_remis_dans_l'ordre_1775503205057.jpg` | Schéma des 3 types de parts |
| `@_3_les_parts_exilés_blessés_-_double_BD_1775504573602.png` | Parts exilées (double) |
| `les_parts_déchargés_-_le_nettoyeur_rangeur_1775504625005.png` | Part déchargée : le nettoyeur |
| `unnamed_1775504758913.png` | Illustration processus d'apprentissage |
| `les_parts_déchargés_-Force_fragile_3_1_1775504947580.png` | Part : force fragile |

#### `DPAETherapy.tsx` — Section "La thérapie DPEC"
| Fichier image | Rôle |
|---|---|
| `Le_SOI__1775478214163.png` | Schéma du SOI |
| `Les_part_fuyantes_La_pleureuse_2_1774979777255.png` | Part fuyante : la pleureuse |
| `les_parts_blessée_exilée_La_faible_couleurs_1775431161969.jpg` | Part exilée : la faible |
| `les_parts_déchargés_-_le_sportif_1_1774979777258.png` | Part déchargée : le sportif |
| `Les_parts_libérés_png_1775430316909.png` | Parts libérées |
| `les_parts_déchargés_-_l_humble_1775431264481.png` | Part déchargée : l'humble |
| `Les_parts_-_Déchargés_2_1774979777256.png` | Parts déchargées (schéma 2) |

#### `TransitionIllustration.tsx` — Section de transition
| Fichier image | Rôle |
|---|---|
| `les_parts_déchargés_-_Le_créatif_constructif_rg_rond_1774979777267.png` | Le créatif constructif |

#### `MoiVsSoi.tsx` — Section "Moi vs Soi"
| Fichier image | Rôle |
|---|---|
| `@_Le_MOI__1774979777262.png` | Schéma du MOI |
| `Le_SOI__1775654510532.png` | Schéma du SOI |
| `Le_moi_et_attitude_1775654363666.png` | Le MOI et ses attitudes |
| `Le_soi_et_attitude_1775654378772.png` | Le SOI et ses attitudes |
| `illustration-bébé_1775654741743.png` | Illustration bébé |
| `@_1_BESOINS_1775654787992.png` | Schéma des besoins fondamentaux |
| `les_parts_déchargés_-_la_boussole_interne_1775654811628.png` | La boussole interne |

#### `ArticlesPreview.tsx` — Section aperçu articles (page d'accueil)
| Fichier image | Rôle |
|---|---|
| `2_les_blessures_-_Rejet_1774979777263.png` | Miniature article blessures |
| `3_les_blessures_-_Trahison_1775438236274.png` | Miniature article blessures |
| `6_les_blessures_-_Humiliation_1774979777264.png` | Miniature article blessures |
| `les_parts_exilés_blessés_-_double_1774979777251.png` | Miniature parts |
| `illustration-bébé_1775654741743.png` | Miniature bébé |
| `5d270f42-8428-4ad4-b463-a77c708d9412_1775654492208.png` | Miniature article |
| `@_3_les_parts_exilés_blessés_-_double_BD_1775504573602.png` | Miniature parts BD |

#### `ArticleBlessures.tsx` — Page article "12 blessures existentielles"
| Fichier image | Rôle |
|---|---|
| `2_les_blessures_-_Rejet_1774979777263.png` | Illustration blessure Rejet |
| `3_les_blessures_-_Trahison_1775438236274.png` | Illustration blessure Trahison |
| `4_les_blessures_-_Injustice_1775438282630.png` | Illustration blessure Injustice |
| `6_les_blessures_-_Humiliation_1774979777264.png` | Illustration blessure Humiliation |
| `7_les_blessures_-_Incompréhension_1775438719199.png` | Illustration blessure Incompréhension |
| `unnamed_1775438880888.png` | Illustration blessures existentielles |
| `unnamed_(1)_1775439128995.png` | Illustration croissance |
| `les_parts_exilé_blessé_-la_violé2_1775438408517.png` | Illustration part violée |

### Images présentes dans `attached_assets/` mais non encore utilisées dans le code
Ces images appartiennent à Franck et sont disponibles pour de futures pages :
- `Le_SOI_valeur_(2)_1774979777254.png`
- `le_self_1774979777265.png`, `le_self_3_1774979777253.jpg`
- `richard_schwartz_2_1774979777262.jpg`
- `triangle-karpman_1774979777252.png`, `triangle-karpman_-_Copie_1774979777261.jpg`
- `les_parts_déchargés_-_l_amoureux_libre_1774979777266.png`
- `les_parts_libérés_png_1774979777260.png`
- `Les_parts_libérés_png_1775430316909.png`
- `les_parts_exilés_blessés_-_double_1774979777251.png`
- `franck-background-section-hero-accueil_1774977116005.avif` (version avif du hero, non utilisée)
- `section-hero-page-accueil_*.jpg` (versions alternatives du hero)
- Tous les fichiers `.txt` et `.pdf` → contenu source fourni par Franck pour les textes du site

---

## 9. La Boutique — architecture

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
  pourQui: string[];          // Liste "Ce produit est fait pour vous si..."
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

## 10. Composants de layout

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

## 11. Captures de référence — ce à quoi doit ressembler chaque page

Après avoir reconstitué le projet, prends un screenshot de chaque page et compare avec les images dans `screenshots/`.

| Page | URL | Fichier référence |
|------|-----|------------------|
| Accueil | `/` | `screenshots/page-accueil.jpg` |
| Qui suis-je | `/qui-suis-je` | `screenshots/page-qui-suis-je.jpg` |
| La DPEC c'est quoi | `/dpae` | `screenshots/page-dpec.jpg` |
| Boutique | `/boutique` | `screenshots/page-boutique.jpg` |
| Page produit | `/boutique/stage-guerison` | `screenshots/page-produit.jpg` |
| Article blessures | `/articles/blessures` | `screenshots/page-article-blessures.jpg` |

---

## 12. Erreurs passées à ne pas répéter

1. **Ne pas hardcoder le port** dans `vite.config.ts`. Toujours lire `process.env.PORT`.

2. **Ne jamais mettre d'emojis dans les boutons CTA** ("🛒 Ajouter" → interdit, utiliser "Ajouter au panier").

3. **Ne pas utiliser des backgrounds colorés par catégorie** pour les placeholders d'image produit. Utiliser toujours le fond crème `#f0ede8`.

4. **Ne pas oublier de mettre à jour `LIVE_ROUTES` dans `Navbar.tsx`** quand une nouvelle page est créée, sinon ses liens redirigent vers `/coming-soon`.

5. **Ne pas oublier de mettre à jour les liens du Footer** quand une nouvelle page est créée (`footerLinks` dans `Footer.tsx`).

6. **Ne jamais reformuler le texte de Franck**, même si ça semble "mieux écrit". C'est une règle non négociable.

7. **Toujours régénérer le ZIP** après chaque modification du site.

8. **Le champ `images` dans les produits** est un tableau `string[]` (remplace l'ancien `image: string`). Pour un produit sans image, utiliser `images: []`. Les composants ShopPage et ProductPage lisent `product.images[0]` pour l'image principale, et `product.images` pour la galerie.

9. **Les noms de fichiers `.tsx` et les URLs utilisent `/dpae`** (ancien nom) même si l'acronyme correct est DPEC → ne pas renommer.

10. **Sur la page produit, les CTAs utilisent Tailwind pour les hover** (`hover:bg-[#d05e08]`, `hover:bg-[#E86B0A]`, `hover:text-white`) et non des handlers JS `onMouseEnter`/`onMouseLeave`.

11. **Ne jamais changer le port 22690** dans `artifacts/franck-nathie/.replit-artifact/artifact.toml`. C'est le port unique assigné par Replit à cet artifact. Si on le change (ex : pour 3000 ou 5000), le workflow échoue avec `DIDNT_OPEN_A_PORT` même si Vite démarre correctement — parce que le namespace réseau de Replit ne rend pas ces autres ports visibles au système de détection. Voir section 6.2.1 pour le diagnostic complet.

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

# Pousser vers GitHub
# Le token est stocké dans le secret GITHUB_TOKEN (géré par Replit Secrets)
git push https://Kalicha0:$GITHUB_TOKEN@github.com/Kalicha0/Site-Franck.git main:main
```

---

## 14. Contact du client

- **Nom** : Franck Nathie
- **Email** : Contact@Franck-Nathie.com
- **Téléphones** : 02 43 58 66 41 / 07 88 83 58 53
- **Spécialité** : DPEC — Déprogrammation Psycho-Émotionnelle et Comportementale
- **Méthode associée** : CAPT (Communication Authentique, Profonde et Transformative)
- **Partenaire mentionné** : Lionel Santucci (communication transformative)

---

## 15. Ce qui reste à faire

Les liens suivants redirigent pour l'instant vers `/coming-soon` :
- `/articles/karpman` — Trilogie de Karpman
- `/articles/soi-moi` — Différence entre le soi et le moi
- `/articles/ifs` — L'IFS c'est quoi
- `/articles/parts-blessees` — Les parts blessées
- `/articles/parts-protectrices` — Les parts protectrices
- `/articles/communication` — La communication Transformative

Le seul produit sans image est `jeu-cartes` (jeu de cartes des valeurs existentielles) — pas de page de référence fournie. Toujours `images: []`.

---

## 16. Données produits — état actuel (avril 2026)

Tous les produits (sauf `jeu-cartes`) sont migrés depuis laforetnourriciere.org :

| Slug | Titre (réel) | Prix | Images |
|------|-------------|------|--------|
| `poster-gai-rire` | Poster du jeu Gai-Rire (A2 glacé) | 14,70 € | 2 images (webp, laforetnourriciere.org) |
| `poster-capt` | Poster CAPT méthode | 14,70 € | 1 image + stock "184 en stock" |
| `jeu-gai-rire` | Jeu de Carte \| Gai-rire les blessures de l'être | 64,90 € | 7 images |
| `therapie-ligne` | Thérapie Soi-nier ou Gai-rire | 267 € | 4 images + 7 étapes numérotées |
| `stage-capt` | Communication Authentique Profonde & Transformative | 350–490 € | 7 images + date nov. 2026 |
| `stage-guerison` | Guérison des blessures intérieures | 350–490 € | 7 images + 3 dates 2026 |
| `jeu-cartes` | Jeu de cartes des valeurs existentielles | À partir de 25 € | Aucune (placeholder) |

**Type Product** : `images: string[]`, `etapes?: {num, titre, texte}[]`, `stock?: string`, `dates?: string[]`, `subtitle?: string`.

Les images utilisent les URLs directes de laforetnourriciere.org (pas d'hébergement local).

**ZIP** : Le script `node scripts/capture-html-pages.mjs` nécessite Chromium via Playwright. Si Chromium n'est pas disponible (reset d'environnement), installer via `nix-env -iA nixpkgs.chromium nixpkgs.zip` puis relancer.

---

*Rédigé le 12 avril 2026 — Mis à jour le 13 avril 2026 — projet transféré vers GitHub : `github.com/Kalicha0/Site-Franck`*
