import { Link } from 'wouter';
import { ArrowLeft, BookOpen, HelpCircle } from 'lucide-react';
import { BalanceIndicator } from '@/components/calculators/BalanceIndicator';
import { PageMeta } from '@/components/seo/PageMeta';
import { SchemaOrg } from '@/components/seo/SchemaOrg';
import { Button } from '@/components/ui/button';

const CALCULATORS = [
  {
    href: '/zakat-gold-silver',
    title: 'زكاة الذهب والفضة',
    desc: 'احسب زكاتك على الذهب المملوك بجميع العيارات مع سعر لحظي للجرام',
    wide: true,
  },
  {
    href: '/zakat-cash',
    title: 'زكاة النقد والمدخرات',
    desc: 'مدخراتك + ما يستحق لك − ما عليك من ديون',
    wide: false,
  },
  {
    href: '/zakat-stocks',
    title: 'زكاة الأسهم والاستثمارات',
    desc: 'سواء كانت أسهم مضاربة أو استثمار طويل المدى',
    wide: false,
  },
  {
    href: '/zakat-salary',
    title: 'زكاة الراتب المدخر',
    desc: 'ما تبقى من راتبك على مدار الحول الهجري',
    wide: true,
  },
];

const ARTICLES = [
  { href: '/articles/zakat-conditions', title: 'شروط وجوب الزكاة', desc: 'متى تجب الزكاة؟ الشروط الخمسة بأسلوب واضح' },
  { href: '/articles/nisab-explained',  title: 'نصاب الزكاة',       desc: 'كم النصاب بالضبط وكيف يتغير مع سعر الذهب' },
  { href: '/articles/zakat-vs-sadaqah', title: 'الزكاة والصدقة',    desc: 'الفرق الجوهري بينهما في جدول مقارنة سريع' },
];

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ميزان الزكاة',
  url: 'https://mizan-zakat.pages.dev',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://mizan-zakat.pages.dev/faq?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function HomePage() {
  return (
    <>
      <PageMeta
        title="حاسبة الزكاة للدول العربية 2026 - ميزان الزكاة"
        description="احسب زكاتك بدقة لأكثر من ١١ عملة عربية — ذهب، نقد، أسهم، وراتب. سعر ذهب لحظي، حساب فوري."
        keywords="حاسبة الزكاة, زكاة الذهب, زكاة المال, حساب الزكاة اونلاين, نصاب الزكاة"
        canonicalPath="/"
      />
      <SchemaOrg schema={websiteSchema} id="home" />

      <main>
        {/* ── HERO ── */}
        <section className="bg-background border-b border-border">
          <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">

            {/* Text */}
            <div className="flex-1 space-y-6 text-center md:text-right">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1C1B19] leading-tight">
                احسب زكاتك<br />بدقة وثقة
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                أداة مجانية تدعم أكثر من ١١ عملة عربية، تحسب زكاة الذهب والنقد والأسهم والراتب — بسعر ذهب لحظي ونتيجة فورية.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Button asChild size="lg" className="bg-[#0F5C4C] hover:bg-[#0d5244] text-white">
                  <Link href="/zakat-gold-silver" data-testid="cta-start">
                    ابدأ الحساب الآن
                    <ArrowLeft className="mr-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/faq">الأسئلة الشائعة</Link>
                </Button>
              </div>
            </div>

            {/* Animated balance indicator */}
            <div className="flex flex-col items-center gap-2">
              <BalanceIndicator nisabPercentage={110} ambient size="lg" />
              <p className="text-xs text-muted-foreground">مؤشر الميزان</p>
            </div>
          </div>
        </section>

        {/* ── CALCULATORS ── */}
        <section className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="font-serif text-2xl font-semibold text-[#1C1B19] mb-8">الحاسبات</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CALCULATORS.map((calc, i) => (
              <Link
                key={calc.href}
                href={calc.href}
                className={`group block rounded-lg border border-[#E8E2D4] bg-white/60 p-6 hover:border-[#0F5C4C]/40 transition-colors ${
                  calc.wide ? (i === 0 ? 'md:col-span-2' : 'md:col-span-2') : ''
                }`}
                data-testid={`calc-card-${i}`}
              >
                <h3 className="font-serif text-lg font-semibold text-[#1C1B19] mb-2">{calc.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{calc.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs text-[#0F5C4C] font-medium">
                  احسب الآن <ArrowLeft className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── ARTICLES ── */}
        <section className="bg-[#E8E2D4]/20 border-y border-border">
          <div className="max-w-6xl mx-auto px-4 py-14">
            <div className="flex items-center gap-2 mb-8">
              <BookOpen className="h-5 w-5 text-[#0F5C4C]" />
              <h2 className="font-serif text-2xl font-semibold text-[#1C1B19]">مقالات</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ARTICLES.map((art) => (
                <Link
                  key={art.href}
                  href={art.href}
                  className="group block rounded-lg border border-[#E8E2D4] bg-background p-6 hover:border-[#0F5C4C]/40 transition-colors"
                  data-testid={`article-card-${art.href}`}
                >
                  <h3 className="font-serif text-base font-semibold text-[#1C1B19] mb-2">{art.title}</h3>
                  <p className="text-sm text-muted-foreground">{art.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs text-[#0F5C4C] font-medium">
                    اقرأ المقالة <ArrowLeft className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ CTA ── */}
        <section className="max-w-6xl mx-auto px-4 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <HelpCircle className="h-8 w-8 text-[#0F5C4C] shrink-0" />
            <div>
              <h2 className="font-serif text-xl font-semibold">لديك سؤال؟</h2>
              <p className="text-sm text-muted-foreground mt-1">
                تصفح الأسئلة الشائعة — إجابات مفصلة على أكثر من ١٠ سؤال.
              </p>
            </div>
          </div>
          <Button asChild variant="outline">
            <Link href="/faq">عرض الأسئلة الشائعة</Link>
          </Button>
        </section>
      </main>
    </>
  );
}
