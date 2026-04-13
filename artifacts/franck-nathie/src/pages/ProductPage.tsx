import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import type { Product } from "@/data/products";
import NotFound from "@/pages/not-found";

/* ═══════════════════════════════════════════════════════════
   DESIGN — Professionnel sobre
   Référence : sites comme BetterHelp, Lyra Health, coaching haut de gamme
   Règle absolue : BLANC partout. Orange = CTA uniquement.
   ═══════════════════════════════════════════════════════════ */
const ORA = "#E86B0A";
const DARK = "#1a1a1a";
const MID  = "#555555";
const LITE = "#f4f4f4";   // section alternée, à peine perceptible
const BORDER = "#e5e5e5";

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
      texte: "J'ai vécu des trucs très durs dans mon enfance qui sont liés au viol, au rejet, à l'abandon, à la violence de mon frère et des hommes en général envers moi. Je suis arrivé dans le stage avec l'appréhension qu'une fois de plus on allait me juger et me rejeter, et pour la première fois, cette part de moi un peu « warrior » que je n'aimais pas a été accueilli comme une belle part qui ne voulaient que mon bien. Ces cartes et la bienveillance de Franck m'ont permis de pouvoir faire un peu la paix dans cette guerre qu'il y avait en moi. En quelques mois, ma vie et mon comportement ont changé.",
      auteur: "C.",
    },
    {
      texte: "Vu que je lance un projet d'écohameau avec mes enfants et leurs amis, j'ai un peu peur de tout mettre à l'eau avec mon tempérament un peu Brutus. J'avais vu des vidéos de Franck et ça me parlait, je voulais vraiment faire un stage à la Forêt Nourricière, car je me reconnaissais dans son témoignage.",
      auteur: "Kisoka Agnès, 2023",
    },
  ],
  "stage-capt": [
    {
      texte: "Pour mettre en application les outils développés par Franck de manière théorique, j'ai fait une expérimentation avec mes enfants de la méthode pour résoudre un conflit récurrent. Impressionnée par les résultats, j'ai eu envie d'aller plus loin avec l'accompagnement de Franck lors d'un stage 3 jours méthode CAPT. Et j'ai bien fait ! Participer à un stage de la Forêt Nourricière n'a rien à voir avec pratiquer des outils chez soi.",
      auteur: "M.",
    },
  ],
};

/* ──────────────────── UTILITAIRES ──────────────────── */
function StarFill() {
  return (
    <svg className="w-4 h-4 inline" fill={ORA} viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: ORA }}>
      {children}
    </p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-bold leading-tight mb-6"
      style={{ fontFamily: "Atma, sans-serif", fontSize: "clamp(24px, 3vw, 36px)", color: DARK }}
    >
      {children}
    </h2>
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
        style={{ background: LITE, minHeight: "380px", aspectRatio: "1/1" }}
      >
        {images.length > 0 ? (
          <img src={images[activeIdx]} alt={product.titre} className="w-full h-full object-contain p-6" />
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
              className="w-14 h-14 rounded overflow-hidden cursor-pointer transition-all"
              style={{
                background: LITE,
                outline: i === activeIdx ? `2px solid ${ORA}` : `2px solid transparent`,
                outlineOffset: "1px",
                opacity: i === activeIdx ? 1 : 0.5,
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
    <div className="mt-5 pt-5 space-y-4" style={{ borderTop: `1px solid ${BORDER}` }}>
      {product.etapes.map((e) => (
        <div key={e.num} className="flex gap-4 items-start">
          <span className="flex-shrink-0 text-sm font-bold tabular-nums" style={{ color: ORA, minWidth: "20px" }}>
            {String(e.num).padStart(2, "0")}
          </span>
          <div>
            <p className="text-sm font-semibold" style={{ color: DARK }}>{e.titre} :</p>
            {e.texte && (
              <p className="text-xs mt-1 leading-relaxed" style={{ color: MID }}>{e.texte}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTIONS PRODUIT
   ═══════════════════════════════════════════════════════════ */

/* 1. POUR QUI — blanc, 2 ou 3 colonnes selon données */
function PourQuiSection({ product }: { product: Product }) {
  if (!product.pourQuiTitle) return null;

  const hasImages = !!(product.pourQuiImages?.length);
  const hasHighlights = !!(product.highlights?.length);

  return (
    <section className="py-20 bg-white" style={{ borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-6xl mx-auto px-8">
        <SectionLabel>Pour qui ?</SectionLabel>
        <H2>{product.pourQuiTitle}</H2>

        <div
          className="grid gap-12 items-start mt-10"
          style={{
            gridTemplateColumns: hasImages && hasHighlights
              ? "1fr 2fr 1fr"
              : hasImages
              ? "1fr 2fr"
              : hasHighlights
              ? "2fr 1fr"
              : "1fr",
          }}
        >
          {/* Illustrations */}
          {hasImages && (
            <div className="grid grid-cols-2 gap-2">
              {product.pourQuiImages!.map((src, i) => (
                <div key={i} className="rounded overflow-hidden aspect-square" style={{ background: LITE }}>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Texte / liste */}
          <div>
            {product.pourQuiText && product.pourQuiText.length > 0 ? (
              <div className="space-y-4">
                {product.pourQuiText.map((para, i) => (
                  <p key={i} className="leading-relaxed" style={{ color: i === 0 ? DARK : MID, fontSize: i === 0 ? "16px" : "14px", fontWeight: i === 0 ? 600 : 400 }}>
                    {para}
                  </p>
                ))}
              </div>
            ) : (
              <ul className="space-y-4">
                {product.pourQui.map((item, i) => (
                  <li key={i} className="flex gap-3 items-start text-sm leading-relaxed" style={{ color: MID }}>
                    <span className="flex-shrink-0 mt-2 block w-1.5 h-1.5 rounded-full" style={{ background: ORA }} />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Highlights — traitement éditorial, pas de boîtes colorées */}
          {hasHighlights && (
            <div className="space-y-6">
              {product.highlights!.map((h, i) => (
                <div key={i} className="pl-4" style={{ borderLeft: `3px solid ${ORA}` }}>
                  <p className="text-sm font-semibold leading-snug" style={{ color: DARK }}>{h}</p>
                </div>
              ))}
              <a
                href="mailto:Contact@Franck-Nathie.com?subject=Inscription"
                className="block text-center text-white text-sm font-bold py-3 px-5 rounded transition-opacity hover:opacity-85"
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

/* 2. BANNIÈRE STAGE — image plein fond, overlay neutre sombre */
function StageTitleSection({ product }: { product: Product }) {
  if (!product.stageTitle) return null;
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{
        backgroundImage: `url("https://laforetnourriciere.org/wp-content/uploads/2019/07/P1210349-scaled.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
      }}
    >
      <div className="absolute inset-0" style={{ background: "rgba(20,20,20,0.72)" }} />
      <div className="relative z-10 max-w-3xl mx-auto px-8 text-center">
        <H2>
          <span style={{ color: "#fff" }}>{product.stageTitle}</span>
        </H2>
        {product.stageDescription?.map((para, i) => (
          <p key={i} className="text-white leading-relaxed max-w-xl mx-auto"
            style={{ fontSize: i === (product.stageDescription!.length - 1) ? "18px" : "15px", opacity: i === (product.stageDescription!.length - 1) ? 1 : 0.8, marginTop: "12px" }}>
            {para}
          </p>
        ))}
      </div>
    </section>
  );
}

/* 3. PROGRAMME — blanc, méta en ligne + jours, aucune couleur de fond sur cards */
function ProgrammeSection({ product }: { product: Product }) {
  if (!product.etapes?.length || product.categorie !== "stages") return null;

  const meta = [
    { label: "Durée", value: `${product.etapes.length} jours` },
    { label: "Dates", value: product.dates?.[0] ?? "" },
    { label: "Tarif", value: product.prix },
    { label: "Lieu", value: product.lieu ?? "" },
  ];

  return (
    <section className="py-20 bg-white" style={{ borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-6xl mx-auto px-8">
        <SectionLabel>Formation</SectionLabel>
        <H2>Programme de la formation</H2>

        {/* Méta — ligne sobre, pas d'icônes colorées */}
        <div className="grid grid-cols-4 divide-x mb-14" style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, divideColor: BORDER }}>
          {meta.map((m) => (
            <div key={m.label} className="px-6 py-5">
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: MID }}>{m.label}</p>
              <p className="font-semibold text-sm leading-snug" style={{ color: DARK }}>{m.value}</p>
            </div>
          ))}
        </div>

        {/* Jours */}
        <div className="grid grid-cols-3 gap-5 mb-10">
          {product.etapes.map((e) => (
            <div key={e.num} className="rounded-lg p-6 bg-white" style={{ border: `1px solid ${BORDER}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORA }}>
                Jour {e.num}
              </p>
              <p className="text-sm font-semibold leading-snug mb-2" style={{ color: DARK }}>
                {e.titre.replace(/^Jour \d+ [-–] /, "")}
              </p>
              {e.texte && <p className="text-xs leading-relaxed" style={{ color: MID }}>{e.texte}</p>}
            </div>
          ))}
        </div>

        {/* Public + CTA */}
        <div className="flex items-center justify-between gap-6 py-5" style={{ borderTop: `1px solid ${BORDER}` }}>
          {product.publicNote && (
            <p className="text-sm" style={{ color: MID }}><span className="font-semibold" style={{ color: DARK }}>Public : </span>{product.publicNote}</p>
          )}
          <a
            href="mailto:Contact@Franck-Nathie.com?subject=Inscription"
            className="flex-shrink-0 text-sm font-bold text-white px-6 py-3 rounded transition-opacity hover:opacity-85"
            style={{ background: ORA }}
          >
            Je m'inscris à la formation
          </a>
        </div>
      </div>
    </section>
  );
}

/* 4. LE FORMATEUR — blanc, 3 colonnes */
function FormateurSection() {
  return (
    <section className="py-20" style={{ background: LITE }}>
      <div className="max-w-6xl mx-auto px-8">
        <SectionLabel>Qui vous accompagne</SectionLabel>
        <H2>Le formateur</H2>

        <div className="grid grid-cols-3 gap-12 items-start">
          {/* Portrait */}
          <div className="flex flex-col items-center text-center gap-5">
            <div className="w-36 h-36 rounded-full overflow-hidden" style={{ background: "#ddd" }}>
              <img
                src="https://laforetnourriciere.org/wp-content/uploads/2020/11/Franck-Nathie.jpg"
                alt="Franck Nathié"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const s = document.createElement("span");
                  s.textContent = "FN";
                  s.style.cssText = "font-size:2.5rem;font-weight:bold;color:#888;font-family:Atma,sans-serif;display:flex;align-items:center;justify-content:center;height:100%";
                  e.currentTarget.parentElement?.appendChild(s);
                }}
              />
            </div>
            <div>
              <p className="font-bold text-lg" style={{ fontFamily: "Atma, sans-serif", color: DARK }}>
                Franck Nathié
              </p>
              <p className="text-xs mt-1 italic leading-relaxed" style={{ color: MID }}>
                La permaculture, c'est avant tout prendre soin de soi.
              </p>
            </div>
            <div className="w-full text-left">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORA }}>Formations reçues</p>
              <ul className="space-y-2">
                {FORMATEUR_FORMATIONS.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: MID }}>
                    <span className="flex-shrink-0 mt-1.5 block w-1 h-1 rounded-full" style={{ background: ORA }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bio */}
          <div className="col-span-2 space-y-5">
            {FORMATEUR_BIO.map((para, i) => (
              <p key={i} className="text-sm leading-relaxed" style={{ color: i === 0 ? DARK : MID }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 5. QUE VA APPORTER — blanc, liste numérotée claire */
function VaApporterSection({ product }: { product: Product }) {
  if (!product.vaApporter?.length) return null;
  return (
    <section className="py-20 bg-white" style={{ borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-6xl mx-auto px-8">
        <SectionLabel>Bénéfices</SectionLabel>
        <H2>Que va apporter ce stage à ta nouvelle vie ?</H2>
        <div className="grid grid-cols-2 gap-x-16 gap-y-5 mt-8">
          {product.vaApporter.map((item, i) => (
            <div key={i} className="flex gap-4 items-start">
              <span
                className="flex-shrink-0 font-bold text-lg tabular-nums leading-none mt-0.5"
                style={{ color: ORA, minWidth: "28px" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: MID }}>{item}</p>
            </div>
          ))}
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
    <section className="py-20 bg-white" style={{ borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-6xl mx-auto px-8">
        <SectionLabel>Programme</SectionLabel>
        <H2>Contenus de formation</H2>
        <div className="grid grid-cols-3 gap-8 mt-6">
          <div className="rounded-lg p-6" style={{ border: `1px solid ${BORDER}` }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: ORA }}>Contenu</p>
            <ul className="space-y-2">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: MID }}>
                  <span className="flex-shrink-0 mt-1.5 block w-1 h-1 rounded-full" style={{ background: ORA }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 flex flex-col gap-5">
            {modules.map((mod, mi) => (
              <div key={mi} className="rounded-lg p-6" style={{ border: `1px solid ${BORDER}` }}>
                <p className="font-semibold text-sm mb-3" style={{ color: DARK }}>{mod.title}</p>
                <ul className="space-y-2">
                  {mod.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: MID }}>
                      <span className="flex-shrink-0 mt-1.5 block w-1 h-1 rounded-full" style={{ background: ORA }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <a
              href="mailto:Contact@Franck-Nathie.com?subject=Inscription - Thérapie"
              className="self-start text-sm font-bold text-white px-6 py-3 rounded transition-opacity hover:opacity-85"
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
    <section className="py-20" style={{ background: LITE, borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-4xl mx-auto px-8">
        <SectionLabel>Contexte</SectionLabel>
        <H2>L'échec de la psychanalyse et de beaucoup de thérapie</H2>
        <div className="space-y-4">
          {product.echeTexte.map((para, i) => (
            <p key={i} className="text-sm leading-relaxed" style={{ color: MID }}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 8. TÉMOIGNAGES — fond gris très clair */
function TemoignagesSection({ slug }: { slug: string }) {
  const list = TEMOIGNAGES[slug] ?? [];
  if (!list.length) return null;
  return (
    <section className="py-20" style={{ background: LITE, borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-6xl mx-auto px-8">
        <SectionLabel>Ce qu'ils en disent</SectionLabel>
        <H2>Témoignages</H2>
        <div className="grid grid-cols-2 gap-6 mt-6">
          {list.map((t, i) => (
            <div key={i} className="bg-white rounded-lg p-8 flex flex-col gap-5" style={{ border: `1px solid ${BORDER}` }}>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => <StarFill key={s} />)}
              </div>
              <p className="text-sm leading-relaxed italic flex-1" style={{ color: MID }}>
                « {t.texte} »
              </p>
              <p className="text-xs font-semibold pt-4" style={{ color: DARK, borderTop: `1px solid ${BORDER}` }}>
                {t.auteur}
              </p>
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
    <section className="py-16 bg-white" style={{ borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-4xl mx-auto px-8">
        <div className="space-y-4 text-sm leading-relaxed" style={{ color: MID }}>
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
      <div
        className="bg-white rounded-lg overflow-hidden cursor-pointer group transition-shadow hover:shadow-md"
        style={{ border: `1px solid ${BORDER}` }}
      >
        <div className="flex items-center justify-center" style={{ background: LITE, minHeight: "160px" }}>
          {product.images[0] ? (
            <img src={product.images[0]} alt={product.titre} className="w-full object-contain p-4 max-h-40 transition-transform group-hover:scale-105" />
          ) : (
            <span className="text-xs text-gray-400 uppercase tracking-widest">Image à venir</span>
          )}
        </div>
        <div className="p-5">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: ORA }}>
            {product.categorieLabel}
          </p>
          <h4 className="font-bold text-sm leading-snug mb-2" style={{ fontFamily: "Atma, sans-serif", color: DARK }}>
            {product.titre}
          </h4>
          <p className="font-bold text-sm" style={{ color: ORA }}>{product.prix}</p>
        </div>
      </div>
    </Link>
  );
}

/* ════════════════════════════════════════════════════
   PAGE PRINCIPALE
   ════════════════════════════════════════════════════ */
export default function ProductPage() {
  const params = useParams<{ sub: string }>();
  const slug = params?.sub ?? "";
  const product = getProductBySlug(slug);
  if (!product) return <NotFound />;

  const related = getRelatedProducts(product.produitsSimilaires);
  const isStage = product.categorie === "stages";
  const isTherapie = product.categorie === "therapie";

  return (
    <main style={{ background: "#fff", color: DARK }}>
      {/* Fil d'Ariane */}
      <div style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-6xl mx-auto px-8 py-3 flex items-center gap-2 text-sm flex-wrap" style={{ color: MID }}>
          <Link href="/"><span className="hover:underline cursor-pointer" style={{ color: ORA }}>Accueil</span></Link>
          <span style={{ color: BORDER }}>›</span>
          <Link href="/boutique"><span className="hover:underline cursor-pointer" style={{ color: ORA }}>Boutique</span></Link>
          <span style={{ color: BORDER }}>›</span>
          <span>{product.titre}</span>
        </div>
      </div>

      {/* ══ PANNEAU PRODUIT ══ */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-2 gap-16 items-start">
            {/* Galerie */}
            <ProductGallery product={product} />

            {/* Infos */}
            <div className="flex flex-col gap-5">
              {/* Badge catégorie — texte seul, sans fond coloré */}
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: ORA }}>
                {product.categorieLabel}
              </p>

              <h1
                className="font-bold leading-tight"
                style={{ fontFamily: "Atma, sans-serif", fontSize: "clamp(28px, 4vw, 42px)", color: DARK }}
              >
                {product.titre}
              </h1>

              {product.subtitle && (
                <p className="text-sm italic" style={{ color: MID }}>{product.subtitle}</p>
              )}

              {/* Étoiles */}
              <div className="flex items-center gap-1.5">
                {[1,2,3,4,5].map(s => <StarFill key={s} />)}
                <span className="text-sm ml-1" style={{ color: MID }}>(5 avis)</span>
              </div>

              {/* Prix */}
              <div className="py-5" style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
                <span className="text-4xl font-extrabold" style={{ color: ORA }}>{product.prix}</span>
                {isStage && (
                  <span className="ml-3 text-xs" style={{ color: MID }}>par personne – ou en couple</span>
                )}
              </div>

              {/* Dates */}
              {product.dates && product.dates.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: MID }}>
                    Dates disponibles
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.dates.map((d, i) => (
                      <span
                        key={i}
                        className="text-xs font-semibold rounded px-3 py-1.5"
                        style={{ border: `1px solid ${ORA}`, color: ORA }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description courte */}
              <p className="text-sm leading-relaxed" style={{ color: isStage ? DARK : MID, fontStyle: isStage ? "italic" : "normal", fontWeight: isStage ? 500 : 400 }}>
                {product.descriptionCourte}
              </p>

              {/* Paragraphes du panneau */}
              {product.panelDescription?.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed" style={{ color: MID }}>{para}</p>
              ))}

              {/* Étapes thérapie */}
              <EtapesPanel product={product} />

              {/* CTAs */}
              <div className="flex flex-col gap-3 pt-2">
                <a
                  href="mailto:Contact@Franck-Nathie.com?subject=Commande"
                  className="text-center text-white font-bold text-sm py-4 px-6 rounded transition-opacity hover:opacity-85"
                  style={{ background: ORA }}
                >
                  {isStage || isTherapie ? "S'inscrire à la formation" : "Commander"}
                </a>
                <a
                  href="mailto:Contact@Franck-Nathie.com"
                  className="text-center font-semibold text-sm py-3 px-6 rounded transition-colors hover:bg-gray-50"
                  style={{ border: `1px solid ${BORDER}`, color: DARK }}
                >
                  Contacter Franck
                </a>
                {(isStage || isTherapie) && (
                  <p className="text-xs text-center" style={{ color: MID }}>
                    Paiement en plusieurs fois possible par carte bancaire
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAGES ══ */}
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

      {/* ══ THÉRAPIE ══ */}
      {isTherapie && (
        <>
          <PourQuiSection product={product} />
          <ContenuFormationSection product={product} />
          <EchecSection product={product} />
          <FormateurSection />
        </>
      )}

      {/* ══ JEUX / POSTERS ══ */}
      {!isStage && !isTherapie && product.descriptionLongue.length > 0 && (
        <DescriptionSection product={product} />
      )}

      {/* ══ PRODUITS SIMILAIRES ══ */}
      {related.length > 0 && (
        <section className="py-16 bg-white" style={{ borderTop: `1px solid ${BORDER}` }}>
          <div className="max-w-6xl mx-auto px-8">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: ORA }}>À découvrir aussi</p>
            <H2>Vous aimerez aussi</H2>
            <div className="grid grid-cols-3 gap-6 mt-6">
              {related.map((p) => <RelatedCard key={p.slug} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
