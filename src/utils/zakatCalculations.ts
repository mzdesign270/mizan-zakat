/**
 * Pure Zakat calculation functions.
 * All functions are side-effect-free and accept primitive inputs only.
 */

export const NISAB_GOLD_GRAMS = 85;    // grams of 24k gold
export const NISAB_SILVER_GRAMS = 595; // grams of silver
export const ZAKAT_RATE = 0.025;       // 2.5%

export const GOLD_PURITY: Record<number, number> = {
  24: 1.0,
  22: 0.9167,
  21: 0.875,
  18: 0.75,
};

export interface CalculationStep {
  label: string;
  value: string;
}

export interface ZakatResult {
  nisabAmount: number;       // threshold in local currency
  totalAssets: number;       // net zakatable assets
  zakatAmount: number;       // 0 if below nisab
  reachedNisab: boolean;
  nisabDifference: number;   // positive = above, negative = below
  nisabPercentage: number;   // 0–200+
  steps: CalculationStep[];
}

function buildResult(
  nisabAmount: number,
  totalAssets: number,
  steps: CalculationStep[],
): ZakatResult {
  const reachedNisab = totalAssets >= nisabAmount && nisabAmount > 0;
  const zakatAmount = reachedNisab ? totalAssets * ZAKAT_RATE : 0;
  const nisabDifference = totalAssets - nisabAmount;
  const nisabPercentage = nisabAmount > 0 ? (totalAssets / nisabAmount) * 100 : 0;

  return {
    nisabAmount,
    totalAssets,
    zakatAmount,
    reachedNisab,
    nisabDifference,
    nisabPercentage,
    steps,
  };
}

/**
 * Calculate gold and silver Zakat.
 * @param goldGrams     weight of gold owned
 * @param karat         gold karat (24/22/21/18)
 * @param silverGrams   weight of silver owned
 * @param goldPriceUSD  price per gram for 24k gold in USD
 * @param silverPriceUSD price per gram for silver in USD
 * @param usdToLocal    USD → local currency exchange rate
 */
export function calculateGoldZakat(
  goldGrams: number,
  karat: 24 | 22 | 21 | 18,
  silverGrams: number,
  goldPriceUSD: number,
  silverPriceUSD: number,
  usdToLocal: number,
): ZakatResult {
  const purity = GOLD_PURITY[karat] ?? 1;
  const goldPriceLocal = goldPriceUSD * usdToLocal;
  const silverPriceLocal = silverPriceUSD * usdToLocal;

  const goldValue = goldGrams * purity * goldPriceLocal;
  const silverValue = silverGrams * silverPriceLocal;
  const totalAssets = goldValue + silverValue;

  const nisabGoldLocal = NISAB_GOLD_GRAMS * goldPriceLocal;

  const steps: CalculationStep[] = [
    { label: 'سعر الذهب عيار 24', value: `${goldPriceLocal.toFixed(2)} / جرام` },
    { label: `الذهب (${karat} قيراط × ${goldGrams}ج)`, value: goldValue.toFixed(2) },
    ...(silverGrams > 0
      ? [{ label: `الفضة (${silverGrams}ج)`, value: silverValue.toFixed(2) }]
      : []),
    { label: 'إجمالي المال الزكوي', value: totalAssets.toFixed(2) },
    { label: 'نصاب الذهب (85 جرام)', value: nisabGoldLocal.toFixed(2) },
    ...(totalAssets >= nisabGoldLocal
      ? [{ label: 'الزكاة الواجبة (2.5%)', value: (totalAssets * ZAKAT_RATE).toFixed(2) }]
      : []),
  ];

  return buildResult(nisabGoldLocal, totalAssets, steps);
}

/**
 * Calculate Zakat on cash and savings.
 * @param savings       total saved cash
 * @param receivables   money owed to you
 * @param debts         money you owe others
 * @param goldNisabLocal nisab threshold in local currency
 */
export function calculateCashZakat(
  savings: number,
  receivables: number,
  debts: number,
  goldNisabLocal: number,
): ZakatResult {
  const net = Math.max(0, savings + receivables - debts);

  const steps: CalculationStep[] = [
    { label: 'المدخرات والنقد', value: savings.toFixed(2) },
    { label: 'الديون لصالحك', value: `+ ${receivables.toFixed(2)}` },
    { label: 'الديون عليك', value: `- ${debts.toFixed(2)}` },
    { label: 'الصافي الزكوي', value: net.toFixed(2) },
    { label: 'النصاب الشرعي', value: goldNisabLocal.toFixed(2) },
    ...(net >= goldNisabLocal
      ? [{ label: 'الزكاة الواجبة (2.5%)', value: (net * ZAKAT_RATE).toFixed(2) }]
      : []),
  ];

  return buildResult(goldNisabLocal, net, steps);
}

/**
 * Calculate Zakat on stocks.
 * @param marketValue     current market value of portfolio
 * @param type            'trading' | 'investment'
 * @param dividends       dividends received (for investment type)
 * @param netAssetValue   NAV per share × shares (for investment type)
 * @param goldNisabLocal  nisab in local currency
 */
export function calculateStocksZakat(
  marketValue: number,
  type: 'trading' | 'investment',
  dividends: number,
  netAssetValue: number,
  goldNisabLocal: number,
): ZakatResult {
  let zakatBase: number;
  let steps: CalculationStep[];

  if (type === 'trading') {
    zakatBase = marketValue;
    steps = [
      { label: 'القيمة السوقية الكاملة', value: marketValue.toFixed(2) },
      { label: 'النصاب الشرعي', value: goldNisabLocal.toFixed(2) },
      ...(marketValue >= goldNisabLocal
        ? [{ label: 'الزكاة (2.5% من القيمة)', value: (marketValue * ZAKAT_RATE).toFixed(2) }]
        : []),
    ];
  } else {
    zakatBase = Math.max(dividends, netAssetValue);
    steps = [
      { label: 'الأرباح الموزعة', value: dividends.toFixed(2) },
      { label: 'صافي أصول الشركة (نصيبك)', value: netAssetValue.toFixed(2) },
      { label: 'الوعاء الزكوي', value: zakatBase.toFixed(2) },
      { label: 'النصاب الشرعي', value: goldNisabLocal.toFixed(2) },
      ...(zakatBase >= goldNisabLocal
        ? [{ label: 'الزكاة (2.5%)', value: (zakatBase * ZAKAT_RATE).toFixed(2) }]
        : []),
    ];
  }

  return buildResult(goldNisabLocal, zakatBase, steps);
}

/**
 * Calculate Zakat on saved salary across a Hijri year.
 * @param monthlySavings array of 12 monthly savings amounts
 * @param goldNisabLocal  nisab in local currency
 */
export function calculateSalaryZakat(
  monthlySavings: number[],
  goldNisabLocal: number,
): ZakatResult {
  const totalSaved = monthlySavings.reduce((sum, v) => sum + (v || 0), 0);

  const steps: CalculationStep[] = [
    ...monthlySavings
      .map((v, i) => ({ label: `الشهر ${i + 1}`, value: (v || 0).toFixed(2) }))
      .filter((s) => parseFloat(s.value) > 0),
    { label: 'إجمالي المدخرات السنوية', value: totalSaved.toFixed(2) },
    { label: 'النصاب الشرعي', value: goldNisabLocal.toFixed(2) },
    ...(totalSaved >= goldNisabLocal
      ? [{ label: 'الزكاة الواجبة (2.5%)', value: (totalSaved * ZAKAT_RATE).toFixed(2) }]
      : []),
  ];

  return buildResult(goldNisabLocal, totalSaved, steps);
}
