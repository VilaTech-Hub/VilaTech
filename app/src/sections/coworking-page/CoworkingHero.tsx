import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CoworkingHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

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
      className="sticky top-0 w-full h-screen overflow-hidden bg-void-black z-0"
    >
      {/* Background container */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-void-black">
        {/* Local Video Background (Placeholder for external URL) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <video
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115vw] h-[115vh] min-w-[177.77vh] min-h-[56.25vw] object-cover scale-110 opacity-100"
            src="https://4ljrmv3n2znlokpa.public.blob.vercel-storage.com/FILME_APRE_V06.mp4" 
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* Cinematic Gradient Overlays (sutil apenas para o topo e base) */}
        <div className="absolute inset-0 bg-gradient-to-b from-void-black/80 via-transparent to-void-black/40" />
      </div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#378ADD]/30 to-transparent z-10" />
      
      {/* Fallback button to scroll down in case user doesn't know there's more */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <button 
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


