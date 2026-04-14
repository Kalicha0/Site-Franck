import { Link } from "wouter";
import { useCart } from "@/context/CartContext";

const C1  = "#ffffff";
const C2  = "#f0eee5";
const C3  = "#dfddd2";
const ORA = "#E86B0A";
const MID = "#555555";
const TXT = "#091b18";

const CATEGORIE_LABEL: Record<string, string> = {
  stages:   "Stage",
  therapie: "Thérapie",
  jeux:     "Jeu",
  posters:  "Poster",
};

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCart();

  const buildMailtoBody = () => {
    const lines = items.map(
      (item) => `- ${item.titre} (${item.prix})`
    );
    return encodeURIComponent(
      `Bonjour Franck,\n\nJe souhaite commander les produits suivants :\n\n${lines.join("\n")}\n\nMerci de me contacter pour finaliser ma commande.\n\nCordialement`
    );
  };

  const mailtoHref = `mailto:Contact@Franck-Nathie.com?subject=${encodeURIComponent("Demande de commande")}&body=${buildMailtoBody()}`;

  return (
    <div style={{ background: C2, minHeight: "60vh" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "48px 24px" }}>

        {/* Titre */}
        <h1 style={{
          fontFamily: "'Atma', sans-serif",
          fontSize: "clamp(28px, 4vw, 40px)",
          color: TXT,
          marginBottom: "8px",
        }}>
          Mon panier
        </h1>
        <p style={{ color: MID, fontSize: "14px", marginBottom: "36px" }}>
          {items.length === 0
            ? "Votre panier est vide."
            : `${items.length} article${items.length > 1 ? "s" : ""} sélectionné${items.length > 1 ? "s" : ""}`}
        </p>

        {/* Panier vide */}
        {items.length === 0 && (
          <div style={{
            background: C1, borderRadius: "8px", border: `1px solid ${C3}`,
            padding: "48px 32px", textAlign: "center",
          }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🛒</div>
            <p style={{ color: MID, marginBottom: "24px", fontSize: "15px" }}>
              Vous n'avez encore ajouté aucun produit à votre panier.
            </p>
            <Link href="/boutique">
              <span style={{
                display: "inline-block", background: ORA, color: C1,
                fontWeight: 700, fontSize: "14px", padding: "12px 28px",
                borderRadius: "4px", cursor: "pointer", textDecoration: "none",
              }}>
                Voir la boutique
              </span>
            </Link>
          </div>
        )}

        {/* Liste des articles */}
        {items.length > 0 && (
          <>
            <div style={{
              background: C1, borderRadius: "8px", border: `1px solid ${C3}`,
              overflow: "hidden", marginBottom: "24px",
            }}>
              {items.map((item, idx) => (
                <div key={item.slug} style={{
                  display: "flex", alignItems: "center", gap: "16px",
                  padding: "16px 20px",
                  borderBottom: idx < items.length - 1 ? `1px solid ${C3}` : "none",
                }}>
                  {/* Image */}
                  <div style={{
                    width: "60px", height: "60px", borderRadius: "4px",
                    overflow: "hidden", flexShrink: 0, background: C2,
                  }}>
                    {item.image
                      ? <img src={item.image} alt={item.titre} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>📦</div>
                    }
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span style={{
                        fontSize: "10px", fontWeight: 700, textTransform: "uppercase",
                        letterSpacing: "1px", background: ORA, color: C1,
                        padding: "2px 8px", borderRadius: "3px",
                      }}>
                        {CATEGORIE_LABEL[item.categorie] ?? item.categorie}
                      </span>
                    </div>
                    <p style={{
                      fontFamily: "'Atma', sans-serif", fontSize: "16px",
                      color: TXT, margin: 0, whiteSpace: "nowrap",
                      overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                      {item.titre}
                    </p>
                    <p style={{ color: ORA, fontWeight: 700, fontSize: "15px", margin: "2px 0 0" }}>
                      {item.prix}
                    </p>
                  </div>

                  {/* Supprimer */}
                  <button
                    onClick={() => removeFromCart(item.slug)}
                    title="Retirer du panier"
                    style={{
                      border: "none", background: "transparent", cursor: "pointer",
                      color: MID, fontSize: "18px", padding: "4px 8px",
                      borderRadius: "4px", flexShrink: 0,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#c0392b")}
                    onMouseLeave={e => (e.currentTarget.style.color = MID)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a
                href={mailtoHref}
                style={{
                  display: "block", textAlign: "center",
                  background: ORA, color: C1,
                  fontWeight: 700, fontSize: "16px",
                  padding: "16px 24px", borderRadius: "4px",
                  textDecoration: "none", transition: "opacity 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Envoyer ma demande à Franck →
              </a>

              <p style={{ fontSize: "12px", color: MID, textAlign: "center", margin: 0 }}>
                Votre client mail s'ouvrira avec la liste de vos articles. Franck vous répondra pour finaliser votre commande.
              </p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "8px" }}>
                <Link href="/boutique">
                  <span style={{ fontSize: "13px", color: MID, cursor: "pointer", textDecoration: "underline" }}>
                    ← Continuer mes achats
                  </span>
                </Link>
                <button
                  onClick={clearCart}
                  style={{
                    border: "none", background: "transparent",
                    fontSize: "13px", color: MID, cursor: "pointer",
                    textDecoration: "underline", padding: 0,
                  }}
                >
                  Vider le panier
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
