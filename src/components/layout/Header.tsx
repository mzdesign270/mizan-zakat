import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Scale } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const NAV_CALCULATORS = [
  { href: '/zakat-gold-silver', label: 'زكاة الذهب والفضة' },
  { href: '/zakat-cash',        label: 'زكاة النقد والمدخرات' },
  { href: '/zakat-stocks',      label: 'زكاة الأسهم' },
  { href: '/zakat-salary',      label: 'زكاة الراتب' },
];

const NAV_ARTICLES = [
  { href: '/articles/zakat-conditions', label: 'شروط وجوب الزكاة' },
  { href: '/articles/nisab-explained',  label: 'نصاب الزكاة' },
  { href: '/articles/zakat-vs-sadaqah', label: 'الزكاة والصدقة' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const { currency, setCurrency, currencies } = useCurrency();

  const isActive = (href: string) => location === href;

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border" role="banner">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="ميزان الزكاة - الصفحة الرئيسية">
          <Scale className="h-5 w-5 text-[#0F5C4C]" aria-hidden="true" />
          <span className="font-serif text-lg font-semibold text-[#1C1B19]">ميزان الزكاة</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="التنقل الرئيسي">
          <Link href="/" className={`px-3 py-1.5 text-sm rounded-md transition-colors hover:bg-accent ${isActive('/') ? 'text-[#0F5C4C] font-medium' : 'text-foreground'}`}>
            الرئيسية
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-3 py-1.5 text-sm rounded-md transition-colors hover:bg-accent">
                الحاسبات
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {NAV_CALCULATORS.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href} className="w-full cursor-pointer">{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-3 py-1.5 text-sm rounded-md transition-colors hover:bg-accent">
                المقالات
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {NAV_ARTICLES.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href} className="w-full cursor-pointer">{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/faq" className={`px-3 py-1.5 text-sm rounded-md transition-colors hover:bg-accent ${isActive('/faq') ? 'text-[#0F5C4C] font-medium' : ''}`}>
            الأسئلة الشائعة
          </Link>
          <Link href="/contact" className={`px-3 py-1.5 text-sm rounded-md transition-colors hover:bg-accent ${isActive('/contact') ? 'text-[#0F5C4C] font-medium' : ''}`}>
            تواصل معنا
          </Link>
        </nav>

        {/* Currency selector + mobile toggle */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs h-8" data-testid="currency-selector">
                {currency}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-40">
              {currencies.map((c) => (
                <DropdownMenuItem
                  key={c.code}
                  onClick={() => setCurrency(c.code)}
                  className={`text-sm cursor-pointer ${c.code === currency ? 'text-[#0F5C4C] font-medium' : ''}`}
                  data-testid={`currency-option-${c.code}`}
                >
                  <span className="font-result ml-2">{c.code}</span>
                  {c.nameAr}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            className="md:hidden p-2 rounded-md hover:bg-accent"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="فتح القائمة"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-3 space-y-1" role="navigation">
          <Link href="/" className="block px-3 py-2 text-sm rounded-md hover:bg-accent" onClick={() => setMobileOpen(false)}>الرئيسية</Link>
          <p className="px-3 pt-2 text-xs font-medium text-muted-foreground">الحاسبات</p>
          {NAV_CALCULATORS.map((item) => (
            <Link key={item.href} href={item.href} className="block px-3 py-2 text-sm rounded-md hover:bg-accent" onClick={() => setMobileOpen(false)}>
              {item.label}
            </Link>
          ))}
          <p className="px-3 pt-2 text-xs font-medium text-muted-foreground">المقالات</p>
          {NAV_ARTICLES.map((item) => (
            <Link key={item.href} href={item.href} className="block px-3 py-2 text-sm rounded-md hover:bg-accent" onClick={() => setMobileOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href="/faq" className="block px-3 py-2 text-sm rounded-md hover:bg-accent" onClick={() => setMobileOpen(false)}>الأسئلة الشائعة</Link>
          <Link href="/contact" className="block px-3 py-2 text-sm rounded-md hover:bg-accent" onClick={() => setMobileOpen(false)}>تواصل معنا</Link>
        </div>
      )}
    </header>
  );
}
