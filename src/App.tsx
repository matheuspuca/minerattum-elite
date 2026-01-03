import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import Index from "./pages/Index";
import SmartDrill from "./pages/SmartDrill";
import Biblioteca from "./pages/Biblioteca";
import EbookMineracaoLegalizada from "./pages/EbookMineracaoLegalizada";
import EbookIAMineracao from "./pages/EbookIAMineracao";
import EbookConsultoriaAvancada from "./pages/EbookConsultoriaAvancada";
import Contato from "./pages/Contato";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

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
          <AnimatedRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
