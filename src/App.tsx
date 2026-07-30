import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTopOnNav } from '@/components/routing/ScrollToTopOnNav';
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';

import { lazy, Suspense } from 'react';

// Pages - Lazy Loaded
const HomePage                    = lazy(() => import('@/pages/HomePage'));
const ZakatGoldSilverPage         = lazy(() => import('@/pages/ZakatGoldSilverPage'));
const ZakatCashPage               = lazy(() => import('@/pages/ZakatCashPage'));
const ZakatStocksPage             = lazy(() => import('@/pages/ZakatStocksPage'));
const ZakatSalaryPage             = lazy(() => import('@/pages/ZakatSalaryPage'));
const ArticleZakatConditionsPage  = lazy(() => import('@/pages/ArticleZakatConditionsPage'));
const ArticleNisabExplainedPage   = lazy(() => import('@/pages/ArticleNisabExplainedPage'));
const ArticleZakatVsSadaqahPage   = lazy(() => import('@/pages/ArticleZakatVsSadaqahPage'));
const FaqPage                     = lazy(() => import('@/pages/FaqPage'));
const AboutPage                   = lazy(() => import('@/pages/AboutPage'));
const PrivacyPolicyPage           = lazy(() => import('@/pages/PrivacyPolicyPage'));
const TermsPage                   = lazy(() => import('@/pages/TermsPage'));
const ContactPage                 = lazy(() => import('@/pages/ContactPage'));
const NotFound                    = lazy(() => import('@/pages/not-found'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000,
    },
  },
});

function AppRoutes() {
  return (
    <>
      <ScrollToTopOnNav />
      <Header />
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/"                           component={HomePage} />
          <Route path="/zakat-gold-silver"          component={ZakatGoldSilverPage} />
          <Route path="/zakat-cash"                 component={ZakatCashPage} />
          <Route path="/zakat-stocks"               component={ZakatStocksPage} />
          <Route path="/zakat-salary"               component={ZakatSalaryPage} />
          <Route path="/articles/zakat-conditions" component={ArticleZakatConditionsPage} />
          <Route path="/articles/nisab-explained"  component={ArticleNisabExplainedPage} />
          <Route path="/articles/zakat-vs-sadaqah" component={ArticleZakatVsSadaqahPage} />
          <Route path="/faq"                        component={FaqPage} />
          <Route path="/about"                      component={AboutPage} />
          <Route path="/privacy-policy"             component={PrivacyPolicyPage} />
          <Route path="/terms"                      component={TermsPage} />
          <Route path="/contact"                    component={ContactPage} />
          <Route                                    component={NotFound} />
        </Switch>
      </Suspense>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <TooltipProvider>
          <WouterRouter base={(import.meta.env.BASE_URL || '/').replace(/\/$/, '')}>
            <AppRoutes />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </CurrencyProvider>
    </QueryClientProvider>
  );
}

export default App;
