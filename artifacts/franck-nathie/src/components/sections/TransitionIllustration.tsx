import { useRef, useEffect, useState } from "react";
import creativImg from "@assets/les_parts_déchargés_-_Le_créatif_constructif_rg_rond_1774979777267.png";

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function TransitionIllustration() {
  const { ref, inView } = useInView();

  return (
    <div className="py-8 bg-white flex justify-center">
      <div
        ref={ref}
        className="transition-all duration-700"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
        }}
      >
        <img
          src={creativImg}
          alt="La partie créative libérée — peindre sa vie"
          className="w-72 sm:w-96 object-contain"
        />
      </div>
    </div>
  );
}
