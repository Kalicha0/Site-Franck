import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md px-6">
        <div className="w-16 h-16 bg-[#E86B0A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="w-8 h-8 bg-[#E86B0A] rounded-full opacity-60" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Atma, sans-serif' }}>
          Page en construction
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Cette page sera bientôt disponible. Merci de votre patience.
        </p>
        <Link href="/" data-testid="link-back-home">
          <span className="inline-flex items-center gap-2 bg-[#E86B0A] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#d05e08] transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </span>
        </Link>
      </div>
    </div>
  );
}
