import { useEffect, useState } from "react";
import heroBg from "@assets/franck-background-section-hero-accueil-_1774981141061.jpg";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative min-h-[88vh] flex items-center overflow-hidden"
      data-testid="section-hero"
    >
      {/* Background image — Franck's face positioned to the right */}
      <img
        src={heroBg}
        alt="Franck Nathie"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "right 18%" }}
        aria-hidden="true"
      />

      {/* Gradient overlay desktop (sm+) — dark left, transparent right */}
      <div
        className="absolute inset-0 hidden sm:block"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0.12) 62%, rgba(0,0,0,0.00) 100%)",
        }}
      />
      {/* Gradient overlay mobile — dark left, light veil to the right edge */}
      <div
        className="absolute inset-0 block sm:hidden"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.58) 40%, rgba(0,0,0,0.38) 70%, rgba(0,0,0,0.28) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 w-full">
        <div
          className="w-full sm:w-3/5 lg:w-[55%] transition-all duration-1000"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#E86B0A] animate-pulse" />
            <span className="text-white text-xs font-medium tracking-wider uppercase">
              Thérapie professionnelle
            </span>
          </div>

          {/* Main title */}
          <h1
            className="text-4xl sm:text-5xl lg:text-5xl font-bold leading-tight mb-6 text-white"
            style={{ fontFamily: "Atma, sans-serif" }}
          >
            <span className="block">
              <span className="text-[#E86B0A]">D</span>éprogrammation
            </span>
            <span className="block">
              <span className="text-[#E86B0A]">P</span>sycho-<span className="text-[#E86B0A]">É</span>motionnelle et
            </span>
            <span className="block">
              <span className="text-[#E86B0A]">C</span>omportementale
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-white/85 text-xl sm:text-2xl font-light mb-10 leading-relaxed"
            style={{ fontFamily: "Atma, sans-serif" }}
          >
            Retrouvez la liberté d'être vous-même
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#therapie-dpec"
              className="inline-flex items-center justify-center bg-[#E86B0A] text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-[#d05e08] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              data-testid="btn-hero-cta"
            >
              Découvrir la thérapie DPEC
            </a>
            <a
              href="mailto:Contact@Franck-Nathie.com"
              className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-white/20 transition-all duration-300"
              data-testid="btn-hero-contact"
            >
              Prendre contact
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}
