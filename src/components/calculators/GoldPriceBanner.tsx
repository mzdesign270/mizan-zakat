import { AlertTriangle, RefreshCw } from 'lucide-react';
import { formatCurrency } from '@/utils/currencyFormatter';

interface Props {
  isUsingFallback: boolean;
  goldPriceUSD: number;
  exchangeRate: number;
  currency: string;
  isLoading: boolean;
  /** Unix ms of last successful fetch — shown as relative time */
  lastUpdatedAt?: number;
}

function relativeTime(ts: number): string {
  const diffMin = Math.floor((Date.now() - ts) / 60_000);
  if (diffMin < 1)  return 'منذ لحظة';
  if (diffMin < 60) return `منذ ${diffMin} دقيقة`;
  const diffH = Math.floor(diffMin / 60);
  return `منذ ${diffH} ساعة`;
}

/**
 * Displays live gold price with last-update time, or a warning when using fallback.
 * Design unchanged — same border, same colours.
 */
export function GoldPriceBanner({
  isUsingFallback,
  goldPriceUSD,
  exchangeRate,
  currency,
  isLoading,
  lastUpdatedAt = 0,
}: Props) {
  const goldPriceLocal = goldPriceUSD * exchangeRate;

  if (isLoading) {
    return (
      <div className="w-full flex items-center gap-2 px-4 py-2.5 rounded-md border border-[#E8E2D4] bg-[#E8E2D4]/40 text-sm text-muted-foreground">
        <RefreshCw className="h-3.5 w-3.5 animate-spin shrink-0" aria-hidden="true" />
        جاري تحديث سعر الذهب...
      </div>
    );
  }

  if (isUsingFallback) {
    return (
      <div
        className="w-full flex items-start gap-2.5 px-4 py-3 rounded-md border border-[#B8860B]/30 bg-[#B8860B]/8 text-sm"
        role="alert"
        data-testid="gold-price-fallback-banner"
      >
        <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-[#B8860B]" aria-hidden="true" />
        <span className="text-[#B8860B]">
          سعر تقديري لحين تحديث البيانات — يتم التحديث كل ١٥ دقيقة تلقائياً
        </span>
      </div>
    );
  }

  return (
    <div
      className="w-full flex items-center justify-between px-4 py-2.5 rounded-md border border-[#E8E2D4] bg-[#FAF8F3] text-sm"
      data-testid="gold-price-live-banner"
    >
      <span className="text-muted-foreground flex items-center gap-2">
        سعر الذهب عيار 24
        {lastUpdatedAt > 0 && (
          <span className="text-xs text-muted-foreground/60" data-testid="gold-last-updated">
            ({relativeTime(lastUpdatedAt)})
          </span>
        )}
      </span>
      <span className="font-result font-medium text-[#0F5C4C]">
        {formatCurrency(goldPriceLocal, currency)} / جرام
      </span>
    </div>
  );
}
