import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "wouter";
import { Search, BookOpen, ShoppingBag, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { articles } from "@/data/articles";

const ORA = "#cc6633";
const CREAM = "#f0eee5";
const BORDER = "#dfddd2";
const TEXT = "#091b18";
const MID = "#555555";

const CATEGORY_LABELS: Record<string, string> = {
  stages: "Stage",
  therapie: "Thérapie",
  jeux: "Jeu",
  posters: "Poster",
};

function normalizeStr(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getQueryFromUrl(): string {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  return params.get("q") ?? "";
}

function searchAll(query: string) {
  const q = normalizeStr(query.trim());
  if (!q) return { produits: [], articles: [] };
  const produits = products.filter((p) =>
    normalizeStr(p.titre + " " + p.descriptionCourte).includes(q)
  );
  const arts = articles.filter((a) =>
    normalizeStr(a.titre + " " + a.description).includes(q)
  );
  return { produits, articles: arts };
}

export default function SearchPage() {
  const [, navigate] = useLocation();
  const [rawQuery, setRawQuery] = useState(getQueryFromUrl);
  const [inputValue, setInputValue] = useState(getQueryFromUrl);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const q = getQueryFromUrl();
    setRawQuery(q);
    setInputValue(q);
  }, []);

  useEffect(() => {
    const onPop = () => {
      const q = getQueryFromUrl();
      setRawQuery(q);
      setInputValue(q);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setInputValue(val);
    setRawQuery(val);
    const url = val.trim()
      ? `/recherche?q=${encodeURIComponent(val.trim())}`
      : "/recherche";
    window.history.replaceState(null, "", url);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && inputValue.trim()) {
      navigate(`/recherche?q=${encodeURIComponent(inputValue.trim())}`);
    }
  }

  const query = rawQuery.trim();
  const { produits, articles: arts } = searchAll(query);
  const totalCount = produits.length + arts.length;

  return (
    <main style={{ background: CREAM, minHeight: "80vh", color: TEXT }}>
      {/* ── Header de recherche ── */}
      <section style={{ background: "#fff", borderBottom: `1px solid ${BORDER}`, padding: "48px 0 40px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          <h1 style={{ fontFamily: "Atma, sans-serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, color: TEXT, marginBottom: "8px" }}>
            Résultats de recherche
          </h1>
          {query && (
            <p style={{ fontSize: "15px", color: MID, marginBottom: "24px" }}>
              {totalCount} résultat{totalCount !== 1 ? "s" : ""} pour «&nbsp;<strong style={{ color: TEXT }}>{query}</strong>&nbsp;»
            </p>
          )}

          {/* Barre de recherche intégrée */}
          <div style={{ position: "relative", maxWidth: "560px" }}>
            <Search style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: ORA, width: "18px", height: "18px", pointerEvents: "none" }} />
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Affiner la recherche…"
              style={{
                width: "100%", border: `1.5px solid ${ORA}`, borderRadius: "8px",
                padding: "12px 16px 12px 42px", fontSize: "15px", color: TEXT,
                background: CREAM, outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>
      </section>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 24px" }}>

        {/* ── Aucun résultat ── */}
        {query && totalCount === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
            <h2 style={{ fontFamily: "Atma, sans-serif", fontSize: "24px", fontWeight: 700, color: TEXT, marginBottom: "8px" }}>
              Aucun résultat pour «&nbsp;{query}&nbsp;»
            </h2>
            <p style={{ color: MID, fontSize: "15px", marginBottom: "24px" }}>
              Essayez avec d'autres mots-clés ou parcourez la boutique.
            </p>
            <Link href="/boutique">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: ORA, color: "#fff", fontWeight: 700, fontSize: "14px", padding: "12px 24px", borderRadius: "6px", cursor: "pointer", textDecoration: "none" }}>
                Voir tous les produits <ArrowRight style={{ width: "16px", height: "16px" }} />
              </span>
            </Link>
          </div>
        )}

        {/* ── Pas de query ── */}
        {!query && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <Search style={{ width: "48px", height: "48px", color: BORDER, margin: "0 auto 16px" }} />
            <p style={{ color: MID, fontSize: "16px" }}>Tapez un mot-clé pour lancer la recherche.</p>
          </div>
        )}

        {/* ── Section Produits ── */}
        {produits.length > 0 && (
          <section style={{ marginBottom: "56px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <ShoppingBag style={{ width: "20px", height: "20px", color: ORA }} />
              <h2 style={{ fontFamily: "Atma, sans-serif", fontSize: "22px", fontWeight: 700, color: TEXT, margin: 0 }}>
                Produits ({produits.length})
              </h2>
              <div style={{ flex: 1, height: "1px", background: BORDER, marginLeft: "8px" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
              {produits.map((p) => (
                <Link key={p.slug} href={`/boutique/${p.slug}`}>
                  <div style={{
                    background: "#fff", borderRadius: "10px", border: `1px solid ${BORDER}`,
                    overflow: "hidden", cursor: "pointer", transition: "box-shadow 0.2s, transform 0.2s",
                    display: "flex", flexDirection: "column",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}
                  >
                    {/* Image */}
                    <div style={{ height: "140px", background: BORDER, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      {p.images.length > 0
                        ? <img src={p.images[0]} alt={p.titre} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "12px" }} />
                        : <ShoppingBag style={{ width: "32px", height: "32px", color: MID, opacity: 0.4 }} />
                      }
                    </div>
                    {/* Body */}
                    <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#fff", background: ORA, padding: "3px 8px", borderRadius: "4px", alignSelf: "flex-start" }}>
                        {CATEGORY_LABELS[p.categorie] ?? p.categorie}
                      </span>
                      <h3 style={{ fontFamily: "Atma, sans-serif", fontSize: "16px", fontWeight: 700, color: TEXT, margin: 0, lineHeight: 1.3 }}>{p.titre}</h3>
                      <p style={{ fontSize: "13px", color: MID, margin: 0, lineHeight: 1.6, flex: 1 }}>{p.descriptionCourte}</p>
                      <p style={{ fontSize: "15px", fontWeight: 800, color: ORA, margin: 0 }}>{p.prix}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Section Articles ── */}
        {arts.length > 0 && (
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <BookOpen style={{ width: "20px", height: "20px", color: ORA }} />
              <h2 style={{ fontFamily: "Atma, sans-serif", fontSize: "22px", fontWeight: 700, color: TEXT, margin: 0 }}>
                Articles ({arts.length})
              </h2>
              <div style={{ flex: 1, height: "1px", background: BORDER, marginLeft: "8px" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
              {arts.map((a) => {
                const card = (
                  <div style={{
                    background: "#fff", borderRadius: "10px", border: `1px solid ${BORDER}`,
                    padding: "20px", display: "flex", flexDirection: "column", gap: "10px",
                    cursor: a.active ? "pointer" : "default", transition: "box-shadow 0.2s, transform 0.2s",
                    height: "100%", boxSizing: "border-box",
                    opacity: a.active ? 1 : 0.75,
                  }}
                    onMouseEnter={e => { if (a.active) { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; } }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}
                  >
                    <span style={{
                      fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px",
                      color: a.active ? ORA : "#999",
                      background: a.active ? "#fff3ee" : "#f3f3f3",
                      padding: "3px 8px", borderRadius: "4px", alignSelf: "flex-start",
                    }}>
                      {a.active ? "Article" : "Prochainement"}
                    </span>
                    <h3 style={{ fontFamily: "Atma, sans-serif", fontSize: "16px", fontWeight: 700, color: TEXT, margin: 0, lineHeight: 1.3 }}>{a.titre}</h3>
                    <p style={{ fontSize: "13px", color: MID, margin: 0, lineHeight: 1.6, flex: 1 }}>{a.description}</p>
                    {a.active && (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: ORA, fontSize: "13px", fontWeight: 600 }}>
                        Lire l'article <ArrowRight style={{ width: "14px", height: "14px" }} />
                      </span>
                    )}
                    {!a.active && (
                      <span style={{ fontSize: "12px", color: "#aaa", fontStyle: "italic" }}>Bientôt disponible</span>
                    )}
                  </div>
                );
                return a.active && a.href
                  ? <Link key={a.id} href={a.href} style={{ display: "block", height: "100%" }}>{card}</Link>
                  : <div key={a.id}>{card}</div>;
              })}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
