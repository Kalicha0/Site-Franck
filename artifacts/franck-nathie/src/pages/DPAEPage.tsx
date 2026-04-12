import { useRef, useEffect, useState } from "react";
import DPAETherapy from "@/components/sections/DPAETherapy";

function useInView(threshold = 0.12) {
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

const approaches = [
  {
    label: "IFS — Internal Family System",
    author: "Richard Schwartz",
    text: "Avec son approche révolutionnaire qui met en évidence les multiples aspects et parts qui composent la psyché humaine et des outils de libération des souffrances et de reprogrammation des croyances profondes.",
  },
  {
    label: "Les 12 blessures",
    author: "Lise Bourbeau",
    text: "Une approche que j'ai poussée beaucoup plus loin avec 12 blessures et des exercices pratiques de déprogrammation des croyances et des comportements. Son travail était important pour qu'il puisse évoluer de manière plus complexe — voir les 12 blessures et les parts que cela crée en fonction de si l'on a pu faire face, fuir, ou qu'on a dû se soumettre.",
  },
  {
    label: "La Communication transformative",
    author: "Lionel Santucci",
    text: "Avec ses exercices de transformation très puissants que je n'ai retrouvés dans aucune autre thérapie et qui sont fondamentaux pour la reconquête de l'estime de soi.",
  },
  {
    label: "La Communication non violente (CNV)",
    author: "Marshal Rosenberg",
    text: "Elle permet d'arrêter de déformer la réalité avec nos interprétations et nos jugements, de faire un lien entre les faits que l'on observe et ce que l'on ressent, de lier ces sentiments à nos besoins fondamentaux (et pas nos désirs), et de pouvoir faire des demandes claires et négociables. J'ai poussé beaucoup plus loin la CNV qui est devenue la méthode CAPT (Communication Authentique, Profonde et Transformative) afin de changer notre mode relationnel dès que la tension arrive, et jusqu'à ce que les conflits soient terminés et transformés en évolution.",
  },
];

export default function DPAEPage() {
  const heroAnim = useInView(0);
  const introAnim = useInView();
  const approachesAnim = useInView();
  const closingAnim = useInView();

  return (
    <main data-testid="page-dpae">

      <section className="relative bg-[#E86B0A] overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #fff 0%, transparent 60%)" }}
        />
        <div
          ref={heroAnim.ref}
          className="max-w-7xl mx-auto px-6 py-16 text-center transition-all duration-700"
          style={{ opacity: heroAnim.inView ? 1 : 0, transform: heroAnim.inView ? "translateY(0)" : "translateY(30px)" }}
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-orange-100 mb-3">
            Méthode thérapeutique
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold leading-tight text-white"
            style={{ fontFamily: "Atma, sans-serif" }}
          >
            La DPEC, c'est quoi&nbsp;?
          </h1>
          <p className="mt-4 text-lg text-orange-100 font-light">
            Déprogrammation Psycho-Émotionnelle et Comportementale
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-8 bg-white"
          style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }}
        />
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <div
          ref={introAnim.ref}
          className="transition-all duration-700"
          style={{ opacity: introAnim.inView ? 1 : 0, transform: introAnim.inView ? "translateY(0)" : "translateY(40px)" }}
        >
          <h2
            className="text-3xl font-bold text-gray-800 mb-6 text-center"
            style={{ fontFamily: "Atma, sans-serif" }}
          >
            Origine de la DPEC
          </h2>
          <div className="w-16 h-1 bg-[#E86B0A] rounded-full mx-auto mb-10" />
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
            Cette méthode thérapeutique est la fusion de plusieurs approches de guérison des blessures
            intérieures et d'outils de transformation que j'ai pu expérimenter en tant que patient, puis
            en tant qu'accompagnant.
          </p>
        </div>
      </section>

      <section className="bg-[#f0ede8] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div
            ref={approachesAnim.ref}
            className="transition-all duration-700"
            style={{ opacity: approachesAnim.inView ? 1 : 0, transform: approachesAnim.inView ? "translateY(0)" : "translateY(40px)" }}
          >
            <h2
              className="text-2xl font-bold text-gray-800 mb-10 text-center"
              style={{ fontFamily: "Atma, sans-serif" }}
            >
              Les approches qui la composent
            </h2>

            <div className="space-y-6">
              {approaches.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E86B0A] text-white text-sm font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                    <div>
                      <p
                        className="text-xl font-bold text-gray-800"
                        style={{ fontFamily: "Atma, sans-serif" }}
                      >
                        {item.label}
                      </p>
                      <p className="text-sm text-[#E86B0A] font-semibold mt-0.5">{item.author}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed pl-12">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <div
          ref={closingAnim.ref}
          className="transition-all duration-700"
          style={{ opacity: closingAnim.inView ? 1 : 0, transform: closingAnim.inView ? "translateY(0)" : "translateY(40px)" }}
        >
          <blockquote className="border-l-4 border-[#E86B0A] pl-8 py-4">
            <p className="text-xl text-gray-700 leading-relaxed italic">
              Mis bout à bout, cela crée un ensemble d'outils qui vont dans le même sens, évoluent,
              amènent la conscience et le respect, permettent et autorisent l'imperfection pour qu'elle
              se réajuste d'elle-même.
            </p>
          </blockquote>
        </div>
      </section>

      <DPAETherapy />

    </main>
  );
}
