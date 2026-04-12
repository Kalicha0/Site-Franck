import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, Menu, X } from "lucide-react";

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
  const [location] = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="mailto:Contact@Franck-Nathie.com"
              className="bg-[#E86B0A] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#d05e08] transition-colors shadow-sm"
              data-testid="nav-contact-cta"
            >
              Prendre contact
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            data-testid="btn-mobile-menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
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
