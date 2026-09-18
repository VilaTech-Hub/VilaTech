import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import SEO from '../components/SEO';
import TopNavigation from '../components/TopNavigation';
import Footer from '../sections/Footer';

export default function DonationSuccessPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo(
      '.success-content',
      { opacity: 0, scale: 0.9, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' }
    );
  }, []);

  return (
    <div className="bg-[#f4f4f4] min-h-screen font-sans selection:bg-brand-teal selection:text-white flex flex-col">
      <SEO title="Doação Confirmada | Instituto Vila Tech" description="Obrigado por sua contribuição ao Instituto Vila Tech." />
      <TopNavigation />

      <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-10 bg-[url('/images/instituto/grafismos/grafis5.svg')] bg-repeat pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-teal rounded-full blur-[150px] opacity-20 pointer-events-none" />
        
        <div className="bg-white rounded-3xl p-8 md:p-16 shadow-2xl border border-gray-100 max-w-2xl w-full text-center relative z-10 success-content">
          <div className="w-20 h-20 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-8 text-brand-teal">
            <Heart className="w-10 h-10 fill-current animate-pulse" />
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black uppercase text-[#1d1d1b] mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Obrigado pela<br />sua doação!
          </h1>
          
          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-lg mx-auto">
            Sua contribuição fará uma diferença real na vida de jovens talentos de Itu. Graças a você, estamos um passo mais perto de construir um futuro impulsionado pela educação e tecnologia.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-teal text-white font-bold rounded-xl uppercase tracking-wider text-sm hover:bg-[#023B33] transition-colors">
              Voltar para Home
            </Link>
            <Link to="/projetos" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-brand-teal text-brand-teal font-bold rounded-xl uppercase tracking-wider text-sm hover:bg-brand-teal/5 transition-colors">
              Conheça nossos Projetos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
