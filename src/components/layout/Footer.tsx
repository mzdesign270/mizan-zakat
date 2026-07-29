import { Link } from 'wouter';
import { Scale } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background mt-16" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-[#0F5C4C]" aria-hidden="true" />
              <span className="font-serif text-lg font-semibold">ميزان الزكاة</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              أداة رقمية لمساعدتك في حساب زكاة مالك بدقة — تدعم أكثر من ١١ عملة عربية وتعمل فوراً دون الحاجة لإنشاء حساب.
            </p>
            <p className="text-xs text-muted-foreground border border-[#E8E2D4] bg-[#E8E2D4]/40 rounded-md px-3 py-2 leading-relaxed">
              تنويه: هذه الأداة للمساعدة في التقدير وليست فتوى شرعية — يُنصح بمراجعة عالم شرعي موثوق لحالتك الخاصة.
            </p>
          </div>

          {/* Calculators */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-semibold text-foreground">الحاسبات</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/zakat-gold-silver', label: 'زكاة الذهب والفضة' },
                { href: '/zakat-cash',        label: 'زكاة النقد والمدخرات' },
                { href: '/zakat-stocks',      label: 'زكاة الأسهم' },
                { href: '/zakat-salary',      label: 'زكاة الراتب' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted-foreground hover:text-[#0F5C4C] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-semibold text-foreground">روابط مفيدة</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/faq',                        label: 'الأسئلة الشائعة' },
                { href: '/about',                      label: 'من نحن' },
                { href: '/contact',                    label: 'تواصل معنا' },
                { href: '/privacy-policy',             label: 'سياسة الخصوصية' },
                { href: '/terms',                      label: 'الشروط والأحكام' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted-foreground hover:text-[#0F5C4C] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© ٢٠٢٦ ميزان الزكاة — جميع الحقوق محفوظة</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-[#0F5C4C] transition-colors">الخصوصية</Link>
            <Link href="/terms" className="hover:text-[#0F5C4C] transition-colors">الشروط</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
