import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { gsap } from 'gsap';
import SEO from '../components/SEO';
import TopNavigation from '../components/TopNavigation';
import Footer from '../sections/Footer';

export default function DonationCancelPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo(
      '.cancel-content',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="bg-[#f4f4f4] min-h-screen font-sans selection:bg-brand-orange selection:text-white flex flex-col">
      <SEO title="Doação Cancelada | Instituto Vila Tech" description="Sua doação não foi concluída." />
      <TopNavigation />

      <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="bg-white rounded-3xl p-8 md:p-16 shadow-2xl border border-gray-100 max-w-2xl w-full text-center relative z-10 cancel-content">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-500">
            <AlertCircle className="w-10 h-10" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black uppercase text-[#1d1d1b] mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            A doação não foi concluída
          </h1>
          
          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-lg mx-auto">
            Nenhuma cobrança foi realizada no seu cartão. Se você encontrou algum problema técnico ou tem alguma dúvida sobre o processo, entre em contato conosco. Adoraríamos ter o seu apoio!
          </p>

          <div className="flex justify-center">
            <Link to="/doar" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-teal text-white font-bold rounded-xl uppercase tracking-wider text-sm hover:bg-[#023B33] transition-colors">
              <ArrowLeft className="w-4 h-4" /> Tentar Novamente
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
