import { useRef, useEffect, useState } from "react";
import partsProtectricesImg from "@assets/Les_parts_3_types_porte_textes_remis_dans_l'ordre_1775503205057.jpg";
import dechargerImg from "@assets/@_3_les_parts_exilés_blessés_-_double_BD_1775504573602.png";
import actualiserImg from "@assets/les_parts_déchargés_-_le_nettoyeur_rangeur_1775504625005.png";
import apprendreImg from "@assets/unnamed_1775504758913.png";
import peurImg from "@assets/les_parts_déchargés_-Force_fragile_3_1_1775504947580.png";

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

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)" }}
    >
      {children}
    </div>
  );
}

const steps = [
  {
    number: "1.",
    img: dechargerImg,
    alt: "Décharger les masses émotionnelles — les parts blessées dans leurs tours",
    imgBg: "#f0ede8",
    title: `Décharger les masses émotionnelles "fardeaux" de nos parts`,
  },
  {
    number: "2.",
    img: actualiserImg,
    alt: "Actualiser les croyances — le nettoyeur rangeur avec poubelle et archives",
    imgBg: "#f0ede8",
    title: "Actualiser les croyances des parts (qui sont souvent immatures et obsolètes).",
  },
  {
    number: "3.",
    img: apprendreImg,
    alt: "Apprendre de nouveaux comportements — l'exploratrice avec son couteau suisse",
    imgBg: "#f0ede8",
    title: "Apprendre de nouveaux comportements afin de créer un choix",
  },
  {
    number: "4.",
    img: peurImg,
    alt: "Ne plus avoir peur — la force fragile, rose et épée",
    imgBg: "#f0ede8",
    title: "Ne plus avoir peur de la situation que nos parts essaient d'éviter du fait que l'on sait à présent y réagir de manière juste et équilibrée.",
  },
];

export default function HealingProcess() {
  const { ref, inView } = useInView();

  return (
    <section
      id="comment-guerir"
      className="py-20 lg:py-28 bg-white"
      data-testid="section-healing-process"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8">

        {/* Section header */}
        <AnimSection>
          <div className="text-center mb-10">
            <span className="inline-block text-[#E86B0A] text-sm font-semibold tracking-widest uppercase mb-3">
              Guérison
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800"
              style={{ fontFamily: "Atma, sans-serif" }}
            >
              Comment une blessure intérieure guérit
            </h2>
            <div className="mt-4 mx-auto w-16 h-1 bg-[#E86B0A] rounded-full" />
          </div>
        </AnimSection>

        {/* Intro paragraph */}
        <AnimSection>
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto text-center mb-10">
            Nos parts blessées sont donc des parts de nous qui sont restées figées dans le passé et sont
            protégées par des parts gardiennes qui nous contrôlent afin d'éviter de revivre les traumatismes.
          </p>
        </AnimSection>

        {/* Main image */}
        <AnimSection>
          <div className="flex justify-center mb-10">
            <img
              src={partsProtectricesImg}
              alt="Les parts protectrices — Je contrôle, Je fuis, Je me soumets"
              className="max-w-full"
              style={{ maxHeight: 320, objectFit: "contain" }}
            />
          </div>
        </AnimSection>

        {/* Second paragraph before steps */}
        <AnimSection>
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto text-center mb-10">
            La guérison consiste à permettre la digestion de ce qui était indigeste et à aider les parts à
            grandir et à comprendre ce qui leur est arrivé, et cela se passe par différentes phases.
          </p>
        </AnimSection>

        {/* 4 steps — same card layout as DPAETherapy */}
        <div
          ref={ref}
          className="transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)" }}
        >
          <div className="space-y-4 mb-10">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-0 items-stretch border border-gray-200 rounded-2xl overflow-hidden cursor-default transition-all duration-300 hover:border-[#E86B0A] hover:shadow-lg hover:-translate-y-0.5"
                data-testid={`healing-step-${step.number.replace(".", "")}`}
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
                <div className="p-6 flex items-center transition-colors duration-300 group-hover:bg-orange-50/40">
                  <div>
                    <div className="w-0 group-hover:w-10 h-0.5 bg-[#E86B0A] mb-3 transition-all duration-300 rounded-full" />
                    <h3
                      className="text-lg font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-200"
                      style={{ fontFamily: "Atma, sans-serif" }}
                    >
                      <span className="text-[#E86B0A] mr-1">{step.number}</span>
                      {step.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing paragraph */}
        <AnimSection>
          <div className="max-w-3xl mx-auto bg-[#f0ede8] rounded-2xl p-8">
            <p className="text-gray-700 text-lg leading-relaxed">
              Cela a l'air simple résumé comme ça, mais le processus de guérison global qui nous permet de
              retrouver un équilibre entre toutes nos parts peut prendre du temps, car nos parts blessées sont
              souvent protégées par plusieurs parts protectrices et une part protectrice protège souvent plusieurs
              parts blessées.
            </p>
          </div>
        </AnimSection>

      </div>
    </section>
  );
}
