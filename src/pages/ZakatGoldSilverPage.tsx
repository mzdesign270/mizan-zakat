import { useState, useEffect, useRef } from 'react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useCountUp } from '@/hooks/useCountUp';
import { calculateGoldZakat, type ZakatResult } from '@/utils/zakatCalculations';
import { formatCurrency } from '@/utils/currencyFormatter';
import { BalanceIndicator } from '@/components/calculators/BalanceIndicator';
import { MicroCopy } from '@/components/calculators/MicroCopy';
import { GoldPriceBanner } from '@/components/calculators/GoldPriceBanner';
import { StepByStep } from '@/components/calculators/StepByStep';
import { NisabProgress } from '@/components/calculators/NisabProgress';
import { PageMeta } from '@/components/seo/PageMeta';
import { SchemaOrg } from '@/components/seo/SchemaOrg';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const KARATS = [24, 22, 21, 18] as const;

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'حاسبة زكاة الذهب والفضة',
  url: 'https://mizan-zakat.com/zakat-gold-silver',
  applicationCategory: 'FinanceApplication',
  description: 'احسب زكاة الذهب والفضة بالعملة العربية التي تختارها',
};

export default function ZakatGoldSilverPage() {
  const { currency, goldPriceUSD, silverPriceUSD, exchangeRate, isGoldLoading, goldError, isUsingFallback, goldLastUpdatedAt } = useCurrency();
  const [goldGrams, setGoldGrams] = useState('');
  const [karat, setKarat] = useState<24 | 22 | 21 | 18>(21);
  const [includeSilver, setIncludeSilver] = useState(false);
  const [silverGrams, setSilverGrams] = useState('');
  const [result, setResult] = useState<ZakatResult | null>(null);
  const [pulsing, setPulsing] = useState(false);
  const prevReached = useRef(false);

  const animatedZakat = useCountUp(result?.zakatAmount ?? 0);

  useEffect(() => {
    const gold = parseFloat(goldGrams) || 0;
    const silver = includeSilver ? (parseFloat(silverGrams) || 0) : 0;
    if (gold <= 0 && silver <= 0) { setResult(null); return; }

    const r = calculateGoldZakat(gold, karat, silver, goldPriceUSD, silverPriceUSD, exchangeRate);
    setResult(r);

    if (r.reachedNisab && !prevReached.current) {
      setPulsing(true);
      setTimeout(() => setPulsing(false), 1100);
    }
    prevReached.current = r.reachedNisab;
  }, [goldGrams, karat, silverGrams, includeSilver, goldPriceUSD, silverPriceUSD, exchangeRate]);

  return (
    <>
      <PageMeta
        title="حاسبة زكاة الذهب والفضة 2026 - ميزان الزكاة"
        description="احسب زكاة الذهب والفضة بدقة. يدعم عيار 24 و22 و21 و18. سعر ذهب لحظي وتحويل فوري لعملتك."
        keywords="زكاة الذهب, حساب زكاة الذهب, نصاب الذهب, عيار الذهب, زكاة الفضة"
        canonicalPath="/zakat-gold-silver"
      />
      <SchemaOrg schema={schema} id="zakat-gold-silver" />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="font-serif text-3xl font-bold text-[#1C1B19] mb-2">حاسبة زكاة الذهب والفضة</h1>
        <p className="text-muted-foreground mb-6">أدخل وزن ذهبك وعياره — ستظهر النتيجة فوراً.</p>

        {goldError && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-4 rounded-lg mb-6">
            تعذر جلب أسعار الذهب اللحظية. يتم استخدام أسعار تقريبية حالياً.
          </div>
        )}
        <GoldPriceBanner isUsingFallback={isUsingFallback} goldPriceUSD={goldPriceUSD} exchangeRate={exchangeRate} currency={currency} isLoading={isGoldLoading} lastUpdatedAt={goldLastUpdatedAt} />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* ── INPUTS ── */}
          <section className="space-y-6" aria-label="مدخلات الحاسبة">
            {/* Gold weight */}
            <div className="space-y-2">
              <Label htmlFor="gold-grams">وزن الذهب (جرام)</Label>
              <Input
                id="gold-grams"
                type="number"
                min="0"
                step="0.1"
                placeholder="مثال: 50"
                value={goldGrams}
                onChange={(e) => setGoldGrams(e.target.value)}
                data-testid="input-gold-grams"
              />
            </div>

            {/* Karat */}
            <div className="space-y-2">
              <Label htmlFor="karat-select">عيار الذهب</Label>
              <Select value={String(karat)} onValueChange={(v) => setKarat(Number(v) as typeof karat)}>
                <SelectTrigger id="karat-select" data-testid="select-karat">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {KARATS.map((k) => (
                    <SelectItem key={k} value={String(k)}>{k} قيراط</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Silver toggle */}
            <div className="flex items-center gap-3">
              <Switch
                id="silver-toggle"
                checked={includeSilver}
                onCheckedChange={setIncludeSilver}
                data-testid="toggle-silver"
              />
              <Label htmlFor="silver-toggle">أضف الفضة</Label>
            </div>

            {includeSilver && (
              <div className="space-y-2">
                <Label htmlFor="silver-grams">وزن الفضة (جرام)</Label>
                <Input
                  id="silver-grams"
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="مثال: 200"
                  value={silverGrams}
                  onChange={(e) => setSilverGrams(e.target.value)}
                  data-testid="input-silver-grams"
                />
              </div>
            )}

            {result && <NisabProgress percentage={result.nisabPercentage} />}
          </section>

          {/* ── RESULT ── */}
          <section aria-label="نتيجة الحساب" className="space-y-5">
            <div className="flex justify-center">
              <BalanceIndicator nisabPercentage={result?.nisabPercentage ?? 0} size="lg" />
            </div>

            {result ? (
              <div className={`rounded-lg border border-[#E8E2D4] p-6 space-y-4 ${pulsing ? 'animate-nisab-pulse' : ''}`}>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">الزكاة الواجبة</p>
                  <p className="font-result text-4xl font-bold text-gold" data-testid="result-zakat-amount">
                    {formatCurrency(animatedZakat, currency)}
                  </p>
                </div>
                <MicroCopy result={result} currency={currency} />
                <StepByStep steps={result.steps} currency={currency} />
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-[#E8E2D4] p-8 text-center text-muted-foreground text-sm">
                أدخل وزن ذهبك لرؤية النتيجة
              </div>
            )}

            <p className="text-xs text-muted-foreground border-r-2 border-[#E8E2D4] pr-3">
              تنويه: هذه الأداة للمساعدة في التقدير وليست فتوى شرعية.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
