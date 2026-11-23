import { MessageCircle, FileText } from 'lucide-react';
import { trackWhatsAppClick } from '../../lib/whatsappAnalytics';

interface CoworkingStickyMobileCtaProps {
  whatsappUrl: string;
  whatsappLocation: string;
  onQuoteClick: () => void;
  quoteLabel?: string;
  accentColor?: string;
}

export default function CoworkingStickyMobileCta({
  whatsappUrl,
  whatsappLocation,
  onQuoteClick,
  quoteLabel = 'Pedir Cotação',
  accentColor = '#378ADD',
}: CoworkingStickyMobileCtaProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-2.5 bg-zinc-950/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-8px_30px_rgba(0,0,0,0.8)] flex items-center gap-2.5">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick({ location: whatsappLocation })}
        className="flex-1 py-3 px-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-black font-syne font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 active:scale-95 transition-all"
      >
        <MessageCircle size={17} className="text-black shrink-0" />
        WhatsApp
      </a>

      <button
        type="button"
        onClick={onQuoteClick}
        style={{ backgroundColor: accentColor }}
        className="flex-1 py-3 px-3 rounded-full text-white font-syne font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-all"
      >
        <FileText size={16} className="text-white shrink-0" />
        {quoteLabel}
      </button>
    </div>
  );
}
