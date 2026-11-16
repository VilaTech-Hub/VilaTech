import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const desktopVideoQuery = '(min-width: 768px) and (prefers-reduced-motion: no-preference)';

function subscribeToDesktopVideo(onChange: () => void) {
  const query = window.matchMedia(desktopVideoQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

const canAutoplayDesktopVideo = () => window.matchMedia(desktopVideoQuery).matches;
const disableVideoOnServer = () => false;

function DesktopBackgroundVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <video
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115vw] h-[115vh] min-w-[177.77vh] min-h-[56.25vw] object-cover scale-110 transition-opacity duration-300 ${playing ? 'opacity-100' : 'opacity-0'}`}
      src="https://res.cloudinary.com/u8yzzqzn/video/upload/v1792507947/FILME_APRE_V06_1.mp4"
      autoPlay
      muted
      loop
      playsInline
      onPlaying={() => setPlaying(true)}
      onError={() => setPlaying(false)}
    />
  );
}

const CoworkingHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [coverReady, setCoverReady] = useState(false);
  const desktopVideo = useSyncExternalStore(subscribeToDesktopVideo, canAutoplayDesktopVideo, disableVideoOnServer);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll out effect (parallax/scale)
      gsap.to(heroRef.current, {
        opacity: 0,
        scale: 0.95,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="sticky top-0 w-full min-h-[640px] h-[100svh] overflow-hidden bg-void-black z-0"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-void-black">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/images/imgs_coworking/hero-poster.webp"
          alt=""
          fetchPriority="high"
          onLoad={() => setCoverReady(true)}
          onError={() => setCoverReady(true)}
        />
        {desktopVideo && coverReady && <DesktopBackgroundVideo />}

        {/* Cinematic Gradient Overlays (sutil apenas para o topo e base) */}
        <div className="absolute inset-0 bg-gradient-to-b from-void-black/80 via-transparent to-void-black/40" />
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pb-28 pt-32">
          <h1 className="max-w-3xl text-3xl md:text-5xl font-syne font-bold text-white leading-tight">
            Coworking em Itu para você e sua equipe
          </h1>
          <p className="max-w-2xl mt-5 text-base md:text-xl font-sans text-white/90 leading-relaxed">
            Estações de trabalho, salas de reunião e auditório no Itu Novo Centro.
            Escolha o espaço e solicite uma cotação para o período que precisa.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a href="#cotacao" className="inline-flex items-center justify-center rounded-full bg-[#378ADD] px-7 py-4 font-syne font-bold text-white hover:bg-white hover:text-[#378ADD] transition-colors">
              Solicitar cotação
            </a>
            <a href="#espacos" className="inline-flex items-center justify-center rounded-full border border-white/50 px-7 py-4 font-syne font-bold text-white hover:bg-white/10 transition-colors">
              Ver espaços
            </a>
          </div>
        </div>
      </div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#378ADD]/30 to-transparent z-10" />
      
      {/* Fallback button to scroll down in case user doesn't know there's more */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <button
          aria-label="Ver espaços de coworking"
          onClick={() => {
            const el = document.getElementById('espacos');
            if(el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md hover:bg-white hover:text-[#378ADD] transition-colors"
        >
          ↓
        </button>
      </div>
    </section>
  );
};

export default CoworkingHero;


