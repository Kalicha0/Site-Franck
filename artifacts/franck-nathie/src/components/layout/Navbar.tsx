import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, Menu, X, Search } from "lucide-react";
import { products } from "@/data/products";
import { articles } from "@/data/articles";

const ORA = "#cc6633";
const CREAM = "#f0eee5";

function normalizeStr(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getResults(query: string) {
  const q = normalizeStr(query.trim());
  if (!q) return { produits: [], articles: [] };
  const produits = products
    .filter((p) => normalizeStr(p.titre + " " + p.descriptionCourte).includes(q))
    .slice(0, 3);
  const arts = articles
    .filter((a) => normalizeStr(a.titre + " " + a.description).includes(q))
    .slice(0, 2);
  return { produits, articles: arts };
}

const CATEGORY_LABELS: Record<string, string> = {
  stages: "Stage",
  therapie: "Thérapie",
  jeux: "Jeu",
  posters: "Poster",
};

const navItems = [
  { label: "Accueil", href: "/" },
  {
    label: "Qui suis-je",
    href: "/qui-suis-je",
  },
  {
    label: "La DPEC c'est quoi",
    href: "/dpae",
  },
  {
    label: "Boutique",
    href: "/boutique",
    dropdown: [
      { label: "Stage de guérison", href: "/boutique/stage-guerison" },
      { label: "Stage de communication CAPT", href: "/boutique/stage-capt" },
      { label: "Thérapie en ligne Gai-Rire", href: "/boutique/therapie-ligne" },
      { label: "Jeu gai-rire", href: "/boutique/jeu-gai-rire" },
      { label: "Jeu de cartes des valeurs existentielle", href: "/boutique/jeu-cartes" },
      { label: "Poster Gai-rire", href: "/boutique/poster-gai-rire" },
      { label: "Poster CAPT", href: "/boutique/poster-capt" },
    ],
  },
  {
    label: "Article",
    href: "/articles",
    dropdown: [
      { label: "Trilogie de Karpman", href: "/articles/karpman" },
      { label: "Différence entre le soi et le moi", href: "/articles/soi-moi" },
      { label: "Les 12 blessures existentielles", href: "/articles/blessures" },
      { label: "L'IFS c'est quoi", href: "/articles/ifs" },
      { label: "Les parts blessées", href: "/articles/parts-blessees" },
      { label: "Les parts protectrices", href: "/articles/parts-protectrices" },
      { label: "La communication Transformative", href: "/articles/communication" },
    ],
  },
];

const LIVE_ROUTES = new Set([
  "/articles/blessures",
  "/qui-suis-je",
  "/dpae",
  "/boutique",
  "/boutique/stage-guerison",
  "/boutique/stage-capt",
  "/boutique/therapie-ligne",
  "/boutique/jeu-gai-rire",
  "/boutique/jeu-cartes",
  "/boutique/poster-gai-rire",
  "/boutique/poster-capt",
]);

function DropdownMenu({ items }: { items: { label: string; href: string }[] }) {
  return (
    <div className="absolute top-full left-0 mt-1 w-64 bg-white shadow-lg rounded-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
      {items.map((item) => {
        const dest = LIVE_ROUTES.has(item.href) ? item.href : "/coming-soon";
        return (
          <Link key={item.href} href={dest}>
            <span
              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#E86B0A] transition-colors cursor-pointer"
              data-testid={`dropdown-item-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const [location, navigate] = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  const { produits, articles: arts } = getResults(searchQuery);
  const hasQuery = searchQuery.trim().length > 0;
  const hasResults = produits.length > 0 || arts.length > 0;

  function closeSearch() {
    setSearchOpen(false);
    setSearchQuery("");
  }

  function handleResultClick(href: string) {
    closeSearch();
    setMobileOpen(false);
    navigate(href);
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && searchQuery.trim()) {
      closeSearch();
      setMobileOpen(false);
      navigate(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  }

  function toggleSearch() {
    setSearchOpen((o) => {
      if (o) setSearchQuery("");
      return !o;
    });
    setOpenDropdown(null);
  }

  function goToSearchPage() {
    closeSearch();
    navigate(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`);
  }

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-40 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm border-b border-gray-100"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" data-testid="link-logo">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="flex flex-col leading-none">
                <span className="text-xl font-bold text-gray-800 group-hover:text-[#E86B0A] transition-colors" style={{ fontFamily: 'Atma, sans-serif' }}>
                  Franck Nathie
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location === item.href;
              const hasDropdown = !!item.dropdown;
              const isOpen = openDropdown === item.label;

              return (
                <div key={item.label} className="relative">
                  {hasDropdown ? (
                    <button
                      onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "text-[#E86B0A] bg-orange-50"
                          : "text-gray-700 hover:text-[#E86B0A] hover:bg-orange-50"
                      }`}
                      data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link href={item.href}>
                      <span
                        className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                          isActive
                            ? "text-[#E86B0A] bg-orange-50"
                            : "text-gray-700 hover:text-[#E86B0A] hover:bg-orange-50"
                        }`}
                        data-testid={`nav-${item.label.toLowerCase()}`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  )}
                  {hasDropdown && isOpen && item.dropdown && (
                    <DropdownMenu items={item.dropdown} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right zone: Search + CTA */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Search zone */}
            <div className="relative flex items-center">
              {/* Expandable input */}
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ width: searchOpen ? "240px" : "0px", opacity: searchOpen ? 1 : 0 }}
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Rechercher (Entrée pour tous les résultats)…"
                  className="w-full border rounded-lg px-3 py-1.5 text-sm text-gray-700 outline-none"
                  style={{ borderColor: ORA, background: CREAM }}
                  aria-label="Rechercher"
                />
              </div>

              {/* Loupe / X icon */}
              <button
                onClick={toggleSearch}
                className="ml-1 p-2 rounded-lg text-gray-600 hover:bg-orange-50 hover:text-[#cc6633] transition-colors"
                aria-label={searchOpen ? "Fermer la recherche" : "Ouvrir la recherche"}
              >
                {searchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
              </button>

              {/* Dropdown résultats */}
              {searchOpen && hasQuery && (
                <div
                  className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-lg border border-gray-100 z-50 overflow-hidden"
                  style={{ minWidth: "300px" }}
                >
                  {/* Produits */}
                  {produits.length > 0 && (
                    <>
                      <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100">
                        Produits
                      </div>
                      {produits.map((p) => (
                        <button
                          key={p.slug}
                          onClick={() => handleResultClick(`/boutique/${p.slug}`)}
                          className="w-full text-left flex items-center gap-3 px-4 py-2.5 hover:bg-orange-50 transition-colors group"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-800 group-hover:text-[#cc6633] truncate">{p.titre}</p>
                          </div>
                          <span className="flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ background: ORA }}>
                            {CATEGORY_LABELS[p.categorie] ?? p.categorie}
                          </span>
                        </button>
                      ))}
                    </>
                  )}

                  {/* Articles */}
                  {arts.length > 0 && (
                    <>
                      <div className={`px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100 ${produits.length > 0 ? "border-t" : ""}`}>
                        Articles
                      </div>
                      {arts.map((a) => (
                        <button
                          key={a.id}
                          onClick={() => { if (a.active && a.href) handleResultClick(a.href); }}
                          disabled={!a.active}
                          className={`w-full text-left flex items-center gap-3 px-4 py-2.5 transition-colors group ${a.active ? "hover:bg-orange-50 cursor-pointer" : "cursor-default opacity-60"}`}
                        >
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-semibold truncate ${a.active ? "text-gray-800 group-hover:text-[#cc6633]" : "text-gray-500"}`}>{a.titre}</p>
                          </div>
                          <span className={`flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${a.active ? "text-white" : "text-gray-400 bg-gray-100"}`} style={a.active ? { background: "#6b8f71" } : {}}>
                            {a.active ? "Article" : "Bientôt"}
                          </span>
                        </button>
                      ))}
                    </>
                  )}

                  {/* Aucun résultat */}
                  {!hasResults && (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      Aucun résultat pour «&nbsp;{searchQuery.trim()}&nbsp;»
                    </div>
                  )}

                  {/* Lien "Voir tous les résultats" */}
                  <button
                    onClick={goToSearchPage}
                    className="w-full text-left px-4 py-2.5 text-sm font-semibold border-t border-gray-100 hover:bg-orange-50 transition-colors flex items-center justify-between"
                    style={{ color: ORA }}
                  >
                    <span>Voir tous les résultats</span>
                    <span>→</span>
                  </button>
                </div>
              )}
            </div>

            {/* CTA */}
            <a
              href="mailto:Contact@Franck-Nathie.com"
              className="bg-[#E86B0A] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#d05e08] transition-colors shadow-sm"
              data-testid="nav-contact-cta"
            >
              Prendre contact
            </a>
          </div>

          {/* Mobile: search icon + hamburger */}
          <div className="flex lg:hidden items-center gap-1">
            <button
              onClick={toggleSearch}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label={searchOpen ? "Fermer la recherche" : "Ouvrir la recherche"}
            >
              {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              data-testid="btn-mobile-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Rechercher produits et articles…"
              className="w-full border rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none pr-10"
              style={{ borderColor: ORA, background: CREAM }}
              autoFocus
              aria-label="Rechercher"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {hasQuery && (
            <div className="mt-2 bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
              {produits.length > 0 && (
                <>
                  <div className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50">Produits</div>
                  {produits.map((p) => (
                    <button
                      key={p.slug}
                      onClick={() => handleResultClick(`/boutique/${p.slug}`)}
                      className="w-full text-left flex items-center gap-3 px-4 py-2.5 hover:bg-orange-50 transition-colors border-b border-gray-50"
                    >
                      <p className="text-sm font-semibold text-gray-800 truncate flex-1">{p.titre}</p>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white flex-shrink-0" style={{ background: ORA }}>
                        {CATEGORY_LABELS[p.categorie] ?? p.categorie}
                      </span>
                    </button>
                  ))}
                </>
              )}
              {arts.length > 0 && (
                <>
                  <div className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50">Articles</div>
                  {arts.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => { if (a.active && a.href) handleResultClick(a.href); }}
                      disabled={!a.active}
                      className={`w-full text-left flex items-center gap-3 px-4 py-2.5 transition-colors border-b border-gray-50 ${a.active ? "hover:bg-orange-50" : "opacity-60"}`}
                    >
                      <p className="text-sm font-semibold text-gray-800 truncate flex-1">{a.titre}</p>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${a.active ? "text-white" : "text-gray-400 bg-gray-100"}`} style={a.active ? { background: "#6b8f71" } : {}}>
                        {a.active ? "Article" : "Bientôt"}
                      </span>
                    </button>
                  ))}
                </>
              )}
              {!hasResults && (
                <div className="px-4 py-3 text-sm text-gray-500">
                  Aucun résultat pour «&nbsp;{searchQuery.trim()}&nbsp;»
                </div>
              )}
              <button
                onClick={goToSearchPage}
                className="w-full text-left px-4 py-2.5 text-sm font-semibold border-t border-gray-100 hover:bg-orange-50 flex items-center justify-between"
                style={{ color: ORA }}
              >
                <span>Voir tous les résultats</span>
                <span>→</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mobile nav menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pb-4" data-testid="mobile-menu">
          <div className="pt-3 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.label ? null : item.label)
                      }
                      className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-[#E86B0A] transition-colors"
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === item.label && (
                      <div className="pl-4 mt-1 space-y-1">
                        {item.dropdown.map((sub) => {
                          const dest = LIVE_ROUTES.has(sub.href) ? sub.href : "/coming-soon";
                          return (
                            <Link key={sub.href} href={dest}>
                              <span
                                className="block px-3 py-2.5 text-sm text-gray-600 hover:text-[#E86B0A] transition-colors cursor-pointer"
                                onClick={() => setMobileOpen(false)}
                              >
                                {sub.label}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href={item.href}>
                    <span
                      className="block px-3 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-[#E86B0A] transition-colors cursor-pointer"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </span>
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-2">
              <a
                href="mailto:Contact@Franck-Nathie.com"
                className="block text-center bg-[#E86B0A] text-white px-5 py-3 rounded-lg text-sm font-semibold hover:bg-[#d05e08] transition-colors"
              >
                Prendre contact
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
