import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { StatsBar } from "@/components/admin/StatsBar";
import { LeadsCRM } from "@/components/admin/LeadsCRM";
import { HotLeadsPanel } from "@/components/admin/HotLeadsPanel";
import { SegmentationHeatmap } from "@/components/admin/SegmentationHeatmap";
import { FunnelAnalytics } from "@/components/admin/FunnelAnalytics";
import { EmailMarketing } from "@/components/admin/EmailMarketing";
import { Lead, LeadStatus, TopicInterest, FunnelStep } from "@/components/admin/types";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const Admin = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "dashboard";

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
      
      // Extend leads with mock CRM data
      const extendedLeads: Lead[] = (data || []).map((lead, index) => ({
        ...lead,
        score: Math.floor(Math.random() * 60) + 40,
        status: (["new", "contacted", "negotiation", "closed", "lost"] as LeadStatus[])[
          Math.floor(Math.random() * 5)
        ],
        last_activity: lead.created_at,
      }));
      
      setLeads(extendedLeads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast({
        title: "Erro ao carregar leads",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteLead = async (id: string) => {
    try {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) throw error;
      setLeads(leads.filter((lead) => lead.id !== id));
      toast({ title: "Lead excluído" });
    } catch (error) {
      toast({ title: "Erro ao excluir", variant: "destructive" });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // Computed stats
  const stats = useMemo(() => {
    const today = new Date().toDateString();
    const newLeadsToday = leads.filter(
      (l) => new Date(l.created_at).toDateString() === today
    ).length;
    const activeTrials = leads.filter((l) => l.source === "smartdrill_trial").length;
    const ebookDownloads = leads.filter((l) => l.source === "diesel_ebook").length;
    const closed = leads.filter((l) => l.status === "closed").length;
    const conversionRate = leads.length > 0 ? Math.round((closed / leads.length) * 100) : 0;
    return { newLeadsToday, activeTrials, ebookDownloads, conversionRate };
  }, [leads]);

  // Mock topic interests
  const topicInterests: TopicInterest[] = [
    { topic: "drilling", count: 45, percentage: 35 },
    { topic: "blasting", count: 30, percentage: 23 },
    { topic: "ia", count: 35, percentage: 27 },
    { topic: "diesel", count: 20, percentage: 15 },
  ];

  // Mock funnel steps
  const funnelSteps: FunnelStep[] = [
    { name: "eBook Download", count: 150, dropoff: 40 },
    { name: "Email Opened", count: 90, dropoff: 33 },
    { name: "Link Clicked", count: 60, dropoff: 50 },
    { name: "Demo Request", count: 30, dropoff: 0 },
  ];

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Acesso Restrito</h1>
          <p className="text-muted-foreground mb-6">Você não tem permissão para acessar esta área.</p>
          <Button onClick={() => navigate("/")} variant="outline">
            <Home className="w-4 h-4 mr-2" />
            Voltar ao Site
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onSignOut={handleSignOut}
      />

      <main
        className="transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? 80 : 260 }}
      >
        <div className="p-6 lg:p-8">
          {/* Dashboard View */}
          {activeTab === "dashboard" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
                <p className="text-muted-foreground">Visão geral de marketing e vendas</p>
              </div>

              <StatsBar {...stats} />

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <SegmentationHeatmap data={topicInterests} />
                  <FunnelAnalytics steps={funnelSteps} />
                </div>
                <div>
                  <HotLeadsPanel leads={leads} />
                </div>
              </div>
            </motion.div>
          )}

          {/* Leads CRM View */}
          {activeTab === "leads" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Leads CRM</h1>
                <p className="text-muted-foreground">Gerencie e converta seus leads</p>
              </div>
              <LeadsCRM
                leads={leads}
                loading={loading}
                onRefresh={fetchLeads}
                onDelete={deleteLead}
              />
            </motion.div>
          )}

          {/* Email Marketing View */}
          {activeTab === "email" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Email Automations</h1>
                <p className="text-muted-foreground">Campanhas e automações de email</p>
              </div>
              <EmailMarketing leads={leads} />
            </motion.div>
          )}

          {/* Content Performance */}
          {activeTab === "content" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Content Performance</h1>
                <p className="text-muted-foreground">Análise de desempenho de conteúdo</p>
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                <SegmentationHeatmap data={topicInterests} />
                <FunnelAnalytics steps={funnelSteps} />
              </div>
            </motion.div>
          )}

          {/* Settings */}
          {activeTab === "settings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Configurações</h1>
                <p className="text-muted-foreground">Configurações do sistema</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <p className="text-muted-foreground">Em breve</p>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
