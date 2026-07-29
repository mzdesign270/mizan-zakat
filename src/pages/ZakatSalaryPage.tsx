import { useState, useEffect, useRef } from 'react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useCountUp } from '@/hooks/useCountUp';
import { calculateSalaryZakat, type ZakatResult } from '@/utils/zakatCalculations';
import { formatCurrency } from '@/utils/currencyFormatter';
import { BalanceIndicator } from '@/components/calculators/BalanceIndicator';
import { MicroCopy } from '@/components/calculators/MicroCopy';
import { NisabProgress } from '@/components/calculators/NisabProgress';
import { StepByStep } from '@/components/calculators/StepByStep';
import { PageMeta } from '@/components/seo/PageMeta';
import { SchemaOrg } from '@/components/seo/SchemaOrg';
import { Input } from '@/components/ui/input';

const MONTH_NAMES = [
  'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني',
  'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان',
  'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة',
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'حاسبة زكاة الراتب المدخر',
  url: 'https://mizan-zakat.com/zakat-salary',
  applicationCategory: 'FinanceApplication',
};

export default function ZakatSalaryPage() {
  const { currency, goldNisabLocal } = useCurrency();
  const [monthlySavings, setMonthlySavings] = useState<string[]>(Array(12).fill(''));
  const [result, setResult] = useState<ZakatResult | null>(null);
  const [pulsing, setPulsing] = useState(false);
  const prevReached = useRef(false);
  const animatedZakat = useCountUp(result?.zakatAmount ?? 0);

  const totalSaved = monthlySavings.reduce((sum, v) => sum + (parseFloat(v) || 0), 0);

  useEffect(() => {
    if (totalSaved <= 0) { setResult(null); return; }
    const nums = monthlySavings.map((v) => parseFloat(v) || 0);
    const r = calculateSalaryZakat(nums, goldNisabLocal);
    setResult(r);
    if (r.reachedNisab && !prevReached.current) {
      setPulsing(true);
      setTimeout(() => setPulsing(false), 1100);
    }
    prevReached.current = r.reachedNisab;
  }, [monthlySavings, goldNisabLocal, totalSaved]);

  const updateMonth = (index: number, value: string) => {
    setMonthlySavings((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  return (
    <>
      <PageMeta
        title="حاسبة زكاة الراتب المدخر 2026 - ميزان الزكاة"
        description="احسب زكاة راتبك المدخر على مدار السنة الهجرية. أدخل مبلغ التوفير شهراً بشهر."
        keywords="زكاة الراتب, زكاة المرتب, حساب زكاة الراتب, زكاة الموظف"
        canonicalPath="/zakat-salary"
      />
      <SchemaOrg schema={schema} id="zakat-salary" />

      <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#1C1B19] mb-2">حاسبة زكاة الراتب المدخر</h1>
          <p className="text-muted-foreground">
            أدخل المبلغ الذي وفّرته كل شهر هجري — الموقع سيحسب مجموع الحول وزكاته.
          </p>
        </div>

        {/* Month grid */}
        <section aria-label="مدخلات المدخرات الشهرية">
          <h2 className="font-serif text-lg font-semibold text-[#1C1B19] mb-4">المدخرات الشهرية</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {MONTH_NAMES.map((name, i) => (
              <div key={i} className="space-y-1">
                <label
                  htmlFor={`month-${i}`}
                  className="text-xs text-muted-foreground font-medium"
                >
                  {name}
                </label>
                <Input
                  id={`month-${i}`}
                  type="number"
                  min="0"
                  placeholder="0"
                  value={monthlySavings[i]}
                  onChange={(e) => updateMonth(i, e.target.value)}
                  className="text-sm h-9"
                  data-testid={`input-month-${i}`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Running total */}
        <div className="flex items-center justify-between px-4 py-3 rounded-md border border-[#E8E2D4] bg-[#E8E2D4]/30">
          <span className="text-sm text-muted-foreground">إجمالي المدخرات السنوية</span>
          <span className="font-result font-semibold text-[#1C1B19]" data-testid="display-total">
            {formatCurrency(totalSaved, currency)}
          </span>
        </div>

        {result && <NisabProgress percentage={result.nisabPercentage} />}

        {/* Result */}
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
              أدخل مبالغ الادخار الشهرية لرؤية النتيجة
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
