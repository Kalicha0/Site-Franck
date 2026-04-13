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
  panelDescription?: string[];
  descriptionLongue: string[];
  etapes?: { num: number; titre: string; texte: string }[];
  pourQuiTitle?: string;
  pourQuiImages?: string[];
  pourQuiText?: string[];
  pourQui: string[];
  highlights?: string[];
  stageTitle?: string;
  stageDescription?: string[];
  publicNote?: string;
  lieu?: string;
  vaApporter?: string[];
  contenuFormation?: {
    items: string[];
    modules: { title: string; items: string[] }[];
  };
  echeTexte?: string[];
  produitsSimilaires: string[];
  layout?: "full" | "simple";
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
    descriptionCourte: "La permaculture humaine, se changer pour changer le monde",
    panelDescription: [
      "Le processus Synergie dans les Rapports Humains, de l'individu au groupe a été créé pour accompagner sur le plan humain les individus et les collectifs dans leurs projets d'écolieux ou leurs projets de vie.",
      "Une immersion dans notre chrysalide pour observer le magnifique papillon qui en sort quand on accueille la chenille sans la juger !",
      "Se connaitre dans son essence pour se respecter soi et l'autre. Toucher et guérir nos blessures intérieures qui conditionnent nos personnalités (l'égo) pour enfin se libérer de nos limites. C'est la relation maladroite qui nous a blessé, c'est la relation bienveillante qui nous guérit. Vous ne serez plus le (la) même après ces 3 jours !",
    ],
    descriptionLongue: [],
    pourQuiTitle: "Tu te poses des questions sur ton existence et sur le sens de ta vie ?",
    pourQuiImages: [
      "https://laforetnourriciere.org/wp-content/uploads/2023/07/Les-parts-Soumise.png",
      "https://laforetnourriciere.org/wp-content/uploads/2023/07/les-parts-soumises-le-parent-soumis.png",
      "https://laforetnourriciere.org/wp-content/uploads/2023/07/Les-parts-controlantes-Le-colerique.png",
      "https://laforetnourriciere.org/wp-content/uploads/2023/07/Les-parts-Fuyantes.png",
      "https://laforetnourriciere.org/wp-content/uploads/2023/07/les-parts-fuyantes-le-confusionniste.png",
      "https://laforetnourriciere.org/wp-content/uploads/2023/07/les-parts-fuyantes-le-suicidaire.png",
    ],
    pourQui: [
      "Tu es souvent soumis et trop gentil et tu en as marre des gens qui exagèrent et profitent de ta gentillesse ?",
      "Tu es colérique et agressif et tu en as marre de blesser les autres, que l'on te juge et que l'on te rejette ?",
      "Tu es désorganisé et tu procrastines et ne fais jamais ce qui est important pour toi ?",
      "Tu es boulimique, toxicomane, et tu aimerais arriver à prendre soin de ta santé ?",
      "Tu oscilles entre le surmenage et un ennui profond dès que tu n'es pas surmené ?",
      "Tu te poses la question de quel est le sens de ta vie ?",
      "Tu aimerais bien changer ta vie, ton comportement en quelques jours, mais tu n'y crois plus ?",
      "Tu aimerais bien comprendre les besoins vitaux qui t'animent inconsciemment et pourquoi tu n'arrives pas à les combler ?",
      "Tu as déjà fait des thérapies, mais rien n'a vraiment changé ?",
    ],
    highlights: [
      "Connaitre les besoins fondamentaux humains",
      "Guérir tes blessures de l'enfance",
      "Changer ta vie, tes habitudes",
    ],
    stageTitle: "Un stage de trois jours rien que pour toi",
    stageDescription: [
      "Trois jours pour utiliser le jeu Gai-rire en groupe, apprendre à identifier facilement tes besoins et tes blessures grâce à tes sentiments et changer tes habitudes pour entrer dans le 1er jour du reste de ta vie",
      "Il y aura un avant et un après ce stage !",
    ],
    etapes: [
      {
        num: 1,
        titre: "Jour 1 - Découverte des besoins fondamentaux et des 10 blessures",
        texte: "",
      },
      {
        num: 2,
        titre: "Jour 2 - Exercice pratique de guérison des blessures avec le jeu gai-rire (balade ou baignade en fin de journée)",
        texte: "",
      },
      {
        num: 3,
        titre: "Jour 3 - Exercice pratique de guérison des blessures avec le jeu gai-rire, jeu de reprogrammation",
        texte: "",
      },
    ],
    publicNote: "Amateurs et professionnels bienvenus.",
    lieu: "Simplé (53)",
    vaApporter: [
      "Une vision claire de ce qui se passe en toi et des parts qui t'anime inconsciemment.Une compréhension profonde et expérientiel du lien entre tes besoins fondamentaux et ce que tu ressens (peur, colère, tristesse, etc)",
      "Une guérison de certaines de tes parts qui souffre depuis très longtemps",
      "Une reprogrammation de certaines de tes croyances et de tes habitudes que tu ne contrôlais pas jusque-là.",
      "Un autre regard sur toi-même, sur les autres humains qui t'entourent et sur le monde en général qui sera basé sur la non-dualité",
      "Une porte ouverte sur le premier jour du reste de ta vie et de toutes les nouvelles perspectives qui vont s'ouvrir à toi.",
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
    descriptionCourte: "Savoir communiquer avec authenticité, savoir mettre ses limites et respecter celles des autres permet d'entrer en synergie avec son entourage, dans son couple, dans sa famille, en association en milieu professionnel, etc.",
    panelDescription: [
      "C'est l'objet du stage \"Comment communiquer avec authenticité et profondeur : changer son mode de communication\" pour devenir vrai, savoir dire les choses avec authenticité et respect.",
      "\"J'ai du mal à m'exprimer, à dire mes besoins clairement, à la place je me tais ou je me met tout le temps en colère), je me juge, je juge les autres, je me soumet à leur attac sans pouvoir me défendre, je boude, je me sent impuissant à changer les choses, tant en moi qu'a l'extérieur",
      "\"J'ai peur de perdre mon identité au sein d'un groupe, de ne pas trouver ma place ou d'être jugé, enfermé dans une posture (Gentil, méchant, trop ceci, pas assez cela etc…)\"",
      "Ces phrases vous parlent ? Alors le stage Comment communiquer avec authenticité et profondeur est fait pour vous !",
    ],
    descriptionLongue: [],
    pourQuiTitle: "Tu aimerais oser dire… être entendu et compris quand tu parles ?",
    pourQuiImages: [
      "https://laforetnourriciere.org/wp-content/uploads/2023/07/les-parts-soumises-le-parent-soumis.png",
      "https://laforetnourriciere.org/wp-content/uploads/2023/07/Les-parts-Soumise.png",
      "https://laforetnourriciere.org/wp-content/uploads/2023/07/Les-parts-controlantes-Le-colerique.png",
    ],
    pourQui: [
      "Tu aimerais pouvoir être toi, mais ça gêne toujours quelqu'un autour de toi ?",
      "Tu es souvent soumis et trop gentil et tu en as marre d'être aux services des autres ?",
      "Tu es colérique et agressif et tu en as marre de blesser les autres sans que ça change réellement les choses au final ?",
      "Tu es tiraillé entre l'envie de dire ce que tu penses et la peur de blesser ou de briser tes relations, et tu te juges d'avoir agi, ou de ne pas avoir agi ?",
      "Tu aimerais bien changer ta vie, ton comportement et la qualité de tes relations en quelques jours, mais tu n'y crois plus ?",
      "Tu as déjà fait des stages de communication non violente, de PNL etc, mais rien n'a vraiment changé après ?",
    ],
    highlights: [
      "Comprendre les besoins",
      "Communiquer avec authenticité",
      "Changer les relations et évoluer",
    ],
    stageTitle: "Un stage de trois jours rien que pour toi",
    stageDescription: [
      "Trois jours pour utiliser la méthode CAPT individuellement et en groupe, apprendre à exprimer tes besoins et changer tes habitudes",
      "Il y aura un avant et un après ce stage !",
    ],
    etapes: [
      {
        num: 1,
        titre: "Jour 1 - Découvrir la méthode CAPT Comprendre les 10 étapes de la méthode",
        texte: "",
      },
      {
        num: 2,
        titre: "Jour 2 - Pratiquer la Méthode CAPT Jouer pour de vrais mes conflits intérieurs",
        texte: "",
      },
      {
        num: 3,
        titre: "Jour 3 - Intégrer la méthode CAPT Exercice en groupe et individuel d'expression de ce qui se passe en vous, et de vos besoins vitaux,",
        texte: "",
      },
    ],
    publicNote: "Amateurs et professionnels bienvenus.",
    lieu: "Simplé (53)",
    vaApporter: [
      "Une méthode simple et claire pour savoir clarifier et exprimer tes besoins fondamentaux et reconnaitre ceux des autres",
      "Comprendre quel sont tes intentions profondes derrière tes actions et tes demandes pour réajuster ce que tu cherches vraiment",
      "Prendre la responsabilité de tous tes actes, pensées et actions pour transformer ta vie",
      "Une compréhension profonde et expérientiel du lien entre tes besoins fondamentaux et ce que tu ressens (peur, colère, tristesse, stresse, etc)",
      "Une reprogrammation de certaines de tes croyances et de tes habitudes que tu ne contrôlais pas jusque-là.",
      "Un autre regard sur toi-même, sur les autres humains qui t'entourent et sur le monde en général qui sera basé sur la non-dualité et la recherche d'équilibre entre donner et recevoir",
      "Une porte ouverte sur le premier jour du reste de ta vie et de toutes les nouvelles perspectives qui vont s'ouvrir à toi à la suite du stage",
    ],
    produitsSimilaires: ["stage-guerison", "jeu-cartes", "poster-capt"],
    layout: "simple",
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
    descriptionCourte: "La Thérapie « Soi-Nier ou Gai-Rire », créée en partant de 24 années d'expérience thérapeutique et faisant la synthèse de plusieurs méthodes, elle a pour mission d'accompagner une transformation profonde en passant par plusieurs étapes.",
    panelDescription: [
      "Le but sincère de cet outil thérapeutique est simple : Libérer les fardeaux de vos parts, retrouver la liberté d'être, faire que les personnes qui traversent ce processus puissent sentir qu'il y a eu « un avant et un après la thérapie Gai-rire »",
    ],
    descriptionLongue: [],
    etapes: [
      {
        num: 1,
        titre: "Développer le SOI, la conscience pour observer le MOI",
        texte: "Il s'agit d'apprendre à observer avec bienveillance les différentes parts de moi qui s'opposent et les besoins fondamentaux qu'elles protègent. On passe alors du mode : « Je suis comme ça, je veux ça… » au mode : « Une part de moi ressent cela… Une part de moi voudrait que… » Ce changement de posture ouvre déjà un changement majeur, la compassion envers soi-même et la conscience de notre complexité.",
      },
      {
        num: 2,
        titre: "Libérer les tensions et les émotions bloquées",
        texte: "De nombreuses souffrances restent enfermées dans le corps sous forme de tensions, d'émotions. Cette thérapie permet de libérer ces tensions restées bloquées dans la chair et les émotions qui leur sont associées.",
      },
      {
        num: 3,
        titre: "Transformer les croyances limitantes",
        texte: "Les parts blessées et les parts protectrices fonctionnent souvent avec des croyances construites à un âge très jeune.\n\nCes croyances appartiennent parfois à l'enfant ou à l'adolescent que nous avons été, et elles continuent d'influencer notre vie d'adulte.",
      },
      {
        num: 4,
        titre: "Créer de nouvelles expériences",
        texte: "La guérison ne passe pas seulement par la libération des émotions et le changement des croyances. Elle passe aussi par l'expérimentions de nouveaux comportement qui incarne le changement en nous",
      },
      {
        num: 5,
        titre: "Redonner au SOI le rôle de médiateur",
        texte: "Chacune de nos parts défend des besoins fondamentaux (la santé, la douceur, la sécurité matériel, affective, le sens, la justice, l'évolution etc) Le Soi va petit à petit prendre la place de ce médiateur et transformer le conflit intérieur en dialogue et en évolution",
      },
      {
        num: 6,
        titre: "Retrouver l'estime de soi",
        texte: "Au fil du processus, quelque chose se transforme profondément. La personne commence à se réconcilier avec elle-même, à avoir de la compassion et du respect pour ses parts aussi maladroites soi elles.",
      },
      {
        num: 7,
        titre: "Grandir et évoluer",
        texte: "Quand nos parts nous limitent, notre évolution se bloque, et ce sont souvent les déséquilibres et les problèmes qui prennent le dessus. La guérison des blessures pourrait se résumer ainsi : « aider nos parts à grandir et à évoluer ». Lorsque nous accompagnons nos parts dans cette croissance, c'est toute notre évolution qui redémarre. On se sent plus vivant, et un sentiment de liberté accompagne ce changement de paradigme",
      },
    ],
    pourQuiTitle: "Tu te sens heureux et en paix dans ta vie où est-ce que tu vis ça toi aussi ?",
    pourQuiImages: [
      "https://laforetnourriciere.org/wp-content/uploads/2024/08/les-parts-soumises-le-soumis-scaled.jpeg",
      "https://laforetnourriciere.org/wp-content/uploads/2024/08/les-parts-fuyantes-le-tox-3-scaled.jpeg",
      "https://laforetnourriciere.org/wp-content/uploads/2024/08/les-parts-fuyantes-Le-masochiste.jpg",
    ],
    pourQuiText: [
      "Le conflit intérieur",
      "T'arrive-t-il souvent de te taire pour être « gentil », éviter les conflits… et ensuite te juger d'avoir été trop gentil ?",
      "Ou à l'inverse, de sortir de tes gonds sans pouvoir te contrôler… et de juger de ne pas avoir été sympa, conciliant ?",
      "Ensuite, pour calmer ces émotions, tu te réfugies dans le chocolat, le sucre, l'alcool, juste un peu de douceur… Et paf, encore une fois tu te condamnes pour avoir craqué.",
      "Tu essaies la méditation, la pleine conscience, la pensée positive, le pardon radical, le lâcher-prise… Et pourtant… les habitudes restent et le découragement s'installe. Et toujours cette petite voix moralisante qui juge et ravive ce pincement au cœur qui rappelle mon mal-être…",
      "et hop, un peu de chocolat… :-)",
      "Ce juge intérieur impitoyable, que nous avons développé dans l'enfance, cherche pourtant notre bien lui aussi, comme toutes nos autres parts.",
      "Cette guerre entre nos parts a un nom : le conflit intérieur, ou la dissociation, comme une famille en conflit… mais à l'intérieur de nous.",
      "La thérapie Gai-Rire est là pour que tu deviennes le SOI, le médiateur bienveillant qui va libérer les parts et comprendre les besoins qu'elles défendent, afin que ce conflit intérieur inconscient devienne un dialogue conscient et permette de trouver des stratégies Gagnant-Gagnant entre nos différents besoins.",
      "Et que tu retrouves la liberté, la créativité d'être ce que tu voudrais être.",
    ],
    pourQui: [],
    highlights: [
      "Soi-Nier ou Gai–Rire ?",
      "Sortir du conflit intérieur",
      "Retrouver l'estime de toi et évoluer",
    ],
    contenuFormation: {
      items: [
        "2 modules en version PDF et vidéo",
        "Le jeu de carte Gai-Rire en version PDF avec ses 166 cartes,",
        "Son livret de 122 page d'exercices",
        "Le poster Gai-Rire avec ses 10 étapes",
        "Les fiches annexes d'exercice à imprimer",
      ],
      modules: [
        {
          title: "Module 1 Théorie : Il donne toutes les bases théoriques pour comprendre:",
          items: [
            "Nos différentes parts, le fonctionnement complexe de notre psychisme",
            "Découvrir les 12 blessures de l'être et les comportements parfois opposés qu'elles génèrent",
            "Les parts blessées exilées et leurs fardeaux",
            "Les différents types de parts gardiennes qui préservent maladroitement nos besoins fondamentaux",
            "La base du conflit intérieur et de notre impuissance a changé nos vies",
            "Les fausses croyances qui empêchent notre évolution et celle de l'humanité",
            "Différencier clairement le SOI du MOI et retrouver le « Self Lead ship »",
            "Découverte des parts libres qui vont incarner les changements de notre future vie et le retour à une haute estime de nous même et à la joie d'être pleinement humain",
            "Les 4 postures relationnelles",
          ],
        },
        {
          title: "Module 2 Pratiques : Des exercices pratiques pour :",
          items: [
            "Aller à la rencontre de nos parts gardiennes et exilées",
            "Libérer leurs fardeaux de souffrances, d'émotions, de peurs et de croyances limitantes",
            "Les aider à grandir et à sortir du passé",
            "Développer la conscience du Soi et remplacer le MOI conflictuel par le Nous consensuel réunifié",
            "Incarner la présence et la bienveillance du SOI envers nous-mêmes",
            "Choisir les parts libres qui vont changer notre vie et la vie autour de nous",
            "Faire rayonner cette présence dans l'humanité qui nous entoure",
            "Incarner le changement que l'on attend dans notre vie et dans le monde",
          ],
        },
      ],
    },
    echeTexte: [
      "Le conflit et la lutte contre l'EGO, (Ego veut dire MOI en latin)",
      "Freud parlait de MOI , de sous moi, sûr moi, ça fait déjà 3 Moi en moi ! Descartes et les religions qualifiaient ce Moi de « Mal »",
      "Ils avaient la conviction que ce « MOI » était des sortes de choses nuisibles qui empêchaient la « raison ». Ils pensaient qu'il fallait combattre cet ego pour retrouver la raison. Beaucoup de thérapie et d'approche de développement personnel basé sur la volonté et la pensée positive sont basées sur la dissolution de ce qui serait « mauvais » en nous ou sur sa négation.",
      "Vaste bourbier sans issu qui fait qu'une psychanalyse dure longtemps et qu'au bout de 10 ans et de millier d'euros dépensés, on se retrouve avec la conscience mentale d'une collection de problème dont on sait très bien qu'ils viennent de notre enfance mais… sans aucune solution pour les résoudre ! Des 100n d'heures de méditation et de stage de visualisation positive et de coaching, ont sensiblement le mène résultat.",
      "Nos déviances et nos comportements déséquilibrés reviennent en force",
      "Pour la simple et bonne raison qu'il n'y a jamais eu de MOI monolithique, mais un NOUS et chaque partie de ce NOUS est comme un enfant maladroit de notre passé qui ne nous veut que du bien ! Même s'ils font autant de mal que de bien, ces parts de nous infantiles et immatures ne font qu'essayer de répondre aux besoins vitaux de l'époque ! Mais maladroitement !",
      "Et on n'aide pas un enfant à en lutant contre lui, en le prenant pour un nuisible qui serait de trop, en le mettant dans un placard de spiritualité, d'anesthésiant !",
      "On le guérit en apaisant ses peurs, en l'aidant à grandir avec de l'amour, de l'accueil, de l'écoute, des câlins et des explications intelligentes qui lui permettent de comprendre, de digérer, d'évoluer et de devenir un grand plus sage.",
      "Voilà la mission de cette terre happy Gai-Rire",
      "Grandir et unifier les parts de nous, retrouver l'unité et transformer le MOI conflictuel en NOUS harmonieux",
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
    descriptionCourte: "Avec ce jeu 166 cartes et son manuel de 122 pages d'exercices, guérissez vos blessures intérieures, transformez votre vie, votre vision de vous-même et du monde qui vous entoure…",
    descriptionLongue: [
      "T'arrive-t-il de te mettre en colère et de t'en vouloir juste après et/ou de ne rien dire alors que l'autre exagère afin de ne pas faire de vagues et de t'en vouloir de n'avoir rien dit ? Et après ça de te ruer sur du chocolat ou de la nourriture et de t'en vouloir encore pour avoir craqué ? De tenter des psychothérapies, la pensée positive, des méditations, des retraites, du chamanisme etc et de sentir que tu reviens à la même place et que rien ne change.",
      "Notre personnalité se compose de différentes parts qui chacune à leur manière tente de combler nos besoins fondamentaux (physiologique, santé, sécurité matérielle, relation et lien, estime de soi, accomplissement, douceur, paix, etc) et en fonction dont ces besoins ont été comblés ou négligés dans notre enfance, ces parts de nous prennent des rôles extrêmes et nous contrôlent pour notre survie. Comme dans une famille en conflit, elles ne s'entendent pas et génèrent un conflit intérieur et un malêtre profond auquel on s'identifie et que l'on appelle « Moi », l'Ego en grec. Alors qu'en fait, ce « Moi » est un « Nous », dont chaque partie est comme un enfant maladroit qui ne nous veut que du bien, mais fait autant de mal que de bien…",
      "« N'as-tu pas rêvé de changer tes habitudes négatives, d'être enfin ton meilleur ami et d'être en paix avec tous les bouts de toi qui s'affrontent et te contrôlent ? De te sentir grandir, d'être plus équilibré et de pouvoir réaliser tes rêves les plus profonds ? »",
      "Ce jeu de cartes unique en son genre va changer votre vie, votre regard sur vous-même et sur le monde. Il est le fruit de 17 années de thérapie et de formation à la guérison des blessures intérieures (Méthode Lise Bourbeau, Daniel Maurin, Richard Schwartz « Internal Family System », Communication transformative, Médiation de groupe et gestion positive des conflits, Communication non violente). C'est l'outil idéal pour l'auto-thérapie, pour les psychologues, psychothérapeutes, médiateurs et acteurs de la gestion positive des conflits.",
      "Contenu du jeu : 1 livret d'utilisation de 122 pages avec de nombreux exercices pratiques, 8 fiches annexes au format A4 détachables et téléchargeables, 166 cartes à jouer.",
    ],
    pourQui: [],
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
    descriptionCourte: "Un jeu de cartes pour identifier vos valeurs profondes, source de sens et de direction dans votre vie.",
    descriptionLongue: [
      "Le Jeu de cartes des valeurs existentielles est un outil de connaissance de soi centré sur ce qui nous anime le plus profondément : nos valeurs.",
      "Chaque carte représente une valeur fondamentale (liberté, sécurité, connexion, vérité, créativité…) accompagnée d'une description et de questions de réflexion pour explorer comment cette valeur se manifeste — ou se réprime — dans votre vie.",
      "L'exercice vous invite à classer, choisir, confronter vos valeurs pour mieux comprendre les conflits intérieurs qui naissent lorsqu'elles sont en tension les unes avec les autres.",
      "Ce jeu est un complément précieux au travail thérapeutique DPEC, car il aide à identifier les parties de soi qui ont été reniées pour satisfaire les attentes des autres.",
    ],
    pourQui: [],
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
    descriptionCourte: "Poster des 10 étapes de la guérison des 12 blessures intérieures papier glacé format A2 (60 x 42cm). Changer son regard sur soi et mettre de la douceur et de la bienveillance sur nos actions maladroites et inconscientes est la première étape de la guérison",
    descriptionLongue: [
      "Ce poster est un résumé du processus de guérison du jeu Gai-Rire, vous trouverez toutes les étapes détaillées dans le livret du jeu avec des exercices pour chaque étape et des méditations guidées sur la chaine Youtube",
      "Notre personnalité se compose de différentes parts qui chacune à leur manière tente de combler nos besoins fondamentaux (physiologique, santé, sécurité matérielle, relation et lien, estime de soi, accomplissement) et en fonction dont ces besoins ont été comblés ou négligés dans notre enfance, ces parts de nous prennent des rôles extrêmes et nous contrôle pour notre survie. Comme dans une famille en conflit, elles ne s'entendent pas et génèrent un conflit intérieur et un malêtre profond auquel on s'identifie et que l'on appelle \"Moi\", l'Ego en grecque. Alors qu'en fait, ce \"Moi\" est un \"Nous\", dont chaque partie est comme un enfant maladroit qui ne nous veut que du bien…",
      "\"N'as-tu pas rêvé de changer tes habitudes négatives, de changer ta vie et celle de ton entourage ? D'être enfin ton meilleur ami et d'être en paix avec toi ? De te sentir grandir, d'être plus équilibré et de pouvoir réaliser tes rêves les plus profonds ? \"",
      "Cet outil thérapeutique a pour but de te permettre de découvrir ton système intérieur avec bienveillance, d'accompagner au maximum à l'auto-guérison de tes blessures, dans un deuxième temps d'identifier le besoin de voir un thérapeute pour les blessures les plus profondes et de pouvoir trouver le bon thérapeute, dans un troisième temps de faciliter le travail du thérapeute et d'accélérer ta thérapie et d'économiser beaucoup d'argent.",
    ],
    pourQui: [],
    produitsSimilaires: ["jeu-gai-rire", "poster-capt", "jeu-cartes"],
  },
  {
    slug: "poster-capt",
    titre: "Poster Communication Authentique, Profonde et Transformative, baptisée méthode CAPT",
    categorie: "posters",
    categorieLabel: "Poster",
    prix: "14,70 €",
    prixNum: 14.7,
    stock: "184 en stock",
    images: [
      "https://laforetnourriciere.org/wp-content/uploads/2022/10/METHODE-CAPT-A2-JPEG-2024-hd-compresse.jpg",
    ],
    descriptionCourte: "Communication Authentique, Profonde et Transformative, 10 étapes pour transformer les conflits en évolution. Nos posters sont imprimés localement sur papier et encres écologiques, format A2",
    descriptionLongue: [
      "Vous arrive-t-il régulièrement de vous soumettre aux désirs des autres, de fuir les conflits ou de vous mettre en colère et que ça ne fasse qu'aggraver les choses ? N'avez-vous pas rêvé d'arriver à vous faire comprendre par vos parents, vos enfants, vos collaborateurs ?  La méthode CAPT (Communication Authentique, Profonde et Transformative) est la fusion de la communication non violente de Marshal Rosenberg, la communication transformative de Lionel Santucci et la gestion positive des conflits Diana Leaf Christian. Ce sont 10 étapes simples pour passer de l'émotion négative et du conflit à l'évolution et aux changements (résolution du conflit)",
      "Cela permet de :\n\n1 Changer de regard sur soi et sur ce qui nous anime\n\n2 Prendre conscience de nos besoins fondamentaux et de nos stratégies maladroites\n\n3 Savoir créer des stratégies gagnant / gagnant et faire des demandes et des propositions claires et négociable\n\n4 Savoir déjouer et différencier les conflits structurels et les conflits interpersonnels\n\n5 Savoir célébrer et remercie le conflit d'avoir apporté de l'évolution dans ta vie et dans la relation",
    ],
    pourQui: [],
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
