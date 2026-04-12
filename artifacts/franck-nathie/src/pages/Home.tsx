import Hero from "@/components/sections/Hero";
import WhyTherapy from "@/components/sections/WhyTherapy";
import InnerWound from "@/components/sections/InnerWound";
import HealingProcess from "@/components/sections/HealingProcess";
import TransitionIllustration from "@/components/sections/TransitionIllustration";
import MoiVsSoi from "@/components/sections/MoiVsSoi";
import ArticlesPreview from "@/components/sections/ArticlesPreview";

function DPECIntro() {
  return (
    <section id="therapie-dpec" className="py-20 lg:py-24 bg-white" data-testid="section-dpec-intro">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
        <span className="inline-block text-[#E86B0A] text-sm font-semibold tracking-widest uppercase mb-4">
          Méthode thérapeutique
        </span>
        <h2
          className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6"
          style={{ fontFamily: "Atma, sans-serif" }}
        >
          La thérapie DPEC
        </h2>
        <div className="mx-auto w-16 h-1 bg-[#E86B0A] rounded-full mb-10" />
        <div className="space-y-5 text-gray-700 text-lg leading-relaxed text-left">
          <p>
            La thérapie DPEC (Déprogramation Psycho Emotionnelle et Comportemental) est issus de la
            fusion de l'IFS (Internal Family System), du travail sur les 12 blessures intérieures
            (évolution du travail de Lise Bourbeau), d'outils de transformation issus de la
            communication transformative (de Lionel Santucci) et d'exercices de communication non
            violente (de Marshal Rosenberg).
          </p>
          <p>
            Elle permet de libérer les masses de souffrance accumulées dans l'enfance et de réunifier
            les différentes parties de notre être qui sont en conflit. Elle permet de transformer nos
            souffrances, nos déséquilibres, nos problèmes physiques et psychiques en évolution et en
            changement d'attitude (<a href="/dpae" className="text-[#E86B0A] underline underline-offset-2 hover:text-[#d05e08] transition-colors">voir article c'est quoi la DPEC</a>).
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main data-testid="page-home">
      <Hero />
      <WhyTherapy />
      <InnerWound />
      <HealingProcess />
      <DPECIntro />
      <TransitionIllustration />
      <MoiVsSoi />
      <ArticlesPreview />
    </main>
  );
}
