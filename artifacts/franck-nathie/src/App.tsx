import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ComingSoon from "@/pages/ComingSoon";
import QuiSuisJe from "@/pages/QuiSuisJe";
import DPAEPage from "@/pages/DPAEPage";
import ArticleBlessures from "@/pages/ArticleBlessures";
import ShopPage from "@/pages/ShopPage";
import ProductPage from "@/pages/ProductPage";
import SearchPage from "@/pages/SearchPage";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const queryClient = new QueryClient();

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Layout><Home /></Layout>} />
      <Route path="/coming-soon" component={() => <Layout><ComingSoon /></Layout>} />
      <Route path="/qui-suis-je" component={() => <Layout><QuiSuisJe /></Layout>} />
      <Route path="/dpae" component={() => <Layout><DPAEPage /></Layout>} />
      <Route path="/boutique" component={() => <Layout><ShopPage /></Layout>} />
      <Route path="/boutique/:sub" component={() => <Layout><ProductPage /></Layout>} />
      <Route path="/recherche" component={() => <Layout><SearchPage /></Layout>} />
      <Route path="/articles" component={() => <Layout><ComingSoon /></Layout>} />
      <Route path="/articles/blessures" component={() => <Layout><ArticleBlessures /></Layout>} />
      <Route path="/articles/:sub" component={() => <Layout><ComingSoon /></Layout>} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
