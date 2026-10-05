import { useEffect } from 'react';
import useLenis from '../hooks/useLenis';
import { useLocation } from 'react-router-dom';
import TopNavigation from '../components/TopNavigation';
import CoworkingHero from '../sections/coworking-page/CoworkingHero';
import CoworkingFeatures from '../sections/coworking-page/CoworkingFeatures';
import CoworkingSpaces from '../sections/coworking-page/CoworkingSpaces';
import CoworkingQuoteForm from '../sections/coworking-page/CoworkingQuoteForm';
import ParallaxGallery from '../sections/ParallaxGallery';
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
        description="Espaço de coworking de alto padrão em Itu, SP. Aluguel de salas de reunião, postos individuais de trabalho, escritório virtual e endereço fiscal."
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
