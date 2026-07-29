/**
 * Formats a number as a localized Arabic currency string.
 */

export interface CurrencyInfo {
  code: string;
  nameAr: string;
  symbol: string;
  locale: string;
  decimals: number;
}

export const CURRENCIES: CurrencyInfo[] = [
  { code: 'SAR', nameAr: 'ريال سعودي',    symbol: 'ر.س',  locale: 'ar-SA', decimals: 2 },
  { code: 'AED', nameAr: 'درهم إماراتي',  symbol: 'د.إ',  locale: 'ar-AE', decimals: 2 },
  { code: 'QAR', nameAr: 'ريال قطري',     symbol: 'ر.ق',  locale: 'ar-QA', decimals: 2 },
  { code: 'BHD', nameAr: 'دينار بحريني',  symbol: 'د.ب',  locale: 'ar-BH', decimals: 3 },
  { code: 'OMR', nameAr: 'ريال عُماني',   symbol: 'ر.ع',  locale: 'ar-OM', decimals: 3 },
  { code: 'EGP', nameAr: 'جنيه مصري',     symbol: 'ج.م',  locale: 'ar-EG', decimals: 2 },
  { code: 'JOD', nameAr: 'دينار أردني',   symbol: 'د.أ',  locale: 'ar-JO', decimals: 3 },
  { code: 'KWD', nameAr: 'دينار كويتي',   symbol: 'د.ك',  locale: 'ar-KW', decimals: 3 },
  { code: 'MAD', nameAr: 'درهم مغربي',    symbol: 'د.م',  locale: 'ar-MA', decimals: 2 },
  { code: 'LBP', nameAr: 'ليرة لبنانية',  symbol: 'ل.ل',  locale: 'ar-LB', decimals: 0 },
  { code: 'IQD', nameAr: 'دينار عراقي',   symbol: 'د.ع',  locale: 'ar-IQ', decimals: 0 },
];

/** Fixed USD peg rates for GCC currencies. */
export const FIXED_PEG_RATES: Record<string, number> = {
  SAR: 3.75,
  AED: 3.67,
  QAR: 3.64,
  BHD: 0.376,
  OMR: 0.385,
};

/** Fallback exchange rates for floating currencies (USD-based). */
export const FALLBACK_FLOAT_RATES: Record<string, number> = {
  EGP: 30.9,
  JOD: 0.709,
  KWD: 0.307,
  MAD: 10.0,
  LBP: 89500,
  IQD: 1310,
};

export function getCurrencyInfo(code: string): CurrencyInfo {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
}

export function formatCurrency(value: number, currencyCode: string): string {
  const info = getCurrencyInfo(currencyCode);
  const formatted = value.toLocaleString('ar', {
    minimumFractionDigits: info.decimals,
    maximumFractionDigits: info.decimals,
  });
  return `${formatted} ${info.symbol}`;
}

export function formatNumber(value: number, decimals = 2): string {
  return value.toLocaleString('ar', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function isFloatingCurrency(code: string): boolean {
  return !(code in FIXED_PEG_RATES);
}
