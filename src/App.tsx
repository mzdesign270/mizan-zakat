import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTopOnNav } from '@/components/routing/ScrollToTopOnNav';
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';

// Pages
import HomePage                    from '@/pages/HomePage';
import ZakatGoldSilverPage         from '@/pages/ZakatGoldSilverPage';
import ZakatCashPage               from '@/pages/ZakatCashPage';
import ZakatStocksPage             from '@/pages/ZakatStocksPage';
import ZakatSalaryPage             from '@/pages/ZakatSalaryPage';
import ArticleZakatConditionsPage  from '@/pages/ArticleZakatConditionsPage';
import ArticleNisabExplainedPage   from '@/pages/ArticleNisabExplainedPage';
import ArticleZakatVsSadaqahPage   from '@/pages/ArticleZakatVsSadaqahPage';
import FaqPage                     from '@/pages/FaqPage';
import AboutPage                   from '@/pages/AboutPage';
import PrivacyPolicyPage           from '@/pages/PrivacyPolicyPage';
import TermsPage                   from '@/pages/TermsPage';
import ContactPage                 from '@/pages/ContactPage';
import NotFound                    from '@/pages/not-found';

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
