import { useRef, useEffect, useState } from "react";
import moiImg from "@assets/@_Le_MOI__1774979777262.png";
import soiImg from "@assets/Le_SOI__1775654510532.png";
import moiAttitudeImg from "@assets/Le_moi_et_attitude_1775654363666.png";
import soiAttitudeImg from "@assets/Le_soi_et_attitude_1775654378772.png";
import bebeImg from "@assets/illustration-bébé_1775654741743.png";
import besoinsImg from "@assets/@_1_BESOINS_1775654787992.png";
import boussoleImg from "@assets/les_parts_déchargés_-_la_boussole_interne_1775654811628.png";

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

export default function MoiVsSoi() {
  const { ref, inView } = useInView();

  return (
    <section
      id="moi-vs-soi"
      className="py-20 lg:py-28 bg-gray-50"
      data-testid="section-moi-vs-soi"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div
          ref={ref}
          className="transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)" }}
        >
          {/* Section header */}
          <div className="text-center mb-10">
            <span className="inline-block text-[#E86B0A] text-sm font-semibold tracking-widest uppercase mb-3">
              Concepts fondamentaux
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800"
              style={{ fontFamily: "Atma, sans-serif" }}
            >
              Différence entre le MOI et le SOI
            </h2>
            <div className="mt-4 mx-auto w-16 h-1 bg-[#E86B0A] rounded-full" />
          </div>

          {/* Cards — vertical stack */}
          <div className="space-y-8 mb-14">

            {/* LE MOI */}
            <div className="group bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#E86B0A] shadow-sm transition-colors duration-300">
              <div className="p-6 flex justify-center">
                <img
                  src={moiImg}
                  alt="Le MOI — les parts multiples"
                  className="w-full max-w-sm object-contain"
                  style={{ maxHeight: "320px" }}
                />
              </div>
              <div className="p-8 space-y-4">
                <div className="flex flex-col items-center gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-gray-800 text-center" style={{ fontFamily: "Atma, sans-serif" }}>
                    Le MOI
                  </h3>
                  <div className="w-16 group-hover:w-24 h-1 bg-[#E86B0A] rounded-full transition-all duration-300" />
                </div>

                <p className="text-gray-600 text-lg leading-relaxed">
                  Les découvertes de <strong>Richard Schwartz</strong>, père de la thérapie IFS , sont, à la fois, d'avoir mis en évidence que nous sommes tous composés de parts qui ont une existence propre à l'intérieur de nous, mais surtout que ces parts ont des âges, des croyances, des souffrances, des aspirations et des besoins qui leur sont propres et que quand on leur parle, elles répondent avec leur âge et leur conscience. Ces différences de maturité et de conscience dans le même être créent ce que l'on appelle communément « le conflit intérieur ».
                </p>
                <p className="text-gray-500 text-base italic border-l-4 border-[#E86B0A] pl-4">
                  Freud avait déjà à son époque identifié un moi, un sur-moi et un sous-moi qu'il appelait (le ça). Cela fait déjà 3 moi !, c'est donc un nous ?
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Dans les faits, entre nos parts d'enfant blessées, nos parts protectrices diverses qui nous amènent à contrôler, à fuir ou à nous soumettre, nos parts spirituelles, féminines, masculines, séductrices, parents etc… C'est tout un village ou une famille nombreuse qu'il y a à l'intérieur de nous que nous appelons à tort "MOI" alors que l'on devrait plutôt l'appeler ça un "Nous" .
                </p>

                <h4 className="text-base font-semibold text-gray-700 italic">
                  Dissoudre l'égo pour se libérer de son emprise, bonne ou mauvaise idée ?
                </h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Beaucoup de théories du développement personnel et de "thérapies" disent que c'est notre ego qui nous limite (ego voulant dire MOI en Latin). Mais lutter contre son ego, essayer de le faire disparaître est une tâche perdue d'avance, parce que ce MOI est composé de parts de nous qu'on ne peut pas faire disparaître ni éliminer. Et les parts qui nous dérangent le plus, sont en général infantiles et en souffrance.
                </p>
                <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-gray-400">
                  <p className="text-gray-600 leading-relaxed text-sm italic">
                    Dissoudre son ego reviendrait donc à essayer de faire taire des enfants qui hurlent au fond de nous parce qu'ils nous dérangent… Sachant que ces enfants, c'est nous, et que s'ils hurlent, c'est justement parce qu'on les ignore… Et nous, au lieu de les consoler et de les aider à grandir, on essaie de les faire disparaître. Vu comme ça, certaines approches thérapeutiques sont, non seulement inefficaces, mais peuvent être très dangereuses, car les parts de nous en souffrance ne disparaissent jamais, elles nous rattrapent toujours et se transforment en maladies physiques et en problèmes divers, jusqu'à ce que enfin quelqu'un leur accorde de l'attention et leur donne l'amour qu'elles n'ont jamais reçu. Et si ces parts de nous restent dans l'oubli, étant liées au tout que nous sommes, si elles ont envie de mourir, c'est le système complet qui est en danger et les parts de nous blessées deviennent des cancers, des accidents, des maladies diverses.
                  </p>
                </div>
              </div>
            </div>

            {/* LE SOI */}
            <div className="group bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#E86B0A] shadow-sm transition-colors duration-300">
              <div className="p-6 flex justify-center">
                <img
                  src={soiImg}
                  alt="Le SOI — cœur, œil et conscience"
                  className="w-full max-w-xs object-contain"
                  style={{ maxHeight: "340px" }}
                />
              </div>
              <div className="p-8 space-y-4">
                <div className="flex flex-col items-center gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-gray-800 text-center" style={{ fontFamily: "Atma, sans-serif" }}>
                    Le SOI
                  </h3>
                  <div className="w-16 group-hover:w-24 h-1 bg-[#E86B0A] rounded-full transition-all duration-300" />
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Le Soi (self en anglais) peut être résumé à l'essence de l'être, c'est l'observateur qu'il y a en nous et qui incarne toutes les qualités qu'on retrouve chez les grands sages (présence, patience, bienveillance, compassion, calme, confiance, courage, etc…)
                </p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Ce n'est pas une part de nous, mais plutôt une essence en nous qui incarne la conscience. Certains thérapeutes IFS décrivent le Self comme un état intérieur calme et centré en lien avec notre être profond.
                </p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Chacune de nos parts contient un peu du soi à l'origine, mais les traumatismes, la peur, l'agitation, les comportements appris de nos parents vont petit à petit ensevelir le Soi sous des couches de Moi jusqu'à le faire disparaître et qu'il n'y ait plus que le conflit intérieur qui en résulte.
                </p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  En effet, quand nous étions petits, le soi et la conscience n'étaient pas très « puissants » face à l'inconscience de nos parents, de la société, de notre fratrie.
                </p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Le Soi conscient était même une source de douleur potentielle, car il nous permettait de percevoir plus finement la souffrance de notre entourage et la nôtre. C'est un peu comme si on avait un « super nez très fin » alors qu'on vit dans la puanteur, il serait plus logique de ne plus avoir d'odorat... D'ailleurs, des études faites sur les psychopathes tueurs en série qui n'ont aucune compassion, ont démontré que la zone du cerveau qui correspond à l'empathie et la compassion était totalement inactive chez eux et que les traumatismes entre 0 et 7 ans éteignaient ces zones du cerveau pour permettre la survie.
                </p>
                <div className="flex justify-center py-2">
                  <img
                    src={bebeImg}
                    alt="Illustration d'un bébé"
                    className="w-44 object-contain"
                  />
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  C'est donc logique que le SOI disparaisse petit à petit sous les couches successives de souffrance incomprise que nous vivons. C'est une question de survie.
                </p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Comme on peut le voir avec la pyramide de Maslow, on privilégiera toujours un besoin supérieur à un besoin inférieur (l'air est plus vital que l'eau, l'eau est plus vital que la nourriture, manger est plus vital qu'avoir des relations etc.). Le Soi devient alors secondaire pour la survie d'un enfant et se fait petit à petit ensevelir sous les parts.
                </p>
                <div className="flex justify-center py-2">
                  <img
                    src={besoinsImg}
                    alt="Pyramide des besoins — de Survivre à Être"
                    className="w-full max-w-sm object-contain rounded-xl"
                  />
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Le SOI ou self est la seule chose en nous qui puisse guérir nos parts blessées, les aider à grandir et les reprogrammer. Le travail de la thérapie commence donc par une reconnexion au SOI dans un premier temps, puis à une connexion du Soi avec notre système de parts, le MOI. Et le thérapeute ne fait qu'accompagner ce processus d'auto-guérison grâce à son propre self.
                </p>
                <div className="flex justify-center py-2">
                  <img
                    src={boussoleImg}
                    alt="La boussole interne — le Soi déchargé"
                    className="w-48 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Les attitudes du Soi et du Moi — sans bordure, images juste après le titre */}
          <div className="pt-8">
            <h3
              className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center"
              style={{ fontFamily: "Atma, sans-serif" }}
            >
              Les attitudes du Soi ou « Self » et du Moi
            </h3>
            <div className="flex justify-center mb-8">
              <div className="w-16 h-1 bg-[#E86B0A] rounded-full" />
            </div>

            {/* Images en premier */}
            <div className="grid grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
              <div className="flex justify-center">
                <img
                  src={soiAttitudeImg}
                  alt="Les attitudes du SOI"
                  className="w-full object-contain rounded-xl"
                />
              </div>
              <div className="flex justify-center">
                <img
                  src={moiAttitudeImg}
                  alt="Les attitudes des parts du MOI"
                  className="w-full object-contain rounded-xl"
                />
              </div>
            </div>

            {/* Texte en bas */}
            <p className="text-gray-600 leading-relaxed mb-6 max-w-4xl mx-auto text-center">
              Richard Schwartz, après avoir travaillé pendant plus de vingt ans dans le but d'aider ses patients à atteindre une restauration du SOI, il a passé en revue un certain nombre de caractéristiques communes et établi une liste non limitative de qualités qui caractérisent le soi, qui commencent toutes par la lettre C — les 8 C : curiosité, calme, clarté, compassion, confiance, créativité, courage et le sens de connexion.
            </p>
            <p className="text-gray-600 leading-relaxed max-w-4xl mx-auto">
              Lors des séances, le thérapeute va chercher à créer une connection entre le SOI de la personne et une de ses parts. Et en fonction de l'attitude que le thérapeute observe dans cette connexion, (calme, curiosité, compassion etc) ou à l'inverse (agitation, dureté, peur, jugement, impatience), il sent si la personne est bien dans le « SOI » ou si c'est une autre part qui a pris le control.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
