import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

/**
 * Floating scroll-to-top button — appears after scrolling 300px,
 * styled with the brand emerald colour. No design changes elsewhere.
 */
export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="
        fixed bottom-6 left-6 z-50
        flex items-center justify-center
        w-11 h-11 rounded-full
        bg-[#0F5C4C] text-white shadow-md
        hover:bg-[#0d5244] active:scale-95
        transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5C4C]/50
      "
      aria-label="العودة إلى أعلى الصفحة"
      data-testid="scroll-to-top"
    >
      <ChevronUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
