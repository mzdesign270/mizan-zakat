import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { PageMeta } from '@/components/seo/PageMeta';
import { SchemaOrg } from '@/components/seo/SchemaOrg';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'الفرق بين الزكاة والصدقة',
  url: 'https://mizan-zakat.com/articles/zakat-vs-sadaqah',
  datePublished: '2026-01-01',
  author: { '@type': 'Organization', name: 'ميزان الزكاة' },
};

const COMPARISON = [
  { aspect: 'الإلزام', zakat: 'فرض عين على كل مسلم بالغ', sadaqah: 'طوعية تماماً' },
  { aspect: 'المقدار',  zakat: '٢.٥٪ محددة بالشرع',        sadaqah: 'لا حدّ أعلى ولا أدنى' },
  { aspect: 'الوقت',   zakat: 'مرة في الحول عند بلوغ النصاب', sadaqah: 'في أي وقت وبأي مناسبة' },
  { aspect: 'المستحقون', zakat: 'ثمانية أصناف محددة قرآناً',  sadaqah: 'لأي شخص أو جهة' },
  { aspect: 'النية',   zakat: 'شرط لصحتها',                 sadaqah: 'مستحبة وليست شرطاً' },
  { aspect: 'الإثم',   zakat: 'يأثم من يمنعها قادراً',       sadaqah: 'لا إثم في تركها' },
];

export default function ArticleZakatVsSadaqahPage() {
  return (
    <>
      <PageMeta
        title="الفرق بين الزكاة والصدقة - ميزان الزكاة"
        description="جدول مقارنة سريع وواضح بين الزكاة والصدقة — الفرق في الإلزام والمقدار والمستحقين."
        keywords="الفرق بين الزكاة والصدقة, زكاة وصدقة, هل الصدقة تغني عن الزكاة"
        canonicalPath="/articles/zakat-vs-sadaqah"
        ogType="article"
      />
      <SchemaOrg schema={schema} id="article-zakat-vs-sadaqah" />

      <main className="max-w-2xl mx-auto px-4 py-12">
        <nav className="text-xs text-muted-foreground mb-6 flex items-center gap-1">
          <Link href="/" className="hover:text-[#0F5C4C]">الرئيسية</Link>
          <span>/</span>
          <span>الزكاة والصدقة</span>
        </nav>

        <h1 className="font-serif text-3xl font-bold text-[#1C1B19] mb-4">الفرق بين الزكاة والصدقة</h1>

        <p className="text-base leading-relaxed mb-8 text-foreground/90">
          محمد وصديقه عمر يتحدثان بعد صلاة الجمعة. يقول عمر: "أنا أتصدق كثيراً طوال السنة،
          فهل يُغني ذلك عن الزكاة؟" محمد يتوقف — وهو على حق في التوقف.
          الخلط بين الزكاة والصدقة شائع جداً، وفهم الفرق بينهما يحمي الإنسان من إثم إهمال فريضة.
        </p>

        {/* Comparison table */}
        <section aria-label="جدول مقارنة الزكاة والصدقة" className="mb-10">
          <h2 className="font-serif text-xl font-semibold text-[#1C1B19] mb-4">جدول المقارنة</h2>
          <div className="overflow-x-auto rounded-lg border border-[#E8E2D4]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0F5C4C] text-white">
                  <th className="px-4 py-3 text-right font-medium">الجانب</th>
                  <th className="px-4 py-3 text-right font-medium">الزكاة</th>
                  <th className="px-4 py-3 text-right font-medium">الصدقة</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-background' : 'bg-[#E8E2D4]/20'}>
                    <td className="px-4 py-3 font-medium text-[#1C1B19]">{row.aspect}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.zakat}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.sadaqah}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-[#1C1B19] mb-3">هل الصدقة تُغني عن الزكاة؟</h2>
          <p className="text-muted-foreground leading-relaxed">
            لا. الصدقة مهما بلغت لا تُسقط وجوب الزكاة. الزكاة حق محدد لأصناف بعينهم في مالك —
            الصدقة فضل إضافي تُقدمه من قلبك. من يتصدق بعشرة آلاف ولا يُزكّي عشرة آلاف
            واجبة عليه لم يُؤدِّ الفريضة.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="font-serif text-xl font-semibold text-[#1C1B19] mb-3">من يستحق الزكاة؟</h2>
          <p className="text-muted-foreground leading-relaxed">
            حددت الآية الكريمة ثمانية أصناف: الفقراء، المساكين، العاملون عليها، المؤلفة قلوبهم،
            في الرقاب، الغارمون، في سبيل الله، ابن السبيل. الصدقة لا تشترط هذه الأصناف —
            قد تعطيها لجارك المحتاج أو لمشروع تحبه.
          </p>
        </section>

        <blockquote className="my-10 border-r-4 border-[#0F5C4C] pr-4 text-lg font-serif font-medium text-[#1C1B19] italic">
          "تذكّر أن الزكاة تُطهّر النفس قبل المال — وكلتاهما طريق إلى البركة."
        </blockquote>

        <div className="p-4 rounded-md bg-[#E8E2D4] border-r-4 border-[#B8860B] mb-8">
          <p className="text-sm font-medium text-[#1C1B19]">هل تعلم؟</p>
          <p className="text-sm text-muted-foreground mt-1">
            "زكاة الفطر" ليست من زكاة المال — هي فريضة مستقلة تجب على كل مسلم
            في آخر رمضان بغض النظر عن النصاب، وتُقدَّر بصاع من طعام البلد.
          </p>
        </div>

        <p className="text-xs text-muted-foreground border border-[#E8E2D4] rounded-md p-3 mb-8">
          تنويه: هذا المقال للتثقيف العام وليس فتوى شرعية.
        </p>

        <Link href="/zakat-cash" className="inline-flex items-center gap-2 text-[#0F5C4C] font-medium text-sm hover:underline">
          احسب زكاة مالك الآن <ArrowLeft className="h-4 w-4" />
        </Link>
      </main>
    </>
  );
}
