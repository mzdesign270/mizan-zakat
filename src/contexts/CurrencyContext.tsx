import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';
import { CURRENCIES, FIXED_PEG_RATES, getCurrencyInfo, type CurrencyInfo } from '@/utils/currencyFormatter';
import { useGoldPrice } from '@/hooks/useGoldPrice';
import { useExchangeRates, getRateForCurrency } from '@/hooks/useExchangeRates';
import { NISAB_GOLD_GRAMS } from '@/utils/zakatCalculations';

const STORAGE_KEY = 'mizan_currency';

interface CurrencyContextValue {
  currency: string;
  setCurrency: (code: string) => void;
  currencies: CurrencyInfo[];
  currencyInfo: CurrencyInfo;
  /** USD per gram, 24k */
  goldPriceUSD: number;
  /** USD per gram */
  silverPriceUSD: number;
  /** USD → local currency multiplier */
  exchangeRate: number;
  /** nisab threshold in local currency */
  goldNisabLocal: number;
  isGoldLoading: boolean;
  goldError: string | null;
  isUsingFallback: boolean;
  /** Unix ms of last successful gold price fetch */
  goldLastUpdatedAt: number;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function loadSavedCurrency(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && CURRENCIES.some((c) => c.code === saved)) return saved;
  } catch {}
  return 'SAR';
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<string>(loadSavedCurrency);

  const { goldPerGram, silverPerGram, isLoading: isGoldLoading, error: goldError, isUsingFallback: goldFallback, lastUpdatedAt: goldLastUpdatedAt } =
    useGoldPrice();

  const { rates, isUsingFallback: ratesFallback } = useExchangeRates(currency);

  const exchangeRate = useMemo(() => {
    if (currency in FIXED_PEG_RATES) return FIXED_PEG_RATES[currency];
    return getRateForCurrency(currency, rates);
  }, [currency, rates]);

  const goldNisabLocal = useMemo(
    () => NISAB_GOLD_GRAMS * goldPerGram * exchangeRate,
    [goldPerGram, exchangeRate],
  );

  const setCurrency = (code: string) => {
    if (!CURRENCIES.some((c) => c.code === code)) return;
    try { localStorage.setItem(STORAGE_KEY, code); } catch {}
    setCurrencyState(code);
  };

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrency,
      currencies: CURRENCIES,
      currencyInfo: getCurrencyInfo(currency),
      goldPriceUSD: goldPerGram,
      silverPriceUSD: silverPerGram,
      exchangeRate,
      goldNisabLocal,
      isGoldLoading,
      goldError,
      isUsingFallback: goldFallback || ratesFallback,
      goldLastUpdatedAt,
    }),
    [currency, goldPerGram, silverPerGram, exchangeRate, goldNisabLocal, isGoldLoading, goldError, goldFallback, ratesFallback, goldLastUpdatedAt],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
}
