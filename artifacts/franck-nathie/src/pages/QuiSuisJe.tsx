import { useRef, useEffect, useState } from "react";
import portraitImg from "@assets/trombine_franck_rt_1775432409703.jpg";
import lionelImg from "@assets/LIONNEL_ET_FRANCK_3_1775432412430.jpg";

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

const methodsTested = [
  "EMDR",
  "EFT",
  "Kinésiologie",
  "Tipi",
  "The Work",
  "Guérison des blessures (Daniel Maurin / Lise Bourbeau)",
  "Chamanisme divers avec et sans drogue",
  "Communication transformative",
  "IFS : Internal Family System",
];

const formations = [
  {
    title: "IFS Internal Family System",
    detail:
      "Formé par l'association IFS France et Vinciane Van Houtrive / Bernard Piaget, Isabelle Desplat depuis 2019",
    img: null,
    imgAlt: "",
  },
  {
    title: "Guérison des blessures intérieures",
    detail: "Depuis 2005 avec Jean Nahimana, Daniel Maurin, Lise Bourbeau",
    img: null,
    imgAlt: "",
  },
  {
    title: "Médiation et gestion positive du conflit",
    detail:
      "Formé par le MAN (Mouvement pour une alternative non violente) et médiation CNV",
    img: null,
    imgAlt: "",
  },
  {
    title: "La Communication transformative",
    detail: "Formé par Lionel Santucci de 2008 à 2020",
    img: lionelImg,
    imgAlt: "Franck Nathie avec Lionel Santucci, formateur en Communication transformative",
  },
  {
    title: "La Communication non violente (CNV)",
    detail:
      "Formé de 2005 à 2019 avec Jean Nahimana, Isabelle Padovani, Godfrey Spencer, Thomas D'Ansembourg",
    img: null,
    imgAlt: "",
  },
];

export default function QuiSuisJe() {
  const heroAnim = useInView(0);
  const introAnim = useInView();
  const bioAnim = useInView();
  const methodsAnim = useInView();
  const formationsAnim = useInView();
  const ctaAnim = useInView();

  return (
    <main data-testid="page-qui-suis-je">

      <section className="relative bg-[#E86B0A] overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #fff 0%, transparent 60%)" }}
        />
        <div
          ref={heroAnim.ref}
          className="max-w-7xl mx-auto px-6 py-16 flex justify-center transition-all duration-700"
          style={{ opacity: heroAnim.inView ? 1 : 0, transform: heroAnim.inView ? "translateY(0)" : "translateY(30px)" }}
        >
          <h1
            className="text-5xl md:text-6xl font-bold leading-tight text-white text-center"
            style={{ fontFamily: "Atma, sans-serif" }}
          >
            Qui suis-je&nbsp;?
          </h1>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-8 bg-white"
          style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }}
        />
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div
          ref={introAnim.ref}
          className="grid md:grid-cols-2 gap-12 items-center transition-all duration-700"
          style={{ opacity: introAnim.inView ? 1 : 0, transform: introAnim.inView ? "translateY(0)" : "translateY(40px)" }}
        >
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-72 md:w-96 rounded-3xl overflow-hidden shadow-xl" style={{ height: "420px" }}>
                <img
                  src={portraitImg}
                  alt="Portrait de Franck Nathie"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#E86B0A] text-white rounded-2xl px-5 py-3 shadow-lg">
                <p className="text-xs font-semibold tracking-wide uppercase">Thérapeute DPEC</p>
                <p className="text-sm font-bold" style={{ fontFamily: "Atma, sans-serif" }}>
                  Franck Nathie
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5 text-gray-700 leading-relaxed text-lg">
            <p className="text-2xl font-bold text-gray-800" style={{ fontFamily: "Atma, sans-serif" }}>
              Je ne suis pas parti dans la vie avec{" "}
              <span className="text-[#E86B0A]">« un bon jeu de cartes ».</span>
            </p>
            <p>
              Dyslexique, dysorthographique, dyspraxique, trouble de l'attention TDHA, j'ai passé mon
              enfance en banlieue parisienne dans une ambiance de violence, de vol, de drogue, de mensonge.
              Ma famille était assez conflictuelle, il n'y avait pas beaucoup d'écoute et les conflits avec
              mon grand frère étaient permanents et violents (j'étais son souffre-douleur). Mes difficultés
              de dyslexique m'étaient rappelées tous les jours, à la maison comme à l'école. J'avais une
              estime de moi très basse et des troubles de la concentration sévères.
            </p>
            <p>
              Petit, j'avais le sentiment d'être un nul, d'être quelqu'un de mauvais et une colère profonde
              contre moi et l'humanité tout entière prenait de l'ampleur chaque année.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f0ede8] py-14">
        <div
          ref={bioAnim.ref}
          className="max-w-4xl mx-auto px-6 space-y-6 text-gray-700 leading-relaxed text-lg transition-all duration-700"
          style={{ opacity: bioAnim.inView ? 1 : 0, transform: bioAnim.inView ? "translateY(0)" : "translateY(40px)" }}
        >
          <p>
            Suite à mes problèmes de motricité, j'ai découvert vers 17 ans mon arythmie (liée à la
            dyspraxie) en prenant des cours de percussion. Le fait de faire des percussions a débloqué mes
            problèmes psychomoteurs, m'a permis d'améliorer ma concentration, mes notes à l'école et mon
            estime de moi. J'ai découvert plus tard que le développement psychomoteur était fondamental pour
            tout le reste du corps et de l'esprit, d'autant plus pour ceux qui ont des difficultés
            (dyslexique, dyspraxique, bègue) et qui se sentent nuls.
          </p>
          <p>
            À partir de 2002 (27 ans), j'ai commencé des thérapies de guérison car je voulais vivre en
            écovillage et je savais que mon comportement conflictuel et blessé ne collerait pas à mes rêves.
          </p>
          <p>
            Je n'imaginais pas que la guérison de ces blessures changerait toute ma vie, la vision que
            j'avais de moi-même et des autres. Que j'écrirais une encyclopédie sur la permaculture, dont un
            livre chez Larousse, et que je créerais une maison d'édition, prouvant ainsi que la dyslexie et
            la dysorthographie n'étaient pas insurmontables.
          </p>
          <p>
            Moi qui étais si conflictuel, j'allais devenir médiateur et former plein de gens à la gestion
            positive des conflits. Que je réaliserais mes rêves de gagner ma vie en cohérence avec une
            éthique écologique et humaniste.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div
          ref={methodsAnim.ref}
          className="transition-all duration-700"
          style={{ opacity: methodsAnim.inView ? 1 : 0, transform: methodsAnim.inView ? "translateY(0)" : "translateY(40px)" }}
        >
          <h2
            className="text-3xl font-bold text-gray-800 mb-3 text-center"
            style={{ fontFamily: "Atma, sans-serif" }}
          >
            J'ai un peu tout testé…
          </h2>
          <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto">
            En termes de guérison des blessures et de déprogrammation, j'ai exploré de nombreuses approches :
          </p>

          <div className="grid grid-cols-3 gap-3 mb-10 max-w-3xl mx-auto">
            {methodsTested.map((method) => (
              <span
                key={method}
                className="flex items-center justify-center text-center bg-orange-50 border border-orange-200 text-[#E86B0A] font-medium px-4 py-2.5 rounded-full text-sm"
              >
                {method}
              </span>
            ))}
          </div>

          <div className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              Dans tous ces tests, certains ont eu un effet très puissant, d'autres n'avaient aucun effet sur
              moi.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              Je me suis formé aux techniques qui avaient eu le plus d'effet et j'ai fusionné plusieurs
              méthodes de guérison et développé des outils comme le{" "}
              <strong className="text-[#E86B0A]">jeu GAI-RIRE</strong> et la{" "}
              <strong className="text-[#E86B0A]">méthode CAPT</strong> qui s'appuient sur plus de quinze
              années de pratique.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              J'anime, depuis 2014, des stages sur la synergie humaine et la guérison des blessures intérieures.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f0ede8] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div
            ref={formationsAnim.ref}
            className="transition-all duration-700"
            style={{ opacity: formationsAnim.inView ? 1 : 0, transform: formationsAnim.inView ? "translateY(0)" : "translateY(40px)" }}
          >
            <h2
              className="text-3xl font-bold text-gray-800 mb-10 text-center"
              style={{ fontFamily: "Atma, sans-serif" }}
            >
              Je me suis formé avec&nbsp;:
            </h2>
            <div className="space-y-5">
              {formations.map((f, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col sm:flex-row items-stretch transition-all duration-300 hover:border-[#E86B0A] hover:shadow-lg hover:-translate-y-0.5 cursor-default">
                  {/* Image ou emplacement vide */}
                  <div className="flex-shrink-0 sm:w-48 w-full h-40 sm:h-auto bg-gray-100 flex items-center justify-center relative overflow-hidden">
                    {f.img ? (
                      <img
                        src={f.img}
                        alt={f.imgAlt}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <rect x="3" y="3" width="18" height="18" rx="2" strokeLinejoin="round"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <path strokeLinejoin="round" d="M21 15l-5-5L5 21"/>
                        </svg>
                        <span className="text-xs font-medium tracking-wide">Photo à venir</span>
                      </div>
                    )}
                  </div>
                  {/* Texte */}
                  <div className="p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#E86B0A] flex-shrink-0" />
                      <p className="font-bold text-gray-800 text-base" style={{ fontFamily: "Atma, sans-serif" }}>{f.title}</p>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed pl-5">{f.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 text-center bg-white">
        <div
          ref={ctaAnim.ref}
          className="transition-all duration-700"
          style={{ opacity: ctaAnim.inView ? 1 : 0, transform: ctaAnim.inView ? "translateY(0)" : "translateY(40px)" }}
        >
          <h2
            className="text-3xl font-bold text-gray-800 mb-4"
            style={{ fontFamily: "Atma, sans-serif" }}
          >
            Envie d'en savoir plus ?
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            N'hésitez pas à me contacter pour en discuter ou pour prendre rendez-vous.
          </p>
          <a
            href="mailto:Contact@Franck-Nathie.com"
            className="inline-block bg-[#E86B0A] text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-[#d05e08] transition-colors shadow-md"
          >
            Prendre contact
          </a>
        </div>
      </section>

    </main>
  );
}
