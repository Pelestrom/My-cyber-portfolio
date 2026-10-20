import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

export type Route = 'home' | 'certifications';

function currentRoute(): Route {
  return typeof window !== 'undefined' && window.location.hash === '#/certifications'
    ? 'certifications'
    : 'home';
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(currentRoute);
  const current = useRef(route);

  useEffect(() => {
    const updateRoute = () => {
      const next = currentRoute();
      if (next === current.current) return;
      current.current = next;

      const update = () => flushSync(() => setRoute(next));
      const doc = document as Document & {
        startViewTransition?: (callback: () => void) => unknown;
      };
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const lite = document.documentElement.dataset.performanceMode === 'lite';

      if (!reduced && !lite && doc.startViewTransition) {
        doc.startViewTransition(update);
      } else {
        setRoute(next);
      }
    };
    window.addEventListener('hashchange', updateRoute);
    return () => window.removeEventListener('hashchange', updateRoute);
  }, []);

  return route;
}
