import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "wouter";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import rejetImg from "@assets/2_les_blessures_-_Rejet_1774979777263.png";
import trahisonImg from "@assets/3_les_blessures_-_Trahison_1775438236274.png";
import humiliationImg from "@assets/6_les_blessures_-_Humiliation_1774979777264.png";
import partsDoubleImg from "@assets/les_parts_exilés_blessés_-_double_1774979777251.png";
import bebeImg from "@assets/illustration-bébé_1775654741743.png";
import triangleImg from "@assets/5d270f42-8428-4ad4-b463-a77c708d9412_1775654492208.png";
import partsIntImg from "@assets/@_3_les_parts_exilés_blessés_-_double_BD_1775504573602.png";
import { articles } from "@/data/articles";

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

const VISUALS: Record<number, React.ReactNode> = {
  1: (
    <div className="flex items-center justify-center gap-3 h-full">
      <img src={rejetImg} alt="" className="w-16 h-16 object-contain" />
      <img src={trahisonImg} alt="" className="w-16 h-16 object-contain" />
      <img src={humiliationImg} alt="" className="w-16 h-16 object-contain" />
    </div>
  ),
  2: (
    <div className="flex items-center justify-center h-full">
      <img src={partsDoubleImg} alt="" className="w-36 h-36 object-contain" />
    </div>
  ),
  3: (
    <div className="flex items-center justify-center h-full">
      <img src={bebeImg} alt="" className="w-28 h-28 object-contain" />
    </div>
  ),
  4: (
    <div className="flex items-center justify-center h-full">
      <img src={triangleImg} alt="" className="w-32 h-32 object-contain" />
    </div>
  ),
  5: (
    <div className="flex items-center justify-center h-full">
      <img src={partsIntImg} alt="" className="w-32 h-32 object-contain" />
    </div>
  ),
};

type CardArticle = {
  id: number;
  href: string | null;
  active: boolean;
  badge: string;
  title: string;
  description: string;
  visual: React.ReactNode;
};

const ARTICLES: CardArticle[] = articles.map((a) => ({
  id: a.id,
  href: a.href,
  active: a.active,
  badge: a.active ? "Article" : "Prochainement",
  title: a.titre,
  description: a.description,
  visual: VISUALS[a.id] ?? null,
}));

function ArticleCard({ article }: { article: CardArticle }) {
  const inner = (
    <div
      className={`group bg-white rounded-2xl border border-gray-200 ${
        article.active ? "hover:border-[#E86B0A] hover:shadow-lg hover:-translate-y-1 cursor-pointer" : "opacity-90 cursor-default"
      } shadow-sm transition-all duration-300 overflow-hidden flex flex-col h-full`}
    >
      {/* Visuel */}
      <div className="bg-[#f0ede8] h-40 flex-shrink-0 flex items-center justify-center p-4">
        {article.visual}
      </div>

      {/* Contenu */}
      <div className="p-5 flex flex-col flex-1">
        {/* Barre orange animée */}
        <div
          className={`h-0.5 bg-[#E86B0A] mb-3 rounded-full transition-all duration-300 ${
            article.active ? "w-0 group-hover:w-8" : "w-0"
          }`}
        />

        <div className="flex items-center gap-2 mb-2">
          <span
            className={`inline-block text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full ${
              article.active
                ? "bg-orange-100 text-[#E86B0A]"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {article.badge}
          </span>
        </div>

        <h3
          className="text-lg font-bold text-gray-800 mb-2 leading-snug"
          style={{ fontFamily: "Atma, sans-serif" }}
        >
          {article.title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed flex-1">
          {article.description}
        </p>

        {article.active && (
          <div className="mt-4 flex items-center gap-1.5 text-[#E86B0A] font-semibold text-sm group-hover:gap-2.5 transition-all duration-200">
            <span>Lire l'article</span>
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );

  if (article.active && article.href) {
    return <Link href={article.href} className="block h-full">{inner}</Link>;
  }
  return <div className="block h-full">{inner}</div>;
}

export default function ArticlesPreview() {
  const { ref: sectionRef, inView } = useInView();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const plugins = useMemo(() => [Autoplay({ delay: 4000, stopOnMouseEnter: true, stopOnInteraction: false })], []);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    plugins
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section className="py-20 lg:py-28 bg-gray-50" data-testid="section-articles-preview">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div
          ref={sectionRef}
          className="transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)" }}
        >
          {/* En-tête */}
          <div className="text-center mb-12">
            <span className="inline-block text-[#E86B0A] text-sm font-semibold tracking-widest uppercase mb-3">
              Ressources
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800"
              style={{ fontFamily: "Atma, sans-serif" }}
            >
              Articles
            </h2>
            <div className="mt-4 mx-auto w-16 h-1 bg-[#E86B0A] rounded-full" />
          </div>

          {/* Carrousel */}
          <div className="relative">
            {/* Flèche gauche */}
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-md border border-gray-200 hover:border-[#E86B0A] hover:text-[#E86B0A] text-gray-500 flex items-center justify-center transition-all duration-200 hidden sm:flex"
              aria-label="Article précédent"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Flèche droite */}
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-md border border-gray-200 hover:border-[#E86B0A] hover:text-[#E86B0A] text-gray-500 flex items-center justify-center transition-all duration-200 hidden sm:flex"
              aria-label="Article suivant"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Viewport Embla */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-5">
                {ARTICLES.map((article) => (
                  <div
                    key={article.id}
                    className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(50%-10px)] lg:flex-[0_0_calc(33.333%-14px)]"
                  >
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>
            </div>

            {/* Pastilles de navigation */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {ARTICLES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === selectedIndex
                      ? "w-6 h-2 bg-[#E86B0A]"
                      : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Aller à l'article ${i + 1}`}
                />
              ))}
            </div>

            {/* Flèches mobile (bas) */}
            <div className="flex items-center justify-center gap-4 mt-5 sm:hidden">
              <button
                onClick={scrollPrev}
                className="w-10 h-10 bg-white rounded-full shadow-md border border-gray-200 hover:border-[#E86B0A] hover:text-[#E86B0A] text-gray-500 flex items-center justify-center transition-all duration-200"
                aria-label="Article précédent"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={scrollNext}
                className="w-10 h-10 bg-white rounded-full shadow-md border border-gray-200 hover:border-[#E86B0A] hover:text-[#E86B0A] text-gray-500 flex items-center justify-center transition-all duration-200"
                aria-label="Article suivant"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
