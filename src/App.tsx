import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/smartdrill" element={<SmartDrill />} />
            <Route path="/biblioteca" element={<Biblioteca />} />
            <Route path="/ebook/mineracao-legalizada" element={<EbookMineracaoLegalizada />} />
            <Route path="/ebook/ia-mineracao" element={<EbookIAMineracao />} />
            <Route path="/ebook/consultoria-avancada" element={<EbookConsultoriaAvancada />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
