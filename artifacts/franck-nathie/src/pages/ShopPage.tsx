import { useState } from "react";
import { Link } from "wouter";
import { products, categorieLabels } from "@/data/products";
import type { Product } from "@/data/products";

const CATEGORIES = ["tous", "stages", "therapie", "jeux", "posters"] as const;

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div
        className="relative flex items-center justify-center"
        style={{ background: "#f0ede8", minHeight: "220px" }}
      >
        <ProductPlaceholder product={product} />
        <span
          className="absolute top-3 left-3 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full text-white"
          style={{ background: "#E86B0A" }}
        >
          {product.categorieLabel}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="text-gray-800 font-bold text-lg mb-2 leading-snug"
          style={{ fontFamily: "Atma, sans-serif" }}
        >
          {product.titre}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2 flex-1">
          {product.descriptionCourte}
        </p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <span
            className="font-bold text-base"
            style={{ color: "#E86B0A" }}
          >
            {product.prix}
          </span>
          <Link href={`/boutique/${product.slug}`}>
            <button
              className="text-sm font-semibold px-4 py-2 rounded-lg border-2 transition-all duration-200 cursor-pointer"
              style={{
                borderColor: "#E86B0A",
                color: "#E86B0A",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#E86B0A";
                (e.currentTarget as HTMLButtonElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "#E86B0A";
              }}
            >
              Voir le produit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProductPlaceholder({ product }: { product: Product }) {
  if (product.image) {
    return (
      <img
        src={product.image}
        alt={product.titre}
        className="w-full h-full absolute inset-0 object-contain p-4"
      />
    );
  }
  return (
    <div
      className="w-full h-full absolute inset-0 flex flex-col items-center justify-center"
      style={{ background: "#f0ede8" }}
    >
      <span className="text-xs text-gray-400 uppercase tracking-widest">Image à venir</span>
    </div>
  );
}

const REASSURANCE = [
  { icon: "🔒", titre: "Paiement sécurisé", desc: "Transactions protégées" },
  { icon: "📦", titre: "Livraison soignée", desc: "Emballage protecteur" },
  { icon: "✨", titre: "Satisfaction garantie", desc: "Ou remboursement" },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<string>("tous");

  const filtered =
    activeCategory === "tous"
      ? products
      : products.filter((p) => p.categorie === activeCategory);

  return (
    <main data-testid="page-boutique">
      {/* Hero */}
      <section
        className="py-16 sm:py-20 text-center"
        style={{ background: "#f0ede8" }}
      >
        <div className="max-w-2xl mx-auto px-6">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full text-white"
            style={{ background: "#E86B0A" }}
          >
            Nos ressources thérapeutiques
          </span>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
            style={{ fontFamily: "Atma, sans-serif" }}
          >
            La Boutique
          </h1>
          <div
            className="mx-auto w-16 h-1 rounded-full mb-6"
            style={{ background: "#E86B0A" }}
          />
          <p className="text-gray-600 text-lg leading-relaxed">
            Stages, jeux, posters et thérapie en ligne — des outils conçus pour
            accompagner votre guérison et votre épanouissement personnel.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer"
                style={{
                  background: isActive ? "#E86B0A" : "#f3f4f6",
                  color: isActive ? "#fff" : "#6b7280",
                  border: "none",
                }}
              >
                {categorieLabels[cat]}
              </button>
            );
          })}
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-20 text-lg">
              Aucun produit dans cette catégorie.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Reassurance band */}
      <section className="py-10" style={{ background: "#1e293b" }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {REASSURANCE.map((item) => (
              <div key={item.titre} className="flex flex-col items-center gap-2">
                <span className="text-3xl">{item.icon}</span>
                <p className="text-white font-semibold text-sm">{item.titre}</p>
                <p className="text-gray-400 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
