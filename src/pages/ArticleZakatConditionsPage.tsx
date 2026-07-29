import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { PageMeta } from '@/components/seo/PageMeta';
import { SchemaOrg } from '@/components/seo/SchemaOrg';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'شروط وجوب الزكاة — الشروط الخمسة بأسلوب واضح',
  url: 'https://mizan-zakat.com/articles/zakat-conditions',
  datePublished: '2026-01-01',
  author: { '@type': 'Organization', name: 'ميزان الزكاة' },
};

export default function ArticleZakatConditionsPage() {
  return (
    <>
      <PageMeta
        title="شروط وجوب الزكاة - ميزان الزكاة"
        description="متى تجب الزكاة؟ الشروط الخمسة شرحاً واضحاً بأمثلة عملية — إسلام، عقل، ملك، نصاب، حول."
        keywords="شروط الزكاة, متى تجب الزكاة, شروط وجوب الزكاة, الحول الهجري"
        canonicalPath="/articles/zakat-conditions"
        ogType="article"
      />
      <SchemaOrg schema={schema} id="article-zakat-conditions" />

      <main className="max-w-2xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-xs text-muted-foreground mb-6 flex items-center gap-1">
          <Link href="/" className="hover:text-[#0F5C4C]">الرئيسية</Link>
          <span>/</span>
          <span>شروط وجوب الزكاة</span>
        </nav>

        <h1 className="font-serif text-3xl font-bold text-[#1C1B19] mb-4">شروط وجوب الزكاة</h1>

        {/* Opening scenario */}
        <p className="text-base leading-relaxed mb-8 text-foreground/90">
          أبو خالد يجلس في مكتبه آخر شعبان، يراجع أرصدته البنكية ويتساءل بصدق: هل يجب علي الزكاة هذا العام؟
          لديه مدخرات، لكن عنده أيضاً قرض سيارة. السؤال وجيه — والإجابة ليست دائماً بسيطة.
          قبل أن تحسب أي رقم، عليك أن تعرف هذه الشروط الخمسة.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="font-serif text-xl font-semibold text-[#1C1B19] mb-3">١. الإسلام</h2>
            <p className="text-muted-foreground leading-relaxed">
              الزكاة فريضة على المسلم فقط. غير المسلم لا تجب عليه الزكاة، وإن أخرجها فهي صدقة لا زكاة.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-[#1C1B19] mb-3">٢. الملك التام</h2>
            <p className="text-muted-foreground leading-relaxed">
              يجب أن تكون المال في ملكك أنت، تتصرف فيه كما تشاء. المال المودع عند آخرين لصالحك
              يُحسب، أما ما ليس بيدك ولا تتوقع استرداده فلا زكاة فيه. هل تعلم أن المال المقرض
              للآخرين تجب فيه الزكاة متى قبضته؟
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-[#1C1B19] mb-3">٣. بلوغ النصاب</h2>
            <p className="text-muted-foreground leading-relaxed">
              النصاب هو الحد الأدنى من المال الذي يوجب الزكاة. نصاب الذهب ٨٥ جراماً، ونصاب الفضة ٥٩٥ جراماً.
              المال الذي لا يبلغ هذا الحد لا زكاة فيه، مهما طال الحول.
            </p>
            <div className="mt-4 p-4 rounded-md bg-[#E8E2D4] border-r-4 border-[#B8860B]">
              <p className="text-sm font-medium text-[#1C1B19]">هل تعلم؟</p>
              <p className="text-sm text-muted-foreground mt-1">
                النصاب يتغير بتغير سعر الذهب يومياً — لذا تحقق من سعر الجرام الحالي قبل أي حساب.
                استخدم حاسبتنا لمعرفة النصاب بعملتك.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-[#1C1B19] mb-3">٤. مرور الحول الهجري</h2>
            <p className="text-muted-foreground leading-relaxed">
              يجب أن يمر على المال حول كامل — أي سنة هجرية — وهو بالغ النصاب.
              إذا انخفض المال دون النصاب في أثناء الحول ثم عاد إليه، فالحول يبدأ من جديد.
              أنت الآن تعرف لماذا يُنصح بتحديد يوم ثابت في السنة لحساب الزكاة.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-[#1C1B19] mb-3">٥. عدم تعلق الدَّين بالمال</h2>
            <p className="text-muted-foreground leading-relaxed">
              كثير من العلماء يرون أن الديون التي عليك تُخصم من المال قبل حساب الزكاة.
              أبو خالد — صاحبنا — يخصم قسط السيارة المستحق من مدخراته، ثم يتحقق هل الباقي يبلغ النصاب.
              وهنا نرى — والله أعلم — أن هذا الرأي هو الأيسر والأعدل.
            </p>
          </section>
        </div>

        {/* Pull quote */}
        <blockquote className="my-10 border-r-4 border-[#0F5C4C] pr-4 text-lg font-serif font-medium text-[#1C1B19] italic">
          "الزكاة ليست ضريبة تُؤخذ منك — هي بركة تُضيفها إلى مالك."
        </blockquote>

        <div className="p-4 rounded-md bg-[#E8E2D4] border-r-4 border-[#B8860B] mb-8">
          <p className="text-sm font-medium text-[#1C1B19]">هل تعلم؟</p>
          <p className="text-sm text-muted-foreground mt-1">
            السنة الهجرية أقصر من الميلادية بـ١١ يوماً تقريباً — أي أن من يلتزم بالحول الهجري
            يؤدي الزكاة مرة كل ٣٥٤ يوماً لا ٣٦٥.
          </p>
        </div>

        <p className="text-xs text-muted-foreground border border-[#E8E2D4] rounded-md p-3 mb-8">
          تنويه: هذا المقال للتثقيف العام وليس فتوى شرعية. يُنصح بمراجعة عالم شرعي موثوق لحالتك الخاصة.
        </p>

        <Link href="/zakat-cash" className="inline-flex items-center gap-2 text-[#0F5C4C] font-medium text-sm hover:underline">
          احسب زكاة مالك الآن <ArrowLeft className="h-4 w-4" />
        </Link>
      </main>
    </>
  );
}
