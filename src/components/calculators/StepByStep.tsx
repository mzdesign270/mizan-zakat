import type { CalculationStep } from '@/utils/zakatCalculations';

interface Props {
  steps: CalculationStep[];
  currency: string;
}

/**
 * Renders the step-by-step breakdown of a Zakat calculation.
 */
export function StepByStep({ steps, currency }: Props) {
  if (steps.length === 0) return null;

  return (
    <div className="w-full space-y-1" data-testid="step-by-step">
      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
        تفصيل الحساب
      </h3>
      <div className="rounded-md border border-[#E8E2D4] divide-y divide-[#E8E2D4] overflow-hidden">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-3 py-2 bg-white/50 text-sm"
          >
            <span className="text-muted-foreground">{step.label}</span>
            <span className="font-result text-[#1C1B19] font-medium" dir="ltr">
              {step.value} {currency}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
