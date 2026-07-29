import { Scale } from 'lucide-react';
import { PageMeta } from '@/components/seo/PageMeta';

export default function AboutPage() {
  return (
    <>
      <PageMeta
        title="من نحن - ميزان الزكاة"
        description="ميزان الزكاة — أداة رقمية مجانية لمساعدة المسلمين في حساب زكاة أموالهم بدقة."
        canonicalPath="/about"
      />

      <main className="max-w-2xl mx-auto px-4 py-12 space-y-8">
        <div className="flex items-center gap-3">
          <Scale className="h-8 w-8 text-[#0F5C4C]" aria-hidden="true" />
          <h1 className="font-serif text-3xl font-bold text-[#1C1B19]">من نحن</h1>
        </div>

        <div className="space-y-5 text-muted-foreground leading-relaxed">
          <p>
            ميزان الزكاة مشروع رقمي نشأ من سؤال بسيط: لماذا لا يوجد موقع عربي واحد يحسب الزكاة
            بدقة ويدعم عملات الدول العربية المختلفة؟
          </p>
          <p>
            بنيناه لنكون الأداة التي نبحث عنها نحن أنفسنا كل عام — تفتح الصفحة، تُدخل أرقامك،
            وتحصل على نتيجة فورية دقيقة بعملتك ولغتك.
          </p>
          <p>
            الموقع يدعم حالياً أكثر من ١١ عملة عربية بأسعار صرف محدّثة، ويشمل حاسبات للذهب والفضة
            والنقد والأسهم والراتب المدخر.
          </p>
        </div>

        <div className="p-5 rounded-lg border border-[#E8E2D4] bg-[#E8E2D4]/20 space-y-2">
          <h2 className="font-serif text-base font-semibold text-[#1C1B19]">تنويه مهم</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            ميزان الزكاة أداة مساعِدة للتقدير — وليست فتوى شرعية. الحسابات مبنية على الطرق الفقهية
            الأكثر شيوعاً، لكن قد تختلف حالتك الخاصة. يُنصح دائماً بمراجعة عالم شرعي موثوق
            إذا كانت لديك ظروف خاصة أو أسئلة دقيقة.
          </p>
        </div>
      </main>
    </>
  );
}
