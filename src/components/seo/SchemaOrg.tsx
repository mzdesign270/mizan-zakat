import { useEffect } from 'react';

interface Props {
  schema: Record<string, unknown>;
  id: string;
}

/**
 * Injects a JSON-LD schema script tag into the document head.
 * Cleaned up on unmount to prevent duplicate schemas.
 */
export function SchemaOrg({ schema, id }: Props) {
  useEffect(() => {
    const scriptId = `schema-${id}`;
    let el = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!el) {
      el = document.createElement('script');
      el.id = scriptId;
      el.type = 'application/ld+json';
      document.head.appendChild(el);
    }

    el.textContent = JSON.stringify(schema);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [schema, id]);

  return null;
}
