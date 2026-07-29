import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { PageMeta } from '@/components/seo/PageMeta';
import { SchemaOrg } from '@/components/seo/SchemaOrg';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'نصاب الزكاة كم وكيف يحسب',
  url: 'https://mizan-zakat.com/articles/nisab-explained',
  datePublished: '2026-01-01',
  author: { '@type': 'Organization', name: 'ميزان الزكاة' },
};

export default function ArticleNisabExplainedPage() {
  return (
    <>
      <PageMeta
        title="نصاب الزكاة كم وكيف يحسب - ميزان الزكاة"
        description="نصاب الذهب ٨٥ جرام والفضة ٥٩٥ جرام — لكن قيمتها بالريال تتغير يومياً مع سعر السوق. اعرف الفرق."
        keywords="نصاب الزكاة, نصاب الذهب, نصاب الفضة, كم النصاب, حساب النصاب"
        canonicalPath="/articles/nisab-explained"
        ogType="article"
      />
      <SchemaOrg schema={schema} id="article-nisab-explained" />

      <main className="max-w-2xl mx-auto px-4 py-12">
        <nav className="text-xs text-muted-foreground mb-6 flex items-center gap-1">
          <Link href="/" className="hover:text-[#0F5C4C]">الرئيسية</Link>
          <span>/</span>
          <span>نصاب الزكاة</span>
        </nav>

        <h1 className="font-serif text-3xl font-bold text-[#1C1B19] mb-4">نصاب الزكاة — كم وكيف يحسب</h1>

        <p className="text-base leading-relaxed mb-8 text-foreground/90">
          سارة تملك ٢٠٠ جرام ذهب عيار ٢١. تسأل صديقتها: هل علي زكاة؟ الصديقة تقول: بالتأكيد! لكن سارة
          تريد أن تعرف السبب بالضبط. وهنا يأتي دور فهم النصاب — الرقم الذي يغير كل شيء.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="font-serif text-xl font-semibold text-[#1C1B19] mb-3">ما هو النصاب؟</h2>
            <p className="text-muted-foreground leading-relaxed">
              النصاب هو الحد الأدنى من المال الذي إذا بلغه وحال عليه الحول وجبت فيه الزكاة.
              حدده النبي ﷺ بنصابين: نصاب الذهب ٨٥ جراماً من عيار ٢٤، ونصاب الفضة ٥٩٥ جراماً.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-[#1C1B19] mb-3">لماذا النصاب رقم متغير؟</h2>
            <p className="text-muted-foreground leading-relaxed">
              الوزن ثابت — ٨٥ جراماً دائماً — لكن قيمتها بالريال السعودي أو الجنيه المصري تتغير يومياً
              مع سعر الذهب في الأسواق العالمية. اليوم قد تعادل ٣٢,٠٠٠ ريال، وبعد شهر ٣٤,٠٠٠ ريال.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#E8E2D4]/60">
                    <th className="border border-[#E8E2D4] px-4 py-2 text-right font-semibold">العملة</th>
                    <th className="border border-[#E8E2D4] px-4 py-2 text-right font-semibold">مثال تقريبي للنصاب</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['ريال سعودي (SAR)', '~٣٢,٠٠٠ ريال'],
                    ['جنيه مصري (EGP)', '~٣,١٠٠,٠٠٠ جنيه'],
                    ['دينار أردني (JOD)', '~٢٢,٧٠٠ دينار'],
                    ['درهم إماراتي (AED)', '~٣١,٣٠٠ درهم'],
                  ].map(([currency, value]) => (
                    <tr key={currency} className="hover:bg-[#E8E2D4]/20">
                      <td className="border border-[#E8E2D4] px-4 py-2 text-muted-foreground">{currency}</td>
                      <td className="border border-[#E8E2D4] px-4 py-2 font-result">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-2">*الأرقام تقريبية — استخدم الحاسبة للسعر الدقيق اليوم.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-[#1C1B19] mb-3">نصاب الذهب أم الفضة؟</h2>
            <p className="text-muted-foreground leading-relaxed">
              هذا سؤال يحير كثيرين. نصاب الفضة (٥٩٥ جراماً) يساوي اليوم مبلغاً أقل بكثير من نصاب الذهب.
              من يأخذ بنصاب الفضة يُزكّي على مبالغ أصغر، وهو أحوط للفقراء وأكثر انتشاراً بين الفقهاء
              المعاصرين للزكاة على النقد. هل تعلم أن الاختلاف بين النصابين قد يبلغ عشرة أضعاف في القيمة؟
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-[#1C1B19] mb-3">مثال عملي — سارة</h2>
            <p className="text-muted-foreground leading-relaxed">
              سارة تملك ٢٠٠ جرام ذهب عيار ٢١. الوزن الفعلي للذهب الخالص = ٢٠٠ × ٠.٨٧٥ = ١٧٥ جرام.
              النصاب ٨٥ جرام، وهي تملك ١٧٥ جراماً — إذن هي بلغت النصاب بوضوح.
              إذا كان سعر الجرام ٢١٤ ريالاً، فقيمة ذهبها ٣٧,٤٥٠ ريالاً، وزكاتها ٢.٥٪ = ٩٣٦ ريالاً.
            </p>
          </section>
        </div>

        <blockquote className="my-10 border-r-4 border-[#0F5C4C] pr-4 text-lg font-serif font-medium text-[#1C1B19] italic">
          "كل ريال تخرجه هو استثمار في الآخرة — والله يضاعف لمن يشاء."
        </blockquote>

        <div className="p-4 rounded-md bg-[#E8E2D4] border-r-4 border-[#B8860B] mb-8">
          <p className="text-sm font-medium text-[#1C1B19]">هل تعلم؟</p>
          <p className="text-sm text-muted-foreground mt-1">
            سعر الذهب قد يتفاوت بين الصاغة والسوق العالمية. استخدم دائماً السعر العالمي للجرام
            (وليس سعر المصاغ) عند حساب الزكاة.
          </p>
        </div>

        <p className="text-xs text-muted-foreground border border-[#E8E2D4] rounded-md p-3 mb-8">
          تنويه: هذا المقال للتثقيف العام وليس فتوى شرعية.
        </p>

        <Link href="/zakat-gold-silver" className="inline-flex items-center gap-2 text-[#0F5C4C] font-medium text-sm hover:underline">
          احسب زكاة ذهبك الآن <ArrowLeft className="h-4 w-4" />
        </Link>
      </main>
    </>
  );
}
