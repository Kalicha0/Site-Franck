import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { Lock, RefreshCcw, Package, Heart, Calendar, MessageCircle, Video } from "lucide-react";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import type { Product } from "@/data/products";
import NotFound from "@/pages/not-found";

/* ═══════════════════════════════════════════════════════════
   DESIGN — Reproduction pixel-perfect de laforetnourriciere.org
   Couleurs extraites directement du code source CSS de l'original
   ═══════════════════════════════════════════════════════════
   --awb-color1  = #ffffff  blanc
   --awb-color2  = #f0eee5  crème   (fond panneau, témoignages, pour qui gradient)
   --awb-color3  = #dfddd2  beige clair (bordures, gradient formateur)
   --awb-color4  = #b9b58d  tan     (fond "Que va apporter" entier)
   --awb-color8  = #091b18  quasi-noir verdâtre (texte)
   --awb-custom_color_1 = #5c903f  vert
   --awb-custom_color_2 = #434444  gris foncé (colonne droite Pour Qui)
   --awb-custom_color_4 = #cc6633  orange (tous CTAs, accents)
   ═══════════════════════════════════════════════════════════ */
const C1  = "#ffffff";   // blanc
const C2  = "#f0eee5";   // crème
const C3  = "#dfddd2";   // beige clair / bordures
const C4  = "#b9b58d";   // tan
const C8  = "#091b18";   // texte principal
const ORA = "#cc6633";   // orange CTA
const DARK_COL = "#434444"; // colonne sombre "Pour Qui"
const MID = "#555555";

const BG_HERO_PARALLAX   = "https://laforetnourriciere.org/wp-content/uploads/2023/04/calendrier-jardin-foret.jpg";
const BG_STAGE_BANNER    = "https://laforetnourriciere.org/wp-content/uploads/2019/07/P1210349-scaled.jpg";
const BG_LES_PARTS       = "https://laforetnourriciere.org/wp-content/uploads/2023/07/Les-parts-Decharges.png";

/* ══ BADGES DE CONFIANCE ══
   Adaptés selon la nature du produit :
   - jeux/posters (livrables physiques) : icônes exactes du screenshot
   - stages : pas de livraison, pas de satisfait ou remboursé → remplacés
   - therapie : pas de livraison → remplacé par visio + accompagnement
*/
const TRUST_BADGES: Record<string, { icon: React.ReactNode; label: string }[]> = {
  jeux: [
    { icon: <Lock size={14} />,       label: "Sécurisé" },
    { icon: <RefreshCcw size={14} />, label: "Satisfait ou remboursé" },
    { icon: <Package size={14} />,    label: "Livraison soignée" },
  ],
  posters: [
    { icon: <Lock size={14} />,       label: "Sécurisé" },
    { icon: <RefreshCcw size={14} />, label: "Satisfait ou remboursé" },
    { icon: <Package size={14} />,    label: "Livraison soignée" },
  ],
  stages: [
    { icon: <Lock size={14} />,        label: "Paiement sécurisé" },
    { icon: <Heart size={14} />,       label: "Bienveillance garantie" },
    { icon: <Calendar size={14} />,    label: "Dates flexibles" },
  ],
  therapie: [
    { icon: <Lock size={14} />,           label: "Paiement sécurisé" },
    { icon: <MessageCircle size={14} />,  label: "Accompagnement personnalisé" },
    { icon: <Video size={14} />,          label: "Séance en visio" },
  ],
};

function TrustBadges({ categorie }: { categorie: string }) {
  const badges = TRUST_BADGES[categorie] ?? TRUST_BADGES["jeux"];
  return (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", paddingTop: "4px" }}>
      {badges.map((b, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: MID }}>
          <span style={{ color: ORA, display: "flex", alignItems: "center" }}>{b.icon}</span>
          {b.label}
        </span>
      ))}
    </div>
  );
}

/* ─── Textes formateur (constants partagées) ─── */
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
      texte: "J'ai vécu des trucs très durs dans mon enfance qui sont liés au viol, au rejet, à l'abandon, à la violence de mon frère et des hommes en général envers moi, du coup j'avais un tempérament de base assez dure et souvent l'habitude qu'on me juge et qu'on ne m'aime pas trop. Je suis arrivé dans le stage avec l'appréhension qu'une fois de plus on allait me juger et me rejeter, et pour la première fois, cette part de moi un peu « warrior » que je n'aimais pas a été accueilli comme une belle part qui ne voulaient que mon bien et j'ai vu qu'elle m'aidais à survivre, que la part de moi qui me faisais fuir la douleur dans les addictions, elle aussi, ne voulais que mon bien et le jeux de Franck et son regard bienveillant a permis de mettre tout ça sous mes yeux. Ces cartes et la bienveillance de Franck m'ont permis de pouvoir faire un peu la paix dans cette guerre qu'il y avait en moi entre toutes ces parts. En quelques mois, ma vie et mon comportement ont changé, je suis devenu plus douce, plus compréhensive envers moi et envers les autres, et en même temps, j'ai appris à mettre des limites et à ne plus me laisser juger, mes relations, ont changé, j'ai fait du vide, j'ai appris à m'aimer et me respecter. Au deuxième stage module 2 j'ai revus les autres stagiaires et tout le monde m'a dit (ce qui me le confirmait) que j'avais changé, que je n'étais plus la même. Grand merci Franck pour ta douceur, ta bienveillance et en même temps pour ce jeu \"Gai-rire\" qui m'a aider à changer ma vie, je t'aime, je m'aime, je n'y serai jamais arrivée sans toi et sans ton jeu génial. Gratitude éternelle !!",
      auteur: "C.",
    },
    {
      texte: "Vu que je lance un projet d'écohameau avec mes enfants et leurs amis, j'ai un peu peur de tout mettre à l'eau avec mon tempérament un peu Brutus. J'avais vu des vidéos de Franck et ça me parlait, je voulais vraiment faire un stage à la Forêt Nourricière, car je me reconnaissais dans son témoignage.",
      auteur: "Kisoka Agnès, 2023",
    },
    {
      texte: "Pour mettre en application les outils développés par Franck de manière théorique, j'ai fait une expérimentation avec mes enfants de la méthode pour résoudre un conflit récurrent. Impressionnée par les résultats, j'ai eu envie d'aller plus loin avec l'accompagnement de Franck lors d'un stage 3 jours méthode CAPT. Et j'ai bien fait ! Participer à un stage de la Forêt Nourricière n'a rien à voir avec pratiquer des outils chez soi.",
      auteur: "M.",
    },
  ],
  "stage-capt": [
    {
      texte: "Pour mettre en application les outils développés par Franck de manière théorique, j'ai fait une expérimentation avec mes enfants de la méthode pour résoudre un conflit récurrent. Impressionnée par les résultats, j'ai eu envie d'aller plus loin avec l'accompagnement de Franck lors d'un stage 3 jours méthode CAPT. Et j'ai bien fait ! Participer à un stage de la Forêt Nourricière n'a rien à voir avec pratiquer des outils chez soi.",
      auteur: "M.",
    },
  ],
};

/* ══ SVG ICONS ══ */
function IconClock() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}
function IconCalendar() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
}
function IconMoney() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
}
function IconPin() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
function IconCheck() {
  return <svg viewBox="0 0 24 24" fill="none" stroke={ORA} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg>;
}
function StarFill() {
  return (
    <svg className="inline" style={{ width: "16px", height: "16px" }} fill={ORA} viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
    </svg>
  );
}

/* ══ FLIP CARD — face orange / dos tan (style original laforetnourriciere.org) ══ */
function FlipCard({ text }: { text: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <>
      <style>{`
        .fc-inner { transition: transform 0.55s cubic-bezier(.4,0,.2,1); transform-style: preserve-3d; position: relative; }
        .fc-inner.flipped { transform: rotateY(180deg); }
        .fc-face { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; display: flex; align-items: center; justify-content: center; padding: 18px; border-radius: 6px; }
        .fc-back { transform: rotateY(180deg); }
      `}</style>
      <div
        style={{ perspective: "800px", width: "100%", height: "100px", cursor: "pointer", position: "relative" }}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        onClick={() => setFlipped(f => !f)}
      >
        <div className={`fc-inner${flipped ? " flipped" : ""}`} style={{ width: "100%", height: "100%" }}>
          {/* Face avant — orange */}
          <div className="fc-face" style={{ background: ORA }}>
            <p style={{ fontSize: "14px", fontWeight: 700, color: C1, textAlign: "center", lineHeight: 1.4, margin: 0 }}>{text}</p>
          </div>
          {/* Face arrière — tan */}
          <div className="fc-face fc-back" style={{ background: C4 }}>
            <p style={{ fontSize: "13px", fontWeight: 600, color: C1, textAlign: "center", lineHeight: 1.5, margin: 0 }}>{text}</p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ══ COMPOSANTS UTILITAIRES ══ */
function OrangeCircle({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center rounded-full flex-shrink-0"
      style={{ width: "48px", height: "48px", background: ORA }}>
      {icon}
    </div>
  );
}

function H2Orig({ children, color = C8 }: { children: React.ReactNode; color?: string }) {
  return (
    <h2 className="font-bold leading-tight mb-6"
      style={{ fontFamily: "Atma, sans-serif", fontSize: "clamp(26px, 3vw, 38px)", color }}>
      {children}
    </h2>
  );
}

/* ══ GALERIE PRODUIT ══ */
function ProductGallery({ product }: { product: Product }) {
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => setActiveIdx(0), [product.slug]);
  const { images } = product;

  return (
    <div>
      <div className="overflow-hidden flex items-center justify-center mb-3"
        style={{ background: C3, minHeight: "400px", aspectRatio: "4/3", borderRadius: "4px" }}>
        {images.length > 0
          ? <img src={images[activeIdx]} alt={product.titre} className="w-full h-full object-contain p-6" />
          : <span style={{ color: MID, fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px" }}>Image à venir</span>
        }
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 flex-wrap mt-2">
          {images.map((src, i) => (
            <button key={i} onClick={() => setActiveIdx(i)}
              style={{
                width: "64px", height: "64px", background: C3, borderRadius: "4px",
                overflow: "hidden", cursor: "pointer", padding: "2px",
                outline: i === activeIdx ? `2px solid ${ORA}` : "2px solid transparent",
                outlineOffset: "1px", opacity: i === activeIdx ? 1 : 0.55,
              }}>
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══ PANNEAU PRODUIT (colonne droite) ══ */
function ProductInfoPanel({ product }: { product: Product }) {
  const isStage = product.categorie === "stages";
  const isTherapie = product.categorie === "therapie";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      {/* Badge catégorie */}
      <div>
        <span style={{
          display: "inline-block", background: ORA, color: C1,
          fontSize: "11px", fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "1.5px", padding: "4px 12px", borderRadius: "3px",
        }}>{product.categorieLabel}</span>
      </div>

      {/* Titre */}
      <h1 style={{ fontFamily: "Atma, sans-serif", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700, color: C8, lineHeight: 1.15, margin: 0 }}>
        {product.titre}
      </h1>

      {/* Sous-titre */}
      {product.subtitle && (
        <p style={{ fontSize: "16px", color: MID, fontStyle: "italic", margin: 0 }}>{product.subtitle}</p>
      )}

      {/* Étoiles */}
      <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
        {[1,2,3,4,5].map(s => <StarFill key={s} />)}
        <span style={{ fontSize: "13px", color: MID, marginLeft: "6px" }}>(5 avis)</span>
      </div>

      {/* Séparateur */}
      <div style={{ borderTop: `1px solid ${C3}` }} />

      {/* Prix */}
      <div>
        <span style={{ fontSize: "36px", fontWeight: 800, color: ORA, fontFamily: "Atma, sans-serif" }}>{product.prix}</span>
        {isStage && (
          <span style={{ fontSize: "12px", color: MID, marginLeft: "10px" }}>par personne — ou en couple</span>
        )}
      </div>

      {/* Dates */}
      {product.dates && product.dates.length > 0 && (
        <div>
          <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: MID, marginBottom: "8px" }}>
            Dates disponibles
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {product.dates.map((d, i) => (
              <span key={i} style={{
                fontSize: "12px", fontWeight: 600, color: ORA,
                border: `1px solid ${ORA}`, borderRadius: "4px",
                padding: "5px 10px",
              }}>{d}</span>
            ))}
          </div>
        </div>
      )}

      {/* Séparateur */}
      <div style={{ borderTop: `1px solid ${C3}` }} />

      {/* Description courte */}
      {isStage && (
        <p style={{ fontSize: "14px", color: C8, fontStyle: "italic", fontWeight: 600, lineHeight: 1.6 }}>
          {product.descriptionCourte}
        </p>
      )}

      {/* Panel descriptions */}
      {product.panelDescription?.map((para, i) => (
        <p key={i} style={{ fontSize: "14px", color: MID, lineHeight: 1.7, margin: 0 }}>{para}</p>
      ))}

      {/* Étapes thérapie dans le panneau */}
      {isTherapie && product.etapes?.length ? (
        <div style={{ borderTop: `1px solid ${C3}`, paddingTop: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
          {product.etapes.map((e) => (
            <div key={e.num} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0, fontSize: "13px", fontWeight: 700, color: ORA, minWidth: "22px" }}>
                {String(e.num).padStart(2, "0")}
              </span>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 600, color: C8, margin: 0 }}>{e.titre}</p>
                {e.texte && <p style={{ fontSize: "12px", color: MID, margin: "4px 0 0", lineHeight: 1.6, whiteSpace: "pre-line" }}>{e.texte}</p>}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* CTAs */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "6px" }}>
        <a href={`mailto:Contact@Franck-Nathie.com?subject=${isStage || isTherapie ? "Inscription" : "Commande"}`}
          style={{
            display: "block", textAlign: "center", background: ORA, color: C1,
            fontWeight: 700, fontSize: "15px", padding: "14px 24px", borderRadius: "4px",
            textDecoration: "none", transition: "opacity 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          {isStage || isTherapie ? "S'inscrire à la formation" : "Commander"}
        </a>
        <a href="mailto:Contact@Franck-Nathie.com"
          style={{
            display: "block", textAlign: "center", background: "transparent",
            color: C8, fontWeight: 600, fontSize: "14px",
            padding: "12px 24px", borderRadius: "4px",
            border: `1px solid ${C3}`, textDecoration: "none",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = C3; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
        >
          Contacter Franck
        </a>
        {(isStage || isTherapie) && (
          <p style={{ fontSize: "12px", color: MID, textAlign: "center" }}>
            Paiement en plusieurs fois possible par carte bancaire
          </p>
        )}
      </div>

      {/* Badges de confiance — adaptés selon la catégorie */}
      <TrustBadges categorie={product.categorie} />
    </div>
  );
}

/* ═══════════════════════════════════════
   SECTIONS PAGE
   ═══════════════════════════════════════ */

/* SECTION 1 — POUR QUI
   bg: linear-gradient(180deg, #fff 0%, #f0eee5 100%)
   3 colonnes : images | liste | dark panel avec highlights + CTA
*/
function PourQuiSection({ product }: { product: Product }) {
  if (!product.pourQuiTitle) return null;
  const hasImages = !!(product.pourQuiImages?.length);
  const hasHighlights = !!(product.highlights?.length);

  return (
    <section style={{ background: `linear-gradient(180deg, ${C1} 0%, ${C2} 100%)`, padding: "70px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
        <H2Orig>{product.pourQuiTitle}</H2Orig>
        <div style={{
          display: "grid",
          gridTemplateColumns: hasImages && hasHighlights ? "1fr 2fr 1fr" : hasImages ? "1fr 2fr" : hasHighlights ? "2fr 1fr" : "1fr",
          gap: "32px",
          alignItems: "start",
        }}>

          {/* Colonne 1 : grille d'images */}
          {hasImages && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {product.pourQuiImages!.map((src, i) => (
                <div key={i} style={{ borderRadius: "6px", overflow: "hidden", aspectRatio: "1/1", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
                  <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              ))}
            </div>
          )}

          {/* Colonne 2 : texte / liste */}
          <div>
            {product.pourQuiText && product.pourQuiText.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {product.pourQuiText.map((para, i) => (
                  <p key={i} style={{ fontSize: i === 0 ? "16px" : "14px", color: i === 0 ? C8 : MID, fontWeight: i === 0 ? 600 : 400, lineHeight: 1.7, margin: 0 }}>
                    {para}
                  </p>
                ))}
              </div>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
                {product.pourQui.map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", color: MID, lineHeight: 1.6 }}>
                    <span style={{ flexShrink: 0, marginTop: "6px", width: "6px", height: "6px", borderRadius: "50%", background: ORA, display: "block" }} />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Colonne 3 : dark panel avec flip cards + CTA */}
          {hasHighlights && (
            <div style={{ background: DARK_COL, borderRadius: "6px", padding: "28px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
              {product.highlights!.map((h, i) => (
                <FlipCard key={i} text={h} />
              ))}
              <a href="mailto:Contact@Franck-Nathie.com?subject=Inscription"
                style={{
                  marginTop: "8px", display: "block", textAlign: "center",
                  background: ORA, color: C1, fontWeight: 700, fontSize: "14px",
                  padding: "12px 16px", borderRadius: "4px", textDecoration: "none",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
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

/* SECTION 2 — BANNIÈRE STAGE
   bg: parallax image + overlay rgba(67,68,68,0.56)
*/
function StageTitleSection({ product }: { product: Product }) {
  if (!product.stageTitle) return null;
  return (
    <section style={{
      backgroundImage: `url("${BG_STAGE_BANNER}")`,
      backgroundSize: "cover", backgroundPosition: "center 40%",
      backgroundAttachment: "fixed",
      padding: "80px 0", position: "relative",
    }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(67,68,68,0.56)" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "Atma, sans-serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: C1, lineHeight: 1.2, marginBottom: "20px" }}>
          {product.stageTitle}
        </h2>
        {product.stageDescription?.map((para, i) => (
          <p key={i} style={{ color: C1, fontSize: i === 0 ? "15px" : "18px", opacity: i === 0 ? 0.85 : 1, lineHeight: 1.7, marginBottom: "10px" }}>
            {para}
          </p>
        ))}
      </div>
    </section>
  );
}

/* SECTION 3 — PROGRAMME
   bg: blanc (#fff)
   Méta: 4 blocs avec cercle orange + icône blanche
   Days: cards header orange + body blanc
*/
function ProgrammeSection({ product }: { product: Product }) {
  if (!product.etapes?.length || product.categorie !== "stages") return null;

  const META = [
    { label: "Durée", value: `${product.etapes.length} jours`, icon: <IconClock /> },
    { label: "Dates de sessions", value: product.dates?.join(" · ") ?? "", icon: <IconCalendar /> },
    { label: "Tarif", value: product.prix, icon: <IconMoney /> },
    { label: "Lieu", value: product.lieu ?? "", icon: <IconPin /> },
  ];

  return (
    <section style={{ background: C1, padding: "70px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
        <H2Orig>Programme de la formation</H2Orig>

        {/* Méta info : 4 colonnes avec cercle orange + icône */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0", marginBottom: "48px", border: `1px solid ${C3}`, borderRadius: "6px", overflow: "hidden" }}>
          {META.map((m, i) => (
            <div key={m.label} style={{
              padding: "24px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center",
              background: C1, borderRight: i < 3 ? `1px solid ${C3}` : "none",
            }}>
              <OrangeCircle icon={m.icon} />
              <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: MID, margin: 0 }}>{m.label}</p>
              <p style={{ fontSize: "13px", fontWeight: 600, color: C8, margin: 0, lineHeight: 1.4 }}>{m.value}</p>
            </div>
          ))}
        </div>

        {/* Day cards */}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${product.etapes.length}, 1fr)`, gap: "20px", marginBottom: "32px" }}>
          {product.etapes.map((e) => (
            <div key={e.num} style={{ borderRadius: "6px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", border: `1px solid ${C3}` }}>
              {/* Header orange */}
              <div style={{ background: ORA, padding: "14px 20px", display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: C1, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: ORA }}>{e.num}</span>
                </div>
                <span style={{ fontSize: "14px", fontWeight: 700, color: C1 }}>Jour {e.num}</span>
              </div>
              {/* Body blanc */}
              <div style={{ background: C1, padding: "18px 20px" }}>
                <p style={{ fontSize: "14px", fontWeight: 600, color: C8, lineHeight: 1.5, margin: 0 }}>
                  {e.titre.replace(/^Jour \d+ [-–] /, "")}
                </p>
                {e.texte && <p style={{ fontSize: "12px", color: MID, margin: "8px 0 0", lineHeight: 1.6 }}>{e.texte}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Note public + CTA */}
        {product.publicNote && (
          <div style={{ background: C2, borderRadius: "6px", padding: "18px 24px", display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <IconCheck />
            <p style={{ fontSize: "14px", color: C8, margin: 0 }}>
              <strong>Pour quel public ?</strong> {product.publicNote}
            </p>
          </div>
        )}

        <div style={{ textAlign: "right" }}>
          <a href="mailto:Contact@Franck-Nathie.com?subject=Inscription"
            style={{
              display: "inline-block", background: ORA, color: C1,
              fontWeight: 700, fontSize: "14px",
              padding: "13px 28px", borderRadius: "4px",
              textDecoration: "none",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Je m'inscris à la formation
          </a>
        </div>
      </div>
    </section>
  );
}

/* SECTION 4 — LE FORMATEUR
   bg: linear-gradient(180deg, #fff 0%, #dfddd2 100%)
   Portrait gauche + bio droite
*/
function FormateurSection() {
  return (
    <section style={{ background: `linear-gradient(180deg, ${C1} 0%, ${C3} 100%)`, padding: "70px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
        <H2Orig>Le formateur</H2Orig>
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "48px", alignItems: "start" }}>

          {/* Portrait */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", textAlign: "center" }}>
            <div style={{ width: "160px", height: "160px", borderRadius: "50%", overflow: "hidden", background: C3, border: `3px solid ${C2}`, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
              <img
                src="https://laforetnourriciere.org/wp-content/uploads/2020/11/Franck-Nathie.jpg"
                alt="Franck Nathié"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
            <div>
              <p style={{ fontFamily: "Atma, sans-serif", fontSize: "18px", fontWeight: 700, color: C8, margin: 0 }}>
                Franck Nathié
              </p>
              <p style={{ fontSize: "12px", color: MID, marginTop: "4px", fontStyle: "italic", lineHeight: 1.5 }}>
                La permaculture, c'est avant tout prendre soin de soi.
              </p>
            </div>
            {/* Encadré formations reçues */}
            <div style={{ width: "100%", background: C2, borderRadius: "6px", padding: "16px", textAlign: "left" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: ORA, marginBottom: "10px" }}>
                Formations reçues
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {FORMATEUR_FORMATIONS.map((f, i) => (
                  <li key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start", fontSize: "11px", color: MID, lineHeight: 1.5 }}>
                    <span style={{ flexShrink: 0, marginTop: "5px", width: "5px", height: "5px", borderRadius: "50%", background: ORA, display: "block" }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bio */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {FORMATEUR_BIO.map((para, i) => (
              <p key={i} style={{ fontSize: "14px", color: i === 0 ? C8 : MID, lineHeight: 1.8, margin: 0 }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* SECTION 5 — QUE VA APPORTER
   bg: #b9b58d (tan) entier
   Texte blanc, numéros dans cercles orange, image à droite
*/
function VaApporterSection({ product }: { product: Product }) {
  if (!product.vaApporter?.length) return null;
  const mainImage = product.images[0] ?? null;

  return (
    <section style={{ background: C4, padding: "70px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
        <H2Orig color={C1}>Que va apporter ce stage à ta nouvelle vie ?</H2Orig>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "48px", alignItems: "start" }}>

          {/* Liste numérotée */}
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "18px" }}>
            {product.vaApporter.map((item, i) => (
              <li key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{
                  flexShrink: 0, width: "34px", height: "34px", borderRadius: "50%", background: ORA,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: C1 }}>{i + 1}</span>
                </div>
                <p style={{ fontSize: "14px", color: C1, lineHeight: 1.7, margin: 0 }}>{item}</p>
              </li>
            ))}
          </ul>

          {/* Image */}
          {mainImage && (
            <div style={{ borderRadius: "8px", overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
              <img src={mainImage} alt={product.titre} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* SECTION 6 — CONTENUS DE FORMATION (Thérapie uniquement) */
function ContenuFormationSection({ product }: { product: Product }) {
  if (!product.contenuFormation) return null;
  const { items, modules } = product.contenuFormation;
  return (
    <section style={{ background: `linear-gradient(180deg, ${C1} 0%, ${C2} 100%)`, padding: "70px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
        <H2Orig>Contenus de formation</H2Orig>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "32px" }}>
          {/* Sommaire */}
          <div style={{ background: C2, borderRadius: "6px", padding: "24px", border: `1px solid ${C3}` }}>
            <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: ORA, marginBottom: "14px" }}>
              Contenu
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {items.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "13px", color: C8, lineHeight: 1.5 }}>
                  <span style={{ flexShrink: 0, marginTop: "5px", width: "6px", height: "6px", borderRadius: "50%", background: ORA, display: "block" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {/* Modules */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {modules.map((mod, mi) => (
              <div key={mi} style={{ background: C1, borderRadius: "6px", padding: "24px", border: `1px solid ${C3}` }}>
                <p style={{ fontSize: "14px", fontWeight: 700, color: C8, marginBottom: "12px" }}>{mod.title}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {mod.items.map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "13px", color: MID, lineHeight: 1.5 }}>
                      <span style={{ flexShrink: 0, marginTop: "5px", width: "6px", height: "6px", borderRadius: "50%", background: ORA, display: "block" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <a href="mailto:Contact@Franck-Nathie.com?subject=Inscription - Thérapie"
              style={{ display: "inline-block", alignSelf: "flex-start", background: ORA, color: C1, fontWeight: 700, fontSize: "14px", padding: "13px 28px", borderRadius: "4px", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Je m'inscris
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* SECTION 7 — ÉCHEC DE LA PSYCHANALYSE (Thérapie)
   bg: C1 (blanc) pour alterner avec les sections C2 autour
   Texte structuré : premier paragraphe en introduction mise en avant, reste en body
*/
function EchecSection({ product }: { product: Product }) {
  if (!product.echeTexte?.length) return null;
  const [intro, ...rest] = product.echeTexte;
  return (
    <section style={{ background: C1, padding: "70px 0", borderTop: `1px solid ${C3}` }}>
      <div style={{ maxWidth: "840px", margin: "0 auto", padding: "0 40px" }}>
        <H2Orig>L'échec de la psychanalyse et de beaucoup de thérapie</H2Orig>
        {/* Premier paragraphe mis en valeur */}
        {intro && (
          <div style={{ background: C2, borderLeft: `4px solid ${ORA}`, borderRadius: "0 6px 6px 0", padding: "20px 24px", marginBottom: "28px" }}>
            <p style={{ fontSize: "15px", fontWeight: 600, color: C8, lineHeight: 1.75, margin: 0 }}>{intro}</p>
          </div>
        )}
        {/* Reste du texte */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {rest.map((para, i) => (
            <p key={i} style={{ fontSize: "14px", color: MID, lineHeight: 1.85, margin: 0 }}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* SECTION 8 — TÉMOIGNAGES
   bg: #f0eee5 (crème)
   Cards : bg blanc + ombre légère pour ressortir sur le fond crème
*/
function TemoignagesSection({ slug }: { slug: string }) {
  const list = TEMOIGNAGES[slug] ?? [];
  if (!list.length) return null;
  return (
    <section style={{ background: C2, padding: "70px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
        <H2Orig>Témoignages</H2Orig>
        <div style={{ display: "grid", gridTemplateColumns: list.length === 1 ? "1fr" : "repeat(2, 1fr)", gap: "24px" }}>
          {list.map((t, i) => (
            <div key={i} style={{
              background: C1, border: `1px solid ${C3}`, borderRadius: "8px",
              padding: "28px 28px 24px", display: "flex", flexDirection: "column", gap: "14px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
            }}>
              {/* Accent orange en haut */}
              <div style={{ width: "36px", height: "3px", background: ORA, borderRadius: "2px" }} />
              {/* Étoiles */}
              <div style={{ display: "flex", gap: "2px" }}>
                {[1,2,3,4,5].map(s => <StarFill key={s} />)}
              </div>
              {/* Texte */}
              <p style={{ fontSize: "13px", color: C8, fontStyle: "italic", lineHeight: 1.8, flex: 1, margin: 0 }}>
                « {t.texte} »
              </p>
              {/* Auteur */}
              <p style={{ fontSize: "12px", fontWeight: 700, color: ORA, margin: 0, paddingTop: "12px", borderTop: `1px solid ${C3}` }}>
                — {t.auteur}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* SECTION — Description longue (Jeux / Posters)
   Structure : intro C2 (crème) + corps C1 (blanc) pour créer un rythme visuel
*/
function DescriptionSection({ product }: { product: Product }) {
  const [intro, ...rest] = product.descriptionLongue;
  const hasRest = rest.length > 0;

  return (
    <>
      {/* Bloc intro — fond crème */}
      {intro && (
        <section style={{ background: C2, padding: "60px 0" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 40px" }}>
            <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
              <div style={{ flexShrink: 0, width: "4px", borderRadius: "2px", background: ORA, alignSelf: "stretch", minHeight: "24px" }} />
              <p style={{ fontSize: "17px", fontWeight: 600, color: C8, lineHeight: 1.75, margin: 0, whiteSpace: "pre-line" }}>
                {intro}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Reste du contenu — fond blanc */}
      {hasRest && (
        <section style={{ background: C1, padding: "50px 0 64px", borderTop: `1px solid ${C3}` }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 40px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {rest.map((para, i) => (
                <p key={i} style={{ fontSize: "14px", color: MID, lineHeight: 1.85, margin: 0, whiteSpace: "pre-line" }}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

/* PRODUITS SIMILAIRES */
function RelatedCard({ product }: { product: Product }) {
  return (
    <Link href={`/boutique/${product.slug}`}>
      <div style={{ background: C1, borderRadius: "6px", overflow: "hidden", border: `1px solid ${C3}`, cursor: "pointer", transition: "box-shadow 0.2s" }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
      >
        <div style={{ background: C3, minHeight: "180px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          {product.images[0]
            ? <img src={product.images[0]} alt={product.titre} style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }} />
            : <span style={{ fontSize: "11px", color: MID, textTransform: "uppercase", letterSpacing: "2px" }}>Image à venir</span>
          }
        </div>
        <div style={{ padding: "18px 20px" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: ORA }}>{product.categorieLabel}</span>
          <h4 style={{ fontFamily: "Atma, sans-serif", fontSize: "16px", fontWeight: 700, color: C8, margin: "6px 0", lineHeight: 1.3 }}>{product.titre}</h4>
          <p style={{ fontSize: "14px", fontWeight: 700, color: ORA, margin: 0 }}>{product.prix}</p>
        </div>
      </div>
    </Link>
  );
}

/* ════════════════════════════════════════════════════
   LAYOUT "SIMPLE" — style e-commerce classique avec onglets
   Inspiré du design WooCommerce de la capture d'écran
   ════════════════════════════════════════════════════ */
type TabId = "description" | "pour-qui" | "avis";

function SimpleProductPage({ product, related, slug }: {
  product: Product;
  related: Product[];
  slug: string;
}) {
  const [activeTab, setActiveTab] = useState<TabId>("description");
  const [galleryIdx, setGalleryIdx] = useState(0);
  const isStage = product.categorie === "stages";
  const isTherapie = product.categorie === "therapie";
  const temos = TEMOIGNAGES[slug] ?? [];

  const tabs: { id: TabId; label: string }[] = [
    { id: "description", label: "Description" },
    { id: "pour-qui", label: "Pour qui ?" },
    ...(temos.length > 0 ? [{ id: "avis" as TabId, label: `Avis (${temos.length})` }] : []),
  ];

  /* Contenu Description : panelDescription si dispo, sinon descriptionCourte */
  const descLines: string[] = product.panelDescription?.length
    ? product.panelDescription
    : [product.descriptionCourte];

  return (
    <main style={{ background: "#fff", color: C8, minHeight: "60vh" }}>

      {/* ── Fil d'Ariane ── */}
      <div style={{ background: C2, borderBottom: `1px solid ${C3}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "10px 32px", display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: MID, flexWrap: "wrap" }}>
          <Link href="/"><span style={{ color: ORA, cursor: "pointer" }} onMouseEnter={e => ((e.currentTarget as HTMLSpanElement).style.textDecoration = "underline")} onMouseLeave={e => ((e.currentTarget as HTMLSpanElement).style.textDecoration = "none")}>Accueil</span></Link>
          <span style={{ color: C3 }}>›</span>
          <Link href="/boutique"><span style={{ color: ORA, cursor: "pointer" }} onMouseEnter={e => ((e.currentTarget as HTMLSpanElement).style.textDecoration = "underline")} onMouseLeave={e => ((e.currentTarget as HTMLSpanElement).style.textDecoration = "none")}>Boutique</span></Link>
          <span style={{ color: C3 }}>›</span>
          <span style={{ color: C8 }}>{product.titre}</span>
        </div>
      </div>

      {/* ── PANNEAU PRODUIT ── */}
      <section style={{ padding: "48px 0 40px", background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "start" }}>

            {/* Galerie */}
            <div>
              <div style={{
                background: C2, borderRadius: "8px", border: `1px solid ${C3}`,
                minHeight: "360px", display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden", marginBottom: "12px",
              }}>
                {product.images.length > 0
                  ? <img src={product.images[galleryIdx]} alt={product.titre} style={{ width: "100%", height: "360px", objectFit: "contain", padding: "16px" }} />
                  : <span style={{ fontSize: "11px", color: MID, textTransform: "uppercase", letterSpacing: "2px" }}>Image à venir</span>
                }
              </div>
              {product.images.length > 1 && (
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {product.images.map((src, i) => (
                    <button key={i} onClick={() => setGalleryIdx(i)} style={{
                      width: "60px", height: "60px", background: C2, borderRadius: "4px",
                      overflow: "hidden", cursor: "pointer", padding: "2px",
                      outline: i === galleryIdx ? `2px solid ${ORA}` : `2px solid transparent`,
                      outlineOffset: "1px", opacity: i === galleryIdx ? 1 : 0.55, border: "none",
                    }}>
                      <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info produit */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Badge catégorie */}
              <div>
                <span style={{
                  display: "inline-block", background: ORA, color: C1,
                  fontSize: "11px", fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "1.5px", padding: "4px 12px", borderRadius: "3px",
                }}>{product.categorieLabel}</span>
              </div>
              {/* Titre */}
              <h1 style={{ fontFamily: "Atma, sans-serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, color: C8, lineHeight: 1.15, margin: 0 }}>
                {product.titre}
              </h1>
              {/* Étoiles */}
              <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
                {[1,2,3,4,5].map(s => <StarFill key={s} />)}
                <span style={{ fontSize: "13px", color: MID, marginLeft: "6px" }}>(5 avis)</span>
              </div>
              {/* Prix */}
              <p style={{ fontSize: "32px", fontWeight: 800, color: ORA, fontFamily: "Atma, sans-serif", margin: 0 }}>{product.prix}</p>
              {/* Description courte */}
              <p style={{ fontSize: "14px", color: MID, lineHeight: 1.7, margin: 0 }}>{product.descriptionCourte}</p>
              {/* Séparateur */}
              <div style={{ borderTop: `1px solid ${C3}` }} />
              {/* Dates */}
              {product.dates && product.dates.length > 0 && (
                <div>
                  <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: MID, marginBottom: "8px" }}>
                    Prochaines dates
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {product.dates.map((d, i) => (
                      <span key={i} style={{
                        fontSize: "12px", fontWeight: 600, color: ORA,
                        border: `1px solid ${ORA}`, borderRadius: "4px", padding: "5px 10px",
                      }}>{d}</span>
                    ))}
                  </div>
                </div>
              )}
              {/* CTA primaire */}
              <a href={`mailto:Contact@Franck-Nathie.com?subject=${isStage || isTherapie ? "Inscription" : "Commande"}`}
                style={{
                  display: "block", textAlign: "center", background: ORA, color: C1,
                  fontWeight: 700, fontSize: "15px", padding: "15px 24px", borderRadius: "4px",
                  textDecoration: "none", transition: "opacity 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                {isStage || isTherapie ? "S'inscrire à la formation" : "Commander"}
              </a>
              {/* CTA secondaire */}
              <a href="mailto:Contact@Franck-Nathie.com"
                style={{
                  display: "block", textAlign: "center", background: "transparent",
                  color: C8, fontWeight: 600, fontSize: "14px",
                  padding: "12px 24px", borderRadius: "4px",
                  border: `1.5px solid ${C3}`, textDecoration: "none",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = ORA; e.currentTarget.style.background = "#fff8f5"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C3; e.currentTarget.style.background = "transparent"; }}
              >
                Contacter Franck
              </a>
              {/* Badges de confiance — adaptés selon la catégorie */}
              <TrustBadges categorie={product.categorie} />
            </div>
          </div>
        </div>
      </section>

      {/* ── ONGLETS ── */}
      <section style={{ background: C2, padding: "0 0 56px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 32px" }}>
          {/* Barre d'onglets */}
          <div style={{ display: "flex", gap: "0", borderBottom: `2px solid ${C3}`, marginBottom: "32px" }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "14px 24px", fontSize: "14px", fontWeight: 600,
                  color: activeTab === tab.id ? ORA : MID,
                  borderBottom: activeTab === tab.id ? `2px solid ${ORA}` : "2px solid transparent",
                  marginBottom: "-2px", transition: "color 0.15s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Contenu des onglets */}
          <div style={{
            background: C1, borderRadius: "8px", border: `1px solid ${C3}`,
            padding: "32px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}>
            {/* ── Description ── */}
            {activeTab === "description" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {descLines.map((para, i) => (
                  <p key={i} style={{ fontSize: i === 0 ? "15px" : "14px", fontWeight: i === 0 ? 600 : 400, color: i === 0 ? C8 : MID, lineHeight: 1.8, margin: 0 }}>
                    {para}
                  </p>
                ))}
              </div>
            )}
            {/* ── Pour qui ? ── */}
            {activeTab === "pour-qui" && (
              <div>
                {product.pourQuiTitle && (
                  <h2 style={{ fontFamily: "Atma, sans-serif", fontSize: "22px", fontWeight: 700, color: C8, marginTop: 0, marginBottom: "20px" }}>
                    {product.pourQuiTitle}
                  </h2>
                )}
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
                  {product.pourQui.map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <span style={{ flexShrink: 0, marginTop: "7px", width: "7px", height: "7px", borderRadius: "50%", background: ORA, display: "block" }} />
                      <p style={{ fontSize: "14px", color: MID, lineHeight: 1.7, margin: 0 }}>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* ── Avis ── */}
            {activeTab === "avis" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {temos.map((t, i) => (
                  <div key={i} style={{ borderBottom: i < temos.length - 1 ? `1px solid ${C3}` : "none", paddingBottom: i < temos.length - 1 ? "24px" : 0 }}>
                    <div style={{ display: "flex", gap: "2px", marginBottom: "8px" }}>
                      {[1,2,3,4,5].map(s => <StarFill key={s} />)}
                    </div>
                    <p style={{ fontSize: "13px", color: C8, fontStyle: "italic", lineHeight: 1.8, margin: "0 0 8px" }}>« {t.texte} »</p>
                    <p style={{ fontSize: "12px", fontWeight: 700, color: ORA, margin: 0 }}>— {t.auteur}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── PRODUITS SIMILAIRES ── */}
      {related.length > 0 && (
        <section style={{ background: "#fff", padding: "56px 0", borderTop: `1px solid ${C3}` }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 32px" }}>
            <h2 style={{ fontFamily: "Atma, sans-serif", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, color: C8, marginBottom: "28px" }}>
              Vous aimerez aussi
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
              {related.map((p) => <RelatedCard key={p.slug} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </main>
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

  /* Aiguillage vers le layout simplifié (onglets, sans hero parallax) */
  if (product.layout === "simple") {
    return <SimpleProductPage product={product} related={related} slug={slug} />;
  }

  const isStage    = product.categorie === "stages";
  const isTherapie = product.categorie === "therapie";

  return (
    <main style={{ background: C2, color: C8 }}>
      {/* ── HERO PARALLAX — H1 + sous-titre sur image de fond ── */}
      <section style={{
        backgroundImage: `url("${BG_HERO_PARALLAX}")`,
        backgroundSize: "cover", backgroundPosition: "center center",
        backgroundAttachment: "fixed",
        padding: "80px 0", position: "relative",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(9,27,24,0.65)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "Atma, sans-serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, color: C1, lineHeight: 1.15, marginBottom: "16px" }}>
            {product.titre}
          </h1>
          {product.subtitle && (
            <h2 style={{ fontFamily: "Atma, sans-serif", fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 400, color: C1, opacity: 0.9, lineHeight: 1.4, margin: 0 }}>
              {product.subtitle}
            </h2>
          )}
        </div>
      </section>

      {/* ── Fil d'Ariane ── */}
      <div style={{ background: C1, borderBottom: `1px solid ${C3}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "10px 40px", display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: MID, flexWrap: "wrap" }}>
          <Link href="/"><span style={{ color: ORA, cursor: "pointer" }} onMouseEnter={e => ((e.currentTarget as HTMLSpanElement).style.textDecoration = "underline")} onMouseLeave={e => ((e.currentTarget as HTMLSpanElement).style.textDecoration = "none")}>Accueil</span></Link>
          <span style={{ color: C3 }}>›</span>
          <Link href="/boutique"><span style={{ color: ORA, cursor: "pointer" }} onMouseEnter={e => ((e.currentTarget as HTMLSpanElement).style.textDecoration = "underline")} onMouseLeave={e => ((e.currentTarget as HTMLSpanElement).style.textDecoration = "none")}>Boutique</span></Link>
          <span style={{ color: C3 }}>›</span>
          <span>{product.titre}</span>
        </div>
      </div>

      {/* ── PANNEAU PRODUIT (fond crème #f0eee5) ── */}
      <section style={{ background: C2, padding: "60px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>
            <ProductGallery product={product} />
            <ProductInfoPanel product={product} />
          </div>
        </div>
      </section>

      {/* ── STAGES ── */}
      {isStage && (
        <>
          <PourQuiSection product={product} />
          {/* Section parallax "Les Parts Déchargées" — entre Pour Qui et bannière stage */}
          <section style={{
            backgroundImage: `url("${BG_LES_PARTS}")`,
            backgroundSize: "cover", backgroundPosition: "center center",
            backgroundAttachment: "scroll",
            padding: "80px 0", position: "relative",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(9,27,24,0.55)" }} />
            <div style={{ position: "relative", zIndex: 1, maxWidth: "700px", margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
              <h2 style={{ fontFamily: "Atma, sans-serif", fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 700, color: C1, lineHeight: 1.25, marginBottom: "16px" }}>
                Un stage de trois jours rien que pour toi
              </h2>
              <p style={{ fontSize: "15px", color: C1, opacity: 0.9, lineHeight: 1.7 }}>
                Trois jours pour utiliser le jeu Gai-rire en groupe, apprendre à identifier facilement tes besoins et tes blessures grâce à tes sentiments et changer tes habitudes pour entrer dans le 1er jour du reste de ta vie
              </p>
              <p style={{ fontSize: "18px", fontWeight: 700, color: C1, marginTop: "14px" }}>
                Il y aura un avant et un après ce stage !
              </p>
            </div>
          </section>
          <StageTitleSection product={product} />
          <ProgrammeSection product={product} />
          <FormateurSection />
          <VaApporterSection product={product} />
          <TemoignagesSection slug={slug} />
        </>
      )}

      {/* ── THÉRAPIE ── */}
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
        <section style={{ background: C2, padding: "60px 0", borderTop: `1px solid ${C3}` }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
            <H2Orig>Vous aimerez aussi</H2Orig>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
              {related.map((p) => <RelatedCard key={p.slug} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
