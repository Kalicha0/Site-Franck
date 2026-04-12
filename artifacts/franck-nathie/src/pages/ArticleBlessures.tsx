import { useRef, useEffect, useState } from "react";
import rejetImg from "@assets/2_les_blessures_-_Rejet_1774979777263.png";
import trahisonImg from "@assets/3_les_blessures_-_Trahison_1775438236274.png";
import injusticeImg from "@assets/4_les_blessures_-_Injustice_1775438282630.png";
import humiliationImg from "@assets/6_les_blessures_-_Humiliation_1774979777264.png";
import incomprehensionImg from "@assets/7_les_blessures_-_Incompréhension_1775438719199.png";
import existentielleImg from "@assets/unnamed_1775438880888.png";
import croissanceImg from "@assets/unnamed_(1)_1775439128995.png";
import violImg from "@assets/les_parts_exilé_blessé_-la_violé2_1775438408517.png";

function useInView(threshold = 0.08) {
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

const IMG = {
  header:   "https://lh7-rt.googleusercontent.com/docsz/AD_4nXdk8JPgSOB7uJsejSYnWYcXtobzOGWSFnrVLAW-ip5xuFxGa195WfloP1nCizmumm_OpqEUWbJA9B2zVQwL2KoDTm2FOnaPlTdokp7h6VFzwfRJ5gt6wGPv3Bqj8_48EdG67W0IAw5R0n5J?key=Pqw6F8_ZNYqwwICeAsKOrw",
  abandon1: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcWbM4eAvSGbaMJo7di0bUbf_cwU8gJs-Az81M1lOs1lLPtmDDLTjEMirC1EvwIZ-K_RnVjo5Vxud4VqgglOEiJNsdJNJuZRBSCVgh5qglRk4CRm-WP4cIgSwxYd_qQuOtZUg8cG-OCbD0?key=Pqw6F8_ZNYqwwICeAsKOrw",
  rejet:    rejetImg,
  trahison: trahisonImg,
  injustice: injusticeImg,
  viol:     violImg,
  humiliation: humiliationImg,
  incomprehension: incomprehensionImg,
  emprisonnement: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcj3fsFSoXXB4Xz2mjab-tKQ7cM7sNTUVDjea8RnM7p5GxXVmmmukrcw4dFes-EP2FBbPuQ9hb4sg5W6wvARGF6UaR2y5VOeRo1sfGcZbUupGErw-Mxl4clNR3ASvVVdEa-Vkr4zi_0aBg?key=Pqw6F8_ZNYqwwICeAsKOrw",
  existentielle: existentielleImg,
  transgen:  "https://lh7-rt.googleusercontent.com/docsz/AD_4nXeReKsPMb_Ez_vHFSiM6APNd63Hj9z4oYx7PNOJ7nnVkoB495_U_gUSsODM07zi4Uw8K-_GmOLuJDdTaMDkHRn40SMFAcuVJDJ0Oov6VQFrF-ul9hioqFBbww9MhbYMyjGVeiMv3t0vn7c5?key=Pqw6F8_ZNYqwwICeAsKOrw",
  croissance: croissanceImg,
  deuil:     "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcpTnD6lRf4V92Z3fPm2yWlVhpifjlKe3AeEjwaA8mFO6JNIuiaRSyAy7ovXjn-frGR-rsIaKpXPbYfYnq5w_PI3CvO8X-ZY6fQmN4--VnKsNJVREBo1TuyjtsNWscGUCQZoPwkbpQZepOH?key=Pqw6F8_ZNYqwwICeAsKOrw",
};

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)" }}
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
        style={{ maxHeight: 400, objectFit: "contain" }}
        loading="lazy"
      />
    </div>
  );
}

function WoundSection({
  number,
  title,
  image,
  imageAlt,
  children,
}: {
  number: number;
  title: string;
  image?: string;
  imageAlt?: string;
  children: React.ReactNode;
}) {
  return (
    <AnimSection>
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-full bg-[#E86B0A] text-white text-xl font-bold flex items-center justify-center shadow-md"
            style={{ fontFamily: "Atma, sans-serif" }}
          >
            {number}
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold text-gray-800"
            style={{ fontFamily: "Atma, sans-serif" }}
          >
            {title}
          </h2>
        </div>
        {image && <ArticleImage src={image} alt={imageAlt || title} />}
        <div className="prose-content space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
          {children}
        </div>
      </div>
    </AnimSection>
  );
}

export default function ArticleBlessures() {
  const heroAnim = useInView(0);

  return (
    <main data-testid="page-blessures">

      {/* Hero */}
      <section className="relative bg-[#E86B0A] overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #fff 0%, transparent 60%)" }}
        />
        <div
          ref={heroAnim.ref}
          className="max-w-7xl mx-auto px-6 py-16 text-center transition-all duration-700"
          style={{ opacity: heroAnim.inView ? 1 : 0, transform: heroAnim.inView ? "translateY(0)" : "translateY(30px)" }}
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-orange-100 mb-3">
            Article
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold leading-tight text-white"
            style={{ fontFamily: "Atma, sans-serif" }}
          >
            Les 12 blessures existentielles
          </h1>
          <p className="mt-4 text-lg text-orange-100 font-light max-w-2xl mx-auto">
            Une exploration approfondie des expériences fondatrices qui façonnent notre psyché et nos comportements
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-8 bg-white"
          style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }}
        />
      </section>

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-6 py-16">

        {/* ── Intro : Lise Bourbeau ── */}
        <AnimSection>
          <div className="mb-14">
            <h2
              className="text-2xl font-bold text-gray-800 mb-2"
              style={{ fontFamily: "Atma, sans-serif" }}
            >
              Lise Bourbeau les 5 blessures
            </h2>
            <div className="w-12 h-1 bg-[#E86B0A] rounded-full mb-6" />
            <ArticleImage src={IMG.header} alt="Les 12 blessures - illustration" />
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>
                Dans les travaux de Lise Bourbeau, on retrouve 5 blessures (TRAHI : Trahison, Rejet, Abandon, Humiliation, Injustice) qu'elle appelle « blessure de l'âme », et que je préfère appeler « blessure existentiel » car de mon point de vu « plutôt bouddhiste » l'âme est la seule chose en nous qui ne peut pas être blessée. Dans la vision de Lise Bourbeau, une blessure donne un « masque » et même une morphologie spécifique en fonction de la blessure. Ex : la blessure de rejet qui donnerai le masque du fuyant et une morphologie plutôt filiforme ou la blessure d'abandon qui donnerais le masque du dépendant et une morphologie voutée.
              </p>
              <p>
                De mon point de vu, c'est faux, une même blessure peut donner des comportements « masques » ou je préfère le terme de « parts » qui sont diamétralement opposées dans leur réaction et leur comportement. Et quand à la morphologie je ne sais pas dans quelle mesure les chocs modifient notre morphologie, pour ma part, j'associe la morphologie voutée de mon adolescence aux intolérances alimentaires plutôt qu'à la blessure d'abandon car je vois bien que je me tient plus droit quand je digère bien et que je suis plus vouté et contracté quand j'ai manger du gluten et des produits laitier en quantité.
              </p>
              <p>
                Comme on va le voir, en fonction de si l'on a pu faire face à la situation, de si on a pu fuir la situation ou si on a dû se soumettre, la même blessure va donner une « personnalité » différente on va le voir plus loin.
              </p>
              <p>
                J'ai pu aussi observer que 5 blessures était très limité et que de nombreuse blessures comme le fait d'avoir été violé ou de s'être senti nul à cause difficulté d'apprentissage créer des troubles psychiques et comportementaux qui n'ont rien à voir avec les 5 masques que Lise Bourbeau avais identifiés.
              </p>
              <p className="font-medium">Exemple</p>
              <p>La blessure de viol, peut donner 3 comportements distinct</p>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  Le contrôle de la situation : si la personne a pu faire face, ou a été protégé par quelqu'un qui a fait face, la personne va créer une part contrôlante, qui voudra faire des sports de combat, à acheter une bombe lacrymogène ou un revolver pour se protéger.
                </li>
                <li>
                  La fuite : si la personne a réussis à fuir la situation, elle pourra avoir tendance à être fuyante, éviter d'être seul avec une personne (ascenseurs, etc..). Ou bien de s'enlaidir, de devenir inconsciemment moche pour faire « fuir » les potentiels agresseurs.
                </li>
                <li>
                  La soumission : si on a dû se soumettre au viol (contexte familiale proche) et que personne n'a pu nous protéger, alors la on va créer des parts soumises comme « la dissociés » qui aide à fuir le corps, ou à l'inverse on peut prendre plaisir ou tirer profit du traumatisme auquel on a été obligé et habitué à se soumettre. Le comportement de survie que l'on retrouve chez les prostitués, des actrices de films X, et que l'on retrouve aussi chez les pédophiles. Ce qu'ils ont en commun, c'est d'être des enfants qui on subit des violences sexuelles auquel ils ont du se soumettre et on été forcé de s'habituer jusqu'à ce que cela deviennent (pas sis grave)
                </li>
              </ol>
              <p>
                Sachant qu'en plus, la blessure de viol peut avoir des degrés différents entre le viol de mon intimité (quand quelqu'un fouille ma chambre et lis mon journal intime) ou le viol physique, attouchement ??? pénétration ???… Cela ne donne pas du tout les mêmes réactions, pourtant on se sent bien violé dans notre intimité quel que soit le degré que l'on subit.
              </p>
            </div>
          </div>
        </AnimSection>

        {/* ── Section : Jugements cachés ── */}
        <AnimSection>
          <div className="mb-14 bg-[#f0ede8] rounded-2xl p-8">
            <h2
              className="text-2xl font-bold text-gray-800 mb-2"
              style={{ fontFamily: "Atma, sans-serif" }}
            >
              Les 5 blessures seraient des jugements caché…
            </h2>
            <div className="w-12 h-1 bg-[#E86B0A] rounded-full mb-6" />
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>
                Lors de mes formations à la Communication Non Violente que je faisais en même temps que les formations « écoute ton corps » de Lise Bourbeau, j'ai appris en CNV qu'il y avait des vrais sentiments et des faux sentiments que l'on appel des jugements caché ??? On avait tout une liste de faux sentiment qui implique qu'il y ait une autre personne qui nous met dans une posture de victime et que l'on accuse de nous faire du mal (la trilogie de Karpman disant clairement que, tant qu'on est une victime, on est impuissant !) et cette liste était : je me sans abandonné, trahis, rejeté, humilié, volé, rabaissé…. ? ☺
              </p>
              <p>
                Tiens, les 5 blessures de l'âme de Lise Bourbeau serait alors des jugements cachés ? Des biais cognitifs ? Des ornières psychiques ??? Et avec le recul oui elles le sont.
              </p>
              <p>
                On nous posait la question lors des formations CNV, « quand tu te sens abandonné, tu te sens comment ?Tes vrais sentiments c'est quoi quand tu te sens abandonné ? Je me sens triste, seul, déçu, inquiet… Haaaa ça c'est des vrais sentiments ! Car il n'implique que toi, c'est toi qui le vie et c'est ta propre responsabilité la façon dont tu le perçois et donc t'a un pouvoir dessus ! Alors que t'a aucun pouvoir quand tu te sens « abandonné » et tu accuse l'autre de t'abandonner alors que ce n'est pas forcément le cas.
              </p>
              <p>
                Qui pourrais nier que tu ressens de la tristesse, du désespoir de la solitude ??? Par contre, qui pourrais nier qu'on t'a abandonné, trahis, humilié, rejeté ?
              </p>
              <p>
                Dans les faits, vu que cela implique une autre personne, chacun regardera les choses sous l'angle qui l'arrange et on te dira à juste titre, « mais non je ne t'ai pas abandonné je suis jute partis/ ou allez voir ailleur ! Non je ne t'ai pas trahi, on avait pas de contrat, non je ne t'ai pas humilié, c'est toi qui est susceptible et orgueilleux etc… Et la différence majeure, c'est d'être 100% responsable de ce que l'on vie et que du coup, on retrouve 100% de pouvoir sur notre vie.
              </p>
              <p>
                Donc, qui avais raison, la CNV qui dit que se sentir rejeté est un jugement caché qui nous rend dépendant ou Lise Bourbeau qui dit que c'est une blessure de l'âme ??? Même si son travail restait à mes yeux une piste profonde à explorer, là je ne pouvais plus la rejoindre dans ces caricatures.
              </p>
              <p>
                C'est quand j'ai commencé à voir cette complexité que je me suis rendu compte à quel point le travail de Lise Bourbeau sur les blessures intérieures, même s'il était intéressant et novateur en son époque, était profondément incomplet, simpliste et qu'apparemment, peu de gens avais poussez plus loin ses découvertes. Je me sentais donc investis d'une certaine missions d'aller plus loin ☺
              </p>
            </div>
          </div>
        </AnimSection>

        {/* ── Section : Expériences de vie ── */}
        <AnimSection>
          <div className="mb-16">
            <h2
              className="text-2xl font-bold text-gray-800 mb-2"
              style={{ fontFamily: "Atma, sans-serif" }}
            >
              Des blessures de l'âme ? Ou des expériences vie incomprise ?
            </h2>
            <div className="w-12 h-1 bg-[#E86B0A] rounded-full mb-6" />
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>
                Si l'on regarde l'expérience humaine avec le même détachement que si on observait la forêt ou des animaux, on peut facilement se rendre compte qu'on a beaucoup de chose en commun. On vit tous des hivers, des printemps joyeux dans nos projets, l'envie de se reproduire, des sécheresses, la soif, des automne ou tout tombe, le froid, perdre des parties de nous que ce soit des banches, ou des proches, se faire bouffé par l'autre, devoir prendre sa place à nouveau.
              </p>
              <p>
                Dans la nature, il n'y a pas de bien, ni de mal, il y a la recherche d'équilibre
              </p>
              <p>
                Mais ce n'est pas parce que les animaux n'ont pas de notion de bien et de mal, qu'ils ne ressentent pas l'amour, la tendresse, la compassion, la colère, la solitude, la peur, le désespoir. Nous avons tous ces sentiments en commun avec les animaux du jardin. Ce qui nous différencie, c'est que nous sommes les seuls à avoir inventé le bien et le mal. Dans la nature et dans le bouddhisme on parle d'équilibre et de déséquilibre. Et quand on cherche l'équilibre, il n'y a pas de bon coté au tomber.
              </p>
              <p>
                Dans la métaphysique, la physique quantique, la philosophie bouddhiste, et amérindienne, nous somme chacun créateur de notre réalité individuel et nous choisissons les expériences qui nous permettent de grandir en conscience. Mais quand ces expériences sont observées avec des lunettes du bien et du mal et que l'on voie de l'abandon, du rejet et des injustices partout, cela rend l'expérience plus douloureuse que si l'on regarde avec les lunettes de la nature « la recherche d'équilibre ».
              </p>
              <p>
                Le fait de voir les 12 blessures existentielles comme des expériences et comme des ingrédients de la vie, plutôt que comme des accidents injustes de la vie, change radicalement notre posture face au monde. Vu qu'une blessure a une charge émotionnelle qui est accompagné d'une incompréhension, qui va donner lieu à croyance basé sur le bien et le mal (voir Kapman), le fait de pouvoir remettre de la conscience et de la non-dualité sur ce que l'on a vécu, permet à nos parts intellectuels de mettre du sens sur ce nos expériences de vie douloureuse. L'autre partie du travail sera de libérer ce qui est resté dans le corps sous forme de stresse, de tensions, de douleur, de peur et de réactualiser petit à petit les croyances de nos parts pour pouvoir commencer à retrouver de l'espace en nous, et d'installer nouveau comportement, plus intuitif, plus conscient, autonome, plus juste pour nous. On retrouve petit à petit cette unité qu'on tous les animaux de nos jardin ou chacun est autonome, vigilent et chantes gaiment sa joie de vivre tous les printemps.
              </p>
            </div>
          </div>
        </AnimSection>

        {/* ── Séparateur ── */}
        <AnimSection>
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#E86B0A] mb-4"
              style={{ fontFamily: "Atma, sans-serif" }}
            >
              Les 12 blessures existentielles
            </h2>
            <div className="w-16 h-1 bg-[#E86B0A] rounded-full mx-auto mb-4" />
            <p className="text-gray-600 italic">
              Voyons une par une ces expériences qui font partie intégrante de l'expérience humaine
            </p>
          </div>
        </AnimSection>

        {/* ── 1. L'abandon ── */}
        <WoundSection number={1} title="L'abandon" image={IMG.abandon1} imageAlt="L'abandon">
          <p>
            La blessure originelle d'abandon vient dans les premiers mois de la vie, quand j'appelles ma mère au landau et que je réalise que je ne peux rien faire sans elle. Cela crée une peur et une angoisse douloureuse, voire une terreur d'être abandonné. La peur, l'ennui, l'incomplétude, le manque m'envahissent.
          </p>
          <p>
            La petite graine que je suis sent bien que sans arrosage, sans protection de maman, elle ne peut pas pousser. Quand la graine a passé le cap du sevrage et de l'autonomie, cette terreur du manque et de l'incomplétude disparaît.
          </p>
          <p>
            Mais en attendant ce sevrage qui peut ne jamais arriver, la peur de l'abandon peut me suivre toute ma vie. Elle reste présente en moi alors que serais en mesure de combler mes besoins seul (me nourrir, faire à manger, faire ma compta, mon linge, de m'accorder de l'attention, de la tendresse, de savoir m'occuper de moi quoi). Mais si je n'ai jamais été autonomisé….
          </p>
          <p>
            J'aurai tendance à créer un syndrome de l'abandon : comme je ne sais pas mettre fin à une relation, on m'abandonnera obligatoirement... sans fin.
          </p>
          <p>
            Ou à l'inverse si j'ai réussi à m'autonomiser et à survivre de force sans l'aide de personne, j'abandonnerais facilement mes relations sans explication, sans sevrage, ce qui créera des blessures d'abandon dans mon entourage.
          </p>
          <p>
            Les blessures d'abandon sont directement liées au servage et donc à la pyramide des besoins fondamentaux d'Abraham Maslow (voir Annexe 1).
          </p>
          <p>
            Elles sont guéries définitivement quand tu soignes la tristesse de tes parts enfants et que tu dépasses l'expérience de combler tes besoins entièrement seul. Une fois que tu as passé du temps seul et que tu as goûté à la joie d'être libre des attentes des autres, tu n'as plus du tout peur de la solitude : elle devient même un besoin pour se retrouver soi et on cherche alors l'équilibre entre la relation à soi et au autre.
          </p>
          <p>
            Le fait de laisser l'autre quand il est en mesure de survivre seul est vu alors comme un rituel initiatique de sevrage, qui est bénéfique et n'est plus vu comme un abandon de l'autre. Tu n'es plus dépendant matériellement et affectivement des autres et tu sais offrir cette autonomie à ceux que tu aimes (enfants, ex-conjoint, etc.).
          </p>
        </WoundSection>

        {/* ── 2. Le rejet ── */}
        <WoundSection number={2} title="Le rejet" image={IMG.rejet} imageAlt="Le rejet">
          <p>
            Les blessures de rejet peuvent trouver leur origine lors de l'accouchement qui peut être vécu comme un rejet pour le bébé, ou lorsque les parents montrent des signes de rejet (une maman qui remet le bébé bébé dans son landau quand il pleure ou crie trop, un papa qui fait la grimace devant les couches malodorantes, etc.). Le bébé se sent alors rejeté dans ce qu'il est.
          </p>
          <p>
            S'ensuivent toutes les situations où tu te sentiras rejeté à cause de tes spécificités : éthiques, ethniques, morphologiques, culturelles, goûts spécifiques, etc. L'enfant que tu étais a essayé de changer, pour ne pas déranger.
          </p>
          <p>
            Le fait de se sentir « non désirable » peu développer en nous une envie de plaire à tout le monde nous poussant à être « gentil » à faire le « caméléon » pour tenter de coller au attentes des autres.  Et une incapacité à mettre des limites aux autres (ce qui me ferais prendre le risque d'être rejeté).
          </p>
          <p>
            Ou à l'inverse de développer une insensibilité totale au critique et un rejet global des autres et de l'humanité (associable, l'agoraphobe) et de rejeter tout le monde quelque sorte.
          </p>
          <p>
            Quand on dépasse la blessure de rejet et qu'à travers les exercices de libération on retrouve l'estime de SOI, On devient vraiment nous-même, on ose déplaire, certains nous adoreront pour la spécificité que l'on a et d'autres nous détesteront pour les mêmes raisons. Et oui, si d'un côté je veux que tout le monde m'aime et que de l'autre, je n'arrive pas a aimé tout le monde, il y a un problème, je me ment à moi-même de désirer ce que je ne peux donner !
          </p>
          <p>
            C'est quand on a bien intégré qu'on ne pourra jamais plaire à tout le monde et que l'on s'autorise du coup, à ne pas aimer tout le monde, que l'on peut devenir vraiment SOI… Unique et parfaitement imparfait.
          </p>
          <p>
            On n'a plus peur du rejet des autres que l'on considère alors comme une différence de goût et on a pas peur non plus de mettre des limites aux autres et de dire stop, même s'il se sentent rejeté par nous.
          </p>
        </WoundSection>

        {/* ── 3. La trahison ── */}
        <WoundSection number={3} title="La trahison" image={IMG.trahison} imageAlt="La trahison">
          <p>
            Les blessures de trahison arrivent dans les premières années de la vie, avec des promesses et engagements non tenus, des secrets divulgués, des mensonges par omission que l'on nous a fait, tous ce qui rompent la confiance en l'autre.
          </p>
          <p>
            Souviens-toi, peut-être, quand tu as découvert que le Père Noël et la petite souris était un mensonge, le d'être trompé par ceux en qui tu avais confiance peu laisser un goût amer. Le fait de voir l'un de ses parents avoir une experience extraconjugale ou qu'un d'une part avec le compte en banque.
          </p>
          <p>
            Les blessures de trahison sont liées au mensonge, au flou qui permet le mensonge par omission, au non-respect des engagements, au sentiment d'injustice (voir Blessure d'injustice), à l'absence de clairvoyance, au fait d'accorder une confiance aveugle aux autres sans vérifier.
          </p>
          <p>
            La réaction de protection sera d'avoir une méfiance des autres compulsive, une aversion pour les traitres et de chercher à être juste et fidèle, ou à l'inverse si on a accepté le traumatisme, on va voir les autres comme des proies potentiels que l'on peut trahir impunément (vu que ça ne m'a pas tuer qu'on me trahisse, tu ne vas pas en mourir non plus ! ) La blessure de trahison est transcendée quand une fois les émotions libérées, je réalise que c'est mon manque de clarté et de vigilance qui créer le phénomène. Quand je reprends l'intégralité de ma responsabilité (comme un animal sauvage qui doit être vigilent) et que j'écoute mon intuition, que je mets de limites claires, que je fais des contrat clair, bizarrement, plus personne ne me trahis et je ne trahis plus personne. Je vis juste des expériences qui m'apprennent à être plus vigilent, plus intuitif, plus clair.
          </p>
        </WoundSection>

        {/* ── 4. L'injustice ── */}
        <WoundSection number={4} title="L'injustice" image={IMG.injustice} imageAlt="L'injustice">
          <p>
            Les blessures d'injustice se créent dans les premières années de ta vie. Elles sont liées à toutes les injustices et les déséquilibres vécus (papa préfère mon frère, tata ne m'a pas offert de cadeau alors qu'elle en avait offert un à ma sœur, etc.). Une étude sur les singes a montré que le sentiment d'injustice est commun aux deux espèces : si on donne une banane à un singe et un concombre à l'autre, celui qui a reçu le concombre s'énerve et le rejette au chercheur (YouTube - Le sentiment d'injustice). Les blessures d'injustice sont liées à un besoin d'équilibre, d'équité et à la croyance que tout devrait être juste.
          </p>
          <p>
            La réaction de protection, si les premières injustices ne sont pas acceptées, sera le contrôle et la droiture. L'objectif est d'éviter à tout prix d'être quelqu'un d'injuste, de punir les injustes (le justicier, le policier etc)
          </p>
          <p>
            A l'inverse si on a accepter l'injustice, on va faire vivre des injustices impunément (le révolté, le chef tyrannique, le pervers).
          </p>
          <p>
            Dans les deux cas, le sentiment d'injustice  rend rigide, dur, incapable de se mettre à la place l'autre, cela amène à nier les sentiments, dansles deux cas on voie notre sensibilité et celle de l'autre comme une faiblesse.
          </p>
          <p>
            Quand on a libéré les émotions qui était bloqué, on peut alors accepter plus facilement le fait que dans la nature, l'équilibre n'existe pas sans le déséquilibre, que la justice n'existe pas sans l'injustice, que la droiture des troncs côtoie toujours des branches tordues. Dans le monde sauvage, il n'y a pas d'injustice, il n'y a que la recherche d'équilibre et les cause et effet. Le fait de voir un déséquilibre comme un déséquilibre et plus comme une injustice nous invite à être plus vigilent, à pas attendre de l'autre qu'il soi juste par principe, à ne pas compter sur un sauveur pour punir le méchant.
          </p>
          <p>
            On sort alors de la trilogie infernale de Karpman et on peut commencer chercher l'équilibre entre donner et recevoir, plutôt que de chercher le bon ou les mauvais camps.
          </p>
        </WoundSection>

        {/* ── 5. L'intrusion et le viol ── */}
        <WoundSection number={5} title="L'intrusion et le viol" image={IMG.viol} imageAlt="L'intrusion et le viol">
          <p>
            Les blessures de viol arrivent quand quelqu'un viole notre intimité et notre espace vital par la force ou la sournoiserie. Cela peut être un viol physique, un viol psychique avec des questions intrusives, ou un viol de ton espace, ton journal intime par exemple. Ils n'auront pas le même impact en fonction de leur gravité, mais dans tous les cas cela brisera la confiance, créera de la méfiance et un besoin de protection de l'intimité.
          </p>
          <p>
            Si l'on a pu faire face à l'agression, on aura tendance à développer des parts guerriers.  Si l'on a pu fuir la situation, on va plutôt développer des parts qui fuis tous situation dangereuse.
          </p>
          <p>
            Dans certains cas, si la blessure de viol est acceptée dans la résignation (soumission), ou que le fait de se protéger ai pu engendrer des danger encore plus graves (menace de mort, destruction familiale, etc.), cela peut donner un comportement de soumission et de résignation à être violé et/ou de violer les autres dans l'impunité. La réaction de protection sera souvent l'oubli, (souvent les souvenirs s'arrêtent à l'âge de la blessure), la dissociation ou ont fuie son corps pour ne pas ressentir, de cultiver la laideur pour ne plus attiré, de s'habituer au viol et d'en tirer profit (prostitution, films X).
          </p>
          <p>
            Il est aussi fréquent de pardonner son tortionnaire, pour ne pas couper le lien vital : «Papa avait besoin d'amour / C'est moi qu'il existait / Maman avait besoin de tendresse quand papa est mort »,  etc.).
          </p>
          <p>
            Les déviances sexuelles comme la pédophilie sont toujours liées au fait d'avoir dû se soumettre au viol et d'avoir été forcé d'accepter petit à petit d'y prendre plaisir, jusqu'à ce que la libido de l'enfant se construise autour des viols qu'il a subis.
          </p>
          <p>
            Dans la nature la blessure le viol est intiment lier à la posture de proie qui n'a plus de force et dois se soumettre. Cependant, on peu voir régulièrement dans les documentaires, des gazelles encorner des lions, des chats se faire poursuivre par des rats, des ours se sauver devant un chat énervé. La posture de proie, de victime n'est pas bien définie, c'est surtout une question de courage et de détermination qui fait que « le faible » n'est pas forcément la proie, ou la victime.
          </p>
          <p>
            Cette blessure est liée à la perte de notre souveraineté, du héros courageux en nous qui a disparu pour nous permettre de survivre.
          </p>
          <p>
            Une fois que les émotions liées au traumatisme du viol ont été libéré, que la haine et la peur ont été apaisé, que l'estime de soi remonte, que l'on retrouve l'intuition qui permet d'éviter les situations dangereuses et que l'on sait se mettre en position de force (savoir se défendre, avoir une bombe lacrymogène, demander de l'aide, etc) bizarrement, le prédateur ne voit plus une proie, mais un danger potentiel et change de cible.
          </p>
        </WoundSection>

        {/* ── 6. L'humiliation ── */}
        <WoundSection number={6} title="L'humiliation" image={IMG.humiliation} imageAlt="L'humiliation">
          <p>
            La blessure d'humiliation arrive quand on commences à construire notre estime de nous et que l'on à s'identifie à notre « Moi ». Si on se moque de toi et qu'on dénigre ta valeur, parce que tu fais pipi au lit, que tu t'es fait pipi dessus, que tu sens le moisie ou les animaux de la ferme etc... Cela crée un sentiment d'imperfection et d'impureté de honte. Ce sentiment d'imperfection est directement lié à la morale et au dogme culturel qui définit ce qui est sale de ce qui est propre, ce qui est accepté de ce qui ne l'est pas. La moquerie est un des outils de conditionnement du groupe envers l'individu. Elle peut venir des parents, frères, sœurs, ou arriver plus tard avec les camarades d'école qui taquinent maladroitement et parfois durement. La blessure d'humiliation est directement liée à la honte et aux tabous de la société. Tu peux avoir honte d'un peu n'importe quoi.
          </p>
          <p>
            L'exemple type, c'est quand on s'aperçoit que tu es amoureux et qu'on te dit « Hou les amoureux ! », et tu deviens rouge de honte… ou qu'on te voit nu, ou en train de te faire plaisir sexuellement et qu'on rie de toi (alors que tu ne fais que découvrir innocemment ce que tout être humain découvre). Chacun projette sa honte et ses tabous sur les autres, inconsciemment.
          </p>
          <p>
            Cette blessure est liée directement à la peur de perdre le lien avec les autres, le sentiment d'imperfection, et à l'orgueil, car il ne peut pas y avoir d'humiliation sans un orgueil qui est touché.
          </p>
          <p>
            La réaction de protection pourra être d'éviter les situations où l'on voie mes émotions, ma sensualité, de me faire plaisir devant les autres, tous les plaisirs et les situations qui peuvent provoquer la moquerie et la honte (agoraphobe, fuyant, timide). Si tu as accepté et intégré la morale collective, tu peux te sentir coupable d'avoir envie de ces plaisirs, te sentir sale, ce qui donne souvent un comportement « masochiste » où tu te punis de tes péchés, consciemment ou inconsciemment. Ceux qui acceptent la morale entrent dans une sorte de recherche de vertu (la grenouille de bénitier - le moine ou la nonne qui est en conflit intérieur entre tentation et abstinence)
          </p>
          <p>
            A l'inverse si on a pas supporté l'humiliation, on peut développer des parts très « moqueuses » et devenir une sorte de sniper de la vanne qui découragera les autres de se moquer de nous (l'humiliante)
          </p>
          <p>
            ou aller vers les anti-religion (satanisme, sexualité hard, culture dark, etc.) pour conjurer la possibilité d'être humilié ou de culpabiliser à nouveau.
          </p>
          <p>
            On guéri la blessure d'humiliation quand après avoir libéré les émotions, on retrouve l'estime de soi, l'innocence, que la sensualité et la sensibilité redeviennent des vertu et que l'humilité dissous l'orgueil qui essayait de se cacher. S'il n'y a plu d'orgueil, il ne reste que de la tristesse de se sentir jugé, éventuelement de la colère de vivre ça, et le courage de demander pourquoi on se moque de nous en confrontant courageusement par des phrase comme « ha, peux-tu m'expliqué ce qu'il y a de drôle ??? (mais on en est rarement capable si on est encore blessé).
          </p>
        </WoundSection>

        {/* ── 7. L'incompréhension ── */}
        <WoundSection number={7} title="L'incompréhension" image={IMG.incomprehension} imageAlt="L'incompréhension">
          <p>
            Les blessures d'incompréhension arrivent dans les premiers mois de ta vie, quand tu pleures pour avoir un câlin et qu'on te change ta couche, que tu voulais un biberon mais qu'on te donne un câlin : tu n'as pas de mots ni de gestes pour te faire comprendre! Elle s'aggrave à chaque fois que ton entourage ne comprend pas ta complexité et n'a pas les mots pour t'aider à exprimer les choses compliquées qui se passent en toi.
          </p>
          <p>
            Par exemple, quand l'enfant hurle sa frustration, son corps évacue le trop plein de tensions mais on lui dit « Arrête de faire des caprices », en lui mettant une fessée sans même chercher à comprendre ce qu'il voulait. Il arrive parfois d'être puni ou violenté car une chose, un mot ou une action à été mal comprise ou mal interprétée.
          </p>
          <p>
            Il en découle une frustration, puis un désespoir de se sentir compris et entendu. Cette blessure est directement liée à l'absence d'intelligence émotionnelle et de curiosité de notre entourage, ainsi qu'à la capacité de communication des humains.
          </p>
          <p>
            La réaction de protection si on a accepté la blessure pourra être d'évité d'être à nouveau incompris, de développer des parts qui fuis la relation (agoraphobe, fuyante, démissionnaire, l'indépendante, etc), on ne cherche plus à être compris
          </p>
          <p>
            A l'inverse, si l'on n'a pas accepté la blessure, cela peu crée souvent des parts qui veulent amener de la complexité (analyste), qui veulent tout expliquer (la prof) ou qui hurle pour se faire comprendre (la chef tyrannique, le parent tyrannique)
          </p>
          <p>
            La blessure d'incompréhension se guéri quand, une fois les émotions libérées, on prend conscience qu'on ne peut pas être compris par tout le monde. Et qu'en même temps on développe notre capacité nous exprimer et à écouter l'autre avec plus de finesse et de conscience (les outils comme la communication non violente, méthode ESPER et méthode CAPT.
          </p>
        </WoundSection>

        {/* ── 8. L'emprisonnement ── */}
        <WoundSection number={8} title="L'emprisonnement" image={IMG.emprisonnement} imageAlt="L'emprisonnement">
          <p>
            Les blessures d'emprisonnement arrivent dans les premiers mois de la vie, avec le fait de te sentir coincé et enfermé dans une situation désagréable, ou sans stimuli agréables (ventre de la mère, landau, parc à jouets, chambre, corps, classe, culture, religion, travail, couple, parentalité, etc.). Elles sont liées à l'absence de liberté, au sentiment d'ennui et d'enfermement.
          </p>
          <p>
            Elles s'activent avec le fait d'être enfermé physiquement, ou par les concepts enfermant et réducteurs lors de l'apprentissage, qui cloisonnent l'esprit (tous les dogmes en « isme » : cartésianisme, taylorisme, fordisme, christianisme, islamisme, écologisme, etc.).
          </p>
          <p>
            La réaction de protection, si on n'a pas supporté cet enfermement, est la fuite, le rejet de tout ce qui enferme, une grande attirance pour ce qui est infini et illimité (la claustrophobe).
          </p>
          <p>
            Si à l'inverse, si on a du accepté l'enfermement, on sera attiré par les lieu clos, le dogmatisme, les religions à règles strictes, le rejet de tout ce qui est ouvert et sans limites, la peur des grands espaces. On voie alors la liberté comme « le mal » et on peut développer un comportement de justicier, de religieux dogmatique, de moraliste etc).
          </p>
          <p>
            On guéri la blessure d'emprisonnement quand on a libérer les émotions bloqué et que la peur de l'enfermement ou de l'infini disparait par des exercices pratique. Un peu comme la peur de l'eau se guéri par la natation et la maitrise de la nage.
          </p>
        </WoundSection>

        {/* ── 9. Les blessures existentielles ── */}
        <WoundSection number={9} title="Les blessures existentielles" image={IMG.existentielle} imageAlt="Les blessures existentielles">
          <p>
            Ces blessures se créent quand on commence à accumuler des frustrations (souvent d'autre blessures) et que l'on se demandes inconsciemment quel est le but de la vie : « Je sers à quoi ? », « Pourquoi font-ils tout ça autour de moi ? ça n'a pas de sens ! », « Ce n'est pas drôle ce jeu, quel est le but ? ».
          </p>
          <p>
            C'est la perte de la raison d'être, un peu comme une plante qui aurait oublié que le voyage sur Terre comprend les saisons, les coups de chaud, les coups de froid, les insectes qui mangent les feuilles et le fait de devoir pousser pour faire des fleurs et des fruits : il s'agit d'un jeu et d'une expérience.
          </p>
          <p>
            Les blessures existentielles sont liées au fait de ne plus voir la vie comme un jeu, mais de la voir comme un parcours du combattant qui n'a pas de sens.
          </p>
          <p>
            Pour ceux qui croient au processus d'incarnation, elles peuvent trouver leurs origines au moment de l'incarnation, quand l'âme s'incarne et perd son infinitude et oublie ce qu'elle était venue expérimenter sur terre (dans la vision boudiste, on choisi nos parents et le contexte qui sera le plus propice à l'évolution de notre conscience.
          </p>
          <p>
            Si on a accepté que l'a vie n'avais aucun sens, on peut développer des parts qui veulent mettre fin au voyage (démissionnaire, suicidaire)
          </p>
          <p>
            Ou à l'inverse, si on n'a pas accepté que la vie n'avait pas de sens, on peu développer des parts qui vont chercher à en trouver dans le plaisir et les distractions (boulimique, toxicomane, libido surexcité, dépensière etc.)
          </p>
          <p>
            On guérie la blessure existentielle quand une fois les émotions libérés, on retrouve le sens et le plaisir d'être soi, le goût du jeu de la vie avec toutes les épreuves qu'implique de grandir sur terre.
          </p>
        </WoundSection>

        {/* ── 10. Transgénérationnelles ── */}
        <WoundSection number={10} title="Les blessures transgénérationnelles" image={IMG.transgen} imageAlt="Les blessures transgénérationnelles">
          <p>
            Quand un traumatisme est transmis d'une génération à l'autre, on parle de blessure intergénérationnel. Quand cela saute une génération, alors on parle de blessure transgénérationnelle.
          </p>
          <p>
            Ces blessures se créent avec le poids de la charge traumatique qu'ont vécues la famille et les ancêtres. La violence familiale, un traumatisme de guerre, des viols de mère en fille, des croyances sur l'argent et la richesse, des secrets de famille lourds, des maladies familiale chronique, etc.
          </p>
          <p>
            Ces traumatismes familiaux pèsent sur les générations suivantes de manière sourde et inconsciente. Si ce poids du passé n'est pas accueilli et transformé, on le transmette à nos enfants et aux générations suivantes. Dans l'hindouisme, on appelle cela le Karma que l'on ne peut changer que par la présence en observent son comportement et en changeant nos habitudes.
          </p>
          <p>
            L'IFS et les blessures transgénérationnelle : Richard Schwartz et de nombreux autre thérapeutes IFS, ont constatés parfois des parts chez leur patients qui ne se rattachais pas à l'expérience directe de la personne et à son histoire personnelle.
          </p>
          <p>
            Anne Ancelin Schützenberger était la spécialiste française sur le sujet des blessures transgénérationnelles qu'elle appelle Psycho-généalogie, dans ses ouvrages, elle témoigne de cas extrêmement curieux ou des personnes séparé par deux ou trois générations ont des maladies semblables, aux même organes, au même Age, parfois avec des enfants qui ont le même nom ou font le même métier.
          </p>
          <p>
            Ian Stevenson, chercheur, psychiatre et professeur de psychiatrie à l'université de Virginie, fut le premier à avoir réalisé des recherches scientifiques sur la réincarnation (même si celle-ci ont été contesté). Il parcourut le monde et collecta plus de trois mille cas ou des enfants en bas âges se rappelait de leur vie antérieure dans le monde entier. Il à découvert qu'environ 35% des cas avais des séquelles et malformation physique en lien avec leur mort de vie antérieur.
          </p>
          <p>
            La série « Le chemin de l'olivier » sur Netflix qui par des constellations familiales illustre bien la façon dont l'histoire de notre famille impacte nos vies sur plusieurs générations.
          </p>
          <p>
            Les blessures transgénérationnelle sont guéri de la même manière que les autres par la reconnexion à la partie en souffrance et sa libération, puis par des exercices qui permet un changement de paradigme. La seule différence est que la partie en souffrance n'appartient pas à notre expérience personnelle direct.
          </p>
        </WoundSection>

        {/* ── 11. Croissance et intégration ── */}
        <WoundSection number={11} title="Les blessures de croissance et d'intégration" image={IMG.croissance} imageAlt="Les blessures de croissance et d'intégration">
          <p>
            Ces blessures se créent quand l'un des trois besoins fondamentaux de l'apprentissage n'est pas nourri et que notre croissance est bloqué.
          </p>
          <p className="font-semibold">Les trois besoins de croissance et d'intégration</p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              Besoin de stimulations et d'informations qui t'intéressent : L'intérêt et l'enthousiasme sont les carburant de notre curiosité, (les jeux dans ton parc à jouets). On ne mémorise que ce qui a un intérêt présent, et la curiosité n'est pas un vilain défaut, c'est le moteur de l'apprentissage ! Si ce besoin de curiosité est sous-stimulé, tu t'ennuies dans ton parc à jouet et tu peux devenir boulimique d'aventure et de découverte. À l'inverse, si ce besoin est sur-stimulé et que l'on t'a gavé d'expériences et d'informations qui ne t'intéressaient vraiment pas, tu peux développer des difficultés à intégrer et développer des parts qui se sentent nul (la nul, la démissionnaire).
            </li>
            <li>
              Besoin de sécurité pour expérimenter : Pour arriver à apprendre et intégrer les expériences, il faut se sentir en sécurité (la barrière du parc à jouet, les roulettes du vélo, la surveillance et la douceur de maman). C'est ce contexte qui te permet d'expérimenter sans danger.<br /><br />
              La peur coupe les connexions neuronales et nous met en pilote automatique « mode survie ». Elle coupe l'enthousiasme qui est le moteur de l'intégration.<br /><br />
              Si ce besoin de sécurité n'est pas là, tu te sens en danger et tu auras peur d'expérimenter ta vie future et tu risque de développer des parts (peur panique, dépressive). Si à l'inverse tu as été sur-sécurisé et que l'on t'empêchait de vivre des expériences potentiellement dangereuses (t'interdire de sortir, d'avoir un vélo, de t'approcher du four, etc.), tu peux développer des parts comme « la téméraire » qui cherche le danger pour te sentir exister (sport extrêmes, vitesse, etc.).
            </li>
            <li>
              Besoin de temps d'intégration :c'est le temps nécessaire pour jouer et intégrer le jeu (que tu tiennes sur le vélo et que les roulettes commencent à te gêner pour aller plus vite ou prendre de virage serrés). C'est la répétition et le fait de faire et de refaire, en perfectionnant à chaque fois, qui donne la maîtrise. Si tu prends le temps de faire à ton rythme, len-te-ment... tout devient simple. Si ce besoin a été négligé, que tu n'avais pas assez de temps pour intégrer, tu auras le sentiment d'être un nul (la nul), de ne pas avoir de mémoire, de ne rien pouvoir apprendre. Si à l'inverse tu avais trop de temps d'intégration, c'est le besoin de stimulation qui aura été négligé voir au dessus).  Si tu t'y es habitué et résigné, tu auras un sentiment de vide, d'ennui, et cela peut déboucher sur une blessure existentielle où tu te demandes le sens de la vie et son intérêt.
            </li>
          </ul>
          <p>
            Le manque d'équilibre entre ces trois ingrédients crée à la fois des blessures de l'estime de soi et des parts protectrices.
          </p>
          <p className="font-semibold">Les trois grands types de mémoire</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Visuelle : tu imagines et dois te faire une image mentale pour bien mémoriser.</li>
            <li>Auditive : tu dois te raconter une histoire, te chanter une chanson pour bien mémoriser.</li>
            <li>Kinesthésique / spatiale : tu dois faire et refaire pour que ton corps, tes mains, tes pieds mémorisent.</li>
          </ul>
          <p>
            Si tu n'as pas bien compris ton système de mémoire dominant, tu as pu créer des blessures d'apprentissage et croire que tu n'as pas de mémoire, alors que ta mémoire fonctionne juste différemment de la méthode qu'on t'a imposée (et qui pourtant était pédagogique).
          </p>
          <p>
            L'éducation française est essentiellement visuelle et un peu auditive. Pour un kinesthésique comme moi, c'était l'échec scolaire assuré. J'ai subi de grosses blessures : je croyais que j'étais un crétin, à force qu'on me juge et en constatant mes notes. J'ai développé 3 parts, la nul qui disais « n'essaye même pas ! » La perfectionniste qui disais « ça doit être parfait si tu veux pas qu'on te critique » et la prof « qui cherche à tout expliqué plus simplement !  Quand j'ai compris comment fonctionnait ma mémoire, j'ai commencé à tout pouvoir apprendre.
          </p>
          <p className="font-semibold">Les parts protectrices à l'échec répété</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Éviter les expériences ou les dépasser : pour ceux qui étaient trop stimulés et brusqués dans leur rythme et dans leur besoin d'intégration, qui ont été mis en échec, cela crée des parts démissionnaires (nule - solitaire - triste),  ou à l'inverse des parts perfectionnistes, ou qui s'acharnant dans la pédagogie et l'apprentissage (prof) ;</li>
            <li>Fuir l'ennui à tout prix ou s'y résigner : les parts se réfugient dans une boulimie d'activité pour celui qui a manqué de stimuli et de jeux (dispersée - surmenée - dépensière - collectionneuse), ou au contraire dans la résignation mélancoliquement (mélancolique - immobile apathique) ;</li>
            <li>Sauter vers l'inconnu sans réfléchir ou se sur-sécuriser : pour celui qui a été sur-sécurisé et que l'on a empêché de vivre des expériences, les parts recherchent l'insécurité (téméraire - impatiente - clown), ou à l'inverse ont peur de l'aventure et de tout ce qui est nouveau et inconnu (peur panique - peur d'avoir peur).</li>
          </ul>
          <p>
            On guérie les blessures de croissance et d'intégration qu'en une fois les émotions libéré et l'estime de soi retrouvé, on remet les ingrédient de l'apprentissage dans l'ordre 1 faire des choses qui nous plaise et qui on du sens pour nous 2 dans un espace de sécurité ou il n'y a pas d'enjeu et que l'on ne 3 de répéter avec présence et attention autant de fois qu'il faut pour avoir envie du niveau suivent 4 de respecter notre fonctionnement visuel, auditif ou kinesthésique pour mémoriser facilement.   La vie redevient un jeu ou les choses qui nous paraissait impossible et inaccessible le devienne.
          </p>
        </WoundSection>

        {/* ── 12. Le deuil ── */}
        <WoundSection number={12} title="Les blessures de deuil" image={IMG.deuil} imageAlt="Les blessures de deuil">
          <p>
            La mort est un ingrédient essentiel de la vie, mais notre culture occidentale à un rapport à la mort basée sur la peur et l'ignorance, ce qui rend le processus d'acceptation de la mort difficile à intégrer. La blessure de deuil est la non-digestion de l'ingrédient qu'est la mort dans la vie humaine, la difficulté à accepter l'impermanence et les cycles de la vie. Cette blessure est directement liée à la peur et au refus de la mort.
          </p>
          <p>
            Les premières blessures de deuil peuvent être vécues au moment de l'accouchement, quand le bébé réalise qu'il ne pourra plus revenir dans le ventre de sa mère (il y a un deuil à faire), surtout pour les bébés prématurés. Cela peut être aussi la perte du jumeau lors de la grossesse. Chaque perte d'un être cher dans l'enfance (animal, parent, ami, etc.), chaque rêve conditionné autour d'un être cher (« l'homme ou la femme de ma vie »), chaque croyance (« Pour toujours ! ») crée des blessures de deuil quand ce « toujours » meurt et qu'une douleur reste.
          </p>
          <p>
            Le processus de deuil est un processus de transformation naturel quand une perte douloureuse nous arrive et il se passe en 5 phases
          </p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Le déni de la situation, refus de ce qui est</li>
            <li>La colère, ou l'on cherche un coupable</li>
            <li>Le marchandage ou l'on cherche à négocier</li>
            <li>Le désespoir, quand on constate qu'il n'y aura pas de retour en arrière</li>
            <li>L'acceptation, quand on accepte les changements qui arrivent et que l'on passe dans « l'après cette expérience »</li>
          </ol>
          <p>
            La blessure de deuil se fait quand ce processus de digestion ne fonctionne pas, que la douleur ne passe pas et que l'on essaie de se protéger des pertes douloureuses (essayer de se protéger de la mort)
          </p>
          <p>
            Le fait de ne pas accepter la mort et de retenir nos émotions rend les deuils beaucoup plus longs et met du temps à être intégrées dans notre expérience comme un ingrédient de la vie, plutôt qu'un accident de la vie.
          </p>
          <p>
            Pleurer toutes les larmes de son corps parce qu'on a perdu sa grand-mère est normal, ce qui n'est pas normal, c'est quand 20ans après si on repense à mamie, ça nous fait un pincement au cœur. C'est que le deuil n'a pas été fait.
          </p>
          <p>
            La psyché reste bloquée sur la douleur qui devient alors une souffrance et l'attention se fixe sur la peur du manque. Cette blessure nous donne une aversion à la mort, que l'on voie alors comme une injustice qui nous fait peur.
          </p>
          <p>
            Devoir donner la mort, volontairement ou involontairement, voir sa mort arriver ou celle d'un proche sera alors très dur.
          </p>
          <p>
            On guérie les blessures de deuil quand les deuils sont traversés consciemment, que les émotions de tristesse, de désespoir, de colère sont accueillies et vidées de leur substance patiemment.
          </p>
          <p>
            Quand la mort a été comprise et est accepté comme un processus juste, inéluctable, libérateur et que la curiosité remplace la peur, la mort reprend sa place de processus de vie.
          </p>
        </WoundSection>

        {/* ── Citation de clôture ── */}
        <AnimSection>
          <div className="mt-8 mb-4 border-l-4 border-[#E86B0A] pl-8 py-4 bg-[#f0ede8] rounded-r-2xl">
            <p className="text-xl text-gray-700 leading-relaxed italic">
              Le fait de voir les 12 blessures existentielles comme des expériences et comme des ingrédients de la vie, plutôt que comme des accidents injustes de la vie, change radicalement notre posture face au monde.
            </p>
            <p className="mt-4 text-sm font-semibold text-[#E86B0A] tracking-wide">— Franck Nathie</p>
          </div>
        </AnimSection>

      </article>
    </main>
  );
}
