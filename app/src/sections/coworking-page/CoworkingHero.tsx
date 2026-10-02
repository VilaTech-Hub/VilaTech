import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CoworkingHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title fade + slide up
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      // Subtitle fade + slide up
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
      );

      // CTA buttons fade + slide up
      gsap.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.6 }
      );

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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="sticky top-0 w-full h-screen overflow-hidden bg-void-black z-0"
    >
      {/* Background container */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-void-black">
        {/* Local Video Background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <video
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115vw] h-[115vh] min-w-[177.77vh] min-h-[56.25vw] object-cover scale-110 opacity-90"
            src="/images/coworking/FILME_APRE_V06.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-void-black/80 via-void-black/20 to-void-black/60" />
        <div className="absolute inset-0 bg-[#0a0a0a]/20" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full pt-16 pb-12 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="mb-6">
          <span className="px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white text-xs font-syne uppercase tracking-[0.2em]">Vila Tech Hub</span>
        </div>
        
        {/* Main title */}
        <div className="w-full flex items-center justify-center mb-8">
          <h1
            ref={titleRef}
            className="font-syne font-bold text-white leading-tight tracking-tight text-center text-5xl md:text-6xl lg:text-7xl"
          >
            Onde as ideias trabalham, <br/>
            <span className="text-[#378ADD]">pessoas se conectam</span><br/>
            e negócios prosperam.
          </h1>
        </div>

        {/* Subtitle */}
        <div className="flex flex-col items-center mb-12 text-center">
          <p
            ref={subtitleRef}
            className="font-sans text-lg md:text-xl text-gray-300 font-light mb-4 max-w-2xl leading-relaxed drop-shadow-lg"
          >
            Um ecossistema completo com postos de trabalho, salas de reunião, auditório e estúdio de podcast.
          </p>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => scrollToSection('espacos')}
            className="px-10 py-4 bg-[#378ADD] text-white font-syne font-bold text-sm uppercase tracking-widest rounded-full hover:bg-white hover:text-[#378ADD] transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Conhecer Espaços
          </button>
          <button
            onClick={() => scrollToSection('cotacao')}
            className="px-10 py-4 border border-white/30 text-white font-syne font-bold text-sm uppercase tracking-widest rounded-full hover:border-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
          >
            Fazer Cotação
          </button>
        </div>
      </div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-teal/30 to-transparent" />
    </section>
  );
};

export default CoworkingHero;


