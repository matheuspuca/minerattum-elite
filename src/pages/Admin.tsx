import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { 
  Users, 
  Mail, 
  LogOut, 
  Home, 
  Trash2, 
  Calendar,
  Building,
  Phone,
  MessageSquare,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import minerattumLogo from "@/assets/minerattum-logo.png";

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  message: string | null;
  source: string | null;
  created_at: string;
}

const Admin = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"leads" | "email">("leads");
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchLeads();
    }
  }, [user, isAdmin]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast({
        title: "Erro ao carregar leads",
        description: "Não foi possível carregar a lista de leads.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteLead = async (id: string) => {
    try {
      const { error } = await supabase
        .from("leads")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      setLeads(leads.filter((lead) => lead.id !== id));
      toast({
        title: "Lead excluído",
        description: "O lead foi removido com sucesso.",
      });
    } catch (error) {
      console.error("Error deleting lead:", error);
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o lead.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Acesso Restrito</h1>
          <p className="text-muted-foreground mb-6">
            Você não tem permissão para acessar esta área.
          </p>
          <Button onClick={() => navigate("/")} variant="outline">
            <Home className="w-4 h-4 mr-2" />
            Voltar ao Site
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 border-b border-border/50 sticky top-0 z-50 backdrop-blur-sm">
        <div className="container px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img
                src={minerattumLogo}
                alt="Minerattum"
                className="h-10 w-auto"
                style={{ filter: 'brightness(0) saturate(100%) invert(55%) sepia(98%) saturate(456%) hue-rotate(176deg) brightness(96%) contrast(101%)' }}
              />
            </Link>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">Painel Admin</h1>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Site</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <Button
            variant={activeTab === "leads" ? "default" : "outline"}
            onClick={() => setActiveTab("leads")}
          >
            <Users className="w-4 h-4 mr-2" />
            Leads
          </Button>
          <Button
            variant={activeTab === "email" ? "default" : "outline"}
            onClick={() => setActiveTab("email")}
          >
            <Mail className="w-4 h-4 mr-2" />
            Email Marketing
          </Button>
        </div>

        {/* Leads Tab */}
        {activeTab === "leads" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Leads</h2>
                <p className="text-muted-foreground">{leads.length} contatos recebidos</p>
              </div>
              <Button variant="outline" size="sm" onClick={fetchLeads} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Atualizar
              </Button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : leads.length === 0 ? (
              <div className="text-center py-12 bg-card/50 border border-border/50 rounded-xl">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum lead ainda</h3>
                <p className="text-muted-foreground">Os leads aparecerão aqui quando alguém preencher o formulário.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {leads.map((lead, index) => (
                  <motion.div
                    key={lead.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-card/50 border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-semibold">
                              {lead.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{lead.name}</h3>
                            <a href={`mailto:${lead.email}`} className="text-sm text-primary hover:underline">
                              {lead.email}
                            </a>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                          {lead.company && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Building className="w-4 h-4" />
                              {lead.company}
                            </div>
                          )}
                          {lead.phone && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="w-4 h-4" />
                              {lead.phone}
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                          </div>
                        </div>

                        {lead.message && (
                          <div className="flex items-start gap-2 text-sm text-muted-foreground bg-background/50 rounded-lg p-3">
                            <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <p>{lead.message}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 lg:flex-col">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteLead(lead.id)}
                          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Email Marketing Tab */}
        {activeTab === "email" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <EmailMarketing leads={leads} />
          </motion.div>
        )}
      </div>
    </main>
  );
};

// Email Marketing Component
const EmailMarketing = ({ leads }: { leads: Lead[] }) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const toggleLead = (email: string) => {
    setSelectedLeads((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  };

  const selectAll = () => {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leads.map((l) => l.email));
    }
  };

  const handleSend = async () => {
    if (!subject.trim() || !message.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha o assunto e a mensagem.",
        variant: "destructive",
      });
      return;
    }

    if (selectedLeads.length === 0) {
      toast({
        title: "Selecione destinatários",
        description: "Selecione pelo menos um lead para enviar o email.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    
    // Simulate sending (replace with actual edge function call)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast({
      title: "Emails enviados!",
      description: `${selectedLeads.length} emails foram enviados com sucesso.`,
    });
    
    setSubject("");
    setMessage("");
    setSelectedLeads([]);
    setSending(false);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Email Composer */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Compor Email</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Assunto</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Assunto do email"
              className="w-full px-4 py-2 bg-background/50 border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Mensagem</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escreva sua mensagem..."
              rows={8}
              className="w-full px-4 py-2 bg-background/50 border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={sending}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {sending ? "Enviando..." : `Enviar para ${selectedLeads.length} contatos`}
          </Button>
        </div>
      </div>

      {/* Lead Selection */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Destinatários</h2>
          <Button variant="outline" size="sm" onClick={selectAll}>
            {selectedLeads.length === leads.length ? "Desmarcar Todos" : "Selecionar Todos"}
          </Button>
        </div>

        {leads.length === 0 ? (
          <div className="text-center py-12 bg-card/50 border border-border/50 rounded-xl">
            <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum lead disponível</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {leads.map((lead) => (
              <label
                key={lead.id}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedLeads.includes(lead.email)
                    ? "bg-primary/10 border-primary/50"
                    : "bg-card/50 border-border/50 hover:border-primary/30"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedLeads.includes(lead.email)}
                  onChange={() => toggleLead(lead.email)}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{lead.name}</p>
                  <p className="text-xs text-muted-foreground">{lead.email}</p>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
