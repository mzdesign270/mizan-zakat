import { useEffect } from 'react';

interface Props {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogType?: string;
}

const BASE_URL = 'https://mizan-zakat.com';

/**
 * Updates document head meta tags for SEO on each page mount.
 * Must be rendered inside the page component that needs the meta data.
 */
export function PageMeta({
  title,
  description,
  keywords,
  canonicalPath = '/',
  ogType = 'website',
}: Props) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', ogType, true);
    setMeta('og:url', `${BASE_URL}${canonicalPath}`, true);
    setMeta('twitter:title', title, true);
    setMeta('twitter:description', description, true);
    setLink('canonical', `${BASE_URL}${canonicalPath}`);
  }, [title, description, keywords, canonicalPath, ogType]);

  return null;
}
