interface Props {
  percentage: number;
  label?: string;
}

/**
 * A progress bar that shows how close assets are to reaching the nisab threshold.
 */
export function NisabProgress({ percentage, label }: Props) {
  const clamped = Math.min(Math.max(percentage, 0), 100);
  const reached = percentage >= 100;

  return (
    <div className="w-full space-y-1.5" data-testid="nisab-progress">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{label ?? 'النسبة من النصاب'}</span>
        <span
          className={`font-result font-medium ${reached ? 'text-[#0F5C4C]' : 'text-[#B8860B]'}`}
        >
          {Math.round(percentage)}٪
        </span>
      </div>

      <div
        className="h-2 w-full rounded-full bg-[#E8E2D4] overflow-hidden"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            reached ? 'bg-[#0F5C4C]' : 'bg-[#B8860B]'
          }`}
          style={{ width: `${clamped}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>صفر</span>
        <span className="text-[#0F5C4C] font-medium">النصاب</span>
      </div>
    </div>
  );
}
