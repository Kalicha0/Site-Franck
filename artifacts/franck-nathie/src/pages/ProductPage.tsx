import { useState, useRef, useCallback, useEffect } from "react";
import { Link, useParams } from "wouter";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import type { Product } from "@/data/products";
import NotFound from "@/pages/not-found";

const STARS = "★★★★★";

const AVIS: Record<string, { initiales: string; nom: string; texte: string }[]> = {
  default: [
    {
      initiales: "ML",
      nom: "Marie L.",
      texte:
        "Un outil vraiment précieux qui m'a aidée à mieux comprendre mes réactions émotionnelles. Je recommande vivement à toute personne en chemin vers plus d'authenticité.",
    },
    {
      initiales: "PD",
      nom: "Pierre D.",
      texte:
        "J'utilise cet outil en complément de mes séances avec Franck. Les deux se complètent parfaitement et j'ai vu de véritables changements dans ma façon d'être en relation.",
    },
    {
      initiales: "SB",
      nom: "Sophie B.",
      texte:
        "Simple, profond, accessible. Exactement ce dont j'avais besoin pour entamer ce travail sur moi-même. La qualité est au rendez-vous.",
    },
  ],
};

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <span className="text-lg tracking-tight" style={{ color: "#E86B0A" }}>
      {STARS.slice(0, count)}
    </span>
  );
}

function ProductGallery({ product }: { product: Product }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const images = product.images;

  useEffect(() => {
    setActiveIdx(0);
  }, [product.slug]);

  if (images.length === 0) {
    return (
      <div
        className="w-full flex flex-col items-center justify-center rounded-2xl shadow-sm overflow-hidden"
        style={{ background: "#f0ede8", minHeight: "380px", aspectRatio: "4/3" }}
      >
        <span className="text-sm text-gray-400 uppercase tracking-widest">Image à venir</span>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div
        className="w-full flex flex-col items-center justify-center rounded-2xl shadow-sm overflow-hidden"
        style={{ background: "#f0ede8", minHeight: "380px", aspectRatio: "4/3" }}
      >
        <img
          src={images[0]}
          alt={product.titre}
          className="w-full h-full object-contain p-8"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        className="w-full flex items-center justify-center rounded-2xl shadow-sm overflow-hidden"
        style={{ background: "#f0ede8", minHeight: "360px", aspectRatio: "4/3" }}
      >
        <img
          src={images[activeIdx]}
          alt={`${product.titre} — image ${activeIdx + 1}`}
          className="w-full h-full object-contain p-8"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((src, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-150 cursor-pointer ${
              idx === activeIdx ? "border-[#E86B0A]" : "border-transparent opacity-60 hover:opacity-100"
            }`}
            style={{ background: "#f0ede8" }}
          >
            <img
              src={src}
              alt={`miniature ${idx + 1}`}
              className="w-full h-full object-contain p-1"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function RelatedCard({ product }: { product: Product }) {
  return (
    <Link href={`/boutique/${product.slug}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer group">
        <div
          className="flex items-center justify-center"
          style={{ background: "#f0ede8", minHeight: "140px" }}
        >
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.titre}
              className="w-full h-full object-contain p-4"
              style={{ maxHeight: "140px" }}
            />
          ) : (
            <span className="text-xs text-gray-400 uppercase tracking-widest">Image à venir</span>
          )}
        </div>
        <div className="p-4">
          <span
            className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
            style={{ background: "#E86B0A" }}
          >
            {product.categorieLabel}
          </span>
          <h4
            className="text-gray-800 font-bold text-sm mt-2 leading-snug group-hover:text-[#E86B0A] transition-colors"
            style={{ fontFamily: "Atma, sans-serif" }}
          >
            {product.titre}
          </h4>
          <p className="text-[#E86B0A] font-semibold text-sm mt-1">{product.prix}</p>
        </div>
      </div>
    </Link>
  );
}

type TabId = "description" | "pourqui" | "avis";
const ALL_TABS: { id: TabId; label: string }[] = [
  { id: "description", label: "Description" },
  { id: "pourqui", label: "Pour qui ?" },
  { id: "avis", label: "Avis (5)" },
];

function AnimatedTabs({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: { id: TabId; label: string }[];
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
}) {
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIdx = tabs.findIndex((t) => t.id === activeTab);

  const getIndicatorStyle = () => {
    const btn = btnRefs.current[activeIdx];
    if (!btn) return { left: 0, width: 0 };
    return {
      left: btn.offsetLeft,
      width: btn.offsetWidth,
    };
  };

  const setRef = useCallback(
    (el: HTMLButtonElement | null, idx: number) => {
      btnRefs.current[idx] = el;
    },
    []
  );

  const { left, width } = getIndicatorStyle();

  return (
    <div className="relative border-b border-gray-200 mb-8">
      <div className="flex overflow-x-auto">
        {tabs.map((tab, idx) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => setRef(el, idx)}
              onClick={() => onTabChange(tab.id)}
              className={`flex-shrink-0 px-6 py-3 text-sm font-semibold transition-colors duration-200 cursor-pointer bg-transparent border-0 outline-none pb-4 ${
                isActive ? "text-[#E86B0A]" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        className="absolute bottom-0 h-[3px] rounded-full transition-all duration-300 ease-in-out"
        style={{
          background: "#E86B0A",
          left: `${left}px`,
          width: `${width}px`,
        }}
      />
    </div>
  );
}

function EtapesSection({ product }: { product: Product }) {
  if (!product.etapes || product.etapes.length === 0) return null;
  return (
    <div className="mt-6">
      <h3
        className="text-lg font-bold text-gray-800 mb-5"
        style={{ fontFamily: "Atma, sans-serif" }}
      >
        {product.categorie === "stages" ? "Programme de la formation" : "Les étapes du processus"}
      </h3>
      <ol className="space-y-4">
        {product.etapes.map((e) => (
          <li key={e.num} className="flex gap-4 items-start">
            <span
              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ background: "#E86B0A" }}
            >
              {e.num}
            </span>
            <div>
              <span className="font-semibold text-gray-800">{e.titre}</span>
              {e.texte && (
                <p className="text-gray-600 text-sm leading-relaxed mt-1">{e.texte}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function DatesSection({ product }: { product: Product }) {
  if (!product.dates || product.dates.length === 0) return null;
  return (
    <div className="mt-3">
      <div className="flex flex-wrap gap-2">
        {product.dates.map((d, i) => (
          <span
            key={i}
            className="text-sm font-medium px-3 py-1.5 rounded-lg border"
            style={{ borderColor: "#E86B0A", color: "#E86B0A", background: "#fff8f4" }}
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ProductPage() {
  const params = useParams<{ sub: string }>();
  const slug = params?.sub ?? "";
  const product = getProductBySlug(slug);
  const [activeTab, setActiveTab] = useState<TabId>("description");

  if (!product) return <NotFound />;

  const related = getRelatedProducts(product.produitsSimilaires);
  const avis = AVIS.default;
  const tabs = ALL_TABS.filter((t) => t.id !== "pourqui" || product.pourQui.length > 0);

  return (
    <main data-testid="page-produit" className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-sm flex-wrap">
          <Link href="/">
            <span className="cursor-pointer hover:underline" style={{ color: "#E86B0A" }}>
              Accueil
            </span>
          </Link>
          <span className="text-gray-400">›</span>
          <Link href="/boutique">
            <span className="cursor-pointer hover:underline" style={{ color: "#E86B0A" }}>
              Boutique
            </span>
          </Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-500 truncate max-w-[200px] sm:max-w-none">
            {product.titre}
          </span>
        </div>
      </div>

      {/* Main product zone */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left — Gallery */}
            <div className="w-full">
              <ProductGallery product={product} />
            </div>

            {/* Right — Product info */}
            <div className="flex flex-col gap-5">
              {/* Category badge */}
              <div>
                <span
                  className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full text-white"
                  style={{ background: "#E86B0A" }}
                >
                  {product.categorieLabel}
                </span>
              </div>

              {/* Title */}
              <div>
                <h1
                  className="text-3xl sm:text-4xl font-bold text-gray-800 leading-tight"
                  style={{ fontFamily: "Atma, sans-serif" }}
                >
                  {product.titre}
                </h1>
                {product.subtitle && (
                  <p className="text-gray-500 text-base mt-2 leading-snug italic">
                    {product.subtitle}
                  </p>
                )}
              </div>

              {/* Stars */}
              <div className="flex items-center gap-2">
                <StarRating />
                <span className="text-sm text-gray-500">(5 avis)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className="text-3xl font-bold"
                  style={{ color: "#E86B0A" }}
                >
                  {product.prix}
                </span>
                {product.stock && (
                  <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                    {product.stock}
                  </span>
                )}
              </div>

              {/* Dates for stages */}
              {product.dates && product.dates.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Dates disponibles
                  </p>
                  <DatesSection product={product} />
                </div>
              )}

              {/* Short description */}
              <p className="text-gray-600 leading-relaxed text-base">
                {product.descriptionCourte}
              </p>

              {/* Orange divider */}
              <div
                className="h-0.5 w-16 rounded-full"
                style={{ background: "#E86B0A" }}
              />

              {/* CTA buttons */}
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:Contact@Franck-Nathie.com?subject=Commande - Boutique"
                  className="flex items-center justify-center w-full text-white font-semibold text-base rounded-xl py-3.5 px-6 transition-colors duration-200 bg-[#E86B0A] hover:bg-[#d05e08]"
                >
                  {product.categorie === "stages" || product.categorie === "therapie"
                    ? "S'inscrire"
                    : "Ajouter au panier"}
                </a>
                <a
                  href="mailto:Contact@Franck-Nathie.com"
                  className="flex items-center justify-center w-full font-semibold text-base rounded-xl border-2 py-3 px-6 transition-all duration-200 border-[#E86B0A] text-[#E86B0A] hover:bg-[#E86B0A] hover:text-white"
                >
                  Contacter Franck
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 pt-2 border-t border-gray-100">
                {[
                  { icon: "🔒", text: "Sécurisé" },
                  { icon: "🔄", text: "Satisfait ou remboursé" },
                  { icon: "📦", text: "Livraison soignée" },
                ].map((b) => (
                  <div key={b.text} className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span>{b.icon}</span>
                    <span>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs section */}
      <section className="py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Tab content */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
            {activeTab === "description" && (
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {product.descriptionLongue.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
                <EtapesSection product={product} />
              </div>
            )}

            {activeTab === "pourqui" && (
              <div>
                <h3
                  className="text-xl font-bold text-gray-800 mb-5"
                  style={{ fontFamily: "Atma, sans-serif" }}
                >
                  Ce produit est fait pour vous si…
                </h3>
                <ul className="space-y-3">
                  {product.pourQui.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <span style={{ color: "#E86B0A", flexShrink: 0 }}>✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "avis" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <StarRating />
                  <span className="text-lg font-bold text-gray-800">5 / 5</span>
                  <span className="text-sm text-gray-500">— 5 avis clients</span>
                </div>
                {avis.map((a, i) => (
                  <div key={i} className="flex gap-4 py-4 border-b border-gray-50 last:border-0">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ background: "#E86B0A" }}
                    >
                      {a.initiales}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-800 text-sm">{a.nom}</span>
                        <StarRating count={5} />
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{a.texte}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-10 sm:py-14 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2
              className="text-2xl font-bold text-gray-800 mb-2"
              style={{ fontFamily: "Atma, sans-serif" }}
            >
              Vous aimerez aussi
            </h2>
            <div
              className="w-12 h-1 rounded-full mb-8"
              style={{ background: "#E86B0A" }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => (
                <RelatedCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
