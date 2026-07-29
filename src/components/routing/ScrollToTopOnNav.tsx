import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Scrolls the window to the top whenever the route changes.
 * Renders nothing — pure side-effect component.
 */
export function ScrollToTopOnNav() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location]);

  return null;
}
