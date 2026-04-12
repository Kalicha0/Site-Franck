export type Product = {
  slug: string;
  titre: string;
  categorie: "stages" | "therapie" | "jeux" | "posters";
  categorieLabel: string;
  prix: string;
  prixNum: number;
  image: string;
  descriptionCourte: string;
  descriptionLongue: string[];
  pourQui: string[];
  produitsSimilaires: string[];
};

export const products: Product[] = [
  {
    slug: "stage-guerison",
    titre: "Stage de guérison",
    categorie: "stages",
    categorieLabel: "Stage",
    prix: "Sur devis",
    prixNum: 0,
    image: "",
    descriptionCourte:
      "Un stage intensif pour explorer et libérer les blessures intérieures accumulées, guidé par la méthode DPEC de Franck Nathie.",
    descriptionLongue: [
      "Le Stage de guérison est une expérience collective et profonde, conçue pour offrir un espace sécurisé où chaque participant peut explorer ses blessures intérieures en toute bienveillance.",
      "Au fil des journées, vous découvrirez les outils fondamentaux de la méthode DPEC : identification des parts blessées, travail sur les 12 blessures existentielles, exercices de communication transformative et pratiques de réunification intérieure.",
      "Chaque session alterne entre apports théoriques, exercices pratiques en binôme ou en groupe, et temps d'intégration personnelle. L'objectif est de repartir avec des clés concrètes pour continuer votre chemin de guérison au quotidien.",
      "Les stages se déroulent dans un cadre naturel propice à la détente et à l'introspection, en petit groupe pour favoriser la profondeur des échanges.",
    ],
    pourQui: [
      "Toute personne ressentant un mal-être persistant sans en identifier clairement la source",
      "Ceux qui souhaitent comprendre et transformer leurs schémas relationnels répétitifs",
      "Les personnes traversant une période de transition (séparation, deuil, changement de vie)",
      "Toute personne désireuse d'approfondir sa connaissance d'elle-même et de ses parts intérieures",
      "Ceux qui ont déjà entamé un travail thérapeutique et souhaitent l'accélérer",
    ],
    produitsSimilaires: ["stage-capt", "therapie-ligne", "jeu-gai-rire"],
  },
  {
    slug: "stage-capt",
    titre: "Stage de communication CAPT",
    categorie: "stages",
    categorieLabel: "Stage",
    prix: "Sur devis",
    prixNum: 0,
    image: "",
    descriptionCourte:
      "Apprenez la Communication Authentique, Profonde et Transformative pour révolutionner vos relations au quotidien.",
    descriptionLongue: [
      "Le Stage de communication CAPT (Communication Authentique, Profonde et Transformative) est une immersion dans les fondements d'une communication qui libère plutôt qu'elle ne blesse.",
      "Développée dans le cadre de la méthode DPEC, la CAPT intègre les apports de la Communication Non Violente de Marshall Rosenberg et de la communication transformative de Lionel Santucci.",
      "Vous apprendrez à exprimer vos besoins profonds sans accusation ni jugement, à écouter l'autre avec une présence totale, et à transformer les conflits en opportunités de rapprochement.",
      "Ce stage s'articule autour de mises en situation réelles, de jeux de rôle bienveillants et d'exercices d'ancrage qui vous permettront d'intégrer durablement ces nouvelles façons de communiquer.",
    ],
    pourQui: [
      "Les personnes qui souffrent de conflits récurrents dans leurs relations (couple, famille, travail)",
      "Ceux qui ont du mal à exprimer leurs besoins ou leurs émotions sans se sentir vulnérables",
      "Les professionnels souhaitant améliorer leur communication en milieu de travail",
      "Toute personne désirant construire des relations plus authentiques et profondes",
      "Les thérapeutes, coachs et accompagnants souhaitant enrichir leur pratique",
    ],
    produitsSimilaires: ["stage-guerison", "jeu-cartes", "poster-capt"],
  },
  {
    slug: "therapie-ligne",
    titre: "Thérapie en ligne Gai-Rire",
    categorie: "therapie",
    categorieLabel: "Thérapie",
    prix: "Sur devis",
    prixNum: 0,
    image: "",
    descriptionCourte:
      "Des séances de thérapie DPEC individuelles à distance, accessibles depuis chez vous, avec Franck Nathie.",
    descriptionLongue: [
      "La Thérapie en ligne Gai-Rire vous permet de bénéficier d'un accompagnement thérapeutique profond avec Franck Nathie, depuis le confort et la sécurité de votre espace personnel.",
      "Chaque séance est unique et s'adapte à votre rythme, à vos besoins et à l'étape de votre parcours intérieur. La méthode DPEC s'applique aussi efficacement à distance qu'en présentiel.",
      "La thérapie Gai-Rire intègre des outils issus de l'IFS (Internal Family System), du travail sur les blessures intérieures et de la communication transformative, pour vous accompagner vers une réconciliation profonde avec vous-même.",
      "Les séances se déroulent via visioconférence sécurisée. Un lien vous sera envoyé après confirmation de votre rendez-vous.",
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
    titre: "Jeu Gai-Rire",
    categorie: "jeux",
    categorieLabel: "Jeu",
    prix: "À partir de 35 €",
    prixNum: 35,
    image: "",
    descriptionCourte:
      "Un jeu thérapeutique pour explorer vos émotions, identifier vos blessures et progresser vers plus d'authenticité.",
    descriptionLongue: [
      "Le Jeu Gai-Rire est bien plus qu'un simple jeu : c'est un outil thérapeutique conçu pour vous accompagner dans l'exploration de votre monde émotionnel intérieur.",
      "Composé de cartes illustrées, de situations et de questions de réflexion, le jeu vous invite à rencontrer vos différentes parts intérieures — celles que l'on appelle \"Moi\" et \"Soi\" — et à mieux comprendre les mécanismes qui gouvernent vos réactions au quotidien.",
      "Utilisable seul, en couple, en famille ou en thérapie de groupe, le Jeu Gai-Rire crée un cadre ludique et bienveillant pour aborder des sujets profonds sans les craindre. Chaque partie est une invitation à rire de soi-même avec tendresse et à avancer vers plus d'authenticité.",
      "Il peut être utilisé par des thérapeutes comme support de séance, ou par tout particulier désireux d'entamer un travail d'introspection en douceur.",
    ],
    pourQui: [
      "Toute personne souhaitant débuter un travail d'introspection de manière ludique et accessible",
      "Les couples souhaitant améliorer leur communication et leur connaissance mutuelle",
      "Les thérapeutes cherchant un support original pour leurs séances",
      "Les familles désireuses d'ouvrir des dialogues plus profonds et authentiques",
      "Toute personne curieuse de mieux se connaître et d'explorer ses émotions",
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
    image: "",
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
    titre: "Poster du jeu Gai-Rire",
    categorie: "posters",
    categorieLabel: "Poster",
    prix: "À partir de 25 €",
    prixNum: 25,
    image: "",
    descriptionCourte:
      "Poster illustré format A2 du jeu Gai-Rire, pour garder à portée de vue les clés de votre travail intérieur.",
    descriptionLongue: [
      "Le Poster du jeu Gai-Rire est la version grand format (A2, papier glacé) de l'outil central du Jeu Gai-Rire. Il synthétise les 38 étapes du jeu et peut être accroché dans votre espace personnel ou de thérapie.",
      "Chaque carte du jeu est représentée sur ce poster, vous permettant d'avoir une vue d'ensemble de votre parcours intérieur et de vous rappeler à tout moment les clés que vous avez identifiées en travaillant avec le jeu.",
      "Il peut être utilisé comme tableau de bord visuel de votre évolution personnelle, ou comme support pédagogique pour les thérapeutes qui utilisent le Jeu Gai-Rire en séance.",
      "Imprimé en haute qualité sur papier glacé format A2, le poster est livré soigneusement roulé et protégé pour arriver en parfait état chez vous.",
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
    titre: "Poster CAPT",
    categorie: "posters",
    categorieLabel: "Poster",
    prix: "À partir de 25 €",
    prixNum: 25,
    image: "",
    descriptionCourte:
      "Poster de la méthode de Communication Authentique, Profonde et Transformative, format A2 papier glacé.",
    descriptionLongue: [
      "Le Poster CAPT est la représentation visuelle synthétique de la méthode de Communication Authentique, Profonde et Transformative développée dans le cadre de la méthode DPEC.",
      "Il présente les différentes étapes et niveaux de la communication transformative, permettant de visualiser rapidement les mécanismes qui font passer une conversation d'un échange superficiel à un dialogue profond et libérateur.",
      "Ce poster est particulièrement utile pour les personnes ayant suivi le Stage de communication CAPT, comme aide-mémoire et rappel visuel des apprentissages.",
      "Il peut également être utilisé par des professionnels de l'accompagnement pour illustrer leur travail et offrir un repère visuel à leurs clients lors des séances.",
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
