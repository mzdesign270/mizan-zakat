import { PageMeta } from '@/components/seo/PageMeta';

export default function TermsPage() {
  return (
    <>
      <PageMeta
        title="الشروط والأحكام - ميزان الزكاة"
        description="شروط استخدام موقع ميزان الزكاة."
        canonicalPath="/terms"
      />

      <main className="max-w-2xl mx-auto px-4 py-12 space-y-8">
        <h1 className="font-serif text-3xl font-bold text-[#1C1B19]">الشروط والأحكام</h1>
        <p className="text-xs text-muted-foreground">آخر تحديث: يناير ٢٠٢٦</p>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-semibold text-[#1C1B19]">١. قبول الشروط</h2>
            <p>
              باستخدامك موقع ميزان الزكاة، فأنت توافق على هذه الشروط. إن لم توافق عليها، يرجى
              التوقف عن استخدام الموقع.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-semibold text-[#1C1B19]">٢. طبيعة الخدمة</h2>
            <p>
              ميزان الزكاة أداة إلكترونية مساعِدة لحساب الزكاة. النتائج المعروضة تقديرية مبنية على
              معادلات فقهية شائعة وأسعار السوق — وليست فتوى شرعية ولا استشارة مالية أو دينية رسمية.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-semibold text-[#1C1B19]">٣. دقة المعلومات</h2>
            <p>
              نسعى لتقديم معلومات دقيقة، لكننا لا نضمن خلوّ الموقع من الأخطاء. أسعار الذهب
              والصرف تُجلب من مصادر خارجية وقد تتأخر أو تختلف عن السعر الفعلي.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-semibold text-[#1C1B19]">٤. حدود المسؤولية</h2>
            <p>
              لا يتحمل موقع ميزان الزكاة أي مسؤولية عن قرارات اتخذتها بناءً على نتائج الحاسبة.
              أنت وحدك المسؤول عن التحقق من صحة أدائك للزكاة من خلال مصادر موثوقة.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-semibold text-[#1C1B19]">٥. الاستخدام المقبول</h2>
            <p>
              يحق لك استخدام الموقع للأغراض الشخصية والتعليمية. يُمنع استخدامه لأي غرض غير مشروع،
              أو محاولة التلاعب أو إساءة استخدام الخدمة.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-semibold text-[#1C1B19]">٦. التعديلات</h2>
            <p>
              نحتفظ بالحق في تعديل هذه الشروط في أي وقت. الاستمرار في استخدام الموقع بعد نشر
              التعديلات يعني قبولك لها.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
