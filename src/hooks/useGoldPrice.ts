import { useState, useEffect, useCallback } from 'react';

const GOLD_PRICE_KEY = 'mizan_gold_usd';
const SILVER_PRICE_KEY = 'mizan_silver_usd';
const PRICES_TS_KEY = 'mizan_prices_ts';
const TTL_MS = 3_600_000;        // 1 hour for localStorage cache
const POLL_MS = 15 * 60 * 1000; // 15 minutes background refresh

/** Fallback prices when API is unavailable (USD per gram). */
const FALLBACK_GOLD_USD = 95;
const FALLBACK_SILVER_USD = 1.05;

interface GoldPriceState {
  goldPerGram: number;
  silverPerGram: number;
  isLoading: boolean;
  error: string | null;
  isUsingFallback: boolean;
  /** Unix ms timestamp of the last successful fetch (0 = never). */
  lastUpdatedAt: number;
}

function loadFromCache(): { gold: number; silver: number } | null {
  try {
    const ts = localStorage.getItem(PRICES_TS_KEY);
    if (!ts) return null;
    if (Date.now() - Number(ts) > TTL_MS) return null;
    const gold = parseFloat(localStorage.getItem(GOLD_PRICE_KEY) ?? '');
    const silver = parseFloat(localStorage.getItem(SILVER_PRICE_KEY) ?? '');
    if (!isFinite(gold) || !isFinite(silver)) return null;
    return { gold, silver };
  } catch {
    return null;
  }
}

function saveToCache(gold: number, silver: number): void {
  try {
    localStorage.setItem(GOLD_PRICE_KEY, String(gold));
    localStorage.setItem(SILVER_PRICE_KEY, String(silver));
    localStorage.setItem(PRICES_TS_KEY, String(Date.now()));
  } catch {
    // localStorage may be unavailable in some environments
  }
}

export function useGoldPrice(): GoldPriceState {
  const [state, setState] = useState<GoldPriceState>(() => {
    const cached = loadFromCache();
    if (cached) {
      const ts = Number(localStorage.getItem(PRICES_TS_KEY) ?? 0);
      return {
        goldPerGram: cached.gold,
        silverPerGram: cached.silver,
        isLoading: false,
        error: null,
        isUsingFallback: false,
        lastUpdatedAt: ts,
      };
    }
    return {
      goldPerGram: FALLBACK_GOLD_USD,
      silverPerGram: FALLBACK_SILVER_USD,
      isLoading: true,
      error: null,
      isUsingFallback: false,
      lastUpdatedAt: 0,
    };
  });

  const fetchPrices = useCallback(async (silent = false) => {
    if (!silent) {
      setState((prev) => ({ ...prev, isLoading: true }));
    }
    try {
      const [goldRes, silverRes] = await Promise.all([
        fetch('https://api.gold-api.com/price/XAU'),
        fetch('https://api.gold-api.com/price/XAG'),
      ]);

      if (!goldRes.ok || !silverRes.ok) throw new Error('API error');

      const goldData  = await goldRes.json()   as { price?: number };
      const silverData = await silverRes.json() as { price?: number };

      // API returns price per troy ounce; convert to per gram (1 troy oz = 31.1035 g)
      const goldPerGram   = (goldData.price   ?? 0) / 31.1035;
      const silverPerGram = (silverData.price ?? 0) / 31.1035;

      if (goldPerGram > 0 && silverPerGram > 0) {
        const now = Date.now();
        saveToCache(goldPerGram, silverPerGram);
        setState({
          goldPerGram,
          silverPerGram,
          isLoading: false,
          error: null,
          isUsingFallback: false,
          lastUpdatedAt: now,
        });
      } else {
        throw new Error('Invalid price data');
      }
    } catch {
      setState((prev) => ({
        ...prev,
        goldPerGram: prev.isUsingFallback ? FALLBACK_GOLD_USD : prev.goldPerGram,
        silverPerGram: prev.isUsingFallback ? FALLBACK_SILVER_USD : prev.silverPerGram,
        isLoading: false,
        error: 'فشل تحديث السعر',
        isUsingFallback: true,
      }));
    }
  }, []);

  useEffect(() => {
    // Fetch immediately if nothing in cache
    if (!loadFromCache()) {
      fetchPrices(false);
    }

    // Background poll every 15 minutes (silent — no loading spinner)
    const timer = setInterval(() => fetchPrices(true), POLL_MS);
    return () => clearInterval(timer);
  }, [fetchPrices]);

  return state;
}
