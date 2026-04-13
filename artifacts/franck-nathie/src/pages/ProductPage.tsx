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

const TEMOIGNAGES_GUERISON = [
  {
    texte:
      "J'ai vécu des trucs très durs dans mon enfance qui sont liés au viol, au rejet, à l'abandon, à la violence de mon frère et des hommes en général envers moi, du coup j'avais un tempérament de base assez dure et souvent l'habitude qu'on me juge et qu'on ne m'aime pas trop. Je suis arrivé dans le stage avec l'appréhension qu'une fois de plus on allait me juger et me rejeter, et pour la première fois, cette part de moi un peu « warrior » que je n'aimais pas a été accueilli comme une belle part qui ne voulaient que mon bien et j'ai vu qu'elle m'aidais à survivre, que la part de moi qui me faisais fuir la douleur dans les addictions, elle aussi, ne voulais que mon bien et le jeux de Franck et son regard bienveillant a permis de mettre tout ça sous mes yeux. Ces cartes et la bienveillance de Franck m'ont permis de pouvoir faire un peu la paix dans cette guerre qu'il y avait en moi entre toutes ces parts. En quelque mois, ma vie et mon comportement ont changé.",
    initiales: "C.",
  },
];

const TEMOIGNAGES_CAPT = [
  {
    texte:
      "Dans le cadre de ma collaboration avec la Forêt Nourricière, j'avais travaillé la méthode CAPT pour écrire l'article Comment communiquer avec authenticité et profondeur. Pour mettre en application les outils développés par Franck de manière théorique, j'ai fait une expérimentation avec mes enfants de la méthode pour résoudre un conflit récurrent. Impressionnée par les résultats de la méthode utilisée en autonomie, j'ai eu envie d'aller plus loin, et de la travailler en direct avec l'accompagnement de Franck, et d'autres personnes pour partager les expériences lors d'un stage 3 jour méthode CAPT. Et j'ai bien fait ! Participer à un stage de la Forêt Nourricière n'a rien à voir avec pratiquer des outils chez soi.",
    initiales: "M.",
  },
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
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100">
        <div
          className="flex items-center justify-center relative overflow-hidden"
          style={{ background: "#f5f0eb", minHeight: "160px" }}
        >
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.titre}
              className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              style={{ maxHeight: "160px" }}
            />
          ) : (
            <span className="text-xs text-gray-400 uppercase tracking-widest">Image à venir</span>
          )}
          <div className="absolute top-3 left-3">
            <span
              className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-full text-white shadow-sm"
              style={{ background: "#E86B0A" }}
            >
              {product.categorieLabel}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h4
            className="text-gray-800 font-bold text-base leading-snug group-hover:text-[#E86B0A] transition-colors mb-2"
            style={{ fontFamily: "Atma, sans-serif" }}
          >
            {product.titre}
          </h4>
          <p className="text-[#E86B0A] font-bold text-lg">{product.prix}</p>
        </div>
      </div>
    </Link>
  );
}

function SectionHeading({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="mb-8">
      <h2
        className={`text-2xl sm:text-3xl font-bold leading-tight ${light ? "text-white" : "text-gray-800"}`}
        style={{ fontFamily: "Atma, sans-serif" }}
      >
        {children}
      </h2>
      <div
        className="w-14 h-1.5 rounded-full mt-3"
        style={{ background: light ? "rgba(255,255,255,0.6)" : "#E86B0A" }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   POUR QUI — layout 3 colonnes :
   illustrations | liste questions | highlights
───────────────────────────────────────────── */
function PourQuiSection({ product }: { product: Product }) {
  if (!product.pourQuiTitle) return null;

  return (
    <section className="py-16" style={{ background: "#faf7f4" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2
            className="text-2xl sm:text-3xl font-bold text-gray-800 leading-tight"
            style={{ fontFamily: "Atma, sans-serif" }}
          >
            {product.pourQuiTitle}
          </h2>
          <div className="w-14 h-1.5 rounded-full mx-auto mt-3" style={{ background: "#E86B0A" }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Col 1 — Illustrations */}
          {product.pourQuiImages && product.pourQuiImages.length > 0 && (
            <div className="flex flex-col gap-3">
              {product.pourQuiImages.map((src, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden shadow-sm flex items-center justify-center"
                  style={{
                    background: i % 2 === 0 ? "#fff3eb" : "#f5f0eb",
                    height: "120px",
                  }}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Col 2 — Texte long (therapie) ou liste questions (stages) */}
          <div className={`${product.pourQuiImages && product.pourQuiImages.length > 0 ? "lg:col-span-1" : "lg:col-span-2"}`}>
            {product.pourQuiText && product.pourQuiText.length > 0 && (
              <div className="space-y-4">
                {product.pourQuiText.map((para, i) => (
                  <p
                    key={i}
                    className={`leading-relaxed ${
                      i === 0
                        ? "text-xl font-bold text-gray-800 mb-2"
                        : "text-gray-600 text-sm"
                    }`}
                  >
                    {para}
                  </p>
                ))}
              </div>
            )}

            {product.pourQui.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md p-6 border-t-4" style={{ borderColor: "#E86B0A" }}>
                <ul className="space-y-3">
                  {product.pourQui.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed">
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 text-white text-xs font-bold"
                        style={{ background: "#E86B0A" }}
                      >
                        –
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Col 3 — Highlights */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="flex flex-col gap-4">
              {product.highlights.map((h, i) => {
                const colors = [
                  { bg: "#E86B0A", text: "white" },
                  { bg: "#c25400", text: "white" },
                  { bg: "#7a3200", text: "white" },
                ];
                const c = colors[i % colors.length];
                const icons = ["🌱", "💛", "🚀"];
                return (
                  <div
                    key={i}
                    className="rounded-2xl p-5 flex flex-col items-center text-center shadow-md"
                    style={{ background: c.bg }}
                  >
                    <span className="text-3xl mb-2">{icons[i]}</span>
                    <span className="font-bold text-base leading-snug" style={{ color: c.text }}>
                      {h}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   STAGE TITLE — bannière plein fond orange
───────────────────────────────────────────── */
function StageTitleSection({ product }: { product: Product }) {
  if (!product.stageTitle) return null;
  return (
    <section className="py-14 relative overflow-hidden" style={{ background: "#E86B0A" }}>
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 20px)",
        }}
      />
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <div className="text-5xl mb-4 opacity-60">❝</div>
        <h2
          className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-6"
          style={{ fontFamily: "Atma, sans-serif" }}
        >
          {product.stageTitle}
        </h2>
        {product.stageDescription?.map((para, i) => (
          <p
            key={i}
            className={`text-white leading-relaxed ${
              i === (product.stageDescription?.length ?? 0) - 1
                ? "text-lg font-bold mt-4 border-t border-white/30 pt-4"
                : "text-base opacity-90"
            }`}
          >
            {para}
          </p>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PROGRAMME — bannière meta + cards par jour
───────────────────────────────────────────── */
function ProgrammeSection({ product }: { product: Product }) {
  if (!product.etapes || product.etapes.length === 0 || product.categorie !== "stages") return null;

  const metaCards = [
    { icon: "📅", label: "Durée", value: `${product.etapes.length} jours` },
    { icon: "🗓", label: "Dates de sessions", value: "voir les détails" },
    { icon: "💰", label: "Tarif", value: `${product.prixNum} €` },
    { icon: "📍", label: "Lieu", value: product.lieu ?? "" },
  ];

  const dayColors = ["#E86B0A", "#c25400", "#7a3200"];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading>Programme de la formation</SectionHeading>

        {/* Meta info banner */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-1 rounded-2xl overflow-hidden shadow-lg mb-10"
          style={{ background: "#E86B0A" }}
        >
          {metaCards.map((m, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-6 px-3 text-center"
              style={{
                background: i % 2 === 0 ? "rgba(0,0,0,0.08)" : "transparent",
              }}
            >
              <span className="text-2xl mb-1">{m.icon}</span>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-1">{m.label}</p>
              <p className="text-white font-bold text-sm">{m.value}</p>
            </div>
          ))}
        </div>

        {/* Day cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {product.etapes.map((e, i) => (
            <div
              key={e.num}
              className="rounded-2xl overflow-hidden shadow-md flex flex-col"
              style={{ borderTop: `5px solid ${dayColors[i % dayColors.length]}` }}
            >
              <div className="bg-white p-5 flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                    style={{ background: dayColors[i % dayColors.length] }}
                  >
                    {e.num}
                  </div>
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: dayColors[i % dayColors.length] }}
                  >
                    Jour {e.num}
                  </span>
                </div>
                <p className="text-gray-800 font-semibold text-sm leading-snug">{e.titre.replace(/^Jour \d+ - /, "")}</p>
                {e.texte && <p className="text-gray-500 text-xs mt-2 leading-relaxed">{e.texte}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Pour quel public + CTA */}
        {product.publicNote && (
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl p-6"
            style={{ background: "#faf7f4" }}
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Pour quel public ?</p>
              <p className="text-gray-700 font-semibold">{product.publicNote}</p>
            </div>
            <a
              href="mailto:Contact@Franck-Nathie.com?subject=Inscription - Formation"
              className="flex-shrink-0 inline-flex items-center gap-2 font-semibold text-sm rounded-xl py-3 px-7 transition-colors duration-200 text-white shadow-md hover:opacity-90"
              style={{ background: "#E86B0A" }}
            >
              je m'inscris à la formation →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   QUE VA APPORTER — grille de cartes 2 col
───────────────────────────────────────────── */
function VaApporterSection({ product }: { product: Product }) {
  if (!product.vaApporter || product.vaApporter.length === 0) return null;

  const icons = ["👁", "🌿", "🔄", "🌍", "🚪", "💛", "🌱"];

  return (
    <section className="py-16" style={{ background: "#faf7f4" }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading>Que va apporter ce stage à ta nouvelle vie ?</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {product.vaApporter.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 flex gap-4 items-start shadow-sm border-l-4 hover:shadow-md transition-shadow"
              style={{ borderColor: "#E86B0A" }}
            >
              <span className="text-2xl flex-shrink-0">{icons[i % icons.length]}</span>
              <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CONTENUS DE FORMATION (Thérapie)
───────────────────────────────────────────── */
function ContenuFormationSection({ product }: { product: Product }) {
  if (!product.contenuFormation) return null;
  const { items, modules } = product.contenuFormation;
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading>Contenus de formation</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contenu liste */}
          <div
            className="rounded-2xl p-6 shadow-md col-span-1"
            style={{ background: "#E86B0A" }}
          >
            <p className="font-bold text-white text-sm uppercase tracking-wider mb-4">Contenu</p>
            <ul className="space-y-2">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-white text-sm">
                  <span className="flex-shrink-0 mt-0.5">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Modules */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
            {modules.map((mod, mi) => (
              <div key={mi} className="rounded-2xl p-6 shadow-sm border border-gray-100">
                <p className="font-bold text-gray-800 mb-3 text-sm">{mod.title}</p>
                <ul className="space-y-1.5">
                  {mod.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                      <span style={{ color: "#E86B0A", flexShrink: 0 }}>–</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="mt-2">
              <a
                href="mailto:Contact@Franck-Nathie.com?subject=Inscription - Thérapie"
                className="inline-flex items-center gap-2 font-semibold text-sm rounded-xl py-3 px-7 text-white shadow-md hover:opacity-90 transition-opacity"
                style={{ background: "#E86B0A" }}
              >
                je m'inscris →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   L'ÉCHEC DE LA PSYCHANALYSE (Thérapie)
───────────────────────────────────────────── */
function EchecSection({ product }: { product: Product }) {
  if (!product.echeTexte || product.echeTexte.length === 0) return null;
  return (
    <section className="py-16" style={{ background: "#faf7f4" }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading>L'échec de la psychanalyse et de beaucoup de thérapie</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.echeTexte.map((para, i) => (
            <p
              key={i}
              className={`text-gray-700 leading-relaxed text-sm ${
                i === 0 || i === product.echeTexte!.length - 1 ? "md:col-span-2 text-base font-semibold text-gray-800" : ""
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

/* ─────────────────────────────────────────────
   LE FORMATEUR — photo circulaire + bio
───────────────────────────────────────────── */
function FormateurSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading>Le formateur</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Portrait card */}
          <div className="flex flex-col items-center gap-4">
            <div
              className="relative w-36 h-36 rounded-full flex items-center justify-center shadow-xl overflow-hidden"
              style={{ background: "linear-gradient(135deg, #E86B0A, #7a3200)" }}
            >
              <img
                src="https://laforetnourriciere.org/wp-content/uploads/2020/11/Franck-Nathie.jpg"
                alt="Franck Nathié"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const t = e.currentTarget;
                  t.style.display = "none";
                  const parent = t.parentElement;
                  if (parent) {
                    const span = document.createElement("span");
                    span.className = "text-white text-4xl font-bold";
                    span.style.fontFamily = "Atma, sans-serif";
                    span.textContent = "FN";
                    parent.appendChild(span);
                  }
                }}
              />
            </div>
            <div className="text-center">
              <p
                className="font-bold text-gray-800 text-xl"
                style={{ fontFamily: "Atma, sans-serif" }}
              >
                Franck Nathié
              </p>
              <p className="text-gray-500 text-xs italic mt-1">
                La permaculture, c'est avant tout prendre soin de soi.
              </p>
              <p className="text-gray-500 text-xs italic mt-0.5">
                Soi -nier ou Gai-rire il faut choisir !
              </p>
            </div>
            <div
              className="w-full rounded-xl p-4 text-center"
              style={{ background: "#fff3eb" }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#E86B0A" }}>
                Et s'est formé avec
              </p>
              <ul className="space-y-1.5 text-left">
                {FORMATEUR_FORMATIONS.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 text-xs">
                    <span style={{ color: "#E86B0A", flexShrink: 0 }}>→</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bio text */}
          <div className="md:col-span-2 space-y-4">
            {FORMATEUR_BIO.map((para, i) => (
              <p key={i} className="text-gray-700 leading-relaxed">
                {i === 0 ? (
                  <>{para}</>
                ) : (
                  para
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TÉMOIGNAGES
───────────────────────────────────────────── */
function TemoignagesSection({ slug }: { slug: string }) {
  const temoignages =
    slug === "stage-guerison"
      ? TEMOIGNAGES_GUERISON
      : slug === "stage-capt"
      ? TEMOIGNAGES_CAPT
      : [];

  if (temoignages.length === 0) return null;

  return (
    <section className="py-16" style={{ background: "#faf7f4" }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading>Témoignages</SectionHeading>
        <div className="space-y-6">
          {temoignages.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-md relative border-l-4 flex gap-6 items-start"
              style={{ borderColor: "#E86B0A" }}
            >
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow"
                style={{ background: "#E86B0A" }}
              >
                {t.initiales}
              </div>
              <div>
                <div className="text-3xl leading-none mb-2 opacity-30 text-gray-600">❝</div>
                <p className="text-gray-700 leading-relaxed italic text-sm">{t.texte}</p>
                <div className="flex gap-0.5 mt-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-sm" style={{ color: "#E86B0A" }}>★</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   DESCRIPTION for Jeux/Posters
───────────────────────────────────────────── */
function DescriptionSection({ product }: { product: Product }) {
  return (
    <section className="py-12" style={{ background: "#faf7f4" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-2xl p-8 shadow-sm border-t-4" style={{ borderColor: "#E86B0A" }}>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            {product.descriptionLongue.map((para, i) => (
              <p key={i} style={{ whiteSpace: "pre-line" }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ETAPES in panel (Thérapie only)
───────────────────────────────────────────── */
function EtapesTherapiePanel({ product }: { product: Product }) {
  if (!product.etapes || product.etapes.length === 0 || product.categorie !== "therapie") return null;
  return (
    <ol className="space-y-3 mt-4">
      {product.etapes.map((e) => (
        <li key={e.num} className="flex gap-3 items-start">
          <span
            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5 shadow"
            style={{ background: "#E86B0A" }}
          >
            {e.num}
          </span>
          <div>
            <span className="font-semibold text-gray-800 text-sm">{e.titre} :</span>
            {e.texte && (
              <p className="text-gray-500 text-xs leading-relaxed mt-0.5" style={{ whiteSpace: "pre-line" }}>
                {e.texte}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ═══════════════════════════════════════════
   PAGE PRINCIPALE
═══════════════════════════════════════════ */
export default function ProductPage() {
  const params = useParams<{ sub: string }>();
  const slug = params?.sub ?? "";
  const product = getProductBySlug(slug);

  if (!product) return <NotFound />;

  const related = getRelatedProducts(product.produitsSimilaires);
  const isStage = product.categorie === "stages";
  const isTherapie = product.categorie === "therapie";
  const isStageOrTherapie = isStage || isTherapie;

  return (
    <main data-testid="page-produit" className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-sm flex-wrap">
          <Link href="/">
            <span className="cursor-pointer hover:underline font-medium" style={{ color: "#E86B0A" }}>
              Accueil
            </span>
          </Link>
          <span className="text-gray-300">›</span>
          <Link href="/boutique">
            <span className="cursor-pointer hover:underline font-medium" style={{ color: "#E86B0A" }}>
              Boutique
            </span>
          </Link>
          <span className="text-gray-300">›</span>
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
              {/* Badge */}
              <span
                className="inline-block self-start text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full text-white shadow-sm"
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
                  <p className="text-gray-500 text-sm mt-2 leading-snug italic">{product.subtitle}</p>
                )}
              </div>

              {/* Stars */}
              <div className="flex items-center gap-2">
                <StarRating />
                <span className="text-sm text-gray-400">(5 avis)</span>
              </div>

              {/* Prix */}
              <div
                className="flex items-center gap-3 flex-wrap py-3 px-4 rounded-xl"
                style={{ background: "#fff3eb" }}
              >
                <span className="text-3xl font-bold" style={{ color: "#E86B0A" }}>
                  {product.prix}
                </span>
                {product.stock && (
                  <span className="text-xs text-green-700 font-semibold bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                    {product.stock}
                  </span>
                )}
                {isStage && (
                  <span className="text-xs text-gray-500 italic">Prix par personne – En couple</span>
                )}
              </div>

              {/* Dates */}
              {product.dates && product.dates.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Dates disponibles
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.dates.map((d, i) => (
                      <span
                        key={i}
                        className="text-sm font-semibold px-3 py-1.5 rounded-lg border-2 transition-colors"
                        style={{ borderColor: "#E86B0A", color: "#E86B0A", background: "#fff8f4" }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description courte */}
              <p className={`text-gray-700 leading-relaxed text-sm ${isStage ? "italic font-medium" : ""}`}>
                {product.descriptionCourte}
              </p>

              {/* Panel description */}
              {product.panelDescription?.map((para, i) => (
                <p key={i} className="text-gray-600 leading-relaxed text-sm">{para}</p>
              ))}

              {/* Étapes dans le panel (thérapie uniquement) */}
              {isTherapie && <EtapesTherapiePanel product={product} />}

              {/* Divider */}
              <div className="h-0.5 w-16 rounded-full" style={{ background: "#E86B0A" }} />

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:Contact@Franck-Nathie.com?subject=Commande - Boutique"
                  className="flex items-center justify-center w-full text-white font-bold text-base rounded-xl py-4 px-6 shadow-lg transition-all duration-200 hover:opacity-90 hover:shadow-xl"
                  style={{ background: "#E86B0A" }}
                >
                  {isStageOrTherapie ? "S'inscrire à la formation" : "Ajouter au panier"}
                </a>
                <a
                  href="mailto:Contact@Franck-Nathie.com"
                  className="flex items-center justify-center w-full font-semibold text-base rounded-xl border-2 py-3 px-6 transition-all duration-200 border-[#E86B0A] text-[#E86B0A] hover:bg-[#E86B0A] hover:text-white"
                >
                  Contacter Franck
                </a>
                {isStageOrTherapie && (
                  <p className="text-xs text-gray-400 text-center italic">
                    Il est possible de payer en plusieurs fois par carte bancaire
                  </p>
                )}
              </div>

              {/* Trust badges */}
              <div
                className="flex flex-wrap gap-4 pt-3 border-t border-gray-100 justify-center"
              >
                {[
                  { icon: "🔒", text: "Paiement sécurisé" },
                  { icon: "✅", text: "Satisfait ou remboursé" },
                  { icon: "📦", text: "Livraison soignée" },
                ].map((b) => (
                  <div key={b.text} className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                    <span>{b.icon}</span>
                    <span>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTIONS PLATES — Stages ─── */}
      {isStage && (
        <>
          <PourQuiSection product={product} />
          <StageTitleSection product={product} />
          <ProgrammeSection product={product} />
          <VaApporterSection product={product} />
          <FormateurSection />
          <TemoignagesSection slug={slug} />
        </>
      )}

      {/* ─── SECTIONS PLATES — Thérapie ─── */}
      {isTherapie && (
        <>
          <PourQuiSection product={product} />
          <ContenuFormationSection product={product} />
          <EchecSection product={product} />
          <FormateurSection />
        </>
      )}

      {/* ─── DESCRIPTION — Jeux / Posters ─── */}
      {!isStageOrTherapie && product.descriptionLongue.length > 0 && (
        <DescriptionSection product={product} />
      )}

      {/* ─── Produits similaires ─── */}
      {related.length > 0 && (
        <section className="py-14 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-end gap-4 mb-8">
              <div>
                <h2
                  className="text-2xl font-bold text-gray-800"
                  style={{ fontFamily: "Atma, sans-serif" }}
                >
                  Vous aimerez aussi
                </h2>
                <div className="w-12 h-1.5 rounded-full mt-2" style={{ background: "#E86B0A" }} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
