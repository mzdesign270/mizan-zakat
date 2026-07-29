import { useMemo } from 'react';

interface Props {
  nisabPercentage: number;
  ambient?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const SIZES = {
  sm: { beam: 'w-24 h-0.5', post: 'h-6 w-0.5', dot: 'w-2 h-2', wrapper: 'h-16' },
  md: { beam: 'w-36 h-0.5', post: 'h-8 w-0.5', dot: 'w-3 h-3', wrapper: 'h-24' },
  lg: { beam: 'w-48 h-0.5', post: 'h-10 w-0.5', dot: 'w-4 h-4', wrapper: 'h-32' },
};

/**
 * Signature visual element — the Balance Indicator.
 * Rotates based on how close/far the asset is from the nisab threshold.
 */
export function BalanceIndicator({ nisabPercentage, ambient = false, size = 'md' }: Props) {
  const rotation = useMemo(() => {
    if (ambient) return 0;
    const ratio = (nisabPercentage - 100) / 100;
    return Math.max(-25, Math.min(25, ratio * 25));
  }, [nisabPercentage, ambient]);

  const reached = nisabPercentage >= 100;
  const s = SIZES[size];

  return (
    <div
      className={`flex flex-col items-center justify-center ${s.wrapper}`}
      aria-label={`مؤشر الميزان: ${Math.round(nisabPercentage)}٪ من النصاب`}
      role="img"
    >
      {/* Beam container */}
      <div
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: ambient
            ? undefined
            : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        className={ambient ? 'animate-ambient' : undefined}
      >
        <div className="relative flex items-center">
          {/* Left dot */}
          <div
            className={`rounded-full ${s.dot} ${reached ? 'bg-[#0F5C4C]' : 'bg-[#6B6560]'}`}
          />
          {/* Beam */}
          <div
            className={`${s.beam} ${reached ? 'bg-[#0F5C4C]' : 'bg-[#6B6560]'}`}
          />
          {/* Right dot */}
          <div
            className={`rounded-full ${s.dot} ${reached ? 'bg-[#0F5C4C]' : 'bg-[#6B6560]'}`}
          />
        </div>
      </div>

      {/* Vertical post */}
      <div className={`${s.post} ${reached ? 'bg-[#0F5C4C]' : 'bg-[#6B6560]'} mt-0`} />

      {/* Base */}
      <div
        className={`w-10 h-0.5 rounded-full ${reached ? 'bg-[#0F5C4C]' : 'bg-[#6B6560]'}`}
      />
    </div>
  );
}
