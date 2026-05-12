import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CheckoutProvider } from "@/lib/checkout-context";
import CheckoutModal from "@/components/CheckoutModal";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Produk from "@/pages/produk";
import ProdukDetail from "@/pages/produk-detail";
import TentangKami from "@/pages/tentang-kami";
import Testimoni from "@/pages/testimoni";
import Blog from "@/pages/blog";
import BlogDetail from "@/pages/blog-detail";
import FAQ from "@/pages/faq";
import Kontak from "@/pages/kontak";
import Checkout from "@/pages/checkout";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/produk" component={Produk} />
      <Route path="/produk/:slug">
        {(params) => <ProdukDetail slug={params.slug} />}
      </Route>
      <Route path="/tentang-kami" component={TentangKami} />
      <Route path="/testimoni" component={Testimoni} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug">
        {(params) => <BlogDetail slug={params.slug} />}
      </Route>
      <Route path="/faq" component={FAQ} />
      <Route path="/kontak" component={Kontak} />
      <Route path="/checkout" component={Checkout} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CheckoutProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <CheckoutModal />
        </CheckoutProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
