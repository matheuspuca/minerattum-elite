import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { PageSkeleton } from "@/components/PageSkeleton";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const SmartDrill = lazy(() => import("./pages/SmartDrill"));
const Biblioteca = lazy(() => import("./pages/Biblioteca"));
const EbookMineracaoLegalizada = lazy(() => import("./pages/EbookMineracaoLegalizada"));
const EbookIAMineracao = lazy(() => import("./pages/EbookIAMineracao"));
const EbookConsultoriaAvancada = lazy(() => import("./pages/EbookConsultoriaAvancada"));
const Contato = lazy(() => import("./pages/Contato"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/smartdrill" element={<PageTransition><SmartDrill /></PageTransition>} />
        <Route path="/biblioteca" element={<PageTransition><Biblioteca /></PageTransition>} />
        <Route path="/ebook/mineracao-legalizada" element={<PageTransition><EbookMineracaoLegalizada /></PageTransition>} />
        <Route path="/ebook/ia-mineracao" element={<PageTransition><EbookIAMineracao /></PageTransition>} />
        <Route path="/ebook/consultoria-avancada" element={<PageTransition><EbookConsultoriaAvancada /></PageTransition>} />
        <Route path="/contato" element={<PageTransition><Contato /></PageTransition>} />
        <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<PageSkeleton />}>
            <AnimatedRoutes />
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
