import { Link } from "wouter";
import { Phone, Mail, Heart } from "lucide-react";

const footerLinks = [
  { label: "Accueil", href: "/" },
  { label: "Qui suis-je", href: "/qui-suis-je" },
  { label: "La DPEC c'est quoi", href: "/dpae" },
  { label: "Boutique", href: "/boutique" },
  { label: "Article", href: "/coming-soon" },
];

function NewsletterBand() {
  return (
    <div className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        {/* Texte */}
        <div className="sm:max-w-sm">
          <h3
            className="text-xl font-bold text-white mb-1"
            style={{ fontFamily: "Atma, sans-serif" }}
          >
            Restez informé
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Recevez les prochains articles et ressources directement dans votre boîte mail.
          </p>
        </div>

        {/* Formulaire */}
        <div className="w-full sm:w-auto sm:min-w-[360px]">
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input
              type="email"
              placeholder="Votre adresse e-mail"
              aria-label="Adresse e-mail pour la newsletter"
              className="flex-1 bg-gray-700 text-white text-sm placeholder-gray-500 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#E86B0A] transition-colors"
            />
            <button
              type="submit"
              className="bg-[#E86B0A] hover:bg-[#d05e08] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
            >
              S'inscrire
            </button>
          </form>
          <label className="mt-2 flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 flex-shrink-0 accent-[#E86B0A]"
              aria-label="Acceptation de la politique de confidentialité"
            />
            <span className="text-xs text-gray-400 leading-relaxed">
              J'accepte de recevoir vos e-mails et confirme avoir pris connaissance de votre{" "}
              <Link href="/coming-soon">
                <span className="text-[#E86B0A] hover:underline cursor-pointer">politique de confidentialité</span>
              </Link>{" "}
              et{" "}
              <Link href="/coming-soon">
                <span className="text-[#E86B0A] hover:underline cursor-pointer">mentions légales</span>
              </Link>
              .*
            </span>
          </label>
          <p className="mt-2 text-xs text-gray-500">
            Aucun spam. Désinscription à tout moment.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <NewsletterBand />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Atma, sans-serif' }}>
                Franck Nathie
              </h3>
              <p className="text-[#E86B0A] text-xs font-semibold tracking-widest uppercase mt-0.5">
                Déprogrammation Psycho-Émotionnelle et Comportementale
              </p>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Une thérapie profonde pour libérer vos souffrances accumulées et retrouver la liberté d'être vous-même.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href}>
                    <span className="text-sm text-gray-400 hover:text-[#E86B0A] transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#E86B0A] mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-400">
                  <p>02 43 58 66 41</p>
                  <p>07 88 83 58 53</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#E86B0A] flex-shrink-0" />
                <a
                  href="mailto:Contact@Franck-Nathie.com"
                  className="text-sm text-gray-400 hover:text-[#E86B0A] transition-colors"
                  data-testid="footer-email"
                >
                  Contact@Franck-Nathie.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-xs text-gray-500">
              © 2026 Franck Nathie. Tous droits réservés.
            </p>
            <Link href="/coming-soon">
              <span className="text-xs text-gray-600 hover:text-[#E86B0A] transition-colors cursor-pointer underline underline-offset-2">
                Mentions légales
              </span>
            </Link>
          </div>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            Conçu avec <Heart className="w-3 h-3 text-[#E86B0A]" /> pour accompagner votre guérison
          </p>
        </div>
      </div>
    </footer>
  );
}
