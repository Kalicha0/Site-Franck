import { useRef, useEffect, useState } from "react";
import content from "@/data/methodeCaptContent.json";

type Block =
  | { type: "h"; level: number; text: string }
  | { type: "p"; text: string }
  | { type: "img"; index: number }
  | { type: "list"; ordered: boolean; items: string[] };

const BASE = import.meta.env.BASE_URL;
const IMG_DIR = `${BASE}articles/methode-capt/`;
const IMAGES = (content as { images: Record<string, string> }).images;
const BLOCKS = (content as { blocks: Block[] }).blocks;

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
      }}
    >
      {children}
    </div>
  );
}

function ArticleImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="my-8 flex justify-center">
      <img
        src={src}
        alt={alt}
        className="rounded-xl shadow-md max-w-full"
        style={{ maxHeight: 480, objectFit: "contain" }}
        loading="lazy"
      />
    </div>
  );
}

function StepHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-start gap-4 mb-6 mt-12">
      <div
        className="flex-shrink-0 w-12 h-12 rounded-full bg-[#E86B0A] text-white text-xl font-bold flex items-center justify-center shadow-md"
        style={{ fontFamily: "Atma, sans-serif" }}
      >
        {number}
      </div>
      <h2
        className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug"
        style={{ fontFamily: "Atma, sans-serif" }}
      >
        {title}
      </h2>
    </div>
  );
}

function PlainHeading({ text }: { text: string }) {
  return (
    <h2
      className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 mt-12"
      style={{ fontFamily: "Atma, sans-serif" }}
    >
      {text}
    </h2>
  );
}

function SubHeading({ text }: { text: string }) {
  return (
    <h3
      className="text-xl md:text-2xl font-semibold text-[#091b18] mb-3 mt-8"
      style={{ fontFamily: "Atma, sans-serif" }}
    >
      {text}
    </h3>
  );
}

function MarionQuote({ text }: { text: string }) {
  return (
    <blockquote
      className="my-5 border-l-4 border-[#E86B0A] bg-[#f0ede8] rounded-r-lg pl-5 pr-4 py-4 italic text-gray-700 leading-relaxed"
    >
      {text}
    </blockquote>
  );
}

function PracticeLabel({ text }: { text: string }) {
  return (
    <p
      className="mt-6 mb-1 font-bold tracking-wide text-[#E86B0A]"
      style={{ fontFamily: "Atma, sans-serif" }}
    >
      {text}
    </p>
  );
}

function renderBlock(block: Block, key: number): React.ReactNode {
  if (block.type === "img") {
    const file = IMAGES[String(block.index)];
    if (!file) return null;
    return (
      <ArticleImage
        key={key}
        src={`${IMG_DIR}${file}`}
        alt={`Illustration ${block.index} — méthode CAPT`}
      />
    );
  }

  if (block.type === "h") {
    const text = block.text;
    const stepMatch = text.match(/^Étape\s*(\d+)\s*:\s*(.+)$/i);
    if (block.level === 2 && stepMatch) {
      return (
        <StepHeading key={key} number={stepMatch[1]} title={stepMatch[2]} />
      );
    }
    if (block.level === 2) {
      return <PlainHeading key={key} text={text} />;
    }
    return <SubHeading key={key} text={text} />;
  }

  if (block.type === "list") {
    const ListTag = block.ordered ? "ol" : "ul";
    const listClass = block.ordered
      ? "list-decimal pl-6 space-y-2 my-4 text-gray-700 leading-relaxed text-[1.05rem]"
      : "list-disc pl-6 space-y-2 my-4 text-gray-700 leading-relaxed text-[1.05rem]";
    return (
      <ListTag key={key} className={listClass}>
        {block.items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ListTag>
    );
  }

  // paragraph
  const text = block.text;

  if (/^Marion\s*:/.test(text)) {
    return <MarionQuote key={key} text={text} />;
  }

  if (/^(En pratique|Pour conclure|Métaphore du compost)\s*:?$/.test(text)) {
    return <PracticeLabel key={key} text={text} />;
  }

  // Highlight short questions / "Pour le lecteur :" intros lightly
  return (
    <p key={key} className="my-4 text-gray-700 leading-relaxed text-[1.05rem]">
      {text}
    </p>
  );
}

export default function ArticleMethodeCAPT() {
  const heroAnim = useInView(0);

  // Group consecutive blocks under each step into AnimSection wrappers
  // so animations trigger naturally as the user scrolls.
  const grouped: React.ReactNode[] = [];
  let buffer: React.ReactNode[] = [];
  let groupKey = 0;

  const flush = () => {
    if (buffer.length === 0) return;
    grouped.push(
      <AnimSection key={`g-${groupKey++}`}>
        <div className="mb-2">{buffer}</div>
      </AnimSection>
    );
    buffer = [];
  };

  BLOCKS.forEach((block, i) => {
    // The first body block is the literal expansion of CAPT
    // ("Communication, Authentique, Profonde et Transformative"),
    // already shown as the hero subtitle — skip to avoid duplication.
    if (
      i === 0 &&
      block.type === "p" &&
      /^Communication,\s*Authentique,\s*Profonde\s*et\s*Transformative$/i.test(
        block.text.trim()
      )
    ) {
      return;
    }
    // Start a new animated group at every H2 (top-level section)
    if (block.type === "h" && block.level === 2) {
      flush();
    }
    buffer.push(renderBlock(block, i));
  });
  flush();

  return (
    <main data-testid="page-methode-capt">
      {/* Hero */}
      <section className="relative bg-[#E86B0A] overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 50%, #fff 0%, transparent 60%)",
          }}
        />
        <div
          ref={heroAnim.ref}
          className="max-w-7xl mx-auto px-6 py-16 text-center transition-all duration-700"
          style={{
            opacity: heroAnim.inView ? 1 : 0,
            transform: heroAnim.inView
              ? "translateY(0)"
              : "translateY(30px)",
          }}
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-orange-100 mb-3">
            Article
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold leading-tight text-white"
            style={{ fontFamily: "Atma, sans-serif" }}
          >
            C’est quoi la méthode CAPT
          </h1>
          <p className="mt-4 text-lg text-orange-100 font-light max-w-2xl mx-auto">
            Communication, Authentique, Profonde et Transformative
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-8 bg-white"
          style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }}
        />
      </section>

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-6 py-16">{grouped}</article>
    </main>
  );
}
