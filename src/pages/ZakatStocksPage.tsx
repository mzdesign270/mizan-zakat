import { useState, useEffect, useRef } from 'react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useCountUp } from '@/hooks/useCountUp';
import { calculateStocksZakat, type ZakatResult } from '@/utils/zakatCalculations';
import { formatCurrency } from '@/utils/currencyFormatter';
import { BalanceIndicator } from '@/components/calculators/BalanceIndicator';
import { MicroCopy } from '@/components/calculators/MicroCopy';
import { StepByStep } from '@/components/calculators/StepByStep';
import { PageMeta } from '@/components/seo/PageMeta';
import { SchemaOrg } from '@/components/seo/SchemaOrg';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'حاسبة زكاة الأسهم والاستثمارات',
  url: 'https://mizan-zakat.com/zakat-stocks',
  applicationCategory: 'FinanceApplication',
};

export default function ZakatStocksPage() {
  const { currency, goldNisabLocal } = useCurrency();
  const [activeTab, setActiveTab] = useState<'trading' | 'investment'>('trading');

  // Trading
  const [tradingValue, setTradingValue] = useState('');

  // Investment
  const [invMethod, setInvMethod] = useState<'dividends' | 'nav'>('dividends');
  const [dividends, setDividends] = useState('');
  const [navValue, setNavValue]   = useState('');

  const [result, setResult] = useState<ZakatResult | null>(null);
  const [pulsing, setPulsing] = useState(false);
  const prevReached = useRef(false);
  const animatedZakat = useCountUp(result?.zakatAmount ?? 0);

  useEffect(() => {
    let r: ZakatResult | null = null;
    if (activeTab === 'trading') {
      const mv = parseFloat(tradingValue) || 0;
      if (mv > 0) r = calculateStocksZakat(mv, 'trading', 0, 0, goldNisabLocal);
    } else {
      const div = invMethod === 'dividends' ? (parseFloat(dividends) || 0) : 0;
      const nav = invMethod === 'nav'       ? (parseFloat(navValue) || 0) : 0;
      if (div + nav > 0) r = calculateStocksZakat(0, 'investment', div, nav, goldNisabLocal);
    }
    setResult(r);
    if (r?.reachedNisab && !prevReached.current) {
      setPulsing(true);
      setTimeout(() => setPulsing(false), 1100);
    }
    prevReached.current = r?.reachedNisab ?? false;
  }, [activeTab, tradingValue, invMethod, dividends, navValue, goldNisabLocal]);

  return (
    <>
      <PageMeta
        title="حاسبة زكاة الأسهم والاستثمارات 2026 - ميزان الزكاة"
        description="احسب زكاة أسهمك — سواء كانت للمضاربة أو الاستثمار طويل المدى. يشرح الفرق بوضوح."
        keywords="زكاة الأسهم, زكاة الاستثمار, زكاة أسهم المضاربة, حساب زكاة الأسهم"
        canonicalPath="/zakat-stocks"
      />
      <SchemaOrg schema={schema} id="zakat-stocks" />

      <main className="max-w-2xl mx-auto px-4 py-10 space-y-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#1C1B19] mb-2">حاسبة زكاة الأسهم والاستثمارات</h1>
          <p className="text-muted-foreground">نوع الأسهم يؤثر على طريقة الحساب — اختر النوع المناسب أدناه.</p>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'trading' | 'investment')}>
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="trading" data-testid="tab-trading" className="flex items-center gap-1.5">
              أسهم المضاربة
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs text-sm">
                  أسهم تشتريها بقصد البيع والربح السريع — الزكاة على كامل القيمة السوقية
                </TooltipContent>
              </Tooltip>
            </TabsTrigger>
            <TabsTrigger value="investment" data-testid="tab-investment" className="flex items-center gap-1.5">
              أسهم الاستثمار
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs text-sm">
                  أسهم تحتفظ بها للدخل طويل المدى — الزكاة على الأرباح أو صافي الأصول
                </TooltipContent>
              </Tooltip>
            </TabsTrigger>
          </TabsList>

          {/* Trading tab */}
          <TabsContent value="trading" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="trading-value">القيمة السوقية الإجمالية لمحفظتك</Label>
              <Input
                id="trading-value"
                type="number"
                min="0"
                placeholder={`مثال: 50000 ${currency}`}
                value={tradingValue}
                onChange={(e) => setTradingValue(e.target.value)}
                data-testid="input-trading-value"
              />
              <p className="text-xs text-muted-foreground">
                الزكاة = ٢.٥٪ من القيمة السوقية الكاملة لأسهم المضاربة
              </p>
            </div>
          </TabsContent>

          {/* Investment tab */}
          <TabsContent value="investment" className="space-y-5 mt-4">
            <RadioGroup
              value={invMethod}
              onValueChange={(v) => setInvMethod(v as 'dividends' | 'nav')}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="dividends" id="method-dividends" data-testid="radio-dividends" />
                <Label htmlFor="method-dividends">زكاة الأرباح الموزعة</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="nav" id="method-nav" data-testid="radio-nav" />
                <Label htmlFor="method-nav">زكاة صافي الأصول (نصيبك في الشركة)</Label>
              </div>
            </RadioGroup>

            {invMethod === 'dividends' ? (
              <div className="space-y-2">
                <Label htmlFor="dividends-amount">إجمالي الأرباح الموزعة خلال الحول</Label>
                <Input
                  id="dividends-amount"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={dividends}
                  onChange={(e) => setDividends(e.target.value)}
                  data-testid="input-dividends"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="nav-amount">صافي أصول الشركة × نسبة ملكيتك</Label>
                <Input
                  id="nav-amount"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={navValue}
                  onChange={(e) => setNavValue(e.target.value)}
                  data-testid="input-nav"
                />
              </div>
            )}
          </TabsContent>
        </Tabs>

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
              أدخل قيمة محفظتك لرؤية النتيجة
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
