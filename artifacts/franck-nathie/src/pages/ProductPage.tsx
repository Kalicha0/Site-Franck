import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import type { Product } from "@/data/products";
import NotFound from "@/pages/not-found";

const STARS = "★★★★★";

const FORMATEUR_BIO = [
  "Dyslexique, dyspraxique, dysorthographique, née en banlieue parisienne, d'une famille conflictuelle, avec une estime de lui très basse et des troubles de la concentration sévère, Franck n'est pas parti dans la vie avec « un bon jeu de cartes ». Mais après de nombreuses thérapies et à la suite de multiples guérisons de ses blessures et des croyances limitantes, il réalise ses rêves et ses passions, a pu écrire 6 livres de référence de la permaculture francophone dont un chez Larousse, prouvent ainsi que la dyslexie et la dysorthographie étaient surmontables, Il est devenu médiateur et à créer « la forêt nourricière » et prouvent que la violence et les relations conflictuelles étaient surmontables, et joue de multiple instrument de musique, prouvent que les troubles psychomoteurs sont, eux aussi, surmontable quand la confiance et l'estime de soi revient.",
  "Il a expérimenté et fusionné de nombreuses méthodes de guérison et a développé des outils comme le jeu GAI-RIRE qui s'appuient sur plus de quinze années de pratique.",
  "Il anime des stages sur la synergie humaine depuis 2014",
];

const FORMATEUR_FORMATIONS = [
  "Guérison des blessures intérieures : (depuis 2005 avec Jean Nahimana, Lise Bourbeau, Méthode Tipi, Méthode « The work » de Bytrone Katie)",
  "IFS Internal Familly Système (formé par l'association IFS France et Vinciane Van Houtrive / Bernard Piaget Isabelle Desplat depuis 2019)",
  "Médiation et gestion positive du conflit (Former par le MAN mouvement pour une alternative non violente et médiation CNV)",
  "La Communication transformative (formé par Lionel Santucci)",
  "La Communication non violente CNV (Formé depuis 2005 avec Jean Nahimana, Isabelle Padovani, Godfrey Spencer, Thomas D'Ansembourg,)",
];

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
        <img src={images[0]} alt={product.titre} className="w-full h-full object-contain p-8" />
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
            <img src={src} alt={`miniature ${idx + 1}`} className="w-full h-full object-contain p-1" />
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
        <div className="flex items-center justify-center" style={{ background: "#f0ede8", minHeight: "140px" }}>
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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2
        className="text-2xl sm:text-3xl font-bold text-gray-800 leading-tight"
        style={{ fontFamily: "Atma, sans-serif" }}
      >
        {children}
      </h2>
      <div className="w-12 h-1 rounded-full mt-3" style={{ background: "#E86B0A" }} />
    </div>
  );
}

function PourQuiSection({ product }: { product: Product }) {
  if (!product.pourQuiTitle) return null;

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading>{product.pourQuiTitle}</SectionHeading>

        {product.pourQuiImages && product.pourQuiImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {product.pourQuiImages.map((src, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden"
                style={{ background: "#f0ede8", aspectRatio: "16/10" }}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {product.pourQuiText && product.pourQuiText.length > 0 && (
          <div className="space-y-4 mb-8">
            {product.pourQuiText.map((para, i) => (
              <p
                key={i}
                className={`text-gray-700 leading-relaxed ${i === 0 ? "font-bold text-gray-800 text-lg" : ""}`}
              >
                {para}
              </p>
            ))}
          </div>
        )}

        {product.pourQui.length > 0 && (
          <ul className="space-y-3 mb-8">
            {product.pourQui.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700">
                <span style={{ color: "#E86B0A", flexShrink: 0, marginTop: "2px" }}>–</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {product.highlights && product.highlights.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {product.highlights.map((h, i) => (
              <div
                key={i}
                className="rounded-xl px-5 py-4 font-semibold text-gray-800 text-center border-l-4 bg-white shadow-sm"
                style={{ borderColor: "#E86B0A" }}
              >
                {h}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function StageTitleSection({ product }: { product: Product }) {
  if (!product.stageTitle) return null;
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading>{product.stageTitle}</SectionHeading>
        <div className="space-y-4">
          {product.stageDescription?.map((para, i) => (
            <p
              key={i}
              className={`text-gray-700 leading-relaxed text-lg ${
                i === (product.stageDescription?.length ?? 0) - 1 ? "font-semibold" : ""
              }`}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgrammeSection({ product }: { product: Product }) {
  if (!product.etapes || product.etapes.length === 0 || product.categorie !== "stages") return null;

  const duree = product.etapes.length === 3 ? "3 jours" : `${product.etapes.length} séances`;

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading>Programme de la formation</SectionHeading>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Durée", value: duree },
            { label: "Dates de sessions", value: "voir les détails" },
            { label: "Tarif", value: product.prixNum + " €" },
            { label: "Lieu", value: product.lieu ?? "" },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl p-4 shadow-sm text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">{item.label}</p>
              <p className="text-gray-800 font-semibold">{item.value}</p>
            </div>
          ))}
        </div>

        <ol className="space-y-3 mb-8">
          {product.etapes.map((e) => (
            <li
              key={e.num}
              className="flex gap-4 items-start bg-white rounded-xl p-4 shadow-sm border-l-4"
              style={{ borderColor: "#E86B0A" }}
            >
              <span
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5"
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

        {product.publicNote && (
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Pour quel public ?</p>
            <p className="text-gray-700">{product.publicNote}</p>
          </div>
        )}

        <a
          href="mailto:Contact@Franck-Nathie.com?subject=Inscription - Formation"
          className="inline-flex items-center justify-center font-semibold text-base rounded-xl py-3.5 px-8 transition-colors duration-200 text-white"
          style={{ background: "#E86B0A" }}
        >
          je m'inscris à la formation
        </a>
      </div>
    </section>
  );
}

function VaApporterSection({ product }: { product: Product }) {
  if (!product.vaApporter || product.vaApporter.length === 0) return null;
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading>Que va apporter ce stage à ta nouvelle vie ?</SectionHeading>
        <ul className="space-y-3">
          {product.vaApporter.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700 leading-relaxed">
              <span style={{ color: "#E86B0A", flexShrink: 0, marginTop: "2px" }}>–</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ContenuFormationSection({ product }: { product: Product }) {
  if (!product.contenuFormation) return null;
  const { items, modules } = product.contenuFormation;
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading>Contenus de formation</SectionHeading>
        <p className="font-bold text-gray-800 mb-3">Contenu</p>
        <ul className="space-y-1 mb-8">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <span style={{ color: "#E86B0A", flexShrink: 0 }}>–</span>
              <span><strong>{item}</strong></span>
            </li>
          ))}
        </ul>
        {modules.map((mod, mi) => (
          <div key={mi} className="mb-6">
            <p className="font-bold text-gray-800 mb-3">{mod.title}</p>
            <ul className="space-y-1">
              {mod.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <span style={{ color: "#E86B0A", flexShrink: 0 }}>–</span>
                  <span><strong>{item}</strong></span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="mt-6">
          <a
            href="mailto:Contact@Franck-Nathie.com?subject=Inscription - Thérapie"
            className="inline-flex items-center justify-center font-semibold text-base rounded-xl py-3.5 px-8 transition-colors duration-200 text-white"
            style={{ background: "#E86B0A" }}
          >
            je m'inscris
          </a>
        </div>
      </div>
    </section>
  );
}

function EchecSection({ product }: { product: Product }) {
  if (!product.echeTexte || product.echeTexte.length === 0) return null;
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading>L'échec de la psychanalyse et de beaucoup de thérapie</SectionHeading>
        <div className="space-y-4">
          {product.echeTexte.map((para, i) => (
            <p key={i} className="text-gray-700 leading-relaxed">{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function FormateurSection() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading>Le formateur</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 space-y-4">
            {FORMATEUR_BIO.map((para, i) => (
              <p key={i} className="text-gray-700 leading-relaxed">{para}</p>
            ))}
            <div className="mt-4">
              <p className="font-semibold text-gray-800 mb-3">Et s'est formé avec :</p>
              <ul className="space-y-2">
                {FORMATEUR_FORMATIONS.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                    <span style={{ color: "#E86B0A", flexShrink: 0 }}>–</span>
                    <span><strong>{f}</strong></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center text-white text-3xl font-bold"
              style={{ background: "#E86B0A" }}
            >
              FN
            </div>
            <p className="font-bold text-gray-800 text-center" style={{ fontFamily: "Atma, sans-serif" }}>
              Franck Nathié
            </p>
            <p className="text-gray-500 text-sm text-center italic">
              La permaculture, c'est avant tout prendre soin de soi.
            </p>
            <p className="text-gray-500 text-sm text-center italic">
              Soi -nier ou Gai-rire il faut choisir !
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DescriptionTabSection({ product }: { product: Product }) {
  return (
    <section className="py-10 sm:py-14 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="space-y-4 text-gray-700 leading-relaxed">
            {product.descriptionLongue.map((para, i) => (
              <p key={i} style={{ whiteSpace: "pre-line" }}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EtapesTherapiePanel({ product }: { product: Product }) {
  if (!product.etapes || product.etapes.length === 0 || product.categorie !== "therapie") return null;
  return (
    <ol className="space-y-4 mt-3">
      {product.etapes.map((e) => (
        <li key={e.num} className="flex gap-3 items-start">
          <span
            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5"
            style={{ background: "#E86B0A" }}
          >
            {e.num}
          </span>
          <div>
            <span className="font-semibold text-gray-800 text-sm">{e.titre} :</span>
            {e.texte && (
              <p className="text-gray-600 text-sm leading-relaxed mt-0.5" style={{ whiteSpace: "pre-line" }}>
                {e.texte}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function ProductPage() {
  const params = useParams<{ sub: string }>();
  const slug = params?.sub ?? "";
  const product = getProductBySlug(slug);

  if (!product) return <NotFound />;

  const related = getRelatedProducts(product.produitsSimilaires);
  const isStageOrTherapie = product.categorie === "stages" || product.categorie === "therapie";
  const isStage = product.categorie === "stages";
  const isTherapie = product.categorie === "therapie";

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
          <span className="text-gray-500 truncate max-w-[200px] sm:max-w-none">{product.titre}</span>
        </div>
      </div>

      {/* ─── TOP: Gallery + Product panel ─── */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left — Gallery */}
            <div className="w-full">
              <ProductGallery product={product} />
            </div>

            {/* Right — Product info */}
            <div className="flex flex-col gap-4">
              {/* Category badge */}
              <span
                className="inline-block self-start text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full text-white"
                style={{ background: "#E86B0A" }}
              >
                {product.categorieLabel}
              </span>

              {/* Title */}
              <div>
                <h1
                  className="text-3xl sm:text-4xl font-bold text-gray-800 leading-tight"
                  style={{ fontFamily: "Atma, sans-serif" }}
                >
                  {product.titre}
                </h1>
                {product.subtitle && (
                  <p className="text-gray-500 text-base mt-2 leading-snug italic">{product.subtitle}</p>
                )}
              </div>

              {/* Stars */}
              <div className="flex items-center gap-2">
                <StarRating />
                <span className="text-sm text-gray-500">(5 avis)</span>
              </div>

              {/* Prix + Stock */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-3xl font-bold" style={{ color: "#E86B0A" }}>
                  {product.prix}
                </span>
                {product.stock && (
                  <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                    {product.stock}
                  </span>
                )}
              </div>

              {/* Dates */}
              {product.dates && product.dates.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Dates disponibles
                  </p>
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
              )}

              {/* Description courte (italic for stages) */}
              <p
                className={`text-gray-600 leading-relaxed text-base ${isStage ? "italic" : ""}`}
              >
                {product.descriptionCourte}
              </p>

              {/* Panel description paragraphs */}
              {product.panelDescription && product.panelDescription.map((para, i) => (
                <p key={i} className="text-gray-600 leading-relaxed text-base">{para}</p>
              ))}

              {/* Etapes in panel for therapie */}
              {isTherapie && <EtapesTherapiePanel product={product} />}

              {/* Divider */}
              <div className="h-0.5 w-16 rounded-full" style={{ background: "#E86B0A" }} />

              {/* CTA buttons */}
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:Contact@Franck-Nathie.com?subject=Commande - Boutique"
                  className="flex items-center justify-center w-full text-white font-semibold text-base rounded-xl py-3.5 px-6 transition-colors duration-200 bg-[#E86B0A] hover:bg-[#d05e08]"
                >
                  {isStageOrTherapie ? "S'inscrire" : "Ajouter au panier"}
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

      {/* ─── FLAT SECTIONS for Stages ─── */}
      {isStage && (
        <>
          <PourQuiSection product={product} />
          <StageTitleSection product={product} />
          <ProgrammeSection product={product} />
          <VaApporterSection product={product} />
          <FormateurSection />
        </>
      )}

      {/* ─── FLAT SECTIONS for Thérapie ─── */}
      {isTherapie && (
        <>
          <PourQuiSection product={product} />
          <ContenuFormationSection product={product} />
          <EchecSection product={product} />
          <FormateurSection />
        </>
      )}

      {/* ─── DESCRIPTION for Jeux / Posters ─── */}
      {!isStageOrTherapie && product.descriptionLongue.length > 0 && (
        <DescriptionTabSection product={product} />
      )}

      {/* ─── Related products ─── */}
      {related.length > 0 && (
        <section className="py-10 sm:py-14 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2
              className="text-2xl font-bold text-gray-800 mb-2"
              style={{ fontFamily: "Atma, sans-serif" }}
            >
              Vous aimerez aussi
            </h2>
            <div className="w-12 h-1 rounded-full mb-8" style={{ background: "#E86B0A" }} />
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
