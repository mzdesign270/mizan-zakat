import { useState, useEffect, useRef } from 'react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useCountUp } from '@/hooks/useCountUp';
import { calculateCashZakat, type ZakatResult } from '@/utils/zakatCalculations';
import { formatCurrency } from '@/utils/currencyFormatter';
import { BalanceIndicator } from '@/components/calculators/BalanceIndicator';
import { MicroCopy } from '@/components/calculators/MicroCopy';
import { NisabProgress } from '@/components/calculators/NisabProgress';
import { StepByStep } from '@/components/calculators/StepByStep';
import { PageMeta } from '@/components/seo/PageMeta';
import { SchemaOrg } from '@/components/seo/SchemaOrg';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'حاسبة زكاة المال والمدخرات',
  url: 'https://mizan-zakat.com/zakat-cash',
  applicationCategory: 'FinanceApplication',
};

export default function ZakatCashPage() {
  const { currency, goldNisabLocal } = useCurrency();
  const [savings, setSavings]       = useState('');
  const [receivables, setReceivables] = useState('');
  const [debts, setDebts]           = useState('');
  const [result, setResult]         = useState<ZakatResult | null>(null);
  const [pulsing, setPulsing]       = useState(false);
  const prevReached = useRef(false);
  const animatedZakat = useCountUp(result?.zakatAmount ?? 0);

  useEffect(() => {
    const s = parseFloat(savings) || 0;
    const r = parseFloat(receivables) || 0;
    const d = parseFloat(debts) || 0;
    if (s + r === 0) { setResult(null); return; }
    const calc = calculateCashZakat(s, r, d, goldNisabLocal);
    setResult(calc);
    if (calc.reachedNisab && !prevReached.current) {
      setPulsing(true);
      setTimeout(() => setPulsing(false), 1100);
    }
    prevReached.current = calc.reachedNisab;
  }, [savings, receivables, debts, goldNisabLocal]);

  const net = Math.max(0, (parseFloat(savings) || 0) + (parseFloat(receivables) || 0) - (parseFloat(debts) || 0));

  return (
    <>
      <PageMeta
        title="حاسبة زكاة المال والمدخرات 2026 - ميزان الزكاة"
        description="احسب زكاة مالك المدخر والنقد بسهولة. يحسب الصافي بعد خصم الديون ويقارنه بالنصاب تلقائياً."
        keywords="زكاة المال, زكاة المدخرات, كم زكاة المال, حساب زكاة النقد"
        canonicalPath="/zakat-cash"
      />
      <SchemaOrg schema={schema} id="zakat-cash" />

      <main className="max-w-xl mx-auto px-4 py-10 space-y-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#1C1B19] mb-2">حاسبة زكاة النقد والمدخرات</h1>
          <p className="text-muted-foreground">
            أدخل مبالغك وسيحسب الموقع الصافي الزكوي تلقائياً — تذكّر أن الزكاة تطهّر النفس قبل المال.
          </p>
        </div>

        {/* Progress bar at top */}
        {result && (
          <NisabProgress percentage={result.nisabPercentage} label="نسبة مالك من النصاب" />
        )}

        {/* Inputs */}
        <section className="space-y-5" aria-label="مدخلات الحاسبة">
          <div className="space-y-2">
            <Label htmlFor="savings">إجمالي المدخرات والنقد</Label>
            <Input
              id="savings"
              type="number"
              min="0"
              placeholder={`مثال: 10000 ${currency}`}
              value={savings}
              onChange={(e) => setSavings(e.target.value)}
              data-testid="input-savings"
            />
            <p className="text-xs text-muted-foreground">كل ما تملكه من نقد وأرصدة بنكية</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="receivables">الديون التي يدين بها لك الآخرون</Label>
            <Input
              id="receivables"
              type="number"
              min="0"
              placeholder="0"
              value={receivables}
              onChange={(e) => setReceivables(e.target.value)}
              data-testid="input-receivables"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="debts">الديون التي عليك للآخرين</Label>
            <Input
              id="debts"
              type="number"
              min="0"
              placeholder="0"
              value={debts}
              onChange={(e) => setDebts(e.target.value)}
              data-testid="input-debts"
            />
          </div>

          {/* Net display */}
          <div className="flex items-center justify-between px-4 py-3 rounded-md border border-[#E8E2D4] bg-[#E8E2D4]/30 text-sm">
            <span className="text-muted-foreground">الصافي الزكوي</span>
            <span className="font-result font-semibold text-[#1C1B19]" data-testid="display-net">
              {formatCurrency(net, currency)}
            </span>
          </div>
        </section>

        {/* Balance indicator + result */}
        <section aria-label="نتيجة الحساب" className="space-y-5">
          <div className="flex justify-center">
            <BalanceIndicator nisabPercentage={result?.nisabPercentage ?? 0} size="md" />
          </div>

          {result ? (
            <div className={`rounded-lg border border-[#E8E2D4] p-6 space-y-4 text-center ${pulsing ? 'animate-nisab-pulse' : ''}`}>
              <p className="text-sm text-muted-foreground">الزكاة الواجبة</p>
              <p className="font-result text-4xl font-bold text-gold" data-testid="result-zakat-amount">
                {formatCurrency(animatedZakat, currency)}
              </p>
              <MicroCopy result={result} currency={currency} />
              <StepByStep steps={result.steps} currency={currency} />
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-[#E8E2D4] p-8 text-center text-muted-foreground text-sm">
              أدخل مبلغك لرؤية النتيجة
            </div>
          )}

          <p className="text-xs text-muted-foreground border-r-2 border-[#E8E2D4] pr-3">
            تنويه: هذه الأداة للمساعدة في التقدير وليست فتوى شرعية.
          </p>
        </section>
      </main>
    </>
  );
}
