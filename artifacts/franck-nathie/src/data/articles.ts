export type Article = {
  id: number;
  slug: string;
  titre: string;
  description: string;
  href: string | null;
  active: boolean;
};

export const articles: Article[] = [
  {
    id: 1,
    slug: "blessures",
    titre: "Les 12 blessures existentielles",
    description:
      "Du rejet à la trahison, de l'humiliation à l'injustice — une exploration des expériences fondatrices qui façonnent notre psyché et nos comportements.",
    href: "/articles/blessures",
    active: true,
  },
  {
    id: 2,
    slug: "soi-moi",
    titre: "Comprendre le Moi et le Soi",
    description:
      "Qui est vraiment aux commandes de votre vie ? La DPEC distingue deux instances fondamentales de notre identité — et ce dialogue intérieur change tout.",
    href: null,
    active: false,
  },
  {
    id: 3,
    slug: "besoins-fondamentaux",
    titre: "Les besoins fondamentaux de l'enfant",
    description:
      "L'enfant que nous avons été n'a pas toujours reçu ce dont il avait besoin. Comprendre ces manques originels est le point de départ de toute transformation durable.",
    href: null,
    active: false,
  },
  {
    id: 4,
    slug: "triangle-dramatique",
    titre: "Sortir du triangle dramatique",
    description:
      "Victime, sauveur, persécuteur : trois rôles que nous jouons tous sans le savoir. Identifier ces mécanismes relationnels est le premier pas vers des relations plus libres.",
    href: null,
    active: false,
  },
  {
    id: 5,
    slug: "parts-interieures",
    titre: "Les parts intérieures — qui parle en toi ?",
    description:
      "Colère soudaine, paralysie inexpliquée, voix intérieure critique : nos comportements sont souvent guidés par des \"parts\" que nous n'avons pas encore rencontrées.",
    href: null,
    active: false,
  },
];

export function searchArticles(query: string): Article[] {
  const q = query
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  if (!q) return [];
  return articles.filter((a) => {
    const t = (a.titre + " " + a.description)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return t.includes(q);
  });
}
