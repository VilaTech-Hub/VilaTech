import { useEffect } from 'react';
import { canonicalUrl } from '../lib/seo-url';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
}

export const SEO = ({ 
  title, 
  description, 
  url = window.location.href, 
  image = 'https://www.vilatechub.com.br/images/logo-vila-tech-preview.png', 
  type = 'website' 
}: SEOProps) => {
  useEffect(() => {
    document.title = title;
    
    // Update or create meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', description);
    
    // Open Graph
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    const cleanUrl = canonicalUrl(url);
    updateMeta('og:url', cleanUrl, true);
    updateMeta('og:image', image, true);
    updateMeta('og:type', type, true);
    
    // Twitter Card
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

    // Canonical Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    
    // Assegurar que a URL canônica use sempre o domínio principal para evitar duplicidade
    canonical.setAttribute('href', cleanUrl);

  }, [title, description, url, image, type]);

  return null;
};

export default SEO;
