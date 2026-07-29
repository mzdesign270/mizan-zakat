import { useState, useEffect } from 'react';
import { FALLBACK_FLOAT_RATES, FIXED_PEG_RATES, isFloatingCurrency } from '@/utils/currencyFormatter';

const RATES_KEY = 'mizan_exchange_rates';
const RATES_TS_KEY = 'mizan_exchange_ts';
const TTL_MS = 3_600_000; // 1 hour

interface ExchangeRateState {
  rates: Record<string, number>;
  isLoading: boolean;
  error: string | null;
  isUsingFallback: boolean;
}

function loadFromCache(): Record<string, number> | null {
  try {
    const ts = localStorage.getItem(RATES_TS_KEY);
    if (!ts) return null;
    if (Date.now() - Number(ts) > TTL_MS) return null;
    const raw = localStorage.getItem(RATES_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Record<string, number>;
  } catch {
    return null;
  }
}

function saveToCache(rates: Record<string, number>): void {
  try {
    localStorage.setItem(RATES_KEY, JSON.stringify(rates));
    localStorage.setItem(RATES_TS_KEY, String(Date.now()));
  } catch {}
}

/** Returns the USD→local exchange rate for a given currency code. */
export function getRateForCurrency(
  code: string,
  fetchedRates: Record<string, number>,
): number {
  if (code in FIXED_PEG_RATES) return FIXED_PEG_RATES[code];
  return fetchedRates[code] ?? FALLBACK_FLOAT_RATES[code] ?? 1;
}

export function useExchangeRates(selectedCurrency: string): ExchangeRateState {
  const [state, setState] = useState<ExchangeRateState>(() => {
    const cached = loadFromCache();
    if (cached) {
      return { rates: cached, isLoading: false, error: null, isUsingFallback: false };
    }
    return {
      rates: { ...FALLBACK_FLOAT_RATES },
      isLoading: isFloatingCurrency(selectedCurrency),
      error: null,
      isUsingFallback: false,
    };
  });

  useEffect(() => {
    if (!isFloatingCurrency(selectedCurrency)) return; // GCC — no fetch needed
    if (loadFromCache()) return;

    const fetchRates = async () => {
      try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        if (!res.ok) throw new Error('API error');
        const data = await res.json() as { rates?: Record<string, number> };
        if (!data.rates) throw new Error('Invalid response');

        const filtered: Record<string, number> = {};
        Object.keys(FALLBACK_FLOAT_RATES).forEach((code) => {
          filtered[code] = data.rates![code] ?? FALLBACK_FLOAT_RATES[code];
        });

        saveToCache(filtered);
        setState({ rates: filtered, isLoading: false, error: null, isUsingFallback: false });
      } catch {
        setState({
          rates: { ...FALLBACK_FLOAT_RATES },
          isLoading: false,
          error: 'فشل تحديث أسعار الصرف',
          isUsingFallback: true,
        });
      }
    };

    fetchRates();
  }, [selectedCurrency]);

  return state;
}
