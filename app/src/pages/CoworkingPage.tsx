import { useEffect } from 'react';
import useLenis from '../hooks/useLenis';
import { useLocation } from 'react-router-dom';
import TopNavigation from '../components/TopNavigation';
import CoworkingHero from '../sections/coworking-page/CoworkingHero';
import CoworkingFeatures from '../sections/coworking-page/CoworkingFeatures';
import CoworkingSpaces from '../sections/coworking-page/CoworkingSpaces';
import CoworkingQuoteForm from '../sections/coworking-page/CoworkingQuoteForm';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';

const CoworkingPage = () => {
  useLenis();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); 
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash, location.pathname]); 

  return (
    <div className="bg-void-black min-h-screen">
      <SEO
        title="Coworking em Itu | Vila Tech Hub"
        description="Coworking, salas de reunião e auditório em Itu. Opções por hora, período, diária, pacote de horas, mês, semestre ou ano. Solicite uma cotação."
      />
      
      <TopNavigation variant="coworking" />

      <main>
        <CoworkingHero />
        <CoworkingFeatures />
        <CoworkingSpaces />

        <CoworkingQuoteForm />
      </main>

      <Footer />
    </div>
  );
};

export default CoworkingPage;
