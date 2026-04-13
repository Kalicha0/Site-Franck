import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import type { Product } from "@/data/products";
import NotFound from "@/pages/not-found";

/* ══════════════════════════════════════════════════════
   DESIGN TOKENS — extraits pixel-par-pixel de l'original
   laforetnourriciere.org
   ══════════════════════════════════════════════════════ */
const ORA = "#E86B0A";          // Franck orange (boutons, accents)
const TXT = "#091b18";          // texte corps (quasi-noir chaud)
const BG_CREAM = "#f0eee5";    // fond crème clair (témoignages)
const BG_TAN   = "#b9b58d";    // fond tan (Que va apporter)
const BG_GRAD  = "linear-gradient(180deg, #ffffff 0%, #f0eee5 100%)"; // Pour qui
const BG_BANNER = `url("https://laforetnourriciere.org/wp-content/uploads/2023/07/Les-parts-Decharges.png")`;

const FORMATEUR_BIO = [
  "Dyslexique, dyspraxique, dysorthographique, née en banlieue parisienne, d'une famille conflictuelle, avec une estime de lui très basse et des troubles de la concentration sévère, Franck n'est pas parti dans la vie avec « un bon jeu de cartes ». Mais après de nombreuses thérapies et à la suite de multiples guérisons de ses blessures et des croyances limitantes, il réalise ses rêves et ses passions, a pu écrire 6 livres de référence de la permaculture francophone dont un chez Larousse, prouvent ainsi que la dyslexie et la dysorthographie étaient surmontables, Il est devenu médiateur et à créer « la forêt nourricière » et prouvent que la violence et les relations conflictuelles étaient surmontables, et joue de multiple instrument de musique, prouvent que les troubles psychomoteurs sont, eux aussi, surmontable quand la confiance et l'estime de soi revient.",
  "Il a expérimenté et fusionné de nombreuses méthodes de guérison et a développé des outils comme le jeu GAI-RIRE qui s'appuient sur plus de quinze années de pratique.",
  "Il anime des stages sur la synergie humaine depuis 2014",
];

const FORMATEUR_FORMATIONS = [
  "Guérison des blessures intérieures (depuis 2005 avec Jean Nahimana, Lise Bourbeau, Méthode Tipi, Méthode « The work » de Byron Katie)",
  "IFS Internal Family System (formé par l'association IFS France et Vinciane Van Houtrive / Bernard Piaget, Isabelle Desplat depuis 2019)",
  "Médiation et gestion positive du conflit (formé par le MAN — Mouvement pour une Alternative Non-violente et médiation CNV)",
  "La Communication transformative (formé par Lionel Santucci)",
  "La Communication Non Violente CNV (formé depuis 2005 avec Jean Nahimana, Isabelle Padovani, Godfrey Spencer, Thomas D'Ansembourg)",
];

const TEMOIGNAGES: Record<string, { texte: string; auteur: string }[]> = {
  "stage-guerison": [
    {
      texte: "J'ai vécu des trucs très durs dans mon enfance qui sont liés au viol, au rejet, à l'abandon, à la violence de mon frère et des hommes en général envers moi, du coup j'avais un tempérament de base assez dure et souvent l'habitude qu'on me juge et qu'on ne m'aime pas trop. Je suis arrivé dans le stage avec l'appréhension qu'une fois de plus on allait me juger et me rejeter, et pour la première fois, cette part de moi un peu « warrior » que je n'aimais pas a été accueilli comme une belle part qui ne voulaient que mon bien et j'ai vu qu'elle m'aidais à survivre, que la part de moi qui me faisais fuir la douleur dans les addictions, elle aussi, ne voulais que mon bien et le jeux de Franck et son regard bienveillant a permis de mettre tout ça sous mes yeux. Ces cartes et la bienveillance de Franck m'ont permis de pouvoir faire un peu la paix dans cette guerre qu'il y avait en moi entre toutes ces parts. En quelque mois, ma vie et mon comportement ont changé.",
      auteur: "C.",
    },
    {
      texte: "Vu que je lance un projet d'écohameau d'éco entrepreneuriat (aquaponie, maraichage) avec mes enfants et leurs amis, j'ai un peu peur de tout mettre à l'eau avec mon tempérament un peu Brutus. J'avais vu des vidéos de Franck et ça me parlait, je voulais vraiment faire un stage à la Forêt Nourricière, car je me reconnaissais dans le témoignage de Franck.",
      auteur: "Kisoka Agnès, 2023",
    },
  ],
  "stage-capt": [
    {
      texte: "Dans le cadre de ma collaboration avec la Forêt Nourricière, j'avais travaillé la méthode CAPT pour écrire l'article Comment communiquer avec authenticité et profondeur. Pour mettre en application les outils développés par Franck de manière théorique, j'ai fait une expérimentation avec mes enfants de la méthode pour résoudre un conflit récurrent. Impressionnée par les résultats de la méthode utilisée en autonomie, j'ai eu envie d'aller plus loin, et de la travailler en direct avec l'accompagnement de Franck, et d'autres personnes pour partager les expériences lors d'un stage 3 jour méthode CAPT. Et j'ai bien fait ! Participer à un stage de la Forêt Nourricière n'a rien à voir avec pratiquer des outils chez soi.",
      auteur: "M.",
    },
  ],
};

/* ──────────────────── SVG ICONS ──────────────────── */
function IconClock({ cls }: { cls?: string }) {
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function IconCalendar({ cls }: { cls?: string }) {
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function IconMoney({ cls }: { cls?: string }) {
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="3" /><line x1="17" y1="9" x2="17" y2="9" />
    </svg>
  );
}
function IconCompass({ cls }: { cls?: string }) {
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}
function IconCheck({ cls }: { cls?: string }) {
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function StarFill() {
  return (
    <svg className="w-4 h-4 inline" style={{ fill: ORA }} viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

/* ──────────────────── GALERIE ──────────────────── */
function ProductGallery({ product }: { product: Product }) {
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => setActiveIdx(0), [product.slug]);
  const { images } = product;

  return (
    <div>
      <div
        className="rounded-lg overflow-hidden flex items-center justify-center mb-3"
        style={{ background: "#f5f1ec", minHeight: "380px", aspectRatio: "1/1" }}
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
      {images.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className="w-16 h-16 rounded overflow-hidden cursor-pointer transition-all"
              style={{
                background: "#f5f1ec",
                outline: i === activeIdx ? `2px solid ${ORA}` : "2px solid transparent",
                outlineOffset: "1px",
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

/* ──────────────────── ÉTAPES THÉRAPIE (panneau) ──────────────────── */
function EtapesPanel({ product }: { product: Product }) {
  if (!product.etapes?.length || product.categorie !== "therapie") return null;
  return (
    <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
      {product.etapes.map((e) => (
        <div key={e.num} className="flex gap-3 items-start">
          <span
            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5"
            style={{ background: ORA }}
          >
            {e.num}
          </span>
          <div>
            <p className="text-sm font-semibold" style={{ color: TXT }}>{e.titre} :</p>
            {e.texte && (
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{e.texte}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTIONS — ordre exact de l'original
   ══════════════════════════════════════════════════════ */

/* 1. POUR QUI — gradient blanc→crème, 3 colonnes */
function PourQuiSection({ product }: { product: Product }) {
  if (!product.pourQuiTitle) return null;

  return (
    <section style={{ background: BG_GRAD }}>
      <div className="max-w-[1248px] mx-auto px-8 py-16">
        {/* Titre centré */}
        <h2
          className="text-center font-bold mb-12"
          style={{ fontFamily: "Atma, sans-serif", fontSize: "33px", color: TXT, lineHeight: 1.3 }}
        >
          {product.pourQuiTitle}
        </h2>

        <div className="grid gap-8 items-start"
          style={{ gridTemplateColumns: product.pourQuiImages?.length ? "1fr 1fr 1fr" : "1fr 1fr" }}
        >
          {/* Col 1 — Illustrations des parts */}
          {product.pourQuiImages && product.pourQuiImages.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {product.pourQuiImages.map((src, i) => (
                <div key={i} className="rounded overflow-hidden bg-white shadow-sm aspect-square">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Col 2 — Texte / liste */}
          <div>
            {product.pourQuiText && product.pourQuiText.length > 0 ? (
              <div className="space-y-3">
                {product.pourQuiText.map((para, i) => (
                  <p
                    key={i}
                    className="leading-relaxed"
                    style={{
                      color: TXT,
                      fontSize: i === 0 ? "16px" : "14px",
                      fontWeight: i === 0 ? 600 : 400,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            ) : (
              <ul className="space-y-3">
                {product.pourQui.map((item, i) => (
                  <li key={i} className="flex gap-3 items-start text-sm leading-relaxed" style={{ color: TXT }}>
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full" style={{ background: ORA }} />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Col 3 — Highlights + CTA */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="flex flex-col gap-3">
              {product.highlights.map((h, i) => {
                /* Couleurs exactes de l'original : brun foncé → brun moyen → orange */
                const bgs = ["#5C3B1E", "#7a4828", ORA];
                return (
                  <div
                    key={i}
                    className="rounded-lg p-5 text-white font-semibold text-sm leading-snug"
                    style={{ background: bgs[i % bgs.length] }}
                  >
                    {h}
                  </div>
                );
              })}
              <a
                href="mailto:Contact@Franck-Nathie.com?subject=Inscription"
                className="mt-2 block text-center text-white text-sm font-bold py-3 px-4 rounded-lg transition-opacity hover:opacity-90"
                style={{ background: ORA }}
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

/* 2. BANNIÈRE "UN STAGE DE TROIS JOURS" — image + overlay sombre */
function StageTitleSection({ product }: { product: Product }) {
  if (!product.stageTitle) return null;
  return (
    <section
      className="relative py-16"
      style={{
        backgroundImage: BG_BANNER,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay sombre rgba(67,68,68,0.56) comme l'original */}
      <div className="absolute inset-0" style={{ background: "rgba(67,68,68,0.56)" }} />
      <div className="relative z-10 max-w-[1248px] mx-auto px-8 text-center">
        <h2
          className="font-bold text-white mb-6"
          style={{ fontFamily: "Atma, sans-serif", fontSize: "33px", lineHeight: 1.3 }}
        >
          {product.stageTitle}
        </h2>
        {product.stageDescription?.map((para, i) => (
          <p
            key={i}
            className="text-white leading-relaxed mx-auto"
            style={{
              fontSize: i === product.stageDescription!.length - 1 ? "18px" : "14px",
              fontWeight: i === product.stageDescription!.length - 1 ? 700 : 400,
              marginTop: i === product.stageDescription!.length - 1 ? "20px" : undefined,
              maxWidth: "680px",
            }}
          >
            {para}
          </p>
        ))}
      </div>
    </section>
  );
}

/* 3. PROGRAMME — fond blanc, icônes SVG, content-boxes, public, CTA */
function ProgrammeSection({ product }: { product: Product }) {
  if (!product.etapes?.length || product.categorie !== "stages") return null;

  const meta = [
    { Icon: IconClock, label: "Durée", value: `${product.etapes.length} jours` },
    { Icon: IconCalendar, label: "Dates de sessions", value: product.dates?.join(" — ") ?? "" },
    { Icon: IconMoney, label: "Tarif", value: product.prix },
    { Icon: IconCompass, label: "Lieu", value: product.lieu ?? "" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1248px] mx-auto px-8">
        <h2
          className="text-center font-bold mb-10"
          style={{ fontFamily: "Atma, sans-serif", fontSize: "33px", color: TXT }}
        >
          Programme de la formation
        </h2>

        {/* Ligne de méta-infos */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          {meta.map((m) => (
            <div key={m.label} className="flex flex-col items-center text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-3"
                style={{ background: ORA }}
              >
                <m.Icon cls="w-7 h-7 text-white" />
              </div>
              <h3
                className="font-bold text-sm mb-1"
                style={{ color: TXT, fontFamily: "Atma, sans-serif" }}
              >
                {m.label}
              </h3>
              <p className="text-xs text-gray-600">{m.value}</p>
            </div>
          ))}
        </div>

        {/* Content boxes des jours */}
        <div className="grid grid-cols-3 gap-5 mb-8">
          {product.etapes.map((e) => (
            <div
              key={e.num}
              className="rounded-lg overflow-hidden border border-gray-200 shadow-sm"
            >
              <div className="flex items-center gap-3 px-5 py-4" style={{ background: ORA }}>
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white font-bold text-sm flex-shrink-0"
                  style={{ color: ORA }}
                >
                  {e.num}
                </span>
                <span className="text-white font-semibold text-xs uppercase tracking-wide">Jour {e.num}</span>
              </div>
              <div className="px-5 py-4 bg-white">
                <p className="text-sm font-medium leading-snug" style={{ color: TXT }}>
                  {e.titre.replace(/^Jour \d+ [-–] /, "")}
                </p>
                {e.texte && <p className="text-xs text-gray-500 mt-2 leading-relaxed">{e.texte}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Pour quel public + inscription */}
        {product.publicNote && (
          <div className="flex items-center justify-between gap-6 p-6 rounded-lg" style={{ background: BG_CREAM }}>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: ORA }}
              >
                <IconCheck cls="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-semibold" style={{ color: TXT }}>{product.publicNote}</p>
            </div>
            <a
              href="mailto:Contact@Franck-Nathie.com?subject=Inscription - Formation"
              className="flex-shrink-0 text-sm font-bold text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              style={{ background: ORA }}
            >
              Je m'inscris à la formation
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

/* 4. LE FORMATEUR — fond blanc, 2 colonnes */
function FormateurSection() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-[1248px] mx-auto px-8">
        <h2
          className="font-bold mb-10"
          style={{ fontFamily: "Atma, sans-serif", fontSize: "33px", color: TXT }}
        >
          Le formateur
        </h2>
        <div className="grid grid-cols-3 gap-12 items-start">
          {/* Portrait */}
          <div className="flex flex-col items-center text-center gap-4">
            <div
              className="w-36 h-36 rounded-full overflow-hidden flex items-center justify-center shadow-md"
              style={{ background: "#e8d8c8" }}
            >
              <img
                src="https://laforetnourriciere.org/wp-content/uploads/2020/11/Franck-Nathie.jpg"
                alt="Franck Nathié"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const s = document.createElement("span");
                  s.textContent = "FN";
                  s.style.cssText = "font-size:2rem;font-weight:bold;color:#7a4828;font-family:Atma,sans-serif";
                  e.currentTarget.parentElement?.appendChild(s);
                }}
              />
            </div>
            <div>
              <p
                className="font-bold text-xl"
                style={{ fontFamily: "Atma, sans-serif", color: TXT }}
              >
                Franck Nathié
              </p>
              <p className="text-xs text-gray-500 italic mt-1 leading-relaxed">
                La permaculture, c'est avant tout prendre soin de soi.<br />
                Soi‑nier ou Gai‑rire il faut choisir !
              </p>
            </div>
            <div className="w-full text-left rounded-lg p-4" style={{ background: BG_CREAM }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: ORA }}>
                Formations
              </p>
              <ul className="space-y-2">
                {FORMATEUR_FORMATIONS.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-700 leading-relaxed">
                    <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ background: ORA }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bio — 2/3 */}
          <div className="col-span-2 space-y-4">
            {FORMATEUR_BIO.map((para, i) => (
              <p key={i} className="text-sm leading-relaxed" style={{ color: TXT }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 5. QUE VA APPORTER — fond #b9b58d (tan), texte BLANC, 2 colonnes */
function VaApporterSection({ product }: { product: Product }) {
  if (!product.vaApporter?.length) return null;
  return (
    <section className="py-16" style={{ background: BG_TAN }}>
      <div className="max-w-[1248px] mx-auto px-8">
        <div className="grid grid-cols-2 gap-12 items-center">
          {/* Gauche : titre + liste */}
          <div>
            <h2
              className="font-bold text-white mb-8"
              style={{ fontFamily: "Atma, sans-serif", fontSize: "33px", lineHeight: 1.3 }}
            >
              Que va apporter ce stage à ta nouvelle vie ?
            </h2>
            <ul className="space-y-4">
              {product.vaApporter.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white leading-relaxed">
                  <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center bg-white font-bold text-xs" style={{ color: BG_TAN }}>
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {/* Droite : image illustrative */}
          <div className="flex items-center justify-center">
            <img
              src="https://laforetnourriciere.org/wp-content/uploads/2023/07/Copie-de-GENTIL-SAUVEUR-MECHANT-scaled.jpg"
              alt="Guérison des blessures"
              className="rounded-xl shadow-lg w-full object-cover max-h-96"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* 6. CONTENUS DE FORMATION (Thérapie) */
function ContenuFormationSection({ product }: { product: Product }) {
  if (!product.contenuFormation) return null;
  const { items, modules } = product.contenuFormation;
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1248px] mx-auto px-8">
        <h2
          className="font-bold mb-10"
          style={{ fontFamily: "Atma, sans-serif", fontSize: "33px", color: TXT }}
        >
          Contenus de formation
        </h2>
        <div className="grid grid-cols-3 gap-8">
          <div className="rounded-lg p-6" style={{ background: BG_CREAM }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: ORA }}>Contenu</p>
            <ul className="space-y-2">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: TXT }}>
                  <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ background: ORA }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 flex flex-col gap-5">
            {modules.map((mod, mi) => (
              <div key={mi} className="rounded-lg p-6 border border-gray-200">
                <p className="font-semibold text-sm mb-3" style={{ color: TXT }}>{mod.title}</p>
                <ul className="space-y-2">
                  {mod.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ background: ORA }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <a
              href="mailto:Contact@Franck-Nathie.com?subject=Inscription - Thérapie"
              className="self-start text-sm font-bold text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              style={{ background: ORA }}
            >
              Je m'inscris
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 7. ÉCHEC PSYCHANALYSE (Thérapie) */
function EchecSection({ product }: { product: Product }) {
  if (!product.echeTexte?.length) return null;
  return (
    <section className="py-16" style={{ background: BG_CREAM }}>
      <div className="max-w-[1248px] mx-auto px-8">
        <h2
          className="font-bold mb-8"
          style={{ fontFamily: "Atma, sans-serif", fontSize: "33px", color: TXT }}
        >
          L'échec de la psychanalyse et de beaucoup de thérapie
        </h2>
        <div className="columns-2 gap-10">
          {product.echeTexte.map((para, i) => (
            <p key={i} className="text-sm leading-relaxed break-inside-avoid mb-4" style={{ color: TXT }}>
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 8. TÉMOIGNAGES — fond #f0eee5 */
function TemoignagesSection({ slug }: { slug: string }) {
  const list = TEMOIGNAGES[slug] ?? [];
  if (!list.length) return null;
  return (
    <section className="py-16" style={{ background: BG_CREAM }}>
      <div className="max-w-[1248px] mx-auto px-8">
        <h2
          className="font-bold mb-10"
          style={{ fontFamily: "Atma, sans-serif", fontSize: "33px", color: TXT }}
        >
          Témoignages
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {list.map((t, i) => (
            <div
              key={i}
              className="rounded-lg p-8 flex flex-col gap-4"
              style={{ background: "#ffffff", border: `1px solid #dfddd2` }}
            >
              <p className="text-sm leading-relaxed italic" style={{ color: TXT }}>
                « {t.texte} »
              </p>
              <div className="flex items-center gap-3 mt-auto pt-4 border-t" style={{ borderColor: "#dfddd2" }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ background: ORA }}
                >
                  {t.auteur.slice(0, 1)}
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: TXT }}>{t.auteur}</p>
                  <div className="flex gap-0.5 mt-0.5">
                    {[1,2,3,4,5].map(s => <StarFill key={s} />)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* DESCRIPTION — Jeux / Posters */
function DescriptionSection({ product }: { product: Product }) {
  return (
    <section className="py-12" style={{ background: BG_CREAM }}>
      <div className="max-w-[1248px] mx-auto px-8">
        <div className="bg-white rounded-lg p-8 border border-gray-200 space-y-4 text-sm leading-relaxed" style={{ color: TXT }}>
          {product.descriptionLongue.map((para, i) => (
            <p key={i} style={{ whiteSpace: "pre-line" }}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* PRODUITS SIMILAIRES */
function RelatedCard({ product }: { product: Product }) {
  return (
    <Link href={`/boutique/${product.slug}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer group">
        <div className="flex items-center justify-center" style={{ background: "#f5f1ec", minHeight: "160px" }}>
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.titre}
              className="w-full object-contain p-4 transition-transform group-hover:scale-105"
              style={{ maxHeight: "160px" }}
            />
          ) : (
            <span className="text-xs text-gray-400 uppercase tracking-widest">Image à venir</span>
          )}
        </div>
        <div className="p-5">
          <span
            className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white inline-block mb-2"
            style={{ background: ORA }}
          >
            {product.categorieLabel}
          </span>
          <h4
            className="font-bold text-sm leading-snug mb-2"
            style={{ fontFamily: "Atma, sans-serif", color: TXT }}
          >
            {product.titre}
          </h4>
          <p className="font-bold text-sm" style={{ color: ORA }}>{product.prix}</p>
        </div>
      </div>
    </Link>
  );
}

/* ════════════════════════════════════════════════
   PAGE PRINCIPALE
   ════════════════════════════════════════════════ */
export default function ProductPage() {
  const params = useParams<{ sub: string }>();
  const slug = params?.sub ?? "";
  const product = getProductBySlug(slug);
  if (!product) return <NotFound />;

  const related = getRelatedProducts(product.produitsSimilaires);
  const isStage = product.categorie === "stages";
  const isTherapie = product.categorie === "therapie";

  return (
    <main style={{ background: "#fff", color: TXT }}>
      {/* Fil d'Ariane */}
      <div className="border-b border-gray-100">
        <div className="max-w-[1248px] mx-auto px-8 py-3 flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          <Link href="/"><span className="hover:underline cursor-pointer" style={{ color: ORA }}>Accueil</span></Link>
          <span className="text-gray-300">›</span>
          <Link href="/boutique"><span className="hover:underline cursor-pointer" style={{ color: ORA }}>Boutique</span></Link>
          <span className="text-gray-300">›</span>
          <span>{product.titre}</span>
        </div>
      </div>

      {/* ── PANNEAU PRODUIT ── */}
      <section className="py-12 bg-white">
        <div className="max-w-[1248px] mx-auto px-8">
          <div className="grid grid-cols-2 gap-16 items-start">
            {/* Galerie */}
            <ProductGallery product={product} />

            {/* Infos */}
            <div className="flex flex-col gap-5">
              <span
                className="self-start text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full text-white"
                style={{ background: ORA }}
              >
                {product.categorieLabel}
              </span>

              <h1
                className="font-bold leading-tight"
                style={{ fontFamily: "Atma, sans-serif", fontSize: "40px", color: TXT }}
              >
                {product.titre}
              </h1>

              {product.subtitle && (
                <p className="text-sm italic text-gray-500">{product.subtitle}</p>
              )}

              <div className="flex items-center gap-1.5">
                {[1,2,3,4,5].map(s => <StarFill key={s} />)}
                <span className="text-sm text-gray-500 ml-1">(5 avis)</span>
              </div>

              <div className="py-4 border-t border-b border-gray-100">
                <span className="text-4xl font-extrabold" style={{ color: ORA }}>{product.prix}</span>
                {isStage && (
                  <span className="ml-3 text-xs text-gray-400">par personne – ou en couple</span>
                )}
              </div>

              {/* Dates */}
              {product.dates && product.dates.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Dates disponibles</p>
                  <div className="flex flex-wrap gap-2">
                    {product.dates.map((d, i) => (
                      <span
                        key={i}
                        className="text-xs font-semibold border rounded-md px-3 py-1.5"
                        style={{ borderColor: ORA, color: ORA }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description courte */}
              <p className={`text-sm leading-relaxed ${isStage ? "italic font-medium" : ""}`} style={{ color: TXT }}>
                {product.descriptionCourte}
              </p>

              {/* Panel description */}
              {product.panelDescription?.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-gray-600">{para}</p>
              ))}

              {/* Étapes thérapie */}
              <EtapesPanel product={product} />

              {/* CTAs */}
              <div className="flex flex-col gap-3 pt-2">
                <a
                  href="mailto:Contact@Franck-Nathie.com?subject=Commande"
                  className="text-center text-white font-bold text-sm py-4 px-6 rounded-lg transition-opacity hover:opacity-90"
                  style={{ background: ORA }}
                >
                  {isStage || isTherapie ? "S'inscrire à la formation" : "Commander"}
                </a>
                <a
                  href="mailto:Contact@Franck-Nathie.com"
                  className="text-center font-semibold text-sm py-3 px-6 rounded-lg border transition-colors hover:bg-gray-50"
                  style={{ borderColor: ORA, color: ORA }}
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

      {/* ── SECTIONS STAGES (ordre exact de l'original) ── */}
      {isStage && (
        <>
          <PourQuiSection product={product} />
          <StageTitleSection product={product} />
          <ProgrammeSection product={product} />
          <FormateurSection />
          <VaApporterSection product={product} />
          <TemoignagesSection slug={slug} />
        </>
      )}

      {/* ── SECTIONS THÉRAPIE ── */}
      {isTherapie && (
        <>
          <PourQuiSection product={product} />
          <ContenuFormationSection product={product} />
          <EchecSection product={product} />
          <FormateurSection />
        </>
      )}

      {/* ── JEUX / POSTERS ── */}
      {!isStage && !isTherapie && product.descriptionLongue.length > 0 && (
        <DescriptionSection product={product} />
      )}

      {/* ── PRODUITS SIMILAIRES ── */}
      {related.length > 0 && (
        <section className="py-14 border-t border-gray-100 bg-white">
          <div className="max-w-[1248px] mx-auto px-8">
            <h2
              className="font-bold mb-8"
              style={{ fontFamily: "Atma, sans-serif", fontSize: "28px", color: TXT }}
            >
              Vous aimerez aussi
            </h2>
            <div className="grid grid-cols-3 gap-6">
              {related.map((p) => <RelatedCard key={p.slug} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
