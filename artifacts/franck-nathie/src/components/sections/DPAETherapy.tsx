import { useRef, useEffect, useState } from "react";

import selfImg from "@assets/Le_SOI__1775478214163.png";
import pleureuseImg from "@assets/Les_part_fuyantes_La_pleureuse_2_1774979777255.png";
import faibleImg from "@assets/les_parts_blessée_exilée_La_faible_couleurs_1775431161969.jpg";
import sportifImg from "@assets/les_parts_déchargés_-_le_sportif_1_1774979777258.png";
import moiImg from "@assets/Les_parts_libérés_png_1775430316909.png";
import humbleImg from "@assets/les_parts_déchargés_-_l_humble_1775431264481.png";
import butterflyImg from "@assets/Les_parts_-_Déchargés_2_1774979777256.png";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const steps = [
  {
    number: "1.",
    img: selfImg,
    alt: "Le SOI — le cœur qui observe le MOI",
    imgBg: "#f0ede8",
    title: "Développer le SOI, la conscience pour observer le MOI",
    content:
      "Il s'agit d'apprendre à observer avec bienveillance les différentes parts de moi qui s'opposent et les besoins fondamentaux qu'elles protègent. Petit à petit, la conscience du SOI reprend sa place et devient l'espace de dialogue entre ces parts et leurs besoins souvent complexes. On passe alors du mode : « Je suis comme ça, je veux ça… » au mode : « Une part de moi ressent cela… Une part de moi voudrait que… » Ce changement de posture ouvre déjà un changement majeur, la compassion envers soi-même et la conscience de notre complexité.",
  },
  {
    number: "2.",
    img: pleureuseImg,
    alt: "La pleureuse — libérer les émotions bloquées",
    imgBg: "#f0ede8",
    title: "Libérer les tensions et les émotions bloquées",
    content:
      "De nombreuses souffrances restent enfermées dans le corps sous forme de tensions, d'émotions. Cette thérapie permet de libérer ces tensions restées bloquées dans la chair et les émotions qui leur sont associées. Grâce à l'amour, à l'attention et à la présence du Soi — ce qui a parfois manqué dans l'enfance — ces parts peuvent enfin être accueillies dans leur maladresse. À travers des exercices de régression et de reconnexion, les parts blessées peuvent s'autoriser à pleurer, crier, trembler, exprimer la douleur enfouie afin qu'elle puisse se libérer.",
  },
  {
    number: "3.",
    img: faibleImg,
    alt: "La faible — transformer les croyances limitantes",
    imgBg: "white",
    title: "Transformer les croyances limitantes",
    content:
      "Les parts blessées et les parts protectrices fonctionnent souvent avec des croyances construites à un âge très jeune. Ces croyances appartiennent parfois à l'enfant ou à l'adolescent que nous avons été, et elles continuent d'influencer notre vie d'adulte. Une fois les émotions libérées, il devient possible d'actualiser ces croyances pour les transformer en visions plus conscientes, plus adultes et plus adaptées à la réalité d'aujourd'hui. Le Soi va permettre à nos parts de grandir là où elles étaient bloquées dans le passé.",
  },
  {
    number: "4.",
    img: sportifImg,
    alt: "Le sportif — créer de nouvelles expériences",
    imgBg: "#f0ede8",
    title: "Créer de nouvelles expériences",
    content:
      "La guérison ne passe pas seulement par la libération des émotions et le changement des croyances. Elle passe aussi par l'expérimentation de nouveaux comportements qui incarnent concrètement le changement en nous. Dans un espace sécurisé, la personne peut oser expérimenter de nouvelles façons d'être : oser dire, oser entendre, oser poser des limites, oser exister autrement. Là où la vie semblait suivre un seul chemin automatique — comme une route droite en forme de « I » — apparaît alors une bifurcation, un « Y ». Un nouveau choix devient possible : continuer l'ancien comportement… ou utiliser le nouveau.",
  },
  {
    number: "5.",
    img: moiImg,
    alt: "Le MOI — le SOI comme médiateur intérieur",
    imgBg: "#f0ede8",
    title: "Donner au SOI le rôle de médiateur intérieur",
    content:
      "Chacune de nos parts défend des besoins fondamentaux (la santé, la douceur, la sécurité matérielle, affective, le sens, la justice, l'évolution etc…) et cela génère notre conflit intérieur où chacune tire la couverture de son côté du lit sans qu'il y ait une écoute globale des différents besoins qui amènerait à une stratégie commune. Le Soi va petit à petit prendre la place de ce médiateur et transformer le conflit intérieur en dialogue et en évolution.",
  },
  {
    number: "6.",
    img: humbleImg,
    alt: "L'humble devant le miroir — remonter l'estime de soi",
    imgBg: "#f0ede8",
    title: "Remonter l'estime de soi",
    content:
      "Au fil du processus, quelque chose se transforme profondément. La personne commence à se réconcilier avec elle-même, à avoir de la compassion et du respect pour ses parts aussi maladroites soient-elles. Le fait de voir des choses changer redonne de l'espoir et du courage. Elle peut alors se reconnecter à ce qu'elle veut réellement vivre dans sa vie actuelle. Et pouvoir se dire : « Malgré les épreuves, cette vie a du sens. »",
  },
  {
    number: "7.",
    img: butterflyImg,
    alt: "Le papillon — grandir et évoluer",
    imgBg: "#f0ede8",
    title: "Grandir et évoluer",
    content:
      "Quand nos parts nous limitent, notre évolution se bloque, et ce sont souvent les déséquilibres et les problèmes qui prennent le dessus. La guérison des blessures pourrait se résumer ainsi : « aider nos parts à grandir et à évoluer ». Lorsque nous accompagnons nos parts dans cette croissance, c'est toute notre évolution qui redémarre. On se sent plus vivant, et un sentiment de liberté accompagne ce changement de paradigme.",
  },
];

export default function DPAETherapy() {
  const { ref, inView } = useInView();

  return (
    <section
      id="therapie-dpec"
      className="py-20 lg:py-28 bg-white"
      data-testid="section-dpec-therapy"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div
          ref={ref}
          className="transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)" }}
        >
          {/* Section header */}
          <div className="text-center mb-6">
            <span className="inline-block text-[#E86B0A] text-sm font-semibold tracking-widest uppercase mb-3">
              Méthode thérapeutique
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800"
              style={{ fontFamily: "Atma, sans-serif" }}
            >
              La thérapie DPEC
            </h2>
            <div className="mt-4 mx-auto w-16 h-1 bg-[#E86B0A] rounded-full" />
          </div>

          {/* Intro */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-gray-600 text-lg leading-relaxed">
              La thérapie Déprogrammation Psycho Émotionnelle et Comportementale a pour mission de créer
              une transformation profonde de notre état d'être, de notre comportement et de nos croyances.
              Son intention est de permettre au{" "}
              <span className="font-semibold text-[#E86B0A]">« SOI »</span>, de guérir le{" "}
              <span className="font-semibold text-gray-800">« MOI »</span> blessé, divisé et inconscient
              pour retrouver l'unité. (voir différence entre le Moi et le Soi).
            </p>
          </div>

          {/* Steps — image left, text right, hover card effect */}
          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-0 items-stretch border border-gray-200 rounded-2xl overflow-hidden cursor-default transition-all duration-300 hover:border-[#E86B0A] hover:shadow-lg hover:-translate-y-0.5"
                data-testid={`dpae-step-${step.number.replace(".", "")}`}
              >
                {/* Image panel */}
                <div
                  className="flex items-center justify-center transition-colors duration-300 group-hover:brightness-105"
                  style={{ background: step.imgBg, minHeight: "150px" }}
                >
                  <img
                    src={step.img}
                    alt={step.alt}
                    className="w-full h-40 object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Text panel */}
                <div className="p-6 transition-colors duration-300 group-hover:bg-orange-50/40">
                  {/* Orange accent bar — appears on hover */}
                  <div className="w-0 group-hover:w-10 h-0.5 bg-[#E86B0A] mb-3 transition-all duration-300 rounded-full" />
                  <h3
                    className="text-lg font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-200"
                    style={{ fontFamily: "Atma, sans-serif" }}
                  >
                    <span className="text-[#E86B0A] mr-1">{step.number}</span>
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {step.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Closing quote */}
          <div className="mt-14">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-8 sm:p-10 border border-orange-200 text-center">
              <div className="text-5xl text-[#E86B0A] font-serif mb-4 leading-none">"</div>
              <p className="text-gray-700 text-lg leading-relaxed italic font-medium">
                Le but sincère de cet outil thérapeutique est simple : Libérer les fardeaux des parts en
                souffrance, retrouver la liberté d'être, faire que les personnes qui traversent ce processus
                puissent sentir qu'il y a eu <strong>un avant et un après la thérapie DPEC</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
