import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import type { Product } from "@/data/products";
import NotFound from "@/pages/not-found";

/* ─────────────────────────────────────────────
   CONSTANTES
───────────────────────────────────────────── */
const BRAND = "#C4611A";

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

const TEMOIGNAGES: Record<string, { texte: string; initiales: string }[]> = {
  "stage-guerison": [
    {
      texte:
        "J'ai vécu des trucs très durs dans mon enfance qui sont liés au viol, au rejet, à l'abandon, à la violence de mon frère et des hommes en général envers moi, du coup j'avais un tempérament de base assez dure et souvent l'habitude qu'on me juge et qu'on ne m'aime pas trop. Je suis arrivé dans le stage avec l'appréhension qu'une fois de plus on allait me juger et me rejeter, et pour la première fois, cette part de moi un peu « warrior » que je n'aimais pas a été accueilli comme une belle part qui ne voulaient que mon bien et j'ai vu qu'elle m'aidais à survivre, que la part de moi qui me faisais fuir la douleur dans les addictions, elle aussi, ne voulais que mon bien et le jeux de Franck et son regard bienveillant a permis de mettre tout ça sous mes yeux. Ces cartes et la bienveillance de Franck m'ont permis de pouvoir faire un peu la paix dans cette guerre qu'il y avait en moi entre toutes ces parts. En quelque mois, ma vie et mon comportement ont changé.",
      initiales: "C.",
    },
  ],
  "stage-capt": [
    {
      texte:
        "Dans le cadre de ma collaboration avec la Forêt Nourricière, j'avais travaillé la méthode CAPT pour écrire l'article Comment communiquer avec authenticité et profondeur. Pour mettre en application les outils développés par Franck de manière théorique, j'ai fait une expérimentation avec mes enfants de la méthode pour résoudre un conflit récurrent. Impressionnée par les résultats de la méthode utilisée en autonomie, j'ai eu envie d'aller plus loin, et de la travailler en direct avec l'accompagnement de Franck, et d'autres personnes pour partager les expériences lors d'un stage 3 jour méthode CAPT. Et j'ai bien fait ! Participer à un stage de la Forêt Nourricière n'a rien à voir avec pratiquer des outils chez soi.",
      initiales: "M.",
    },
  ],
};

/* ─────────────────────────────────────────────
   GALERIE
───────────────────────────────────────────── */
function ProductGallery({ product }: { product: Product }) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => { setActiveIdx(0); }, [product.slug]);

  const { images } = product;

  const MainSlot = () => (
    <div
      className="w-full flex items-center justify-center rounded-xl overflow-hidden"
      style={{ background: "#f5f1ec", minHeight: "360px", aspectRatio: "4/3" }}
    >
      {images.length > 0 ? (
        <img
          src={images[activeIdx]}
          alt={product.titre}
          className="w-full h-full object-contain p-6"
        />
      ) : (
        <span className="text-xs text-gray-400 uppercase tracking-widest">Image à venir</span>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
      <MainSlot />
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className="flex-shrink-0 w-14 h-14 rounded-md overflow-hidden border-2 transition-all cursor-pointer"
              style={{
                borderColor: i === activeIdx ? BRAND : "transparent",
                background: "#f5f1ec",
                opacity: i === activeIdx ? 1 : 0.55,
              }}
            >
              <img src={src} alt="" className="w-full h-full object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ÉTOILES
───────────────────────────────────────────── */
function Stars() {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className="w-4 h-4" style={{ fill: BRAND }} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-gray-500 ml-1">(5 avis)</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION HEADING
───────────────────────────────────────────── */
function SectionTitle({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={`mb-8 ${center ? "text-center" : ""}`}>
      <h2
        className="text-2xl sm:text-3xl font-bold text-gray-800"
        style={{ fontFamily: "Atma, sans-serif" }}
      >
        {children}
      </h2>
      <div
        className={`w-12 h-0.5 mt-3 rounded-full ${center ? "mx-auto" : ""}`}
        style={{ background: BRAND }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   ÉTAPES THÉRAPIE (panneau)
───────────────────────────────────────────── */
function EtapesPanel({ product }: { product: Product }) {
  if (!product.etapes?.length || product.categorie !== "therapie") return null;
  return (
    <div className="mt-4 space-y-3">
      {product.etapes.map((e) => (
        <div key={e.num} className="flex gap-3 items-start">
          <span
            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ background: BRAND }}
          >
            {e.num}
          </span>
          <div>
            <p className="text-sm font-semibold text-gray-800">{e.titre} :</p>
            {e.texte && (
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed" style={{ whiteSpace: "pre-line" }}>
                {e.texte}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION POUR QUI — 3 colonnes comme l'original
   col1: illustrations | col2: liste | col3: highlights
───────────────────────────────────────────── */
function PourQuiSection({ product }: { product: Product }) {
  if (!product.pourQuiTitle) return null;

  return (
    <section className="py-14" style={{ background: "#f7f4f0" }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle center>{product.pourQuiTitle}</SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Illustrations des parts */}
          {product.pourQuiImages && product.pourQuiImages.length > 0 && (
            <div className="grid grid-cols-2 gap-2 content-start">
              {product.pourQuiImages.map((src, i) => (
                <div
                  key={i}
                  className="rounded-lg overflow-hidden bg-white shadow-sm"
                  style={{ aspectRatio: "1/1" }}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Liste de questions */}
          <div className={product.pourQuiImages?.length ? "" : "lg:col-span-2"}>
            {product.pourQuiText && product.pourQuiText.length > 0 ? (
              <div className="space-y-3">
                {product.pourQuiText.map((para, i) => (
                  <p key={i} className={`leading-relaxed text-gray-700 text-sm ${i === 0 ? "font-semibold text-base text-gray-800" : ""}`}>
                    {para}
                  </p>
                ))}
              </div>
            ) : (
              <ul className="space-y-4">
                {product.pourQui.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: BRAND }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Highlights */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="flex flex-col gap-3">
              {product.highlights.map((h, i) => {
                const bgs = ["#5C3B1E", "#8B5C2A", "#C4611A"];
                return (
                  <div
                    key={i}
                    className="rounded-xl p-5 text-white"
                    style={{ background: bgs[i % bgs.length] }}
                  >
                    <p className="font-semibold text-sm leading-snug">{h}</p>
                  </div>
                );
              })}
              <a
                href="mailto:Contact@Franck-Nathie.com?subject=Inscription"
                className="mt-2 block text-center text-white text-sm font-semibold py-3 px-4 rounded-xl transition-opacity hover:opacity-90"
                style={{ background: BRAND }}
              >
                S'inscrire à la formation
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   BANNIÈRE STAGE TITLE
───────────────────────────────────────────── */
function StageTitleSection({ product }: { product: Product }) {
  if (!product.stageTitle) return null;
  return (
    <section className="py-12" style={{ background: "#C4611A" }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2
          className="text-2xl sm:text-3xl font-bold text-white mb-5"
          style={{ fontFamily: "Atma, sans-serif" }}
        >
          {product.stageTitle}
        </h2>
        {product.stageDescription?.map((para, i) => (
          <p
            key={i}
            className={`text-white leading-relaxed ${
              i === (product.stageDescription!.length - 1)
                ? "font-bold text-lg mt-4 border-t border-white/25 pt-4"
                : "text-sm opacity-90"
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
   PROGRAMME
───────────────────────────────────────────── */
function ProgrammeSection({ product }: { product: Product }) {
  if (!product.etapes?.length || product.categorie !== "stages") return null;

  return (
    <section className="py-14 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle>Programme de la formation</SectionTitle>

        {/* Meta row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 p-6 rounded-xl" style={{ background: "#f7f4f0" }}>
          {[
            { label: "Durée", value: `${product.etapes.length} jours` },
            { label: "Dates", value: product.dates?.[0] ?? "Voir ci-dessus" },
            { label: "Tarif", value: product.prix },
            { label: "Lieu", value: product.lieu ?? "" },
          ].map((m) => (
            <div key={m.label} className="text-center">
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">{m.label}</p>
              <p className="font-bold text-gray-800 text-sm leading-snug">{m.value}</p>
            </div>
          ))}
        </div>

        {/* Day cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {product.etapes.map((e) => (
            <div key={e.num} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ background: BRAND }}
                >
                  {e.num}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Jour {e.num}</span>
              </div>
              <div className="px-5 py-4">
                <p className="text-sm text-gray-800 font-medium leading-snug">
                  {e.titre.replace(/^Jour \d+ [-–] /, "")}
                </p>
                {e.texte && <p className="text-xs text-gray-500 mt-2 leading-relaxed">{e.texte}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Public + CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl p-5" style={{ background: "#f7f4f0" }}>
          {product.publicNote && (
            <p className="text-sm text-gray-700 italic">{product.publicNote}</p>
          )}
          <a
            href="mailto:Contact@Franck-Nathie.com?subject=Inscription - Formation"
            className="flex-shrink-0 text-sm font-semibold text-white px-6 py-3 rounded-xl transition-opacity hover:opacity-90"
            style={{ background: BRAND }}
          >
            Je m'inscris à la formation
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   QUE VA APPORTER
───────────────────────────────────────────── */
function VaApporterSection({ product }: { product: Product }) {
  if (!product.vaApporter?.length) return null;
  return (
    <section className="py-14" style={{ background: "#f7f4f0" }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle>Que va apporter ce stage à ta nouvelle vie ?</SectionTitle>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
          {product.vaApporter.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed">
              <span
                className="flex-shrink-0 mt-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background: BRAND }}
              >
                {i + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
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
    <section className="py-14 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle>Contenus de formation</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-xl p-6 border border-gray-200">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Contenu</p>
            <ul className="space-y-2">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ background: BRAND }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2 flex flex-col gap-5">
            {modules.map((mod, mi) => (
              <div key={mi} className="rounded-xl p-6 border border-gray-200">
                <p className="font-semibold text-gray-800 text-sm mb-3">{mod.title}</p>
                <ul className="space-y-2">
                  {mod.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ background: BRAND }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <a
              href="mailto:Contact@Franck-Nathie.com?subject=Inscription - Thérapie"
              className="self-start text-sm font-semibold text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
              style={{ background: BRAND }}
            >
              Je m'inscris
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ÉCHEC PSYCHANALYSE (Thérapie)
───────────────────────────────────────────── */
function EchecSection({ product }: { product: Product }) {
  if (!product.echeTexte?.length) return null;
  return (
    <section className="py-14" style={{ background: "#f7f4f0" }}>
      <div className="max-w-4xl mx-auto px-6">
        <SectionTitle>L'échec de la psychanalyse et de beaucoup de thérapie</SectionTitle>
        <div className="space-y-4">
          {product.echeTexte.map((para, i) => (
            <p key={i} className="text-gray-700 leading-relaxed text-sm">
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   LE FORMATEUR
───────────────────────────────────────────── */
function FormateurSection() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle>Le formateur</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Portrait + formations */}
          <div className="flex flex-col items-center gap-5 text-center">
            <div
              className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center shadow-md"
              style={{ background: "#e8d8c8" }}
            >
              <img
                src="https://laforetnourriciere.org/wp-content/uploads/2020/11/Franck-Nathie.jpg"
                alt="Franck Nathié"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const el = document.createElement("span");
                  el.className = "text-3xl font-bold text-gray-600";
                  el.style.fontFamily = "Atma, sans-serif";
                  el.textContent = "FN";
                  e.currentTarget.parentElement?.appendChild(el);
                }}
              />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-lg" style={{ fontFamily: "Atma, sans-serif" }}>
                Franck Nathié
              </p>
              <p className="text-xs text-gray-500 italic mt-1">
                La permaculture, c'est avant tout prendre soin de soi.
              </p>
              <p className="text-xs text-gray-500 italic">
                Soi‑nier ou Gai‑rire il faut choisir !
              </p>
            </div>
            <div className="w-full rounded-xl p-4 border border-gray-200 text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Formations</p>
              <ul className="space-y-2">
                {FORMATEUR_FORMATIONS.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full" style={{ background: BRAND }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-2 space-y-4">
            {FORMATEUR_BIO.map((para, i) => (
              <p key={i} className="text-gray-700 text-sm leading-relaxed">
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
   TÉMOIGNAGES
───────────────────────────────────────────── */
function TemoignagesSection({ slug }: { slug: string }) {
  const list = TEMOIGNAGES[slug] ?? [];
  if (!list.length) return null;
  return (
    <section className="py-14" style={{ background: "#f7f4f0" }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle>Témoignages</SectionTitle>
        <div className="space-y-6">
          {list.map((t, i) => (
            <div key={i} className="bg-white rounded-xl p-8 shadow-sm border-l-4 flex gap-5 items-start" style={{ borderColor: BRAND }}>
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ background: BRAND }}
              >
                {t.initiales}
              </div>
              <div>
                <p className="text-gray-700 text-sm leading-relaxed italic">{t.texte}</p>
                <div className="flex gap-0.5 mt-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className="w-3.5 h-3.5" style={{ fill: BRAND }} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
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
   DESCRIPTION (Jeux / Posters)
───────────────────────────────────────────── */
function DescriptionSection({ product }: { product: Product }) {
  return (
    <section className="py-12" style={{ background: "#f7f4f0" }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-xl p-8 border border-gray-200 space-y-4 text-gray-700 text-sm leading-relaxed">
          {product.descriptionLongue.map((para, i) => (
            <p key={i} style={{ whiteSpace: "pre-line" }}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PRODUITS SIMILAIRES
───────────────────────────────────────────── */
function RelatedCard({ product }: { product: Product }) {
  return (
    <Link href={`/boutique/${product.slug}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer border border-gray-100 group">
        <div className="flex items-center justify-center bg-[#f5f1ec]" style={{ minHeight: "150px" }}>
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.titre}
              className="w-full object-contain p-4 transition-transform duration-200 group-hover:scale-105"
              style={{ maxHeight: "150px" }}
            />
          ) : (
            <span className="text-xs text-gray-400 uppercase tracking-widest">Image à venir</span>
          )}
        </div>
        <div className="p-5">
          <span
            className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full text-white mb-3 inline-block"
            style={{ background: BRAND }}
          >
            {product.categorieLabel}
          </span>
          <h4
            className="text-gray-800 font-bold text-sm leading-snug group-hover:underline mt-1"
            style={{ fontFamily: "Atma, sans-serif" }}
          >
            {product.titre}
          </h4>
          <p className="font-bold mt-2 text-sm" style={{ color: BRAND }}>{product.prix}</p>
        </div>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════════════════
   PAGE PRINCIPALE
═══════════════════════════════════════════════ */
export default function ProductPage() {
  const params = useParams<{ sub: string }>();
  const slug = params?.sub ?? "";
  const product = getProductBySlug(slug);

  if (!product) return <NotFound />;

  const related = getRelatedProducts(product.produitsSimilaires);
  const isStage = product.categorie === "stages";
  const isTherapie = product.categorie === "therapie";

  return (
    <main className="bg-white min-h-screen">
      {/* Fil d'Ariane */}
      <div className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          <Link href="/">
            <span className="cursor-pointer hover:underline font-medium" style={{ color: BRAND }}>Accueil</span>
          </Link>
          <span className="text-gray-300">›</span>
          <Link href="/boutique">
            <span className="cursor-pointer hover:underline font-medium" style={{ color: BRAND }}>Boutique</span>
          </Link>
          <span className="text-gray-300">›</span>
          <span className="truncate">{product.titre}</span>
        </div>
      </div>

      {/* ── Galerie + Panneau produit ── */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Galerie */}
            <ProductGallery product={product} />

            {/* Infos produit */}
            <div className="flex flex-col gap-4">
              <span
                className="self-start text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full text-white"
                style={{ background: BRAND }}
              >
                {product.categorieLabel}
              </span>

              <h1
                className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight"
                style={{ fontFamily: "Atma, sans-serif" }}
              >
                {product.titre}
              </h1>

              {product.subtitle && (
                <p className="text-gray-500 text-sm italic">{product.subtitle}</p>
              )}

              <Stars />

              <div className="py-4 border-t border-b border-gray-100 flex items-baseline gap-2 flex-wrap">
                <span className="text-3xl font-extrabold" style={{ color: BRAND }}>{product.prix}</span>
                {isStage && (
                  <span className="text-xs text-gray-400">par personne – ou en couple</span>
                )}
              </div>

              {/* Dates */}
              {product.dates && product.dates.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Dates disponibles</p>
                  <div className="flex flex-wrap gap-2">
                    {product.dates.map((d, i) => (
                      <span
                        key={i}
                        className="text-xs font-semibold border rounded-lg px-3 py-1.5"
                        style={{ borderColor: BRAND, color: BRAND }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description courte */}
              <p className={`text-gray-700 text-sm leading-relaxed ${isStage ? "italic" : ""}`}>
                {product.descriptionCourte}
              </p>

              {/* Panel description */}
              {product.panelDescription?.map((para, i) => (
                <p key={i} className="text-gray-600 text-sm leading-relaxed">{para}</p>
              ))}

              {/* Étapes thérapie */}
              <EtapesPanel product={product} />

              <div className="pt-2 flex flex-col gap-3">
                <a
                  href="mailto:Contact@Franck-Nathie.com?subject=Commande - Boutique"
                  className="w-full text-center text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-sm transition-opacity hover:opacity-90"
                  style={{ background: BRAND }}
                >
                  {isStage || isTherapie ? "S'inscrire à la formation" : "Commander"}
                </a>
                <a
                  href="mailto:Contact@Franck-Nathie.com"
                  className="w-full text-center font-semibold text-sm py-3 px-6 rounded-xl border transition-colors hover:bg-[#f7f4f0]"
                  style={{ borderColor: BRAND, color: BRAND }}
                >
                  Contacter Franck
                </a>
                {(isStage || isTherapie) && (
                  <p className="text-xs text-gray-400 text-center italic">
                    Paiement en plusieurs fois possible par carte bancaire
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sections stages ── */}
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

      {/* ── Sections thérapie ── */}
      {isTherapie && (
        <>
          <PourQuiSection product={product} />
          <ContenuFormationSection product={product} />
          <EchecSection product={product} />
          <FormateurSection />
        </>
      )}

      {/* ── Jeux / Posters ── */}
      {!isStage && !isTherapie && product.descriptionLongue.length > 0 && (
        <DescriptionSection product={product} />
      )}

      {/* ── Produits similaires ── */}
      {related.length > 0 && (
        <section className="py-12 border-t border-gray-100 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "Atma, sans-serif" }}>
                Vous aimerez aussi
              </h2>
              <div className="w-10 h-0.5 rounded-full mt-2" style={{ background: BRAND }} />
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
