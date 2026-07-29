import { PageMeta } from '@/components/seo/PageMeta';

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageMeta
        title="سياسة الخصوصية - ميزان الزكاة"
        description="سياسة الخصوصية لموقع ميزان الزكاة — كيف نتعامل مع بياناتك."
        canonicalPath="/privacy-policy"
      />

      <main className="max-w-2xl mx-auto px-4 py-12 space-y-8">
        <h1 className="font-serif text-3xl font-bold text-[#1C1B19]">سياسة الخصوصية</h1>
        <p className="text-xs text-muted-foreground">آخر تحديث: يناير ٢٠٢٦</p>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-semibold text-[#1C1B19]">١. ما الذي نجمعه</h2>
            <p>
              الموقع لا يجمع أي بيانات شخصية تلقائياً. لا تتبع، لا كوكيز تحليلية، لا إعلانات مستهدفة.
            </p>
            <p>
              البيانات الوحيدة التي قد نحتفظ بها هي ما تُرسله طوعاً عبر نموذج التواصل — الاسم والبريد الإلكتروني
              والرسالة — وتُستخدم فقط للرد عليك.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-semibold text-[#1C1B19]">٢. التخزين المحلي (localStorage)</h2>
            <p>
              الموقع يستخدم <span className="font-mono text-sm">localStorage</span> في متصفحك لحفظ:
            </p>
            <ul className="list-disc list-inside space-y-1 mr-4">
              <li>العملة التي اخترتها (لتذكّرها في زياراتك القادمة)</li>
              <li>سعر الذهب الأخير المحمَّل (لتقليل طلبات الشبكة)</li>
              <li>أسعار الصرف الأخيرة</li>
            </ul>
            <p>
              هذه البيانات تبقى في متصفحك فقط — لا تُرسل إلى خوادمنا أبداً.
              يمكنك مسحها في أي وقت من إعدادات متصفحك.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-semibold text-[#1C1B19]">٣. الخدمات الخارجية</h2>
            <p>
              الموقع يتواصل مع خدمتين خارجيتين لجلب البيانات:
            </p>
            <ul className="list-disc list-inside space-y-1 mr-4">
              <li>gold-api.com — لأسعار الذهب والفضة</li>
              <li>exchangerate-api.com — لأسعار صرف العملات</li>
            </ul>
            <p>
              هذه الطلبات تتم مباشرة من متصفحك — لا تمر بخوادمنا، ولا تحمل أي معلومات شخصية عنك.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-semibold text-[#1C1B19]">٤. حمايتك</h2>
            <p>
              جميع الاتصالات عبر HTTPS. لا نبيع بياناتك، لا نشاركها مع أطراف ثالثة بأغراض تسويقية.
              بيانات نموذج التواصل تُحفظ بشكل آمن وتُستخدم للرد فقط.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-semibold text-[#1C1B19]">٥. التواصل</h2>
            <p>
              لأي استفسار عن الخصوصية، تواصل معنا عبر صفحة <a href="/contact" className="text-[#0F5C4C] hover:underline">التواصل</a>.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
