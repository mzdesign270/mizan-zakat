import { useState, useEffect, useRef } from 'react';

/**
 * Animates a number from 0 (or previous value) to the target over `duration` ms.
 * Uses requestAnimationFrame with ease-out easing.
 */
export function useCountUp(targetValue: number, duration = 500): number {
  const [current, setCurrent] = useState(targetValue);
  const prevRef = useRef(targetValue);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (targetValue === prevRef.current) return;

    const startValue = prevRef.current;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(startValue + (targetValue - startValue) * eased);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCurrent(targetValue);
        prevRef.current = targetValue;
      }
    };

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [targetValue, duration]);

  return current;
}
