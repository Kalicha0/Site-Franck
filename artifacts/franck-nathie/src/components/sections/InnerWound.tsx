import { useRef, useEffect, useState } from "react";
import rejetImg from "@assets/2_les_blessures_-_Rejet_1774979777263.png";
import violeeImg from "@assets/les_parts_exilé_blessé_-la_violé2_1774979777259.png";
import humiliationImg from "@assets/6_les_blessures_-_Humiliation_1774979777264.png";

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

const personalityExamples = [
  "lunatique", "timide", "claustrophobe", "colérique", "trop gentil", "fumeur", "peureux", "bordélique", "perfectionniste", "alcoolique"
];

const blessures = [
  {
    img: rejetImg,
    alt: "Blessure de rejet — Dégage!",
    title: "Le Rejet",
    desc: "Être exclu, mis à l'écart, ignoré par les autres — une blessure qui laisse une empreinte profonde sur notre sentiment d'appartenance.",
  },
  {
    img: violeeImg,
    alt: "La blessure de trahison — la violée",
    title: "La Trahison",
    desc: "Une douleur profonde d'avoir été blessé par quelqu'un de confiance, qui pousse à se replier sur soi pour se protéger.",
  },
  {
    img: humiliationImg,
    alt: "Blessure d'humiliation",
    title: "L'Humiliation",
    desc: "Être ridiculisé, rabaissé ou moqué — une honte intériorisée qui colore durablement toutes nos interactions sociales.",
  },
];

export default function InnerWound() {
  const { ref, inView } = useInView();

  return (
    <section
      id="blessure-interieure"
      className="py-20 lg:py-28 bg-gray-50"
      data-testid="section-inner-wound"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div
          ref={ref}
          className="transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)" }}
        >
          {/* Section header */}
          <div className="text-center mb-14">
            <span className="inline-block text-[#E86B0A] text-sm font-semibold tracking-widest uppercase mb-3">
              Comprendre
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800"
              style={{ fontFamily: "Atma, sans-serif" }}
            >
              Qu'est-ce qu'une blessure intérieure ?
            </h2>
            <div className="mt-4 mx-auto w-16 h-1 bg-[#E86B0A] rounded-full" />
          </div>

          {/* Main text — full width */}
          <div className="max-w-4xl mx-auto space-y-5 mb-14">
            <p className="text-gray-600 leading-relaxed text-lg">
              Une blessure intérieure est un choc émotionnel, vécu souvent dans l'enfance (mais qui peut aussi survenir à tout âge), qui ne va pas être intégré et digéré comme une expérience d'évolution. Au lieu de cela, le choc va se cristalliser en nous comme une expérience négative que l'on cherche à fuir et à éviter. La part de nous touchée, trop sensible, est alors envoyée aux oubliettes dans notre subconscient, elle ne peut plus grandir, elle reste dans le passé…
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              Par exemple, le fait d'avoir failli se noyer peut laisser une trace qui nous fait avoir peur de l'eau 30 ans plus tard, alors qu'on a pied et qu'il n'y a pas de danger. C'est dans notre <strong>chair</strong> que les traumas restent bloqués sous forme de tensions sourdes.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              La fixation ou cristallisation des émotions dans le corps est une face de la pièce.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              L'autre face est <strong>la croyance</strong> qui va se rattacher à l'expérience douloureuse. Nous allons alors chercher à comprendre, à rationaliser le traumatisme pour essayer de lui donner un sens afin d'accepter ou de rejeter l'expérience. Si l'on accepte, on aura tendance à développer des parts soumises et résignées à revivre le trauma. Si l'on a rejeté l'expérience, on aura tendance à développer des parts fuyantes ou combatives pour éviter de la revivre.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              Il en résulte souvent un comportement que nous finissons par considérer comme notre{" "}
              <strong>personnalité</strong> : je suis{" "}
              {personalityExamples.join(", ")}, etc.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              Jusqu'au jour où les conséquences de notre personnalité arrivent, la maladie, les conflits, la dépression, les séparations ou les accidents viennent nous rappeler qu'il existe{" "}
              <strong>au fond de nous des problèmes non résolus</strong>, et que cette « personnalité de survie »
              commence à nous peser et à nous empêcher d'évoluer.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              C'est généralement lorsque la douleur physique et psychique devient trop insupportable que l'on décide d'aller voir un thérapeute.
            </p>
          </div>

          {/* 3 blessure illustrations */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {blessures.map((b) => (
              <div key={b.title} className="flex flex-col items-center text-center">
                <div
                  className="w-full rounded-2xl overflow-hidden mb-5 flex items-center justify-center"
                  style={{ background: "#f0ede8", minHeight: "220px" }}
                >
                  <img
                    src={b.img}
                    alt={b.alt}
                    className="w-full h-56 object-contain p-4"
                  />
                </div>
                <h4
                  className="font-bold text-gray-800 text-xl mb-2"
                  style={{ fontFamily: "Atma, sans-serif" }}
                >
                  {b.title}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
