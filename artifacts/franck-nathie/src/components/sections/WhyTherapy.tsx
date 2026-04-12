import { useRef, useEffect, useState } from "react";
import confuseImg from "@assets/les_parts_éxilé_-_l_enfant_onfuse_rg_1774979777268.png";

function useInView(threshold = 0.15) {
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

export default function WhyTherapy() {
  const { ref, inView } = useInView();

  return (
    <section
      id="pourquoi-therapie"
      className="py-20 lg:py-28 bg-white"
      data-testid="section-why-therapy"
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
              Pourquoi commencer une thérapie ?
            </h2>
            <div className="mt-4 mx-auto w-16 h-1 bg-[#E86B0A] rounded-full" />
          </div>

          {/* Image left + text right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: illustration */}
            <div className="flex justify-center">
              <img
                src={confuseImg}
                alt="L'enfant perdu et confus — les parts exilées"
                className="w-full max-w-sm object-contain"
              />
            </div>

            {/* Right: text */}
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                Depuis notre enfance, nous accumulons des chocs émotionnels qui modifient notre comportement
                naturel et notre personnalité. Ces blessures s'accumulent en une masse de souffrance dans nos
                cellules, notre cœur, dans nos tripes et sont accompagnées de croyances. Comme des guerriers,
                nous encaissons et tentons de survivre coûte que coûte…
              </p>

              <blockquote className="border-l-4 border-[#E86B0A] pl-6 py-2">
                <p className="text-xl italic font-semibold text-gray-800">
                  Jusqu'au jour où nous n'en pouvons plus
                </p>
              </blockquote>

              <p className="text-lg text-gray-600 leading-relaxed">
                La dépression, le désespoir, la maladie, la colère, les addictions, les conflits, les séparations,
                la perte de sens et de goût pour la vie deviennent trop lourds et faire une thérapie devient
                important pour nous…
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                La thérapie nous permet de libérer la souffrance accumulée, de sortir de nos comportements
                automatiques et créer du changement qui apportera plus d'équilibre et d'harmonie dans votre vie.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                Et de faire des choses que vous aviez cru impossible (voir « qui suis-je »).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
