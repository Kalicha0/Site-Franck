export type Product = {
  slug: string;
  titre: string;
  subtitle?: string;
  categorie: "stages" | "therapie" | "jeux" | "posters";
  categorieLabel: string;
  prix: string;
  prixNum: number;
  images: string[];
  stock?: string;
  dates?: string[];
  descriptionCourte: string;
  descriptionLongue: string[];
  etapes?: { num: number; titre: string; texte: string }[];
  pourQui: string[];
  produitsSimilaires: string[];
};

export const products: Product[] = [
  {
    slug: "stage-guerison",
    titre: "Guérison des blessures intérieures",
    subtitle: "Découvrir les besoins fondamentaux et guérir nos blessures intérieures pour changer notre vie",
    categorie: "stages",
    categorieLabel: "Stage",
    prix: "350 € – 490 €",
    prixNum: 350,
    images: [
      "https://laforetnourriciere.org/wp-content/uploads/2019/07/P1210349-scaled.jpg",
      "https://laforetnourriciere.org/wp-content/uploads/2023/07/Copie-de-GENTIL-SAUVEUR-MECHANT-scaled.jpg",
      "https://laforetnourriciere.org/wp-content/uploads/2023/07/Copie-de-SynergieM1_bd.png",
      "https://laforetnourriciere.org/wp-content/uploads/2023/07/P1200963-scaled.jpg",
      "https://laforetnourriciere.org/wp-content/uploads/2023/07/P1210478-rt.jpg",
      "https://laforetnourriciere.org/wp-content/uploads/2023/07/PH-Frossais4074-1-scaled.jpg",
      "https://laforetnourriciere.org/wp-content/uploads/2023/07/SYNERGIE-M1-2022-scaled.jpg",
    ],
    dates: [
      "Du 20 au 22 mars 2026",
      "Du 26 au 28 juin 2026",
      "Du 02 au 04 octobre 2026",
    ],
    descriptionCourte:
      "La permaculture humaine, se changer pour changer le monde. Une immersion dans notre chrysalide pour observer le magnifique papillon qui en sort quand on accueille la chenille sans la juger !",
    descriptionLongue: [
      "Le processus Synergie dans les Rapports Humains, de l'individu au groupe a été créé pour accompagner sur le plan humain les individus et les collectifs dans leurs projets d'écolieux ou leurs projets de vie.",
      "Se connaitre dans son essence pour se respecter soi et l'autre. Toucher et guérir nos blessures intérieures qui conditionnent nos personnalités (l'égo) pour enfin se libérer de nos limites. C'est la relation maladroite qui nous a blessé, c'est la relation bienveillante qui nous guérit. Vous ne serez plus le (la) même après ces 3 jours !",
      "Trois jours pour utiliser le jeu Gai-rire en groupe, apprendre à identifier facilement tes besoins et tes blessures grâce à tes sentiments et changer tes habitudes pour entrer dans le 1er jour du reste de ta vie. Il y aura un avant et un après ce stage !",
    ],
    pourQui: [
      "Tu es souvent soumis et trop gentil et tu en as marre des gens qui exagèrent et profitent de ta gentillesse",
      "Tu es colérique et agressif et tu en as marre de blesser les autres, que l'on te juge et que l'on te rejette",
      "Tu es désorganisé et tu procrastines et ne fais jamais ce qui est important pour toi",
      "Tu oscilles entre le surmenage et un ennui profond dès que tu n'es pas surmené",
      "Tu te poses la question de quel est le sens de ta vie",
      "Tu as déjà fait des thérapies, mais rien n'a vraiment changé",
      "Tu aimerais bien comprendre les besoins vitaux qui t'animent inconsciemment et pourquoi tu n'arrives pas à les combler",
    ],
    produitsSimilaires: ["stage-capt", "therapie-ligne", "jeu-gai-rire"],
  },
  {
    slug: "stage-capt",
    titre: "Communication Authentique Profonde & Transformative",
    subtitle: "Savoir communiquer avec authenticité, profondeur pour transformer nos vies et nos relations",
    categorie: "stages",
    categorieLabel: "Stage",
    prix: "350 € – 490 €",
    prixNum: 350,
    images: [
      "https://laforetnourriciere.org/wp-content/uploads/2019/07/DSCN6421RT-Copie-scaled.jpg",
      "https://laforetnourriciere.org/wp-content/uploads/2023/07/ecoute-empatique-brigitte-1.jpg",
      "https://laforetnourriciere.org/wp-content/uploads/2023/07/P1200963-scaled.jpg",
      "https://laforetnourriciere.org/wp-content/uploads/2023/07/ecoute-empatique-jimy.jpg",
      "https://laforetnourriciere.org/wp-content/uploads/2023/07/A-2-bis-DSCN4627-scaled.jpg",
      "https://laforetnourriciere.org/wp-content/uploads/2023/07/IMG_6789-scaled.jpg",
      "https://laforetnourriciere.org/wp-content/uploads/2023/07/Copie-de-GENTIL-SAUVEUR-MECHANT-scaled.jpg",
    ],
    dates: ["Du 06 au 08 novembre 2026"],
    descriptionCourte:
      "Savoir communiquer avec authenticité, savoir mettre ses limites et respecter celles des autres permet d'entrer en synergie avec son entourage, dans son couple, dans sa famille, en association en milieu professionnel, etc.",
    descriptionLongue: [
      "C'est l'objet du stage « Comment communiquer avec authenticité et profondeur : changer son mode de communication » pour devenir vrai, savoir dire les choses avec authenticité et respect.",
      "« J'ai du mal à m'exprimer, à dire mes besoins clairement, à la place je me tais ou je me met tout le temps en colère, je me juge, je juge les autres, je me soumet à leur attac sans pouvoir me défendre, je boude, je me sent impuissant à changer les choses, tant en moi qu'a l'extérieur »",
      "« J'ai peur de perdre mon identité au sein d'un groupe, de ne pas trouver ma place ou d'être jugé, enfermé dans une posture (Gentil, méchant, trop ceci, pas assez cela etc…) »",
      "Trois jours pour utiliser la méthode CAPT individuellement et en groupe, apprendre à exprimer tes besoins et changer tes habitudes. Il y aura un avant et un après ce stage !",
    ],
    pourQui: [
      "Tu aimerais pouvoir être toi, mais ça gêne toujours quelqu'un autour de toi",
      "Tu es souvent soumis et trop gentil et tu en as marre d'être aux services des autres",
      "Tu es colérique et agressif et tu en as marre de blesser les autres sans que ça change réellement les choses au final",
      "Tu es tiraillé entre l'envie de dire ce que tu penses et la peur de blesser ou de briser tes relations",
      "Tu aimerais bien changer ta vie, ton comportement et la qualité de tes relations en quelques jours, mais tu n'y crois plus",
      "Tu as déjà fait des stages de communication non violente, de PNL etc, mais rien n'a vraiment changé après",
    ],
    produitsSimilaires: ["stage-guerison", "jeu-cartes", "poster-capt"],
  },
  {
    slug: "therapie-ligne",
    titre: "Thérapie Soi-nier ou Gai-rire",
    categorie: "therapie",
    categorieLabel: "Thérapie",
    prix: "267 €",
    prixNum: 267,
    images: [
      "https://laforetnourriciere.org/wp-content/uploads/2023/02/couverture-notice-gai-rire-VISUEL-SITE-BD-jpg.webp",
      "https://laforetnourriciere.org/wp-content/uploads/2023/02/couverture-notice-gai-rire-BD-jpg.webp",
      "https://laforetnourriciere.org/wp-content/uploads/2023/02/Les-blessures-12-blessure-a4-paysage-jpeg-bd-jpg.webp",
      "https://laforetnourriciere.org/wp-content/uploads/2023/02/triangle-karpman.png",
    ],
    descriptionCourte:
      "La Thérapie « Soi-Nier ou Gai-Rire », créée en partant de 24 années d'expérience thérapeutique et faisant la synthèse de plusieurs méthodes, elle a pour mission d'accompagner une transformation profonde en passant par plusieurs étapes.",
    descriptionLongue: [
      "La Thérapie « Soi-Nier ou Gai-Rire », créée en partant de 24 années d'expérience thérapeutique et faisant la synthèse de plusieurs méthodes, elle a pour mission d'accompagner une transformation profonde en passant par plusieurs étapes.",
      "Le but sincère de cet outil thérapeutique est simple : Libérer les fardeaux de vos parts, retrouver la liberté d'être, faire que les personnes qui traversent ce processus puissent sentir qu'il y a eu « un avant et un après la thérapie Gai-rire ».",
    ],
    etapes: [
      {
        num: 1,
        titre: "Développer le SOI, la conscience pour observer le MOI",
        texte:
          "Il s'agit d'apprendre à observer avec bienveillance les différentes parts de moi qui s'opposent et les besoins fondamentaux qu'elles protègent. On passe alors du mode : « Je suis comme ça, je veux ça… » au mode : « Une part de moi ressent cela… Une part de moi voudrait que… » Ce changement de posture ouvre déjà un changement majeur, la compassion envers soi-même et la conscience de notre complexité.",
      },
      {
        num: 2,
        titre: "Libérer les tensions et les émotions bloquées",
        texte:
          "De nombreuses souffrances restent enfermées dans le corps sous forme de tensions, d'émotions. Cette thérapie permet de libérer ces tensions restées bloquées dans la chair et les émotions qui leur sont associées.",
      },
      {
        num: 3,
        titre: "Transformer les croyances limitantes",
        texte:
          "Les parts blessées et les parts protectrices fonctionnent souvent avec des croyances construites à un âge très jeune. Ces croyances appartiennent parfois à l'enfant ou à l'adolescent que nous avons été, et elles continuent d'influencer notre vie d'adulte.",
      },
      {
        num: 4,
        titre: "Créer de nouvelles expériences",
        texte:
          "La guérison ne passe pas seulement par la libération des émotions et le changement des croyances. Elle passe aussi par l'expérimentation de nouveaux comportements qui incarnent le changement en nous.",
      },
      {
        num: 5,
        titre: "Redonner au SOI le rôle de médiateur",
        texte:
          "Chacune de nos parts défend des besoins fondamentaux (la santé, la douceur, la sécurité matérielle, affective, le sens, la justice, l'évolution etc). Le Soi va petit à petit prendre la place de ce médiateur et transformer le conflit intérieur en dialogue et en évolution.",
      },
      {
        num: 6,
        titre: "Retrouver l'estime de soi",
        texte:
          "Au fil du processus, quelque chose se transforme profondément. La personne commence à se réconcilier avec elle-même, à avoir de la compassion et du respect pour ses parts aussi maladroites soient-elles.",
      },
      {
        num: 7,
        titre: "Grandir et évoluer",
        texte:
          "Quand nos parts nous limitent, notre évolution se bloque, et ce sont souvent les déséquilibres et les problèmes qui prennent le dessus. La guérison des blessures pourrait se résumer ainsi : « aider nos parts à grandir et à évoluer ». Lorsque nous accompagnons nos parts dans cette croissance, c'est toute notre évolution qui redémarre. On se sent plus vivant, et un sentiment de liberté accompagne ce changement de paradigme.",
      },
    ],
    pourQui: [
      "Toute personne ne pouvant pas se déplacer facilement pour des séances en présentiel",
      "Ceux qui souhaitent progresser à leur rythme depuis leur domicile",
      "Les personnes souhaitant expérimenter la thérapie DPEC avant de rejoindre un stage",
      "Toute personne traversant une période difficile et cherchant un soutien professionnel",
      "Ceux qui ont déjà suivi des séances avec Franck et souhaitent continuer à distance",
    ],
    produitsSimilaires: ["stage-guerison", "jeu-gai-rire", "jeu-cartes"],
  },
  {
    slug: "jeu-gai-rire",
    titre: "Jeu de Carte | Gai-rire les blessures de l'être",
    categorie: "jeux",
    categorieLabel: "Jeu",
    prix: "64,90 €",
    prixNum: 64.9,
    images: [
      "https://laforetnourriciere.org/wp-content/uploads/2023/02/Cartes-Jeu-Gai-rire-Blessures-blesses-soumises-fuyantes-controlante-et-libre-11-10177-jpg.webp",
      "https://laforetnourriciere.org/wp-content/uploads/2023/02/couverture-notice-gai-rire-VISUEL-SITE-BD-jpg.webp",
      "https://laforetnourriciere.org/wp-content/uploads/2023/02/couverture-notice-gai-rire-BD-jpg.webp",
      "https://laforetnourriciere.org/wp-content/uploads/2023/02/jeu-guerir-boite-rt-bd-jpg.webp",
      "https://laforetnourriciere.org/wp-content/uploads/2023/02/Visuel-presentation-Jeu-Gai-Rire-BD-jpg.webp",
      "https://laforetnourriciere.org/wp-content/uploads/2023/02/Les-blessures-12-blessure-a4-paysage-jpeg-bd-jpg.webp",
      "https://laforetnourriciere.org/wp-content/uploads/2023/02/Les-parts-3-types-porte-textes-BD.png",
    ],
    descriptionCourte:
      "Avec ce jeu 166 cartes et son manuel de 122 pages d'exercices, guérissez vos blessures intérieures, transformez votre vie, votre vision de vous-même et du monde qui vous entoure…",
    descriptionLongue: [
      "T'arrive-t-il de te mettre en colère et de t'en vouloir juste après et/ou de ne rien dire alors que l'autre exagère afin de ne pas faire de vagues et de t'en vouloir de n'avoir rien dit ? Et après ça de te ruer sur du chocolat ou de la nourriture et de t'en vouloir encore pour avoir craqué ? De tenter des psychothérapies, la pensée positive, des méditations, des retraites, du chamanisme etc et de sentir que tu reviens à la même place et que rien ne change.",
      "Notre personnalité se compose de différentes parts qui chacune à leur manière tente de combler nos besoins fondamentaux (physiologique, santé, sécurité matérielle, relation et lien, estime de soi, accomplissement, douceur, paix, etc) et en fonction dont ces besoins ont été comblés ou négligés dans notre enfance, ces parts de nous prennent des rôles extrêmes et nous contrôlent pour notre survie. Comme dans une famille en conflit, elles ne s'entendent pas et génèrent un conflit intérieur et un malêtre profond auquel on s'identifie et que l'on appelle « Moi », l'Ego en grec. Alors qu'en fait, ce « Moi » est un « Nous », dont chaque partie est comme un enfant maladroit qui ne nous veut que du bien, mais fait autant de mal que de bien…",
      "« N'as-tu pas rêvé de changer tes habitudes négatives, d'être enfin ton meilleur ami et d'être en paix avec tous les bouts de toi qui s'affrontent et te contrôlent ? De te sentir grandir, d'être plus équilibré et de pouvoir réaliser tes rêves les plus profonds ? »",
      "Ce jeu de cartes unique en son genre va changer votre vie, votre regard sur vous-même et sur le monde. Il est le fruit de 17 années de thérapie et de formation à la guérison des blessures intérieures (Méthode Lise Bourbeau, Daniel Maurin, Richard Schwartz « Internal Family System », Communication transformative, Médiation de groupe et gestion positive des conflits, Communication non violente). C'est l'outil idéal pour l'auto-thérapie, pour les psychologues, psychothérapeutes, médiateurs et acteurs de la gestion positive des conflits.",
      "Contenu du jeu : 1 livret d'utilisation de 122 pages avec de nombreux exercices pratiques, 8 fiches annexes au format A4 détachables et téléchargeables, 166 cartes à jouer.",
    ],
    pourQui: [
      "Toute personne souhaitant débuter un travail d'introspection de manière ludique et accessible",
      "Les couples souhaitant améliorer leur communication et leur connaissance mutuelle",
      "Les thérapeutes cherchant un support original pour leurs séances (psychologues, psychothérapeutes, médiateurs)",
      "Les familles désireuses d'ouvrir des dialogues plus profonds et authentiques",
      "Toute personne curieuse de mieux se connaître et d'explorer ses émotions",
      "Toute personne souhaitant faciliter son travail avec un thérapeute et accélérer sa thérapie",
    ],
    produitsSimilaires: ["jeu-cartes", "poster-gai-rire", "therapie-ligne"],
  },
  {
    slug: "jeu-cartes",
    titre: "Jeu de cartes des valeurs existentielles",
    categorie: "jeux",
    categorieLabel: "Jeu",
    prix: "À partir de 25 €",
    prixNum: 25,
    images: [],
    descriptionCourte:
      "Un jeu de cartes pour identifier vos valeurs profondes, source de sens et de direction dans votre vie.",
    descriptionLongue: [
      "Le Jeu de cartes des valeurs existentielles est un outil de connaissance de soi centré sur ce qui nous anime le plus profondément : nos valeurs.",
      "Chaque carte représente une valeur fondamentale (liberté, sécurité, connexion, vérité, créativité…) accompagnée d'une description et de questions de réflexion pour explorer comment cette valeur se manifeste — ou se réprime — dans votre vie.",
      "L'exercice vous invite à classer, choisir, confronter vos valeurs pour mieux comprendre les conflits intérieurs qui naissent lorsqu'elles sont en tension les unes avec les autres.",
      "Ce jeu est un complément précieux au travail thérapeutique DPEC, car il aide à identifier les parties de soi qui ont été reniées pour satisfaire les attentes des autres.",
    ],
    pourQui: [
      "Toute personne souhaitant clarifier ce qui compte vraiment pour elle dans sa vie",
      "Ceux qui traversent une période de choix important (orientation professionnelle, vie personnelle)",
      "Les thérapeutes souhaitant un support structurant pour explorer les valeurs avec leurs clients",
      "Les personnes qui ont tendance à s'oublier au profit des autres",
      "Toute personne en quête de sens et d'authenticité",
    ],
    produitsSimilaires: ["jeu-gai-rire", "poster-capt", "stage-capt"],
  },
  {
    slug: "poster-gai-rire",
    titre: "Poster du jeu Gai-Rire (version papier glacé A2)",
    categorie: "posters",
    categorieLabel: "Poster",
    prix: "14,70 €",
    prixNum: 14.7,
    images: [
      "https://laforetnourriciere.org/wp-content/uploads/2023/11/POSTER-BLESSURE-A2-15.11-23-jpeg-bd-jpg.webp",
      "https://laforetnourriciere.org/wp-content/uploads/2023/11/POSTER-BLESSURE-A2-15.11-23-jpeg-md-jpg.webp",
    ],
    descriptionCourte:
      "Poster des 10 étapes de la guérison des 12 blessures intérieures papier glacé format A2 (60 x 42cm). Changer son regard sur soi et mettre de la douceur et de la bienveillance sur nos actions maladroites et inconscientes est la première étape de la guérison.",
    descriptionLongue: [
      "Ce poster est un résumé du processus de guérison du jeu Gai-Rire, vous trouverez toutes les étapes détaillées dans le livret du jeu avec des exercices pour chaque étape et des méditations guidées sur la chaîne Youtube.",
      "Notre personnalité se compose de différentes parts qui chacune à leur manière tente de combler nos besoins fondamentaux (physiologique, santé, sécurité matérielle, relation et lien, estime de soi, accomplissement) et en fonction dont ces besoins ont été comblés ou négligés dans notre enfance, ces parts de nous prennent des rôles extrêmes et nous contrôlent pour notre survie. Comme dans une famille en conflit, elles ne s'entendent pas et génèrent un conflit intérieur et un malêtre profond auquel on s'identifie et que l'on appelle « Moi », l'Ego en grec. Alors qu'en fait, ce « Moi » est un « Nous », dont chaque partie est comme un enfant maladroit qui ne nous veut que du bien…",
      "« N'as-tu pas rêvé de changer tes habitudes négatives, de changer ta vie et celle de ton entourage ? D'être enfin ton meilleur ami et d'être en paix avec toi ? De te sentir grandir, d'être plus équilibré et de pouvoir réaliser tes rêves les plus profonds ? »",
      "Cet outil thérapeutique a pour but de te permettre de découvrir ton système intérieur avec bienveillance, d'accompagner au maximum à l'auto-guérison de tes blessures, dans un deuxième temps d'identifier le besoin de voir un thérapeute pour les blessures les plus profondes et de pouvoir trouver le bon thérapeute, dans un troisième temps de faciliter le travail du thérapeute et d'accélérer ta thérapie et d'économiser beaucoup d'argent.",
    ],
    pourQui: [
      "Les utilisateurs du Jeu Gai-Rire souhaitant garder un support visuel au quotidien",
      "Les thérapeutes utilisant le Jeu Gai-Rire en séance et souhaitant un support mural",
      "Toute personne désireuse de décorer son espace avec un rappel visuel de ses valeurs et émotions",
      "Les personnes qui apprennent mieux par le visuel et la cartographie",
    ],
    produitsSimilaires: ["jeu-gai-rire", "poster-capt", "jeu-cartes"],
  },
  {
    slug: "poster-capt",
    titre: "Poster Communication Authentique, Profonde et Transformative (méthode CAPT)",
    categorie: "posters",
    categorieLabel: "Poster",
    prix: "14,70 €",
    prixNum: 14.7,
    stock: "184 en stock",
    images: [
      "https://laforetnourriciere.org/wp-content/uploads/2022/10/METHODE-CAPT-A2-JPEG-2024-hd-compresse.jpg",
    ],
    descriptionCourte:
      "Communication Authentique, Profonde et Transformative, 10 étapes pour transformer les conflits en évolution. Nos posters sont imprimés localement sur papier et encres écologiques, format A2.",
    descriptionLongue: [
      "Vous arrive-t-il régulièrement de vous soumettre aux désirs des autres, de fuir les conflits ou de vous mettre en colère et que ça ne fasse qu'aggraver les choses ? N'avez-vous pas rêvé d'arriver à vous faire comprendre par vos parents, vos enfants, vos collaborateurs ?",
      "La méthode CAPT (Communication Authentique, Profonde et Transformative) est la fusion de la communication non violente de Marshal Rosenberg, la communication transformative de Lionel Santucci et la gestion positive des conflits Diana Leaf Christian. Ce sont 10 étapes simples pour passer de l'émotion négative et du conflit à l'évolution et aux changements (résolution du conflit).",
      "Cela permet de : 1 — Changer de regard sur soi et sur ce qui nous anime. 2 — Prendre conscience de nos besoins fondamentaux et de nos stratégies maladroites. 3 — Savoir créer des stratégies gagnant / gagnant et faire des demandes et des propositions claires et négociables. 4 — Savoir déjouer et différencier les conflits structurels et les conflits interpersonnels. 5 — Savoir célébrer et remercier le conflit d'avoir apporté de l'évolution dans ta vie et dans la relation.",
    ],
    pourQui: [
      "Les participants au Stage de communication CAPT souhaitant un rappel visuel",
      "Les thérapeutes, coachs et formateurs utilisant la méthode CAPT",
      "Toute personne souhaitant améliorer sa communication et garder les clés de la CAPT à portée de vue",
      "Les personnes visuelles qui ancrent mieux les apprentissages grâce à un support graphique",
    ],
    produitsSimilaires: ["stage-capt", "poster-gai-rire", "jeu-cartes"],
  },
];

export const categorieLabels: Record<string, string> = {
  tous: "Tous",
  stages: "Stages",
  therapie: "Thérapie",
  jeux: "Jeux",
  posters: "Posters",
};

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(slugs: string[]): Product[] {
  return slugs
    .map((s) => products.find((p) => p.slug === s))
    .filter(Boolean) as Product[];
}
