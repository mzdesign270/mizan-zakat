import { useMemo } from 'react';
import type { ZakatResult } from '@/utils/zakatCalculations';
import { formatCurrency } from '@/utils/currencyFormatter';

interface Props {
  result: ZakatResult | null;
  currency: string;
}

const REACHED_VARIANTS = [
  'ماشاء الله، بلغت النصاب وزيادة!',
  'أحسنت، هذا مال مبارك تجاوز النصاب!',
  'تبارك الله، زكاتك واجبة الآن',
];

const BELOW_VARIANTS = [
  'المبلغ الحالي دون النصاب الشرعي',
  'لم تبلغ النصاب بعد، تابع التوفير',
  'مالك لم يبلغ النصاب للآن',
];

function pickRandom<T>(arr: T[], seed: number): T {
  return arr[Math.floor(seed * arr.length) % arr.length];
}

/**
 * Displays a warm, contextual message based on the Zakat calculation state.
 * Randomly selects one of three variants per state on each result change.
 */
export function MicroCopy({ result, currency }: Props) {
  const message = useMemo(() => {
    if (!result) return null;

    // Use zakatAmount as a seed to vary the message deterministically
    const seed = Math.abs(result.zakatAmount % 1);

    if (result.reachedNisab) {
      return { text: pickRandom(REACHED_VARIANTS, seed), type: 'success' as const };
    }

    const nearThreshold = result.nisabPercentage >= 80 && result.nisabPercentage < 100;

    if (nearThreshold) {
      const diff = formatCurrency(Math.abs(result.nisabDifference), currency);
      const nearVariants = [
        `أنت على بعد ${diff} فقط من بلوغ النصاب`,
        `قريب جداً! يتبقى ${diff} لتجب عليك الزكاة`,
        `على وشك بلوغ النصاب، تبقى ${diff}`,
      ];
      return { text: pickRandom(nearVariants, seed), type: 'near' as const };
    }

    return { text: pickRandom(BELOW_VARIANTS, seed), type: 'below' as const };
  }, [result, currency]);

  if (!message) return null;

  const styles = {
    success: 'text-[#0F5C4C] bg-[#0F5C4C]/8 border-[#0F5C4C]/20',
    near:    'text-[#B8860B] bg-[#B8860B]/8 border-[#B8860B]/20',
    below:   'text-[#6B6560] bg-[#E8E2D4]/60 border-[#E8E2D4]',
  };

  return (
    <p
      data-testid="micro-copy"
      className={`text-sm font-medium px-4 py-2 rounded-md border ${styles[message.type]} transition-all duration-300`}
    >
      {message.text}
    </p>
  );
}
